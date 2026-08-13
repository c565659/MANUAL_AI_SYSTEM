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
- Color Swatch Name: PANTONE 2286 C
- Color Type: Spot Color
- Alternate RGB Preview: `#74CB00`
- Alternate RGB Value: `R 116 / G 203 / B 0`

H1 shall use the exact spot-color swatch represented in the approved Illustrator reference.

The swatch shall remain a Spot Color.

Do not use:

- A process-color green with a similar appearance.
- An unnamed custom green.
- Another PANTONE green.
- An RGB process swatch in place of the approved Spot Color.
- A CMYK approximation unless process-color conversion is explicitly requested.

### H2

- Typeface: Avenir LT Std
- Weight: 85 Heavy
- Color Mode: CMYK
- Color: `C 0 / M 0 / Y 0 / K 60`

### H3

- Typeface: Avenir LT Std
- Weight: 35 Light
- Color Mode: CMYK
- Color: `C 0 / M 0 / Y 0 / K 60`

### Body

- Typeface: Avenir LT Std
- Weight: 35 Light
- Color Mode: CMYK
- Color: `C 0 / M 0 / Y 0 / K 60`

Body text uses the same typeface, weight and color as H3.

### Page Number

- Typeface: Avenir LT Std
- Weight: 85 Heavy
- Color Mode: CMYK
- Color: `C 0 / M 0 / Y 0 / K 70`
- Font Size: Defined by the selected Template File
- Leading: Defined by the selected Template File

The page number shall use the same typeface and weight as H2, but shall use its own approved color, Font Size and Leading.

Do not substitute:

- Arial
- Helvetica
- Myriad Pro
- System fonts
- Unapproved Avenir weights
- Artificially bolded or lightened text
- Unapproved text colors

Font Size and Leading shall continue to come from the selected Template File.


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

Heading spacing shall remain compact, consistent and controlled by Paragraph Styles.

### Visible Text-to-Text Distance Definition

All vertical spacing between different text hierarchy levels shall be measured from the actual visible text to the actual visible text.

The approved spacing value represents the clear visual distance between the rendered glyphs of the two text elements.

For vertically stacked text:

- The upper reference edge is the lowest visible edge of the rendered glyphs in the upper text element.
- The lower reference edge is the highest visible edge of the rendered glyphs in the following text element.
- The required spacing is the vertical distance between these two visible glyph edges.

Do not measure hierarchy spacing from:

- Text-frame top or bottom bounds.
- Area-text frame height.
- Point-text object bounds when those bounds include non-visible font space.
- Leading boxes.
- Baselines.
- Ascender or descender metric boxes.
- Empty internal text-frame space.
- Overset or reserved frame space.

Text-frame geometry and hierarchy spacing are separate concepts.

A text frame shall still be tightly fitted according to the Illustrator production rules, but even a tightly fitted text-frame boundary shall not replace the visible glyphs as the spacing reference.

If a Template File defines a distance such as `6 mm`, that value means:

`visible text edge → visible text edge`

not:

`text-frame edge → text-frame edge`

This definition applies to:

- H1 to H2
- H1 to H3
- H2 to H3
- Heading to directly subordinate text whenever a specific visual distance is defined

This rule applies to all Template Files and all product-manual projects.

### H1 to Subordinate Heading

The distance between H1 and the directly following H2 or H3 shall follow the exact spacing rule defined by the selected Template File.

If the selected Template File defines a visual distance in millimeters, that value takes priority.

If no template-specific distance is defined, the visual distance between H1 and the directly following H2 or H3 shall equal one H1 Leading value defined by the selected Template File.

A template-specific spacing value always takes priority over this fallback rule.

The distance shall be measured from visible text to visible text, not from oversized text-frame boundaries.

### H2 to H3

The distance between H2 and the directly following H3 shall equal one H3 Leading value defined by the selected Template File.

### Heading to Body Content

The distance between a heading and its directly subordinate body content shall use the approved Leading rhythm of the higher-level text.

Do not combine multiple spacing systems.

Prohibited combinations include:

- Leading plus additional large Space After
- Leading plus additional large Space Before
- Empty paragraphs used as spacing
- Multiple paragraph returns
- Independent text-frame movement
- Manual vertical repositioning of individual headings

Unless a Template File explicitly defines otherwise:

- Heading Space After: 0
- Subordinate content Space Before: 0

The page shall remain compact and orderly.

Heading spacing shall not be estimated visually or enlarged to fill unused page space.
### Spacing Consistency Across Pages

Once a heading relationship is defined by the selected Template File or Typography database, the same relationship shall remain visually identical throughout the complete manual.

For example:

- H1 to H2 shall not become larger on later pages.
- H1 to H3 shall not become larger on later pages.
- H2 to H3 shall not become larger on later pages.
- Heading-to-body spacing shall not vary according to available page space.

Do not enlarge heading spacing:

- To fill unused page space.
- At the beginning of a new page.
- After a page break.
- In later chapters.
- Around images.
- Because a text frame contains unused internal height.

Paragraph Styles and tightly fitted text frames shall produce consistent spacing throughout the document.

A spacing relationship that is acceptable on one page shall not be arbitrarily changed on another page.
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
