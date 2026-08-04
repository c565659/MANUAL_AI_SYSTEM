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

## Official Typeface and Weight System

Avenir LT Std is the official typeface family for English product manuals.

The following hierarchy shall be used:

### H1

- Typeface: Avenir LT Std
- Weight: 95 Black
- Color: PANTONE 2286 C
- Color Type: Spot Color

### H2

- Typeface: Avenir LT Std
- Weight: 85 Heavy

### H3

- Typeface: Avenir LT Std
- Weight: 35 Light

### Body

- Typeface: Avenir LT Std
- Weight: 35 Light

### Page Number

- Typeface: Avenir LT Std
- Weight: 85 Heavy
- Font Size: Defined by the selected Template File

The page number shall use the same typeface and weight as H2, while retaining its own approved font size.

Do not substitute:

- Arial
- Helvetica
- Myriad Pro
- System fonts
- Unapproved Avenir weights
- Artificially bolded or lightened text

The H1 green shall be created as the spot color:

`PANTONE 2286 C`

Do not replace the approved spot color with a visually similar CMYK or RGB color unless the project explicitly requires process-color conversion.

Font size and Leading shall continue to come from the selected Template File.
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
