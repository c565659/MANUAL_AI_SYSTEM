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
- Content shall remain inside its corresponding page frame.

Before final export, disable printing or export visibility for the page-frame outline layer while preserving the outlines in the editable AI file.

Do not create one Illustrator artboard for every manual page.

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

---

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
