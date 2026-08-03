# Typography Hierarchy and Paragraph Styles

## Original Hierarchy

Typography hierarchy is part of the source-document structure.

It is not a design preference.

Codex shall identify and preserve:

- H1
- H2
- H3
- Body
- Numbered List
- Bulleted List
- Sub-step
- Note
- Tip
- Warning
- FAQ Question
- FAQ Answer
- Table Header
- Table Body

---

## Prohibited Hierarchy Changes

Do not:

- Promote body text into a heading.
- Promote H3 into H2.
- Promote specification labels into headings.
- Convert list items into headings.
- Convert accessory names into headings.
- Convert part names into headings.
- Create headings that do not exist in the source.
- Flatten subordinate content into the same level.
- Create visual hierarchy through arbitrary font-size changes.

Only hierarchy supported by the source DOCX may be used.

---

## Locked Typography

Font Size and Leading shall come from the selected Template File.

Text of the same hierarchy shall use the same:

- Font
- Weight
- Size
- Leading
- Color
- Paragraph spacing rules
- Tracking rules

Do not manually modify individual paragraphs to solve layout problems.

Required character settings:

- Horizontal Scale: 100%
- Vertical Scale: 100%
- Auto Leading: Prohibited

Tracking shall follow:

`DATABASE/Typography/Tracking_Adjustment.md`

List formatting shall follow:

`DATABASE/Typography/List_Formatting.md`

---

## Required Paragraph Styles

Create the styles required by the project from the following standard system:

- H1
- H2
- H3
- Body
- Numbered H3
- Numbered Body
- Bulleted H3
- Bulleted Body
- Step
- Step Description
- Sub-step
- Note
- Tip
- Warning
- Option
- Specification H3
- Table Header
- Table Body
- FAQ Question
- FAQ Answer
- Page Number

Paragraph Styles shall control:

- Font
- Weight
- Size
- Leading
- Color
- Tracking
- Space Before
- Space After
- Hanging Indent
- Tab Stops
- Horizontal Scale
- Vertical Scale

---

## Heading-to-Content Spacing

The distance between a heading and its directly subordinate content shall use the Leading of the higher-level text.

Do not combine multiple spacing systems.

Prohibited:

- Leading plus large Space After
- Leading plus large Space Before
- Manual movement of separate text frames
- Empty paragraphs inserted as spacing
- Multiple paragraph returns used as spacing

Unless a Template File defines otherwise:

- Heading Space After: 0
- Subordinate content Space Before: 0

Heading spacing shall not be estimated visually.

---

## Numbering

All original numbering types shall be preserved, including:

- `1.`
- `(1)`
- `①`
- Alphabetic numbering
- Bullets
- Symbols

The marker and body text shall remain in the same text unit.

Do not:

- Delete numbering.
- Replace numbering types.
- Separate markers into independent text frames.
- Use wide Word-style tab spacing.
- Allow wrapped lines to return to the marker position.

All list alignment shall use Paragraph Styles and true Hanging Indent.
