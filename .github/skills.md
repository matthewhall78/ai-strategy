---
name: New Site Page
description: Add a new documentation page to the static HTML site, keeping navigation consistent across all existing pages
category: Page Content & Integration
effort: Low–Medium
uncertainty: Low
inputs:
  - Page title
  - Purpose or description (one sentence)
  - Nav label (short, fits in the pill nav bar)
  - Section it belongs in on index.html (Patterns, Operating Models, Worked Examples, Quickstarts, References)
outputs:
  - New .html page file (kebab-case filename) with full embedded CSS and shared nav
  - Updated index.html with card in the correct section
  - Updated .site-nav block on every existing .html page
  - Updated snippets/site-nav-snippet.html
  - Updated README.md page listing
---

# New Site Page Skill

Create a new page for the site and ensure navigation is fully consistent across every file. This workflow must be completed atomically — partial nav updates leave the site in a broken state.

**For complete 14-step workflow, validation procedures, browser testing, and common issues, see [`.github/skill-new-site-page.md`](./skill-new-site-page.md)**

---

## Skill Quick Reference

| Step | Phase | Key Action |
|------|-------|-----------|
| 1–2 | Planning | Preflight checks, choose kebab-case filename |
| 3–4 | Creation | Create HTML file, add content & CSS |
| 5–8 | Navigation | Add active nav link, update all pages, update snippet |
| 9–10 | Documentation | Update README.md and general-ghcp-resources-links.html |
| 11–12 | Validation | Run 6 validation checks, run 6 browser tests |
| 13–14 | Metrics | Write retrospective record, append metrics entry |

**Validation reference:** See [`.github/validation-checklist.md`](./validation-checklist.md) for 6 pre-push checks with exact commands  
**Testing reference:** See [`.github/testing-guide.md`](./testing-guide.md) for 6 browser test paths  
**Metrics reference:** See [`.github/metrics.md`](./metrics.md) for retrospective record and scorecard templates  

---

---
name: Manage Skills
description: Add, update, and maintain skills in the skills registry with complete documentation and reference files
category: Process & Governance
effort: Low–Medium
uncertainty: Low
inputs:
  - Repeatable workflow name and description
  - Categorization (one of 5 fixed categories)
  - Effort estimate (Low through High)
  - Uncertainty estimate (Low through High)
  - Input/output specifications
outputs:
  - New `.github/skill-{name}.md` detailed procedure file
  - YAML entry added to `skills.md`
  - Cross-references to validation/testing/metrics guides
  - Updated README.md (if skill creates new pages/features)
---

# Manage Skills Skill

Maintain the skills registry in `.github/skills.md`, create new skills with complete procedures, update existing skill definitions, and ensure all skills follow the container file pattern with focused reference files.

**For complete procedures on defining, documenting, validating, and maintaining skills, see [`.github/skill-manage-skills.md`](./skill-manage-skills.md)**

---

## Skill Quick Reference

| Phase | Key Actions |
|-------|-------------|
| Phase 1: Planning | Define scope, categorize, estimate effort/uncertainty, specify inputs/outputs |
| Phase 2: Create Reference File | Create `.github/skill-{name}.md` with all phases, steps, issues, success criteria |
| Phase 3: Update Registry | Add YAML frontmatter + brief description + quick reference table to `skills.md` |
| Phase 4: Documentation | Update README.md and related reference files (validation, testing, metrics) |
| Phase 5: Validation | Verify file structure, test skill on real task |

**Related references:**
- [`.github/validation-checklist.md`](./validation-checklist.md) — When creating skills that require validation
- [`.github/testing-guide.md`](./testing-guide.md) — When creating skills that require browser testing
- [`.github/metrics.md`](./metrics.md) — For categorization guidance and metrics logging

---

## File Organization

**Container file: `skills.md`**
- Lists all skills with YAML frontmatter (name, description, category, effort, uncertainty, inputs, outputs)
- Includes quick reference table for each skill (phases and key actions)
- Links to detailed procedure files
- Shows a template section (in Manage Skills reference file) for adding new skills

**Detailed files: `.github/skill-{name}.md`**
- Complete step-by-step procedure organized by phases
- Validation requirements and test references
- Common issues and fixes specific to this skill
- Success criteria for completion
- References to supporting documents (validation-checklist.md, testing-guide.md, metrics.md)

**Supporting reference files:**
- [`.github/validation-checklist.md`](./validation-checklist.md) — 6 pre-push validation checks
- [`.github/testing-guide.md`](./testing-guide.md) — 6 browser interaction test paths
- [`.github/metrics.md`](./metrics.md) — Metrics categories, retrospective records, efficiency scorecards, quality gates

---

## Adding a New Skill

To add a new skill to the registry:

1. **Define the skill** using Phase 1 of [`.github/skill-manage-skills.md`](./skill-manage-skills.md) (scope, category, effort, uncertainty, inputs, outputs)
2. **Create the detailed reference file** [`.github/skill-{name}.md`](./skill-manage-skills.md) with complete procedures (Phase 2)
3. **Update this file** (`skills.md`) with YAML frontmatter and quick reference (Phase 3)
4. **Update supporting documentation** as needed (Phase 4)
5. **Validate and test** the skill on a real task (Phase 5)
6. **Commit** with message: "Add {Skill Name} skill with complete procedure"

Full details: See [`.github/skill-manage-skills.md`](./skill-manage-skills.md)

---

## Skill Categories Reference

When managing skills, classify them into one of these 5 fixed categories:

| Category | When to Use | Example Skills |
|----------|-------------|-----------------|
| **Page Content & Integration** | New pages, content updates, site map expansion | New Site Page, Update Content |
| **Layout & Responsive Architecture** | Full-page redesigns, grid restructuring | Redesign Dashboard, Fix Responsive Layout |
| **Navigation & Information Architecture** | Nav redesigns, menu changes, filtering | Add Nav Link, Reorganize Menu |
| **Interactive Features & Dashboards** | Charts, data viz, interactive controls, animations | Create Chart, Add Filter Control |
| **Process & Governance** | Workflow guardrails, validation, documentation, instructions | Manage Skills, Update Validation Rules, Document Workflow |

---

## Current Skills

1. **New Site Page** — Add new documentation pages with consistent navigation
2. **Manage Skills** — Maintain and create new skills in the skills registry

Each skill has a corresponding detailed procedure file in `.github/skill-{name}.md`.
