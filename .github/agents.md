# Agents Registry

This file is a **catalog** of available agents for the AI website project. Each agent is a specialized tool with focused responsibilities and a dedicated specification file.

## Agent 1: Site Maintainer

```yaml
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
  - WCAG Accessibility Audit
```

[`.github/agent-site-maintainer.md`](./agent-site-maintainer.md)

---

## How to Add a New Agent

1. Follow the **Manage Agents** procedure in [`.github/skill-manage-agents.md`](./skill-manage-agents.md)
2. Create a new `.github/agent-{name}.md` file with complete specification
3. Add a new YAML + link entry to this file (`agents.md`)
4. Commit with message: "Add {Name} agent with complete specification"

All agent responsibilities, tools, constraints, workflows, and common issues are in the dedicated `.github/agent-{name}.md` files—not here.
