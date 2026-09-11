[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$JobManifest,
    [Parameter(Mandatory = $true)][string]$RootTask,
    [Parameter(Mandatory = $true)][string]$JsxFile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$connectionRetryDelaySeconds = 5
$maxConnectionRetriesBeforeJsx = 1
$productionTargetSeconds = 600
$productionHardLimitSeconds = 900
$illustratorConnectionTimeoutSeconds = 30

function Read-JsonFile([string]$Path) {
    return Get-Content -Raw -LiteralPath $Path -Encoding UTF8 | ConvertFrom-Json
}

function Write-JsonAtomic([string]$Path, [object]$Value) {
    $temporaryPath = "$Path.$([Guid]::NewGuid().ToString('N')).tmp"
    $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $temporaryPath -Encoding UTF8
    Move-Item -LiteralPath $temporaryPath -Destination $Path -Force
}

function Get-ElapsedSeconds([string]$StartedAt) {
    return ([DateTimeOffset]::UtcNow - [DateTimeOffset]::Parse($StartedAt)).TotalSeconds
}

function Test-IsAdministrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal]::new($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-IllustratorInstallation {
    $candidates = @(
        'C:\Program Files\Adobe\Adobe Illustrator 2025\Support Files\Contents\Windows\Illustrator.exe',
        'C:\Program Files\Adobe\Adobe Illustrator 2024\Support Files\Contents\Windows\Illustrator.exe'
    )
    return $candidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
}

function Connect-Illustrator {
    return New-Object -ComObject Illustrator.Application
}

function Set-Property([object]$Object, [string]$Name, [object]$Value) {
    if ($null -eq $Object.PSObject.Properties[$Name]) { $Object | Add-Member -NotePropertyName $Name -NotePropertyValue $Value }
    else { $Object.$Name = $Value }
}

function Invoke-HealthCheck([object]$Application, [string]$StateDirectory, [string]$ManifestPath) {
    $healthMarker = Join-Path $StateDirectory "illustrator-health-$([Guid]::NewGuid().ToString('N')).txt"
    $healthScript = Join-Path $StateDirectory "illustrator-health-$([Guid]::NewGuid().ToString('N')).jsx"
    $escaped = $healthMarker.Replace('\', '/').Replace('"', '\"')
    $escapedManifest = $ManifestPath.Replace('\', '/').Replace('"', '\"')
    @"
`$.setenv("FILE_SPLIT_JOB_MANIFEST", "$escapedManifest");
var f = new File("$escaped");
f.open("w");
f.write("ok");
f.close();
"@ | Set-Content -LiteralPath $healthScript -Encoding UTF8
    try {
        $Application.DoJavaScriptFile($healthScript)
        if (-not (Test-Path -LiteralPath $healthMarker)) {
            throw 'DoJavaScriptFile returned without writing its health marker'
        }
    }
    finally {
        Remove-Item -LiteralPath $healthScript -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $healthMarker -Force -ErrorAction SilentlyContinue
    }
}

$jobPath = [IO.Path]::GetFullPath($JobManifest)
$rootPath = [IO.Path]::GetFullPath($RootTask)
$jsxPath = [IO.Path]::GetFullPath($JsxFile)
$stateDirectory = Split-Path -Parent $jobPath
$lockPath = "$rootPath.lock"
$lock = [IO.File]::Open($lockPath, [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
$application = $null
$job = $null
$root = $null
$countsApplied = $false
try {
    $job = Read-JsonFile $jobPath
    $root = Read-JsonFile $rootPath
    if ($job.parent_root_task_id -ne $root.root_task_id) { throw 'Job/root relationship mismatch' }
    if ($job.mode -eq 'fast_production' -and $job.final_status -eq 'system_not_ready') {
        throw 'Verified executor is required before fast_production'
    }
    $elapsed = Get-ElapsedSeconds $root.root_started_at
    if ($job.mode -eq 'fast_production' -and $elapsed -ge $productionHardLimitSeconds) {
        $job.final_status = 'sla_exceeded'; $root.final_status = 'sla_exceeded'
        throw 'Root task hard limit already exceeded'
    }
    if ($job.mode -eq 'fast_production' -and $elapsed -ge $productionTargetSeconds) {
        $job.final_status = 'sla_exceeded'; $root.final_status = 'sla_exceeded'
        throw 'Production target exceeded before stable JSX started'
    }

    $processes = @(Get-Process -Name Illustrator -ErrorAction SilentlyContinue)
    $sameSession = @($processes | Where-Object { $_.SessionId -eq (Get-Process -Id $PID).SessionId })
    $blockingDialogDetected = @($sameSession | Where-Object { -not $_.Responding }).Count -gt 0
    Set-Property $job 'environment_health' ([ordered]@{
        illustrator_installed = [bool](Get-IllustratorInstallation)
        illustrator_process_exists = $processes.Count -gt 0
        same_windows_user_session = $sameSession.Count -gt 0
        runner_is_elevated = Test-IsAdministrator
        permission_level_consistent = $sameSession.Count -gt 0
        blocking_dialog_detected = $blockingDialogDetected
        com_connected = $false
        do_javascript_file_callable = $false
    })
    if (-not $job.environment_health.illustrator_installed -or $blockingDialogDetected) {
        $job.final_status = 'environment_unavailable'; $root.final_status = 'environment_unavailable'
        throw 'Illustrator installation or responsive session health check failed'
    }

    $connectionError = $null
    for ($attempt = 0; $attempt -le $maxConnectionRetriesBeforeJsx; $attempt += 1) {
        $job.illustrator_connection_attempts += 1
        try {
            $connectionStarted = [DateTimeOffset]::UtcNow
            $application = Connect-Illustrator
            $job.environment_health.com_connected = $true
            Invoke-HealthCheck $application $stateDirectory $jobPath
            $connectionElapsed = ([DateTimeOffset]::UtcNow - $connectionStarted).TotalSeconds
            if ($connectionElapsed -gt $illustratorConnectionTimeoutSeconds) {
                throw "Illustrator connection health check exceeded $illustratorConnectionTimeoutSeconds seconds"
            }
            $job.environment_health.do_javascript_file_callable = $true
            $job.environment_health.permission_level_consistent = $true
            $connectionError = $null
            break
        }
        catch {
            $connectionError = $_
            $job.illustrator_connection_failures += 1
            if ($attempt -lt $maxConnectionRetriesBeforeJsx) { Start-Sleep -Seconds $connectionRetryDelaySeconds }
        }
    }
    Set-Property $job 'illustrator_connect_seconds' $connectionElapsed
    if ($null -ne $connectionError) {
        $job.final_status = 'environment_unavailable'
        $job.failure_stage = 'illustrator_connection'
        $job.failure_reason = $connectionError.Exception.Message
        $root.final_status = 'environment_unavailable'
        throw $connectionError
    }

    $markerDirectory = Join-Path $stateDirectory ($job.job_id + '-markers')
    New-Item -ItemType Directory -Path $markerDirectory -Force | Out-Null
    Set-Property $job 'markers' ([ordered]@{
        jsx_started = Join-Path $markerDirectory 'jsx_started.txt'
        jsx_completed = Join-Path $markerDirectory 'jsx_completed.txt'
    })
    Write-JsonAtomic $jobPath $job
    $env:FILE_SPLIT_JOB_MANIFEST = $jobPath
    $job.current_stage = 'illustrator_jsx'
    $illustratorStarted = [DateTimeOffset]::UtcNow
    try {
        Set-Property $job 'illustrator_invocation_count' ([int]($job.illustrator_invocation_count) + 1)
        Write-JsonAtomic $jobPath $job
        $application.DoJavaScriptFile($jsxPath)
        if (Test-Path -LiteralPath $job.markers.jsx_started) { $job.jsx_started_count += 1 }
        if (Test-Path -LiteralPath $job.markers.jsx_completed) {
            $job.jsx_completed_count += 1
            $job.export_count += 1
            if (Test-Path -LiteralPath $job.qa_output_path) {
                $jsxQa = Read-JsonFile $job.qa_output_path
                if ($null -ne $jsxQa.export_elapsed_seconds) {
                    $job.export_elapsed_seconds = [double]$jsxQa.export_elapsed_seconds
                }
            }
            $job.current_stage = 'exported'
        }
        else {
            throw 'Stable JSX returned without completion marker'
        }
    }
    catch {
        if (Test-Path -LiteralPath $job.markers.jsx_started) {
            if ($job.jsx_started_count -eq 0) { $job.jsx_started_count += 1 }
            $job.jsx_logic_failures += 1
            $job.final_status = 'production_failed'
            $job.failure_stage = 'illustrator_jsx'
        }
        else {
            $job.illustrator_connection_failures += 1
            $job.final_status = 'environment_unavailable'
            $job.failure_stage = 'illustrator_connection'
        }
        $job.failure_reason = $_.Exception.Message
        throw
    }
    finally {
        $job.illustrator_elapsed_seconds = ([DateTimeOffset]::UtcNow - $illustratorStarted).TotalSeconds
        Set-Property $job 'illustrator_process_seconds' $job.illustrator_elapsed_seconds
    }
    $job.finished_at = [DateTimeOffset]::UtcNow.ToString('o')
    $job.elapsed_seconds = Get-ElapsedSeconds $job.started_at
    $root.total_connection_attempts += $job.illustrator_connection_attempts
    $root.total_jsx_started_count += $job.jsx_started_count
    $root.total_logic_retries += $job.logic_retry_count
    $root.cumulative_illustrator_seconds += $job.illustrator_elapsed_seconds
    $root.cumulative_export_seconds += $job.export_elapsed_seconds
    $countsApplied = $true
    $root.root_elapsed_seconds = Get-ElapsedSeconds $root.root_started_at
    if ($root.root_elapsed_seconds -ge $productionHardLimitSeconds) {
        $job.final_status = 'sla_exceeded'; $root.final_status = 'sla_exceeded'
    }
    Write-JsonAtomic $jobPath $job
    Write-JsonAtomic $rootPath $root
}
catch {
    if ($null -ne $job) {
        $job.finished_at = [DateTimeOffset]::UtcNow.ToString('o')
        $job.elapsed_seconds = Get-ElapsedSeconds $job.started_at
        if ($job.final_status -eq 'pending') { $job.final_status = 'production_failed' }
        Write-JsonAtomic $jobPath $job
    }
    if ($null -ne $root) {
        if (-not $countsApplied -and $null -ne $job) {
            $root.total_connection_attempts += $job.illustrator_connection_attempts
            $root.total_jsx_started_count += $job.jsx_started_count
            $root.total_logic_retries += $job.logic_retry_count
            if ($null -ne $job.illustrator_elapsed_seconds) {
                $root.cumulative_illustrator_seconds += $job.illustrator_elapsed_seconds
            }
            $countsApplied = $true
        }
        $root.root_elapsed_seconds = Get-ElapsedSeconds $root.root_started_at
        if ($root.final_status -eq 'pending') { $root.final_status = $job.final_status }
        Write-JsonAtomic $rootPath $root
    }
    throw
}
finally {
    Remove-Item Env:FILE_SPLIT_JOB_MANIFEST -ErrorAction SilentlyContinue
    if ($null -ne $application) { [Runtime.InteropServices.Marshal]::FinalReleaseComObject($application) | Out-Null }
    $lock.Dispose()
}
