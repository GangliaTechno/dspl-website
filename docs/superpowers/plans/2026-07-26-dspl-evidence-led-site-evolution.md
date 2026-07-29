# DSPL Evidence-Led Site Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the DSPL website into an evidence-first, maintainable, accessible, statically prerendered marketing site without replacing its React/Vite stack or inventing business proof.

**Architecture:** Preserve the existing route shell and lazy page chunks, but introduce small shared owners for the enquiry action, homepage evidence sections, form rules, and route metadata. Consolidate styling into CSS owners, use React 19 static rendering with `vite-prerender-plugin`, and keep Web3Forms and GA4 behind their existing abstractions.

**Tech Stack:** React 19.2, React Router 7, Vite 8, Vitest 4, Testing Library, Framer Motion, React GA4, Web3Forms, CSS custom properties, `vite-prerender-plugin` 0.5.13.

## Global Constraints

- Work only in `E:\For website\dspl website` on `pawan/raw-radicles-redesign`.
- Do not modify or recreate the removed `pawan/dev` or `pawan-main-2` worktrees.
- Preserve React, Vite, React Router, GA4, and Web3Forms.
- Do not invent client names, testimonials, metrics, affiliations, awards, or market outcomes.
- Do not delete assets or experimental components; report exact candidates for later approval.
- Keep the warm cream, black, and gold identity defined by `DESIGN.md`.
- Target WCAG 2.2 AA for affected surfaces.
- Use test-first development for every behavior change.
- Do not deploy or change DNS in this plan.

## File Map

**Create**

- `src/utils/workModal.js` — the public enquiry-modal open interface.
- `src/utils/__tests__/workModal.test.js` — contract test for the modal event.
- `src/components/home/SupporterStrip.jsx` — non-repeating institutional proof strip.
- `src/components/home/ProcessSteps.jsx` — semantic six-step execution framework.
- `src/components/home/OwnedBrandProof.jsx` — Raw Radicles operating-proof section.
- `src/components/home/homeSections.css` — styles owned by the three homepage evidence components.
- `src/components/work-with-us/formModel.js` — initial state, validation, classification, and payload creation.
- `src/components/work-with-us/__tests__/formModel.test.js` — pure form-model tests.
- `src/seo/routeMetadata.js` — canonical route metadata and structured-data facts.
- `src/seo/__tests__/routeMetadata.test.js` — route metadata tests.
- `src/AppRoutes.jsx` — router-independent application shell used by browser and prerender.
- `src/entry-prerender.jsx` — React 19 static prerender entry.
- `src/components/Header.css`
- `src/components/Footer.css`
- `src/components/ServicePage.css`
- `src/components/FAQAccordion.css`
- `src/components/WorkWithUsModal.css`
- `src/pages/About.css`
- `src/pages/Brands.css`
- `src/pages/Contact.css`
- `src/pages/NotFound.css`
- `src/pages/PrivacyPolicy.css`
- `.env.example`
- `docs/ASSET_CLEANUP_CANDIDATES.md`

**Modify**

- `src/main.jsx` — hydrate prerendered markup and retain client-only fallback.
- `src/App.jsx` — supply `BrowserRouter` around `AppRoutes`.
- `src/pages/Home.jsx` — evidence-led section composition and verified copy.
- `src/pages/Home.css` — hero, service, and page composition only.
- `src/components/Header.jsx`, `Footer.jsx`, `ServicePage.jsx`, `FAQAccordion.jsx`, `WorkWithUsModal.jsx` — use named interfaces and imported CSS.
- `src/pages/About.jsx`, `Brands.jsx`, `Contact.jsx`, `NotFound.jsx`, `PrivacyPolicy.jsx` — import co-located CSS instead of inline blocks.
- `src/hooks/useSEO.js` — consume route metadata and maintain one JSON-LD script.
- `src/pages/Marketing.jsx`, `Branding.jsx`, `Ecommerce.jsx` — consume canonical metadata records.
- `src/index.css` — governing tokens, shared primitives, focus, motion, and responsive rules.
- `vite.config.js` — add static prerendering.
- `package.json`, `package-lock.json` — add the compatible prerender plugin and an HTML verification script.
- `README.md` — project guide.
- `ROADMAP.md` — historical/current-state reconciliation.
- `.github/workflows/ci.yml` — verify prerendered route HTML.

---

### Task 1: Establish the Enquiry Modal Interface

**Files:**
- Create: `src/utils/workModal.js`
- Create: `src/utils/__tests__/workModal.test.js`
- Modify: `src/components/WorkWithUsModal.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Brands.jsx`
- Test: `src/components/__tests__/WorkWithUsModal.test.jsx`

**Interfaces:**
- Produces: `WORK_MODAL_EVENT: "dspl:open-work-modal"` and `openWorkModal(source?: string): void`.
- Consumes: browser `window.dispatchEvent` and `CustomEvent`.

- [ ] **Step 1: Write the failing public-interface test**

```js
import { describe, expect, it, vi } from 'vitest';
import { openWorkModal, WORK_MODAL_EVENT } from '../workModal';

describe('openWorkModal', () => {
  it('dispatches one named event with its source', () => {
    const listener = vi.fn();
    window.addEventListener(WORK_MODAL_EVENT, listener);

    openWorkModal('homepage-hero');

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({ source: 'homepage-hero' });
    window.removeEventListener(WORK_MODAL_EVENT, listener);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run src/utils/__tests__/workModal.test.js`

Expected: FAIL because `src/utils/workModal.js` does not exist.

- [ ] **Step 3: Add the minimal modal interface**

```js
export const WORK_MODAL_EVENT = 'dspl:open-work-modal';

export function openWorkModal(source = 'unspecified') {
  window.dispatchEvent(
    new CustomEvent(WORK_MODAL_EVENT, { detail: { source } }),
  );
}
```

Update `WorkWithUsModal.jsx` to listen for `WORK_MODAL_EVENT`. Replace every direct `new CustomEvent('open-work-modal')` call with `openWorkModal()` and a stable source string such as `header`, `footer`, `homepage-hero`, `homepage-owned-brand`, or `brands-page`.

- [ ] **Step 4: Update the modal integration test and verify GREEN**

```jsx
import { openWorkModal } from '../../utils/workModal';

openWorkModal('test');
expect(screen.getByRole('dialog')).toBeInTheDocument();
```

Run: `npx vitest run src/utils/__tests__/workModal.test.js src/components/__tests__/WorkWithUsModal.test.jsx`

Expected: both files PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/utils/workModal.js src/utils/__tests__/workModal.test.js src/components/WorkWithUsModal.jsx src/components/Header.jsx src/components/Footer.jsx src/pages/Home.jsx src/pages/Brands.jsx src/components/__tests__/WorkWithUsModal.test.jsx
git commit -m "refactor: centralize enquiry modal actions"
```

### Task 2: Extract and Test the Lead Form Model

**Files:**
- Create: `src/components/work-with-us/formModel.js`
- Create: `src/components/work-with-us/__tests__/formModel.test.js`
- Modify: `src/components/WorkWithUsModal.jsx`
- Test: `src/components/__tests__/WorkWithUsModal.test.jsx`

**Interfaces:**
- Produces: `createInitialLeadForm()`, `validateLead(data)`, `classifyLead(data)`, and `createLeadPayload(data, accessKey, file?)`.
- Consumes: the existing Web3Forms field names and five-megabyte attachment limit.

- [ ] **Step 1: Write failing validation and classification tests**

```js
import { describe, expect, it } from 'vitest';
import {
  classifyLead,
  createInitialLeadForm,
  createLeadPayload,
  validateLead,
} from '../formModel';

describe('lead form model', () => {
  it('reports every required field without mutating the form', () => {
    const form = createInitialLeadForm();
    const original = structuredClone(form);
    expect(validateLead(form)).toEqual({
      fullName: 'Full Name is required',
      email: 'Email address is required',
      phone: 'Phone / WhatsApp number is required',
      services: 'Please select at least one service',
    });
    expect(form).toEqual(original);
  });

  it('classifies an established business without inventing outcome claims', () => {
    const form = {
      ...createInitialLeadForm(),
      companyName: 'Example Foods',
      website: 'https://example.test',
      services: ['Branding'],
    };
    expect(classifyLead(form)).toEqual({
      tags: ['Branding'],
      priority: 'VIP',
      priorityReason: 'Established business or urgent timeline',
    });
  });

  it('creates the existing Web3Forms field contract', () => {
    const form = {
      ...createInitialLeadForm(),
      fullName: 'Asha Rao',
      email: 'asha@example.test',
      phone: '9876543210',
      services: ['Branding', 'E-commerce'],
    };
    const payload = createLeadPayload(form, 'public-form-key');
    expect(payload.get('access_key')).toBe('public-form-key');
    expect(payload.get('services')).toBe('Branding, E-commerce');
    expect(payload.get('priority')).toBe('NORMAL');
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run src/components/work-with-us/__tests__/formModel.test.js`

Expected: FAIL because `formModel.js` does not exist.

- [ ] **Step 3: Move the existing pure rules into `formModel.js`**

Implement the exact current field defaults, validation messages, priority rule, subject line, optional attachment, and payload fields. Return new objects and a new `FormData`; do not access React state or the DOM from this file.

```js
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

export function validateAttachment(file) {
  return file && file.size > MAX_ATTACHMENT_BYTES
    ? 'File size exceeds 5MB limit'
    : '';
}
```

- [ ] **Step 4: Refactor the modal to consume the model**

Replace duplicated reset state with `createInitialLeadForm()`. Replace the component-local `validate` and `categorizeLead` functions with the exported pure functions. Keep focus management, scroll behavior, fetch, and status state inside the component.

- [ ] **Step 5: Add the missing-configuration retry test**

```jsx
it('keeps the form open and reports missing Web3Forms configuration', async () => {
  render(<WorkWithUsModal />);
  openWorkModal('test');
  // Fill full name, email, phone, and one service using visible controls.
  // Submit and assert the existing configuration message remains in the dialog.
  expect(
    await screen.findByText(/Web3Forms access key is missing/i),
  ).toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

Use the exact labels from the rendered form when implementing this test; do not target class names.

- [ ] **Step 6: Verify GREEN and commit**

Run: `npx vitest run src/components/work-with-us/__tests__/formModel.test.js src/components/__tests__/WorkWithUsModal.test.jsx`

Expected: all form-model and modal tests PASS.

```powershell
git add src/components/work-with-us src/components/WorkWithUsModal.jsx src/components/__tests__/WorkWithUsModal.test.jsx
git commit -m "refactor: isolate lead form rules"
```

### Task 3: Build the Evidence-First Homepage

**Files:**
- Create: `src/components/home/SupporterStrip.jsx`
- Create: `src/components/home/ProcessSteps.jsx`
- Create: `src/components/home/OwnedBrandProof.jsx`
- Create: `src/components/home/homeSections.css`
- Create: `src/pages/__tests__/Home.test.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.css`

**Interfaces:**
- `SupporterStrip({ supporters })` consumes `{ src, alt }[]`.
- `ProcessSteps({ steps })` consumes `{ number, title, description }[]`.
- `OwnedBrandProof({ logoSrc, onEnquire })` consumes a verified logo URL and action callback.

- [ ] **Step 1: Write the failing homepage evidence test**

```jsx
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../Home';

it('presents institutional, process, and owned-brand proof without duplicate logos', () => {
  render(<BrowserRouter><Home /></BrowserRouter>);

  expect(screen.getByRole('heading', {
    level: 1,
    name: /we build brands.*we help businesses grow/i,
  })).toBeInTheDocument();

  const supporterRegion = screen.getByRole('region', { name: 'Supported by' });
  expect(within(supporterRegion).getAllByRole('img')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'How We Work With You' })).toBeInTheDocument();
  expect(screen.getByText('06')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
  expect(screen.getByText(/owned-brand proof/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run src/pages/__tests__/Home.test.jsx`

Expected: FAIL because the supporter region renders twelve repeated images and there is no “Owned-brand proof” label.

- [ ] **Step 3: Implement the three bounded homepage components**

Use one semantic `<section>` or labelled region per component. Render each supporter once in a static responsive grid. Render process items as an ordered list. Use the exact verified Raw Radicles copy:

```jsx
<p>
  DSPL applies brand strategy, packaging, market presentation, and
  e-commerce thinking to a consumer brand it operates itself.
</p>
```

Keep the hero heading. Replace its supporting paragraph with:

```text
For Indian consumer businesses, Dashapatmaja Solutions Pvt Ltd brings brand strategy,
go-to-market execution, and e-commerce under one accountable team.
```

- [ ] **Step 4: Refactor `Home.jsx` into the approved reading order**

The final order must be hero, supporter proof, coordinated services, process, owned-brand proof, and final enquiry callout. Remove the animated triplication of supporter logos. Keep existing source images and verified service descriptions.

- [ ] **Step 5: Verify GREEN and responsive CSS**

Run: `npx vitest run src/pages/__tests__/Home.test.jsx`

Expected: PASS.

Run: `npm run build`

Expected: production build exits 0 with `Home` remaining a lazy route chunk.

- [ ] **Step 6: Commit**

```powershell
git add src/components/home src/pages/Home.jsx src/pages/Home.css src/pages/__tests__/Home.test.jsx
git commit -m "feat: make homepage proof led"
```

### Task 4: Align Tokens and Consolidate Styles

**Files:**
- Modify: `src/index.css`
- Create/Modify: the CSS owners listed in the File Map.
- Modify: corresponding JSX files to import CSS and remove `<style>` blocks.

**Interfaces:**
- Produces global tokens: `--space-*`, `--radius-*`, `--shadow-surface`, `--container-width`, `--focus-ring`, and existing color aliases.
- Consumes no new runtime API.

- [ ] **Step 1: Capture the behavioral baseline**

Run: `npm test`

Expected: all tests PASS before the mechanical extraction.

Run:

```powershell
rg -n "<style|style=\\{\\{" src -g "*.jsx"
```

Record the current results in the task notes. Inline values used for genuinely dynamic image URLs may remain; static layout and visual declarations may not.

- [ ] **Step 2: Normalize governing tokens**

Add exact scale aliases without removing existing color names until every consumer is migrated:

```css
:root {
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4.5rem;
  --radius-control: 4px;
  --radius-card: 12px;
  --shadow-surface: 0 10px 30px -10px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.02);
  --container-width: 1200px;
  --focus-ring: 3px solid var(--accent);
}
```

Update `.section` to use `--space-6`, retain readable line lengths, and ensure interactive controls have a minimum `44px` block size where layout permits.

- [ ] **Step 3: Move static component and page styles**

For each owner, copy the existing CSS unchanged first, import its CSS file, run the closest test, then remove the inline block. Only after the extraction is green should token substitutions and spacing reductions be applied.

Required order:

1. `Header` and `Footer`
2. `FAQAccordion` and `ServicePage`
3. `WorkWithUsModal`
4. `NotFound` and `PrivacyPolicy`
5. `Contact`, `Brands`, and `About`

- [ ] **Step 4: Verify extraction**

Run:

```powershell
rg -n "<style|style=\\{\\{" src -g "*.jsx"
npm run lint
npm test
npm run build
```

Expected: no static `<style>` blocks, lint exits 0, all tests pass, and build exits 0.

- [ ] **Step 5: Commit**

```powershell
git add src/index.css src/components/*.css src/components/*.jsx src/pages/*.css src/pages/*.jsx
git commit -m "refactor: give site styles clear owners"
```

### Task 5: Centralize Route Metadata and Structured Data

**Files:**
- Create: `src/seo/routeMetadata.js`
- Create: `src/seo/__tests__/routeMetadata.test.js`
- Modify: `src/hooks/useSEO.js`
- Modify: every public page to consume `routeMetadata`.

**Interfaces:**
- Produces: `PUBLIC_ROUTES`, `getRouteMetadata(pathname)`, and `organizationStructuredData`.
- `useSEO(metadata)` consumes one canonical metadata object.

- [ ] **Step 1: Write the failing metadata test**

```js
import { describe, expect, it } from 'vitest';
import {
  getRouteMetadata,
  organizationStructuredData,
  PUBLIC_ROUTES,
} from '../routeMetadata';

it('defines unique metadata for every public route', () => {
  const records = PUBLIC_ROUTES.map(getRouteMetadata);
  expect(new Set(records.map((item) => item.title)).size).toBe(records.length);
  expect(records.every((item) => item.description.length >= 80)).toBe(true);
  expect(records.every((item) => item.canonical.startsWith('/'))).toBe(true);
});

it('contains only verified organization facts', () => {
  expect(organizationStructuredData['@type']).toBe('Organization');
  expect(organizationStructuredData.url).toBe('https://dashapatmaja.in');
  expect(organizationStructuredData.email).toContain('director@dashapatmaja.in');
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run src/seo/__tests__/routeMetadata.test.js`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Define the route records**

Include `/`, `/about`, `/brands`, `/marketing`, `/branding`, `/ecommerce`, `/contact`, and `/privacy`. Use the existing page titles and descriptions as the starting source, with the canonical legal name `Dashapatmaja Solutions Pvt Ltd`.

- [ ] **Step 4: Update `useSEO`**

The hook must set one canonical link and one JSON-LD script:

```js
const schema = document.querySelector('script[data-dspl-schema]')
  ?? document.head.appendChild(document.createElement('script'));
schema.type = 'application/ld+json';
schema.dataset.dsplSchema = 'organization';
schema.textContent = JSON.stringify(structuredData);
```

Do not create duplicate tags during route navigation or React Strict Mode.

- [ ] **Step 5: Verify GREEN and commit**

Run: `npx vitest run src/seo/__tests__/routeMetadata.test.js`

Run: `npm test`

Expected: all tests PASS.

```powershell
git add src/seo src/hooks/useSEO.js src/pages
git commit -m "feat: centralize route metadata"
```

### Task 6: Prerender Every Public Route

**Files:**
- Create: `src/AppRoutes.jsx`
- Create: `src/entry-prerender.jsx`
- Create: `scripts/verify-prerender.mjs`
- Modify: `src/App.jsx`
- Modify: `src/main.jsx`
- Modify: `vite.config.js`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- `AppRoutes` renders the route shell inside an injected router.
- `prerender(data)` returns `{ html, links, head }` for `vite-prerender-plugin`.
- `npm run verify:html` checks the built route files.

- [ ] **Step 1: Install the Vite 8-compatible plugin**

Run: `npm install --save-dev vite-prerender-plugin@0.5.13`

Expected: `package.json` and lockfile record version `0.5.13`; npm reports no installation failure.

- [ ] **Step 2: Write the failing HTML verifier**

Create `scripts/verify-prerender.mjs` to inspect:

```js
const routes = ['', 'about', 'brands', 'marketing', 'branding', 'ecommerce', 'contact', 'privacy'];
```

For each route, read `dist/<route>/index.html` (`dist/index.html` for the root) and fail unless it contains:

- a non-empty `<main`;
- the route's expected `<h1` text;
- a canonical link;
- a unique title;
- `application/ld+json`.

Add `"verify:html": "node scripts/verify-prerender.mjs"` to `package.json`.

Run: `npm run build && npm run verify:html`

Expected: FAIL because only the SPA `dist/index.html` exists.

- [ ] **Step 3: Split router-independent application composition**

Move the shell and `<Routes>` from `App.jsx` into `AppRoutes.jsx`. Keep lazy route imports there. `App.jsx` becomes:

```jsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
```

- [ ] **Step 4: Add React 19 static rendering**

In `entry-prerender.jsx`, wrap `AppRoutes` in `StaticRouter`, call `prerenderToNodeStream` from `react-dom/static`, collect the Node stream into a string, and return the HTML plus `PUBLIC_ROUTES` and head elements built from `getRouteMetadata(data.url.pathname)`.

Use `onError` to throw build failures instead of silently emitting fallback-only pages.

- [ ] **Step 5: Hydrate existing markup**

Update `main.jsx`:

```jsx
const container = document.getElementById('root');
const app = <StrictMode><App /></StrictMode>;

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
```

- [ ] **Step 6: Configure Vite and verify GREEN**

Configure:

```js
vitePrerenderPlugin({
  renderTarget: '#root',
  prerenderScript: path.resolve(__dirname, 'src/entry-prerender.jsx'),
  additionalPrerenderRoutes: ['/privacy'],
  previewMiddlewareFallback: '/404',
})
```

Run:

```powershell
npm run build
npm run verify:html
npm test
```

Expected: all eight public route HTML files pass verification and all tests pass.

- [ ] **Step 7: Add `npm run verify:html` after build in CI and commit**

```powershell
git add src/App.jsx src/AppRoutes.jsx src/main.jsx src/entry-prerender.jsx scripts/verify-prerender.mjs vite.config.js package.json package-lock.json .github/workflows/ci.yml
git commit -m "feat: prerender public routes"
```

### Task 7: Measure Production Assets and Produce the Cleanup Report

**Files:**
- Modify: referenced image imports and JSX only when measurement proves a production benefit.
- Create: `docs/ASSET_CLEANUP_CANDIDATES.md`

**Interfaces:**
- Produces a report with path, bytes, references, Git status, and recommendation.
- Deletes nothing.

- [ ] **Step 1: Capture the production baseline**

Run: `npm run build`

Record initial JS/CSS gzip sizes and the largest emitted image assets in the report.

- [ ] **Step 2: Inventory references deterministically**

Use `rg` to match every filename under `src/assets` against tracked source and public files. Classify only:

- emitted and referenced;
- source-referenced but not emitted on the tested route;
- unreferenced candidate;
- alternate-format candidate;
- experimental-component dependency.

Do not classify a same-looking filename as a duplicate without hashing and visual evidence.

- [ ] **Step 3: Optimize only proven production images**

For the homepage LCP source, retain WebP, responsive candidates, explicit width/height, `fetchPriority="high"`, and `decoding="async"`. Do not modify source photography merely to reduce repository size.

- [ ] **Step 4: Rebuild and compare**

Run: `npm run build`

Expected: build exits 0. Record before/after emitted sizes without claiming field Core Web Vitals from a local build.

- [ ] **Step 5: Commit**

```powershell
git add docs/ASSET_CLEANUP_CANDIDATES.md src
git commit -m "perf: document and reduce production asset weight"
```

### Task 8: Replace Repository Documentation

**Files:**
- Create: `.env.example`
- Modify: `README.md`
- Modify: `ROADMAP.md`

**Interfaces:**
- Documents `VITE_WEB3FORMS_ACCESS_KEY` and `VITE_GA_MEASUREMENT_ID`.
- Documents the current worktree and branch without describing removed checkouts as active.

- [ ] **Step 1: Write `.env.example` without credentials**

```dotenv
VITE_WEB3FORMS_ACCESS_KEY=
VITE_GA_MEASUREMENT_ID=
```

- [ ] **Step 2: Replace the Vite template README**

The README must contain:

- DSPL product purpose;
- route table;
- `npm ci`, `npm run dev`, `npm test`, `npm run lint`, `npm run build`, `npm run verify:html`;
- environment-variable safety note;
- architecture and form-flow summary;
- design ownership (`PRODUCT.md`, `DESIGN.md`);
- deployment assumptions and `_redirects`;
- worktree guidance for the current checkout.

- [ ] **Step 3: Reconcile the roadmap**

Keep the seven completed historical phases, mark their former branches as historical, set the current branch to `pawan/raw-radicles-redesign`, link the approved specification and this plan, and add the evidence-led evolution as the current phase.

- [ ] **Step 4: Verify documentation commands and commit**

Run every documented npm command except `npm run dev`; verify that each exists and exits as described.

```powershell
git add .env.example README.md ROADMAP.md
git commit -m "docs: make repository handoff ready"
```

### Task 9: Full Accessibility and Browser Verification

**Files:**
- Modify only files implicated by a reproduced issue.
- Add a regression test before each behavioral fix.

**Interfaces:**
- Consumes the final site at desktop and mobile widths.
- Produces verified behavior, not screenshots alone.

- [ ] **Step 1: Run all automated gates**

```powershell
npm run lint
npm test
npm run build
npm run verify:html
git diff --check
```

Expected: every command exits 0, Vitest reports zero failed tests, and `git diff --check` prints nothing.

- [ ] **Step 2: Review all routes at 1280×720 and 390×844**

Check `/`, `/about`, `/brands`, `/marketing`, `/branding`, `/ecommerce`, `/contact`, `/privacy`, and a missing path. Verify no horizontal overflow, obscured focus, clipped headings, or unreadable overlays.

- [ ] **Step 3: Complete keyboard journeys**

Verify:

1. Header navigation and mobile drawer.
2. Work With Us open, focus entry, tab wrap, Escape close, and focus restoration.
3. Contact and modal validation.
4. Footer links and back-to-top behavior.

If a defect appears, write a failing Vitest regression where feasible, reproduce RED, fix minimally, and rerun GREEN.

- [ ] **Step 4: Inspect production HTML**

Open the built route HTML without JavaScript and confirm meaningful headings, body copy, canonical metadata, and organization JSON-LD remain present.

- [ ] **Step 5: Record deployment drift**

In `ROADMAP.md`, note that deployment is a separate action and list any verified difference between `dashapatmaja.in` and the current branch. Do not deploy.

- [ ] **Step 6: Final commit**

```powershell
git add .
git commit -m "test: verify evidence-led site evolution"
```

Skip this commit if verification produced no file changes.

## Completion Gate

Before claiming completion:

1. Re-read `docs/superpowers/specs/2026-07-26-evidence-led-site-evolution-design.md`.
2. Map every specification section to Tasks 1–9.
3. Confirm no assets, branches, or worktrees were deleted during implementation.
4. Confirm all automated gates were run fresh.
5. Report any unverified business claim, unavailable field metric, deployment difference, or stale Orca runtime record explicitly.
