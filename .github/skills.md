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
---

[`.github/skill-manage-skills.md`](./skill-manage-skills.md)

---

## Skill 3: List All Skills

---
name: List All Skills
description: Discover and understand all available skills in the registry, their categorization, effort levels, and uncertainty
category: Process & Governance
effort: Low
uncertainty: Low
---

[`.github/skill-list-all-skills.md`](./skill-list-all-skills.md)

---

## How to Add a New Skill

1. Follow the **Manage Skills** procedure in [`.github/skill-manage-skills.md`](./skill-manage-skills.md)
2. Create a new `.github/skill-{name}.md` file with complete step-by-step workflow
3. Add a new YAML + brief description + link entry to this file (`skills.md`)
4. Commit with message: "Add {Skill Name} skill with complete procedure"

All procedural details, validation requirements, browser tests, and common issues are in the dedicated `.github/skill-{name}.md` files—not here.
