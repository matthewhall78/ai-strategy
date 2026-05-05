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

## Purpose

Create a new page for the site and ensure navigation is fully consistent across every file. This workflow must be completed atomically — partial nav updates leave the site in a broken state.

## Steps

1. **Choose the filename.** Convert the page title to kebab-case (e.g. "API Review Guide" → `api-review-guide.html`). No underscores, spaces, or camelCase.

2. **Create the HTML file.** Use an existing page (e.g. `first-30-minutes-quickstart.html`) as the structural template. Copy the full page skeleton including: `<head>` with Inter font and embedded CSS, animated perspective grid background, `.site-nav` block, and main content wrapper.

3. **Set the active nav link.** On the new page, add the `active` class to its own nav link (e.g. `class="nav-mypage active"`). Add the corresponding CSS nav variable block if needed.

4. **Add a card to index.html.** Place a `<a class="card …" href="…">` block in the appropriate section grid. Set `--accent` and `--glow` CSS custom properties to give the card a distinct colour.

5. **Update the nav on every other existing page.** Open each `.html` file and add the new `<a class="nav-mypage" href="mypage.html">Nav Label</a>` link inside the `.site-nav` block. The order must match the order in `snippets/site-nav-snippet.html`.

6. **Update snippets/site-nav-snippet.html.** Add the new link to the canonical nav block and add a comment entry to the active link examples list.

7. **Update README.md.** Add the new page to the page listing table.

## Output Format

- New file: `{kebab-name}.html` — self-contained, passes href validation, `active` class on own nav link
- `index.html` — card present in the correct section
- All other `.html` files — nav updated with new link, no other changes
- `snippets/site-nav-snippet.html` — canonical nav updated
- `README.md` — page listing updated
- Validation: every `href` in every `.site-nav` block resolves to a real file in the repo
