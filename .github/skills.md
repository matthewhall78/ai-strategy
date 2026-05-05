---
name: New Site Page
description: Add a new documentation page to the static HTML site, keeping navigation consistent across all existing pages.
inputs:
  - Page title
  - Purpose or description (one sentence)
  - Nav label (short, fits in the pill nav bar)
  - Section it belongs in on index.html (e.g. "Core Visuals", "Start Implementation", or "Reference")
outputs:
  - New .html page file (kebab-case filename) with full embedded CSS and shared nav
  - Updated index.html with card in the correct section
  - Updated .site-nav block on every existing .html page
  - Updated snippets/site-nav-snippet.html
  - Updated README.md page listing
---

# New Site Page Skill

## Purpose

Create a new page for the site and ensure navigation is fully consistent across every file. This workflow must be completed atomically — partial nav updates leave the site in a broken state.

## Steps

1. **Preflight checks:** Confirm tool availability and repo state before editing. Prefer `rg`; if unavailable, switch to `grep`/`find`. Check `git status --short` before changes.
2. **Choose the filename:** Convert the page title to kebab-case (e.g. "API Review Guide" to `api-review-guide.html`). No underscores, spaces, or camelCase.
3. **Create or rename the HTML file safely:** If source file is tracked, use `git mv`. If source file is untracked, use `mv` then `git add`. Verify old filename has zero references after rename.
4. **Create the page content:** Use an existing page (e.g. `first-30-minutes-quickstart.html`) as the structural template. Copy the full page skeleton including `<head>` with Inter font and embedded CSS, animated perspective grid background, `.site-nav` block, and main content wrapper.
5. **Set the active nav link:** On the new page, add the `active` class to its own nav link (e.g. `class="nav-mypage active"`). Ensure page padding accounts for fixed nav overlap.
6. **Add a card to index.html:** Place a `<a class="card ..." href="...">` block in the appropriate section grid. Set `--accent` and `--glow` CSS custom properties to give the card a distinct colour.
7. **Update nav on every other existing page:** Open each `.html` file and add the new `<a class="nav-mypage" href="mypage.html">Nav Label</a>` link inside the `.site-nav` block. The order must match `snippets/site-nav-snippet.html`.
8. **Update snippets/site-nav-snippet.html:** Add the new link to the canonical nav block and add a comment entry to the active link examples list.
9. **Update README.md:** Add the new page to the page listing table.
10. **Run deterministic validation:** Confirm every `.html` nav block contains the new link, every local nav `href` resolves to an existing file, and no references remain to old filenames.
11. **Retrospective update:** Record one process improvement from the change and apply it to at least one of `.github/copilot-instructions.md`, `.github/skills.md`, `.github/agents.md`, or `apm.yml`.
12. **Retrospective handoff record:** Include the required 4-line retrospective record in the final response.

When using scripted nav updates, handle both normal and active-link variants so pages where a nav item is active are not skipped.

## Output Format

- New file: `{kebab-name}.html` — self-contained, passes href validation, `active` class on own nav link
- `index.html` — card present in the correct section
- All other `.html` files — nav updated with new link, no other changes
- `snippets/site-nav-snippet.html` — canonical nav updated
- `README.md` — page listing updated
- Validation: every `href` in every `.site-nav` block resolves to a real file in the repo
- Retrospective: one concrete improvement applied to process artifacts
- Retrospective record:
  - What slowed us down?
  - What process/file was improved?
  - Exact rule added or changed.
  - How this prevents repeat issues.
