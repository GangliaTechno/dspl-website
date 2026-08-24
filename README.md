# Dashapatmaja Solutions Pvt Ltd website

[![CI](https://github.com/GangliaTechno/dspl-website/actions/workflows/ci.yml/badge.svg)](https://github.com/GangliaTechno/dspl-website/actions/workflows/ci.yml)

This repository contains the public website for Dashapatmaja Solutions Pvt Ltd
(DSPL), an Indian brand-building company providing branding, marketing,
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
| `/brands/raw-radicles` | Raw Radicles owned-brand detail and operating experience |
| `/marketing` | Marketing, SEO, paid media, analytics, and content services |
| `/branding` | Brand strategy, identity, story, and design systems |
| `/ecommerce` | Store, conversion, marketplace, payment, and delivery services |
| `/contact` | Contact details and direct enquiry form |
| `/start` | Detailed project brief and start-a-project flow |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |
| `/blogs` | Insights index for published articles |
| `/blogs/:slug` | One published Insights article route per manifest entry |
| all other paths | Accessible 404 page |

The production build prerenders 11 static routes, the Insights index, and one
article route per published manifest entry. With the currently verified
two-article dataset, that produces 14 public route documents; the total changes
with the published manifest. The client then hydrates that markup and continues
as a React application.

## Technology

- React 19
- React Router
- Vite with route prerendering
- Vitest and React Testing Library
- ESLint
- Framer Motion
- Web3Forms, Umami Analytics, and Google Analytics 4 integrations

## Requirements

- Node.js `>=22.22.0`
- npm

## Local development

```powershell
git clone https://github.com/GangliaTechno/dspl-website.git
Set-Location dspl-website
npm.cmd ci
Copy-Item .env.example .env
npm.cmd run dev
```

Vite serves the development site on the configured local port, currently
`5174`.

## Environment variables

| Variable | Used for |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms browser submissions from the contact and Work With Us forms |
| `VITE_UMAMI_SCRIPT_URL` | Umami tracker script URL (e.g. `https://cloud.umami.is/script.js` or self-hosted tracker) |
| `VITE_UMAMI_WEBSITE_ID` | Umami website ID UUID |
| `VITE_UMAMI_DOMAINS` | Comma-separated allowed production domains for tracking (e.g. `dashapatmaja.in,www.dashapatmaja.in`) |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) |
| `SANITY_STUDIO_PROJECT_ID` | Browser-visible Sanity project identifier used by local Studio; never a secret |
| `SANITY_STUDIO_DATASET` | Dataset used by local Studio (`production`) |
| `SANITY_PROJECT_ID` | Server/build-time Sanity project identifier used by content sync |
| `SANITY_DATASET` | Build-time content dataset (`production`) |
| `SANITY_API_VERSION` | Pinned Sanity API date (`2026-08-20`) |

`SANITY_STUDIO_*` values are bundled into Studio and must never contain secrets;
the public dataset needs no read token; Sanity login sessions and any optional
token stay outside Git.

Copy `.env.example` to `.env` for the Vite values; the `VITE_*` values may remain
in this ignored `.env`. Copy the five Sanity values from `.env.example` into
ignored `.env.local`, and populate all five there before running
`npm.cmd run content:sync:strict`, `npm.cmd run build`, or the complete local
quality gate below. Never commit `.env` or `.env.local`, or place private server
credentials in a `VITE_*` variable: Vite variables are compiled into
browser-visible JavaScript.

Credential note: `.env` was historically tracked in this repository. Removing
it from current tracking does not erase Git history. Treat the historical
Web3Forms key as exposed and rotate it in Web3Forms before production use.

## Commands

| Command | Purpose |
|---|---|
| `npm.cmd ci` | Install the exact locked dependency graph |
| `npm.cmd run dev` | Start the Vite development server using bundled fallback content |
| `npm.cmd run dev:cms` | Start the Vite development server after syncing published Sanity content; warn and use bundled seed content if Sanity is unavailable |
| `npm.cmd run studio` | Start the local Sanity Studio at `http://localhost:3333` |
| `npm.cmd run sanity:bootstrap` | Default authenticated missing-only dry-run for the two approved articles; submits zero transactions when both fixed IDs already exist |
| `npm.cmd run sanity:bootstrap -- --apply` | Explicit authenticated live form; creates only missing approved documents |
| `npm.cmd run content:sync` | Sync published Sanity content into deterministic generated snapshots, with local fallback when unavailable |
| `npm.cmd run content:sync:strict` | Strictly sync published Sanity content and fail if Sanity is missing or inaccessible |
| `npm.cmd run build` | Strictly sync published Sanity content, then build and prerender all public routes into `dist` |
| `npm.cmd run build:fallback` | Run the explicit offline build from bundled seed content |
| `npm.cmd test` | Run the Vitest suite once |
| `npm.cmd run lint` | Run ESLint across the repository |
| `npm.cmd run verify:html` | Validate headings, unique titles, canonicals, and JSON-LD in built route HTML |
| `npm.cmd run preview` | Preview the production build locally |

Run the complete local quality gate before review:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run verify:html
```

`verify:html` expects a fresh `dist`, so run it after `npm.cmd run build`. GitHub
Actions runs the same gate for pushes to `main` and `pawan/**`, and for pull
requests targeting `main`.

## Sanity Insights authoring

The repository root is the Sanity Studio workspace. Copy the five Sanity values
from `.env.example` into ignored `.env.local`, then authenticate and start Studio:

```powershell
npm.cmd exec -- sanity login
npm.cmd run studio
```

Studio runs at `http://localhost:3333` and edits the public `production` dataset.
The website never writes to Sanity and never receives an editor credential.

The initial two-article bootstrap uses an authenticated direct-document preflight
and is intentionally missing-only:

```powershell
npm.cmd run sanity:bootstrap
```

The default command is a dry-run. To apply it, use the explicit npm argument
forwarding form:

```powershell
npm.cmd run sanity:bootstrap -- --apply
```

The runner checks the two fixed document IDs through the direct `getDocuments`
API preflight, defaults to a dry-run, and accepts the explicit `-- --apply` form
for live execution. It creates only missing records in at most one
`createIfNotExists` transaction and submits zero transactions when both records
already exist. It never replaces editor changes, streams seed NDJSON, or uses
the retired bulk importer.

Public pages continue to use deterministic generated snapshots whose provenance
is `sourceUpdatedAt`, not a wall-clock `syncedAt`. `npm.cmd run build` performs a
strict published-perspective sync before the static site build and fails if
Sanity is missing or inaccessible. `npm.cmd run build:fallback` is the explicit
offline build. Local `npm.cmd run dev:cms` may warn and use bundled seed content
if Sanity is unavailable.

Hosted Studio deployment, webhooks, image migration, and live preview are not part
of this setup. See the official Sanity documentation for
[CLI initialization](https://www.sanity.io/docs/cli-reference/init),
[CORS](https://www.sanity.io/docs/cli-reference/cors-in-cli),
[dataset import](https://www.sanity.io/docs/cli-reference/cli-datasets), and
[document validation](https://www.sanity.io/docs/cli-reference/documents).

## Architecture

- `src/App.jsx` owns the browser router.
- `src/AppRoutes.jsx` owns the shared shell and route table. Client routes are
  lazy; the prerender entry injects eagerly resolved pages.
- `src/entry-prerender.jsx` renders the 11 static routes, the Insights index,
  and one article route per published manifest entry, then supplies their head
  elements to `vite-prerender-plugin`.
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
- `.github/REPOSITORY_SETTINGS.md` records the organization-admin settings
  required to finish the GitHub setup.

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
