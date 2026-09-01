# Codex New Manual Project Prompt

Use this prompt to start a new product-manual production project.

Replace all fields enclosed in `< >` before execution.

---

@GitHub

Repository:

`c565659/MANUAL_AI_SYSTEM`

Source DOCX:

`<SOURCE_DOCX_FILENAME>`

Optional STEP 3D Model:

`<STEP_FILENAME OR NONE>`

Product Model:

`<PRODUCT_MODEL>`

Product Name:

`<PRODUCT_NAME>`

Output Language:

`<OUTPUT_LANGUAGE>`

Selected Template:

`<DATABASE/13_Template_100x150.md OR DATABASE/14_Template_140x210.md>`

Required Deliverables:

- Editable Adobe Illustrator file
- Final PDF
- LAYOUT_PLAN.md
- QA_REPORT.md

Project-Specific Formal Content Range:

`<FORMAL_CONTENT_START AND FORMAL_CONTENT_END>`

Project-Specific Exclusions:

`<TEMPLATE PLACEHOLDERS OR INTERNAL NOTES TO EXCLUDE>`

Project-Specific Source Issues:

`<KNOWN INCOMPLETE OR CONFLICTING SOURCE CONTENT>`

---

If `Optional STEP 3D Model` is not `NONE`:

- Activate `DATABASE/3D_Reconstruction/Rhino_7_Vector_Linework.md`.
- Follow the approved optional Rhino 7 STEP reconstruction workflow.
- Read and execute `DATABASE/QA/3D_Reconstruction_Checklist.md`.
- Preserve the supplied STEP model as original source geometry.

If `Optional STEP 3D Model` is `NONE`:

- Do not activate the 3D Reconstruction module.
- Do not launch Rhino.
- Do not request a STEP model.
- Mark 3D Reconstruction QA as Not Applicable.
- Continue normal manual production using the original source-image workflow.

---

Before production:

1. Read README.md.
2. Read the selected Template File.
3. Recursively read all relevant DATABASE modules.
4. Read `DATABASE/Workflow/Resumable_Production_State.md`.
5. Create or resume `PROJECT_STATE.md`.
6. Read the complete source DOCX.
7. Inspect all source images, tables and visual relationships.
8. Follow `DATABASE/Workflow/Codex_Manual_Production_Workflow.md`.
9. Execute the mandatory Automation Capability Gate before full production.
10. If a required automation capability is `BLOCKED`, stop before full production.
11. Follow all applicable Typography, Layout and Illustrator rules.
12. Execute the complete Failure Library and QA Checklist.

Do not rely only on this Prompt.

Do not invent missing database rules.

Do not search the internet.

Do not add product information that is absent from the source DOCX.

Do not place internal source-review or QA notes inside final manual pages.

Create `LAYOUT_PLAN.md` before Illustrator production.

After production, export and visually inspect every page.

Only deliver the project as complete when the final QA result is PASS.
