# DSPL Professional Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the approved refinement by removing decorative numbering, strengthening About and service framing, fitting Contact at 1280 x 720, exposing Privacy links, replacing the Raw Radicles mailto, and generating a genuine production 404.

**Architecture:** Keep the React Router/Vite shell and shared `ServicePage`. Drive route differences through data props, preserve form behavior, add robots metadata to the existing SEO pipeline, and use Vite prerendering to emit a root `404.html` while preserving all eight public route documents.

**Tech Stack:** React 19, React Router 8, Vite 8, Vitest 4, Testing Library, Framer Motion, Lucide React, plain CSS, Web3Forms.

## Global Constraints

- Follow `docs/superpowers/specs/2026-08-11-dspl-professional-refinement-design.md`.
- Reconcile the user's current `src/pages/About.jsx` and `src/pages/About.css` edits; never reset or discard them.
- Preserve contact details, form endpoints and payloads, analytics, validation, supporter behavior, brand proof, About history and leadership, and existing assets.
- Add no geography or currency qualifiers, guarantees, testimonials, response promises, legal assurances, or dependencies.
- Every production change follows RED, observed expected failure, minimal GREEN, focused verification.
- Stage only the current task's files. Do not push, merge, deploy, or alter `main`.

## File ownership

| Area | Files | Responsibility |
| --- | --- | --- |
| Home | `Home.jsx`, `ProcessSteps.jsx`, `homeSections.css` | Remove decorative numbers and label the true sequence |
| About | `About.jsx`, `About.css` | Reconcile user edits into meaningful labels and exact final copy |
| Services | `ServicePage.jsx`, three route configs | Route-specific framing in the shared component |
| Forms | `Contact.jsx/css`, `WorkWithUsModal.jsx/css` | Privacy context and compact accessible Contact layout |
| Brands | `Brands.jsx` | Internal Raw Radicles enquiry route |
| 404 | SEO, prerender, verification, redirect files | One robots owner and a root production `404.html` |

---

### Task 1: Make Home numbering meaningful

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/components/home/ProcessSteps.jsx`
- Modify: `src/components/home/homeSections.css`
- Modify: `src/pages/__tests__/Home.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Produces:** service cards without `marker`; process labels rendered as `Step 1` through `Step 6`.

- [ ] Add failing rendered assertions:

```jsx
const serviceCards = container.querySelectorAll('.service-evidence-card');
expect(serviceCards).toHaveLength(3);
expect(container.querySelector('.service-marker')).not.toBeInTheDocument();
expect(screen.getByText('Step 1')).toBeInTheDocument();
expect(screen.getByText('Step 6')).toBeInTheDocument();
expect(screen.queryByText(/return on every rupee/i)).not.toBeInTheDocument();
```

Add source assertions rejecting `marker: '01'` and requiring `Step {Number(step.number)}`.

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: `.service-marker` and standalone process numbers still render.

- [ ] Remove all `marker` properties and the service marker span. Change `ProcessSteps.jsx` to:

```jsx
<span className="process-step-number" aria-hidden="true">
  Step {Number(step.number)}
</span>
```

Adjust only `.process-step-number` sizing if required; preserve data order, list semantics, and layout.

- [ ] Run GREEN and checks:

```powershell
npm test -- src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
npm run lint -- src/pages/Home.jsx src/components/home/ProcessSteps.jsx src/pages/__tests__/Home.test.jsx
git diff --check -- src/pages/Home.jsx src/components/home/ProcessSteps.jsx src/components/home/homeSections.css src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
```

- [ ] Commit only Task 1 files with `refactor: make homepage sequencing meaningful`.

---

### Task 2: Reconcile the user's About edits

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.css`
- Modify: `src/pages/__tests__/About.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Produces:** direction cards shaped as `{ label, title, text }`.

- [ ] Update tests first:

```jsx
expect(directionSection.getAllByText(
  /^(Long-term direction|Our mandate|Operating principles)$/,
).map((node) => node.textContent)).toEqual([
  'Long-term direction', 'Our mandate', 'Operating principles',
]);
expect(directionSection.queryByText(/^0[1-3]$/)).not.toBeInTheDocument();
expect(directionSection.getByText(
  'Evidence guides our recommendations. We define scope, responsibilities, and measures clearly, communicate decisions honestly, and execute agreed work with care.',
)).toBeInTheDocument();
expect(section.querySelector('.direction-values-list')).not.toBeInTheDocument();
```

The source regression rejects `number:`, `card.items`, and `.direction-values-` and requires all three labels.

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/About.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: numeric labels, the dormant list branch, and non-final copy remain.

- [ ] Replace `directionCards` with:

```jsx
const directionCards = [
  {
    label: 'Long-term direction',
    title: 'Vision',
    text: 'To build an enduring portfolio of consumer brands defined by quality, relevance, and responsible growth.',
  },
  {
    label: 'Our mandate',
    title: 'Mission',
    text: 'We develop our own brands and help businesses strengthen their branding, marketing, and e-commerce capabilities through practical, accountable execution.',
  },
  {
    label: 'Operating principles',
    title: 'Values',
    text: 'Evidence guides our recommendations. We define scope, responsibilities, and measures clearly, communicate decisions honestly, and execute agreed work with care.',
  },
];
```

Render `<span className="direction-label">{card.label}</span>`. Remove `card.items`, `.direction-values-*`, and `.direction-number`; style `.direction-label` as restrained supporting text.

- [ ] Run GREEN, scoped lint, and `git diff --check`, then commit the four Task 2 files with `copy: strengthen About direction principles`.

---

### Task 3: Differentiate service-page framing

**Files:**
- Modify: `src/components/ServicePage.jsx`
- Modify: `src/pages/Marketing.jsx`
- Modify: `src/pages/Branding.jsx`
- Modify: `src/pages/Ecommerce.jsx`
- Modify: `src/components/__tests__/ServicePage.test.jsx`
- Modify: `src/pages/__tests__/ServiceCopy.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Produces:** no generic `Services` eyebrow above capabilities and route-specific FAQ framing.

- [ ] Add failing tests that reject the `Services` eyebrow and require:

```js
// Marketing
faqsTitle: 'Marketing engagement questions',
faqsDescription: 'Scope, measurement, and collaboration.',
// Branding
faqsTitle: 'Branding engagement questions',
faqsDescription: 'Scope, existing brands, and handover.',
// E-commerce
faqsTitle: 'E-commerce engagement questions',
faqsDescription: 'Platforms, existing stores, and ongoing support.',
```

Keep every existing capability, icon, FAQ answer, and rejected-claim assertion.

- [ ] Run RED:

```powershell
npm test -- src/components/__tests__/ServicePage.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
```

- [ ] Delete only `<span className="section-subtitle">Services</span>` from the offers header. Pass the exact FAQ strings above from each route. Keep `Questions & Answers`, four capability cards, icons, FAQ behavior, CTAs, and all other copy.

- [ ] Run GREEN plus `FAQAccordion.test.jsx`, scoped lint, and `git diff --check`; commit with `copy: differentiate service page framing`.

---

### Task 4: Add form Privacy context and compact Contact

**Files:**
- Modify: `src/pages/Contact.jsx`
- Modify: `src/pages/Contact.css`
- Modify: `src/components/WorkWithUsModal.jsx`
- Modify: `src/components/WorkWithUsModal.css`
- Modify: `src/pages/__tests__/Contact.test.jsx`
- Modify: `src/components/__tests__/WorkWithUsModal.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Consumes:** React Router `Link` and existing `/privacy`.

- [ ] Render Contact under `MemoryRouter` and add failing assertions in both form tests:

```jsx
expect(screen.getByText(
  'Information submitted through this form is handled as described in our Privacy Policy.',
)).toBeInTheDocument();
expect(screen.getByRole('link', { name: 'Privacy Policy' }))
  .toHaveAttribute('href', '/privacy');
```

Assert Contact hero has no `.section-subtitle`. Add a source contract for:

```css
@media (min-width: 901px) {
  .contact-hero { padding: 0.75rem 0 0.5rem; }
  .contact-title { font-size: 3rem; margin-bottom: 0.5rem; }
  .contact-description { font-size: 1rem; line-height: 1.5; }
  .contact-grid-section { padding-top: 0.75rem; }
  .contact-column { gap: 1rem; }
  .contact-form-panel { padding: 1.5rem; }
  .contact-form-panel .form-group { margin-bottom: 0.75rem; }
  .contact-form-panel textarea.form-input { min-height: 72px; }
  .contact-submit-btn { margin-top: 0.5rem; min-height: 44px; }
}
```

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/Contact.test.jsx src/components/__tests__/WorkWithUsModal.test.jsx src/__tests__/designSystemRegression.test.js
```

- [ ] Import `Link` in both components and render immediately before each submit error/button:

```jsx
<p className="form-privacy-notice">
  Information submitted through this form is handled as described in our{' '}
  <Link to="/privacy">Privacy Policy</Link>.
</p>
```

Add restrained secondary text, underlined link, and visible focus styling. Remove the Contact eyebrow. Apply the exact desktop CSS above, keep controls at least 44px high, preserve every mobile rule, and never hide overflow.

- [ ] Run GREEN with `routeStyleIsolation.test.jsx`, scoped lint, and `git diff --check`; commit with `feat: add form privacy context and compact Contact`.

---

### Task 5: Replace the Raw Radicles mailto

**Files:**
- Modify: `src/pages/Brands.jsx`
- Modify: `src/pages/__tests__/Brands.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

- [ ] Write the failing test:

```jsx
expect(screen.getByRole('link', { name: 'Contact us about Raw Radicles' }))
  .toHaveAttribute('href', '/contact');
expect(container.querySelector('.rr-cta-btn[href^="mailto:"]')).not.toBeInTheDocument();
```

Keep the separate partnership-modal assertion.

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/Brands.test.jsx src/__tests__/designSystemRegression.test.js
```

- [ ] Import `Link` from `react-router` and render:

```jsx
<Link to="/contact" className="btn btn-primary rr-cta-btn">
  Contact us about Raw Radicles <ArrowRight size={16} aria-hidden="true" />
</Link>
```

- [ ] Run GREEN, scoped lint, and `git diff --check`; commit with `fix: route Raw Radicles enquiries to Contact`.

---

### Task 6: Generate a real noindex 404

**Files:**
- Modify: `src/seo/routeMetadata.js`
- Modify: `src/hooks/useSEO.js`
- Modify: `src/pages/NotFound.jsx`
- Modify: `src/entry-prerender.jsx`
- Modify: `vite.config.js`
- Modify: `index.html`
- Modify: `scripts/verify-prerender.mjs`
- Delete: `public/_redirects`
- Modify: `src/hooks/__tests__/useSEO.test.jsx`
- Modify: `src/seo/__tests__/routeMetadata.test.js`
- Modify: `src/pages/__tests__/NotFound.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Produces:** `NOT_FOUND_METADATA`, optional `robots`, and root `dist/404.html`.

- [ ] Add failing tests for:

```js
expect(NOT_FOUND_METADATA).toMatchObject({
  title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
  canonical: '/404.html',
  robots: 'noindex, follow',
});
```

Render NotFound and require `meta[name="robots"]` content `noindex, follow`. Source tests require `additionalPrerenderRoutes: ['/privacy', '/404.html']`, absence of the catch-all redirect, and a `dist/404.html` verifier.

- [ ] Run RED:

```powershell
npm test -- src/hooks/__tests__/useSEO.test.jsx src/seo/__tests__/routeMetadata.test.js src/pages/__tests__/NotFound.test.jsx src/__tests__/designSystemRegression.test.js
```

- [ ] Export:

```js
export const NOT_FOUND_METADATA = Object.freeze({
  title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  canonical: '/404.html',
  image: DEFAULT_IMAGE,
  type: 'website',
  robots: 'noindex, follow',
  structuredData: organizationStructuredData,
});
```

Add `robots = 'index, follow'` to `useSEO` and set `meta[name="robots"]`. Use `NOT_FOUND_METADATA` in NotFound, overriding only `canonical` with `location.pathname` for client navigation. Remove the static robots tag from `index.html` so there is one metadata owner.

- [ ] In `entry-prerender.jsx`, select `NOT_FOUND_METADATA` for `/404.html` and add robots to `createHeadElements`. Configure:

```js
additionalPrerenderRoutes: ['/privacy', '/404.html'],
```

Delete `public/_redirects`. Extend `verify-prerender.mjs` to require `dist/404.html`, H1 `Page Not Found`, a title, and `noindex, follow`, while retaining the eight-route checks and printing `Verified 8 prerendered public routes and a production 404 page.`

- [ ] Run GREEN and build proof:

```powershell
npm test -- src/hooks/__tests__/useSEO.test.jsx src/seo/__tests__/routeMetadata.test.js src/pages/__tests__/NotFound.test.jsx src/__tests__/designSystemRegression.test.js
npm run build
npm run verify:html
```

Expected: tests and build exit 0, `dist/404.html` exists, and the verifier prints the exact new success message.

- [ ] Run scoped lint and `git diff --check`; commit with `feat: generate a real noindex 404`.

---

## Final verification and browser gate

- [ ] Run:

```powershell
npm run lint
npm test
npm run build
npm run verify:html
npm audit
git diff --check
git status --short
```

- [ ] With browser control, hard-load and SPA-navigate all eight public routes and an unknown route at 390 x 844, 768px, 1024px, 1039px, 1040px, 1100px, 1280 x 720, and 1440 x 900.
- [ ] At both desktop heights, require both Contact H2s, every Headquarters row, every field, the Privacy notice, and the full submit button in the initial viewport.
- [ ] Verify mobile form-first order, both Privacy links, Raw Radicles navigation to `/contact`, the generated 404 document, no overflow, no broken images, and no new console errors.
- [ ] Compare the final diff to the design specification line by line and report any gap rather than claiming completion.
