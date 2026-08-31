# Invalid 3D Linework Reconstruction

## Failure 1 — 3D Reconstruction Activated Without STEP Input

### Failure

Rhino reconstruction is started even though the project was not supplied with an approved `.stp` model.

### Cause

The optional 3D module was treated as a mandatory production stage.

### Solution

Disable the 3D Reconstruction module and continue the normal source-image workflow.

### Prevention

3D Reconstruction activates only when an approved `.stp` model is supplied.

---

## Failure 2 — Invalid or Mismatched STEP Accepted as Geometry Authority

### Failure

An empty, corrupted or unrelated STEP model is used to rebuild product visuals.

### Cause

STEP validation was skipped.

### Solution

Stop 3D reconstruction for the affected visual or project.

Use the approved source-image workflow when possible.

### Prevention

Execute the STEP Validation Gate before treating STEP geometry as authoritative.

---

## Failure 3 — Component Identity Was Guessed

### Failure

An ambiguous Body, Solid or Component is assumed to represent an instruction-critical product part without sufficient evidence.

### Cause

The production process forced a STEP-to-source mapping.

### Solution

Restore the assembled working state.

Do not move the uncertain component.

Use an approved source-image fallback when necessary.

### Prevention

Execute the Component Identification Gate before manipulating instruction-critical geometry.

---

## Failure 4 — Product Geometry Was Invented or Modified

### Failure

Missing or conflicting geometry is modeled, generated, cut, rebuilt, stretched or distorted to imitate the source image.

### Cause

The source raster image was incorrectly treated as a geometry authority.

### Solution

Restore the original STEP geometry.

Use the source image only as an approved reference or fallback.

### Prevention

STEP geometry is authoritative whenever the active 3D Reconstruction module has passed STEP validation.

---

## Failure 5 — Merged Solid Was Artificially Split

### Failure

A merged STEP solid is cut or divided to simulate separate product parts for an exploded view.

### Cause

The reconstruction workflow attempted to reproduce an exploded source image even though the supplied geometry does not contain separable parts.

### Solution

Restore the untouched STEP geometry.

If the exploded relationship is essential, use `SOURCE_IMAGE_FALLBACK`.

### Prevention

Only pre-existing independent Bodies, Solids, Components or Blocks may be moved or rotated.

---

## Failure 6 — Missing Accessory Was Fabricated

### Failure

A charger, cable, cup, hand, liquid, accessory or other missing object is invented because it does not exist in STEP.

### Cause

The system attempted to visually complete missing content.

### Solution

Use the original source-image element when available.

If the object is absent from both STEP and source, do not add it.

### Prevention

Missing geometry or accessories shall never be fabricated.

---

## Failure 7 — Hybrid Visual Retained the Blurry Source Product

### Failure

A new STEP-derived vector product is placed over or beside the old low-resolution source product geometry.

### Cause

The source image was used as a complete overlay rather than as a missing-element fallback.

### Solution

Retain only the required missing non-modeled source element where practical.

Remove the conflicting old source-product portion.

### Prevention

STEP-derived vector product geometry shall remain the primary product representation in Hybrid reconstruction.

---

## Failure 8 — Excessive Line Cleanup Removed Structure

### Failure

Vector linework appears visually clean but important product structure or instructional geometry has disappeared.

### Cause

Visual simplicity was prioritized over instructional clarity.

### Solution

Restore required silhouette, component-boundary, interface and step-critical lines.

### Prevention

Linework simplicity shall never override geometry accuracy or instructional meaning.

---

## Failure 9 — Rhino Output Was Rasterized

### Failure

A usable STEP model was reconstructed but the final product asset entered Illustrator as a screenshot or bitmap.

### Cause

Vector output requirements were not followed.

### Solution

Re-run the approved Rhino vector-generation workflow.

Import editable vector geometry into Illustrator.

### Prevention

Use vector output whenever usable STEP geometry exists.

---

## Failure 10 — Rhino Took Over the User Desktop

### Failure

Rhino production requires foreground mouse, keyboard, viewport or menu operation.

### Cause

The reconstruction process used interactive desktop control instead of supported scripting or automation.

### Solution

Stop the affected operation.

Return to the script-driven workflow or use an approved fallback.

### Prevention

Rhino reconstruction shall use:

`SCRIPT-DRIVEN / NO DESKTOP TAKEOVER`
