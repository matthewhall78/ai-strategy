# Manage Skills Skill

## Purpose

Maintain the skills registry in `.github/skills.md`, add new skills with complete documentation, update existing skill definitions, and ensure all skills follow the container file pattern with focused reference files. This skill is the operational backbone for evolving the site's workflow library.

---

## When to Use This Skill

- Adding a new workflow that can be applied multiple times (e.g., "Rename a Page", "Update Navigation", "Create Dashboard")
- Updating an existing skill's inputs, outputs, or procedure
- Reorganizing skills by category or effort level
- Creating reference files that support skills (e.g., validation checklists, testing guides specific to a new skill)
- Documenting common patterns that emerge from repeated tasks

---

## Complete Workflow

### Phase 1: Planning the Skill

#### Step 1: Define the Skill Scope

A skill is a **repeatable, multi-step workflow** that produces a consistent output. Examples:

- **New Site Page** (current skill) — Add a documentation page with navigation consistency
- **Rename a Page** (hypothetical) — Rename an HTML file and update all references
- **Update Navigation** (hypothetical) — Add or remove a nav link across all pages
- **Create Dashboard** (hypothetical) — Build a new analytics dashboard with metrics integration

A skill is **not**:

- A single simple task (e.g., "Update a CSS color" is not a skill)
- A one-time setup (e.g., "Initialize the repo" is not a repeatable skill)
- A generic activity (e.g., "Write documentation" is a skill template, but "Write README" is a task)

#### Step 2: Categorize the Skill

Choose the primary category that best describes the skill's impact:

| Category | When to Use | Example Efforts |
| --- | --- | --- |
| **Page Content & Integration** | New pages, content updates, site map expansion | Low–Medium; Low uncertainty |
| **Layout & Responsive Architecture** | Full-page redesigns, grid restructuring, scroll behavior | High; Medium uncertainty |
| **Navigation & Information Architecture** | Nav redesigns, menu changes, category systems | Medium–High; Medium uncertainty |
| **Interactive Features & Dashboards** | Charts, data viz, interactive controls, animations | Medium; High uncertainty |
| **Process & Governance** | Workflow guardrails, validation, documentation, instructions | Low–Medium; Low uncertainty |

#### Step 3: Define Inputs and Outputs

**Inputs:** What must the user provide to apply this skill?

Example for "New Site Page":

- Page title
- Purpose or description (one sentence)
- Nav label (short)
- Section it belongs in on index.html

**Outputs:** What will the skill produce?

Example for "New Site Page":

- New .html page file (kebab-case)
- Updated index.html with card
- Updated .site-nav on all pages
- Updated snippets/site-nav-snippet.html
- Updated README.md

#### Step 4: Estimate Effort and Uncertainty

**Effort:**

- **Low:** Single file edit, 1–2 simple changes, < 5 minutes
- **Low–Medium:** Few files, 3–5 coordinated changes, 5–15 minutes
- **Medium:** Multiple files, 5–10 changes, 15–30 minutes
- **Medium–High:** Many files, complex coordination, 30–60 minutes
- **High:** Site-wide changes, many interdependencies, 60+ minutes

**Uncertainty:**

- **Low:** Procedure is stable, no design decisions, same result every time
- **Medium:** Some procedure variation or user choice, or occasional edge cases
- **High:** Design decisions required, many edge cases, result varies significantly

---

### Phase 2: Create the Detailed Procedure File

#### Step 5: Create `.github/skill-{name}.md`

Choose a kebab-case filename matching the skill name:

- "New Site Page" → `skill-new-site-page.md`
- "Rename a Page" → `skill-rename-page.md`
- "Manage Skills" → `skill-manage-skills.md`

#### Step 6: Write the Detailed Procedure

Structure the procedure into **phases** (groups of related steps). Each phase groups 2–3 steps.

**Template for skill procedure file:**

```markdown
# {Skill Name} Skill

**Skill Type:** [Category]  
**Effort:** [Low / Low–Medium / Medium / Medium–High / High]  
**Uncertainty:** [Low / Medium / High]  

---

## Purpose

[2–3 sentence description of what this skill accomplishes and when to use it]

---

## Complete Workflow

### Phase 1: [Phase Name]

#### Step 1: [Step Title]

[Detailed instructions for this step. Include specific commands, file paths, and examples.]

#### Step 2: [Step Title]

[Detailed instructions for this step.]

### Phase 2: [Phase Name]

#### Step 3: [Step Title]

[Detailed instructions for this step.]

[Continue with all phases and steps...]

---

## Validation and Testing

**Validation checks:**
- [List specific validation steps, referencing validation-checklist.md if applicable]

**Browser testing:**
- [List browser test paths, referencing testing-guide.md if applicable]

---

## Common Issues & Fixes

| Issue | Detection | Response |
|-------|-----------|----------|
| [Issue 1] | How to detect it | What to do |
| [Issue 2] | How to detect it | What to do |

---

## Success Criteria

All of the following must be true before marking the skill as complete:

- [ ] All phases completed (Steps 1–N)
- [ ] All validation checks passed
- [ ] All browser tests passed
- [ ] [Skill-specific criterion 1]
- [ ] [Skill-specific criterion 2]

---

## References

- [`.github/validation-checklist.md`](./validation-checklist.md) — Pre-push validation procedures
- [`.github/testing-guide.md`](./testing-guide.md) — Browser interaction testing
- [`.github/metrics.md`](./metrics.md) — Retrospective and metrics logging
```

**Example for "New Site Page" skill:**
See `.github/skill-new-site-page.md` for a complete example with 14 steps across 6 phases.

#### Step 7: Document Common Issues

Identify 3–5 common problems that can occur while applying this skill:

| --- | --- | --- |
| Missing active class on new nav link | grep for `class="nav-name"` (no `active`), vs other links which have `class="nav-name active"` | Add `active` class to the nav link on the new page itself |
| Old filename references remain after rename | grep for old filename across .html, .md, .js files | Use `find` + `sed` or editor find-replace to update all references |
| Nav link order differs between pages | Compare .site-nav blocks on any two pages visually | Use `snippets/site-nav-snippet.html` as the canonical source; copy exact link order to all pages |

| Issue | How to Detect | How to Fix |
| --- | --- | --- |
| Missing active class on new nav link | grep for `class="nav-name"` (no `active`), vs other links which have `class="nav-name active"` | Add `active` class to the nav link on the new page itself |
| Old filename references remain after rename | grep for old filename across .html, .md, .js files | Use `find` + `sed` or editor find-replace to update all references |

| Nav link order differs between pages | Compare .site-nav blocks on any two pages visually | Use `snippets/site-nav-snippet.html` as the canonical source; copy exact link order to all pages |

---

### Phase 3: Update skills.md

#### Step 8: Add YAML Frontmatter to skills.md

Open `.github/skills.md` and add a new YAML block **before or after** the current skill entries.

**YAML structure:**

```yaml
---
name: {Skill Name}
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
```

#### Step 9: Add Skill Summary and Link to Reference File

After the YAML, add a brief 1–3 line description and a link to the detailed procedure file:

```markdown
# {Skill Name} Skill

Brief description of what this skill does and when to use it.

**For complete step-by-step procedure, validation requirements, and success criteria, see [`.github/skill-{name}.md`](./skill-{name}.md)**
```

#### Step 10: Add Quick Reference (Optional)

For skills with many steps, include a quick reference table summarizing the phases:

```markdown
## Skill Quick Reference

| Phase | Key Steps |
|-------|-----------|
| Phase 1: Planning | Steps 1–2 summary |
| Phase 2: Creation | Steps 3–4 summary |
| Phase 3: Validation | Steps 5–6 summary |

**Related references:**
- [`.github/validation-checklist.md`](./validation-checklist.md)
- [`.github/testing-guide.md`](./testing-guide.md)
- [`.github/metrics.md`](./metrics.md)
```

---

### Phase 4: Update Documentation

#### Step 11: Update README.md (if skill adds new pages/features)

If the skill creates new site features or pages, update the `README.md` page listing table:

```markdown
| Filename | Title | Category | Description |
|----------|-------|----------|-------------|
| [new-page.html](new-page.html) | New Page Title | Content Type | Brief description of the page |
```

#### Step 12: Update Related Reference Files

If the skill requires new validation checks or browser tests, create or update:

- [`.github/validation-checklist.md`](./validation-checklist.md) — Add new checks specific to this skill

## Phase 5: Validation

### Step 13: Check Markdown Linting

Before finalizing, run the markdown linter on all modified files (including the new skill file, any updated documentation, and registry files). Ensure there are no remaining linting errors in any affected file:

```bash
# Check for linting errors in all modified files
markdownlint .github/*.md README.md *.html
# Look for these common issues:
# - MD003: Heading style (use # not underlines)
# - MD012: Multiple consecutive blank lines
# - MD022: Blank lines around headings
# - MD031: Blank lines around code blocks
# - MD032: Blank lines around lists
# - MD040: Fenced code blocks should have a language

# - MD007: List indentation
```

Fix all linting errors in every modified file before proceeding. Do not claim completion until the linter reports zero errors across all affected files.

### Step 14: Verify Skill File Structure

```bash
# Check that skill procedure file exists
test -f ".github/skill-{name}.md" && echo "✓ Skill procedure file exists"

# Check that skills.md references the file
grep -q "skill-{name}.md" ".github/skills.md" && echo "✓ Skill referenced in skills.md"

# Check that YAML frontmatter is valid
grep -q "^name:" ".github/skills.md" && echo "✓ YAML frontmatter present"
```

### Step 15: Test the Skill on a Real Task

Before committing:

1. Choose a simple real task that applies this skill
2. Follow the procedure end-to-end
3. Note any steps that were unclear or missing
4. Update the procedure file with clarifications
5. Verify all validation checks and tests pass

---

## Maintenance & Versioning

### When to Update a Skill

Update an existing skill when:

1. **Procedure changes** — A step becomes simpler, more complex, or the order changes
2. **New edge cases discovered** — Add to "Common Issues & Fixes"
3. **Inputs or outputs change** — Update YAML frontmatter in skills.md
4. **Effort or uncertainty estimates change** — Update YAML frontmatter
5. **Reference files change** — Update links (validation-checklist.md, testing-guide.md, metrics.md)

### How to Update a Skill

1. Update the detailed `.github/skill-{name}.md` file with new steps or phases
2. Update the YAML frontmatter in `skills.md` if effort, uncertainty, inputs, or outputs changed
3. Commit with message: "Update {Skill Name} skill: [specific change]"
4. Document the change as a metrics entry if it affects workflow (see `.github/metrics.md`)

### Deprecating a Skill

If a skill is no longer needed:

1. Remove the YAML frontmatter from `skills.md`
2. Keep the detailed `.github/skill-{name}.md` file in git history for reference
3. Commit with message: "Deprecate {Skill Name} skill: [reason]"
4. Update any agent definitions that referenced the deprecated skill

---

## Success Criteria

All of the following must be true before marking this skill management task as complete:

- [ ] New skill has a detailed `.github/skill-{name}.md` file with all phases, steps, common issues, and success criteria
- [ ] YAML frontmatter added to `skills.md` with name, description, category, effort, uncertainty, inputs, outputs
- [ ] Brief description and link to detailed file added to `skills.md`
- [ ] Quick reference table added (if skill has many steps)
- [ ] Related references documented (validation, testing, metrics references)
- [ ] README.md updated if skill creates new pages/features
- [ ] Skill tested on a real task (if applicable)
- [ ] All cross-references verified (links resolve, file paths correct)
- [ ] Committed and pushed to git

---

## References

- [`.github/skills.md`](./skills.md) — Container file with all skill YAML entries
- [`.github/skill-new-site-page.md`](./skill-new-site-page.md) — Complete example of a detailed skill procedure
- [`.github/metrics.md`](./metrics.md) — Metrics categories and retrospective templates
