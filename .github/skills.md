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
13. **Efficiency scorecard:** Compare this enhancement with the previous comparable enhancement and include the required scorecard in the final response.
14. **Post-merge metrics append:** Add one new record to `metrics/metrics-data.js` after merge using scorecard + retrospective values.

When using scripted nav updates, handle both normal and active-link variants so pages where a nav item is active are not skipped.

## Pre-Push Validation Checklist

Before committing, run these checks to ensure nav consistency:

1. **Nav link presence:** Count nav blocks in changed files. Confirm each contains the new link.
2. **Href resolution:** Verify every local nav `href` target resolves to an existing file. Use:
   - `git diff --name-status -- '*.html'` (detect added/renamed pages)
   - `grep -n "<page-name>.html" index.html general-ghcp-resources-links.html README.md` (verify card + table + listing)
   - `find . -maxdepth 2 -type f -name '<page-name>.html'` (confirm file exists)
3. **Rename cleanup:** If renaming, run `grep -R "<old-name>.html" .` and expect zero matches.
4. **Canonical sync:** Confirm `snippets/site-nav-snippet.html` matches live nav structure on all pages.
5. **No broken hrefs:** Use browser DevTools or `grep` to verify no broken internal links.
6. **Active class present:** Verify `active` class is on the current page's nav link and not duplicated elsewhere.

## Browser Interaction Testing

For new pages, test these representative paths in a real browser:
- Navigate to the new page and verify it loads without errors
- Hover over nav links to confirm styling transitions
- Click nav links to confirm they navigate correctly
- On pages with dropdowns/toggles, test opening/closing behavior
- Verify page background grid animation is smooth
- Scroll to top, middle, and bottom of page to confirm no layout breaks

## Output Format

- **New file:** `{kebab-name}.html` — self-contained, passes href validation, `active` class on own nav link
- **index.html** — card present in the correct section with `--accent` and `--glow` CSS properties
- **All other .html files** — nav updated with new link in correct order, no other changes
- **snippets/site-nav-snippet.html** — canonical nav updated with new link and commented in active link examples
- **README.md** — page listing updated with new page entry
- **Validation evidence:**
  - All 6 quality gates status (nav-link-presence, nav-href-resolution, rename-cleanup, canonical-sync, browser-interaction-test, docs-link-health)
  - Grep/find command outputs confirming href resolution
  - Screenshot or description of browser interaction test
- **Retrospective record:** Required 4-line record (see `.github/metrics.md`)
- **Efficiency scorecard:** Required scorecard with baseline/current comparison (see `.github/metrics.md`)
- **Metrics data:** Confirm one new record appended to `metrics/metrics-data.js` after merge

## Quality Gates Summary

Refer to `.github/metrics.md` for the authoritative list of six quality gates and their validation methods. All gates must pass before merge.
