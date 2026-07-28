# Dasha Patmaja Services website

[![CI](https://github.com/GangliaTechno/dspl-website/actions/workflows/ci.yml/badge.svg)](https://github.com/GangliaTechno/dspl-website/actions/workflows/ci.yml)

This repository contains the public website for Dasha Patmaja Services Pvt.
Ltd. (DSPL), an Indian brand-building company providing branding, marketing,
and e-commerce services.

The site presents DSPL's institutional support, coordinated working process,
service capabilities, leadership, and owned-brand operating evidence through
Raw Radicles. Its current direction is evidence-led: make verified proof easy
to find, retain the warm cream, black, and gold identity, and avoid unsupported
outcome claims.

- Website: [dashapatmaja.in](https://dashapatmaja.in)
- Security reports: see [SECURITY.md](SECURITY.md)
- Contribution workflow: see [CONTRIBUTING.md](CONTRIBUTING.md)

## Public routes

| Route | Purpose |
|---|---|
| `/` | Evidence-led overview, coordinated services, process, and owned-brand proof |
| `/about` | Company story, milestones, and leadership |
| `/brands` | Raw Radicles and the owned-brand pipeline |
| `/marketing` | Marketing, SEO, paid media, analytics, and content services |
| `/branding` | Brand strategy, identity, story, and design systems |
| `/ecommerce` | Store, conversion, marketplace, payment, and delivery services |
| `/contact` | Contact details and direct enquiry form |
| `/privacy` | Privacy policy and terms |
| all other paths | Accessible 404 page |

The eight public routes are prerendered into route-specific HTML during the
production build. The client then hydrates that markup and continues as a React
application.

## Technology

- React 19
- React Router
- Vite with route prerendering
- Vitest and React Testing Library
- ESLint
- Framer Motion
- Web3Forms and Google Analytics 4 integrations

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Local development

```powershell
git clone https://github.com/GangliaTechno/dspl-website.git
Set-Location dspl-website
npm ci
Copy-Item .env.example .env
npm run dev
```

Vite serves the development site on the configured local port, currently
`5174`.

## Environment variables

| Variable | Used for |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms browser submissions from the contact and Work With Us forms |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |

Copy `.env.example` to `.env` and set local values there. Never commit `.env`
or place private server credentials in a `VITE_*` variable: Vite variables are
compiled into browser-visible JavaScript.

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

Run the complete local quality gate before review:

```powershell
npm run lint
npm test
npm run build
npm run verify:html
```

`verify:html` expects a fresh `dist`, so run it after `npm run build`. GitHub
Actions runs the same gate for pushes to `main` and `pawan/**`, and for pull
requests targeting `main`.

## Architecture

- `src/App.jsx` owns the browser router.
- `src/AppRoutes.jsx` owns the shared shell and route table. Client routes are
  lazy; the prerender entry injects eagerly resolved pages.
- `src/entry-prerender.jsx` renders the eight public routes and supplies their
  head elements to `vite-prerender-plugin`.
- `src/seo/routeMetadata.js` is the canonical route-title, description,
  canonical-path, and Organization-schema source.
- `src/hooks/useSEO.js` maintains a single canonical link and JSON-LD script
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
client-side; this repository does not contain a server-owned secret.

## Product and design documentation

- `PRODUCT.md` defines audience, product purpose, positioning, proof, and
  conversion intent.
- `DESIGN.md` defines the warm institutional visual system and anti-patterns.
- `ROADMAP.md` records completed phases, current release evidence, and
  deployment status.
- `docs/ASSET_CLEANUP_CANDIDATES.md` records the media inventory and cleanup
  policy.
- `docs/superpowers/specs/` contains approved design specifications.
- `docs/superpowers/plans/` contains their implementation plans.

## Branch and release workflow

`main` is the approval branch. Changes are developed on a named feature branch,
verified locally and in CI, reviewed in a pull request, and merged only after
approval. A merge does not itself authorize deployment.

Do not commit generated `dist`, local `.env`, `node_modules`, Graphify output,
or local visual-design companion state.

## Deployment

Deploy the generated `dist` directory to a static host at the domain root. The
host should serve an existing route file such as `/about/index.html` before
applying the SPA fallback.

`public/_redirects` contains:

```text
/* /index.html 200
```

This supports direct navigation to unknown client routes on hosts using
Netlify-style redirects. Confirm equivalent file-first fallback behavior when
using another host. Canonical metadata assumes `https://dashapatmaja.in`.

Deployment remains a separate, explicitly approved action.
