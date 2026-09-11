# Failure Library

## OBC-295A blank 22-page output

- Symptom: the export had the expected 22 pages and dimensions, but every page was blank.
- Root cause: PDF extraction coordinates were used directly against Illustrator object bounds, and the collector assumed a top-level object's parent was the Document instead of a Layer.
- Compatibility failure: QA attempted native `JSON.stringify`, which is absent in the target ExtendScript runtime.
- 1.4.0 prevention: discover 28 repeated page frames inside Illustrator, snapshot Layer children before creating groups, assign by center/intersection in that coordinate system, reject empty retained groups, and serialize QA with the ES3 compatibility function.
- Regression expectation: remove 6 whole pages and customer-service regions on 3 mixed pages, retain 22 nonblank 140 x 210 mm pages.
- 2026-09-11 result on Illustrator 29.3.1: the single main JSX run stopped with `page_boundary_count_mismatch expected=28 actual=0`; the first 1.4.0 filter had incorrectly made the usual no-fill/stroke style a mandatory condition. The post-run fix now uses exact geometric size and repeated count as mandatory evidence and uses style only to rank excess candidates. It has not been rerun, so validation remains `implemented_unverified`.
