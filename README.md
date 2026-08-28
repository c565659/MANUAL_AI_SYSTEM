# AI Manual Production System

Version: V1.0
Status: Draft
Last Updated: 2026-07-30

---

# 1. Project Overview

AI Manual Production System（以下简称 AMPS）是一套用于产品说明书制作的知识库系统。

本系统不是普通文档仓库，而是一个可持续维护的标准化知识库。

数据库中的所有规则均来源于实际项目经验，并经过整理、验证和标准化。

数据库的目标不是保存聊天记录，而是沉淀能够长期复用的专业知识。

---

# 2. Purpose

建立统一的产品说明书制作标准。

实现：

- 统一制作流程
- 统一排版规范
- 统一翻译规范
- 统一 Illustrator 制作规范
- 统一 QA 检查流程
- 统一 Prompt
- 持续积累项目经验

最终形成可以持续成长的知识体系。

---

# 3. Scope

本数据库仅适用于产品说明书制作。

包含：

- Workflow
- Typography
- Layout
- Illustrator
- 3D Reconstruction（仅限产品说明书技术线稿重建）
- Translation
- QA
- Prompt
- Failure Library

不包含：

- C4D
- Blender
- KeyShot
- Photoshop 创意设计
- 视频制作
- AI 绘图

上述内容将建立独立数据库。

Exception:

When a product-manual project is supplied with an approved `.stp` model, Rhino 7-based vector technical-linework reconstruction is part of this Manual AI System.

This exception applies only to reconstruction of product-manual instructional visuals.

It does not include general 3D modeling, product design, rendering, animation or creative visualization.

---

# 4. Core Principles

本数据库遵循以下原则。

## Principle 1

Knowledge First

数据库保存知识，不保存聊天记录。

---

## Principle 2

Reusable

所有内容必须能够应用于多个项目。

如果只能用于单一项目，则不进入数据库。

---

## Principle 3

Verifiable

所有规则必须能够检查。

不能验证的经验不得作为标准。

---

## Principle 4

Consistency

所有说明书使用统一规范。

任何项目不得随意修改基础规则。

---

## Principle 5

Continuous Improvement

数据库持续更新。

每完成一个项目，都应复盘经验。

新的经验经过确认后加入数据库。

---

# 5. Repository Structure

README.md

DATABASE/

01_Workflow.md

02_Typography.md

03_Layout.md

04_Illustrator_Standard.md

05_Translation_Standard.md

06_QA_Checklist.md

07_Failure_Library.md

08_Prompt_Library.md
# Part 2 — Rule System

---

# 6. Rule System

The Manual AI System is built upon a unified production standard for product manuals.

All rules within this database shall follow the principles defined in this document.

Every project, template and workflow must comply with these standards.

---

## Standardization

All manuals shall follow the same production standard.

Personal habits, temporary project requirements or individual design preferences shall never replace database standards.

---

## Reusability

Every verified production experience should become reusable knowledge.

Project experience should evolve into permanent database rules instead of remaining isolated within individual projects.

---

## Verifiability

Every rule must be objectively verifiable.

Every production result shall be checked through the QA Checklist.

Rules that cannot be verified shall not become official standards.

---

## Traceability

Every rule must have a clear origin.

New standards shall be traceable to one or more of the following:

- Project Experience
- Template Optimization
- Failure Library
- QA Checklist
- Database Revision

---

## Consistency

All database files shall remain consistent.

Conflicting definitions across different documents are not permitted.

Whenever a rule changes, all affected database documents shall be updated accordingly.

---

# 7. Documentation Standards

All Markdown documents inside this repository shall follow a unified documentation standard.

Including but not limited to:

- Heading hierarchy
- Terminology
- Naming convention
- Markdown structure
- Table format
- List format
- Example format

The entire database should provide a consistent reading experience.

---

## List Formatting

All numbered lists and bulleted lists shall use Hanging Indent.

Word-style large tab spacing is prohibited.

List markers and body text must belong to the same Paragraph Style.

QA shall verify:

- Hanging Indent
- Marker alignment
- Text alignment
- Wrapped line alignment

Violations shall be recorded in the Failure Library.

---

# 8. Standard Template System

The Manual AI System adopts a **Template Driven** production model.

Every manual shall be produced based on an official template.

Projects inherit template specifications.

Projects do not define specifications.

---

## Supported Templates

The database currently maintains two official templates.

### Template A

**Page Size**

100 × 150 mm

Typical applications:

- Compact manuals
- Accessory manuals
- Small-format product manuals

Specification File:

DATABASE/13_Template_100x150.md

---

### Template B

**Page Size**

140 × 210 mm

Typical applications:

- Standard product manuals
- Multi-language manuals
- Information-rich manuals

Specification File:

DATABASE/14_Template_140x210.md

---

## Template Driven Principle

Templates are the only source of layout specifications.

Projects shall inherit template specifications without modification.

Template specifications include, but are not limited to:

- Artboard
- Orientation
- Margins
- Safe Area
- Grid System
- Typography
- Heading Hierarchy
- Font Size
- Leading
- Tracking
- Paragraph Styles
- Hanging Indent
- List Formatting
- Image System
- Table Style
- Page Number Style
- Layout Rules

Projects shall never redefine any template specification.

---

## Locked Parameters

Certain template specifications are defined as Locked Parameters.

Unless officially updated within the database, the following parameters shall remain unchanged:

- Typography Hierarchy
- Font Size
- Leading
- Paragraph Styles
- Page Number Style
- Margins
- Safe Area
- Artboard Size
- Horizontal Scale
- Vertical Scale

Only parameters explicitly permitted by the database (such as Tracking adjustment) may be modified.

---

## Single Source of Truth

Each official Template File is the single authoritative source for its layout specification.

Responsibilities are divided as follows:

**README.md**

Defines database policies, template management principles and production workflow.

**Template Files**

Maintain all template specifications.

**Projects**

Execute production according to the selected template.

Template parameters shall never be duplicated across multiple database files.

Whenever template specifications change, only the corresponding Template File shall be updated.

README, QA Checklist and Failure Library shall only update affected rules without duplicating specification values.

The database follows one fundamental principle:

**One Parameter. One Source.**

---

## Template Selection Rules

Every project shall determine its template before production begins.

Once selected:

- Templates shall not be switched.
- Different template systems shall not be mixed.
- Different typography systems shall not be mixed.
- Different Paragraph Styles shall not be mixed.
- Different margin systems shall not be mixed.

Projects inherit templates.

Projects do not modify templates.

---

## New Template Approval

A new template may only be created when all of the following conditions are satisfied:

- Long-term business demand exists.
- Existing templates cannot satisfy the requirement.
- The template has been validated through production.
- Database review has been completed.

When a new template is approved, the following documents shall be updated accordingly:

- README.md
- Template Specification File
- QA Checklist
- Failure Library (if applicable)

No unofficial template shall become part of the production system.

---

# 9. Database Architecture

The Manual AI System adopts a three-layer architecture.

Policy

↓

Specification

↓

Execution

Responsibilities:

| Layer | Responsibility |
|--------|----------------|
| Policy | Defines database principles, workflow and governance. |
| Specification | Defines all template specifications and production standards. |
| Execution | Produces manuals according to the selected template. |

Projects shall not bypass Template Files.

Template Files shall not violate database policies.

The three layers together form the complete production system.

---

# 10. Version Management

The database follows a unified version management system.

Every revision shall include:

- Version Number
- Revision Date
- Updated Files
- Revision Description

Version format:

Major.Minor.Revision

Example:

v1.0.0

---

# 11. Knowledge Update Workflow

Every new production experience shall pass through the following workflow before becoming an official database rule.

Project Experience

↓

Identify Problem

↓

Analyze Cause

↓

Create Candidate Rule

↓

Verification

↓

Update Database

↓

Update QA Checklist

↓

Update Failure Library

↓

Release New Version

Only verified knowledge may become part of the Manual AI System.
# Part 3 — Repository Guide

---

# 12. Repository Structure

The Manual AI System is organized as a modular knowledge database.

Each module has one clearly defined responsibility.

Modules cooperate with each other but never duplicate responsibilities.

The repository shall always remain maintainable, scalable and easy to audit.

---

## Repository Structure

README.md

LEGACY/
    MANUAL_AI_SYSTEM_PHASE1_RECOVERED.md

DATABASE/
    01_Workflow.md
    02_Typography.md
    03_Layout.md
    04_Illustrator_Standard.md
    05_Translation_Standard.md
    06_QA_Checklist.md
    07_Failure_Library.md
    08_Prompt_Library.md

    13_Template_100x150.md
    14_Template_140x210.md

    3D_Reconstruction/
        Rhino_7_Vector_Linework.md
        
    16_Layout_Optimization.md

---

# 13. Module Responsibilities

Each module owns one responsibility only.

Responsibilities shall never overlap.

---

## README.md

Defines:

- Database policies
- Production principles
- Repository architecture
- Template management
- Reading protocol

README defines policy.

README does not define template parameters.

---

## LEGACY

Stores historical production knowledge.

Historical content shall never directly override current database standards.

Only verified knowledge may be promoted into DATABASE.

---

## Workflow

Defines the standard production workflow.

Including:

- Preparation
- Production
- Review
- Delivery

---

## Typography

Defines typography rules.

Including:

- Typography hierarchy
- Paragraph behavior
- Numbering
- Hanging Indent
- List formatting

Template Files define parameter values.

Typography defines usage rules.

---

## Layout

Defines layout methodology.

Including:

- Reading flow
- Information hierarchy
- White space
- Page utilization
- Image grouping
- Procedure grouping

Layout defines behavior.

Template Files define dimensions.

---

## Illustrator Standard

Defines Adobe Illustrator production standards.

Including:

- Layer organization
- Editable text
- Linked images
- Object naming
- File organization
- Export requirements

---

## 3D Reconstruction

Defines optional STEP-based reconstruction of product-manual technical visuals.

Including:

- STEP geometry authority
- Rhino 7 vector reconstruction
- Camera-reference matching
- Exploded working views
- Source-image fallback
- Hybrid 3D/source visuals
- Vector line cleanup

This module activates only when an approved `.stp` model is supplied.

When no `.stp` model is supplied, normal manual production remains unchanged.

---

## Translation Standard

Defines translation rules.

Including:

- Terminology
- Capitalization
- Unit consistency
- Translation workflow

Translation shall never modify source hierarchy.

---

## QA Checklist

Defines every inspection item.

QA verifies production quality.

QA does not create production standards.

---

## Failure Library

Stores verified production failures.

Each record shall include:

- Failure
- Cause
- Solution
- Prevention

Verified failures become future production standards.

---

## Prompt Library

Stores reusable prompts.

Prompts shall reference database standards.

Prompts shall never redefine database standards.

---

## Template Files

Each template maintains one official specification.

Including:

- Artboard
- Margins
- Typography
- Paragraph Styles
- Grid
- Page Number
- Layout Parameters
- Locked Parameters

Template Files are the only specification source.

---

## Layout Optimization

Stores verified layout optimization strategies.

Optimization improves production efficiency.

Optimization shall never violate template specifications.

---

# 14. Standard Production Workflow

Every project shall follow the same production workflow.

Select Template

↓

Read README

↓

Read Template Specification

↓

Read DATABASE

↓

Read Original Document

↓

Create Layout Plan

↓

Illustrator Production

↓

Quality Assurance

↓

Final Delivery

No step may be skipped.

---

# 15. AI Repository Reading Protocol

Before starting any project, AI shall read the repository in the following order.

README

↓

Template File

↓

Relevant DATABASE Modules

↓

Failure Library

↓

QA Checklist

↓

Original Document

↓

Project Production

The repository shall be completely understood before production begins.

Partial reading is prohibited.

Skipping database modules is prohibited.

Assuming undefined rules is prohibited.

---

## Conflict Resolution

When conflicting information exists, the following priority shall always apply.

Original Document

↓

README

↓

Template File

↓

DATABASE Rules

↓

Failure Library

↓

QA Checklist

↓

Default Experience

Lower-priority information shall never override higher-priority information.

When conflicts cannot be resolved, production shall stop until clarification is obtained.

---

## AI Production Principles

AI shall never:

- invent production standards
- redefine template parameters
- modify Typography Hierarchy
- skip QA
- ignore Failure Library
- create undocumented rules
- replace database rules with personal experience

If the database contains no applicable rule,

AI shall report the limitation instead of creating a new rule.

---

# 16. Database Maintenance

The Manual AI System evolves through verified production experience.

Every improvement shall follow the same maintenance workflow.

Identify Problem

↓

Analyze Cause

↓

Verify Solution

↓

Determine Database Impact

↓

Update Corresponding Module

↓

Update QA

↓

Update Failure Library

↓

Release New Version

Only verified knowledge may become permanent database standards.

---

# 17. Repository Expansion Rules

The repository is designed for long-term expansion.

Future modules may include:

- Additional Template Files
- Industry Standards
- Automation Standards
- AI Workflow Modules
- Production Tools
- New QA Modules

Every new module shall satisfy all of the following requirements.

One Responsibility

Each module owns one responsibility only.

One Source

Each specification has one authoritative source.

No Duplication

The same rule shall never be maintained in multiple locations.

Backward Compatibility

Existing production standards shall remain stable unless officially revised.

---

# 18. Repository Philosophy

The Manual AI System is not a collection of project experience.

It is a standardized production system.

Policy defines principles.

Templates define specifications.

Projects execute specifications.

QA verifies execution.

Failure Library improves the system.

Every completed project shall make the database stronger.

Every verified rule shall make future production more efficient.

The repository shall continuously evolve into a reliable, reusable and scalable production standard.
