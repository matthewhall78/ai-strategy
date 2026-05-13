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

## Skill Container Template

To add more skills, copy this template and fill in the details:

```markdown
---
name: Skill Name
description: One-sentence description of what the skill accomplishes
category: One of [Page Content & Integration, Layout & Responsive Architecture, Navigation & Information Architecture, Interactive Features & Dashboards, Process & Governance]
effort: Low / Low–Medium / Medium / Medium–High / High
uncertainty: Low / Medium / High
inputs:
  - Input 1
  - Input 2
outputs:
  - Output 1
  - Output 2
---

# Skill Name

Brief description of the skill's purpose and scope. Mention the primary category it fits into.

**For complete step-by-step procedure, validation requirements, and success criteria, see [`.github/skill-{name}.md`](./skill-{name}.md)**

## Quick Reference

| Phase | Key Steps |
|-------|-----------|
| Phase 1 | Describe key steps |
| Phase 2 | More steps |

**Related references:**  
- [`.github/validation-checklist.md`](./validation-checklist.md) — If this skill requires validation checks
- [`.github/testing-guide.md`](./testing-guide.md) — If this skill requires browser testing
- [`.github/metrics.md`](./metrics.md) — For retrospective record and metrics logging
```

## File Organization

**Container file: `skills.md`**
- Contains YAML frontmatter for each skill
- Includes quick reference (key phases/steps)
- Links to detailed procedure files
- Shows a template for adding new skills

**Detailed files: `.github/skill-{name}.md`**
- Complete step-by-step procedure (numbered steps with phases)
- Validation requirements and references
- Testing requirements and references
- Common issues and fixes
- Success criteria for completion

---

## Adding a New Skill

1. Create a new `.github/skill-{name}.md` file with complete step-by-step procedure
2. Add YAML frontmatter + quick reference to `skills.md`
3. Link from container to detailed file using relative paths
4. Commit with message: "Add {Name} skill with complete procedure"

---

## Current Skills

See frontmatter above for current skill(s). Each skill has a corresponding detailed procedure file.
