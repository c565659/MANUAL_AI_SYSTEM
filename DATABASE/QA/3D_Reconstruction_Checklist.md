# QA Checklist: 3D Reconstruction

## Activation Verification

- [ ] An approved `.stp` model was actually supplied before 3D Reconstruction was activated.
- [ ] If no approved `.stp` model was supplied, this complete checklist is Not Applicable.
- [ ] Rhino was not launched merely because the 3D Reconstruction module exists.

---

## STEP Validation Verification

- [ ] The STEP file opened or imported successfully in Rhino 7.
- [ ] The STEP file contains usable product geometry.
- [ ] The major product silhouette reasonably corresponds to the product identified by the source DOCX.
- [ ] The STEP geometry is not obviously empty, corrupted or unrelated.
- [ ] An unusable or mismatched STEP model was not treated as authoritative geometry.
- [ ] STEP validation problems were recorded in `QA_REPORT.md`.

---

## Source Authority Verification

- [ ] STEP geometry was treated as authoritative for product geometry.
- [ ] Source DOCX text remained authoritative for formal content.
- [ ] Source DOCX remained authoritative for instruction order and instructional relationships.
- [ ] Source images were used primarily for camera angle, composition and instructional reference.
- [ ] Conflicting source-image product geometry did not override the STEP model.
- [ ] STEP geometry was not distorted merely to imitate a blurry source image.

---

## Component Identification Verification

- [ ] Each instruction-critical STEP component was identified before movement or isolation.
- [ ] Existing assembly structure, geometry and source reference were used for component identification.
- [ ] An ambiguous Body, Solid or Component was not assigned by guesswork.
- [ ] Ambiguous instruction-critical components used an approved fallback when necessary.
- [ ] Component-identification uncertainty was recorded in `QA_REPORT.md`.

---

## Geometry Protection Verification

- [ ] The original `.stp` file was preserved.
- [ ] The original `.stp` file was not overwritten.
- [ ] Reconstruction used a temporary working copy.
- [ ] Product geometry was not cut.
- [ ] Product geometry was not Boolean-split.
- [ ] Product geometry was not remodeled.
- [ ] Product geometry was not stretched, compressed or deformed.
- [ ] Missing product geometry was not generated or invented.
- [ ] Individual surfaces or faces of one merged solid were not falsely treated as separate product components.

---

## Exploded-View Verification

- [ ] Only pre-existing independent Bodies, Solids, Components or Blocks were moved or rotated.
- [ ] The assembled state was preserved as the original working reference.
- [ ] Components were moved only when the source instructional reference required separation.
- [ ] Component orientation was preserved by default.
- [ ] Rotation was used only when clearly supported by instructional intent.
- [ ] Only the minimum required translation or rotation was used.
- [ ] Assembly order and directional relationships remain correct.
- [ ] No exaggerated decorative exploded arrangement was created.
- [ ] A merged solid was not artificially separated.

---

## Missing Geometry / Fallback Verification

- [ ] STEP-missing elements used the original source image when an approved fallback was required and available.
- [ ] Missing elements absent from both STEP and source were not invented.
- [ ] No charger, cable, hand, liquid, accessory or other object was created from imagination.
- [ ] No internet substitute object was used.
- [ ] A required exploded relationship that could not be reproduced from STEP used `SOURCE_IMAGE_FALLBACK` where appropriate.

---

## Hybrid Reconstruction Verification

- [ ] STEP-derived product geometry remains the primary product representation.
- [ ] Only missing non-modeled source-image elements were retained whenever practical.
- [ ] Low-resolution source product geometry was not left underneath or over STEP-derived product geometry.
- [ ] Source fallback elements were cropped or isolated as cleanly as practical.
- [ ] Hybrid composition preserves the original instructional relationship.
- [ ] Hybrid output was not flattened into one raster image.

---

## Camera Verification

- [ ] Main viewing direction is visually consistent with the source reference.
- [ ] Front / rear relationship is correct.
- [ ] Left / right relationship is correct.
- [ ] Elevation and pitch are reasonably similar to the source reference.
- [ ] Exploded direction is instructionally consistent.
- [ ] Camera matching did not alter STEP geometry.
- [ ] Geometry accuracy took priority when camera similarity conflicted with geometry accuracy.

---

## Vector Linework Verification

- [ ] Reconstructed product geometry remains vector-based.
- [ ] Raster screenshots were not substituted for usable vector geometry.
- [ ] Product outer silhouette is preserved.
- [ ] Necessary major component contours are preserved.
- [ ] Necessary component boundaries are preserved.
- [ ] Necessary mechanical interfaces are preserved.
- [ ] Step-critical holes, slots, clips, ports and installation structures remain visible when required.
- [ ] Duplicate and overlapping linework was cleaned when appropriate.
- [ ] Excessive minor fillet / chamfer clutter was reduced where appropriate.
- [ ] Line cleanup did not remove instructional structure.
- [ ] Hidden lines are disabled unless instructionally necessary.
- [ ] Vector output remains editable after Illustrator import.

---

## Annotation Verification

- [ ] Rhino-generated linework contains no formal instruction text.
- [ ] Rhino-generated linework contains no step numbering.
- [ ] Rhino-generated linework contains no action arrows.
- [ ] Source-supported numbers were reconstructed in Illustrator.
- [ ] Source-supported arrows were reconstructed in Illustrator.
- [ ] Source-supported guide lines were reconstructed in Illustrator.
- [ ] Source-supported text remains editable in Illustrator.

---

## Reconstruction Decision Verification

Every applicable source visual was classified as exactly one of:

- `3D_VECTOR_REBUILT`
- `HYBRID_3D_SOURCE`
- `SOURCE_IMAGE_FALLBACK`
- `SOURCE_IMAGE_DIRECT`

Verify:

- [ ] Every applicable visual has one Reconstruction Decision Class.
- [ ] The classification appears in `LAYOUT_PLAN.md`.
- [ ] The classification appears in `QA_REPORT.md`.
- [ ] Final visual production matches the recorded class.
- [ ] No visual was forced into 3D reconstruction merely because a STEP model was supplied.

---

## Illustrator Integration Verification

- [ ] Rhino vector geometry remains editable.
- [ ] Rhino vector geometry preserves STEP proportions.
- [ ] Source fallback elements remain separately identifiable.
- [ ] Illustrator annotations remain independently editable.
- [ ] Formal text is not grouped inside Rhino vector groups.
- [ ] Hybrid visuals were not flattened.
- [ ] Product geometry was not redrawn from imagination in Illustrator.

---

## Rhino Execution Mode Verification

- [ ] Rhino production used `SCRIPT-DRIVEN / NO DESKTOP TAKEOVER`.
- [ ] Rhino did not depend on mouse movement.
- [ ] Rhino did not depend on mouse clicking.
- [ ] Rhino did not depend on keyboard simulation.
- [ ] Rhino did not depend on screen-coordinate operation.
- [ ] Rhino did not require manual viewport rotation.
- [ ] Rhino did not require manual object dragging.
- [ ] Rhino did not require continuous foreground control.
- [ ] The user remained able to use the computer normally during Rhino processing.
- [ ] Any operation that could not be automated was reported instead of silently taking desktop control.

---

## Reproducibility Verification

- [ ] A reproducible Rhino reconstruction script or equivalent automation source was preserved.
- [ ] Reconstructed vector assets used in the final manual were preserved.
- [ ] Required source fallback assets were preserved.
- [ ] Original DOCX remained preserved.
- [ ] Original STEP remained preserved.
- [ ] Final reconstruction can be traced back to its STEP and source visual.

---

## Final Result

3D Reconstruction may be marked PASS only when all applicable checks above PASS.

If no approved `.stp` model was supplied:

`NOT APPLICABLE`
