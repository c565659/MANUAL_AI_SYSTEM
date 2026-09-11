# Stable executor usage

`production_runner.ps1` is the end-to-end entry point after Codex has classified the source and
prepared explicit page or face bounds. It builds/reuses the root task, creates a child job, checks
the executor registry, runs the Illustrator connection health check, invokes exactly one stable JSX,
runs final QA, and promotes the temporary output only after QA passes.

For a manual, first run `preflight/inspect_fonts.py` and provide its JSON output together with a
logical page-map JSON. For packaging, provide a face-map JSON. Bounds use Illustrator order
`[left, top, right, bottom]`; page maps also provide target artboard bounds. All paths may contain
spaces, Unicode, or refer to different drives.

```powershell
./executors/runners/production_runner.ps1 `
  -InputPath <source> -WorkingCopy <copy> -OutputPath <output> `
  -TaskType WEB_MANUAL -Model <model> -StateDirectory <state> `
  -PageMap <page-map.json> -FontReport <font-report.json>
```

Normal production stops with `system_not_ready` while the selected executor is
`implemented_unverified`. Change the registry to `verified` only after the required controlled
Illustrator fixtures pass. Diagnostic runs remain attached to the same root task and do not reset its
elapsed time.
