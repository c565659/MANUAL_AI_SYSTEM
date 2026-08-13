# Template 100 × 150 mm

## Template Status

Official Template

This file is the single authoritative source for all 100 × 150 mm template parameters.

Projects shall inherit these parameters without modification.

---

## Page Setup

- Width: 100 mm
- Height: 150 mm
- Orientation: Portrait
- Color Mode: CMYK
- Unit: mm

---

## Margins

- Top: 10 mm
- Left: 8 mm
- Right: 8 mm
- Bottom Page Number Safe Area: 5 mm

Body content may extend to the legal content boundary immediately above the bottom page-number safe area.

No body text, image, table or other formal content may enter the page-number safe area.

---

## Locked Typography

### H1

- Font Size: 10 pt
- Leading: 12 pt

### H2

- Font Size: 8 pt
- Leading: 14 pt


### H3 / Body

- Font Size: 8 pt
- Leading: 12 pt

Body text uses the same locked Font Size and Leading as H3.

These values are Locked Parameters.

They shall not be modified to reduce page count, fill blank space or create additional visual hierarchy.

---

## Heading Spacing

### H1 to H2 / H3

- Visual Distance: 2.5 mm

When H1 is directly followed by H2 or H3, the required vertical distance shall be exactly `2.5 mm`.

The distance shall be measured:

`visible text edge → visible text edge`

For vertically stacked text:

- Measure from the lowest visible rendered glyph edge of H1.
- Measure to the highest visible rendered glyph edge of the following H2 or H3.

Do not measure from:

- Text-frame bounds.
- Text-frame height.
- Baselines.
- Leading boxes.
- Empty frame space.
- Font metric boxes.

The H1-to-H2 and H1-to-H3 visible text distance shall remain consistent throughout the complete manual.

Do not increase or decrease this distance on individual pages.

### H1 / H2 / H3 to Following Image

- Visual Distance: 5 mm

When H1, H2 or H3 is directly followed by an image, the required vertical distance shall be exactly `5 mm`.

The distance shall be measured:

`visible text edge → visible image-content edge`

For vertically stacked heading and image content:

- Measure from the lowest visible rendered glyph edge of the heading.
- Measure to the highest actual visible content edge of the following image.

Do not measure from:

- Text-frame bounds.
- Image frame bounds.
- Placed-image bounding boxes containing blank margins.
- Transparent image margins.
- Empty white space inside the source image.
- Baselines.
- Leading boxes.

If the source image contains non-instructional blank outer space, that blank space shall not be treated as the visible image-content edge for spacing measurement.

The `5 mm` distance shall remain visually consistent throughout the complete manual.

## Character Settings

- Horizontal Scale: 100%
- Vertical Scale: 100%
- Auto Leading: Prohibited
- Font Size: Locked
- Leading: Locked
- Tracking: Only within the range approved by the Typography database

Text shall not be compressed or stretched through character scaling.

---

## Paragraph Styles

All formal text shall use approved Paragraph Styles.

Text belonging to the same hierarchy shall use the same:

- Font
- Weight
- Size
- Leading
- Color
- Tracking rules
- Paragraph spacing
- List indentation

Manual paragraph-by-paragraph font-size or Leading adjustment is prohibited.

---

## Page Number

Required format:

- EN 01
- EN 02
- EN 03

Requirements:

- Two-digit numbering
- Horizontally centered
- Positioned within the bottom 5 mm page-number area
- Consistent font
- Consistent weight
- Consistent size
- Consistent color
- Consistent position

The page-number system shall not be manually redefined by individual projects.

### Typography

- Font Size: 7 pt
- Leading: 7 pt

---

## Template Restrictions

Do not:

- Reduce font size to reduce page count.
- Increase font size to create unsupported hierarchy.
- Modify Leading to control page height.
- Use Auto Leading.
- Compress text through Horizontal Scale.
- Compress text through Vertical Scale.
- Increase paragraph spacing to fill pages.
- Shrink the primary product image unnecessarily.
- Create early page breaks only for visual balance.
- Mix parameters from another template.

---

## QA Requirements

Verify:

- Artboard is exactly 100 × 150 mm.
- Orientation is Portrait.
- Margins match this Template File.
- H1 is 10 pt / 12 pt.
- H2 is 8 pt / 14 pt.
- H3 and Body are 8 pt / 12 pt.
- Page Number is 7 pt / 7 pt.
- Auto Leading is disabled.
- Horizontal Scale is 100%.
- Vertical Scale is 100%.
- Tracking follows the Typography database.
- Page numbers use the EN xx format.
- No body content enters the page-number safe area.
- H1-to-H2 visible text distance is exactly 2.5 mm.
- H1-to-H3 visible text distance is exactly 2.5 mm.
- H1-to-H2 and H1-to-H3 spacing is measured from visible text to visible text, not from text-frame boundaries.
- H1, H2 and H3 to a directly following image use exactly 5 mm visible-content distance.
- Heading-to-image spacing is measured from visible text to visible image content, not from text-frame or image-frame boundaries.
