# Manual Layout Rules

## Single Reading Path

Every page shall provide one clear reading path, normally from top to bottom.

Do not use:

- Dashboard layouts
- PPT-style cards
- Marketing modules
- Decorative information cards
- Multiple parallel reading columns
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

---

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

Product Overview and Basic Product Specifications shall remain adjacent.

They should share the same page or a continuous spread when legal space and readability permit.

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
