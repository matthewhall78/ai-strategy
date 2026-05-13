# Skill: New Site Page — Complete Procedure

**Skill Name:** New Site Page  
**Category:** Page Content & Integration  
**Effort:** Low–Medium | **Uncertainty:** Low  
**Inputs:**

- Page title
- Purpose or description (one sentence)
- Nav label (short, fits in the pill nav bar)
- Section it belongs in on index.html (Patterns, Operating Models, Worked Examples, Quickstarts, References)

**Outputs:**

- New .html page file (kebab-case filename) with full embedded CSS and shared nav
- Updated index.html with card in the correct section
- Updated .site-nav block on every existing .html page
- Updated snippets/site-nav-snippet.html
- Updated README.md page listing

---

## Complete Workflow (15 Steps)

### Phase 1: Planning & Setup (Steps 1–2)

#### Step 1: Preflight checks

- Confirm `rg` (ripgrep) availability: `which rg` or `rg --version`
- If unavailable, switch to `grep` and `find` for file operations
- Check current git status: `git status --short` (should be clean)
- Verify no uncommitted changes to existing `.html` files

#### Step 2: Choose the filename

- Convert page title to kebab-case
- Examples: "API Review Guide" → `api-review-guide.html`
- Rules: No underscores, spaces, or camelCase
- Example invalid: `api_review_guide.html`, `ApiReviewGuide.html` ❌
- Example valid: `api-review-guide.html` ✅

### Phase 2: File Creation (Steps 3–4)

#### Step 3: Create or rename the HTML file safely

- **If starting from scratch:** Create empty `{kebab-name}.html`
- **If copying from template:** Use `cp` or copy/paste from an existing page (e.g., `first-30-minutes-quickstart.html`)
- **If renaming an existing file:** Use `git mv old-name.html new-name.html` (tracked files) or `mv` then `git add` (untracked)
- **After rename:** Run `grep -R "old-name.html" .` and verify zero matches (except in git history)

#### Step 4: Create the page content

- Copy full page skeleton from existing template page:
  - `<head>` with `<meta charset>`, `<meta viewport>`, `<title>`
  - Inter font loading and declaration
  - Full CSS with animated perspective grid background (@keyframes)
  - `.site-nav` block (will customize in Step 5)
  - `<body data-category="{category}">` with appropriate category
  - Main content wrapper with padding
- Customize title, content, and category but **preserve all CSS structure**
- Ensure `body { padding-top: 70px; }` is present (prevents nav overlap)
- Set `body data-category` to one of: `pattern`, `operating-model`, `worked-example`, `quickstart`, `reference-tool`

### Phase 3: Navigation Setup (Steps 5–8)

#### Step 5: Set the active nav link on the new page

- Locate the `.site-nav` block in the new page
- On the page's own nav link (or nav-home if no dedicated link), add `active` class
- Example: `<a class="nav-home active" href="index.html">Home</a>`
- Verify `active` class is present AND only on this one link

#### Step 6: Add a card to index.html

- Open `index.html`
- Choose the correct section grid (Patterns, Operating Models, Worked Examples, Quickstarts, References)
- Add a new `<a class="card ..." href="new-page.html">` block
- Include `--accent` and `--glow` CSS custom properties for card color
- Example: `<a class="card" style="--accent: #38bdf8; --glow: rgba(56, 189, 248, .2);" href="api-guide.html">API Review Guide</a>`
- Add brief description text inside the card element

#### Step 7: Update nav on every OTHER existing page

- For each existing `.html` file (except the new page):
  - Open the file and locate the `.site-nav` block
  - Add `<a class="nav-newpage" href="new-page.html">Nav Label</a>` in the correct position
  - Remove `active` class if present on nav-home (only the current page has `active`)
  - Preserve the canonical link order from Step 8
- **Critical:** Do not skip any pages; nav must be consistent everywhere

#### Step 8: Update snippets/site-nav-snippet.html

- Open `snippets/site-nav-snippet.html`
- Locate the "NAV BLOCK" section (the `<nav>` HTML template)
- Add the new `<a class="nav-newpage" href="new-page.html">Nav Label</a>` link in the correct position
- Scroll to the bottom and find the "ACTIVE LINK CLASSES" comment section
- Add a new comment line showing the active class pattern for the new page

### Phase 4: Documentation (Steps 9–10)

#### Step 9: Update README.md

- Open `README.md`
- Locate the page listing table
- Add a new row with: filename, page title, category, short description
- Keep table rows in alphabetical order by filename

#### Step 10: Update general-ghcp-resources-links.html

- Open `general-ghcp-resources-links.html` (internal resources reference)
- Locate the resources table (data-category="reference-tool")
- Add the new page to the table in the appropriate section or general resources
- Include a link, title, and brief description

### Phase 5: Validation (Steps 11–13)

#### Step 11: Check for markdown linting errors

- Run markdown linter on all modified files (`.github/` files, `.html` pages, `README.md`)
- Check for common errors: MD031 (blank lines around code blocks), MD032 (blank lines around lists), MD040 (language on code blocks)
- Fix any linting errors before proceeding to validation checks
- This ensures documentation quality and prevents linting gate failures

#### Step 12: Run deterministic validation

- Refer to `.github/validation-checklist.md` for complete pre-push checks
- Run 6 validation checks:
  1. **Nav link presence:** Every `.html` has the new link
  2. **Href resolution:** All nav `href` values point to existing files
  3. **Rename cleanup:** No references to old filenames (if renamed)
  4. **Canonical sync:** `snippets/site-nav-snippet.html` matches live nav structure
  5. **No broken hrefs:** All internal links resolve
  6. **Active class consistency:** Only one page's own link has `active` class
- If any check fails, fix and re-run before proceeding

#### Step 13: Run browser interaction tests

- Refer to `.github/testing-guide.md` for complete test procedures
- Run 6 browser test paths:
  1. Page load and initial render
  2. Navigation bar structure and styling
  3. Topics dropdown menu
  4. Active nav link verification
  5. Page content scrolling and full-page layout
  6. Responsive mobile breakpoint (390px–768px)
- Document test results (pass/fail for each path)
- All tests must pass on desktop and at least one mobile breakpoint

### Phase 6: Retrospective & Metrics (Steps 14–15)

#### Step 14: Retrospective update

- Refer to `.github/metrics.md` for retrospective record template
- Write the 4-line retrospective:
  1. What slowed us down? (specific constraint or gap)
  2. What process/file is being improved?
  3. Exact rule added or changed
  4. How this prevents repeat issues
- Include this record in the final commit message or handoff

#### Step 15: Metrics logging

- After merge, append one enhancement record to `metrics/metrics-data.js`
- Use template from `.github/metrics.md`
- Include: title, type (Page Content & Integration), merged date, commit IDs, file changes, churn per file, quality gates, retrospective, interpretation
- Ensure `schemaVersion` compatibility is preserved

---

## Validation Reference

See `.github/validation-checklist.md` for:

- Complete 6-check validation with exact grep/find commands
- When to run checks
- Pass/fail criteria

## Testing Reference

See `.github/testing-guide.md` for:

- Complete 6-test path browser interaction procedures
- Expected results for each test
- Mobile responsiveness testing
- Test reporting format

## Metrics Reference

See `.github/metrics.md` for:

- Retrospective record template (4 lines)
- Efficiency scorecard template
- Metrics logging schema
- Quality gates definitions

---

## Common Issues & Fixes

### Issue: "Nav link on new page doesn't have active class"

**Fix:** Locate the new page's own `<a>` tag and add `active` class

```html
<!-- Before -->
<a class="nav-newpage" href="new-page.html">Label</a>

<!-- After -->
<a class="nav-newpage active" href="new-page.html">Label</a>
```

### Issue: "Old page names still referenced after rename"

**Fix:** Run `grep -R "old-name.html" .` and replace all matches in:

- All `.html` nav blocks
- `snippets/site-nav-snippet.html`
- `README.md`
- `index.html` (card href)

### Issue: "Nav links don't match canonical snippet"

**Fix:** Copy the canonical nav structure exactly from `snippets/site-nav-snippet.html` to all pages

### Issue: "Active class appears on multiple links in same nav bar"

**Fix:** Remove `active` class from all but one link. Only the current page's own link should have it.

---

## Success Criteria

✅ All 14 steps completed  
✅ All 6 validation checks pass (see validation-checklist.md)  
✅ All 6 browser interaction tests pass (see testing-guide.md)  
✅ Page appears in nav on all pages with correct active styling  
✅ Page card appears on index.html in correct section  
✅ Page appears in README.md and general-ghcp-resources-links.html  
✅ Retrospective record written and committed  
✅ One metrics record appended to metrics-data.js after merge  

Ready to commit and push when all criteria are met.
