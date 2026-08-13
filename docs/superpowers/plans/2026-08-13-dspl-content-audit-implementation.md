# DSPL Content Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement every confirmed, publishable requirement from `DSPL Website Content.docx` while keeping unverified claims, invented proof, incomplete Blog content, and unapproved legal commitments off the public site.

**Architecture:** Preserve the current React 19/Vite prerendered application and centralized route metadata. Add explicit content-publication gates, reusable evidence-backed components, public and staged route separation, a shared project-planner form, and consent-aware analytics. Every source change is driven by a failing Vitest assertion, and the existing unknown-route client-render fallback remains intact.

**Tech Stack:** React 19, React Router 8, Vite 8 with `vite-prerender-plugin`, Vitest 4, Testing Library, React GA4, CSS modules-by-convention, Web3Forms, XML sitemap.

## Global Constraints

- Treat `docs/superpowers/specs/2026-08-13-dspl-content-audit-implementation-design.md` as the approved behavioral contract and `C:\Users\Pawan\Downloads\DSPL Website Content.docx` as the source copy.
- Do not render invented testimonials, names, companies, metrics, prices, service durations, FSSAI licence details, grant amounts, client counts, team biographies, supported languages, or trademark-registration claims.
- The allowed trademark statement is that the Raw Radicles application **has been filed**.
- Use 28 July 2022 as DSPL's incorporation date and keep the two existing phone numbers in their current business roles.
- Remove `dashapatmajasolutions@gmail.com` and every other Gmail address from public source and generated HTML.
- Keep `/blogs` and `/blogs/:slug` out of navigation, `PUBLIC_ROUTES`, prerender links, and the sitemap until two owner-approved posts exist.
- Do not regress mobile-drawer or modal focus management, reduced-motion behavior, FAQ server rendering, or unknown-route hydration.
- Do not commit, push, merge, or deploy. At every checkpoint, leave the worktree inspectable and uncommitted.

---

## Task 1: Add explicit publication gates and safe empty-state components

**Files:**

- Create: `src/content/publication.js`
- Create: `src/content/__tests__/publication.test.js`
- Create: `src/components/TestimonialsSection.jsx`
- Create: `src/components/PackagingGallery.jsx`
- Create: `src/components/__tests__/TestimonialsSection.test.jsx`
- Create: `src/components/__tests__/PackagingGallery.test.jsx`
- Create: `src/components/TestimonialsSection.css`
- Create: `src/components/PackagingGallery.css`

- [ ] **Step 1: Write failing publication-gate tests**

```js
import {
  BLOG_MINIMUM_POSTS,
  approvedTestimonials,
  blogPosts,
  blogsEnabled,
  packagingItems,
} from '../publication';

expect(BLOG_MINIMUM_POSTS).toBe(2);
expect(approvedTestimonials).toEqual([]);
expect(packagingItems).toEqual([]);
expect(blogPosts).toEqual([]);
expect(blogsEnabled).toBe(false);
```

Also assert that `blogsEnabled` comes from an exported pure `hasPublishableBlog(posts)` function so the two-post boundary can be tested with zero, one, and two approved records.

- [ ] **Step 2: Run the focused test and confirm the missing-module failure**

Run: `npm.cmd test -- src/content/__tests__/publication.test.js`

Expected: FAIL because `src/content/publication.js` does not exist.

- [ ] **Step 3: Implement the immutable publication model**

```js
export const BLOG_MINIMUM_POSTS = 2;
export const approvedTestimonials = Object.freeze([]);
export const packagingItems = Object.freeze([]);
export const blogPosts = Object.freeze([]);

export const hasPublishableBlog = (posts) =>
  posts.filter((post) => post.status === 'approved').length >= BLOG_MINIMUM_POSTS;

export const blogsEnabled = hasPublishableBlog(blogPosts);
```

Define the future record contracts in JSDoc without adding sample records: testimonial `{ quote, name, role, company, consentReference }`, packaging `{ image, backImage, sku, collection, description, alt }`, and blog post `{ slug, title, description, publishedAt, status, sections }`.

- [ ] **Step 4: Add failing component tests for honest empty behavior**

```jsx
const { container } = render(<TestimonialsSection testimonials={[]} />);
expect(container).toBeEmptyDOMElement();

render(<PackagingGallery items={[]} fallbackActionHref="/contact" />);
expect(screen.getByText(/Packaging imagery will be added after approved artwork is available/i)).toBeInTheDocument();
expect(screen.getByRole('link', { name: /discuss packaging/i })).toHaveAttribute('href', '/contact');
```

Add a positive fixture in each test file to prove headings, attribution, `alt`, optional back image, SKU, collection, and description render from passed data only.

- [ ] **Step 5: Run the component tests and confirm both fail**

Run: `npm.cmd test -- src/components/__tests__/TestimonialsSection.test.jsx src/components/__tests__/PackagingGallery.test.jsx`

Expected: FAIL because both components are missing.

- [ ] **Step 6: Implement the two presentation-only components**

`TestimonialsSection({ eyebrow = 'Client perspective', title = 'What collaborators say', testimonials })` must return `null` when `testimonials.length === 0`. `PackagingGallery({ items, fallbackActionHref })` must render `<article>` records only when real items exist and the approved fallback sentence otherwise. Neither component owns fallback testimonial content or placeholder images.

- [ ] **Step 7: Verify Task 1**

Run: `npm.cmd test -- src/content/__tests__/publication.test.js src/components/__tests__/TestimonialsSection.test.jsx src/components/__tests__/PackagingGallery.test.jsx`

Expected: PASS.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 2: Establish public, staged, and fallback route contracts

**Files:**

- Modify: `src/AppRoutes.jsx`
- Modify: `src/main.jsx`
- Modify: `src/hydrationRoute.js`
- Modify: `src/__tests__/hydrationRoute.test.js`
- Modify: `src/entry-prerender.jsx`
- Modify: `src/seo/routeMetadata.js`
- Modify: `src/seo/__tests__/routeMetadata.test.js`
- Modify: `vite.config.js`
- Modify: `scripts/verify-prerender.mjs`
- Modify: `public/sitemap.xml`
- Create: `src/pages/StartProject.jsx`
- Create: `src/pages/StartProject.css`
- Create: `src/pages/RawRadicles.jsx`
- Create: `src/pages/RawRadicles.css`
- Create: `src/pages/TermsOfUse.jsx`
- Create: `src/pages/TermsOfUse.css`
- Create: `src/pages/Blogs.jsx`
- Create: `src/pages/Blogs.css`
- Create: `src/pages/BlogPost.jsx`
- Create: `src/pages/__tests__/RouteStubs.test.jsx`

- [ ] **Step 1: Write failing metadata and structured-data tests**

Assert the exact public route set:

```js
expect(PUBLIC_ROUTES).toEqual([
  '/', '/about', '/brands', '/brands/raw-radicles', '/marketing',
  '/branding', '/ecommerce', '/contact', '/start', '/privacy', '/terms',
]);
expect(PUBLIC_ROUTES).not.toContain('/blogs');
expect(getRouteMetadata('/blogs').robots).toBe('noindex, follow');
expect(organizationStructuredData.brand).toEqual({
  '@type': 'Brand',
  name: 'Raw Radicles',
  url: 'https://dashapatmaja.in/brands/raw-radicles',
});
expect(organizationStructuredData.sameAs).toContain(
  'https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/',
);
```

Also assert unique titles, exact canonicals, and `index, follow` defaults for `/brands/raw-radicles`, `/start`, and `/terms`.

- [ ] **Step 2: Run metadata tests and confirm they fail**

Run: `npm.cmd test -- src/seo/__tests__/routeMetadata.test.js`

Expected: FAIL because the new routes and `brand` JSON-LD are absent.

- [ ] **Step 3: Extend centralized metadata without publishing Blog**

Add route records for `/brands/raw-radicles`, `/start`, `/terms`, and `/blogs`. Keep `/blogs` outside `PUBLIC_ROUTES`, with canonical `/blogs` and `robots: 'noindex, follow'`. Freeze the Raw Radicles `Brand` object inside `organizationStructuredData`. Do not add ratings, offers, prices, licences, testimonials, or performance metrics.

- [ ] **Step 4: Write failing hydration tests for all route classes**

Test the loader keys `RawRadicles`, `StartProject`, `TermsOfUse`, `Blogs`, and `BlogPost`. Add these boundary assertions:

```js
expect(shouldHydratePrerenderedPage(true, { StartProject }, '/start')).toBe(true);
expect(shouldHydratePrerenderedPage(true, { Blogs }, '/blogs')).toBe(false);
expect(shouldHydratePrerenderedPage(true, { BlogPost }, '/blogs/example')).toBe(false);
expect(shouldHydratePrerenderedPage(true, { NotFound }, '/missing')).toBe(false);
```

The `/blogs/example` loader may resolve `BlogPost`, but it must client-render because no staged Blog URL is prerendered.

- [ ] **Step 5: Run hydration tests and confirm the new assertions fail**

Run: `npm.cmd test -- src/__tests__/hydrationRoute.test.js`

Expected: FAIL because new loaders and pathname-aware hydration are missing.

- [ ] **Step 6: Implement route resolution and preserve the unknown-route repair**

Add exact paths to `pageByPath`, resolve `pathname === '/blogs'` to `Blogs`, resolve `pathname.startsWith('/blogs/')` to `BlogPost`, and keep all other unknown paths mapped to `NotFound`. Change the predicate signature to:

```js
export function shouldHydratePrerenderedPage(hasMarkup, pages, pathname) {
  const normalizedPath = normalizePath(pathname);
  return Boolean(
    hasMarkup &&
    pages &&
    !pages.NotFound &&
    PUBLIC_ROUTES.includes(normalizedPath),
  );
}
```

Update `src/main.jsx` to pass `window.location.pathname`; when false, preserve `container.replaceChildren()` before `createRoot(container).render(app)`.

- [ ] **Step 7: Add failing route-render tests, then create accessible page shells**

In `RouteStubs.test.jsx`, render each new page with a memory router and assert one unique `<h1>`, the correct SEO hook metadata, and no invented evidence. Initially expect failure because the pages do not exist. Then create page shells with these headings: `Raw Radicles`, `Start a Project`, `Terms of Use`, `Insights from building and supporting brands`, and a Blog post heading derived only from an approved record.

Run failing test: `npm.cmd test -- src/pages/__tests__/RouteStubs.test.jsx`

- [ ] **Step 8: Wire routes and prerender dependencies**

Add lazy imports and injectable page variables in `AppRoutes.jsx`. Register `/brands/raw-radicles`, `/start`, `/terms`, `/blogs`, and `/blogs/:slug` before `*`. Add only public page imports to `entry-prerender.jsx`. Add `/brands/raw-radicles`, `/start`, and `/terms` to `additionalPrerenderRoutes`, the verification route list, and sitemap. Do not add either Blog route to those locations.

- [ ] **Step 9: Verify Task 2**

Run: `npm.cmd test -- src/seo/__tests__/routeMetadata.test.js src/__tests__/hydrationRoute.test.js src/pages/__tests__/RouteStubs.test.jsx`

Expected: PASS with staged Blog still excluded from `PUBLIC_ROUTES`.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 3: Correct the global header, footer, and phone behavior

**Files:**

- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`
- Modify: `src/components/__tests__/Header.test.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.css`
- Modify: `src/components/__tests__/Footer.test.jsx`
- Modify: `src/components/PhoneObfuscated.jsx`
- Create: `src/components/__tests__/PhoneObfuscated.test.jsx`

- [ ] **Step 1: Write failing header tests**

Assert desktop and mobile navigation order, `/start` destination, and the closed Blog gate:

```jsx
for (const link of screen.getAllByRole('link', { name: 'Start a Project' })) {
  expect(link).toHaveAttribute('href', '/start');
}
expect(screen.queryByRole('link', { name: 'Blogs' })).not.toBeInTheDocument();
expect(screen.queryByRole('button', { name: /work with us/i })).not.toBeInTheDocument();
```

Retain the existing drawer Escape, focus trap, scroll lock, active state, and 1040px boundary assertions.

- [ ] **Step 2: Run the header test and confirm failure**

Run: `npm.cmd test -- src/components/__tests__/Header.test.jsx`

Expected: FAIL because the header still opens the modal.

- [ ] **Step 3: Replace header modal buttons with router links**

Use a single `navItems` array ordered Home, About, Brands, Marketing, Branding, E-commerce, optional Blogs, Contact. Include Blogs only when `blogsEnabled` is true. Render `Link to="/start"` for both CTA placements and remove `openWorkModal` from Header only.

- [ ] **Step 4: Write failing footer CTA-selection tests**

Export `getFooterCta(pathname)` and assert:

```js
expect(getFooterCta('/').href).toBe('/start');
expect(getFooterCta('/brands').href).toBe('/brands/raw-radicles');
expect(getFooterCta('/contact')).toBeNull();
expect(getFooterCta('/start')).toBeNull();
expect(getFooterCta('/privacy')).toBeNull();
expect(getFooterCta('/terms')).toBeNull();
expect(getFooterCta('/blogs')).toBeNull();
```

Add render assertions for incorporation date `28 July 2022`, CIN, MUTBI/MAHE, DST-NIDHI PRAYAS, Monday-Saturday hours, director email, Terms link, primary phone, and absence of Gmail.

- [ ] **Step 5: Run the footer test and confirm failure**

Run: `npm.cmd test -- src/components/__tests__/Footer.test.jsx`

Expected: FAIL on CTA routing and missing factual footer content.

- [ ] **Step 6: Implement route-keyed footer content**

Use `useLocation()` and an exported immutable `footerCtas` map. Add explicit CTA records for Home, About, Brands, Branding, Marketing, and E-commerce; return `null` elsewhere. Organize links under Services, Company, and Legal. Keep `mailto:director@dashapatmaja.in`, the office address, primary phone, and office hours accessible.

- [ ] **Step 7: Write the direct-phone regression test, then fix the component**

```jsx
render(<PhoneObfuscated number="+91 88619 42440" label="Call new enquiries" />);
const link = screen.getByRole('link', { name: 'Call new enquiries' });
expect(link).toHaveAttribute('href', 'tel:+918861942440');
expect(link).toHaveTextContent('+91 88619 42440');
expect(link).not.toHaveAttribute('href', '#phone');
```

Run failing test: `npm.cmd test -- src/components/__tests__/PhoneObfuscated.test.jsx`

Replace reversed source text, CSS direction tricks, and click-time `window.location` assignment with a normal `<a>` whose sanitized `tel:` value is derived by retaining a leading plus and digits only.

- [ ] **Step 8: Verify Task 3**

Run: `npm.cmd test -- src/components/__tests__/Header.test.jsx src/components/__tests__/Footer.test.jsx src/components/__tests__/PhoneObfuscated.test.jsx`

Expected: PASS, including existing focus-management tests.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 4: Implement the approved Home, About, and Brands content

**Files:**

- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.css`
- Modify: `src/pages/__tests__/Home.test.jsx`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.css`
- Modify: `src/pages/__tests__/About.test.jsx`
- Modify: `src/pages/Brands.jsx`
- Modify: `src/pages/Brands.css`
- Modify: `src/pages/__tests__/Brands.test.jsx`
- Modify home-section components under: `src/components/home/`

- [ ] **Step 1: Add failing Home content and evidence tests**

Assert both hero actions, the visible `Recognised and supported by` label, exactly four coordinated-service entries, links to `/branding#compliance` and `/ecommerce#compliance`, owned-experience proof before Process, all six process steps with non-empty duration and output labels, and expanded Raw Radicles responsibilities. Render `TestimonialsSection` with `approvedTestimonials` and prove there is no testimonial landmark while the list is empty.

Run: `npm.cmd test -- src/pages/__tests__/Home.test.jsx`

Expected: FAIL on the new structure and copy.

- [ ] **Step 2: Implement Home from the approved source copy**

Use the exact Home wording from the approved DOCX and preserve current responsive hero/media behavior. Model service cards and process steps as arrays. Each process step record must have `{ number, title, description, duration, output }`; the DOM labels must expose `Typical duration` and `Output`. Do not invent numbers in the proof section or testimonials.

- [ ] **Step 3: Add failing About tests**

Assert the 2022 milestone includes `28 July 2022`, the three replacement strategy blocks are `What we are`, `What we are building towards`, and `How we work`, the Manipal remote-delivery section exists, and `What we do not take on` exists. Assert all six existing team members still render and no empty biography element is created.

Run: `npm.cmd test -- src/pages/__tests__/About.test.jsx`

Expected: FAIL because the timeline starts in 2023 and the new sections are absent.

- [ ] **Step 4: Implement About without fabricating biographies**

Add optional `bio` support to team records and render it only when truthy. Preserve existing names, roles, images, and LinkedIn links unchanged. Add 2022 before the existing 2023-2026 sequence and remove any unsupported grant amount or client-count copy.

- [ ] **Step 5: Add failing Brands tests**

Assert DSPL ownership immediately follows the hero, trademark wording contains `application has been filed` and excludes `registered`, the owner/services-arm explanation exists, confirmed formulation/manufacturing facts remain, the vague portfolio pipeline is absent, the case-study link targets `/brands/raw-radicles`, and `PackagingGallery` receives `packagingItems`.

Run: `npm.cmd test -- src/pages/__tests__/Brands.test.jsx`

Expected: FAIL on ownership, trademark status, packaging fallback, and route link.

- [ ] **Step 6: Implement Brands with the empty packaging gate**

Use the exact approved source copy. Render no licence number and no `FSSAI licensed` claim. Pass the empty publication array to `PackagingGallery`; show only its honest artwork-unavailable sentence until real data is added.

- [ ] **Step 7: Verify Task 4**

Run: `npm.cmd test -- src/pages/__tests__/Home.test.jsx src/pages/__tests__/About.test.jsx src/pages/__tests__/Brands.test.jsx src/components/__tests__/TestimonialsSection.test.jsx src/components/__tests__/PackagingGallery.test.jsx`

Expected: PASS with no placeholder proof.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 5: Build the evidence-limited Raw Radicles case study

**Files:**

- Modify: `src/pages/RawRadicles.jsx`
- Modify: `src/pages/RawRadicles.css`
- Create: `src/pages/__tests__/RawRadicles.test.jsx`

- [ ] **Step 1: Write a failing evidence-boundary test**

Assert the page includes DSPL ownership, six `60 g` bars, three collections, real cacao, selected Ayurvedic botanicals, formulation partnership in Thrissur, manufacturing partnership in Kerala, and the six DSPL workstreams: formulation briefing, packaging, compliance coordination, photography, pricing, and route to market.

Add negative assertions against case-insensitive patterns `revenue`, `conversion`, `growth by`, `regulatory clearance`, `FSSAI licensed`, `registered trademark`, and `confidential cost`.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm.cmd test -- src/pages/__tests__/RawRadicles.test.jsx`

Expected: FAIL because the initial page shell lacks the project-overview content.

- [ ] **Step 3: Implement the case-study structure**

Build semantic sections for Overview, Product system, Partnerships, DSPL workstreams, and What is intentionally not disclosed. Link back to `/brands` and forward to `/start`. Frame the page as an expandable project overview and do not imply quantified results or regulatory approval.

- [ ] **Step 4: Verify Task 5**

Run: `npm.cmd test -- src/pages/__tests__/RawRadicles.test.jsx src/seo/__tests__/routeMetadata.test.js`

Expected: PASS with canonical metadata owned by the centralized route record.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 6: Expand the shared ServicePage and all three service configurations

**Files:**

- Modify: `src/components/ServicePage.jsx`
- Modify: `src/components/ServicePage.css`
- Modify: `src/components/__tests__/ServicePage.test.jsx`
- Modify: `src/pages/Branding.jsx`
- Modify: `src/pages/Marketing.jsx`
- Modify: `src/pages/Ecommerce.jsx`
- Modify: `src/pages/__tests__/ServiceCopy.test.jsx`

- [ ] **Step 1: Write failing shared-component tests**

Extend the fixture with optional `proof`, `engagements`, `compliance`, and `testimonials` props. Assert each section renders only when populated, compliance receives `id="compliance"`, all FAQ question and answer text exists in the initial DOM, and empty testimonials create no heading or landmark.

Run: `npm.cmd test -- src/components/__tests__/ServicePage.test.jsx`

Expected: FAIL because `ServicePage` only supports scope, offers, and FAQs.

- [ ] **Step 2: Implement additive ServicePage sections**

Use these interfaces:

```js
proof: { eyebrow, title, body, points: string[] }
engagements: { title, description, items: { title, text }[] }
compliance: { title, intro, items: { title, text }[], disclaimer }
testimonials: approvedTestimonials
```

Render sections in the order scope, offers, compliance, proof, engagements, testimonials, FAQs. `FAQAccordion` remains the renderer so answers stay in prerendered HTML.

- [ ] **Step 3: Write failing service-copy tests**

Branding must contain five capabilities, `id="compliance"`, the 2020 FSSAI Labelling and Display regulations, Legal Metrology Packaged Commodities rules, claims review, trademark coordination, barcode/GTIN scope, and exactly three approved FAQs.

Marketing must contain five capabilities, English-only language wording, a no-metrics Raw Radicles proof block, engagement shapes `Audit and plan`, `Monthly programme`, and `Launch sprint`, five approved FAQs, the no-guarantees answer, and the three-month minimum for ongoing programmes.

E-commerce must contain six capabilities, `id="compliance"`, GST configuration, HSN mapping, settlement reconciliation, e-way-bill process, returns policies, listing declarations, qualified-adviser disclaimer, and exactly three approved FAQs.

Across all three pages assert absence of `₹`, bracket placeholders, invented testimonials, and unapproved duration or price FAQ headings.

- [ ] **Step 4: Run service-copy tests and confirm failure**

Run: `npm.cmd test -- src/pages/__tests__/ServiceCopy.test.jsx`

Expected: FAIL on the richer capability, compliance, proof, engagement, and FAQ contracts.

- [ ] **Step 5: Update the three data configurations from the approved DOCX**

Use the exact approved wording and current regulatory names. Present DSPL as coordinating compliance work, not as a regulator, licence issuer, chartered accountant, or legal adviser. Pass `approvedTestimonials` to all three pages so nothing renders until evidence is supplied.

- [ ] **Step 6: Verify Task 6**

Run: `npm.cmd test -- src/components/__tests__/ServicePage.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/components/__tests__/FAQAccordion.test.jsx`

Expected: PASS and FAQ answers remain present before interaction.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 7: Extract a shared ProjectPlannerForm and complete `/start`

**Files:**

- Create: `src/components/ProjectPlannerForm.jsx`
- Create: `src/components/ProjectPlannerForm.css`
- Create: `src/components/__tests__/ProjectPlannerForm.test.jsx`
- Modify: `src/components/WorkWithUsModal.jsx`
- Modify: `src/components/WorkWithUsModal.css`
- Modify: `src/components/__tests__/WorkWithUsModal.test.jsx`
- Modify: `src/components/work-with-us/formModel.js`
- Modify: `src/components/work-with-us/__tests__/formModel.test.js`
- Modify: `src/pages/StartProject.jsx`
- Modify: `src/pages/StartProject.css`
- Create: `src/pages/__tests__/StartProject.test.jsx`

- [ ] **Step 1: Extend the form-model tests before touching JSX**

Add `Compliance` to the service options and assert `createInitialLead()` returns every detailed planner field with empty or default-safe values. Assert `validateLead()` requires full name, valid email, phone, at least one service, and privacy agreement if the approved form contains that checkbox. Keep attachment validation at 5 MB and the existing allowed extensions. Assert `createLeadPayload()` includes every displayed field, `source`, honeypot, and attachment.

Run: `npm.cmd test -- src/components/work-with-us/__tests__/formModel.test.js`

Expected: FAIL on the new service/payload contract.

- [ ] **Step 2: Implement pure form-model changes**

Export `PROJECT_SERVICES` as an immutable array containing Branding, Marketing, Social Media, Website, E-commerce, Compliance, and Other. Keep `FORM_SUBMISSION_ERROR` truthful for absent keys and rejected requests. Do not make the pure model depend on DOM or React state.

- [ ] **Step 3: Write failing shared-form behavior tests**

Render `ProjectPlannerForm idPrefix="planner" source="start-page"`. Assert unique label IDs, first-invalid-field focus, checkbox validation, file rejection, missing-key error banner, Web3Forms payload content, success live region, reset behavior, and `/privacy` link. Mock `fetch` for success and failure. Assert `trackEvent` is called only through the analytics utility.

Run: `npm.cmd test -- src/components/__tests__/ProjectPlannerForm.test.jsx`

Expected: FAIL because the shared component does not exist.

- [ ] **Step 4: Extract form state and submission into ProjectPlannerForm**

Use props `{ idPrefix, source, onSuccess }`. Prefix every control, error, and described-by ID so the modal and page can coexist safely. Keep honeypot silent-abort behavior, `aria-invalid`, associated errors, `role="alert"`, attachment limits, submit disabled state, and first-invalid focus. On success call `trackEvent({ category: 'project_planner', action: 'generate_lead', label: source })`.

- [ ] **Step 5: Convert WorkWithUsModal into a compatibility wrapper**

Retain open/close events, focus return, Escape handling, overlay click, scroll lock, and dialog focus trap. Replace its internal form implementation with `<ProjectPlannerForm idPrefix="modal" source="compatibility-modal" />`. Update existing modal tests to prove those wrapper behaviors still pass.

- [ ] **Step 6: Write and satisfy the Start page test**

Assert one `Start a Project` h1, introductory project-planner copy, the full shared form with `idPrefix="start"`, privacy link, and no modal dialog semantics.

Run failing test: `npm.cmd test -- src/pages/__tests__/StartProject.test.jsx`

Implement `StartProject.jsx` using `useSEO(getRouteMetadata('/start'))` and `<ProjectPlannerForm idPrefix="start" source="start-page" />`.

- [ ] **Step 7: Verify Task 7**

Run: `npm.cmd test -- src/components/work-with-us/__tests__/formModel.test.js src/components/__tests__/ProjectPlannerForm.test.jsx src/components/__tests__/WorkWithUsModal.test.jsx src/pages/__tests__/StartProject.test.jsx`

Expected: PASS with one shared implementation.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 8: Expand Contact and its Web3Forms payload

**Files:**

- Modify: `src/pages/Contact.jsx`
- Modify: `src/pages/Contact.css`
- Modify: `src/pages/__tests__/Contact.test.jsx`
- Create: `src/pages/contactFormModel.js`
- Create: `src/pages/__tests__/contactFormModel.test.js`

- [ ] **Step 1: Write failing pure Contact-form tests**

Define and test `createInitialContact()`, `validateContact(data)`, and `createContactPayload(data, accessKey)`. The model includes first name, last name, email, company/brand, phone, website/social handle, help type, optional budget band, message, and honeypot. Help choices include Branding, Marketing, E-commerce, Compliance, and Other. Assert all displayed values enter the Web3Forms payload.

Run: `npm.cmd test -- src/pages/__tests__/contactFormModel.test.js`

Expected: FAIL because the module does not exist.

- [ ] **Step 2: Implement the pure Contact model**

Require first name, email, help type, and message; validate optional phone and website only when provided. Preserve silent honeypot behavior in the page handler. Keep the error string truthful when `VITE_WEB3FORMS_ACCESS_KEY` is missing.

- [ ] **Step 3: Extend the page test before implementation**

Assert one-working-day response copy, office address, Monday-Saturday hours, `New enquiries` paired with `tel:+918861942440`, `Existing projects` paired with `tel:+919072556665`, no WhatsApp label, no Gmail, all new form controls, `/start` inline link, privacy link, first-invalid focus, Web3Forms success/failure behavior, and absence of the global footer CTA at `/contact`.

Run: `npm.cmd test -- src/pages/__tests__/Contact.test.jsx`

Expected: FAIL on contact details and added controls.

- [ ] **Step 4: Implement Contact using the pure model and direct phones**

Use `PhoneObfuscated` only as the corrected direct-link presenter or rename it to `PhoneLink` and update every import atomically. Do not label either number as WhatsApp. Submit all new values to Web3Forms, expose errors accessibly, focus the first invalid control, and retain the success/error live regions.

- [ ] **Step 5: Verify Task 8**

Run: `npm.cmd test -- src/pages/__tests__/contactFormModel.test.js src/pages/__tests__/Contact.test.jsx src/components/__tests__/PhoneObfuscated.test.jsx`

Expected: PASS with no Gmail text in the rendered page.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 9: Gate Analytics consent and implement Privacy and Terms

**Files:**

- Modify: `src/utils/analytics.js`
- Create: `src/utils/__tests__/analytics.test.js`
- Modify: `src/components/AnalyticsTracker.jsx`
- Create: `src/components/__tests__/AnalyticsTracker.test.jsx`
- Create: `src/components/CookieNotice.jsx`
- Create: `src/components/CookieNotice.css`
- Create: `src/components/__tests__/CookieNotice.test.jsx`
- Modify: `src/AppRoutes.jsx`
- Modify: `src/pages/PrivacyPolicy.jsx`
- Modify: `src/pages/PrivacyPolicy.css`
- Modify: `src/pages/__tests__/PrivacyPolicy.test.jsx`
- Modify: `src/pages/TermsOfUse.jsx`
- Modify: `src/pages/TermsOfUse.css`
- Create: `src/pages/__tests__/TermsOfUse.test.jsx`

- [ ] **Step 1: Write failing analytics-consent unit tests**

Mock `react-ga4` and localStorage. Require these exports and values:

```js
export const ANALYTICS_CONSENT_KEY = 'dspl.analytics-consent';
export const ANALYTICS_CONSENT_EVENT = 'dspl:analytics-consent';
// getAnalyticsConsent() returns 'granted', 'denied', or null
// setAnalyticsConsent(value) accepts only 'granted' or 'denied'
```

Assert `initGA`, `trackPageView`, and `trackEvent` do not call ReactGA before consent or after decline, and do initialize/send after consent. In development they may log but must still respect decline. Add `resetAnalyticsForTests()` to reset module initialization without production-side effects.

Run: `npm.cmd test -- src/utils/__tests__/analytics.test.js`

Expected: FAIL because consent utilities do not exist and GA initializes without a stored choice.

- [ ] **Step 2: Implement the consent-aware utility**

Store only `granted` or `denied`. `setAnalyticsConsent` writes localStorage and dispatches `new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value })`. Every tracking function returns before touching ReactGA unless consent is `granted`. Do not auto-promote a missing choice.

- [ ] **Step 3: Write failing CookieNotice and tracker tests**

Cookie tests assert the banner appears only when no choice exists, exposes `Allow analytics`, `Decline`, and `/privacy`, persists each choice, dispatches the consent event, and disappears after selection. Tracker tests assert an already-granted visit initializes once and tracks location changes; a newly granted choice initializes and tracks the current path; declined or missing consent sends nothing.

Run: `npm.cmd test -- src/components/__tests__/CookieNotice.test.jsx src/components/__tests__/AnalyticsTracker.test.jsx`

Expected: FAIL because the prompt and event-aware tracker are absent.

- [ ] **Step 4: Implement CookieNotice and update AnalyticsTracker**

Mount `<CookieNotice />` once in `AppRoutes.jsx` after the app shell. In `AnalyticsTracker`, listen for `ANALYTICS_CONSENT_EVENT`, call `initGA()` and `trackPageView(currentPath)` only on `granted`, and remove the listener on cleanup. Avoid double page views when consent was already granted during initial mount.

- [ ] **Step 5: Write failing Privacy content tests**

Assert coverage of the DPDP Act 2023 without saying every provision is in force, Contact and Start data categories, Web3Forms processing, Web3Forms US-East location and periodic server-log deletion description, Google Analytics cookies/identifiers, the official Google opt-out URL, access/correction/erasure requests via `director@dashapatmaja.in`, consent controls, and correct phone link. Assert absence of `Grievance Officer`, a fixed DSPL enquiry-retention promise, and Gmail.

Run: `npm.cmd test -- src/pages/__tests__/PrivacyPolicy.test.jsx`

Expected: FAIL on the expanded notice.

- [ ] **Step 6: Implement the evidence-limited Privacy page**

Use careful present-tense wording and link to Web3Forms documentation and Google's official opt-out instructions. Separate DSPL's operational statements from processor documentation. Do not claim India-only storage or guaranteed immediate deletion.

- [ ] **Step 7: Write failing Terms tests, then implement restrained Terms**

Assert informational use, no automatic client relationship, signed proposal/agreement precedence, intellectual property, prohibited misuse, external links, reasonable accuracy/availability limits, Indian law, Karnataka venue, and director email. Assert the page contains no sweeping `all liability`, `as is`, or `indemnify us against any` clause.

Run failing test: `npm.cmd test -- src/pages/__tests__/TermsOfUse.test.jsx`

Implement semantic sections and centralized `/terms` SEO metadata.

- [ ] **Step 8: Verify Task 9**

Run: `npm.cmd test -- src/utils/__tests__/analytics.test.js src/components/__tests__/CookieNotice.test.jsx src/components/__tests__/AnalyticsTracker.test.jsx src/pages/__tests__/PrivacyPolicy.test.jsx src/pages/__tests__/TermsOfUse.test.jsx`

Expected: PASS with no ReactGA call before affirmative consent.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 10: Complete the staged Blog architecture without publishing articles

**Files:**

- Modify: `src/pages/Blogs.jsx`
- Modify: `src/pages/Blogs.css`
- Modify: `src/pages/BlogPost.jsx`
- Create: `src/pages/BlogPost.css`
- Create: `src/pages/__tests__/Blogs.test.jsx`
- Create: `src/pages/__tests__/BlogPost.test.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/__tests__/Header.test.jsx`
- Modify: `src/seo/routeMetadata.js`
- Modify: `src/hooks/useSEO.js`
- Modify: `src/hooks/__tests__/useSEO.test.jsx`

- [ ] **Step 1: Write failing Blog gate and index tests**

With the real empty `blogPosts`, assert `/blogs` renders the preparation message, no article cards, no fake excerpts, and `noindex, follow` metadata. With an injected single approved post, it must remain closed. With two injected approved posts, assert category filters and real data-backed cards render. Accept posts through a testable `posts` prop defaulting to `blogPosts`.

Run: `npm.cmd test -- src/pages/__tests__/Blogs.test.jsx`

Expected: FAIL because the shell does not implement the publication gate.

- [ ] **Step 2: Implement the staged index**

Use `hasPublishableBlog(posts)` as the only publication switch. The closed state must not suggest that articles are already published. The open state derives categories, titles, descriptions, dates, and links exclusively from approved records.

- [ ] **Step 3: Write failing BlogPost resolution tests**

With an empty list or unknown slug, assert the normal `NotFound` page renders. With fewer than two approved posts, even a matching slug remains unavailable. With two approved posts and a matching slug, render its title, description, published date, and semantic section headings from the record. Do not use `dangerouslySetInnerHTML`.

Run: `npm.cmd test -- src/pages/__tests__/BlogPost.test.jsx`

Expected: FAIL because slug resolution and availability checks are absent.

- [ ] **Step 4: Implement safe slug rendering and dynamic SEO**

Use `useParams()` and strict equality on normalized record slugs. Add a `createBlogPostMetadata(post)` helper that returns canonical `/blogs/${post.slug}`, article type, title, description, and `noindex, follow` until the overall Blog gate is open. Render sections as React nodes from structured `{ heading, paragraphs }` data.

- [ ] **Step 5: Prove the closed gate stays out of global discovery**

Add assertions that Header omits Blogs when `blogsEnabled === false`, `PUBLIC_ROUTES` omits Blogs, `public/sitemap.xml` contains no `/blogs`, and `entry-prerender.jsx` returns no Blog link. Include a future-gate unit test that two approved records make `hasPublishableBlog` true without changing production fixtures.

- [ ] **Step 6: Verify Task 10**

Run: `npm.cmd test -- src/content/__tests__/publication.test.js src/pages/__tests__/Blogs.test.jsx src/pages/__tests__/BlogPost.test.jsx src/components/__tests__/Header.test.jsx src/seo/__tests__/routeMetadata.test.js src/hooks/__tests__/useSEO.test.jsx`

Expected: PASS while production Blog data remains empty and unindexed.

Checkpoint: run `git diff --check`; leave changes unstaged and uncommitted.

---

## Task 11: Diagnose and normalize scrolling and motion across every page

**Files:**

- Modify: `src/pages/About.jsx`
- Modify: `src/pages/__tests__/About.test.jsx`
- Inspect: `src/pages/About.css`
- Inspect: `src/pages/Brands.jsx`
- Inspect: `src/components/Header.jsx`
- Inspect: `src/components/home/SupporterStrip.jsx`
- Inspect: `src/components/RotatingHeroMedia.jsx`
- Inspect: `src/index.css`
- Inspect: all public page CSS files
- Modify only when evidence identifies a violation: the inspected motion source and its existing focused test

- [ ] **Step 1: Reproduce About against every route with identical input**

Build and serve the production output, clear stored scroll positions, then apply five identical `wheel` inputs of `deltaY: 600` at 100 ms intervals on `/`, `/about`, `/brands`, `/brands/raw-radicles`, `/marketing`, `/branding`, `/ecommerce`, `/contact`, `/start`, `/privacy`, and `/terms` at 390×844 and 1366×768.

Record start/end `window.scrollY`, unexpected jumps, scroll-linked header state, reveal timing, and whether the issue is actual document displacement or only the perceived speed of About's reveal animations. The same input should produce route-to-route displacement within 5% after accounting for a page reaching its maximum scroll position.

- [ ] **Step 2: Add a failing test for About's duplicated navigation scroll**

The application already mounts the global `ScrollToTop`; About must not start a second smooth scroll whenever it renders without a hash. Extend `About.test.jsx` with:

```jsx
renderAbout('/about');
expect(window.scrollTo).not.toHaveBeenCalledWith({
  top: 0,
  behavior: 'smooth',
});
```

Keep a separate hash test proving `/about#team` calls the team's `scrollIntoView` once with `block: 'start'`, and prove reduced-motion mode changes hash scrolling to `behavior: 'auto'`.

- [ ] **Step 3: Run the About test and confirm the redundant-scroll assertion fails**

Run: `npm.cmd test -- src/pages/__tests__/About.test.jsx`

Expected: FAIL because the current About effect calls a smooth `window.scrollTo` in its no-hash branch.

- [ ] **Step 4: Remove only the redundant About top-scroll behavior**

Keep the effect for valid hash anchors, clear its 100 ms timer during cleanup, and remove the no-hash `window.scrollTo` branch. Let the existing global `ScrollToTop` own route navigation. Do not introduce a custom wheel multiplier, scroll-duration polyfill, or new animation library.

- [ ] **Step 5: Audit motion implementation against the performance rules**

Confirm one-shot page reveals animate only `transform` and `opacity`; reduced-motion paths eliminate movement; rotating hero intervals stop when hidden; the supporter marquee pauses through its existing visibility/reduced-motion behavior; and no page reads `scrollTop`, `scrollY`, layout geometry, or computed styles repeatedly to drive content animation.

The header's existing passive scroll/requestAnimationFrame code is inspected separately. Change it only if the production trace shows frame drops or repeated main-thread work during the reproduction. If it is the cause, replace the scrolled-state threshold with an `IntersectionObserver` sentinel and remove continuous scroll polling; preserve drawer state, focus, and reduced-motion tests.

- [ ] **Step 6: Normalize About reveal timing only if the measured scroll distance is normal but perceived speed is not**

If About scroll displacement matches other routes yet its sections appear too fast, use a shared About reveal transition of 650 ms for direction cards, milestones, and team cards, with 70 ms stagger capped at 210 ms. Keep hero entrance at 800 ms. Continue using opacity and translate transforms only. In reduced-motion mode use zero movement and a maximum 150 ms opacity transition.

Add assertions around exported pure helpers `getAboutRevealTransition(prefersReducedMotion, index)` and `getAboutRevealInitial(prefersReducedMotion, y)` so the normal, capped-stagger, and reduced-motion contracts do not rely on snapshots.

If measured displacement itself differs by more than 5%, do not apply timing changes as a substitute; identify and test the route-specific event handler or CSS rule causing the difference.

- [ ] **Step 7: Replace any confirmed broad transition on a scrolling surface**

For each confirmed violation found during tracing, first add a focused source or component regression, then replace `transition: all` with the exact changed properties. Do not mechanically rewrite hover transitions that are unrelated to the trace. Never animate layout dimensions, large-surface blur, or inherited motion variables.

- [ ] **Step 8: Verify Task 11**

Run: `npm.cmd test -- src/pages/__tests__/About.test.jsx src/components/__tests__/Header.test.jsx src/components/__tests__/RotatingHeroMedia.test.jsx src/pages/__tests__/Home.test.jsx`

Repeat the identical-input production comparison at both viewports. Expected: About no longer starts a duplicate smooth scroll; actual wheel displacement is consistent across routes; perceived reveal speed is comfortable and consistent; reduced-motion mode has no spatial movement; no new long animation frames appear.

Checkpoint: save the route-by-route observations for the final handoff, run `git diff --check`, and leave changes unstaged and uncommitted.

---

## Task 12: Add source-wide evidence regressions and run the release gate

**Files:**

- Modify: `src/__tests__/canonicalNaming.test.js`
- Modify: `src/__tests__/designSystemRegression.test.js`
- Create: `src/__tests__/contentEvidenceRegression.test.js`
- Modify: `scripts/verify-prerender.mjs`
- Inspect: `dist/`
- Inspect: all touched source and test files

- [ ] **Step 1: Write the source-wide content evidence regression**

Scan public source files and assert absence of:

```txt
dashapatmajasolutions@gmail.com
registered trademark
FSSAI licensed
[Price]
[Duration]
[Name]
[Company]
```

Add narrowly scoped allowlists for legitimate code comments or negative test fixtures; never weaken the scan to a blanket directory exclusion. Assert the exact allowed trademark phrase `trademark application has been filed` appears on Brands.

- [ ] **Step 2: Run the regression test and remove every real violation**

Run: `npm.cmd test -- src/__tests__/contentEvidenceRegression.test.js src/__tests__/canonicalNaming.test.js src/__tests__/designSystemRegression.test.js`

Expected before cleanup: FAIL on any remaining legacy Gmail, reversal styling, placeholder copy, or unsupported claim. Fix only confirmed violations and rerun to PASS.

- [ ] **Step 3: Run asset-generation tests**

Run: `npm.cmd test -- scripts/__tests__`

Expected: PASS. If no matching asset tests exist, record that fact and run the complete suite rather than claiming a separate asset gate passed.

- [ ] **Step 4: Run lint**

Run: `npm.cmd run lint`

Expected: zero errors. Distinguish any pre-existing untouched warning from a touched-file regression and fix all touched-file issues.

- [ ] **Step 5: Run the complete test suite**

Run: `npm.cmd test`

Expected: all files and tests pass with zero failures.

- [ ] **Step 6: Build and verify every prerendered route**

Run: `npm.cmd run build`

Then: `npm.cmd run verify:html`

Expected: the verifier reports 11 prerendered public routes plus the production 404; every output has a non-empty main, unique title, canonical, robots policy, and Organization JSON-LD with Raw Radicles Brand data.

- [ ] **Step 7: Prove no public source maps exist**

Run: `Get-ChildItem -LiteralPath 'dist' -Recurse -File -Filter '*.map'`

Expected: no output.

- [ ] **Step 8: Run the dependency vulnerability gate**

Run: `npm.cmd audit --audit-level=high`

Expected: exit 0 with no high or critical vulnerabilities. If registry access is blocked, request network approval and rerun; do not report an unexecuted audit as passed.

- [ ] **Step 9: Check patch integrity and publication exclusions**

Run: `git diff --check`

Run: `git status --short`

Run: `rg -n -i "dashapatmajasolutions@gmail\.com|registered trademark|FSSAI licensed|\[(price|duration|name|company)\]" src public scripts`

Run: `rg -n "/blogs" public/sitemap.xml vite.config.js scripts/verify-prerender.mjs`

Expected: no whitespace errors; only intentional uncommitted files; no forbidden public content; no staged Blog discovery or prerender entry.

- [ ] **Step 10: Run responsive browser QA against the production preview**

Start: `npm.cmd run preview -- --host 127.0.0.1 --port 4173`

Inspect `/`, `/about`, `/brands`, `/brands/raw-radicles`, `/marketing`, `/branding`, `/ecommerce`, `/contact`, `/start`, `/privacy`, `/terms`, `/blogs`, and `/missing-evidence-route` at 390×844, 768×1024, 1366×768, and 1536×864.

Verify: no horizontal overflow; header drawer focus and Escape; `/start` form keyboard flow; direct phone links; footer CTA suppression; cookie allow/decline behavior with cleared storage; FAQs readable without animation dependency; direct navigation to every public route; Blog closed and unlinked; unknown route shows Not Found with no hydration warning.

- [ ] **Step 11: Produce the owner-input handoff**

Report these deferred inputs exactly: four approved testimonials with consent; FSSAI licence number; service prices and durations; six factual team biographies; supported regional languages; named Grievance Officer; DSPL enquiry-retention period; two completed approved Blog posts; trademark class/application number if public; verified grant/client/performance evidence if public; and confirmation of which phone supports WhatsApp.

Include fresh command results, responsive QA evidence, remaining risks, and an explicit statement that nothing was committed, pushed, merged, or deployed.
