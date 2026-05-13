# WCAG 2.1 Level AA Accessibility Audit Skill

**Status:** Comprehensive automated + manual testing framework  
**Applies To:** All HTML pages with theme switching and interactive elements  
**Compliance Target:** WCAG 2.1 Level AA (4.5:1 contrast for normal text, 3:1 for large)

---

## Quick Audit Commands

### 1. Find All Contrast Issues (Run in Terminal)

```bash
# Find all hardcoded colors that might be problematic
grep -r "color:\s*#\|background:\s*#\|color:\s*rgba\|background:\s*rgba" . --include="*.html" | \
  grep -E "(#fff|#f|rgba\(255|white)" | head -30

# Find white text elements
grep -r "color:\s*#fff\|color:\s*white\|color:\s*rgba\(255" . --include="*.html"

# Find light backgrounds
grep -r "background:\s*#f\|background:\s*rgba\(245\|background:\s*rgba\(255" . --include="*.html"
```

### 2. Browser Console Accessibility Audit

Paste this into any page's browser console (both light and dark mode):

```javascript
(function() {
  console.clear();
  console.log('🔍 WCAG Contrast Audit Started...\n');
  
  // Luminance calculation
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
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  }

  function rgbToArray(rgb) {
    const match = rgb.match(/\d+/g);
    return match ? match.map(Number).slice(0, 3) : null;
  }

  const issues = {
    lowContrast: [],
    darkBgLightMode: [],
    lightBgDarkText: [],
    noFocusIndicator: []
  };

  // Check text elements
  document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6, li, label').forEach(el => {
    if (el.offsetHeight === 0 || el.offsetWidth === 0) return;
    
    const text = window.getComputedStyle(el).color;
    const bg = window.getComputedStyle(el).backgroundColor;
    const parent = el.parentElement ? window.getComputedStyle(el.parentElement).backgroundColor : 'transparent';
    
    const textRgb = rgbToArray(text);
    const bgRgb = rgbToArray(bg !== 'rgba(0, 0, 0, 0)' ? bg : parent);
    
    if (textRgb && bgRgb) {
      const ratio = getContrastRatio(textRgb, bgRgb);
      const isLightMode = document.documentElement.getAttribute('data-theme') === 'light' || 
                          !document.documentElement.hasAttribute('data-theme');
      
      if (ratio < 4.5) {
        const isLargeText = parseInt(window.getComputedStyle(el).fontSize) >= 18;
        const minRatio = isLargeText ? 3 : 4.5;
        
        if (ratio < minRatio) {
          issues.lowContrast.push({
            element: el.tagName,
            text: el.textContent.substring(0, 50),
            contrast: ratio,
            required: minRatio,
            color: text,
            background: bgRgb ? `rgb(${bgRgb.join(',')})` : 'transparent',
            mode: isLightMode ? 'LIGHT' : 'DARK'
          });
        }
      }
    }
  });

  // Check for dark backgrounds in light mode
  const isLightMode = document.documentElement.getAttribute('data-theme') === 'light' || 
                      !document.documentElement.hasAttribute('data-theme');
  if (isLightMode) {
    document.querySelectorAll('*').forEach(el => {
      if (el.offsetHeight === 0) return;
      const bg = window.getComputedStyle(el).backgroundColor;
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const [_, r, g, b] = match.map(Number);
        // Dark if all RGB < 150
        if (r < 150 && g < 150 && b < 150 && bg !== 'rgba(0, 0, 0, 0)') {
          issues.darkBgLightMode.push({
            element: el.tagName,
            class: el.className,
            color: `rgb(${r},${g},${b})`
          });
        }
      }
    });
  }

  // Check hover states
  document.querySelectorAll('[data-tooltip], [title]').forEach(el => {
    const title = el.getAttribute('data-tooltip') || el.getAttribute('title');
    if (title) {
      console.log(`⚠️ Tooltip found: "${title}" on ${el.tagName}`);
    }
  });

  // Check for focus indicators
  document.querySelectorAll('button, a[href], input, [role="button"]').forEach(el => {
    const focusStyle = getComputedStyle(el, ':focus');
    const outline = window.getComputedStyle(el).outline;
    if (outline === 'none' || outline === 'rgb(0, 0, 0) none 0px') {
      issues.noFocusIndicator.push({
        element: el.tagName,
        class: el.className,
        text: el.textContent?.substring(0, 30)
      });
    }
  });

  // Report results
  console.log(`%c📊 ISSUES FOUND:\n`, 'font-weight: bold; font-size: 14px;');
  
  if (issues.lowContrast.length > 0) {
    console.group(`%c❌ Low Contrast: ${issues.lowContrast.length}`, 'color: red; font-weight: bold;');
    issues.lowContrast.slice(0, 10).forEach(issue => {
      console.log(`  ${issue.element}: "${issue.text}" (${issue.contrast}:1, need ${issue.required}:1)`);
      console.log(`    Color: ${issue.color} on ${issue.background}`);
    });
    if (issues.lowContrast.length > 10) console.log(`  ... and ${issues.lowContrast.length - 10} more`);
    console.groupEnd();
  }

  if (issues.darkBgLightMode.length > 0) {
    console.group(`%c❌ Dark Backgrounds in Light Mode: ${issues.darkBgLightMode.length}`, 'color: red; font-weight: bold;');
    issues.darkBgLightMode.slice(0, 10).forEach(issue => {
      console.log(`  ${issue.element}.${issue.class}: ${issue.color}`);
    });
    if (issues.darkBgLightMode.length > 10) console.log(`  ... and ${issues.darkBgLightMode.length - 10} more`);
    console.groupEnd();
  }

  if (issues.noFocusIndicator.length > 0) {
    console.group(`%c⚠️ Missing Focus Indicators: ${issues.noFocusIndicator.length}`, 'color: orange; font-weight: bold;');
    issues.noFocusIndicator.slice(0, 5).forEach(issue => {
      console.log(`  ${issue.element}: "${issue.text}"`);
    });
    if (issues.noFocusIndicator.length > 5) console.log(`  ... and ${issues.noFocusIndicator.length - 5} more`);
    console.groupEnd();
  }

  if (issues.lowContrast.length === 0 && issues.darkBgLightMode.length === 0) {
    console.log('%c✅ No critical contrast issues found!', 'color: green; font-weight: bold;');
  }

  console.log('\n📋 Full results:', issues);
})();
```

### 3. Manual Inspection Checklist

**LIGHT MODE Checks:**
- [ ] Navigate top nav — text is dark on light background (not white on light)
- [ ] Hover all buttons — tooltip text has sufficient contrast (4.5:1)
- [ ] Scroll all sections — no dark backgrounds (`rgba(8,...)`, `rgba(18,...)`)
- [ ] Check cards/panels — text color is dark, not light gray
- [ ] Test focus — Tab through page, focus ring visible on all interactive elements

**DARK MODE Checks:**
- [ ] Navigate top nav — text is light on dark background
- [ ] Hover all buttons — tooltip contrast maintained
- [ ] Check cards/panels — text is light, not white-on-dark issues
- [ ] Verify focus — Tab through, focus ring visible with good contrast

---

## Common Issues to Hunt For

### Issue #1: White Text on Light Background
**Pattern:** In light mode, nav or text with `color: white` or `color: #fff` on light background

**Example (BAD):**
```css
.nav a {
  color: #ffffff;  /* White text */
  background: rgba(245, 247, 250, 0.95);  /* Light background */
  /* Contrast: ~1:1 — FAILS */
}
```

**Fix:**
```css
:root[data-theme="light"] .nav a {
  color: #1a2637;  /* Dark text */
}
```

---

### Issue #2: Tooltip Contrast
**Pattern:** Tooltips with hardcoded colors that don't adapt to theme

**Example (BAD):**
```css
.tooltip::after {
  color: #ffffff;
  background: rgba(5, 17, 28, 0.98);  /* Dark background */
}
```

**Fix:**
```css
.tooltip::after {
  color: var(--text);
  background: var(--panel);
}
```

---

### Issue #3: Light Gray Text in Light Mode
**Pattern:** Text color like `#d8e6ef` or `var(--muted)` on light background

**Example (BAD):**
```css
p {
  color: #d8e6ef;  /* Light gray (dark mode color) */
}

:root[data-theme="light"] p {
  /* Inherits light gray — FAILS on light background */
}
```

**Fix:**
```css
:root[data-theme="light"] p {
  color: #6b7d8f;  /* Darker gray for light mode */
}
```

---

## Audit Workflow

### Step 1: Run Console Audit (5 min)
1. Open page in light mode
2. Paste accessibility audit script in console
3. Note all low-contrast issues
4. Switch to dark mode, repeat
5. Document findings

### Step 2: Manual Inspection (10 min per page)
1. Toggle light/dark mode
2. Check nav bar text color
3. Hover over buttons and interactive elements
4. Tab through page checking focus indicators
5. Scroll through all sections

### Step 3: Fix Issues (20-30 min)
1. Add `:root[data-theme="light"]` overrides for text color
2. Update tooltip styles to use theme variables
3. Ensure hover states have sufficient contrast
4. Add focus indicator CSS if missing

### Step 4: Re-Audit (5 min)
1. Reload page (hard refresh: Cmd+Shift+R)
2. Re-run console audit script
3. Verify zero critical issues
4. Test both light and dark modes

---

## Critical Fixes by Category

### Navigation Bar
```css
/* Fix white nav text on light backgrounds */
:root[data-theme="light"] .site-nav a {
  color: #6b7d8f;  /* Was: white or light gray */
  background: rgba(245, 247, 250, 0.95);
}

:root[data-theme="light"] .site-nav a:hover {
  color: #1a2637;
}

:root[data-theme="light"] .site-nav-dropdown-menu a {
  color: #1a2637;  /* Dark text in dropdown */
}
```

### Tooltips
```css
.tooltip::after {
  color: var(--text);  /* Use theme text color */
  background: var(--panel);  /* Use theme background */
  border-color: rgba(39, 194, 242, 0.35);
}
```

### Button Hover/Focus States
```css
button:focus {
  outline: 2px solid var(--cyan);
  outline-offset: 2px;
}

:root[data-theme="light"] button:focus {
  outline-color: var(--cyan);
}
```

### Form Labels
```css
label, .label {
  color: var(--text);
}

:root[data-theme="light"] label, 
:root[data-theme="light"] .label {
  color: #1a2637;
}
```

---

## Test Results Template

Document findings for each page:

```
## [page-name.html]

### Light Mode
- Nav text: ❌ White on light / ✅ Dark on light
- Tooltips: ❌ Low contrast / ✅ 4.5:1+
- Focus indicators: ❌ Missing / ✅ Visible
- Text color: ❌ Too light / ✅ Sufficient

### Dark Mode
- Nav text: ❌ Too dark / ✅ Light on dark
- Tooltips: ❌ Low contrast / ✅ Sufficient
- Focus indicators: ✅ Visible
- Text color: ✅ Sufficient

### Issues Found
- [ ] Issue #1: [description]
- [ ] Issue #2: [description]

### Fixes Applied
- ✅ Added :root[data-theme="light"] overrides for nav
- ✅ Updated tooltip styles to use theme variables
- ✅ Added focus indicator outlines

### Re-Audit Result
✅ All critical issues resolved
```

---

## Accessibility Reference

### Contrast Ratios
| Text Type | WCAG AA | WCAG AAA |
|-----------|---------|---------|
| Normal text (< 18pt) | 4.5:1 | 7:1 |
| Large text (≥ 18pt) | 3:1 | 4.5:1 |
| UI components | 3:1 | — |
| Graphical elements | 3:1 | — |

### Color Luminance Formula
```
If RsRGB ≤ 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
If GsRGB ≤ 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
If BsRGB ≤ 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4

L = 0.2126 * R + 0.7152 * G + 0.0722 * B

Contrast = (L1 + 0.05) / (L2 + 0.05)  [where L1 is lighter]
```

### Quick Color Reference
```
Pure black #000000    — L = 0.0
White #ffffff         — L = 1.0
Light background #f5f7fa — L ≈ 0.95
Dark text #1a2637     — L ≈ 0.05
Light text #edf3f8    — L ≈ 0.95
Cyan #27c2f2          — L ≈ 0.42
```

---

## Tools & Resources

- **Browser:** Console audit script (above)
- **Online:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Extension:** [axe DevTools](https://www.deque.com/axe/devtools/)
- **CLI:** `pa11y-ci --standard WCAG2AA`

---

## Sign-Off Checklist

Before committing accessibility changes:

- [ ] Console audit shows zero critical contrast issues
- [ ] Both light and dark modes tested manually
- [ ] Nav text color appropriate for theme
- [ ] All tooltips have sufficient contrast
- [ ] Focus indicators visible on all interactive elements
- [ ] No hardcoded light text on light backgrounds
- [ ] No hardcoded dark text on dark backgrounds
- [ ] Form labels use theme-appropriate colors
- [ ] Tested on both Mac and Windows (focus ring rendering differs)

---

**Last Updated:** May 2026  
**Maintained By:** Accessibility Team
