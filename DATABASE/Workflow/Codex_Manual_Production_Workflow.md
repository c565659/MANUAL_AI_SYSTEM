# Codex Manual Production Workflow

## Purpose

This file defines the mandatory workflow Codex shall follow when producing an editable Adobe Illustrator product manual.

Codex shall not begin Illustrator production before completing the required source analysis and layout planning.

---

## Required Project Inputs

Before production begins, confirm:

- Source DOCX
- Product model
- Product name
- Output language
- Selected Template File
- Required deliverables
- Formal content range
- Project-specific exclusions
- Project-specific source issues

If a required input is missing, production shall stop until clarification is obtained.

---

## Mandatory Reading

Before production, Codex shall actually read:

1. README.md
2. The selected Template File
3. Relevant Workflow rules
4. Relevant Typography rules
5. Relevant Layout rules
6. Relevant Illustrator rules
7. Relevant Translation rules
8. Failure Library
9. QA Checklist
10. The complete source DOCX
11. All source images, tables, icons and captions
12. The original relationship between text and visual content

Codex shall recursively inspect DATABASE subfolders.

Codex shall not merely state that files were read.

If a required database file is missing or inaccessible:

- Record it in `LAYOUT_PLAN.md`.
- Record it in `QA_REPORT.md`.
- Do not invent the missing rule.
- Request clarification when the missing rule affects content accuracy or locked parameters.

---

## No External Research

The source DOCX and approved repository are the only production sources.

Codex shall not:

- Search the internet.
- Download substitute product images.
- Look up missing specifications.
- Add information from similar products.
- Generate replacement product diagrams.
- Use external manuals as content sources.

Missing or incomplete information shall be preserved and reported rather than invented.

---

## Source Content Integrity

The source DOCX is the authoritative source for product content and original information structure.

Unless copy editing is explicitly requested, Codex shall not:

- Delete formal content.
- Add formal content.
- Rewrite content.
- Summarize content.
- Shorten content.
- Complete unfinished sentences.
- Correct grammar or spelling.
- Change technical terminology.
- Change units.
- Change product names.
- Change App names.
- Change Wi-Fi names.
- Guess missing information.
- Change formal section order.

Source errors and incomplete sentences shall be preserved verbatim and recorded in `QA_REPORT.md`.

---

## Mandatory Execution Sequence

Codex shall execute the project in this order:

1. Read the complete source DOCX.
2. Inspect all source images, tables and visual relationships.
3. Read README and the selected Template File.
4. Read all relevant DATABASE modules.
5. Identify the complete information structure.
6. Identify all Information Groups, Image Groups and Procedures.
7. Create `LAYOUT_PLAN.md`.
8. Create the Illustrator document.
9. Apply Paragraph Styles and the page-number system.
10. Complete the full manual layout.
11. Export a review PDF or equivalent rendered preview.
12. Inspect every page visually.
13. Execute the Failure Library.
14. Execute the full QA Checklist.
15. Correct every confirmed failure.
16. Repeat the full QA.
17. Deliver only when the final QA result is PASS.

No production step may be skipped.

---

## Information Structure Identification

Before layout, identify:

- Section
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
- Information Group
- Image Group
- Description Group
- Procedure
- Table
- FAQ Question
- FAQ Answer

The identified hierarchy shall be documented in `LAYOUT_PLAN.md`.

---

## Layout Plan Requirements

`LAYOUT_PLAN.md` shall be completed before Illustrator production.

It shall include:

- Estimated total page count
- Page-by-page section allocation
- Text start and end range for each page
- Image allocation
- Table allocation
- Information Groups
- Image Groups
- Procedures
- Step and Tip relationships
- Natural page-break positions
- Long-list pagination
- Table pagination
- Heading hierarchy
- Page-number allocation
- Potentially crowded pages
- Potentially underused pages
- Proposed solutions
- Expected content-area utilization

The source DOCX page count shall not determine the final manual page count.

A source DOCX page shall not automatically become one Illustrator page.

Codex shall prove that content can be arranged with locked template parameters.

Font size and Leading shall not be changed after layout begins to solve overflow.

---
---

## Universal Manual File Naming Convention

This naming convention applies to all product-manual projects and all Template Files.

### Required Base Name

The project folder and primary manual files shall use the following base-name structure:

`<Product Model> <Chinese Product Name> 说明书 <YYYYMMDD>`

Required order:

Product Model

↓

One standard half-width space

↓

Chinese Product Name

↓

One standard half-width space

↓

`说明书`

↓

One standard half-width space

↓

Production Date in `YYYYMMDD` format

### Example

`OHFN-101 2层鞋柜 说明书 20260804`

Primary deliverables shall use the same base name:

- `OHFN-101 2层鞋柜 说明书 20260804.ai`
- `OHFN-101 2层鞋柜 说明书 20260804.pdf`

When a separate print-ready PDF is required:

- `OHFN-101 2层鞋柜 说明书 20260804 印刷版.pdf`

The project folder may use:

- `OHFN-101 2层鞋柜 说明书 20260804/`

### Naming Rules

- Preserve the approved Product Model exactly.
- Preserve hyphens that belong to the Product Model.
- Use the approved Chinese Product Name.
- The fixed document-type text shall be `说明书`.
- The date shall use eight digits in `YYYYMMDD` format.
- The date shall represent the day that version of the manual file is produced.
- Use exactly one standard half-width space between the four naming components.
- File extensions shall remain lowercase unless the production system requires otherwise.
- The same base name shall be used consistently across the AI and PDF deliverables.

Do not use:

- Underscores between naming components
- Dates containing hyphens, slashes or periods
- English product names in place of the required Chinese Product Name
- Template dimensions inside the primary file name
- Language codes inside the primary file name
- Arbitrary abbreviations
- Unapproved version labels
- Generic names such as `manual.ai`, `final.pdf` or `new manual.pdf`

### Auxiliary Files

Internal reports and working scripts may retain their standard functional names, including:

- `LAYOUT_PLAN.md`
- `CONTENT_ISSUES.md`
- `QA_REPORT.md`
- `PROJECT_REPORT.md`

The universal manual naming convention primarily controls:

- Project folder
- Editable Illustrator manual
- Final review PDF
- Print-ready PDF
  
## Required Deliverables

At minimum, deliver:

- Editable Adobe Illustrator file
- Final review PDF
- `LAYOUT_PLAN.md`
- `QA_REPORT.md`

When required by the Project Brief, also deliver:

- `CONTENT_ISSUES.md`
- `CONTENT_STRUCTURE.md`
- Print-ready PDF
- Extracted assets
- Working scripts
- `PROJECT_REPORT.md`

The final response shall identify:

1. Repository files actually read
2. Files created
3. Final page count
4. Confirmed production issues corrected
5. Unresolved source issues
6. Final AI path
7. Final PDF path

Only a project with a final QA result of PASS may be reported as complete.
