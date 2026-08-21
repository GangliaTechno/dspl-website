# DSPL Content-to-Visitor Delivery Architecture Diagram

## Status

Approved design. This specification covers one standalone diagram artifact; it does not change the website runtime.

## Goal

Create a concise architecture diagram that explains how the DSPL marketing website turns content and route definitions into prerendered pages, serves them from a static host, and continues as a hydrated React application in the browser.

The diagram should be useful to both a maintainer and a non-specialist stakeholder. It should expose the website's distinctive delivery path—generated blog content, route metadata, prerendering, static-host rules, and selective hydration—without becoming a complete component dependency graph.

## Source of truth

Use current code as the authority. Relevant sources are:

- `src/App.jsx` and `src/AppRoutes.jsx` for the browser router, shared shell, lazy routes, and global concerns.
- `src/entry-prerender.jsx` and `vite.config.js` for static rendering, dynamic blog paths, route output, and the 404 fallback.
- `src/hydrationRoute.js` and `src/main.jsx` for the known-route hydration contract and unknown-route client rendering.
- `src/seo/routeMetadata.js`, `src/content/publication.js`, and `src/generated/blogManifest.json` for route metadata and content snapshots.
- `scripts/sync-blog-content.mjs`, `scripts/generate-sitemap.mjs`, and `scripts/verify-prerender.mjs` for content/build/verification flow.
- `public/_redirects` and `public/_headers` for static-host routing and response security/caching policy.
- `src/utils/analytics.js` and the Web3Forms-owned form flow for external browser integrations.

The route node should reflect the current route table, including `/start`, legal pages, `/blogs`, and `/blogs/:slug`; it must not copy the README's outdated eight-route summary.

## Chosen visual approach

Use the diagram-design **architecture** type with a left-to-right primary flow and three light zones:

1. **Content and build inputs** — CMS/fallback content, deterministic generated snapshot, and build scripts.
2. **Application and delivery** — route/SEO core, prerender output, static host rules, and browser bootstrap.
3. **Runtime experience** — shared shell/pages and the visitor, with analytics/forms as external integrations.

Use no animation, no decorative dot pattern, and no floating legend. Use orthogonal rounded connectors, masked labels, and one or two focal nodes only.

## Diagram content

The diagram contains at most nine primary nodes:

1. **Content sources** — Sanity content plus the deterministic fallback path.
2. **Content sync and snapshot** — `sync-blog-content.mjs` produces `blogManifest.json` and article JSON.
3. **Route and SEO core** — `AppRoutes`, `routeMetadata`, and `publication` define pages, metadata, and published blog paths.
4. **Vite build and prerender** — `build:site`, sitemap generation, `entry-prerender`, and `vite-prerender-plugin`.
5. **Static output** — route HTML, `sitemap.xml`, assets, `404.html`, `_redirects`, and `_headers`.
6. **Browser bootstrap** — `main.jsx` and `hydrationRoute.js` choose hydration for known prerendered routes and client rendering for unknown/fallback routes.
7. **React site shell and pages** — `Header`, `Footer`, `CookieNotice`, error/loading boundaries, analytics, and lazy page routes.
8. **Visitor** — the public browser experience.
9. **Browser integrations** — Umami/GA4 and Web3Forms, shown as an external sidecar rather than separate boxes. Sanity remains part of the content-source node.

The primary solid path is:

`Content sources → Content sync and snapshot → Route and SEO core → Vite build and prerender → Static output → Browser bootstrap → React site shell and pages → Visitor`

Secondary dashed paths show:

- Static output serving the browser bootstrap.
- Browser runtime sending analytics and form submissions to external integrations.
- Published blog content feeding route expansion and prerendered article paths.

The diagram must not claim that the site is currently deployed to a specific provider. Label the serving boundary **Static host/CDN** and use the repository's generic static-host rules as evidence.

## Brand and visual system

Use the current website tokens from `src/index.css` and `DESIGN.md` in the artifact:

- Paper: `#F7F4ED`.
- Ink: `#171A22`.
- Muted: `#5E5B55`.
- Accent: `#E6A000`.
- Accent-dark/text: `#8A5B00`.
- Body and node typography: Outfit.

The installed diagram-design skill's global default skin must not be overwritten for this project. The generated HTML should remain self-contained and carry the DSPL-mapped tokens locally. Gold is reserved for the primary build/delivery focal node and one secondary focal element at most.

## Output

Create one self-contained HTML file:

`docs/diagrams/dspl-content-to-visitor-architecture.html`

The file must contain inline CSS and inline accessible SVG. External font loading is allowed only through the approved Google Fonts stylesheet; no local images or JavaScript are needed. The SVG must include a prefixed `<title>`, a useful `<desc>`, `role="img"`, and `aria-labelledby`.

Use the `doc-wide` size preset, a balanced detail level, and a mixed audience. Keep the page title and explanatory copy short enough for the diagram to stand alone when opened directly.

## Validation

Before handoff:

- Run the diagram-design `self_check.py` against the generated HTML.
- Run the geometry verifier if available and manually inspect every connector, label mask, zone boundary, title/description, and 4px-grid coordinate.
- Confirm the file is self-contained and has no forbidden source-map or unrelated repository dependencies.
- Inspect the complete worktree and confirm the pre-existing timestamp-only change in `src/generated/blogManifest.json` is not staged or altered.

## Non-goals

- Do not modify React source, route behavior, SEO metadata, deployment configuration, or the global diagram-design style guide.
- Do not add an exported PNG/SVG unless separately requested.
- Do not update the README's stale route count as part of this diagram task.
- Do not run a full production release gate solely for creating this documentation artifact.
