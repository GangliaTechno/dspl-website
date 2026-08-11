# DSPL Premium Editorial System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved premium editorial Home, shared service-page, CTA-ownership, and Contact refinements without changing routes, factual content, form behavior, or the established DSPL identity.

**Architecture:** Keep the existing React/Vite route shell and shared `ServicePage` component. Change presentation at the current owners: Home owns its proposition and internal capability link; `ServicePage` owns the quieter shared service hero and text-led capability grid; Header remains the sole Work With Us modal owner; Contact uses one CSS-grid composition with three semantic regions so mobile can place the form between the introduction and Headquarters.

**Tech Stack:** React 19.2.8, React Router 8.3.0, Vite 8.0.12, Vitest 4.1.10, Testing Library 16.3.2, plain CSS, existing Framer Motion and Lucide dependencies only.

## Global Constraints

- Use the exact approved Home H1: `We develop brands. We deliver disciplined market execution.` as two visible statements.
- Use the exact approved Home paragraph: `Dashapatmaja Solutions Pvt Ltd develops and operates consumer brands while helping businesses coordinate branding, marketing, and e-commerce through clearly defined, accountable execution.`
- Header is the only production component permitted to import or call `openWorkModal`.
- Do not add geographic qualifiers, currency-specific claims, testimonials, unverifiable metrics, guaranteed outcomes, response-time promises, decorative numbers, or replacement capability icons.
- Preserve the logo, palette, Outfit font, routes, hero-image assets, supporter marquee, About, Raw Radicles evidence, service facts, FAQs, Footer, Privacy, 404, Web3Forms endpoint/payloads, GA4 contracts, and dependency set.
- Keep Header's 1040px desktop boundary, 44px minimum form controls, visible focus, reduced motion, sequential headings, labels, live regions, and modal focus management.
- Follow strict RED -> GREEN TDD for each task. Commit only the files named in that task after its focused suite passes.
- Do not deploy, push, merge, or modify `main`.

## File Map

- `src/pages/Home.jsx`: approved two-statement proposition, supporting copy, internal capabilities link, and `#capabilities` destination.
- `src/pages/Home.css`: white headline treatment, restrained gold rule, and single understated hero link.
- `src/components/ServicePage.jsx`: shared service hero interface and text-only capability article markup.
- `src/components/ServicePage.css`: 400px desktop hero band and editorial capability grid.
- `src/pages/Marketing.jsx`, `Branding.jsx`, `Ecommerce.jsx`: route-specific `heroIntro` strings and text-only capability data.
- `src/pages/Brands.jsx`: partnership navigation to Contact; no modal ownership.
- `src/pages/Contact.jsx`: integrated introduction, Headquarters, and General enquiry regions; existing form logic remains local.
- `src/pages/Contact.css`: desktop 2:3 grid areas and mobile introduction -> form -> Headquarters ordering.
- Rendered tests under `src/pages/__tests__` and `src/components/__tests__`: exact copy, actions, semantics, and preserved behavior.
- `src/__tests__/designSystemRegression.test.js`: source-level ownership and CSS contracts that are expensive to prove in jsdom.

---

### Task 1: Refine the Home proposition and hero action

**Files:**
- Modify: `src/pages/Home.jsx:18,98-174`
- Modify: `src/pages/Home.css:44-94,208-212`
- Test: `src/pages/__tests__/Home.test.jsx:6-76`
- Test: `src/__tests__/designSystemRegression.test.js:329-379`

**Interfaces:**
- Consumes: existing `SupporterStrip`, service-card routes, `ProcessSteps`, and `OwnedBrandProof` without changing their props.
- Produces: a normal anchor `href="#capabilities"` and a coordinated-services section with `id="capabilities"`.

- [ ] **Step 1: Write the failing rendered Home contract**

Replace the old hero expectations in `Home.test.jsx` with exact assertions:

```jsx
expect(
  screen.getByRole('heading', {
    level: 1,
    name: 'We develop brands. We deliver disciplined market execution.',
  }),
).toBeInTheDocument();

expect(
  screen.getByText(
    'Dashapatmaja Solutions Pvt Ltd develops and operates consumer brands while helping businesses coordinate branding, marketing, and e-commerce through clearly defined, accountable execution.',
  ),
).toBeInTheDocument();

expect(screen.queryByRole('button', { name: 'Work With Us' }))
  .not.toBeInTheDocument();
expect(screen.queryByRole('link', { name: 'See Our Brands' }))
  .not.toBeInTheDocument();
expect(screen.getByRole('link', { name: 'Explore our capabilities' }))
  .toHaveAttribute('href', '#capabilities');
expect(screen.getByRole('region', { name: 'One growth system, not three disconnected vendors' }))
  .toHaveAttribute('id', 'capabilities');
```

Update the Home source regression to require:

```js
expect(homePage).not.toContain("import { openWorkModal } from '../utils/workModal';");
expect(homePage).not.toContain("openWorkModal('homepage-hero')");
expect(homePage).toContain('We deliver disciplined market execution.');
expect(homePage).toContain('href="#capabilities"');
expect(homePage).toContain('id="capabilities"');
expect(home).toMatch(
  /\.home-hero-content::before\s*{[^}]*width:\s*3rem;[^}]*height:\s*3px;[^}]*background:\s*var\(--accent\);/s,
);
expect(home).toMatch(/\.hero-title\s*{[^}]*color:\s*#fff;/s);
expect(home).not.toContain('.accent-text');
```

- [ ] **Step 2: Run the Home tests to verify RED**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the old second statement, supporting copy, two hero actions, accent class, and missing `#capabilities` contract remain.

- [ ] **Step 3: Implement the approved Home hero**

Remove the `openWorkModal` import from `Home.jsx`. Replace the H1, paragraph, and actions with:

```jsx
<h1 className="hero-title">
  <span>We develop brands.</span>
  <span>We deliver disciplined market execution.</span>
</h1>
<p className="hero-subhead">
  Dashapatmaja Solutions Pvt Ltd develops and operates consumer brands
  while helping businesses coordinate branding, marketing, and e-commerce
  through clearly defined, accountable execution.
</p>
<a href="#capabilities" className="btn btn-secondary hero-capabilities-link">
  Explore our capabilities
</a>
```

Change the coordinated-services opening tag to:

```jsx
<section
  className="section coordinated-services"
  id="capabilities"
  aria-labelledby="services-title"
>
```

Replace `.accent-text`, `.hero-ctas`, and the mobile `.hero-ctas` rules in `Home.css` with:

```css
.home-hero-content::before {
  display: block;
  width: 3rem;
  height: 3px;
  margin: 0 auto 1.5rem;
  background: var(--accent);
  content: '';
}

.hero-capabilities-link {
  border-color: rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.hero-capabilities-link:hover {
  border-color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

@media (max-width: 520px) {
  .hero-capabilities-link {
    width: 100%;
  }
}
```

Keep `.hero-title { color: #fff; }` and the existing two-span block layout. Do not change hero media, overlay, supporter markup, or the lower Home sections.

- [ ] **Step 4: Run the Home tests to verify GREEN**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: both files PASS, including the existing supporter, imagery, process, and owned-brand contracts.

- [ ] **Step 5: Check and commit Task 1**

Run:

```powershell
git diff --check -- src/pages/Home.jsx src/pages/Home.css src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
git add -- src/pages/Home.jsx src/pages/Home.css src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "copy: refine homepage proposition"
```

Expected: diff check exits 0 and the commit contains only the four Task 1 files.

---

### Task 2: Replace the shared service hero and icon cards

**Files:**
- Modify: `src/components/ServicePage.jsx:1-112`
- Modify: `src/components/ServicePage.css:10-150,152-176`
- Modify: `src/pages/Marketing.jsx:1-42`
- Modify: `src/pages/Branding.jsx:1-42`
- Modify: `src/pages/Ecommerce.jsx:1-42`
- Test: `src/components/__tests__/ServicePage.test.jsx:1-94`
- Test: `src/pages/__tests__/ServiceCopy.test.jsx:1-145`
- Test: `src/__tests__/designSystemRegression.test.js:576-607`

**Interfaces:**
- Consumes: `seoMetadata`, `pageTypeClass`, `heroTitle`, `heroImage`, existing scope/capability/FAQ data.
- Produces: replaces `contextLabel`, `heroTagline`, `heroDescription`, and `heroCtaLabel` with one required string prop named `heroIntro`; each `offers` item becomes `{ title: string, text: string }`.

- [ ] **Step 1: Write the failing shared-component contract**

Change the `ServicePage.test.jsx` fixture to:

```jsx
const props = {
  seoMetadata: { title: 'Test service' },
  pageTypeClass: 'test-service',
  heroTitle: 'Test service',
  heroIntro: 'One concise service positioning paragraph.',
  heroImage: {
    src: '/service-1440.webp',
    desktopSrcSet: '/service-960.webp 960w, /service-1440.webp 1440w',
    mobileSrc: '/service-mobile.webp',
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
  scopeTitle: 'A defined service scope',
  scopeText: 'The scope stays in the normal page flow.',
  offersTitle: 'Service capabilities',
  offersDescription: 'Four capabilities selected for the brief.',
  offers: Array.from({ length: 4 }, (_, index) => ({
    title: `Capability ${index + 1}`,
    text: `Capability ${index + 1} description.`,
  })),
  faqsTitle: 'Service questions',
  faqsDescription: 'Answers about the engagement.',
  faqs: [{ q: 'How does this work?', a: 'With a documented scope.' }],
};
```

Assert the new hierarchy:

```jsx
expect(screen.getByRole('heading', { level: 1, name: props.heroTitle }))
  .toBeInTheDocument();
expect(screen.getByText(props.heroIntro)).toHaveClass('domain-description');
expect(screen.queryByRole('button', { name: /discuss/i })).not.toBeInTheDocument();
expect(container.querySelector('.domain-hero .section-subtitle')).not.toBeInTheDocument();
expect(container.querySelector('.domain-subtitle')).not.toBeInTheDocument();
expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
expect(container.querySelector('.offer-icon-wrapper')).not.toBeInTheDocument();
```

Keep the existing responsive `<picture>` assertions, but remove the modal-event listener and click assertion.

- [ ] **Step 2: Write the failing route-copy contracts**

In `ServiceCopy.test.jsx`, replace each route's old hero fields with these exact `heroIntro` strings:

```js
{
  name: 'Marketing',
  heroIntro: 'Search, paid media, content, and measurement coordinated around defined audiences, commercial priorities, and available evidence.',
}
{
  name: 'Branding',
  heroIntro: 'Positioning, identity, voice, and application systems developed for consistent use across the business.',
}
{
  name: 'E-commerce',
  heroIntro: 'Storefront, marketplace, payment, and fulfilment systems planned around the selected platform and operating model.',
}
```

Keep every current scope, capability, FAQ, and rejected-claim string. Change each `offers` tuple to `[title, text]`. For every route assert:

```jsx
expect(screen.getByText(heroIntro)).toBeInTheDocument();
expect(screen.queryByRole('button', { name: /^Discuss / })).not.toBeInTheDocument();
expect(container.querySelector('.domain-hero .section-subtitle')).not.toBeInTheDocument();

const entries = container.querySelectorAll('article.offer-entry');
expect(entries).toHaveLength(4);
offers.forEach(([title, text], index) => {
  expect(entries[index]).toHaveTextContent(title);
  expect(entries[index]).toHaveTextContent(text);
  expect(entries[index].querySelector('svg')).not.toBeInTheDocument();
});
```

Update `designSystemRegression.test.js` to reject `openWorkModal`, `heroCtaLabel`, `domain-cta`, `domain-subtitle`, and `offer-icon-wrapper` in `ServicePage.jsx`; require `heroIntro`, `offer-entry`, `min-height: 400px`, the two-column editorial grid, and the mobile natural-height override.

- [ ] **Step 3: Run service tests to verify RED**

Run:

```powershell
npm.cmd test -- src/components/__tests__/ServicePage.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the old four-layer hero, modal CTA, icon properties, and white card markup still exist.

- [ ] **Step 4: Implement the smaller `ServicePage` interface**

Remove the `ArrowRight` and `openWorkModal` imports. Use this prop list and hero content:

```jsx
const ServicePage = ({
  seoMetadata,
  pageTypeClass,
  heroTitle,
  heroIntro,
  heroImage,
  scopeTitle,
  scopeText,
  offersTitle,
  offersDescription,
  offers,
  faqsTitle,
  faqsDescription,
  faqs,
}) => {
```

```jsx
<div className="container">
  <h1 className="domain-title">{heroTitle}</h1>
  <p className="domain-description">{heroIntro}</p>
</div>
```

Replace capability article markup with:

```jsx
<div className="offers-grid">
  {offers.map((offer) => (
    <article key={offer.title} className="offer-entry">
      <h3 className="offer-card-title">{offer.title}</h3>
      <p className="offer-card-text">{offer.text}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 5: Implement the service CSS contract**

Replace the old hero/tagline/CTA and card styles with:

```css
.domain-hero {
  position: relative;
  display: grid;
  min-height: 400px;
  place-items: center;
  overflow: hidden;
  padding: 4rem 0;
  background-color: var(--bg-primary);
  text-align: center;
}

.domain-hero::after {
  position: absolute;
  z-index: 2;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  content: '';
}

.domain-hero .container {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

.domain-title {
  margin-bottom: 1.25rem;
  color: #fff;
  font-size: clamp(2.75rem, 5vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
}

.domain-description {
  max-width: 62ch;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.7;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.45);
  text-wrap: pretty;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
  border-top: 1px solid var(--border-color);
}

.offer-entry {
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .domain-hero {
    min-height: auto;
    padding: 3.5rem 0 3rem;
  }

  .domain-title {
    font-size: 2.25rem;
  }

  .offers-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
}
```

Retain the current picture, scope-section, headings, text, FAQ, and background-boundary styles. Delete `.domain-subtitle`, `.domain-cta`, `.offer-card`, and `.offer-icon-wrapper` rules.

- [ ] **Step 6: Update all three route configurations**

Remove each route's Lucide import. Remove `contextLabel`, `heroTagline`, `heroDescription`, and `heroCtaLabel`. Add the exact `heroIntro` specified in Step 2. Remove every `icon` property while leaving every capability `title` and `text` unchanged.

Example Marketing object shape after the change:

```jsx
const marketingCopy = {
  heroIntro: 'Search, paid media, content, and measurement coordinated around defined audiences, commercial priorities, and available evidence.',
  scopeTitle: 'A coordinated marketing programme',
  scopeText: 'Engagements begin with the current market position, audience, channel performance, and measurement setup. From there, we agree channel responsibilities, campaign cadence, reporting measures, and the work required to improve performance over time.',
  offersTitle: 'Marketing capabilities',
  offersDescription: 'The mix is selected against the brief; it is not a fixed package.',
};
```

- [ ] **Step 7: Run service tests to verify GREEN**

Run:

```powershell
npm.cmd test -- src/components/__tests__/ServicePage.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/components/__tests__/FAQAccordion.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: all focused tests PASS; FAQ behavior and responsive image assertions remain green.

- [ ] **Step 8: Check and commit Task 2**

Run:

```powershell
git diff --check -- src/components/ServicePage.jsx src/components/ServicePage.css src/pages/Marketing.jsx src/pages/Branding.jsx src/pages/Ecommerce.jsx src/components/__tests__/ServicePage.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
git add -- src/components/ServicePage.jsx src/components/ServicePage.css src/pages/Marketing.jsx src/pages/Branding.jsx src/pages/Ecommerce.jsx src/components/__tests__/ServicePage.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "refactor: introduce editorial service pages"
```

Expected: diff check exits 0 and the commit contains only Task 2 files.

---

### Task 3: Make Header the sole project-planner owner

**Files:**
- Modify: `src/pages/Brands.jsx:1-13,140-153`
- Test: `src/pages/__tests__/Brands.test.jsx:1-76`
- Test: `src/__tests__/designSystemRegression.test.js:515-533,658-682`
- Test: `src/components/__tests__/Header.test.jsx:1-31`

**Interfaces:**
- Consumes: existing `WORK_MODAL_EVENT` and Header's `handleOpenWorkModal` behavior.
- Produces: Brands partnership router link `{ to: '/contact', label: 'Contact us about a brand partnership' }`; only Header consumes `openWorkModal` in production components/pages.

- [ ] **Step 1: Write the failing Brands navigation test**

Remove the modal-event setup and click from `Brands.test.jsx`. Add:

```jsx
expect(
  screen.getByRole('link', { name: 'Contact us about a brand partnership' }),
).toHaveAttribute('href', '/contact');
expect(
  screen.queryByRole('button', {
    name: 'Open enquiry form to discuss a brand partnership',
  }),
).not.toBeInTheDocument();
```

Remove unused `fireEvent` and `WORK_MODAL_EVENT` imports from the test.

- [ ] **Step 2: Write the failing modal-ownership regression**

In `designSystemRegression.test.js`, add one source contract:

```js
it('keeps Header as the only production Work With Us modal owner', () => {
  const header = readSource('src/components/Header.jsx');
  const nonOwners = [
    readSource('src/pages/Home.jsx'),
    readSource('src/components/ServicePage.jsx'),
    readSource('src/pages/Brands.jsx'),
    readSource('src/components/Footer.jsx'),
  ];

  expect(header).toContain("import { openWorkModal } from '../utils/workModal';");
  expect(header).toContain("openWorkModal('header')");
  nonOwners.forEach((source) => expect(source).not.toContain('openWorkModal'));
});
```

Add a Header behavior test that listens for `WORK_MODAL_EVENT`, clicks the first Header CTA representation, and expects `{ source: 'header' }`. The exact test body is:

```jsx
it('opens the project planner from the global Header action', () => {
  const sources = [];
  const listener = (event) => sources.push(event.detail.source);
  window.addEventListener(WORK_MODAL_EVENT, listener);

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );

  fireEvent.click(
    screen.getAllByRole('button', {
      name: 'Open Work With Us enquiry form',
    })[0],
  );
  expect(sources).toEqual(['header']);
  window.removeEventListener(WORK_MODAL_EVENT, listener);
});
```

Import `WORK_MODAL_EVENT` from `../../utils/workModal` in `Header.test.jsx`.

- [ ] **Step 3: Run ownership tests to verify RED**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Brands.test.jsx src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: Brands and source ownership FAIL because `Brands.jsx` still opens the modal; Header behavior remains green.

- [ ] **Step 4: Replace the Brands partnership button**

Remove the `openWorkModal` import. Replace the pipeline button with:

```jsx
<Link to="/contact" className="btn btn-primary pipeline-btn">
  Contact us about a brand partnership
  <ArrowRight size={16} aria-hidden="true" />
</Link>
```

Keep the existing `.pipeline-btn` style and portfolio copy unchanged.

- [ ] **Step 5: Run ownership tests to verify GREEN**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Brands.test.jsx src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: all focused tests PASS and Header is the only modal consumer.

- [ ] **Step 6: Check and commit Task 3**

Run:

```powershell
git diff --check -- src/pages/Brands.jsx src/pages/__tests__/Brands.test.jsx src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
git add -- src/pages/Brands.jsx src/pages/__tests__/Brands.test.jsx src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "refactor: centralize project enquiries in Header"
```

Expected: diff check exits 0 and the commit contains only Task 3 files.

---

### Task 4: Build the integrated Contact composition

**Files:**
- Modify: `src/pages/Contact.jsx:1-5,110-303`
- Modify: `src/pages/Contact.css:1-281`
- Test: `src/pages/__tests__/Contact.test.jsx:31-105`
- Test: `src/__tests__/designSystemRegression.test.js:232-290`

**Interfaces:**
- Consumes: unchanged Contact state, validation, `handleSubmit`, `FORM_SUBMISSION_ERROR`, Web3Forms payload, GA4 event, and Privacy link.
- Produces: CSS grid areas named `intro`, `form`, and `details`; exact H1 `Start a conversation.` and H2 `General enquiry`.

- [ ] **Step 1: Write the failing integrated-layout test**

Replace the old peer-column test with:

```jsx
it('presents one integrated Contact composition with a general enquiry form', () => {
  const { container } = renderContact();
  const layout = container.querySelector('.contact-layout');

  expect(container.querySelector('.contact-hero')).not.toBeInTheDocument();
  expect(layout).toBeInTheDocument();
  expect(layout.children).toHaveLength(3);
  expect(layout.children[0]).toHaveClass('contact-intro');
  expect(layout.children[1]).toHaveClass('contact-form-column');
  expect(layout.children[2]).toHaveClass('contact-headquarters');
  expect(screen.getByText('Contact')).toHaveClass('contact-kicker');
  expect(screen.getByRole('heading', { level: 1, name: 'Start a conversation.' }))
    .toBeInTheDocument();
  expect(screen.getByText(
    'For general enquiries, tell us what you need and how we can reach you. For a detailed project brief, use Work With Us in the header.',
  )).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: 'Headquarters' }))
    .toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: 'General enquiry' }))
    .toBeInTheDocument();
  expect(container.querySelector('.contact-details-panel')).not.toBeInTheDocument();
  expect(container.querySelector('.contact-details-list')).toBeInTheDocument();
  expect(container.querySelectorAll('.contact-detail-row')).toHaveLength(3);
  expect(container.querySelector('.contact-headquarters svg')).not.toBeInTheDocument();
});
```

Update the contact-detail test to query `.contact-details-list` instead of `.contact-details-panel`. Keep every telephone, email, field, option, validation, privacy, error, payload, analytics, success, and reset assertion unchanged.

Update the source regression to require:

```js
expect(contactPage).toContain('className="contact-intro"');
expect(contactPage).toContain('className="contact-headquarters"');
expect(contactPage).toContain('className="contact-form-column"');
expect(contactPage).not.toContain('contact-hero');
expect(contactPage).not.toContain('contact-detail-icon');
expect(contactCss).toMatch(
  /\.contact-layout\s*{[^}]*grid-template-columns:\s*minmax\(0,\s*2fr\)\s+minmax\(0,\s*3fr\);[^}]*grid-template-areas:\s*"intro form"\s*"details form";/s,
);
expect(contactCss).toMatch(
  /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.contact-layout\s*{[^}]*grid-template-areas:\s*"intro"\s*"form"\s*"details";/s,
);
```

- [ ] **Step 2: Run Contact tests to verify RED**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because Contact still has a separate hero, icon-led Headquarters card, two peer column wrappers, and the old H2 copy.

- [ ] **Step 3: Implement the three-region Contact markup**

Remove `Mail`, `Phone`, and `MapPin` from the Lucide import. Keep `Send`, `CheckCircle2`, and `AlertCircle`.

Replace the old hero and column wrappers with one section and three direct children of `.contact-layout` in this DOM order: introduction, form, Headquarters. This makes the DOM, keyboard, and mobile visual sequence identical.

```jsx
<section className="section contact-section">
  <div className="container contact-layout">
    <div className="contact-intro">
      <span className="section-subtitle contact-kicker">Contact</span>
      <h1 className="contact-title">Start a conversation.</h1>
      <p className="contact-description">
        For general enquiries, tell us what you need and how we can reach you.
        For a detailed project brief, use Work With Us in the header.
      </p>
    </div>

    <div className="contact-form-column">
      <div className="contact-form-panel">
        <h2 className="contact-section-heading contact-form-title">General enquiry</h2>
```

Move the complete conditional block currently at `Contact.jsx:162-295` byte-for-byte beneath the new H2, then close `.contact-form-panel` and `.contact-form-column`.

Add Headquarters as the third direct child:

```jsx
    <section className="contact-headquarters" aria-labelledby="headquarters-title">
      <h2 id="headquarters-title" className="contact-section-heading">Headquarters</h2>
      <div className="contact-details-list">
```

Move the existing three `.contact-detail-row` blocks into `.contact-details-list`, remove only their icon components, and keep their `h3`, address, telephone links, and email links unchanged. Close `.contact-details-list`, `.contact-headquarters`, `.contact-layout`, and `.contact-section` in that order. Do not alter form field names, options, validation, submission, Privacy notice, success state, or analytics.

- [ ] **Step 4: Replace Contact layout CSS**

Delete `.contact-hero`, `.contact-glass-top-border`, `.contact-grid-section`, `.contact-column`, `.contact-column-heading`, `.contact-details-panel`, `.contact-detail-icon`, and their desktop-compaction overrides. Use:

```css
.contact-page {
  position: relative;
  padding-top: 5rem;
}

.contact-section {
  padding: 2rem 0;
}

.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  grid-template-areas:
    "intro form"
    "details form";
  gap: 1.5rem 3rem;
  align-items: start;
  max-width: 1120px;
  margin: 0 auto;
}

.contact-intro {
  grid-area: intro;
}

.contact-kicker {
  display: block;
  margin-bottom: 0.75rem;
}

.contact-title {
  margin-bottom: 1rem;
  color: var(--text-heading);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.contact-description {
  max-width: 48ch;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.65;
}

.contact-headquarters {
  grid-area: details;
}

.contact-form-column {
  grid-area: form;
}

.contact-section-heading {
  margin: 0 0 1rem;
  color: var(--text-heading);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.contact-details-list {
  border-top: 1px solid var(--border-color);
}

.contact-detail-row {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.contact-form-panel {
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: #fff;
  box-shadow: var(--shadow-lg);
}

.contact-form-panel .form-group {
  margin-bottom: 0.75rem;
}

.contact-form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.contact-form-panel .form-input {
  min-height: 44px;
  padding: 0.625rem 0.875rem;
}

.contact-form-panel textarea.form-input {
  min-height: 72px;
}

.contact-submit-btn {
  width: 100%;
  min-height: 48px;
  margin-top: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
}

@media (max-width: 900px) {
  .contact-section {
    padding: 3rem 0;
  }

  .contact-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "intro"
      "form"
      "details";
    gap: 2rem;
  }
}

@media (max-width: 576px) {
  .contact-form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .contact-form-panel {
    padding: 1.25rem;
  }
}
```

Retain current `.contact-detail-info`, Privacy, success, honeypot, submit-error, and disabled-state rules. Remove icon-specific and obsolete column-order rules.

- [ ] **Step 5: Run Contact tests to verify GREEN**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: both files PASS, including payload, privacy, accessibility, analytics, success, and error tests.

- [ ] **Step 6: Check and commit Task 4**

Run:

```powershell
git diff --check -- src/pages/Contact.jsx src/pages/Contact.css src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
git add -- src/pages/Contact.jsx src/pages/Contact.css src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "feat: integrate premium Contact layout"
```

Expected: diff check exits 0 and the commit contains only Task 4 files.

---

### Task 5: Run release and live-browser validation

**Files:**
- Modify only if a validation finding is traced to an owning Task 1-4 file.
- Test: all existing automated suites and production artifacts.

**Interfaces:**
- Consumes: completed Tasks 1-4 and the approved design specification.
- Produces: verified local branch; no push, merge, or deployment.

- [ ] **Step 1: Run all automated release gates**

Run each command separately and require exit code 0:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run verify:html
npm.cmd audit
git diff --check
git status --short
```

Expected:

- ESLint has no errors.
- All Vitest files and tests pass.
- Vite prerenders nine pages, including `dist/404.html`.
- HTML verification reports eight public routes plus the production 404.
- npm reports zero vulnerabilities.
- diff check emits nothing.
- status is empty after any validation fix is committed to its owning task.

- [ ] **Step 2: Verify live page behavior at compact mobile sizes**

Using the in-app browser, hard-load and SPA-navigate `/`, `/marketing`, `/branding`, `/ecommerce`, `/brands`, and `/contact` at 390 x 844 and 768px wide.

For each width, verify:

- Home H1 wraps as two intentional statements without clipping.
- `Explore our capabilities` scrolls to `#capabilities`.
- one visible Work With Us Header action exists; no page-level modal action exists.
- each service hero shows one positioning paragraph and no empty CTA space.
- capability entries form one text-led column without icons or overflow.
- Contact order is introduction, General enquiry, Headquarters.
- mobile menu, FAQ accordion, Privacy links, focus, and reduced-motion behavior remain usable.
- no broken images or console warning/error appears.

- [ ] **Step 3: Verify Header breakpoint ownership**

At 1024, 1039, 1040, and 1100px widths, verify:

- desktop nav hidden and drawer control visible through 1039px;
- desktop nav visible and drawer control hidden from 1040px;
- exactly one visible Work With Us action at each width;
- no horizontal overflow.

- [ ] **Step 4: Verify desktop editorial geometry**

At 1280 x 720 and 1440 x 900:

- Home retains hero media and supporter strip without overflow.
- Marketing, Branding, and E-commerce heroes are 400px high and visually consistent.
- each capability grid is two columns with fine rules and no boxed surfaces/icons.
- Contact uses a 2:3 column ratio.
- Contact introduction, three Headquarters groups, every default form field, Privacy notice, and complete submit button are visible at 1280 x 720.
- all visible inputs are at least 44px high and the submit button is at least 48px high.
- `/brands` partnership action navigates to `/contact`.
- no console warning/error appears.

- [ ] **Step 5: Verify preserved production behavior**

Confirm in the production build and browser:

- all eight public routes hard-load;
- an unknown route renders Page Not Found with `noindex, follow`;
- `dist/404.html` exists;
- Contact and Work With Us retain their different field sets and Privacy links;
- no form is submitted during visual QA;
- no deployment, push, or merge occurs.

- [ ] **Step 6: Record final branch state**

Run:

```powershell
git log -6 --oneline
git status --short
```

Expected: the four implementation commits appear after the plan/spec commits and the worktree is clean.
