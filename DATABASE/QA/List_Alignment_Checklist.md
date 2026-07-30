# QA Checklist: List Alignment

## Check scope

Inspect every numbered, alphabetic, bullet, and symbol list in the manual.

## Pass criteria

- Continuation lines begin directly under the first character of the body text.
- The alignment remains correct after editing, translation, and text reflow.
- Hanging indents are implemented with paragraph settings.

## Fail criteria

- Continuation lines align with the list marker or page margin.
- Different list items use inconsistent continuation-line indents.
- Spaces, tabs, manual line breaks, or manually moved lines are used to fake alignment.

## Mandatory QA action

Any failure must be corrected before final export. The entire document must then be rescanned for the same defect, because this error commonly appears in multiple locations.
