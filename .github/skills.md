# Skills Registry

This file is a **catalog** of available skills for the AI website project. Each skill is a repeatable workflow with a dedicated procedure file.

---

## Skill 1: New Site Page

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
  - Section it belongs in on index.html
outputs:
  - New .html page file (kebab-case filename)
  - Updated index.html with card in the correct section
  - Updated .site-nav block on every existing page
  - Updated snippets/site-nav-snippet.html
  - Updated README.md page listing
---

[`.github/skill-new-site-page.md`](./skill-new-site-page.md)

---

## Skill 2: Manage Skills

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

[`.github/skill-manage-skills.md`](./skill-manage-skills.md)

---

## How to Add a New Skill

1. Follow the **Manage Skills** procedure in [`.github/skill-manage-skills.md`](./skill-manage-skills.md)
2. Create a new `.github/skill-{name}.md` file with complete step-by-step workflow
3. Add a new YAML + brief description + link entry to this file (`skills.md`)
4. Commit with message: "Add {Skill Name} skill with complete procedure"

All procedural details, validation requirements, browser tests, and common issues are in the dedicated `.github/skill-{name}.md` files—not here.
