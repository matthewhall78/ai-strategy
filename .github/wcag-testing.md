# WCAG Accessibility Testing Skill

**Purpose:** Automated testing and remediation for Web Content Accessibility Guidelines (WCAG) 2.1 Level AA compliance across static HTML pages.

**Applies to:** HTML files in `/` root directory and any page with dynamic theme switching or interactive elements.

**Skill Type:** Testing & Validation | Accessibility | Quality Assurance

---

## Overview

This skill provides systematic methods to audit pages for WCAG 2.1 Level AA compliance, including:
- **Contrast ratio validation** (text vs. background)
- **Color dependency detection** (avoiding color-only information)
- **Theme mode verification** (light & dark modes)
- **Semantic HTML structure** (headings, landmarks, lists)
- **Interactive element accessibility** (buttons, forms, custom controls)
- **Alternative text & labels** (images, icons, controls)
- **Focus management** (keyboard navigation, visible focus indicators)

---

## Key Principles

1. **No Dark Backgrounds in Light Mode** — Background colors must be light (#f5f7fa or lighter) in light theme; dark backgrounds like `rgba(8, 24, 39, ...)` violate WCAG AA.
2. **Sufficient Contrast** — Text color vs. background must have WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text).
3. **Semantic Structure** — All interactive elements must have proper labels, ARIA attributes, or semantic HTML.
4. **Keyboard Accessibility** — All functionality reachable via keyboard; visible focus indicators on interactive elements.
5. **Color Independence** — Information conveyed with color must also be conveyed through other means (patterns, text, icons).

---

## Testing Workflow

### Phase 1: Automated Contrast Checking

#### Step 1: Identify Dark Backgrounds
Use regex to find hardcoded dark color declarations:
```bash
grep -r "background.*rgba(8," . --include="*.html"
grep -r "background.*rgba(18," . --include="*.html"
grep -r "background.*#0[0-9a-f]" . --include="*.html"
```

#### Step 2: Verify Light Mode Overrides Exist
For each dark background found, confirm `:root[data-theme="light"]` override exists:
```javascript
// In browser console for light mode page:
const elements = document.querySelectorAll('[style*="background"]');
elements.forEach(el => {
  const computed = window.getComputedStyle(el);
  const bg = computed.backgroundColor;
  // Convert to RGB and check luminance
  console.log(el.className, bg);
});
```

#### Step 3: Calculate WCAG Contrast Ratios
Use online tools or Node.js to verify contrast:
```javascript
// Relative luminance formula (WCAG)
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(x => {
    x = x / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const l1 = getLuminance(...rgb1);
  const l2 = getLuminance(...rgb2);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

// Example: white text on light background
const whiteText = getContrastRatio([255, 255, 255], [245, 247, 250]); // ~1.1 ✗ FAILS
const darkText = getContrastRatio([26, 38, 55], [245, 247, 250]);     // ~14.5 ✓ PASSES
```

**WCAG AA Targets:**
- Normal text (< 18pt): 4.5:1 or higher
- Large text (≥ 18pt): 3:1 or higher
- UI components & graphical elements: 3:1 or higher

---

### Phase 2: Browser-Based Validation

#### Using axe DevTools (Recommended)
1. Install [axe DevTools](https://www.deque.com/axe/devtools/) browser extension
2. Open page in both light and dark modes
3. Run "Full Page Scan"
4. Review violations:
   - **Critical:** Stop and fix immediately (contrast, missing labels, broken landmarks)
   - **Serious:** Fix before merge (keyboard traps, color-only info)
   - **Minor:** Document and plan for future sprints

#### Using WAVE Browser Extension
1. Install [WAVE](https://wave.webaim.org/extension/)
2. Review for:
   - Red errors (structure/semantic issues)
   - Orange alerts (potential issues)
   - Green features (accessibility features found)

#### Manual Theme Testing Checklist
For **LIGHT MODE**:
- [ ] All text is dark or sufficiently contrasting
- [ ] No dark backgrounds (rgba(8,...) or similar dark colors)
- [ ] Navigation bar is visible with light background
- [ ] Cards, panels, and sections have light or transparent backgrounds
- [ ] All interactive elements are clearly visible
- [ ] Focus indicators are visible on all buttons/links

For **DARK MODE**:
- [ ] All text is light or sufficiently contrasting  
- [ ] Background gradients and accents are appropriate
- [ ] Text colors use `var(--text)` or light color values
- [ ] Focus indicators remain visible

---

### Phase 3: Keyboard Navigation Testing

1. **Tab Order**
   - Press Tab repeatedly; focus should move in logical reading order
   - No focus traps (focus can't escape with Tab + Shift+Tab)
   
2. **Interactive Controls**
   - Buttons: Activate with Enter or Space
   - Links: Activate with Enter
   - Custom controls: Test documented keyboard patterns

3. **Focus Visibility**
   - Use browser DevTools to inspect `:focus` styles
   - All interactive elements must have visible focus indicators
   - Focus ring must have 3:1 contrast with surrounding colors

---

### Phase 4: Semantic Structure Audit

#### Headings
```bash
# Extract heading hierarchy
grep -E "<h[1-6]" page.html | head -20
```
- [ ] H1 appears exactly once per page
- [ ] Heading levels are sequential (no jumping from H1 to H3)
- [ ] Headings describe page sections logically

#### Landmarks
- [ ] `<nav>` for navigation
- [ ] `<main>` for main content
- [ ] `<footer>` for footer
- [ ] Multiple `<nav>` or `<section>` have `aria-label` to distinguish

#### Lists
- [ ] Unordered lists use `<ul>/<li>`
- [ ] Ordered lists use `<ol>/<li>`
- [ ] Navigation menus use `<ul>` or `<nav>` + semantic structure

---

### Phase 5: Color & Contrast Scanning Script

Save as `accessibility-audit.js` and run in browser console:

```javascript
// WCAG Accessibility Audit Script
(function() {
  const results = {
    lowContrast: [],
    darkBackgrounds: [],
    missingLabels: [],
    colorOnlyInfo: []
  };

  // 1. Scan for dark backgrounds
  document.querySelectorAll('*').forEach(el => {
    if (el.offsetHeight === 0 || el.offsetWidth === 0) return;
    
    const computed = window.getComputedStyle(el);
    const bg = computed.backgroundColor;
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    
    if (match) {
      const [_, r, g, b] = match.map(Number);
      // Dark if all RGB < 180
      if (r < 180 && g < 180 && b < 180) {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (!isDarkMode) {
          results.darkBackgrounds.push({
            element: el.tagName,
            class: el.className,
            color: `rgb(${r},${g},${b})`
          });
        }
      }
    }
  });

  // 2. Scan for low contrast text
  document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6').forEach(el => {
    if (el.offsetHeight === 0) return;
    const text = window.getComputedStyle(el).color;
    const bg = window.getComputedStyle(el.parentElement).backgroundColor;
    // Simple check: if both are dark or both are light, possible contrast issue
    console.log(`${el.tagName}: Text ${text} on ${bg}`);
  });

  // 3. Scan for images without alt text
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt || img.alt.trim() === '') {
      results.missingLabels.push({
        src: img.src,
        element: 'img missing alt'
      });
    }
  });

  // 4. Scan for buttons without accessible names
  document.querySelectorAll('button').forEach(btn => {
    const hasLabel = btn.textContent.trim() || btn.getAttribute('aria-label');
    if (!hasLabel) {
      results.missingLabels.push({
        element: 'button without label',
        html: btn.outerHTML.substring(0, 80)
      });
    }
  });

  console.log('=== WCAG Accessibility Audit Results ===');
  console.log(JSON.stringify(results, null, 2));
  
  if (results.darkBackgrounds.length > 0) {
    console.warn(`⚠️ ${results.darkBackgrounds.length} dark backgrounds found in light mode`);
  }
  if (results.missingLabels.length > 0) {
    console.warn(`⚠️ ${results.missingLabels.length} missing or empty labels found`);
  }
})();
```

---

## Common Issues & Fixes

| Issue | Symptom | WCAG Criterion | Fix |
|-------|---------|---|---|
| Dark background in light mode | `rgba(8, 24, 39, 0.78)` visible | 1.4.3 Contrast | Add `:root[data-theme="light"] .class { background: rgba(255,255,255,0.9); }` |
| Low contrast text | Text hard to read | 1.4.3 Contrast | Increase darkness of text or lightness of background; target 4.5:1 ratio |
| Missing focus indicator | Can't see where focus is | 2.4.7 Focus Visible | Add `:focus { outline: 2px solid var(--cyan); }` or similar |
| Color-only buttons | Red button = warning, but what if colorblind? | 1.4.1 Use of Color | Add text, icon, or pattern in addition to color |
| Missing form labels | Screen reader users can't identify fields | 1.3.1 Info & Relationships | Use `<label for="id">` or `aria-label="..."` |
| Image without alt | Screen readers say "image" with no context | 1.1.1 Non-text Content | Add descriptive `alt` text |

---

## Remediation Checklist

- [ ] Run axe DevTools and fix all critical violations
- [ ] Toggle light/dark mode and verify no dark backgrounds remain in light mode
- [ ] Calculate contrast ratio for all text (target 4.5:1 for normal, 3:1 for large)
- [ ] Test keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Verify all buttons/links have visible focus indicators
- [ ] Check heading hierarchy (H1 unique, sequential levels)
- [ ] Add alt text to all decorative/informational images
- [ ] Review ARIA labels for custom controls
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)

---

## Resources

- [WCAG 2.1 Standard](https://www.w3.org/WAI/WCAG21/quickref/) — Official guidelines
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Online tool
- [axe DevTools](https://www.deque.com/axe/devtools/) — Browser extension
- [WAVE](https://wave.webaim.org/) — Accessibility checker
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — ARIA patterns
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/) — Desktop app

---

## Integration with CI/CD

Add to `.github/workflows/accessibility.yml`:
```yaml
name: WCAG Accessibility Check

on: [pull_request]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g pa11y-ci
      - run: pa11y-ci --standard WCAG2AA --runners axe
```

---

## Approval Criteria

Page is WCAG 2.1 Level AA compliant when:
1. ✅ No dark backgrounds in light mode (all background colors > rgb(200,200,200))
2. ✅ Text contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
3. ✅ All interactive elements keyboard accessible and have visible focus
4. ✅ Heading structure is semantic and sequential
5. ✅ Images have descriptive alt text
6. ✅ No ARIA violations from axe scan
7. ✅ Color not used as sole means of conveying information

---

**Last Updated:** May 2026  
**Maintained By:** Design Systems + Accessibility Team  
**Next Review:** Q3 2026
