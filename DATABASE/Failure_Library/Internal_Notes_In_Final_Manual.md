# Failure: Internal Notes Appearing in Final Manual

## Symptom

Internal production, source-review or QA information appears inside final consumer-facing manual pages.

Examples include:

- SOURCE NOTE
- CONTENT ISSUE
- CLEARANCE CHECK
- MENU CHECK
- SOURCE CONFIRMATION REQUIRED
- QA STATUS
- PASS
- FAIL
- NEEDS CONFIRMATION
- Database references
- Codex comments
- Production instructions

---

## Root Cause

Internal reports and final manual content were not separated during production.

Review information was incorrectly treated as consumer-facing content.

---

## Corrective Action

Remove all internal production information from the Illustrator manual and final PDF.

Move the information into the appropriate report:

- `CONTENT_ISSUES.md`
- `LAYOUT_PLAN.md`
- `QA_REPORT.md`
- `PROJECT_REPORT.md`

Export a new review PDF and inspect every page again.

---

## Prevention

- Maintain separate final-output and report-output workflows.
- Search the Illustrator file for internal-review keywords.
- Inspect every rendered page before delivery.
- Do not use internal issue cards as consumer-facing content.
- Do not place QA status blocks inside final manual pages.
- Keep unresolved source issues in reports only.

---

## Severity

Critical final-output defect.

The manual shall not be delivered until all internal notes have been removed.
