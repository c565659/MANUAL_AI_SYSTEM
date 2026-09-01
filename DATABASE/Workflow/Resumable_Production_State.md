# Resumable Production State

Every manual project shall maintain:

`PROJECT_STATE.md`

Required production states:

`NOT_STARTED`
`IN_PROGRESS`
`PASS`
`BLOCKED`

Standard phases:

PHASE_01_SOURCE_AUDIT
PHASE_02_CONTENT_STRUCTURE
PHASE_03_LAYOUT_PLAN
PHASE_04_ASSET_AND_3D_PREPARATION
PHASE_05_ILLUSTRATOR_CONSTRUCTION
PHASE_06_TRACKING_OPTIMIZATION
PHASE_07_VISUAL_QA
PHASE_08_CORRECTION
PHASE_09_FINAL_QA

A phase marked `PASS` shall not be repeated merely because a new Codex session begins.

Before resuming production:

1. Read `PROJECT_STATE.md`.
2. Verify existing production files.
3. Identify the first incomplete or blocked phase.
4. Resume from that phase.
5. Do not recreate valid completed assets unless a confirmed correction requires it.

Illustrator construction should additionally record page-level completion.

3D Reconstruction should additionally record visual-level completion.

Example:

`PAGE_01 = PASS`
`PAGE_02 = PASS`
`PAGE_03 = IN_PROGRESS`

and:

`VISUAL_001 = 3D_VECTOR_REBUILT / PASS`
`VISUAL_002 = HYBRID_3D_SOURCE / PASS`
`VISUAL_003 = IN_PROGRESS`
