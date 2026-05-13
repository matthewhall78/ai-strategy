---
name: Site Maintainer
description: Maintain structural and visual consistency of the static HTML documentation site
role: Consistency enforcer
tools:
  - file search
  - grep search
  - read file
  - multi_replace_string_in_file
  - replace_string_in_file
  - run_in_terminal
  - screenshot_page
skills:
  - New Site Page
  - Validation Checklist
  - Testing Guide
---

# Site Maintainer Agent

Enforce structural and visual consistency across all pages. Verifies nav integrity, file naming conventions, visual style, and href validity. Acts as a guardian of site architecture rules.

**For detailed responsibilities, tools, constraints, and validation workflows, see [`.github/agent-site-maintainer.md`](.github/agent-site-maintainer.md)**

---

## Agent Container Template

To add more agents, copy this template and fill in the details:

```markdown
---
name: Agent Name
description: One-sentence description of what the agent does
role: Primary responsibility (e.g., "Feature builder", "Performance auditor")
tools:
  - tool-1
  - tool-2
  - tool-3
skills:
  - Skill Name (reference from skills.md)
  - Another Skill
---

# Agent Name

Brief description of the agent's purpose and scope.

**For complete specification including responsibilities, tools, constraints, and validation workflows, see [`.github/agent-{name}.md`](.github/agent-{name}.md)**
```

## File Organization

**Container file: `agents.md`**
- Contains YAML frontmatter for each agent
- Includes brief description (2–3 lines)
- Links to detailed specification files

**Detailed files: `.github/agent-{name}.md`**
- Complete specification: purpose, responsibilities, tools, skills, constraints
- Validation workflows and quality gate definitions
- Output format requirements
- Common issues and responses
- Success criteria

---

## Adding a New Agent

1. Create a new `.github/agent-{name}.md` file with complete specification
2. Add YAML frontmatter + brief summary to `agents.md`
3. Update any relevant `.md` files to reference the new agent if needed
4. Commit with message: "Add {Name} agent with specification"

---

## Current Agents

See frontmatter above for current agent(s). Each agent has a corresponding detailed specification file.
