# Manage Agents Skill

**Skill Type:** Process & Governance  
**Effort:** Low–Medium  
**Uncertainty:** Low  

---

## Purpose

Create, update, and maintain agents in the agents registry with complete documentation and reference files. Agents are specialized tools that enforce responsibilities and constraints within the project. This skill ensures agents are well-documented and follow the container file pattern.

---

## When to Use This Skill

- Creating a new agent specialized for a particular role (e.g., "Code Refactor Agent", "Performance Auditor")
- Updating an existing agent's tools, skills, responsibilities, or constraints
- Documenting a new specialized workflow that requires an agent's focused capabilities
- Maintaining agent specifications as project needs evolve

---

## Complete Workflow

### Phase 1: Plan the Agent

#### Step 1: Define the Agent's Purpose and Role

An agent is a **specialized tool with focused responsibilities**. Examples:


- **Site Maintainer** (current) — Enforce structural and visual consistency across all documentation pages
- **Code Refactor Agent** (hypothetical) — Coordinate refactoring tasks across multiple files
- **Performance Auditor** (hypothetical) — Analyze and optimize site performance metrics

An agent **differs from a skill** in that:

- **Skills** = repeatable user-facing workflows (many will be added)
- **Agents** = specialized tools with specific responsibilities (fewer, more stable)

#### Step 2: Identify the Agent's Responsibilities

List 5–10 specific responsibilities this agent will handle:

Examples for Site Maintainer:

- Nav integrity verification
- Active class consistency
- Filename convention enforcement
- Href validation
- Visual style preservation


#### Step 3: Specify the Agent's Tools

List the specific tools (VS Code, command-line, file operations, etc.) the agent will use:

Examples for Site Maintainer:
- file search
- grep search
- read file
- multi_replace_string_in_file
- replace_string_in_file
- run_in_terminal
- screenshot_page


#### Step 4: Specify the Agent's Skills

Reference skills from [`.github/skills.md`](./skills.md) that the agent will use:

Examples for Site Maintainer:
- New Site Page
- Validation Checklist
- Testing Guide


#### Step 5: Define Hard Constraints

Hard constraints are **non-negotiable rules** the agent must always follow:

Examples for Site Maintainer:
- No external dependencies or npm packages
- Preserve color palette and font styling
- Atomic nav updates across all files
- Kebab-case filenames only
- No broken internal hrefs

---

### Phase 2: Create the Detailed Specification File

#### Step 6: Create `.github/agent-{name}.md`

Choose a kebab-case filename matching the agent name:
- "Site Maintainer" → `agent-site-maintainer.md` (already exists)
- "Code Refactor" → `agent-code-refactor.md`
- "Performance Auditor" → `agent-performance-auditor.md`

#### Step 7: Write the Complete Specification

Structure the specification file as follows:

**Template for agent specification file:**

```markdown
# {Agent Name} Agent

**Purpose:** [2–3 sentence description of what this agent does and when to invoke it]

---

## Responsibilities

List all major responsibilities this agent has. Examples:

1. [Responsibility 1] — Brief description
2. [Responsibility 2] — Brief description
3. [Responsibility 3] — Brief description
...

---

## Tools

The agent has access to these tools:

- [Tool 1] — What it does
- [Tool 2] — What it does
...

---

## Skills

The agent can execute these skills from [`.github/skills.md`](./skills.md):

- [Skill Name 1](./skill-name.md) — When to use
- [Skill Name 2](./skill-name.md) — When to use

---

## Hard Constraints (Never Violate)

[List 5+ non-negotiable rules the agent must always follow]

1. [Constraint 1]
2. [Constraint 2]
...

---

## Soft Constraints

[List guidelines the agent should follow but may have exceptions]

1. [Guideline 1]
2. [Guideline 2]

---

## Validation Workflows

### Before Commit

[Describe validation checks the agent must run before committing changes]

### Before Handoff

[Describe final validation and reporting requirements before handing off to user]

---

## Common Issues & Responses

| Issue | Detection | Response |
|-------|-----------|----------|
| [Issue 1] | How to detect | What to do |
| [Issue 2] | How to detect | What to do |

---

## Success Criteria

All of the following must be true before marking work as complete:

- [ ] All responsibilities addressed
- [ ] Hard constraints never violated
- [ ] Validation checks pass
- [ ] No broken hrefs or missing files
- [ ] Quality gates confirmed
- [ ] [Agent-specific criteria 1]
- [ ] [Agent-specific criteria 2]

---

## References

- [`.github/agents.md`](./agents.md) — Agents registry
- [`.github/skills.md`](./skills.md) — Available skills the agent can use
- [`.github/validation-checklist.md`](./validation-checklist.md) — Pre-push validation procedures
- [`.github/testing-guide.md`](./testing-guide.md) — Browser testing procedures
- [`.github/metrics.md`](./metrics.md) — Quality gates and metrics system
```

**Example:** See [`.github/agent-site-maintainer.md`](./agent-site-maintainer.md) for a complete specification.

#### Step 8: Document Common Issues and Responses

Identify 3–5 common problems that can occur when this agent is invoked:

| Issue | Detection Method | Response |
| --- | --- | --- |
| [Common issue 1] | How to detect it | How to fix it |
| [Common issue 2] | How to detect it | How to fix it |

---

### Phase 3: Update the Agents Registry

#### Step 9: Add YAML Frontmatter to agents.md

Open [`.github/agents.md`](./agents.md) and add a new YAML block for the agent:

```yaml
---
name: {Agent Name}
description: One-sentence description of what the agent does
role: Primary responsibility or job title
tools:
  - Tool 1
  - Tool 2
  - Tool 3
skills:
  - Skill Name 1
  - Skill Name 2
---
```

#### Step 10: Add Brief Summary and Link

After the YAML, add a brief 1–3 line description and link to the detailed specification:

```markdown
# {Agent Name} Agent

Brief description of what this agent does.

**For detailed responsibilities, tools, constraints, and validation workflows, see [`.github/agent-{name}.md`](.github/agent-{name}.md)**
```

---

### Phase 4: Update Documentation

#### Step 11: Update Related Agent References

If the new agent replaces or relates to an existing agent, update cross-references in:
- [`.github/copilot-instructions.md`](./copilot-instructions.md)
- [`.github/agents.md`](./agents.md)
- Any skill files that reference agents

#### Step 12: Update README.md or Documentation

If the agent represents a new capability or workflow, consider documenting it in project-level documentation.

---

### Phase 5: Validation

#### Step 13: Check Markdown Linting

Before finalizing, verify your new agent's markdown file has no linting errors:


```bash
# Check for linting errors in the new agent file
# Look for these common issues in the new .github/agent-{name}.md file:
# - MD003: Heading style (use # not underlines)
# - MD022: Blank lines around headings
# - MD031: Blank lines around code blocks
# - MD032: Blank lines around lists
# - MD007: List indentation
```

Fix any linting errors before proceeding.

#### Step 14: Verify Skill File Structure

```bash
# Check that skill procedure file exists
test -f ".github/skill-{name}.md" && echo "✓ Skill procedure file exists"

# Check that skills.md references the file
grep -q "skill-{name}.md" ".github/skills.md" && echo "✓ Skill referenced in skills.md"

# Check that YAML frontmatter is valid
grep -q "^name:" ".github/skills.md" && echo "✓ YAML frontmatter present"
```

#### Step 15: Test the Skill on a Real Task

Before committing:

1. Choose a simple real task that applies this skill
2. Follow the procedure end-to-end
3. Note any steps that were unclear or missing
4. Update the procedure file with clarifications
5. Verify all validation checks and tests pass

---

## Maintenance & Versioning

### When to Update an Agent

Update an existing agent when:

1. **Responsibilities change** — New capability added or removed
2. **Tools change** — New tool needed, or old tool deprecated
3. **Skills change** — New skill requirement added
4. **Constraints change** — Hard or soft constraints need adjustment
5. **Workflow changes** — Validation or output format evolves

### How to Update an Agent

1. Update the detailed `.github/agent-{name}.md` file with changes

2. Update the YAML frontmatter in `agents.md` if tools or skills changed
3. Commit with message: "Update {Agent Name} agent: [specific change]"
4. Document significant changes in a retrospective if they affect project workflow

### Deprecating an Agent

If an agent is no longer needed:

1. Remove the YAML frontmatter from `agents.md`
2. Keep the detailed `.github/agent-{name}.md` file in git history
3. Commit with message: "Deprecate {Agent Name} agent: [reason]"
4. Update any skill definitions that referenced the deprecated agent

---

## Success Criteria

All of the following must be true before marking this skill as complete:

- [ ] New agent has a detailed `.github/agent-{name}.md` file with all sections (purpose, responsibilities, tools, skills, constraints, workflows, common issues, success criteria)
- [ ] YAML frontmatter added to `agents.md` with name, description, role, tools, skills
- [ ] Brief description and link to detailed file added to `agents.md`
- [ ] All tools listed in YAML are available and documented
- [ ] All skills referenced are defined in `skills.md`
- [ ] Hard constraints are clearly documented and non-negotiable
- [ ] Common issues and responses are identified
- [ ] Cross-references verified (all links resolve, file paths correct)
- [ ] Committed and pushed to git

---

## References

- [`.github/agents.md`](./agents.md) — Container file with all agent entries
- [`.github/agent-site-maintainer.md`](./agent-site-maintainer.md) — Complete example of an agent specification
- [`.github/skills.md`](./skills.md) — Available skills that agents can use
- [`.github/validation-checklist.md`](./validation-checklist.md) — Validation procedures
- [`.github/testing-guide.md`](./testing-guide.md) — Browser testing procedures
- [`.github/metrics.md`](./metrics.md) — Quality gates and retrospective templates
