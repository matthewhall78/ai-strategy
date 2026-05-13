# copilot-instructions.md

## Architecture

- This is a static HTML site. Every page is a self-contained `.html` file with semantic markup.
- Styles are centralized in external CSS files in the `css/` directory—not embedded in HTML pages.
- No build system, no package manager, no external JavaScript frameworks.
- Do not introduce dependencies, npm packages, or bundling tools.

## File Naming

- All HTML filenames must use kebab-case: `my-new-page.html`.
- Never use underscores, spaces, or camelCase in filenames.

## Visual Style

- Background colours range from `#030303` to `#090d12`. Preserve this dark palette on every page.
- Font: `Inter` loaded from Google Fonts. Do not substitute or add other typefaces.
- Navigation: glassmorphism pill bar (`.site-nav`) fixed at the top. Preserve all CSS custom properties and layout.
- Page backgrounds use an animated perspective grid. Preserve the `@keyframes` and canvas/gradient pattern.
- Card components use `--accent` and `--glow` CSS custom properties for per-card theming. Preserve this pattern.

## CSS Organization

- All styles are maintained in two external CSS files in `css/`:
  - `css/variables.css` — Color variables and theme definitions (light and dark modes)
  - `css/shared-styles.css` — Shared layout, typography, navigation, components, and animations
- Every HTML page must link to both files in the `<head>` immediately after the `<title>` tag:
  ```html
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/shared-styles.css">
  ```
- To update styles across all pages, edit only the relevant CSS file—no need to touch HTML files.
- When adding new CSS: prefer `css/shared-styles.css` unless it's a new theme color (which belongs in `css/variables.css`).

## Navigation Rule

- Every page must include the shared `.site-nav` block with **all current nav links**.
- Every live nav must preserve the `.site-nav-track` wrapper and canonical `nav-*` link classes from `snippets/site-nav-snippet.html`.
- The page's own nav link must carry the `active` class (e.g. `class="nav-overview active"`).
- When a nav link is added, renamed, or removed, update **all** existing `.html` pages and `snippets/site-nav-snippet.html` in the same change.
- The canonical list of nav links and their classes lives in `snippets/site-nav-snippet.html`.
- The nav should remain a single-row rail with horizontal overflow when links do not fit; do not reintroduce multi-row wrapped nav links.

## Adding a New Page

Refer to `.github/skills.md` — "New Site Page Skill" — for the complete workflow, validation checklist, and browser interaction testing requirements. The skill covers all 14 required steps from file creation through metrics logging.

## Editing Discipline

- Prefer small, focused edits. Do not touch files unrelated to the task.
- Preserve existing CSS class names, custom properties, and layout patterns unless the task explicitly requires changing them.
- Do not reformat or reorder HTML/CSS that is not being edited.

## Validation

- After any nav change: verify every `href` in `.site-nav` resolves to a real file in the repo.
- For the `Docs` nav link: verify it matches the active git remote repository URL and returns a non-404 HTTP status before claiming completion.
- After creating a new page: confirm it appears in the nav on all pages and as a card in `index.html`.
- After adding or changing interactive charts, dashboards, or controls: run both a parse check and one browser interaction check covering a representative toggle, hover, or focus path.
- After any full-page layout refactor: verify scrollability at top, midpoint, and bottom of the page in a real browser session before claiming completion.
- Before committing: no broken internal hrefs, no missing `active` class on the current page's nav link.
- Validation must include fallback tooling: prefer `rg`/`rg --files`, but if `rg` is unavailable use `grep`/`find`.
- Include one external-link health check for `Docs` (for example `curl -L -s -o /dev/null -w "%{http_code}" <docs-url>`), and record the observed status in the handoff.
- After rename operations: verify both conditions hold before commit: (1) no old filename references remain, (2) new filename is referenced everywhere it should be.

- Include one external-link health check for `Docs` (for example `curl -L -s -o /dev/null -w "%{http_code}" <docs-url>`), and record the observed status in the handoff.
- After rename operations: verify both conditions hold before commit: (1) no old filename references remain, (2) new filename is referenced everywhere it should be.

## Continuous Improvement & Retrospective Requirements

After each website enhancement, refer to `.github/metrics.md` for:

1. **Retrospective Record** — Required 4-line record (what slowed us down, process file improved, exact rule changed, prevention mechanism)
2. **Efficiency Scorecard** — Required comparison with baseline (commit IDs, files changed, churn per file, quality gates, interpretation)
3. **Metrics Logging** — Post-merge append to `metrics/metrics-data.js` using the record + scorecard
4. **Fixed Metrics Categories** — Use one of five immutable categories (Page Content & Integration, Layout & Responsive Architecture, Navigation & Information Architecture, Interactive Features & Dashboards, Process & Governance)
5. **Quality Gates** — All six gates must pass before merge (nav-link-presence, nav-href-resolution, rename-cleanup, canonical-sync, browser-interaction-test, docs-link-health)

Prefer small, specific rule updates over broad rewrites. Do not mark work complete until retrospective updates are considered.

