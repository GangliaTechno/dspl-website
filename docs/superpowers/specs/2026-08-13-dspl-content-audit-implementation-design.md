# DSPL Content Audit Implementation Design

**Date:** 13 August 2026
**Source:** `C:\Users\Pawan\Downloads\DSPL Website Content.docx`
**Repository:** `E:\For website\dspl website`
**Approved direction:** staged, evidence-led implementation

## Purpose

Implement the confirmed, publishable recommendations in the 38-page DSPL website content document while preventing unverified claims, invented testimonials, empty placeholders, and unapproved legal commitments from reaching public pages.

The work preserves the current React/Vite visual system, prerender architecture, accessibility safeguards, responsive behavior, and unknown-route hydration contract. It changes information architecture, page copy, reusable content structures, forms, privacy behavior, metadata, and validation only where required by the approved content direction.

## Non-negotiable publishing rules

- Do not publish invented testimonials, names, companies, performance figures, prices, service durations, FSSAI licence numbers, trademark registration claims, grant amounts, client counts, regional-language claims, or team biographies.
- Describe the Raw Radicles trademark as **filed**, never **registered**, until documentary evidence supports a change.
- Use 28 July 2022 as DSPL's incorporation date.
- Retain the two existing phone numbers and render them in the correct order as real `tel:` links.
- Remove the Gmail address from every public page.
- Use current regulatory names, including the Food Safety and Standards (Labelling and Display) Regulations, 2020 and the Legal Metrology (Packaged Commodities) Rules, 2011.
- Present DSPL as coordinating compliance work, not acting as a regulator, licensing authority, chartered accountant, or legal adviser.
- Keep the Blog out of public navigation, sitemap, and indexing until at least two completed, owner-approved posts exist.
- Do not commit, push, merge, or deploy unless separately authorized.

## Information architecture

### Public routes

The public, prerendered route set becomes:

- `/`
- `/about`
- `/brands`
- `/brands/raw-radicles`
- `/marketing`
- `/branding`
- `/ecommerce`
- `/contact`
- `/start`
- `/privacy`
- `/terms`
- `/404.html`

Each public route receives deterministic title, description, canonical URL, Open Graph data, Twitter data, robots policy, and JSON-LD from the existing centralized metadata system.

### Staged Blog route

Implement `/blogs` and the data-backed `/blogs/:slug` route in code. While fewer than two approved posts exist, `/blogs` remains unlinked, excluded from `PUBLIC_ROUTES` and the sitemap, and marked `noindex, follow`; any unknown or unavailable slug renders the normal Not Found page. The staged index must not display invented excerpts or imply that published articles exist.

### Project-planner route

`/start` becomes the durable, shareable project-planner URL used by the header and page calls to action. The existing Work With Us modal may remain as a compatibility wrapper, but it is no longer the only way to reach the project form. The form model and submission behavior should be shared rather than duplicated.

## Global shell

### Header

- Navigation order: Home, About, Brands, Marketing, Branding, E-commerce, Blogs when enabled, Contact.
- Replace the Work With Us button with a `Link` labelled **Start a Project** pointing to `/start`.
- Preserve desktop/mobile active states, drawer focus trapping, Escape handling, scroll locking, and reduced-width behavior.
- Do not show Blogs while the blog publication gate is closed.

### Footer

- Replace the generic company description with the approved owned-brand and services positioning.
- Add incorporation date, CIN, MUTBI/MAHE incubation, and DST-NIDHI PRAYAS support.
- Include the office address, director email, primary phone `tel:` link, and Monday-Saturday office hours.
- Organize links under Services, Company, and Legal; include Privacy Policy and Terms of Use.
- Use a route-keyed closing call-to-action configuration for Home, About, Brands, Branding, Marketing, and E-commerce.
- Suppress the closing CTA on Contact, Start, Privacy, Terms, and staged Blog pages.

### Phone behavior

Replace the reversed-text/CSS phone obfuscation with truthful visible text and direct `tel:` URLs. Preserve accessible call labels. The source order, copied text, screen-reader output, and mobile behavior must all agree.

## Page designs

### Home

- Replace the hero with the owned-brand-led headline and supporting copy.
- Add **Start a project** and **See how we built Raw Radicles** actions.
- Give the supporter strip a visible **Recognised and supported by** label.
- Expand coordinated services to four entries: Branding, Marketing, E-commerce, Compliance support.
- Link compliance to the anchored sections on Branding and E-commerce.
- Add the owned-experience proof section before the process.
- Add duration and named-output fields to all six process steps.
- Add a reusable testimonial section interface, but render nothing until real approved entries exist.
- Expand the Raw Radicles ownership block with confirmed formulation-to-market responsibilities.

### About

- Replace generic Vision/Mission/Values cards with What we are, What we are building towards, and How we work.
- Add the 2022 incorporation milestone while retaining 2023-2026 milestones.
- Keep unconfirmed grant amounts and client counts out of rendered text.
- Preserve the six current team names, roles, images, and LinkedIn links.
- Add optional biography support to team cards, but render no fabricated biographies.
- Add the Manipal remote-delivery section.
- Add the What we do not take on section.

### Brands

- Add the unambiguous ownership statement directly below the hero.
- State that the Raw Radicles trademark application has been filed.
- Add the brand-owner/services-arm explanation.
- Keep confirmed Raw Radicles product, formulation, manufacturing, and Ayurvedic-partnership facts.
- Do not publish an FSSAI licence number or an `FSSAI licensed` claim until the number is supplied and verified.
- Model packaging items as data with image, optional back image, SKU, collection, description, and alt text.
- When no artwork exists, render the approved honest sentence instead of visual placeholders.
- Remove the vague portfolio-in-development section because no category is confirmed.
- Link to `/brands/raw-radicles`.

### Raw Radicles case study

Build an evidence-limited case-study page from facts already approved in the source document:

- DSPL ownership and incorporation context.
- Six 60 g bars across three collections.
- Real cacao and selected Ayurvedic botanicals.
- Formulation partnership in Thrissur and manufacturing partnership in Kerala.
- DSPL workstreams: formulation briefing, packaging, compliance coordination, photography, pricing, and route to market.

Do not claim quantified results, confidential costs, regulatory clearance, or reversed decisions without supplied evidence. The page should openly function as a project overview that can be expanded later.

### Branding

- Use the approved hero, intro, and five capabilities.
- Add `id="compliance"` with cautious FSSAI, labelling, Legal Metrology, claims-review, trademark-coordination, and barcode/GTIN scope.
- Use the three fully specified FAQs.
- Omit cost and duration FAQs until real numbers are approved.
- Do not render the placeholder testimonial.

### Marketing

- Use the approved hero, intro, and five capabilities, with language support limited to English until additional languages are confirmed.
- Add an honest Raw Radicles marketing proof block without numbers or performance claims.
- Add Audit and plan, Monthly programme, and Launch sprint engagement shapes without placeholder prices or durations.
- Use all five completed FAQs, including the no-guarantees answer and three-month minimum for ongoing programmes.
- Do not render the placeholder testimonial.

### E-commerce

- Use the approved hero, intro, and six capabilities.
- Add `id="compliance"` covering GST configuration, HSN mapping, settlement reconciliation, e-way-bill process, returns policies, and listing declarations.
- State that tax and legal advice remains with the client's qualified advisers.
- Use the three fully specified FAQs.
- Omit cost and duration FAQs until real figures are approved.
- Do not render the placeholder testimonial.

### Contact

- Use the approved one-working-day response copy.
- Show office address and hours.
- Label the retained numbers as New enquiries and Existing projects.
- Do not label either number WhatsApp without confirmation.
- Remove the Gmail address.
- Extend the form with company/brand, phone/WhatsApp, website/social handle, Compliance service, and optional budget band.
- Submit the added values to Web3Forms.
- Add an inline `/start` project-planner link.
- Suppress the footer CTA.

### Start a Project

- Present the current detailed project-planner fields on a full page.
- Share validation, Web3Forms payload construction, attachment limits, success/error states, privacy notice, and first-invalid-field focus with the compatibility modal.
- Keep truthful submission failure behavior when the Web3Forms access key is absent or the network rejects the request.

### Privacy

- Reference the Digital Personal Data Protection Act, 2023 without claiming that every phased provision is already in force.
- Describe the categories collected by Contact and Start forms.
- Explain Web3Forms processing and Google Analytics measurement.
- Add access, correction, and erasure request instructions through `director@dashapatmaja.in`.
- Add Google Analytics cookie/identifier information and link to Google's opt-out instructions.
- Explain that Web3Forms documents US-East processing and periodic deletion of server logs.
- Gate Google Analytics initialization behind a clear accept/decline cookie notice.
- Do not name a Grievance Officer or publish a fixed DSPL enquiry-retention period until DSPL authorizes those operational commitments.
- Fix the phone link through the global phone component.

### Terms

Add a restrained Terms of Use page covering:

- informational website use;
- no automatic client relationship;
- signed proposals or agreements controlling paid engagements;
- intellectual-property ownership;
- prohibited misuse;
- external links;
- reasonable accuracy and availability limitations;
- applicable Indian law and Karnataka venue language;
- contact details.

The page must avoid aggressive warranty waivers or liability exclusions that require bespoke legal drafting.

## Analytics consent design

Add a compact cookie notice that appears when no choice is stored. It provides **Allow analytics**, **Decline**, and a Privacy Policy link. Store only the consent choice locally. Google Analytics must not initialize or receive page/event data until consent is affirmative. Changing or clearing browser storage allows the visitor to revisit the choice.

The analytics utilities expose explicit consent-aware initialization and tracking behavior. Existing form-success tracking must use the same consent gate rather than calling `window.gtag` directly.

## Metadata and structured data

- Keep one metadata definition per route in `src/seo/routeMetadata.js`.
- Add Raw Radicles through the Organization `brand` property with `@type: Brand`, its name, and canonical case-study URL.
- Retain DSPL LinkedIn in `sameAs`.
- Do not add testimonials, ratings, prices, licences, or performance metrics to JSON-LD.
- Add Blog metadata only as non-indexable staged metadata until publication.
- Update sitemap and prerender verification for the public route set.
- Preserve the stable `/404.html` canonical and unknown-route hydration behavior.

## Reusable component boundaries

- `ProjectPlannerForm`: owns detailed project form state, validation, submission, focus, and success/error UI.
- `WorkWithUsModal`: compatibility wrapper that opens/closes and hosts `ProjectPlannerForm`.
- `TestimonialsSection`: accepts approved testimonial records and returns `null` for an empty array.
- `PackagingGallery`: accepts validated packaging records and renders the honest fallback when empty.
- `CookieNotice`: owns the consent prompt only.
- Analytics utilities: own consent storage, initialization, and event/page gating.
- `Footer`: selects CTA content from a route-keyed configuration.

## Error handling and accessibility

- Preserve form honeypots and attachment limits.
- Focus the first invalid form control.
- Expose errors through associated text and live regions.
- Preserve modal and mobile-drawer focus traps.
- Ensure staged empty components do not create empty landmarks or headings.
- Keep direct phone and email links keyboard and screen-reader accessible.
- Use visible focus styles and reduced-motion behavior already present in the design system.
- Render all FAQs in prerendered HTML; JavaScript controls disclosure only.

## Test strategy

Implementation follows red-green-refactor cycles. Tests must fail for the missing behavior before production code is changed.

Required coverage includes:

- new route resolution, hydration loaders, and prerender metadata;
- public/staged route separation;
- header `/start` navigation and conditional Blogs visibility;
- footer route-specific CTA selection and Contact suppression;
- direct `tel:` phone links and removal of reversed source text;
- 2022 timeline and approved page copy;
- empty testimonial and packaging fallback behavior;
- Contact fields, validation, payload values, privacy text, and focus behavior;
- shared project-planner validation and submission behavior;
- consent accept/decline persistence and Analytics gating;
- Privacy, Terms, Organization/Brand JSON-LD, sitemap, and prerender output;
- absence of placeholder testimonials, Gmail, bracket tokens, `registered` trademark wording, and unsupported public claims.

## Release verification

The final gate is freshly executed after implementation:

1. Asset-generator tests.
2. `npm.cmd run lint`.
3. `npm.cmd test` with zero failures.
4. `npm.cmd run build`.
5. `npm.cmd run verify:html` for every public route plus 404.
6. Recursive check proving no public source maps.
7. `npm.cmd audit --audit-level=high`.
8. `git diff --check`.
9. Responsive browser QA at mobile, tablet, laptop, and desktop sizes.
10. Direct-navigation verification for every new public route and one unknown path.

## Explicitly deferred owner inputs

The implementation must report, but not fabricate, the following:

- four approved testimonials and consent records;
- FSSAI licence number;
- service prices and duration ranges;
- six factual team biographies;
- supported regional languages;
- named Grievance Officer;
- DSPL enquiry-retention period;
- two completed blog posts;
- trademark class and application number, if DSPL wants them public;
- grant amount, client count, and Raw Radicles performance evidence, if DSPL chooses to disclose them;
- confirmation of which retained phone number supports WhatsApp.

The website remains launch-gated on these items wherever the source document marks them as mandatory.
