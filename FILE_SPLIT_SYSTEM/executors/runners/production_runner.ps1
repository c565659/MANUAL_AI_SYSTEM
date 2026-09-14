[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$WorkingCopy,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [Parameter(Mandatory = $true)][ValidateSet('WEB_MANUAL', 'PACKAGING_DISPLAY')][string]$TaskType,
    [Parameter(Mandatory = $true)][string]$Model,
    [Parameter(Mandatory = $true)][string]$StateDirectory,
    [string]$PageMap,
    [string]$FaceMap,
    [string]$FontReport,
    [ValidateSet('fast_production', 'development_validation')][string]$Mode = 'fast_production'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$runnerStarted = [DateTimeOffset]::UtcNow
function Write-JsonAtomic([string]$Path, [object]$Value) {
    $temporaryPath = "$Path.$([Guid]::NewGuid().ToString('N')).tmp"
    $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $temporaryPath -Encoding UTF8
    Move-Item -LiteralPath $temporaryPath -Destination $Path -Force
}
$systemRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$builder = Join-Path $systemRoot 'executors\preflight\build_job_manifest.py'
$qaOutput = Join-Path ([IO.Path]::GetFullPath($StateDirectory)) "qa-$([Guid]::NewGuid().ToString('N')).json"
$arguments = @($builder, '--input', $InputPath, '--working-copy', $WorkingCopy, '--output', $OutputPath, '--qa-output', $qaOutput, '--state-dir', $StateDirectory, '--task-type', $TaskType, '--model', $Model, '--mode', $Mode)
if ($PageMap) { $arguments += @('--page-map', $PageMap) }
if ($FaceMap) { $arguments += @('--face-map', $FaceMap) }
if ($FontReport) { $arguments += @('--font-report', $FontReport) }
$preflightLines = @(& python @arguments)
$preflightExit = $LASTEXITCODE
if ($preflightLines.Count -eq 0) { throw 'Preflight did not return a task identity' }
$identity = $preflightLines[-1] | ConvertFrom-Json
$jobPath = Join-Path ([IO.Path]::GetFullPath($StateDirectory)) ($identity.job_id + '.json')
$rootPath = Join-Path ([IO.Path]::GetFullPath($StateDirectory)) ($identity.root_task_id + '.json')
if ($preflightExit -eq 2) {
    $job = Get-Content -Raw -LiteralPath $jobPath -Encoding UTF8 | ConvertFrom-Json
    $root = Get-Content -Raw -LiteralPath $rootPath -Encoding UTF8 | ConvertFrom-Json
    $runnerElapsed = ([DateTimeOffset]::UtcNow - $runnerStarted).TotalSeconds
    $root.cumulative_codex_elapsed_seconds += [Math]::Max(0, $runnerElapsed - $job.preflight_elapsed_seconds)
    $root.root_elapsed_seconds = ([DateTimeOffset]::UtcNow - [DateTimeOffset]::Parse($root.root_started_at)).TotalSeconds
    Write-JsonAtomic $rootPath $root
    Write-Output ($identity | ConvertTo-Json -Compress)
    exit 2
}
if ($preflightExit -ne 0) { throw "Preflight failed with exit code $preflightExit" }

$executorName = (Get-Content -Raw -LiteralPath $jobPath -Encoding UTF8 | ConvertFrom-Json).executor_name
$jsxPath = Join-Path $systemRoot ("executors\illustrator\" + $executorName + '.jsx')
& (Join-Path $PSScriptRoot 'illustrator_runner.ps1') -JobManifest $jobPath -RootTask $rootPath -JsxFile $jsxPath

$root = Get-Content -Raw -LiteralPath $rootPath -Encoding UTF8 | ConvertFrom-Json
if ($Mode -eq 'fast_production' -and $root.root_elapsed_seconds -ge 900) {
    $root.final_status = 'sla_exceeded'
    Write-JsonAtomic $rootPath $root
    exit 3
}
$qaScript = if ($TaskType -eq 'WEB_MANUAL') { Join-Path $systemRoot 'executors\qa\check_manual_pdf.py' } else { Join-Path $systemRoot 'executors\qa\check_packaging_png.py' }
$qaStarted = [DateTimeOffset]::UtcNow
$qaLines = @(& python $qaScript $jobPath --promote)
$qaExit = $LASTEXITCODE
$qaElapsed = ([DateTimeOffset]::UtcNow - $qaStarted).TotalSeconds
$job = Get-Content -Raw -LiteralPath $jobPath -Encoding UTF8 | ConvertFrom-Json
$root = Get-Content -Raw -LiteralPath $rootPath -Encoding UTF8 | ConvertFrom-Json
$job.qa_elapsed_seconds = $qaElapsed
$job.elapsed_seconds = ([DateTimeOffset]::UtcNow - [DateTimeOffset]::Parse($job.started_at)).TotalSeconds
$root.cumulative_qa_seconds += $qaElapsed
$runnerElapsed = ([DateTimeOffset]::UtcNow - $runnerStarted).TotalSeconds
$root.cumulative_codex_elapsed_seconds += [Math]::Max(0, $runnerElapsed - $job.preflight_elapsed_seconds - $job.illustrator_elapsed_seconds - $qaElapsed)
$root.root_elapsed_seconds = ([DateTimeOffset]::UtcNow - [DateTimeOffset]::Parse($root.root_started_at)).TotalSeconds
if ($qaExit -eq 0 -and ($Mode -eq 'development_validation' -or $root.root_elapsed_seconds -lt 900)) {
    $job.final_status = 'qa_passed'
    $root.final_status = 'qa_passed'
} else {
    $job.final_status = if ($Mode -eq 'fast_production' -and $root.root_elapsed_seconds -ge 900) { 'sla_exceeded' } else { 'production_failed' }
    $root.final_status = $job.final_status
}
$job.finished_at = [DateTimeOffset]::UtcNow.ToString('o')
$root.root_finished_at = $job.finished_at
Write-JsonAtomic $jobPath $job
Write-JsonAtomic $rootPath $root
Write-Output (($qaLines -join [Environment]::NewLine))
exit $qaExit
