# Skill: Layout & Theme — Complete Procedure

**Skill Name:** Layout & Theme  
**Category:** Layout & Responsive Architecture  
**Effort:** Medium | **Uncertainty:** Medium  
**Inputs:**

- Theme name (e.g., "Light Mode", "Dark Mode", "High Contrast")
- Primary color palette (background, panels, text, accents)
- Toggle mechanism (system preference, button, dropdown)
- Target scope (all pages, specific pages, or new pages only)

**Outputs:**

- Updated CSS variables in root `:root` selector
- Theme toggle HTML element and JavaScript (if applicable)
- Updated all `.html` pages with theme support
- Browser testing validation for color contrast and readability
- Metrics logging for theme enhancement

---

## Complete Workflow

### Phase 1: Planning & Design (Steps 1–2)

#### Step 1: Define the Theme

Plan the new theme by documenting:

- **Theme Name** — Clear, descriptive name (e.g., "Light Mode", "High Contrast Dark")
- **Color Palette** — Define CSS variables:
  - `--bg`: Primary background color
  - `--panel`: Panel/card background
  - `--panel-2`: Secondary panel background (if used)
  - `--text`: Primary text color
  - `--muted`: Muted/secondary text color
  - `--line`: Border/divider color
  - Accent colors: `--cyan`, `--green`, `--blue`, `--purple`, `--pink`, `--navy`, etc.
- **Contrast Ratios** — Ensure WCAG AA compliance (4.5:1 minimum for text/background)
- **Navigation Styling** — Define `--site-nav-*` variables for nav bar appearance
- **Dark Mode vs Light Mode** — Document any special handling for system preference detection

Example for Light Mode:

```
--bg: #f5f7fa (light gray)
--panel: #ffffff (white)
--text: #1a2637 (dark blue)
--muted: #6b7d8f (medium gray)
--cyan: #06b6d4 (teal)
--pink: #ec4899 (bright pink)
--navy: #1e3a8a (dark blue)
```

#### Step 2: Check Current CSS Structure

Review the root CSS variables in any existing `.html` file:

```bash
# Extract current CSS variables from index.html
grep -A 20 ":root {" index.html | head -30
```

Document:
- All current `--` variable names
- Which variables are colors vs. spacing vs. shadows
- Which variables are used in navigation, cards, text, etc.

---

### Phase 2: Update CSS (Steps 3–5)

#### Step 3: Create Theme Toggle Mechanism

Choose one approach:

**Option A: System Preference (Recommended for Accessibility)**

```html
<!-- In <head>, add media query support -->
<style>
  :root {
    color-scheme: light;  /* for light mode */
  }
  
  @media (prefers-color-scheme: light) {
    :root {
      --bg: #f5f7fa;
      --panel: #ffffff;
      --text: #1a2637;
      /* ... rest of light theme */
    }
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #080d12;
      --panel: #121a24;
      --text: #edf3f8;
      /* ... rest of dark theme */
    }
  }
</style>
```

**Option B: Manual Toggle Button**

```html
<!-- In nav or body, add toggle button -->
<button id="theme-toggle" aria-label="Toggle dark/light mode">
  <span class="theme-icon">🌙</span>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  // Load saved preference or system default
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
  
  // Apply saved theme on load
  setTheme(savedTheme);
</script>

<style>
  :root[data-theme="light"] {
    --bg: #f5f7fa;
    --panel: #ffffff;
    --text: #1a2637;
    /* ... light theme variables */
  }
  
  :root[data-theme="dark"] {
    --bg: #080d12;
    --panel: #121a24;
    --text: #edf3f8;
    /* ... dark theme variables */
  }
</style>
```

#### Step 4: Update Root CSS Variables

For **each `.html` file**:

1. Locate the `:root { }` style block in `<head>`
2. Replace or extend the `--*` variables with the new theme colors
3. If using Option B (toggle), wrap variables in `[data-theme]` selectors

Example:
```css
:root[data-theme="light"] {
  --bg: #f5f7fa;
  --panel: #ffffff;
  --panel-2: #f0f4f8;
  --text: #1a2637;
  --muted: #6b7d8f;
  --line: rgba(100, 120, 150, .18);
  --cyan: #06b6d4;
  --green: #10b981;
  --blue: #3b82f6;
  --purple: #8b5cf6;
  --pink: #ec4899;
  --navy: #1e3a8a;
  --shadow: 0 4px 12px rgba(0, 0, 0, .08);
}

:root[data-theme="light"] .site-nav {
  --site-nav-bg: rgba(255, 255, 255, .92);
  --site-nav-border: rgba(100, 120, 150, .22);
  --site-nav-link: #1a2637;
  --site-nav-hover-bg: rgba(236, 72, 153, .12);
  --site-nav-hover-border: rgba(236, 72, 153, .4);
  --site-nav-active-bg: rgba(30, 58, 138, .12);
  --site-nav-active-border: rgba(30, 58, 138, .56);
}
```

#### Step 5: Test Color Contrast

Use a contrast checker to verify WCAG compliance:

```bash
# Verify text color against background (example: #1a2637 text on #f5f7fa bg)
# Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
# Target: 4.5:1 for normal text, 3:1 for large text (18px+)

# Or use online tools to spot-check critical colors
echo "Light mode text on bg: Check #1a2637 on #f5f7fa"
echo "Light mode text on panel: Check #1a2637 on #ffffff"
echo "Light mode muted text: Check #6b7d8f on #f5f7fa"
```

---

### Phase 3: Update All Pages (Steps 6–8)

#### Step 6: Copy Theme to All HTML Files

For each `.html` file in the root:

1. Open the file
2. Locate the `:root { }` style block
3. Copy the new theme CSS variables from the reference file (or paste entire `:root` block)
4. If using toggle button, ensure the script and button HTML are present

**Automated approach using sed:**
```bash
# Create a backup first
cp index.html index.html.backup

# Extract just the :root CSS from index.html
sed -n '/:root {/,/^    }/p' index.html > /tmp/root-styles.css

# For each other .html file, replace its :root block
for file in *.html; do
  [ "$file" = "index.html" ] && continue
  # This is manual in practice; sed replacements across multiple files are error-prone
  # Better to use editor find-replace or hand-edit critical files
done
```

**Better approach: Manual update of critical pages**
- Update `index.html` first and test
- Copy the exact `:root` CSS block and theme toggle script
- Update remaining `.html` files in batches (5–10 at a time)
- Test after each batch

#### Step 7: Add Theme Toggle to Navigation (If Using Option B)

If using manual toggle button:

1. Locate the `.site-nav` block in each `.html` file
2. Add toggle button near the end of the nav (before closing `</nav>`):

```html
<button id="theme-toggle" aria-label="Toggle dark/light mode" style="margin-left: auto;">
  <span id="theme-icon">🌙</span>
</button>
```

3. Ensure the toggle script (from Step 3, Option B) is included in `<head>` or before `</body>`

#### Step 8: Update Navigation Styling for New Theme

For each `.html` file, if the `.site-nav` CSS variables changed:

1. Locate the `.site-nav { }` style block
2. Update `--site-nav-*` variables to match the new theme
3. Example for light mode:

```css
.site-nav {
  --site-nav-bg: rgba(255, 255, 255, .92);
  --site-nav-border: rgba(100, 120, 150, .22);
  --site-nav-link: #1a2637;
  --site-nav-hover-bg: rgba(236, 72, 153, .12);
  --site-nav-hover-border: rgba(236, 72, 153, .4);
  --site-nav-active-bg: rgba(30, 58, 138, .12);
  --site-nav-active-border: rgba(30, 58, 138, .56);
}
```

---

### Phase 4: Validation & Testing (Steps 9–11)

#### Step 9: Check Markdown Linting

Before finalizing, run the markdown linter on all modified files (`.github/` files, `.html` pages, `README.md`). Ensure there are no remaining linting errors in any affected file:

```bash
# Check for linting errors in all modified files
markdownlint .github/*.md README.md *.html
# Look for these common issues:
# - MD003: Heading style
# - MD012: Multiple consecutive blank lines
# - MD022: Blank lines around headings
# - MD031: Blank lines around code blocks
# - MD032: Blank lines around lists
# - MD040: Fenced code blocks should have a language
```

Fix all linting errors in every modified file before proceeding. Do not claim completion until the linter reports zero errors across all affected files.

#### Step 10: Run Browser Interaction Tests

Refer to `.github/testing-guide.md` for complete test procedures. For theme changes, test:

1. **Theme Toggle Functionality** (if using manual toggle):
   - Click theme toggle button
   - Verify colors change across all elements
   - Verify toggle icon updates (sun/moon)
   - Verify localStorage persists theme choice on page reload

2. **Light Mode Readability**:
   - Page load in light mode (browser system pref or localStorage)
   - All text is readable against light backgrounds
   - Headings, body text, and muted text have sufficient contrast
   - Code blocks and inline code are clearly distinguished

3. **Dark Mode Readability** (regression test):
   - Verify dark mode still works if present
   - All original dark mode colors and contrast are preserved

4. **Navigation Bar Styling**:
   - Nav bar appearance matches theme (background, text color, hover states)
   - Active nav link styling is visible in both themes
   - Dropdown menus (if present) render correctly

5. **Card and Panel Styling**:
   - Cards and panels use correct background color for theme
   - Box shadows are appropriate for theme (subtle in light, more defined in dark)
   - Text color on cards is readable

6. **Responsive Mobile Testing** (390px–768px):
   - Theme toggle (if present) is accessible on mobile
   - Colors and contrast remain compliant on smaller screens
   - No layout shift when toggling theme

#### Step 11: Validate All Files

Run the deterministic validation from `.github/validation-checklist.md`:

- **Nav link presence:** Every `.html` has the same nav links (theme toggle is not nav)
- **Href resolution:** All nav `href` values point to existing files
- **Rename cleanup:** No old filename references (if renamed)
- **Canonical sync:** All `.html` files use the same CSS root variables
- **No broken hrefs:** All internal links resolve
- **Active class consistency:** Only one page's own nav link has `active` class

---

### Phase 5: Documentation & Metrics (Steps 12–13)

#### Step 12: Retrospective Update

Refer to `.github/metrics.md` for retrospective record template. Write the 4-line retrospective:

1. **What slowed us down?** — E.g., "Updating 19 HTML files with identical CSS changes; testing contrast across light/dark modes."
2. **What process/file is being improved?** — `.github/skill-layout-theme.md` or all `.html` files
3. **Exact rule added or changed.** — E.g., "All theme changes must be tested for WCAG AA contrast compliance (4.5:1) before merge."
4. **How this prevents repeat issues.** — E.g., "Explicit contrast testing requirement prevents inaccessible color choices."

#### Step 13: Metrics Logging

After merge, append one enhancement record to `metrics/metrics-data.js` with retrospective and efficiency scorecard. See `.github/metrics.md` for complete template.

---

## Common Issues & Fixes

### Issue: Light mode text is hard to read on light background

**Fix:** Increase contrast ratio. Use a darker text color:
- Current: `#6b7d8f` (too light)
- Better: `#1a2637` (much darker)

Test with WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

### Issue: Theme toggle button doesn't work

**Fix:** Verify:
1. Script is in `<head>` or before `</body>`
2. Button has `id="theme-toggle"`
3. Root element can receive `data-theme` attribute
4. CSS selectors use `:root[data-theme="light/dark"]` correctly

### Issue: Some pages still use old dark colors after toggle

**Fix:**
1. Check that ALL `:root` CSS blocks were updated
2. Verify no inline `style` attributes override CSS variables
3. Test in incognito/private mode to clear browser cache
4. Run `grep -r "\.bg\|\.panel\|#030303" *.html` to find hardcoded colors

### Issue: Box shadows look wrong in light mode

**Fix:** Adjust shadow opacity and blur:
- **Dark mode:** `--shadow: 0 26px 70px rgba(0,0,0,.42)` (strong, dark shadow)
- **Light mode:** `--shadow: 0 4px 12px rgba(0,0,0,.08)` (subtle, soft shadow)

---

## Validation Reference

See `.github/validation-checklist.md` for complete validation procedures.

## Testing Reference

See `.github/testing-guide.md` for complete browser interaction test procedures.

## Metrics Reference

See `.github/metrics.md` for retrospective record template and efficiency scorecard.
