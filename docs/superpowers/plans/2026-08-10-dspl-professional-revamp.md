# DSPL Professional Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved evidence-led website refinement so every public route reads and renders as a mature corporate site, while preserving the existing route, form, analytics, imagery, and prerender contracts.

**Architecture:** Keep the current React/Vite route shell and shared `ServicePage` architecture. Make `src/index.css` the eager owner of reusable section and form primitives; keep page state and layout selectors owned by their component stylesheets. Drive service-specific language through explicit props, and share only the public form-error string between the two submission surfaces.

**Tech Stack:** React 19, React Router 8, Vite 8, Vitest 4, Testing Library, Framer Motion, Lucide React, plain CSS, Web3Forms, GA4.

## Global Constraints

- Work from the approved design in `docs/superpowers/specs/2026-08-10-dspl-professional-revamp-design.md`.
- Preserve all eight public routes, the wildcard route, lazy loading, prerendering, analytics integration, and SEO ownership.
- Preserve Contact and Work With Us fields, validation, honeypots, request endpoints, payload keys, and success/focus behavior unless this plan explicitly changes visitor-facing copy.
- Preserve the supporter conveyor, its logo files/order/dimensions/motion math, and reduced-motion behavior.
- Preserve About journey facts/images and leadership names/roles/portraits/links.
- Preserve the Raw Radicles proof grid, logo, verified partnership language, and enquiry destinations.
- Do not add dependencies, invented proof, performance guarantees, response-time promises, legal assurances, or new geographic qualifiers to Vision.
- Follow RED -> expected failure -> GREEN -> focused verification for every task. Commit only that task's files.
- Use `apply_patch` for hand edits. Do not stage unrelated user changes.

---

## File and responsibility map

| Area | Files | Responsibility |
| --- | --- | --- |
| Eager visual primitives | `src/index.css` | Section typography, vertical section rhythm, base form controls, focus and reduced motion |
| Header | `src/components/Header.jsx`, `src/components/Header.css` | One 1040px navigation breakpoint in JavaScript and CSS |
| Home | `src/pages/Home.jsx`, `src/components/home/OwnedBrandProof.jsx` | Approved positioning and capability-led service summaries |
| About | `src/pages/About.jsx`, `src/pages/About.css` | Compact hero and text-led Vision/Mission/Values framework |
| Brands | `src/pages/Brands.jsx`, `src/pages/Brands.css` | Operator-led positioning and restrained development panel |
| Service shell | `src/components/ServicePage.jsx`, `src/components/ServicePage.css`, `src/components/FAQAccordion.jsx` | Semantic shared structure and route-provided content |
| Service definitions | `src/pages/Marketing.jsx`, `src/pages/Branding.jsx`, `src/pages/Ecommerce.jsx` | Route-specific messages, capabilities, FAQs, and contextual icons |
| Shared public error | `src/utils/formMessages.js` | One visitor-safe submission error used by both forms |
| Contact | `src/pages/Contact.jsx`, `src/pages/Contact.css` | Peer desktop columns, form-first mobile behavior, safe messages |
| Project planner | `src/components/WorkWithUsModal.jsx`, `src/components/WorkWithUsModal.css` | Modal-owned state styles and professional visitor copy |
| Footer | `src/components/Footer.jsx`, `src/components/Footer.css` | Compact corporate information without a repeated global CTA |
| Privacy/utility | `src/pages/PrivacyPolicy.jsx`, `src/pages/PrivacyPolicy.css`, `src/pages/NotFound.jsx`, `src/seo/routeMetadata.js` | Factual privacy disclosure and minor recovery-page polish |
| Regression contracts | Existing tests plus focused new files listed below | Behavior, semantics, copy, CSS ownership, route isolation, and prerender expectations |

## Task 1: Stabilize eager CSS ownership and route isolation

**Files:**

- Modify: `src/index.css`
- Modify: `src/pages/About.css`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/components/ServicePage.css`
- Modify: `src/components/WorkWithUsModal.jsx`
- Modify: `src/pages/Contact.css`
- Modify: `src/components/WorkWithUsModal.css`
- Create: `src/__tests__/styleOwnership.test.js`
- Create: `src/__tests__/routeStyleIsolation.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

- [ ] Add a source-ownership regression that reads the five CSS files and asserts:

```js
for (const selector of [
  '.section-header',
  '.section-subtitle',
  '.section-title',
  '.section-title-description',
]) {
  expect(indexCss).toContain(selector);
  expect(aboutCss).not.toMatch(new RegExp(`^\\${selector}\\s*\\{`, 'm'));
  expect(serviceCss).not.toMatch(new RegExp(`^\\${selector}\\s*\\{`, 'm'));
}

expect(indexCss).toMatch(/@media\s*\(max-width:\s*768px\)[\s\S]*?\.section\s*\{[^}]*padding:\s*4rem 0;/);
expect(indexCss).not.toContain('.section { padding: 4rem 1rem; }');
```

- [ ] In the same test, reject generic component-state selectors at the start of Contact or modal rules:

```js
for (const selector of [
  'form-row',
  'half-width',
  'form-select',
  'error-text',
  'submit-btn',
  'success-state',
  'success-icon',
  'submit-error-banner',
]) {
  expect(contactCss).not.toMatch(new RegExp(`^\\.${selector}\\b`, 'm'));
  expect(modalCss).not.toMatch(new RegExp(`^\\.${selector}\\b`, 'm'));
}
```

- [ ] Add `routeStyleIsolation.test.jsx`. Import CSS through Vite's `?raw` suffix, render an open `WorkWithUsModal`, trigger required-field errors, record computed layout/select/error/button properties, append `Contact.css`, and require the snapshot to remain unchanged.

```js
const captureModalStyles = () => ({
  row: pick(getComputedStyle(screen.getByLabelText(/Email Address/i).closest('.form-group').parentElement), [
    'display', 'gridTemplateColumns', 'gap',
  ]),
  select: pick(getComputedStyle(screen.getByLabelText(/How did you hear/i)), [
    'appearance', 'paddingRight', 'cursor',
  ]),
  error: pick(getComputedStyle(screen.getByText(/Full Name is required/i)), [
    'display', 'color', 'fontSize', 'marginTop',
  ]),
  submit: pick(getComputedStyle(screen.getByRole('button', { name: /Send My Project Details/i })), [
    'width', 'marginTop', 'fontSize',
  ]),
});

const before = captureModalStyles();
injectCss(contactCss);
expect(captureModalStyles()).toEqual(before);
```

- [ ] Run the RED tests:

```powershell
npm test -- src/__tests__/styleOwnership.test.js src/__tests__/routeStyleIsolation.test.jsx
```

Expected: failure because shared headings live only in lazy CSS, mobile `.section` doubles horizontal gutters, and Contact's generic selectors alter modal controls.

- [ ] Move the canonical section rules into `src/index.css` and remove the unscoped duplicates from About and Service CSS:

```css
.section-header {
  max-width: 650px;
  margin: 0 auto 4rem;
  text-align: center;
}

.section-subtitle {
  display: inline-block;
  margin-bottom: 0.75rem;
  color: var(--accent-text);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.section-title {
  margin-bottom: 1rem;
  color: var(--text-heading);
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.section-title-description {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.6;
  text-wrap: pretty;
}
```

- [ ] Change the mobile section utility to `padding: 4rem 0`; keep `.container` as the horizontal gutter owner.

- [ ] Keep true field primitives global: `.form-group`, `.form-label`, `.form-input`, `select.form-input`, `select.form-input option`, `.form-input[aria-invalid='true']`, and `.form-error-text`. Namespace layout/state rules as `.contact-*` and `.work-modal-*`; remove `half-width` by using grid children.

- [ ] Update the existing Contact and modal JSX class names in the same mechanical change so every renamed rule has an owner. Do not change either form's copy, fields, validation, payload, or submission behavior in this task.

- [ ] Rerun the focused tests and the existing visual source regressions:

```powershell
npm test -- src/__tests__/styleOwnership.test.js src/__tests__/routeStyleIsolation.test.jsx src/__tests__/designSystemRegression.test.js src/pages/__tests__/Contact.test.jsx src/components/__tests__/WorkWithUsModal.test.jsx
git diff --check -- src/index.css src/pages/About.css src/components/ServicePage.css src/pages/Contact.jsx src/pages/Contact.css src/components/WorkWithUsModal.jsx src/components/WorkWithUsModal.css src/__tests__
```

Expected: all focused tests pass; `git diff --check` is silent.

- [ ] Commit:

```powershell
git add src/index.css src/pages/About.css src/components/ServicePage.css src/pages/Contact.jsx src/pages/Contact.css src/components/WorkWithUsModal.jsx src/components/WorkWithUsModal.css src/__tests__/styleOwnership.test.js src/__tests__/routeStyleIsolation.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "refactor: stabilize shared route styling"
```

## Task 2: Align the Header at one 1040px breakpoint

**Files:**

- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`
- Modify: `src/components/__tests__/Header.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

- [ ] Add a resize-boundary test that opens the drawer, keeps it open at 1039px, and closes it at 1040px.

```js
window.innerWidth = 1039;
fireEvent(window, new Event('resize'));
expect(menuButton).toHaveAttribute('aria-expanded', 'true');

window.innerWidth = 1040;
fireEvent(window, new Event('resize'));
expect(menuButton).toHaveAttribute('aria-expanded', 'false');
```

- [ ] Run RED:

```powershell
npm test -- src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: the current `> 900` JavaScript and `max-width: 900px` CSS violate the new boundary.

- [ ] Implement one shared numeric contract in the component and its matching CSS query:

```js
const DESKTOP_NAV_MIN_WIDTH = 1040;

if (window.innerWidth >= DESKTOP_NAV_MIN_WIDTH) {
  setIsOpen(false);
}
```

```css
@media (max-width: 1039px) {
  .desktop-nav,
  .desktop-right-controls { display: none; }
  .mobile-controls { display: flex; }
}
```

- [ ] Run GREEN and commit:

```powershell
npm test -- src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
git diff --check -- src/components/Header.jsx src/components/Header.css src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
git add src/components/Header.jsx src/components/Header.css src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "fix: align header responsive breakpoint"
```

## Task 3: Clarify Home positioning without changing its composition

**Files:**

- Modify: `src/pages/Home.jsx`
- Modify: `src/components/home/OwnedBrandProof.jsx`
- Modify: `src/pages/__tests__/Home.test.jsx`
- Modify: `scripts/verify-prerender.mjs`

- [ ] Update tests for the approved H1, supporting paragraph, and owned-brand label. Add absence assertions for `return on every rupee`, `convert`, and `all from one place` in Home service copy.

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/Home.test.jsx
```

Expected: current hero and evidence-label assertions fail.

- [ ] Replace only the approved strings. Keep the image, CTA labels/destinations, supporter strip, services order, process structure, and Raw Radicles block.

```jsx
<h1 className="hero-title">
  <span>We develop brands.</span>{' '}
  <span className="accent-text">We strengthen how businesses go to market.</span>
</h1>
<p className="hero-subhead">
  Dashapatmaja Solutions Pvt Ltd brings branding, marketing, and e-commerce
  into one coordinated system. We apply the same disciplines to Raw Radicles,
  the consumer brand we develop and operate.
</p>
```

Use these service bodies:

```js
const services = [
  {
    title: 'Branding',
    text: 'Positioning, identity, voice, and reusable brand assets designed for consistent use across customer-facing channels.',
  },
  {
    title: 'Marketing',
    text: 'Search, paid media, content, measurement, and reporting planned around defined audiences and commercial priorities.',
  },
  {
    title: 'E-commerce',
    text: 'Storefront, marketplace, payment, and delivery systems scoped around the selected platform and operating workflow.',
  },
];
```

Change `Owned-brand proof` to `Built and operated by DSPL` and update the Home H1 expected by the prerender verifier.

- [ ] Run GREEN and commit:

```powershell
npm test -- src/pages/__tests__/Home.test.jsx
git diff --check -- src/pages/Home.jsx src/components/home/OwnedBrandProof.jsx src/pages/__tests__/Home.test.jsx scripts/verify-prerender.mjs
git add src/pages/Home.jsx src/components/home/OwnedBrandProof.jsx src/pages/__tests__/Home.test.jsx scripts/verify-prerender.mjs
git commit -m "copy: clarify homepage positioning"
```

## Task 4: Replace About direction cards

**Files:**

- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.css`
- Create: `src/pages/__tests__/About.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

- [ ] Create a render test under `MemoryRouter` that requires a visible `What guides our work` H2, three articles, H3 order `Vision`, `Mission`, `Values`, number order `01`, `02`, `03`, exact copy, and no SVGs within this section.

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/About.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: the current two-card Mission/Vision block fails the count, order, Values, heading, and icon assertions.

- [ ] Remove `Target` and `Eye`. Add this immutable content above the component:

```js
const directionCards = [
  {
    number: '01',
    title: 'Vision',
    text: 'To build an enduring portfolio of consumer brands defined by quality, relevance, and responsible growth.',
  },
  {
    number: '02',
    title: 'Mission',
    text: 'We develop our own brands and help businesses strengthen their branding, marketing, and e-commerce capabilities through practical, accountable execution.',
  },
  {
    number: '03',
    title: 'Values',
    text: 'Evidence before claims. Clarity in decisions. Care in execution.',
  },
];
```

- [ ] Replace the hidden/incorrect heading and duplicated cards with a mapped semantic framework:

```jsx
<section className="section direction-section bg-alt" aria-labelledby="direction-title">
  <div className="container">
    <h2 id="direction-title" className="section-title">What guides our work</h2>
    <div className="direction-grid">
      {directionCards.map((card, index) => (
        <motion.article
          key={card.title}
          className="direction-card"
          initial={revealInitial(20)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={revealTransition({ duration: 0.6, delay: index * 0.1 })}
        >
          <span className="direction-number" aria-hidden="true">{card.number}</span>
          <h3 className="direction-title">{card.title}</h3>
          <p className="direction-text">{card.text}</p>
        </motion.article>
      ))}
    </div>
  </div>
</section>
```

- [ ] Use a three-column grid above 900px, one column at/below 900px, 4px panels, left alignment, and no hover transform/shadow. Shorten the hero paragraph to `Founded in 2023, Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services. Based at MUTBI, MAHE, Manipal, our team combines healthcare, engineering, design, management, and technology experience.` Tune mobile hero density to meet the 620px bottom criterion without changing its image.

- [ ] Remove the About page's decorative glow markup. Remove hover lift/shadow from the non-interactive leadership cards while retaining hover/focus feedback on each LinkedIn link.

- [ ] Run GREEN and commit:

```powershell
npm test -- src/pages/__tests__/About.test.jsx src/__tests__/designSystemRegression.test.js
git diff --check -- src/pages/About.jsx src/pages/About.css src/pages/__tests__/About.test.jsx src/__tests__/designSystemRegression.test.js
git add src/pages/About.jsx src/pages/About.css src/pages/__tests__/About.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "feat: add About direction framework"
```

## Task 5: Mature the Brands portfolio presentation

**Files:**

- Modify: `src/pages/Brands.jsx`
- Modify: `src/pages/Brands.css`
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `scripts/verify-prerender.mjs`

- [ ] Add source/render assertions for the approved hero and pipeline strings and the absence of `Sparkles`, `Cookie`, `HOUSE OF BRANDS`, `inside out`, and decorative pipeline shapes.

- [ ] Run RED:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: old hero copy, two decorative icons, and pipeline shapes are present.

- [ ] Remove the two icon imports and their JSX. Apply these exact strings:

```text
DSPL Brands
We develop and operate consumer brands.
We work across product development, packaging, compliance, market positioning, and commerce. Raw Radicles is our first flagship consumer brand, with additional concepts in development.
Portfolio in development
Additional consumer-brand concepts are being evaluated and developed. We will publish them here when they are ready for market.
```

- [ ] Preserve all Raw Radicles proof facts and actions. Replace the pipeline's oversized floating treatment with a restrained text-led panel; remove its decorative shapes and non-interactive lift. Remove the page-level decorative glow markup. Update the Brands H1 in `verify-prerender.mjs`.

- [ ] Run GREEN and commit:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
git diff --check -- src/pages/Brands.jsx src/pages/Brands.css src/__tests__/designSystemRegression.test.js scripts/verify-prerender.mjs
git add src/pages/Brands.jsx src/pages/Brands.css src/__tests__/designSystemRegression.test.js scripts/verify-prerender.mjs
git commit -m "copy: mature Brands portfolio presentation"
```

## Task 6: Refine the shared service shell, semantics, and route copy

**Files:**

- Modify: `src/components/ServicePage.jsx`
- Modify: `src/components/ServicePage.css`
- Modify: `src/components/FAQAccordion.jsx`
- Modify: `src/pages/Marketing.jsx`
- Modify: `src/pages/Branding.jsx`
- Modify: `src/pages/Ecommerce.jsx`
- Create: `src/components/__tests__/ServicePage.test.jsx`
- Create: `src/components/__tests__/FAQAccordion.test.jsx`
- Create: `src/pages/__tests__/ServiceCopy.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

- [ ] Write component tests for this explicit prop contract:

```js
ServicePage({
  seoMetadata,
  pageTypeClass,
  contextLabel,
  heroTitle,
  heroTagline,
  heroDescription,
  heroCtaLabel,
  heroImage,
  scopeTitle,
  scopeText,
  offersTitle,
  offersDescription,
  offers,
  faqsTitle,
  faqsDescription,
  faqs,
});
```

Require the tagline to be a paragraph, the scope introduction to be in page flow without `.glass`/`.matters-box`, the CTA to use `heroCtaLabel`, four capability articles, and FAQ buttons inside `h3` elements. Retain `aria-expanded`, region labelling, and toggle behavior.

- [ ] Add route-copy tests for the exact taglines/CTAs and absence of the promotional claims identified below.

- [ ] Run RED:

```powershell
npm test -- src/components/__tests__/ServicePage.test.jsx src/components/__tests__/FAQAccordion.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: the current H2 tagline, hard-coded CTA, glass Why It Matters card, H4 FAQ questions, and old claims fail.

- [ ] Refactor `ServicePage` to the contract above. Render the scope section as:

```jsx
<section className="section service-scope-section" aria-labelledby={`${pageTypeClass}-scope-title`}>
  <div className="container service-scope-layout">
    <h2 id={`${pageTypeClass}-scope-title`} className="service-scope-title">{scopeTitle}</h2>
    <p className="service-scope-text">{scopeText}</p>
  </div>
</section>
```

Use `6rem 0 4.5rem` hero padding above 768px and `4rem 0 3rem` at/below 768px. Remove hover lift from capability cards, remove `.glass` where the surface is immediately opaque, and remove the shared service page's decorative glow markup.

- [ ] Use the following Marketing content:

```js
const marketingCopy = {
  contextLabel: 'Marketing services',
  heroTagline: 'Marketing built around clear audiences, disciplined execution, and measurable decisions.',
  heroDescription: 'We plan search, paid media, content, and measurement as one programme, with scope and priorities defined against your audience, objectives, and available evidence.',
  heroCtaLabel: 'Discuss a marketing project',
  scopeTitle: 'A coordinated marketing programme',
  scopeText: 'Engagements begin with the current market position, audience, channel performance, and measurement setup. From there, we agree channel responsibilities, campaign cadence, reporting measures, and the work required to improve performance over time.',
  offersTitle: 'Marketing capabilities',
  offersDescription: 'The mix is selected against the brief; it is not a fixed package.',
};
```

Marketing capabilities:

```text
Search Engine Optimisation (SEO) — Technical review, search-intent research, on-page structure, and content planning designed to improve qualified organic visibility over time.
Paid Campaign Management — Campaign planning and management across Google, Meta, and relevant commerce channels, with budgets reviewed against agreed performance measures.
Analytics and Performance Tracking — Tracking and reporting for traffic, campaign spend, enquiries, and commercial outcomes, with measurement definitions agreed before launch.
Content and Copywriting — Landing pages, articles, product copy, and campaign messaging aligned with search intent and the brand's voice.
```

Marketing FAQs:

```text
How is the scope defined? — We begin with your objectives, audience, current channels, available data, and budget. The proposal then sets out priorities, responsibilities, deliverables, and reporting cadence.
How are results assessed? — We agree the measures that fit the work before launch. These may include qualified traffic, enquiry volume, campaign efficiency, or sales data where reliable tracking is available.
Can you work with existing teams or agencies? — Yes. Roles, access, review responsibilities, and hand-offs are documented so strategy, creative, media, and reporting remain coordinated.
```

- [ ] Use the following Branding content and icons (`Palette`, `Compass`, `BookOpen`, `LayoutTemplate`):

```js
const brandingCopy = {
  contextLabel: 'Branding services',
  heroTagline: 'Positioning, identity, and brand systems designed for consistent use.',
  heroDescription: 'We translate business context into a usable brand system: positioning, identity, voice, and the assets required for consistent execution.',
  heroCtaLabel: 'Discuss a branding project',
  scopeTitle: 'A brand system built for application',
  scopeText: 'The work starts with the business, audience, category, and competitive context. The resulting system connects positioning and language with visual identity, application rules, and assets that internal and external teams can use consistently.',
  offersTitle: 'Branding capabilities',
  offersDescription: 'The scope is shaped around the decisions and applications the business needs.',
};
```

Branding capabilities:

```text
Brand Identity and Visual Systems — Logo, colour, typography, packaging and application rules, with a practical system for consistent use across priority touchpoints.
Market Positioning — Audience, category, competitor, and offer analysis used to define a clear market position and decision framework.
Brand Story and Voice — A messaging framework covering the brand narrative, voice, core messages, and examples for common customer-facing contexts.
Design Systems and Brand Assets — Reusable templates, organised source files, and guidance that support day-to-day implementation by internal and partner teams.
```

Branding FAQs:

```text
What can a branding engagement include? — Scope can include positioning, naming, identity, voice, packaging or application guidelines, and reusable assets. The proposal identifies which are required.
Can you work with an existing brand? — Yes. We first identify what should be retained, clarified, or replaced, then define the refresh scope against current business needs.
What is included in the handover? — We provide the agreed source files, usage guidance, and templates, together with a handover for the people responsible for implementation.
```

- [ ] Use the following E-commerce content and icons (`ShoppingCart`, `MousePointerClick`, `Layers`, `CreditCard`):

```js
const ecommerceCopy = {
  contextLabel: 'E-commerce services',
  heroTagline: 'Storefront, marketplace, payment, and fulfilment systems designed for reliable day-to-day operation.',
  heroDescription: 'We plan and implement commerce systems that connect product presentation, checkout, payments, marketplaces, and fulfilment. Scope is defined around the selected platform, operating model, and support needs.',
  heroCtaLabel: 'Discuss an e-commerce project',
  scopeTitle: 'Commerce aligned with day-to-day operations',
  scopeText: 'Storefront and marketplace work is planned alongside catalogue ownership, payment setup, inventory, fulfilment, and reporting. This keeps the customer journey and operational responsibilities within one documented scope.',
  offersTitle: 'E-commerce capabilities',
  offersDescription: 'Implementation and support are scoped to the platforms, integrations, and operating responsibilities agreed for the project.',
};
```

E-commerce capabilities:

```text
Store Setup and Build — Storefront planning and implementation for Shopify, WooCommerce, or React-based commerce, with responsive behaviour and a clear catalogue and content structure.
Conversion Rate Optimisation (CRO) — Review of product discovery, product detail, cart, and checkout journeys to identify measurable friction and prioritise testable improvements.
Multi-Channel Selling — Marketplace setup and workflow planning for Amazon, Flipkart, and other agreed channels, including catalogue, inventory, and pricing responsibilities.
Payments and Delivery Setup — Payment and delivery integrations configured around the selected platform, providers, fulfilment model, and internal operating workflow.
```

E-commerce FAQs:

```text
How do you select a platform? — We recommend a platform after reviewing catalogue complexity, integrations, internal capability, budget, and the expected operating model. Shopify, WooCommerce, and React-based builds are supported where appropriate.
Can you improve an existing store? — Yes. An audit can cover performance, catalogue structure, product journeys, checkout, analytics, and operating dependencies before improvement work is scoped.
Can marketplace and ongoing support be included? — Yes, when included in the scope. The engagement defines which channels, integrations, data owners, and ongoing responsibilities are covered.
```

- [ ] Run GREEN and commit:

```powershell
npm test -- src/components/__tests__/ServicePage.test.jsx src/components/__tests__/FAQAccordion.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
git diff --check -- src/components/ServicePage.jsx src/components/ServicePage.css src/components/FAQAccordion.jsx src/pages/Marketing.jsx src/pages/Branding.jsx src/pages/Ecommerce.jsx src/components/__tests__ src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
git add src/components/ServicePage.jsx src/components/ServicePage.css src/components/FAQAccordion.jsx src/pages/Marketing.jsx src/pages/Branding.jsx src/pages/Ecommerce.jsx src/components/__tests__/ServicePage.test.jsx src/components/__tests__/FAQAccordion.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "feat: refine service page messaging"
```

## Task 7: Align Contact as two peer enquiry columns

**Files:**

- Create: `src/utils/formMessages.js`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/pages/Contact.css`
- Modify: `src/pages/__tests__/Contact.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

- [ ] Create the shared public error constant:

```js
export const FORM_SUBMISSION_ERROR =
  'We could not send your message right now. Please try again or contact us by email.';
```

- [ ] Extend Contact tests to require exact hero copy, peer H2 order `Headquarters` / `Send a message`, equivalent sibling `.contact-column` wrappers, panels immediately after headings, detail labels `Address` / `Phone` / `Email`, no duplicate H3 form title, and the generic error without `/access key|Web3Forms|environment/i`.

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: current heading placement/levels, labels, spacing contract, and vendor-facing errors fail.

- [ ] Restructure the main grid without changing form fields or contact details. Remove the Contact page's decorative glow markup. The two direct children of `.contact-layout` must be `.contact-column.contact-details-column` and `.contact-column.contact-form-column`. Each wrapper contains its peer `h2.contact-column-heading` first and its existing panel second; the headings are exactly `Headquarters` and `Send a message`.

Use the exact hero paragraph from the spec. Use `FORM_SUBMISSION_ERROR` for missing configuration, rejected responses, and network failures. Use success copy `Message received` and `Thank you. We have received your message and will review it before contacting you.`

- [ ] Implement the approved density contract: desktop hero `2.5rem 0 2rem`, main grid top `2rem`, column gap `1.5rem`, form panel padding `2rem`; at/below 900px use hero `3rem 0 2rem`, one column, and `.contact-form-column { order: -1; }`. Preserve 44px controls and one-column name fields on narrow phones. Once About, Brands, ServicePage, and Contact no longer render glow elements, delete `.glow-bg`, `.glow-circle*`, and `pulseSlow` from `src/index.css`.

- [ ] Run GREEN and commit:

```powershell
npm test -- src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
git diff --check -- src/index.css src/utils/formMessages.js src/pages/Contact.jsx src/pages/Contact.css src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
git add src/index.css src/utils/formMessages.js src/pages/Contact.jsx src/pages/Contact.css src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "feat: align Contact enquiry columns"
```

## Task 8: Simplify project-planner messages and own its styles

**Files:**

- Modify: `src/components/WorkWithUsModal.jsx`
- Modify: `src/components/WorkWithUsModal.css`
- Modify: `src/components/__tests__/WorkWithUsModal.test.jsx`
- Verify unchanged: `src/components/work-with-us/formModel.js`
- Verify unchanged: `src/components/work-with-us/__tests__/formModel.test.js`

- [ ] Update tests to require section headings `Contact details`, `Project details`, `Preferences`; the exact restrained success sentence; and the shared generic failure. Assert absence of `VIP LEAD`, immediate-contact, 24-hour, access-key, environment, and Web3Forms language. Preserve open/Escape, validation, honeypot, file limit, focus, and request tests.

- [ ] Run RED:

```powershell
npm test -- src/components/__tests__/WorkWithUsModal.test.jsx src/components/work-with-us/__tests__/formModel.test.js src/__tests__/routeStyleIsolation.test.jsx
```

Expected: current public priority notice, deadline, uppercase section labels, and vendor errors fail.

- [ ] Import `FORM_SUBMISSION_ERROR`; remove the component's `classifyLead` import, `processedLeadInfo` state/reset, duplicate classification call, and visitor-visible priority block. Do not change `classifyLead()` inside `createLeadPayload()` or remove the existing internal `priority` payload field.

- [ ] Apply exact visitor copy:

```jsx
<h3>Project details received</h3>
<p className="work-modal-success-message">
  Thank you. We have received your project details and will review them before contacting you.
</p>
```

Retain the `.work-modal-*` ownership introduced in Task 1 and keep the route-isolation test passing while the success-state markup changes.

- [ ] Run GREEN and commit:

```powershell
npm test -- src/components/__tests__/WorkWithUsModal.test.jsx src/components/work-with-us/__tests__/formModel.test.js src/__tests__/routeStyleIsolation.test.jsx
git diff --check -- src/components/WorkWithUsModal.jsx src/components/WorkWithUsModal.css src/components/__tests__/WorkWithUsModal.test.jsx
git add src/components/WorkWithUsModal.jsx src/components/WorkWithUsModal.css src/components/__tests__/WorkWithUsModal.test.jsx
git commit -m "copy: simplify project planner messages"
```

## Task 9: Remove the repeated Footer CTA and tighten the corporate footer

**Files:**

- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.css`
- Create: `src/components/__tests__/Footer.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

- [ ] Add a Footer test that rejects `.footer-banner`, `Ready to build something that lasts?`, `Innovating Today for a Smarter Tomorrow`, and the Footer `Get in Touch` button. Require the exact company description, headings `Services` and `Contact`, all current links/details, and `Privacy Policy` -> `/privacy`.

- [ ] Run RED:

```powershell
npm test -- src/components/__tests__/Footer.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: current banner, slogan, headings, and legal label fail.

- [ ] Remove `ArrowUpRight` and `openWorkModal` from Footer, delete the banner markup and CSS, and use:

```text
Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.
```

Set footer padding to `4rem 0 2rem`, grid bottom padding to `3rem`, and stack/left-align `.footer-bottom` with a 1rem gap at/below 576px. Preserve logo, LinkedIn, service/Brands/About links, both emails, both phone numbers, copyright, and back-to-top behavior.

- [ ] Run GREEN and commit:

```powershell
npm test -- src/components/__tests__/Footer.test.jsx src/__tests__/designSystemRegression.test.js
git diff --check -- src/components/Footer.jsx src/components/Footer.css src/components/__tests__/Footer.test.jsx src/__tests__/designSystemRegression.test.js
git add src/components/Footer.jsx src/components/Footer.css src/components/__tests__/Footer.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "refactor: simplify global footer"
```

## Task 10: Reconcile Privacy content with verified behavior

**Files:**

- Modify: `src/pages/PrivacyPolicy.jsx`
- Modify: `src/pages/PrivacyPolicy.css`
- Modify: `src/seo/routeMetadata.js`
- Modify: `src/seo/__tests__/routeMetadata.test.js`
- Create: `src/pages/__tests__/PrivacyPolicy.test.jsx`
- Modify: `scripts/verify-prerender.mjs`

- [ ] Add tests that require H1 `Privacy Policy`, updated date `10 August 2026`, Web3Forms and Google Analytics disclosure, the actual rendered form-field categories, the internal project-priority explanation, and privacy contact details. Reject `/Terms of Use|newsletter|anonymized|never sell|industry-standard|ephemeral|permanently stored|retained only/i`.

- [ ] Add exact metadata assertions:

```js
expect(getRouteMetadata('/privacy')).toMatchObject({
  title: 'Dashapatmaja Solutions Pvt Ltd | Privacy Policy',
  description:
    'Read how Dashapatmaja Solutions Pvt Ltd handles information submitted through website enquiries, project-planning forms, and analytics.',
});
```

- [ ] Run RED:

```powershell
npm test -- src/pages/__tests__/PrivacyPolicy.test.jsx src/seo/__tests__/routeMetadata.test.js
```

Expected: the current page claims Terms, newsletter use, anonymized analytics, broad security standards, ephemeral processing, and unsupported retention behavior.

- [ ] Replace the policy with these factual sections only:

```text
1. About this policy
This policy explains how Dashapatmaja Solutions Pvt Ltd handles information submitted through this website and information generated by website analytics.

2. Information handled through the website
The Contact form collects your name, email address, service requirement, and message. The project planner may also collect your phone or WhatsApp number, company or brand name, website or social handle, services of interest, project details, referral source, preferred contact method, and an optional attachment.

3. How the information is used
We use enquiry information to review your request, contact you using the details you provide, prepare or discuss a relevant scope of work, and maintain a record of the enquiry. Project-planner submissions may receive an internal priority label based on the company details and project text submitted. This label is used to organise follow-up; it does not determine eligibility for a service or affect legal rights.

4. Service providers and analytics
Contact and project-planner submissions are transmitted through Web3Forms. In production, Google Analytics records page views and selected website interaction events. These providers handle information under their own terms and privacy practices.

5. Questions about your information
For questions about this policy or information submitted through the website, contact Dashapatmaja Solutions Pvt Ltd at director@dashapatmaja.in or the telephone number listed below.
```

Retain the verified headquarters card. Do not add security standards, retention periods, deletion guarantees, legal certifications, or provider assurances. Update the Privacy H1 expected by `verify-prerender.mjs`; preserve the eight-route count.

- [ ] Run GREEN and commit:

```powershell
npm test -- src/pages/__tests__/PrivacyPolicy.test.jsx src/seo/__tests__/routeMetadata.test.js
npm run build
npm run verify:html
git diff --check -- src/pages/PrivacyPolicy.jsx src/pages/PrivacyPolicy.css src/seo/routeMetadata.js src/seo/__tests__/routeMetadata.test.js src/pages/__tests__/PrivacyPolicy.test.jsx scripts/verify-prerender.mjs
git add src/pages/PrivacyPolicy.jsx src/pages/PrivacyPolicy.css src/seo/routeMetadata.js src/seo/__tests__/routeMetadata.test.js src/pages/__tests__/PrivacyPolicy.test.jsx scripts/verify-prerender.mjs
git commit -m "copy: reconcile privacy disclosures"
```

Expected HTML verification: `Verified 8 prerendered public routes.`

## Task 11: Polish 404 recovery semantics

**Files:**

- Modify: `src/pages/NotFound.jsx`
- Modify: `src/pages/__tests__/NotFound.test.jsx`

- [ ] Update the test to require an H2 `Explore popular sections`, a `Contact us` link to `/contact`, and absence of `Contact Support`. Preserve the 404 path, Return to Home, Go Back, all route links, and analytics event.

- [ ] Run RED, implement the two string/heading changes, run GREEN, and commit:

```powershell
npm test -- src/pages/__tests__/NotFound.test.jsx
git diff --check -- src/pages/NotFound.jsx src/pages/__tests__/NotFound.test.jsx
git add src/pages/NotFound.jsx src/pages/__tests__/NotFound.test.jsx
git commit -m "copy: polish 404 recovery links"
```

## Task 12: Whole-site automated and live verification

**Files:** No planned production edits. Any defect must be fixed in the task that owns it and rerun through that task's focused tests.

- [ ] Run the complete automated gate from a clean development-server state:

```powershell
npm run lint
npm test
npm run build
npm run verify:html
npm audit --omit=dev
git diff --check
git status --short
```

Expected:

- every command exits 0;
- Vitest reports no unhandled errors;
- Vite build completes;
- verifier prints `Verified 8 prerendered public routes.`;
- production dependency audit reports 0 vulnerabilities;
- `git diff --check` is silent;
- status contains only intentional revamp work.

- [ ] Direct-load and SPA-navigate every public route plus a missing route at 390x844, 768px, 1024px, 1039px, 1040px, 1100px, and 1440x900.

- [ ] Confirm the following measurable checks:

  - no horizontal overflow, broken images, or new console errors/warnings;
  - About hero bottom is at or above 620px at 390x844 and card 01 begins within the initial viewport;
  - every service scope introduction begins within the initial 390x844 viewport;
  - Header uses compact navigation through 1039px and full navigation from 1040px;
  - Contact at 1440x900 shows both peer headings, Address/Phone/Email, all five default form fields, and submit button without page scroll;
  - Contact stacks form before Headquarters at 900px and below;
  - Work With Us computed styling is identical on a fresh Home load and after visiting Contact;
  - Footer has no repeated CTA banner and remains readable on narrow phones;
  - static cards show no transform or stronger shadow on hover;
  - keyboard focus, modal focus return, FAQ disclosure state, and form error associations remain intact.

- [ ] Review the final copy once more for old phrases and placeholders:

```powershell
rg -n -i "inside out|innovating today|ready to build something that lasts|salesperson that never sleeps|obvious choices|VIP LEAD|respond within 24 hours|access key|Web3Forms server|Terms of Use|TBD|TODO|FIXME|XXX" src
```

Expected: no visitor-facing matches. Allowed implementation/provider references must be confined to internal request code or factual Privacy disclosure.

- [ ] Present desktop and mobile visuals to the user for approval. Do not push, merge, deploy, or alter `main` without separate authorization.
