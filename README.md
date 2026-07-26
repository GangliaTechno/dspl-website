# Dasha Patmaja Services website

This repository contains the public website for Dasha Patmaja Services Pvt.
Ltd. (DSPL). It presents DSPL's branding, marketing, and e-commerce services,
institutional support, working process, and owned-brand operating evidence
through Raw Radicles.

The current product direction is evidence-led: make verified proof easy to
find, keep the warm cream/black/gold identity, and avoid unsupported outcome
claims.

## Public routes

| Route | Purpose |
|---|---|
| `/` | Evidence-led overview, coordinated services, process, and owned-brand proof |
| `/about` | Company story, milestones, and team |
| `/brands` | Raw Radicles and the owned-brand pipeline |
| `/marketing` | Marketing, SEO, paid media, analytics, and content services |
| `/branding` | Brand strategy, identity, story, and design systems |
| `/ecommerce` | Store, conversion, marketplace, payment, and delivery services |
| `/contact` | Contact details and direct enquiry form |
| `/privacy` | Privacy policy and terms |
| all other paths | Accessible 404 page |

The eight public routes are prerendered into route-specific HTML at build time.
The client then hydrates that markup and continues as a React application.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Local setup

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

Vite serves the development site on the configured local port (currently
`5174`).

## Environment variables

| Variable | Used for |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms browser submissions from the contact and Work With Us forms |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |

Copy `.env.example` to `.env` and set local values there. Never commit `.env`
or place private server credentials in any `VITE_*` variable: Vite variables
are compiled into browser-visible JavaScript.

Credential note: `.env` was historically tracked in this repository. Removing
it from current tracking does not erase Git history. Treat the historical
Web3Forms key as exposed and rotate it in Web3Forms before production use.

## Commands

| Command | Purpose |
|---|---|
| `npm ci` | Install the exact locked dependency graph |
| `npm run dev` | Start the Vite development server |
| `npm test` | Run the Vitest suite once |
| `npm run lint` | Run ESLint across the repository |
| `npm run build` | Build and prerender all public routes into `dist` |
| `npm run verify:html` | Validate headings, unique titles, canonicals, and JSON-LD in built route HTML |
| `npm run preview` | Preview the production build locally |

Run the production gate with:

```powershell
npm run lint
npm test
npm run build
npm run verify:html
```

`verify:html` expects a fresh `dist`, so run it after `npm run build`.

## Architecture

- `src/App.jsx` owns the browser router.
- `src/AppRoutes.jsx` owns the shared shell and route table. Client routes are
  lazy; the prerender entry injects eagerly resolved pages.
- `src/entry-prerender.jsx` renders the eight public routes and supplies their
  head elements to `vite-prerender-plugin`.
- `src/seo/routeMetadata.js` is the canonical route-title, description,
  canonical-path, and Organization-schema source.
- `src/hooks/useSEO.js` updates one canonical link and one JSON-LD script
  during client navigation.
- Pages and components import their owning CSS files. Shared tokens and
  controls live in `src/index.css`.
- `scripts/verify-prerender.mjs` protects the static HTML contract.

## Enquiry flow

1. A CTA calls `openWorkModal(source)` from `src/utils/workModal.js`.
2. `WorkWithUsModal` listens for the named event and manages focus, scrolling,
   submission status, and retry behavior.
3. `src/components/work-with-us/formModel.js` owns defaults, validation,
   attachment limits, lead classification, and Web3Forms payload creation.
4. The browser submits to Web3Forms only when
   `VITE_WEB3FORMS_ACCESS_KEY` is configured. Honeypot submissions terminate
   without a network request.

The contact page has a separate shorter Web3Forms form. Both flows are
client-side; there is no server-owned secret in this repository.

## Product and design ownership

- `PRODUCT.md` defines audience, product purpose, positioning, proof, and
  conversion intent.
- `DESIGN.md` defines the warm institutional visual system and anti-patterns.
- `docs/superpowers/specs/2026-07-26-evidence-led-site-evolution-design.md`
  records the approved evidence-led evolution.
- `docs/superpowers/plans/2026-07-26-dspl-evidence-led-site-evolution.md`
  is the implementation plan.
- `docs/ASSET_CLEANUP_CANDIDATES.md` is the deletion-free asset inventory.

## Deployment assumptions

Deploy the generated `dist` directory to a static host at the domain root.
The host should serve an existing route file such as
`/about/index.html` before applying the SPA fallback.

`public/_redirects` contains:

```text
/* /index.html 200
```

That rule supports direct navigation to unknown client routes on hosts using
Netlify-style redirects. Confirm equivalent file-first fallback behavior when
using another host. Canonical metadata assumes
`https://dashapatmaja.in`.

## Current checkout and worktrees

The active checkout is:

- path: `E:\For website\dspl website`
- branch: `pawan/raw-radicles-redesign`

Confirm current state with:

```powershell
git status --short
git branch --show-current
git worktree list
```

Do not create another checkout for this same branch. If isolated work is
needed later, create a new `codex/`-prefixed branch and worktree after checking
the current worktree list.
