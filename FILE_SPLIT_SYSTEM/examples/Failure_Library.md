# Failure Library

## OBC-295A blank 22-page output

- Symptom: the export had the expected 22 pages and dimensions, but every page was blank.
- Root cause: PDF extraction coordinates were used directly against Illustrator object bounds, and the collector assumed a top-level object's parent was the Document instead of a Layer.
- Compatibility failure: QA attempted native `JSON.stringify`, which is absent in the target ExtendScript runtime.
- 1.4.0 prevention: discover 28 repeated page frames inside Illustrator, snapshot Layer children before creating groups, assign by center/intersection in that coordinate system, reject empty retained groups, and serialize QA with the ES3 compatibility function.
- Regression expectation: remove 6 whole pages and customer-service regions on 3 mixed pages, retain 22 nonblank 140 x 210 mm pages.
- 2026-09-11 result on Illustrator 29.3.1: the single main JSX run stopped with `page_boundary_count_mismatch expected=28 actual=0`; the first 1.4.0 filter had incorrectly made the usual no-fill/stroke style a mandatory condition. The post-run fix now uses exact geometric size and repeated count as mandatory evidence and uses style only to rank excess candidates. It has not been rerun, so validation remains `implemented_unverified`.
- 2026-09-14 result on Illustrator 29.3.1: one fresh `development_validation` run detected and removed 28/28 page frames, removed 6 complete pages, processed 3 mixed pages and built 22/22 nonblank page groups. It failed closed before export with `outline_geometry_failures=22` and `unoutlined_text_frames=1`; Illustrator time was 6.5493316 seconds and root elapsed time was 6.9522437 seconds.
- Root cause: 1.4.0 compared AreaText frame bounds with glyph-outline bounds, which are different by design, and silently left unassigned candidates for the final text-count gate. It also extended a mixed-section deletion from the first target heading to the page bottom.
- 1.4.1 prevention: compare a duplicate's outline metrics with the original frame's outline metrics, diagnose and resolve every unassigned candidate before grouping, calculate one deletion interval per target using the next peer heading, and close only the executor-owned document in `finally`. The patch remains `implemented_unverified` until a separate fresh Illustrator regression.
