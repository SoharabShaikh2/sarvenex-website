# SARVENEX — Final Website

Lightweight static website with light/dark mode, subtle parallax, responsive layout, contact form and JSON-driven portfolio.

## Portfolio
Edit `assets/data/projects.json`. Each project can contain:
- `title`
- `category`
- `description`
- `technologies`
- `image` (local path or URL)
- `url`
- `featured`

The sample project images are local SVG illustrations in `assets/img/projects/`. Replace them with your own screenshots/cover images when the real projects are ready.

## Run locally
Because the portfolio is loaded with `fetch()`, run the folder through a local HTTP server (VS Code Live Server, `python -m http.server`, etc.) instead of opening `index.html` directly with `file://`.

## WhatsApp
Update the WhatsApp number in `assets/js/main.js`.


## Portfolio JSON
The site reads `assets/data/projects.json` dynamically when hosted over HTTP/HTTPS. If you open `index.html` directly with `file://`, browsers block local JSON fetches for security; the site therefore uses an embedded fallback copy so the sample portfolio still appears. For live editing of `projects.json`, use VS Code Live Server or any static HTTP server.
