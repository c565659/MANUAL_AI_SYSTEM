# QA Checklist: Complete Manual Production

## Source Verification

- [ ] Complete source DOCX was read.
- [ ] All source pages were inspected.
- [ ] All source images were inspected.
- [ ] All source tables were inspected.
- [ ] Text and image relationships were verified.
- [ ] No external product content was added.
- [ ] No incomplete source text was silently completed.
- [ ] No source technical data was changed without approval.

---

## Repository Verification

- [ ] README.md was read.
- [ ] The selected Template File was read.
- [ ] Relevant Typography rules were read.
- [ ] Relevant Layout rules were read.
- [ ] Relevant Illustrator rules were read.
- [ ] Failure Library was read.
- [ ] QA files were read.
- [ ] Missing or inaccessible files were reported.

---

## Template Verification

- [ ] Artboard dimensions match the selected template.
- [ ] Orientation matches the selected template.
- [ ] Top margin is correct.
- [ ] Left margin is correct.
- [ ] Right margin is correct.
- [ ] Bottom page-number safe area is correct.
- [ ] No formal content enters the page-number safe area.
- [ ] Correct page-number format is used.

---

## Typography Verification

- [ ] H1 size and Leading match the selected template.
- [ ] H2 size and Leading match the selected template.
- [ ] H3 size and Leading match the selected template.
- [ ] Body Font Size and Leading inherit H3 unless the selected Template File explicitly overrides them.
- [ ] For the 140 × 210 mm Template, H3 and Body are 10 pt / 15 pt.
- [ ] Typography hierarchy matches the source DOCX.
- [ ] No unsupported headings were created.
- [ ] Paragraph Styles are used consistently.
- [ ] Auto Leading is disabled.
- [ ] Horizontal Scale is 100%.
- [ ] Vertical Scale is 100%.
- [ ] A dedicated Tracking Optimization Pass was performed after the primary layout was completed.
- [ ] Every applicable formal paragraph was evaluated for right-edge visual balance.
- [ ] Tracking remains within the approved range of `-18` to `+18`.
- [ ] Applied Tracking remains as close to `0` as possible.
- [ ] Only the minimum absolute Tracking adjustment necessary is used.
- [ ] Tracking remains consistent within the same paragraph.
- [ ] Different paragraphs may use different approved Tracking values when required.
- [ ] Tracking is adjusted when a value within the approved range clearly improves paragraph composition or right-edge visual balance.
- [ ] Tracking remains at `0` when adjustment does not produce a meaningful improvement.
- [ ] Tracking does not reduce readability.
- [ ] Tracking is not used to force exact full justification.
- [ ] Tracking is not used as a substitute for text-frame width, line-break, layout or pagination correction.
- [ ] Heading-to-content spacing follows the typography rule.
- [ ] No excessive Paragraph Space was added.

---

## List Verification

- [ ] All original numbering is preserved.
- [ ] Original numbering types are preserved.
- [ ] Numbering and body text remain in the same text unit.
- [ ] Hanging Indent is correctly applied.
- [ ] Wrapped lines align with body text.
- [ ] Number and bullet spacing is consistent.
- [ ] No wide Word-style tabs remain.
- [ ] No numbering is isolated in independent text frames.

---

## Layout Verification

- [ ] Formal section order is preserved.
- [ ] No early page breaks remain.
- [ ] No heading is isolated at the bottom of a page.
- [ ] Complete numbered items are not split.
- [ ] Procedures remain complete.
- [ ] Steps remain with corresponding images.
- [ ] Tips and Notes remain with parent Steps.
- [ ] FAQ questions remain with answers.
- [ ] Table rows remain intact.
- [ ] No meaningless large blank areas remain.
- [ ] Available legal page space is used efficiently.
- [ ] Reading path is clear and primarily top-to-bottom.
- [ ] No dashboard or PPT-style layout appears.
- [ ] No unrelated Procedures are positioned side by side.

---

## Image Verification

- [ ] Images preserve original proportions.
- [ ] Images are sufficiently clear.
- [ ] Important content is not cropped.
- [ ] Image-to-text relationships are correct.
- [ ] Product overview image is sufficiently prominent.
- [ ] Callouts and guide lines remain readable.
- [ ] Images in the same Procedure use consistent scale and spacing.
- [ ] No internet or unapproved generated replacement images were used. Approved STEP-derived vector reconstruction is permitted only when the 3D Reconstruction module is active.
---

## Optional 3D Reconstruction Verification

- [ ] If an approved `.stp` model was supplied, `DATABASE/QA/3D_Reconstruction_Checklist.md` was fully executed.
- [ ] If no approved `.stp` model was supplied, 3D Reconstruction QA was marked Not Applicable.
- [ ] Rhino 7 was not unnecessarily launched when no approved `.stp` model was supplied.

---

## Table Verification

- [ ] Tables preserve source semantics.
- [ ] Merge Cells are applied according to meaning.
- [ ] Padding is consistent.
- [ ] Text is vertically centered.
- [ ] Column widths reflect content length.
- [ ] Table rows are not split.
- [ ] Continued tables repeat headers.
- [ ] Continued tables preserve column widths.
- [ ] No table was converted into decorative cards.
- [ ] No rebuildable table was replaced by a low-resolution screenshot.

---

## Illustrator Verification

- [ ] Text remains editable.
- [ ] Body text is not outlined.
- [ ] Full pages are not rasterized.
- [ ] No missing image links remain.
- [ ] Continuous text is not divided into excessive independent frames.
- [ ] Layers are organized consistently.
- [ ] Page coordinates and margins are consistent.
- [ ] Page numbers are continuous.
- [ ] Formal text objects are not grouped.
- [ ] No Illustrator group contains H1, H2, H3 or Body text.
- [ ] No Illustrator group contains numbered or bulleted formal text.
- [ ] Page-number text is not grouped.
- [ ] Text is not grouped with images or icons.
- [ ] All formal text frames remain directly selectable and independently editable.

---

## Production Execution Mode Verification

- [ ] Production used the default script-driven, non-interactive workflow.
- [ ] Adobe Illustrator construction was executed through supported scripting or automation.
- [ ] No Computer Use was used to operate Illustrator during normal production.
- [ ] No mouse movement or clicking was used for production.
- [ ] No keyboard simulation was used for production.
- [ ] No screen-coordinate clicking or dragging was used.
- [ ] Illustrator did not require continuous foreground control.
- [ ] The user remained able to use the active desktop during production.
- [ ] A reproducible Illustrator production script or equivalent automation source was created.
- [ ] Layout corrections were performed through script or production data where technically possible.
- [ ] The final AI file remains editable.
- [ ] Any operation that genuinely required interactive UI control was reported rather than silently executed.

---

## Final-Manual Cleanliness

- [ ] No SOURCE NOTE appears in final pages.
- [ ] No CONTENT ISSUE appears in final pages.
- [ ] No CLEARANCE CHECK appears in final pages.
- [ ] No QA status label appears in final pages.
- [ ] No PASS or FAIL label appears in final pages.
- [ ] No NEEDS CONFIRMATION label appears in final pages.
- [ ] No database reference appears in final pages.
- [ ] No Codex production note appears in final pages.
- [ ] No template placeholder appears in final pages.
- [ ] No internal Chinese production note appears in final pages.

---

## Official Typography Verification

- [ ] H1 uses Avenir LT Std 95 Black.
- [ ] H2 uses Avenir LT Std 85 Heavy.
- [ ] H3 uses Avenir LT Std 35 Light.
- [ ] Body text uses Avenir LT Std 35 Light.
- [ ] Page numbers use Avenir LT Std 85 Heavy.
- [ ] Page-number font size follows the selected Template File.
- [ ] For the 140 × 210 mm Template, Page Number is 9 pt / 9 pt.
- [ ] H1 uses the Spot Color swatch named PANTONE 2286 C.
- [ ] H1 PANTONE 2286 C uses the approved alternate preview value `#74CB00`.
- [ ] H1 color remains a Spot Color rather than a Process Color.
- [ ] H2 uses `C 0 / M 0 / Y 0 / K 60`.
- [ ] H3 uses `C 0 / M 0 / Y 0 / K 60`.
- [ ] Body text uses `C 0 / M 0 / Y 0 / K 60`.
- [ ] Page numbers use `C 0 / M 0 / Y 0 / K 70`.
- [ ] No unapproved substitute green or gray is used.
- [ ] No unapproved substitute typeface is used.
- [ ] No artificial bolding or lightening is used.

---

## Heading Spacing Verification

- [ ] H1-to-H2 and H1-to-H3 spacing follow the selected Template File when a template-specific spacing value is defined.
- [ ] For the 100 × 150 mm Template, H1-to-H2 visible text distance is exactly 2.5 mm.
- [ ] For the 100 × 150 mm Template, H1-to-H3 visible text distance is exactly 2.5 mm.
- [ ] When no template-specific spacing value exists, the approved Typography fallback rule is used.
- [ ] H2-to-H3 spacing equals one H3 Leading value.
- [ ] No additional empty paragraph is used for heading spacing.
- [ ] No excessive Space Before or Space After is applied.
- [ ] Heading spacing remains compact and consistent.
- [ ] Heading spacing is controlled through Paragraph Styles.
- [ ] All hierarchy spacing is measured from visible rendered text to visible rendered text.
- [ ] Text-frame top or bottom bounds are not used as substitutes for visible text edges.
- [ ] For vertically stacked headings, spacing is measured from the lowest visible glyph edge of the upper text to the highest visible glyph edge of the following text.
- [ ] Tight text-frame geometry does not alter the approved text-to-text spacing.
- [ ] Template-specific millimeter spacing values refer to visible text-to-text distance.
- [ ] A subordinate heading and its directly associated descriptive text are treated as one Information Unit.
- [ ] No normal hierarchy-spacing value is inserted between a heading and the description that directly explains it.
- [ ] No unnecessary Space Before, Space After or empty paragraph separates the heading from its direct description.
- [ ] Approved spacing is applied between complete Information Units.
- [ ] The visual distance between consecutive Information Units is exactly 4 mm.
- [ ] Inter-unit spacing is measured from the final visible text edge of the previous unit to the first visible heading edge of the next unit.
- [ ] Heading-to-heading distance is not used when descriptive text exists between the two headings.
           
---

## Heading-to-Image Spacing Verification

- [ ] For the 100 × 150 mm Template, H1-to-image visible-content distance is exactly 5 mm when the image directly follows H1.
- [ ] For the 100 × 150 mm Template, H2-to-image visible-content distance is exactly 5 mm when the image directly follows H2.
- [ ] For the 100 × 150 mm Template, H3-to-image visible-content distance is exactly 5 mm when the image directly follows H3.
- [ ] For the 140 × 210 mm Template, H1-to-image visible-content distance is exactly 6 mm when the image directly follows H1.
- [ ] For the 140 × 210 mm Template, H2-to-image visible-content distance is exactly 6 mm when the image directly follows H2.
- [ ] For the 140 × 210 mm Template, H3-to-image visible-content distance is exactly 6 mm when the image directly follows H3.
- [ ] Heading-to-image distance is measured from the lowest visible glyph edge to the highest visible image-content edge.
- [ ] Text-frame bounds are not used as the heading-to-image spacing reference.
- [ ] Blank or transparent image margins are not used as the visible image-content edge.
- [ ] Image bounding-box whitespace does not create artificial spacing.

---

## Page Utilization Verification

- [ ] No normal content page contains excessive unused bottom space.
- [ ] Large bottom space appears only for a justified H1 chapter transition.
- [ ] No unnecessary early page break creates blank space.
- [ ] The next complete content unit remains on the current page when it legally fits.
- [ ] Pages remain compact, orderly and readable.

---

## Image Consistency Verification

- [ ] Comparable images in the same chapter use visually consistent sizes.
- [ ] Images in the same Procedure normally remain within approximately ±10% apparent-size variation.
- [ ] Important images remain visually prominent.
- [ ] Operational details remain readable.
- [ ] Images are not reduced merely to fit more text.
- [ ] Image-size adjustment does not distort the source image.

---

## Product Overview Verification

- [ ] Product Overview and Basic Product Specifications appear on the same final page.
- [ ] Long Product Overview part lists use the approved two-column layout when required.
- [ ] Even item counts are divided evenly between the two columns when applicable.
- [ ] Odd/even distribution uses odd-numbered items on the left and even-numbered items on the right when that distribution method is required.
- [ ] Number and part name remain together.
- [ ] Both columns use consistent typography and Hanging Indent.
- [ ] Product image size is adjusted proportionally when necessary to achieve the same-page requirement.
- [ ] Product callouts and guide lines remain readable after scaling.
- [ ] Product images are not distorted.
- [ ] Basic Product Specifications are not moved to a new page merely to preserve an unnecessarily large Product Overview image.
---

## Illustrator Page Construction Verification

- [ ] Illustrator geometry is measured in millimeters.
- [ ] The manual uses one Illustrator artboard.
- [ ] Manual pages are represented by equal-size page frames.
- [ ] Page frames are arranged from left to right.
- [ ] Page frames share the same top alignment.
- [ ] Horizontal spacing between page frames is 0 mm.
- [ ] No page frame overlaps another page frame.
- [ ] Content remains inside the correct page frame.
- [ ] One separate artboard was not created for every page.
- [ ] Every manual page has a visible rectangular page-frame outline in the working AI file.
- [ ] Every page-frame outline exactly matches the selected Template dimensions.
- [ ] All page-frame outlines have no fill.
- [ ] All page-frame outlines use a consistent stroke appearance.
- [ ] All page-frame outlines are placed on the `01_GUIDES` layer.
- [ ] All page-frame outlines remain editable vector rectangles.
- [ ] Page-frame outlines are preserved in the editable AI file.
- [ ] Page-frame outlines do not appear in the final exported PDF.
- [ ] Page-frame outlines do not appear in the print-ready PDF.

---

## Page Number Position Verification

- [ ] Page-number text-frame bottom is 3 mm above the page-frame bottom.
- [ ] Formal content remains at least 2 mm above the page-number text frame.
- [ ] Page-number positions are consistent across all pages.
- [ ] No content enters the page-number clearance area.

---

## File Naming Verification

- [ ] The project folder follows `<Product Model> <Chinese Product Name> 说明书 <YYYYMMDD>`.
- [ ] The Illustrator file uses the approved universal base name.
- [ ] The final PDF uses the same approved universal base name.
- [ ] The print-ready PDF uses the approved base name followed by `印刷版` when required.
- [ ] The approved Product Model is preserved exactly.
- [ ] The approved Chinese Product Name is used.
- [ ] The fixed text `说明书` is included.
- [ ] The date uses eight digits in `YYYYMMDD` format.
- [ ] Exactly one half-width space separates each naming component.
- [ ] No underscores are used between the main naming components.
- [ ] No template dimensions or language codes appear in the primary file name.
- [ ] No generic file name such as `manual`, `final` or `new manual` is used.

---

## Text-Frame Geometry Verification

- [ ] Single-line heading text frames are tightly fitted to the actual text height.
- [ ] Multi-line heading text frames contain no unnecessary empty vertical area.
- [ ] Oversized text frames do not influence downstream content position.
- [ ] Text-frame height is not being used to simulate paragraph spacing.
- [ ] Heading spacing is measured from visible text rather than empty frame boundaries.
- [ ] Tight text frames are used for clean geometry, but their boundaries are not treated as the hierarchy-spacing reference.
- [ ] Changing a text frame's unused internal height does not change the intended visible text-to-text spacing.
- [ ] No hierarchy spacing is validated solely by comparing text-frame coordinates.
      
---

## Cross-Page Heading Spacing Verification

- [ ] H1-to-H2 spacing remains consistent throughout the complete manual.
- [ ] H1-to-H3 spacing remains consistent throughout the complete manual.
- [ ] H2-to-H3 spacing remains consistent throughout the complete manual.
- [ ] Heading spacing does not become larger on later pages.
- [ ] Page breaks do not alter the approved heading-spacing relationship.

---

## Strict Pagination Verification

- [ ] No page turns early while approximately half or more of the usable content area remains available.
- [ ] Early page breaks occur only for a justified H1 transition or a content group that cannot legally fit.
- [ ] Oversized text-frame bounds do not cause premature page breaks.
- [ ] The next complete legal content unit remains on the current page whenever it fits.

---

## Source Image Sequence Verification

- [ ] Consecutive source images with no source text between them remain a continuous Image Group.
- [ ] No new body text or captions have been inserted between consecutive source images.
- [ ] Left-to-right source image sequences preserve their instructional order.
- [ ] Image-text-image alternation is used only when that relationship exists in the source.

---

## Inline Icon Verification

- [ ] Inline functional icons are approximately 1.5 times the visual height of the adjacent uppercase letter.
- [ ] Inline icons preserve their original proportions.
- [ ] Equivalent control icons use visually consistent sizing.
- [ ] Inline icons do not increase line height unnecessarily.
- [ ] Icon bounding-box whitespace does not create artificial paragraph spacing.

---

## Final Result

Each item shall be marked:

- PASS
- FAIL
- NEEDS CONFIRMATION

Unchecked items shall not be marked PASS.

If any applicable item is FAIL:

1. Correct the failure.
2. Export a new review preview.
3. Repeat the complete QA.

The manual may only be delivered as complete when the final applicable result is PASS.

## Production-State Verification

- [ ] `PROJECT_STATE.md` exists.
- [ ] Completed production phases are marked correctly.
- [ ] A phase already marked `PASS` was not unnecessarily repeated.
- [ ] Any `BLOCKED` phase includes the corresponding diagnostic information.

---

## Automation Capability Verification

- [ ] Required Illustrator automation smoke test passed before full production.
- [ ] Rhino automation smoke test passed when 3D Reconstruction was active.
- [ ] Full production did not begin while a required automation capability was `BLOCKED`.

---

## Pagination Audit Verification

- [ ] `PAGINATION_AUDIT.csv` exists.
- [ ] Every actual page break has a measurable pagination record.
- [ ] No page has `NEXT_UNIT_FITS = TRUE` and `Decision = BREAK`.
- [ ] Every page break uses an approved reason when a break is required.
