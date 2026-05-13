# validation-checklist.md — Pre-Push Validation for New Pages

Run these checks before committing new page additions or changes to navigation structure. All checks must pass before pushing to origin/main.

## 1. Nav Link Presence

Verify that every `.html` file's `.site-nav` block contains all current nav links (including the new one if applicable).

**Command:**
```bash
grep -l "class=\"nav-home\"" *.html | while read f; do echo "=== $f ==="; grep -c "class=\"nav-" "$f"; done
```

**Expected result:** Every HTML file should have at least 5 nav links (home, topics, metrics, shared-problems, docs). New pages should have 5, existing pages should gain 1 more.

**Manual verification:**
- Open each changed `.html` file
- Locate the `.site-nav` block
- Count the `<a>` tags and button
- Confirm new link is present

---

## 2. Nav Href Resolution

Verify every local nav `href` target resolves to an existing file in the repo.

**Commands:**
```bash
# Find all nav href values
grep -oP 'class="nav-[^"]*"\s+href="\K[^"]+' *.html | sort -u

# For each href (except external URLs), verify the file exists
for href in $(grep -oP 'href="\K[^"]+' *.html | grep -v "^http" | sort -u); do
  if [ ! -f "$href" ]; then
    echo "MISSING: $href"
  fi
done
```

**Expected result:** All local hrefs should point to existing files. No output means all checks passed.

**Fallback manual check:**
- For each `<a href="...">` in `.site-nav`, verify the target file exists:
  - `index.html` → file exists ✓
  - `metrics-dashboard.html` → file exists ✓
  - `shared-problems-infographic.html` → file exists ✓
  - External link (GitHub URL) → skip file check ✓

---

## 3. Rename Cleanup

If renaming a page, verify zero references to the old filename remain.

**Commands:**
```bash
# After renaming, search for old filename everywhere
grep -R "old-filename.html" . --include="*.html" --include="*.md"

# If renaming in git, also check git history
git log --all --source --oneline -- old-filename.html | head -5
```

**Expected result:** Zero matches for the old filename (except in commit history).

**When to run:** Only if you renamed a file. New files don't need this check.

---

## 4. Canonical Sync

Verify that `snippets/site-nav-snippet.html` matches the live nav structure on all pages.

**Command:**
```bash
# Extract nav from canonical snippet
grep -A 10 "NAV BLOCK:" snippets/site-nav-snippet.html | grep 'class="nav-' | wc -l

# Extract nav from a sample page (e.g., index.html) and count
grep -c 'class="nav-' index.html
```

**Expected result:** Both counts should match (same number of nav links).

**Manual verification:**
- Open `snippets/site-nav-snippet.html` and find the "NAV BLOCK" section
- Count the `<a>` and `<button>` tags with `class="nav-*"`
- Open `index.html` and count nav links in `.site-nav` block
- Numbers should match
- Link order should be identical
- Active class comments should match current pages

---

## 5. No Broken Internal Hrefs

Verify no broken internal links exist in the entire site.

**Commands:**
```bash
# Find all internal hrefs (not http/https)
grep -rh 'href="[^"]*"' *.html | grep -v 'http' | grep -oP 'href="\K[^"]+'  | sort -u

# Check each exists
for href in $(grep -rh 'href="[^"]*"' *.html | grep -v 'http' | grep -oP 'href="\K[^"]+' | sort -u); do
  if [ ! -f "$href" ]; then
    echo "BROKEN: $href"
  fi
done
```

**Expected result:** No output (all files exist).

---

## 6. Active Class Consistency

Verify that:
1. Only ONE page has its own nav link marked with `active` class
2. The `active` class is on the CURRENT page's own link, not duplicated elsewhere

**Command:**
```bash
# Find all active nav links
for f in *.html; do
  active=$(grep -o 'class="nav-[^ ]*.*active' "$f" | head -1)
  if [ -n "$active" ]; then
    echo "$f: $active"
  fi
done
```

**Expected result:**
- `index.html`: `class="nav-home active"`
- `metrics-dashboard.html`: `class="nav-metrics active"`
- `shared-problems-infographic.html`: `class="nav-shared-problems active"`
- All other pages: `class="nav-home active"` (since Home is their nav destination)
- No duplicates within a single page

**Manual verification:**
- For each `.html` file:
  - Find the `.site-nav` block
  - Verify exactly ONE link has `active` class
  - Verify it's the current page's own link (or nav-home for pages without a dedicated nav item)

---

## When to Run These Checks

- **After adding a new page:** Run all 6 checks
- **After updating nav on multiple pages:** Run checks 1, 4, 5, 6
- **After renaming a page:** Run checks 2, 3, 5, 6
- **Before every commit/push:** Spot-check at least 2–3 high-risk files

## Pass/Fail Criteria

✅ **Pass:** All 6 checks complete with expected results (no broken hrefs, all files exist, no orphaned references)

❌ **Fail:** Any check finds broken hrefs, missing files, inconsistent nav structure, or duplicated active classes

If any check fails, fix the issue and re-run before pushing.
