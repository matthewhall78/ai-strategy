# AI Strategy Pages

This repository contains standalone HTML pages focused on AI strategy, context engineering, and agentic delivery concepts.

## Pages

- `agentic-maturity-ladder.html`
- `context-engineering-primitives.html`
- `human-intent-agent-execution.html`
- `first-30-minutes-quickstart.html`
- `context-primitives-decision-guide.html`
- `skills-md-example.html`
- `copilot-instructions-md-guide.html`
- `agents-md-example.html`
- `apm-overview.html`
- `github-copilot-coding-agent.html`
- `general-ghcp-resources-links.html`

## Reusable Navigation Snippet

Use `snippets/site-nav-snippet.html` as a copy-ready pattern for new pages.

Quick workflow:

1. Copy the full contents of `snippets/site-nav-snippet.html`.
2. Paste the `STYLE BLOCK` section into the `<head>` of your new page.
3. Paste the `NAV BLOCK` section as the first element inside `<body>`.
4. Add the `active` class to the link for the current page.
5. Update or extend links in one place for new pages.

## Usage

Open any file directly in a browser, or serve the folder with a simple static server.

### Optional local server

If you have Python installed:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## License

Add your preferred license information here.
