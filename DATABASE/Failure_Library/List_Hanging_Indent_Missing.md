# Failure: List Hanging Indent Missing

## Symptom

A list item wraps to a second line, but the continuation line does not align with the first character of the body text.

Example:

```text
2. Press and hold the Power Button for
three seconds to turn on the camera.
```

## Root cause

The list was entered as ordinary paragraph text without a proper hanging indent, or alignment was simulated with spaces, tabs, manual line breaks, or manual repositioning.

## Corrective action

Apply a true hanging indent through paragraph settings so all continuation lines align automatically with the body text.

## Prevention

- Use a defined paragraph style for every list type.
- Include list alignment in document-wide QA.
- After fixing one occurrence, inspect the full manual for the same defect.
- Verify alignment again after translation or content revisions.

## Severity

Permanent typography defect. Must be corrected before release.
