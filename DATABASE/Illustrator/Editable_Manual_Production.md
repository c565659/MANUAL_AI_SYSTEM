# Editable Illustrator Manual Production

## Document Setup

The Illustrator document shall use:

- The selected Template File
- CMYK color mode
- Millimeter units
- Correct artboard size
- Correct artboard orientation
- Correct margins
- Correct page-number safe area
---

## Measurement Units

All Illustrator production geometry shall use millimeters.

The following shall be displayed, entered and verified in `mm`:

- Artboard dimensions
- Page-frame dimensions
- Page-frame positions
- Margins
- Safe areas
- Image positions
- Text-frame positions
- Page-number positions
- Distances between page elements

Do not use pixels as the primary production unit.

Points may continue to be used for typography values such as Font Size and Leading.

---

## Single-Artboard Page-Frame System

The complete manual shall be constructed on one Illustrator artboard.

Individual manual pages shall be represented by page frames placed inside the single artboard.

Requirements:

- Every page frame shall use the dimensions defined by the selected Template File.
- All page frames shall be identical in size.
- Page frames shall be arranged in one horizontal row.
- Page order shall run from left to right.
- All page frames shall share the same top alignment.
- Horizontal space between adjacent page frames shall be `0 mm`.
- Each page frame shall represent one final manual page.
- Page frames shall not overlap.
- Content shall remain inside its corresponding page frame.
  
### Mandatory Structural Assertions

Illustrator production shall programmatically verify document structure before final PDF export.

Required assertions:

- Illustrator artboard count is exactly `1`.
- Page-frame count equals final manual page count.
- Every page frame matches the selected Template dimensions.
- All page frames share the same top coordinate.
- Page frames are ordered from left to right.
- Horizontal gap between adjacent page frames is exactly `0 mm`.
- Every page frame remains editable.
- Page-frame outlines remain on `01_GUIDES`.
- Formal text remains independently editable.
- Formal text is not grouped inside image or geometry groups.

When 3D Reconstruction is active, additionally verify:

- `3D_VECTOR_REBUILT` product geometry contains editable vector paths.
- Product geometry is not represented only by raster images.
- Hybrid visuals preserve vector product geometry separately from source raster fallback elements.

A document failing a structural assertion shall not proceed to final visual QA.

Structural QA shall run before review-PDF export.

### Visible Page-Frame Outline

Every manual page shall be represented by a visible rectangular page-frame outline in the Illustrator working file.

Requirements:

- Each page frame shall have a visible stroke.
- Each page frame shall have no fill.
- The outline dimensions shall exactly match the selected Template File.
- All page-frame outlines shall use the same stroke appearance.
- All page-frame outlines shall remain aligned with their corresponding page coordinates.
- The page-frame outline shall clearly show the boundary of each individual manual page.
- Adjacent page-frame outlines shall remain at `0 mm` horizontal spacing.
- The outlines shall be placed on the `01_GUIDES` layer.
- The outlines shall remain editable rectangles.
- The outlines shall not be converted into raster images.
- The outlines shall not alter the legal page dimensions.

The page-frame outlines are production guides.

They shall be visible in the editable Illustrator working file but shall not appear as consumer-facing borders in the final exported PDF or print-ready PDF.

Before final export, disable printing or export visibility for the page-frame outline layer while preserving the outlines in the editable AI file.

Do not create one Illustrator artboard for every manual page.

If the required total width exceeds Illustrator's permitted artboard dimensions, stop and report the limitation instead of silently switching to multiple artboards.

---

## Page Number Positioning

The page-number text frame shall be positioned consistently on every page.

Requirements:

- The bottom edge of the page-number text frame shall be `3 mm` above the bottom edge of the page frame.
- The nearest formal content text shall remain at least `2 mm` above the page-number text frame.
- Page-number position shall be measured in millimeters.
- Page-number alignment shall remain consistent across all pages.
- Page-number typography shall follow the approved Typography database rule.
- Page-number font size shall follow the selected Template File.

No body text, image, table or caption may enter the required page-number clearance area.
---

## Editable Content

All formal text shall remain editable.

Do not:

- Outline body text.
- Rasterize full pages.
- Convert rebuildable tables into images.
- Flatten all manual content into one image.
- Break continuous text into excessive independent text frames.

The file shall remain suitable for:

- Translation
- Text revision
- Parameter correction
- Image replacement
- Future product updates

---

## Recommended Layers

Use a consistent layer system:

- 01_GUIDES
- 02_PAGE_NUMBERS
- 03_HEADINGS
- 04_BODY_TEXT
- 05_TABLES
- 06_IMAGES
- 07_ICONS
- 08_BACKGROUND

Equivalent naming may be used only when the same responsibility remains clear.

---

## Text Frames

Use continuous text frames where appropriate.

Do not:

- Create one text frame for every sentence.
- Separate numbering from body text.
- Use independent text frames to simulate paragraph spacing.
- Use manually moved individual lines.
- Use spaces or manual line breaks for alignment.

Paragraph Styles shall control typography and list behavior.

### Tight Text-Frame Height

Text-frame geometry shall reflect the actual text content rather than acting as invisible layout spacing.

Requirements:

- A single-line heading text frame shall use the minimum practical height required to contain the text without clipping.
- A multi-line heading text frame shall end immediately after the final required text line, with only the minimum technical clearance necessary to prevent clipping.
- Do not create large empty vertical areas inside heading text frames.
- Downstream content shall be positioned according to the visible text and approved spacing rule, not according to an oversized empty text-frame boundary.
- Text-frame height shall not be used to simulate paragraph spacing.
- Empty internal text-frame space shall not influence pagination or vertical layout decisions.
- H1, H2 and H3 frames shall be resized after text composition so their frame height matches the actual required text height.

This rule applies to all Template Files.

Do not use oversized text frames to reserve space below headings.
---

### Text Spacing Measurement Reference

Tightly fitting a text frame does not make the text-frame boundary the approved spacing reference.

When positioning one hierarchy level below another, Illustrator production scripts shall calculate and verify spacing from the actual visible rendered text edges.

For example:

H1

↓

Required visual spacing

↓

H2

The required spacing shall be measured from:

- The lowest visible rendered glyph edge of H1
- To the highest visible rendered glyph edge of H2

Do not calculate the required hierarchy spacing only from:

- `textFrame.geometricBounds`
- `textFrame.visibleBounds`
- Text-frame top or bottom coordinates
- Frame height
- Baseline position
- Leading-box geometry

unless the calculated boundary has first been verified to correspond to the actual visible text edge.

Text frames shall remain tightly fitted because oversized frames create other layout and pagination errors.

However:

`Tight Text Frame ≠ Spacing Measurement Reference`

The final authority for hierarchy spacing is the visible rendered text.

Where programmatic glyph measurement requires a temporary measurement object or temporary duplicate, it may be used only for measurement.

The final consumer-facing text shall remain editable and shall not be outlined merely to measure spacing.

This rule applies to all Template Files.

## 3D-Reconstructed Vector Assets

This section applies only when the project activates:

`DATABASE/3D_Reconstruction/Rhino_7_Vector_Linework.md`

Rhino-generated technical linework shall enter Illustrator as editable vector content.

Requirements:

- Preserve vector editability.
- Preserve original geometry proportions.
- The complete linework may be scaled proportionally for manual layout.
- Do not rasterize available reconstructed vector linework.
- Do not redraw missing product geometry from imagination.
- Do not alter product geometry to match the source raster image.

Rhino shall provide geometry linework only.

Illustrator shall reconstruct source-supported:

- Numbers
- Step numbers
- Arrows
- Guide lines
- Labels
- Text
- Other formal annotation elements

according to the original source visual relationship.

When the STEP model lacks a required non-modeled element, approved source-image fallback content may be composited with the reconstructed vector linework.

Hybrid assets shall remain organized so that:

- Rhino vector geometry remains editable.
- Illustrator annotations remain editable.
- Source-image fallback elements remain identifiable.
- The instructional relationship remains clear.

### Vector Asset Organization

Rhino-generated product linework may be grouped as one editable visual asset for positioning and proportional scaling.

Such a vector group shall contain product geometry only.

It shall not contain:

- H1
- H2
- H3
- Body text
- Page numbers
- Formal labels
- Instruction text

Formal text remains subject to the Illustrator Text Grouping Prohibition.

When Hybrid reconstruction is used:

- STEP-derived vector product geometry shall remain distinguishable from source-image fallback content.
- Source-image fallback content shall remain separately identifiable.
- Illustrator-created arrows, numbers, guide lines and text shall remain independently editable.
- Do not flatten the complete Hybrid visual into one raster image.

Rhino vector geometry and source-image fallback elements may be organized within `06_IMAGES` or an equivalent clearly structured image layer while remaining separately identifiable.

If no `.stp` model is supplied, this section is Not Applicable.

## Images

Images shall be either correctly linked or embedded according to the project's delivery requirements.

Before final export, verify:

- No missing links
- No distorted images
- No low-resolution replacements
- No accidental clipping
- No incorrect image-to-text pairing

---

## Page Numbers

Page numbers shall follow the selected Template File.

They shall be generated consistently.

Do not manually redefine:

- Format
- Font
- Size
- Weight
- Color
- Position

---

## Visual Inspection

After completing the Illustrator document:

1. Export a review PDF or equivalent page preview.
2. Inspect every page at normal reading size.
3. Inspect images at enlarged view.
4. Check text overflow.
5. Check accidental clipping.
6. Check paragraph hierarchy.
7. Check image and text correspondence.
8. Check table boundaries.
9. Check page-number continuity.
10. Correct all confirmed defects.
11. Export a new preview.
12. Repeat the inspection.

The Illustrator file shall not be considered complete based only on script execution or object creation.

### Text Grouping Prohibition

Formal text objects shall not be grouped in the Illustrator production file.

Requirements:

- Every text frame shall remain an independent editable text object.
- H1 text shall not be grouped.
- H2 text shall not be grouped.
- H3 text shall not be grouped.
- Body text shall not be grouped.
- Numbered or bulleted text shall not be grouped.
- Page-number text shall not be grouped.
- Text shall not be grouped with images.
- Text shall not be grouped with icons.
- Text shall not be grouped with decorative objects.
- Text shall not be placed inside a group solely for positioning convenience.

A group shall not contain formal text objects.

Use layers, coordinates, Paragraph Styles and production-script relationships to organize text instead of Illustrator groups.

Text objects shall remain directly selectable and independently editable.

Do not use grouping as a substitute for:

- Alignment.
- Spacing.
- Page positioning.
- Procedure relationships.
- Image/text association.
- Batch movement.

This rule applies to all Template Files and all product-manual projects.
