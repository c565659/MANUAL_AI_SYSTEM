# Tracking Adjustment

## Purpose

Tracking may be adjusted to improve text composition and create a more visually balanced right edge.

The objective is to reduce visibly uneven line endings while maintaining natural spacing and readability.

---

## Allowed Range

Tracking may be adjusted within the following range:

- Minimum: `-18`
- Maximum: `+18`

The applied value shall remain as close to `0` as possible.

---

## Usage Rules

Tracking adjustment may be used when a minor spacing change can:

- Improve the visual balance of the paragraph's right edge.
- Reduce excessively uneven line endings.
- Avoid an unnecessary line break.
- Improve paragraph composition without changing the approved typography hierarchy.

Tracking shall be applied only when necessary.

Within the same paragraph, the Tracking value shall remain consistent.

Different paragraphs may use different Tracking values when required.

---

## Restrictions

Tracking shall not be used to:

- Force excessive text into an insufficient text area.
- Replace proper text-frame or page-layout adjustment.
- Replace approved font size or Leading.
- Create exact full justification.
- Reduce readability.
- Exceed the permitted range of `-18` to `+18`.

---

## Production Requirement

This rule applies to:

- 100 × 150 mm Template
- 140 × 210 mm Template
- All future Manual Template Files unless explicitly overridden

After the primary layout, line breaks and text-frame widths have been established, Codex shall perform a dedicated Tracking Optimization Pass.

Every applicable formal paragraph shall be evaluated for right-edge visual balance.

Tracking shall begin at `0`.

When a Tracking adjustment can materially improve paragraph composition or make the right edge visually more balanced without reducing readability, an adjustment shall be applied within the approved range:

- Minimum: `-18`
- Maximum: `+18`

The applied value shall remain as close to `0` as possible.

Use only the minimum absolute adjustment necessary to achieve the improvement.

Examples:

- Prefer `-4` over `-12` when both produce an acceptable result.
- Prefer `+6` over `+15` when both produce an acceptable result.
- Keep `0` when adjustment does not produce a meaningful improvement.

Within the same paragraph, the Tracking value shall remain consistent.

Different paragraphs may use different Tracking values when necessary.

The objective is:

- More balanced line endings.
- A visually cleaner right edge.
- Fewer obviously short or awkward final lines.
- Natural character spacing.
- Preserved readability.

Perfect mechanical right-edge alignment is not required.

Tracking shall not be used to create forced full justification.

Tracking shall not replace:

- Proper text-frame width.
- Natural line breaks.
- Correct page layout.
- Approved Font Size.
- Approved Leading.
- Approved paragraph spacing.
- Proper pagination.

A paragraph shall not be considered optimized merely because its Tracking value remains at `0`.

If a value within the approved range provides a clearly better composition without violating any other database rule, the improved value shall be used.
