# Rhino 7 STEP Vector Linework Reconstruction

## Purpose

This module defines the optional 3D-based technical-linework reconstruction workflow for product manuals.

The objective is to replace low-resolution source product images with clean, editable vector technical linework when an approved STEP model is supplied.

This module is part of the product-manual production system.

It is not a general-purpose 3D modeling, rendering or product-design workflow.

---

## Activation Gate

This module is OPTIONAL.

It becomes active only when the current product-manual project is supplied with an approved `.stp` 3D model.

If no `.stp` model is supplied:

- This module is inactive.
- Rhino 7 shall not be launched.
- The project shall not stop because a 3D model is absent.
- Codex shall not request a 3D model merely because this module exists.
- The normal source-image workflow shall remain active.
- Source images from the original DOCX shall continue to be used according to the existing manual-production rules.
- 3D Reconstruction QA shall be treated as Not Applicable.

This rule applies to all approved Manual Template Files, including:

- 100 × 150 mm
- 140 × 210 mm

unless a future project explicitly overrides the 3D reconstruction workflow.

---

## Approved 3D Input

The approved 3D source format is:

`.stp`

The supplied STEP model is treated as the authoritative source for product geometry when this module is active.

The original STEP file shall remain unchanged.

Never overwrite the original `.stp` file.

---

## STEP Validation Gate

Before the supplied STEP model becomes authoritative for product geometry, Codex shall verify that:

- The `.stp` file can be successfully opened or imported in Rhino 7.
- The file contains usable product geometry.
- The major product silhouette and overall structure reasonably correspond to the product identified by the source DOCX.
- The imported geometry is not obviously empty, corrupted or unrelated to the current product.

If the STEP model cannot be used reliably:

- Do not modify or repair the model by guesswork.
- Do not use the STEP model as geometry authority.
- Record the issue in `QA_REPORT.md`.
- Disable 3D reconstruction for the affected visual or project.
- Continue with the approved source-image workflow when possible.

An unusable or mismatched STEP model shall not cause Codex to invent replacement geometry.

---

## Source Authority

When this module is active, authority is divided as follows.

### Source DOCX Text

The source DOCX remains authoritative for:

- Formal product content
- Instruction order
- Numbering
- Step relationships
- Captions
- Warnings
- Notes
- Text hierarchy
- Image-to-step relationships
- Instructional annotations

### STEP Model

The supplied `.stp` model is authoritative for:

- Product geometry
- Product structure
- Component shape
- Component location in the assembled product
- Mechanical relationship
- Visible product detail

### Source DOCX Images

Source images are primarily references for:

- Viewing direction
- Camera angle
- Composition
- Exploded-view intent
- Step presentation
- Approximate object orientation
- Annotation placement
- Arrow placement
- Number placement
- Instructional relationship
- Missing non-modeled elements

If the source image geometry and the STEP geometry differ:

`STEP geometry takes priority.`

Do not deform or modify the STEP geometry merely to make it match the source image.

The source image shall remain a visual-angle and instructional-composition reference.

---

## Original Geometry Protection

The original STEP geometry shall never be modified.

Production shall use a temporary working copy.

Allowed operations on the working copy include:

- Importing the STEP assembly.
- Reading the existing assembly hierarchy.
- Revealing existing Bodies, Solids or Blocks.
- Moving existing independent components.
- Rotating existing independent components.
- Hiding existing components.
- Showing existing components.
- Creating temporary exploded-view arrangements.
- Creating temporary camera views.
- Creating temporary Make2D geometry.

These operations are permitted only for instructional presentation.

Do not modify the underlying product geometry.

---

## Existing-Part Separation

When the STEP model contains pre-existing independent:

- Bodies
- Solids
- Components
- Assembly objects
- Blocks

they may be separated spatially in the working copy for an exploded instructional view.

Existing components may be:

- Translated
- Rotated

to reproduce the instructional relationship shown in the source image.

This does not authorize geometry modification.

### Assembly / Block Unpacking

An assembly or block structure may be unpacked only when doing so reveals pre-existing independent product objects.

Do not treat individual surfaces or faces of a single physical solid as separate product components merely to simulate an exploded assembly.

---

### Exploded-View Movement Discipline

Exploded-view movement shall follow the instructional intent of the source reference.

Requirements:

- Preserve the assembled position as the original working reference.
- Move components only when the source reference requires separation or explosion.
- Preserve the original component orientation by default.
- Rotate an existing component only when the source reference clearly indicates a different instructional orientation.
- Use only the minimum translation or rotation necessary to make the relationship understandable.
- Preserve the source-supported assembly order and directional relationship.
- Do not create an exaggerated exploded arrangement merely for visual effect.
- Do not move unrelated components merely to make the drawing appear more complex or spacious.

---
  
## Prohibited Geometry Operations

Do not:

- Cut geometry.
- Boolean split geometry.
- Boolean union geometry.
- Rebuild geometry.
- Remodel components.
- Sculpt components.
- Create missing components.
- Guess component boundaries.
- Convert surfaces of one merged solid into invented separate parts.
- Change component proportions.
- Stretch geometry.
- Compress geometry.
- Deform geometry.
- Invent internal structures.
- Invent accessories.
- Replace the supplied product geometry with a generated approximation.

The STEP model shall remain geometrically authoritative.

---

## Merged-Solid Rule

If multiple instructional parts are already irreversibly merged into one solid in the supplied STEP model:

- Do not cut the solid.
- Do not guess the original component boundaries.
- Do not rebuild the missing separation.
- Do not create an artificial exploded structure.

If the exploded relationship is not required for understanding the instruction:

- Use the complete available STEP geometry to generate the vector linework.

If the exploded relationship is essential to the instruction:

- Fall back to the corresponding original source image.

Record the fallback in `QA_REPORT.md`.

---

## Missing Geometry Fallback

The STEP model may not contain all objects visible in the source manual.

Typical missing elements may include:

- Charger
- Charging cable
- Cup
- Accessory
- Hand
- Finger
- Liquid
- Water
- Coffee grounds
- Capsule
- Packaging
- External tool
- Other non-modeled instructional objects

When an object does not exist in the STEP model:

### If the object exists in the original source image

Use the relevant original source-image content as a fallback.

It may be:

- Cropped
- Isolated where practical
- Combined with the new vector linework in Illustrator

### If the object does not exist in either source

Do not add it.

Do not:

- Generate it.
- Draw it from imagination.
- Model it.
- Search the internet for it.
- Replace it with a visually similar object.

Missing content shall never be fabricated.

---

## Hybrid Reconstruction

A final instructional visual may combine:

- Rhino-generated vector product linework
- Source-image fallback elements
- Illustrator-created arrows
- Illustrator-created numbering
- Illustrator-created guide lines
- Illustrator-created text

Example:

Rhino vector product

+

cropped original hand gesture

+

Illustrator action arrow

+

Illustrator number

=

final instructional image

Hybrid reconstruction is permitted when it preserves the original instructional relationship without inventing geometry.
When source-image fallback content is combined with STEP-derived vector linework:

- Retain only the missing non-modeled source element whenever practical.
- Do not retain conflicting low-resolution source product geometry on top of the STEP-derived product linework.
- Crop or isolate the fallback element as cleanly as practical.
- The STEP-derived vector product shall remain the primary product representation.

For example:

If the source image contains a hand pressing the product button and the STEP model contains the product but not the hand:

- Rebuild the product from STEP.
- Retain or isolate the hand from the source image when practical.
- Do not retain the blurry source product underneath the reconstructed STEP product.
  
---

## Camera Matching

Exact pixel-level camera reconstruction is not required.

The objective is visual and instructional similarity.

The Rhino view shall approximate the source image in:

- Main viewing direction
- Front / rear relationship
- Left / right relationship
- Elevation
- Pitch
- General perspective or orthographic appearance
- Component front/back relationship
- Exploded direction
- Instructional focus

The resulting view shall communicate the same operation or structure as the source reference.

Do not distort product geometry to achieve camera matching.

When camera matching and geometry accuracy conflict:

`Geometry accuracy takes priority.`

---

## Technical Linework Style

The default output shall be clean vector technical linework.

Preferred appearance:

- White background
- Simple linework
- No material rendering
- No decorative shading
- No photorealistic rendering
- No unnecessary surface detail
- No unnecessary hidden-line clutter

The linework shall preserve sufficient information to understand the product and the instruction.

---

## Required Lines

Do not remove lines that are necessary to understand:

- Product outer silhouette
- Major component contours
- Component boundaries
- Mechanical interfaces
- Assembly interfaces
- Installation locations
- Holes
- Slots
- Locking structures
- Clips
- Buttons
- Ports
- Important recesses
- Thread-related structures when instructional
- Moving-part boundaries
- Step-critical geometry

Instructional clarity takes priority over extreme visual simplification.

---

## Line Cleanup

Line cleanup is permitted.

The objective is:

`maximum clarity with minimum unnecessary visual noise`

The following may normally be removed when they do not carry instructional meaning:

- Duplicate lines
- Overlapping duplicate curves
- Coincident linework
- Excessive minor fillet edges
- Excessive minor chamfer edges
- Tiny manufacturing details
- Non-instructional internal edges
- Redundant Make2D artifacts
- Visually confusing technical clutter

Do not remove structural or instructional lines merely to make the drawing look cleaner.

Line cleanup may occur:

1. During Rhino linework preparation.
2. During Illustrator linework refinement.

---

## Hidden Lines

Hidden lines are disabled by default.

Use hidden lines only when they are genuinely required to explain:

- An installation location
- An internal interface
- A hidden mechanical relationship
- A necessary assembly relationship

Do not display hidden lines merely because Rhino can generate them.

---

## Rhino Vector Generation

Rhino 7 shall generate editable vector technical linework using:

- Make2D
- Or another Rhino-native vector projection method that preserves the same approved behavior

The final reconstruction asset shall remain vector-based.

Raster screenshots shall not replace available vector geometry.

The preferred delivery to Illustrator is editable AI-compatible vector linework.

If an intermediate vector format is technically required, it shall preserve editable vectors.

---

## Rhino Annotation Prohibition

Rhino is responsible for product geometry linework only.

Do not add the following during the Rhino reconstruction stage:

- Instruction numbers
- Step numbers
- Text
- Translation
- Labels
- Action arrows
- Guide arrows
- Warning symbols
- Decorative callouts

These elements shall be reconstructed later in Adobe Illustrator according to the source reference and the Illustrator production rules.

---

## Illustrator Reconstruction

After Rhino vector linework is generated:

1. Import the editable vector linework into Illustrator.
2. Preserve vector editability.
3. Scale the complete linework proportionally for manual layout.
4. Clean remaining non-instructional line clutter when necessary.
5. Restore source-supported numbering.
6. Restore source-supported arrows.
7. Restore source-supported guide lines.
8. Restore source-supported text.
9. Add source-image fallback elements when required.
10. Preserve the original instructional relationship.

Do not alter product geometry during Illustrator reconstruction.

Do not redraw missing product geometry from imagination.

---

## Reconstruction Decision Classes

Every applicable source visual shall be classified as one of:

### `3D_VECTOR_REBUILT`

The required product geometry exists in STEP and the visual is rebuilt as Rhino vector linework.

### `HYBRID_3D_SOURCE`

The product geometry is rebuilt from STEP, while one or more non-modeled elements are retained from the original source image.

### `SOURCE_IMAGE_FALLBACK`

The required instructional geometry cannot be reproduced from the supplied STEP without prohibited geometry modification, so the original source image is used.

### `SOURCE_IMAGE_DIRECT`

The image does not benefit from or require 3D reconstruction and remains sourced from the original document.

The classification shall be recorded in:

- `LAYOUT_PLAN.md`
- `QA_REPORT.md`

---

## Original Source Preservation

The reconstruction workflow shall never destroy the original source assets.

Preserve:

- Original DOCX
- Original STEP
- Original extracted images

Rhino working files and reconstructed assets shall be treated as derivative production assets.

---

## Rhino 7 Execution Mode

Rhino 7 may launch locally when this module is active.

Rhino production shall be:

`SCRIPT-DRIVEN / NO DESKTOP TAKEOVER`

Rhino may:

- Launch
- Open or import the working STEP model
- Execute scripts
- Set views
- Move or rotate approved working-copy components
- Run Make2D
- Export vector assets
- Save temporary working files
- Close working files

Rhino shall not depend on continuous foreground control.

Do not use:

- Computer Use
- Mouse movement
- Mouse clicking
- Keyboard simulation
- Screen-coordinate clicking
- Manual viewport rotation
- Manual object dragging
- Manual menu navigation
- Repeated foreground application switching

The user shall remain able to use the computer normally while Rhino production runs.

If a required Rhino operation genuinely cannot be completed through supported scripting or automation:

1. Stop the affected reconstruction step.
2. Record the limitation in `QA_REPORT.md`.
3. Use an approved fallback when available.
4. Do not silently take control of the user's desktop.

---

## Final Principle

The 3D reconstruction system shall follow this priority:

`Accurate STEP Geometry`

↓

`Clear Instructional Meaning`

↓

`Visual Similarity to Source Angle`

↓

`Linework Simplicity`

Never sacrifice geometry accuracy or instructional meaning merely to imitate a blurry source image.
