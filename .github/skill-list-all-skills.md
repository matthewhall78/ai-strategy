# List All Skills Skill

**Skill Type:** Process & Governance  
**Effort:** Low  
**Uncertainty:** Low  

---

## Purpose

Discover and understand all available skills in the registry, their categorization, effort levels, and uncertainty. This skill helps users make informed decisions about which skill to use for a given task.

---

## Complete Workflow

### Phase 1: Browse the Skills Registry

#### Step 1: Open the Skills Registry

Navigate to [`.github/skills.md`](./skills.md) in the repository.

This file contains the complete catalog of all available skills with structured metadata for each one.

#### Step 2: Scan the Registry by Metadata

For each skill entry, you'll see:

- **name** — The skill identifier (short, kebab-case friendly name)
- **description** — One-sentence summary of what the skill accomplishes
- **category** — One of 5 fixed categories (see categorization table below)
- **effort** — Estimated effort level (Low, Low–Medium, Medium, Medium–High, High)
- **uncertainty** — Estimated complexity/uncertainty (Low, Medium, High)
- **link** — Direct link to the complete procedure file (`.github/skill-{name}.md`)

#### Step 3: Understand the 5 Skill Categories

All skills in the registry are classified into one of 5 immutable categories:

| Category | When to Use | Example |
|----------|-------------|---------|
| **Page Content & Integration** | Adding new pages, content updates, site map expansion | New Site Page |
| **Layout & Responsive Architecture** | Full-page redesigns, grid restructuring, scroll behavior | Redesign Dashboard |
| **Navigation & Information Architecture** | Nav redesigns, menu changes, category systems | Add Nav Link |
| **Interactive Features & Dashboards** | Charts, data viz, interactive controls, animations | Create Chart |
| **Process & Governance** | Workflow guardrails, validation, documentation, instructions | Manage Skills, List All Skills |

---

### Phase 2: Filter and Search Skills

#### Step 4: Filter by Category

Scan through the registry and identify all skills in the category you're interested in:

```bash
# Example: Find all "Process & Governance" skills in skills.md
grep -A 2 "category: Process & Governance" .github/skills.md
```

#### Step 5: Filter by Effort Level

Identify skills matching your available time/resources:

- **Low** — Can be completed in 5–10 minutes
- **Low–Medium** — Can be completed in 10–20 minutes
- **Medium** — Can be completed in 20–40 minutes
- **Medium–High** — Can be completed in 40–60 minutes
- **High** — May take 60+ minutes or require significant coordination

#### Step 6: Filter by Uncertainty Level

Assess which skills have well-defined procedures vs. require design decisions:

- **Low** — Stable procedure, same result every time, no design decisions
- **Medium** — Procedure has some variation, occasional decision points
- **High** — Many design decisions, result varies significantly, edge cases

---

### Phase 3: Get Complete Skill Details

#### Step 7: Open the Detailed Procedure File

Once you've identified a skill you want to use, click its link in `skills.md` to open the detailed procedure file:

```
[`.github/skill-{name}.md`](./skill-{name}.md)
```

Each detailed file contains:

- **Purpose** — Why and when to use this skill
- **Complete Workflow** — Step-by-step procedure organized by phases
- **Validation & Testing** — Requirements for validating the skill's output
- **Common Issues & Fixes** — Troubleshooting table
- **Success Criteria** — Checklist for completion

#### Step 8: Reference Related Utilities

Detailed skill files reference utility documents that support the workflow:

- [`.github/validation-checklist.md`](./validation-checklist.md) — Pre-push validation checks
- [`.github/testing-guide.md`](./testing-guide.md) — Browser interaction testing
- [`.github/metrics.md`](./metrics.md) — Metrics categories and retrospective templates

These utility docs are used across multiple skills; open them on-demand.

---

### Phase 4: Understand the Skill Management System

#### Step 9: Review the Manage Skills Procedure

To understand how new skills are created and maintained, see [`.github/skill-manage-skills.md`](./skill-manage-skills.md).

This meta-skill describes:

- How to **define** a new skill (scope, categorization, effort, uncertainty)
- How to **create** detailed procedure files (phases, steps, common issues)
- How to **register** skills in `skills.md`
- How to **maintain** skills (updating, deprecating)

#### Step 10: Understand the New Site Page Procedure

To see a complete example of a detailed skill procedure, see [`.github/skill-new-site-page.md`](./skill-new-site-page.md).

This file demonstrates:

- How a skill is organized into phases and steps
- How validation and testing requirements are documented
- How common issues and success criteria are presented
- How cross-references to utility docs are made

---

## Quick Reference

**To find a skill by category:**
```bash
grep "^category:" .github/skills.md
```

**To find all low-effort skills:**
```bash
grep "^effort: Low" .github/skills.md
```

**To list all available skills:**
```bash
grep "^name:" .github/skills.md
```

**To view a specific skill's details:**
Open the link in `skills.md` to navigate to `.github/skill-{name}.md`

---

## Success Criteria

All of the following must be true before marking this skill as complete:

- [ ] Reviewed the Skills Registry (`skills.md`) structure
- [ ] Understand the 5 skill categories and their purposes
- [ ] Know how to filter skills by category, effort, and uncertainty
- [ ] Located at least one skill you could use for a given task
- [ ] Opened and reviewed a detailed skill procedure file
- [ ] Understand where utility docs (validation, testing, metrics) are referenced
- [ ] Know how to access the Manage Skills procedure for creating new skills
- [ ] Can identify the purpose and phases of a complete skill workflow

---

## References

- [`.github/skills.md`](./skills.md) — Complete skills registry
- [`.github/skill-manage-skills.md`](./skill-manage-skills.md) — How to create and maintain skills
- [`.github/skill-new-site-page.md`](./skill-new-site-page.md) — Example of a detailed skill procedure
- [`.github/validation-checklist.md`](./validation-checklist.md) — Pre-push validation procedures
- [`.github/testing-guide.md`](./testing-guide.md) — Browser testing procedures
- [`.github/metrics.md`](./metrics.md) — Metrics system and skill categorization
