# copilot-instructions.md

## Architecture

- This is a static HTML site. Every page is a self-contained `.html` file with embedded CSS.
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

## Navigation Rule

- Every page must include the shared `.site-nav` block with **all current nav links**.
- The page's own nav link must carry the `active` class (e.g. `class="nav-overview active"`).
- When a nav link is added, renamed, or removed, update **all** existing `.html` pages and `snippets/site-nav-snippet.html` in the same change.
- The canonical list of nav links and their classes lives in `snippets/site-nav-snippet.html`.

## Adding a New Page

Follow this sequence — do not skip or reorder steps:

1. Create `{kebab-name}.html` using an existing page as the structural template.
2. Embed the `.site-nav` block with the `active` class on the new page's own link.
3. Add a card to the correct section in `index.html`.
4. Add the new nav link to every other existing `.html` page.
5. Add the new nav link to `snippets/site-nav-snippet.html`.
6. Add the page to `general-ghcp-resources-links.html` (internal resources table).
7. Update the `README.md` page listing.

## Editing Discipline

- Prefer small, focused edits. Do not touch files unrelated to the task.
- Preserve existing CSS class names, custom properties, and layout patterns unless the task explicitly requires changing them.
- Do not reformat or reorder HTML/CSS that is not being edited.

## Validation

- After any nav change: verify every `href` in `.site-nav` resolves to a real file in the repo.
- After creating a new page: confirm it appears in the nav on all pages and as a card in `index.html`.
- Before committing: no broken internal hrefs, no missing `active` class on the current page's nav link.
- Validation must include fallback tooling: prefer `rg`/`rg --files`, but if `rg` is unavailable use `grep`/`find`.
- After rename operations: verify both conditions hold before commit: (1) no old filename references remain, (2) new filename is referenced everywhere it should be.

### Required Nav Validation Checks

Run these checks after adding or renaming a nav page:

1. Count nav blocks and ensure each contains the new link.
2. Confirm every local nav `href` target resolves to an existing file.
3. Confirm canonical nav in `snippets/site-nav-snippet.html` exactly matches live nav structure.

If any check fails, fix before commit.

## Documentation

- Update `README.md` when pages are added or renamed.
- Keep the `snippets/site-nav-snippet.html` in sync with the live nav on every page.

## Continuous Improvement

- After each website enhancement, capture one process improvement and apply it immediately to `.github/copilot-instructions.md`, `.github/skills.md`, `.github/agents.md`, or `apm.yml`.
- Prefer small, specific rule updates over broad rewrites.
- Do not mark work complete until retrospective updates are considered.

### Retrospective Record (Required)

For every enhancement, include this short record in the final handoff message:

1. What slowed us down?
2. What process/file is being improved?
3. Exact rule added or changed.
4. How this prevents repeat issues.

No enhancement is complete until this record is provided.

### Efficiency Scorecard (Required)

For every enhancement, include this short scorecard in the final handoff message:

1. Baseline commit ID (previous comparable enhancement).
2. Current commit ID.
3. Files changed (baseline vs current).
4. Insertions and deletions (baseline vs current).
5. Churn per file: $(insertions + deletions) / files$ (baseline vs current).
6. Quality gates pass/fail summary (nav-link-presence, nav-href-resolution, rename-cleanup, canonical-sync).
7. One-sentence interpretation: faster/slower and why.

No enhancement is complete until this scorecard is provided.

### Metrics Logging (Required)

After merge, append one enhancement record to `metrics/metrics-data.js` with:

1. Metadata: title, type, merged date, baseline commit, current commit.
2. Efficiency values: files changed, insertions/deletions, churn per file (baseline/current).
3. Quality gate statuses.
4. Retrospective record and one-sentence interpretation.

### Schema Evolution

- Keep `schemaVersion` in `metrics/metrics-data.js` and increment on structural changes.
- Preserve backward compatibility for older records when adding new fields.
- Put optional future metrics into new fields without removing existing required fields.
