# Manual Layout Rules

## Single Reading Path

Every page shall provide one clear reading path, normally from top to bottom.

Do not use:

- Dashboard layouts
- PPT-style cards
- Marketing modules
- Decorative information cards
- Multiple parallel reading columns, except the approved two-column Product Overview part-list layout
- Unrelated Procedures positioned side by side
- Text wrapping around operational images
- Infographic-style replacements for source content

The final document shall look like a professional product manual, not a presentation, report or promotional brochure.

---

## Pagination Priority

Page breaks shall follow this priority:

1. Procedure integrity
2. FAQ question-and-answer integrity
3. Image and description integrity
4. Table-row integrity
5. Complete numbered-item integrity
6. Efficient use of available page space
7. Visual balance

If the current page can legally contain the next complete content unit, the content shall remain on the current page.

Do not create an early page break only to make the next page appear visually balanced.

### Strict Page-Break Control

A page break shall not occur while substantial legal content space remains unused.

If approximately half or more of the usable content area remains available, continuing to the next page is prohibited unless one of the following conditions applies:

1. The next content begins a new H1 section.
2. The next complete image cannot legally fit in the remaining space at a readable size.
3. The next complete table cannot legally fit without splitting a protected row or destroying readability.
4. The next complete Procedure or Image Group cannot fit without violating an approved keep-together rule.
5. A locked Template parameter would otherwise be violated.

The following are not valid reasons for an early page break:

- Visual balance.
- Desire for a cleaner-looking next page.
- Oversized empty heading text frames.
- Artificially reserved white space.
- Minor image-size differences.
- A preference to begin H2 or H3 on a fresh page.

Before creating a page break, Codex shall verify whether the next complete legal content unit can fit on the current page.

If it can fit, it shall remain on the current page.

---

### Mandatory Pagination Fit Audit

Pagination shall be determined from measurable content geometry rather than source-document page boundaries or subjective visual preference.

Before every page break, production shall determine:

- Remaining usable page height
- Height of the next complete legal content unit
- Required approved spacing before that unit
- Keep-together requirements
- Template-safe-area restrictions

Required decision:

`next complete unit height + required spacing <= remaining legal height`

If TRUE:

- The next complete unit shall remain on the current page.
- A page break is prohibited.

If FALSE:

- A page break may occur when required by the approved pagination rules.

Every early page break shall be traceable to a valid reason.

Approved page-break reason codes include:

- `NEW_H1_SECTION`
- `PROCEDURE_KEEP_TOGETHER`
- `IMAGE_GROUP_CANNOT_FIT`
- `TABLE_ROW_PROTECTION`
- `NUMBERED_ITEM_PROTECTION`
- `TEMPLATE_LIMIT`

The following is a QA failure:

`NEXT_UNIT_FITS = TRUE`
+
`PAGE_BREAK = TRUE`

Source DOCX page boundaries shall never be treated as final Illustrator page boundaries.

## Content That Shall Not Be Split

Do not split:

- One complete numbered item
- One Step and its corresponding image
- One FAQ question and answer
- One table row
- One Note and its parent Procedure
- One subordinate item and its parent item
- One complete Image Group
- One short product-information group

A heading shall not remain alone at the bottom of a page.

---

## Page Utilization

When excessive blank space appears, check in this order:

1. Incorrect early page break
2. Another complete numbered item that can fit
3. Another complete Procedure Group that can fit
4. A main image that can be enlarged proportionally
5. Text-frame width and natural line breaks
6. Reasonable intentional white space

Do not fill blank space by:

- Increasing heading distance
- Increasing paragraph spacing
- Changing font size
- Changing Leading
- Removing content
- Removing numbering
- Compressing or stretching text
- Shrinking important images
- Changing reading order

A normal page containing meaningless blank space greater than approximately half of the usable content area shall fail QA unless the next complete group cannot legally fit.
### Bottom-Space Control

Except when the following page begins a new H1 section, a normal content page shall not contain a large unused area at the bottom.

When excessive bottom space appears, attempt the following in order:

1. Continue the next complete content unit on the current page.
2. Correct an unnecessary early page break.
3. Reflow continuous text naturally.
4. Enlarge the relevant image proportionally.
5. Rebalance the complete Procedure or Information Group.
6. Adjust legal image placement without changing the reading order.

Large intentional white space may be used before a new H1 section when it clearly supports a major chapter transition.

Large bottom space shall not be created merely for visual decoration or artificial page balance.

Normal pages shall remain compact, orderly and efficiently used.
---

## Image System

Source images are functional information and shall be treated as primary content.

Images shall:

- Preserve original proportions.
- Remain clear and printable.
- Remain close to corresponding text.
- Preserve numbered callouts and guide lines.
- Avoid cropping important instructions.
- Avoid distortion.
- Avoid unnecessary raster degradation.

Do not:

- Replace source images with internet images.
- Generate substitute product diagrams.
- Redraw inaccurate product structures.
- Stretch images.
- Compress images disproportionately.
- Make the main product image too small to read.

Images belonging to the same Procedure shall use consistent:

- Scale
- Alignment
- Center line
- Spacing

Images in the same group should normally remain within approximately ±10% scale variation unless source content requires otherwise.

### Source Image Sequence Preservation

The spatial and sequential relationship between source images is part of the source-document structure.

When multiple source images appear consecutively with no formal text between them, they shall be treated as one continuous Image Group.

If the source presents an image sequence:

Image A → Image B → Image C

with no formal text between the images, the final manual shall preserve that uninterrupted image sequence.

Do not insert:

- Body text
- Step descriptions
- Notes
- Captions
- Headings
- Other unrelated content

between consecutive source images unless corresponding formal text exists between those images in the source document.

If the original source image sequence reads from left to right, preserve the left-to-right instructional sequence whenever the final page format permits it.

Text may be placed between two source images only when the source document itself establishes text between those images.

Do not reinterpret a continuous source image sequence into alternating:

Image → Text → Image → Text

unless that alternating structure exists in the source.

This rule applies to all Template Files.

### Image Size Consistency

Images belonging to the same chapter, Procedure or comparable Information Group shall remain visually consistent in size.

Comparable images should normally remain within approximately ±10% apparent-size variation.

Image size may be adjusted according to available page space when necessary.

However:

- The visual subject shall remain prominent.
- The operational action shall remain easy to understand.
- Important details shall remain readable.
- Images shall not be reduced merely to fit more text.
- Mechanical equality shall not make an important image too small.
- Images of the same function shall not appear randomly large and small.

Visual prominence and instructional clarity take priority over mechanical image equality.

---

## Heading-Description Information Units

A subordinate heading and the descriptive text that directly explains it shall normally form one complete Information Unit.

Example:

H3 / Numbered Heading

↓

Direct Description

These elements belong to the same Information Unit and shall not receive the normal inter-unit spacing between them.

The approved spacing shall occur between complete Information Units.

The required visual distance between two consecutive Information Units is exactly `4 mm`.

This distance applies to all Template Files unless explicitly overridden by a future Template File.

Example:

Unit 1:
5. Stimulation Mode
Direct description

↓

Approved inter-unit spacing

↓

Unit 2:
6. Expression Mode
Direct description

Spacing between Information Units shall be measured from:

- The lowest visible rendered glyph edge of the final text in the previous unit
- To the highest visible rendered glyph edge of the first heading in the next unit

Do not calculate the spacing from heading-to-heading when descriptive text exists between them.

Do not use text-frame boundaries as the spacing reference.

An Information Unit should remain together whenever it legally fits on the page.

## Procedure Groups

A Procedure Group normally consists of:

Step

↓

Corresponding Image

↓

Description

↓

Tip / Note / Sub-step

The exact Presentation Pattern shall follow the source DOCX.

Do not:

- Place all images first and all text afterward.
- Move Tips away from their Steps.
- Pair one Step's image with another Step's description.
- Split a small Procedure unnecessarily.
- Position unrelated Procedures side by side.

---

## Product Overview

The main product image shall be large enough to read all callouts and part labels.

The following relationships shall remain accurate:

- Product image
- Numbering
- Guide lines
- Part names
- Part list

Do not:

- Remove numbering.
- Change numbering.
- Exchange part names.
- Reduce the product image excessively.
- Allow guide lines to become confusing.
- Replace the diagram with a decorative illustration.

Unrelated content shall never be inserted between Product Overview and Basic Product Specifications.
### Product Overview Part-List Columns

When the Product Overview contains a long numbered part list, use a compact two-column layout when this improves page utilization and readability.

For an even number of items:

- Divide the list evenly between the two columns.
- Preserve numerical reading order within each column.

Example for 16 items:

Left column:

1–8

Right column:

9–16

When odd/even distribution is required:

- Left column: odd-numbered items (`1, 3, 5, 7...`)
- Right column: even-numbered items (`2, 4, 6, 8...`)

Both columns shall use:

- The same typography.
- The same line spacing.
- The same hanging-indent system.
- Consistent column alignment.
- Consistent vertical rhythm.

Do not:

- Randomly distribute items between columns.
- Separate a number from its part name.
- Create decorative cards for individual parts.
- Allow the two-column treatment to obscure correspondence with the Product Overview diagram.

### Product Overview and Specifications Same-Page Rule

Product Overview and Basic Product Specifications shall be treated as one combined page-level Information Group.

They shall be placed on the same final manual page.

To achieve this:

1. Use the approved two-column format for long Product Overview part lists.
2. Adjust the Product Overview image size proportionally.
3. Reduce unnecessary image outer whitespace where no instructional information is removed.
4. Reflow the part list efficiently.
5. Use the complete legal content width and height.

The Product Overview image may be scaled down proportionally when necessary, but:

- Callout numbers shall remain readable.
- Guide lines shall remain clear.
- Product details shall remain understandable.
- The image shall not be distorted.
- The image shall not be cropped in a way that removes instructional information.

Do not move Basic Product Specifications to the next page merely to preserve an unnecessarily large Product Overview image.

If both sections genuinely cannot fit on one page without violating readability or locked Template parameters, stop and report the conflict instead of silently separating them.
---

## Tables

Tables shall preserve source meaning.

Requirements:

- Use a consistent Table Style.
- Merge cells according to source semantics.
- Preserve meaningful blank cells.
- Use consistent Padding.
- Vertically center cell text.
- Allocate more width to long-text columns.
- Allocate less width to short-status columns.
- Keep table rows intact.
- Repeat table headers after page breaks.
- Preserve column widths across continued pages.

Do not:

- Convert tables into cards.
- Convert rows into unrelated text frames.
- Add decorative icons.
- Change data relationships.
- Fill blank semantic cells with guessed content.
- Rasterize a rebuildable table as a screenshot.
- Divide all columns equally when content length differs.

---

## FAQ Groups

Each FAQ question and its answer form one complete Information Group.

Do not separate a question from its answer across pages.

When the remaining space cannot contain the full group, move the entire group to the next page.

Do not convert FAQ groups into decorative cards unless the source DOCX explicitly uses that structure.

---

## Final-Manual Cleanliness

The final AI and PDF shall contain only approved consumer-facing manual content.

The following belong only in project reports:

- CONTENT ISSUE
- SOURCE NOTE
- SOURCE CHECK
- CLEARANCE CHECK
- MENU CHECK
- QA STATUS
- PASS
- FAIL
- NEEDS CONFIRMATION
- Internal comments
- Production instructions
- Database references
- Codex notes
- Template placeholders
- Chinese production notes

Internal reports and final manual pages shall remain completely separate.

---

## Template Placeholder Exclusion

Template placeholder sections shall not automatically become final content.

Unless explicitly confirmed as formal source content, exclude:

- WELCOME GUIDE template section
- CUSTOMER SERVICE template section
- `【用模版】`
- Internal Chinese placeholders
- Internal production notes
- Temporary product names

Identical wording that appears as genuine product content shall still be preserved.

Example:

A physical accessory named “Welcome Guide” inside PACKAGE CONTENTS is formal content and shall not be removed.
---

## Inline Icons

When a functional icon appears inline with text or immediately after a text label, its visual size shall be proportional to the surrounding typography.

Recommended visual size:

- Approximately `1.5 ×` the height of the adjacent uppercase letter.

Examples include icons placed beside labels such as:

- Power Button
- Speed Button
- Timer Button
- Oscillation Button

Requirements:

- The icon shall remain visually subordinate to the text label.
- The icon shall be large enough to remain recognizable.
- The icon shall not dominate the heading or label.
- Preserve the icon's original proportions.
- Align the icon visually with the adjacent text line.
- Maintain a consistent text-to-icon relationship throughout the same chapter.

Do not:

- Enlarge inline icons to illustration size.
- Use different icon scales for equivalent controls.
- Allow icons to create excessive line height.
- Allow the icon bounding box to create unnecessary vertical spacing.
- Place the icon far away from the text it identifies.

This rule applies to all Template Files.

## Text-to-Image Spacing Measurement

When a Template File defines a vertical distance between text and a directly following image, the distance shall be measured from actual visible content to actual visible content.

Required measurement:

`visible rendered text edge → visible image-content edge`

The upper reference shall be the lowest visible rendered glyph edge of the text.

The lower reference shall be the highest actual visible instructional content edge of the image.

Do not use:

- Text-frame bounds.
- Image-frame bounds.
- Placed-image bounding boxes containing blank space.
- Transparent outer margins.
- Non-instructional white margins.
- Text baselines.
- Leading boxes.

Text-frame geometry and image-frame geometry shall not redefine the approved visual spacing.

A Template File may define the exact distance in millimeters.

Template-specific values take priority over general layout defaults.

This measurement definition applies to all Template Files.
