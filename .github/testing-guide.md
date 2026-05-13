# testing-guide.md — Browser Interaction Testing for New Pages

When creating a new page or modifying navigation/interactive features, run these browser interaction tests to verify the page works correctly in a real browser context.

## Test Environment Setup

- Use a real browser (Chrome, Firefox, or Safari)
- Open the new page via `file://` or local server (not a mock/headless context)
- Test on both desktop (1280px+) and mobile (320px–768px) viewport widths
- Clear browser cache before testing if you've recently modified the page

## Test Path 1: Page Load and Initial Render

**Steps:**
1. Navigate to the new page URL (e.g., `file:///path/to/new-page.html`)
2. Wait for page to fully load (animated grid background should be visible)
3. Inspect the page visually

**Expected results:**
- ✓ Page title appears in browser tab
- ✓ Dark background (#030303–#090d12 range) displays without flickering
- ✓ Animated perspective grid background animates smoothly in the back
- ✓ No JavaScript console errors (DevTools → Console)
- ✓ No missing resources (DevTools → Network, check for 404s)
- ✓ Page content is readable (text contrast, font sizing)

**Pass/Fail:** ✅ Pass if all 5 criteria met. ❌ Fail if any render issue or console error.

---

## Test Path 2: Navigation Bar Structure and Styling

**Steps:**
1. Locate the `.site-nav` block at the top of the page
2. Hover over each nav link to see hover state
3. Click nav-home to navigate to home
4. Return to the new page (back button)

**Expected results:**
- ✓ Nav bar displays as a horizontal pill shape (rounded, centered)
- ✓ All 5 nav links visible: Home, Topics (button), Metrics, Shared Problems, Docs
- ✓ New page's own nav link has green background (active class) with rgba(34, 197, 94, .2) background and .56 border
- ✓ Hover state shows cyan color change (rgba(56, 189, 248, .18) background)
- ✓ Nav bar is fixed at top (stays visible when scrolling)
- ✓ Clicking Home navigates to `index.html`
- ✓ Back button returns to previous page

**Pass/Fail:** ✅ Pass if all 7 criteria met. ❌ Fail if nav is broken, misaligned, or links don't work.

---

## Test Path 3: Topics Dropdown Menu

**Steps:**
1. Locate the "Topics" button in the nav
2. Hover over the Topics button (desktop) or click it (mobile)
3. Verify dropdown menu appears below the button
4. Click one of the category links (e.g., "Patterns")
5. Verify navigation to `index.html?category=pattern` works
6. Return to the new page

**Expected results:**
- ✓ Dropdown menu appears on hover (desktop) or click (mobile/touch)
- ✓ Menu shows 5 category options: Patterns, Operating Model, Worked Examples, Quickstarts, Reference/Tools
- ✓ Clicking a category navigates to index.html with the category filter applied
- ✓ Menu disappears when clicking outside or selecting a link
- ✓ Dropdown styling matches nav bar (dark background, light text, cyan borders on hover)

**Pass/Fail:** ✅ Pass if all 5 criteria met. ❌ Fail if dropdown doesn't appear, links broken, or menu gets stuck open.

---

## Test Path 4: Active Nav Link Verification

**Steps:**
1. While on the new page, inspect the nav HTML (DevTools → Inspector)
2. Find the new page's own nav link element (e.g., `<a class="nav-new-page active"...>`)
3. Verify the `active` class is present
4. Navigate to another page (e.g., metrics-dashboard.html)
5. Inspect that page's nav and verify its own link has `active` class
6. Return to the new page and verify active state is restored

**Expected results:**
- ✓ New page's nav link has both class name (e.g., `nav-new-page`) and `active` class
- ✓ Active link displays with green background (not cyan, not default)
- ✓ Only ONE link in the nav bar has `active` class (no duplicates)
- ✓ When navigating to other pages, their active links appear green
- ✓ When returning to new page, its active link is green again (not stale from previous page)

**Pass/Fail:** ✅ Pass if all 5 criteria met. ❌ Fail if active class missing, duplicated, or not updating on navigation.

---

## Test Path 5: Page Content Scrolling and Full-Page Layout

**Steps:**
1. Scroll to the top of the page
2. Verify nav bar is visible and not overlapped by content
3. Scroll to the middle of the page
4. Verify `body { padding-top: 70px; }` creates proper clearance for fixed nav
5. Scroll to the bottom of the page
6. Verify footer or end-of-content is readable and not cut off

**Expected results:**
- ✓ Page has `padding-top: 70px` applied (nav doesn't cover content at top)
- ✓ Content starts at least 70px from top, giving clearance for fixed nav
- ✓ All page content is scrollable and readable at top, middle, and bottom
- ✓ No content is cut off by the nav bar (even when scrolled back to top)
- ✓ Page scrolls smoothly (`html { scroll-behavior: smooth; }` if using anchor links)
- ✓ Animated background grid continues to animate while scrolling

**Pass/Fail:** ✅ Pass if all 6 criteria met. ❌ Fail if content overlapped, padding missing, or scrolling broken.

---

## Test Path 6: Responsive Breakpoint (Mobile View)

**Steps:**
1. Open DevTools (F12 / Cmd+Opt+I)
2. Enable Device Emulation (Cmd+Shift+M on Chrome/Edge, Cmd+Opt+M on Firefox)
3. Set viewport to iPhone 12 (390px × 844px) or similar mobile size
4. Reload the page
5. Verify layout adapts to mobile width
6. Check nav bar behavior at mobile width

**Expected results:**
- ✓ Page layout reflows to single column or mobile-optimized grid
- ✓ Text remains readable at mobile width (font size doesn't shrink below 16px for body text)
- ✓ Nav bar remains visible and functional on mobile
- ✓ Topics dropdown menu opens on click (not on hover)
- ✓ No horizontal scrolling required to see main content
- ✓ Padding/margins adjust appropriately for narrow screens

**Pass/Fail:** ✅ Pass if all 6 criteria met. ❌ Fail if layout breaks, text unreadable, or nav unusable on mobile.

---

## Test Reporting

When running these tests, document your findings:

**Passing test report:**
```
✅ Test Path 1 (Page Load): PASS
✅ Test Path 2 (Nav Bar): PASS
✅ Test Path 3 (Dropdown): PASS
✅ Test Path 4 (Active Link): PASS
✅ Test Path 5 (Scrolling): PASS
✅ Test Path 6 (Mobile): PASS

Result: All browser interaction tests passed. Ready to commit.
```

**Failing test report:**
```
✅ Test Path 1 (Page Load): PASS
✅ Test Path 2 (Nav Bar): PASS
❌ Test Path 3 (Dropdown): FAIL — Menu does not close when clicking outside

Issue: Dropdown menu remains open after clicking a category link.
Fix needed: Check dropdown close event handler in HTML.
Status: PENDING FIX
```

---

## When to Run These Tests

- **Mandatory:** After creating a new page or changing nav structure
- **Mandatory:** After modifying any interactive elements (dropdowns, toggles, event handlers)
- **Recommended:** Before every commit if changes touch navigation or layout

## Acceptance Criteria

✅ **Ready to commit** if all 6 test paths pass on both desktop and at least one mobile breakpoint.

❌ **Not ready** if any test path fails. Fix the issue and re-run before pushing.
