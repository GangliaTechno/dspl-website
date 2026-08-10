# DSPL Professional Website Revamp Design

**Date:** 2026-08-10

**Repository:** `E:\For website\dspl website`

**Branch:** `pawan/raw-radicles-redesign`

**Design basis:** current branch at `bf724e2` plus live desktop and mobile review

**Status:** Structure and scope approved; exact copy proposed for user review before implementation planning

## Goal

Refine the public Dashapatmaja Solutions Pvt Ltd website so it reads as a mature, credible, evidence-led corporate presence rather than a generic agency template.

The work will preserve the existing warm cream, charcoal, white, and restrained gold identity. It will not rebuild routes, replace approved imagery, invent client proof, or change working form behavior. The highest-value changes are:

1. replace the About page's two-card Mission/Vision block with a professional Vision/Mission/Values composition;
2. restructure the top half of Contact so Headquarters and Send a Message align as true peers;
3. remove the repeated global footer CTA banner;
4. rewrite older promotional or vague copy across Brands and the three service pages;
5. make icons contextual and remove decorative icon use that adds no meaning; and
6. repair shared CSS ownership so typography and form styling do not change according to route visit order.

No public page requires a full replacement.

## Governing principles

### Evidence before claims

Prefer verified facts already present in the repository: Raw Radicles, the MUTBI/MAHE incubation context, NIDHI-PRAYAS, the documented journey, named capabilities, and operational contact information. Do not promise revenue, lower acquisition cost, ranking duration, immediate response, or other outcomes that the business cannot substantiate.

### Institutional warmth

Retain the current warm neutrals, Outfit typography, square corporate controls, restrained gold accent, editorial photography, and factual proof. Reduce template signals such as repetitive eyebrow labels, decorative glows, floating non-interactive cards, generic slogans, and hover motion on static content.

### One system

Shared headings, text styles, panels, forms, buttons, responsive gutters, and motion rules must have one clear CSS owner. A page must render identically when opened directly, after a hard refresh, and after visiting any other route through client-side navigation.

### Clear next actions

Use one meaningful primary action per surface. The sticky Header already provides the global Work With Us action. Page-specific actions may remain where they match the page's intent, but the same large footer CTA must not repeat on every route.

## Current route treatment

| Route | Treatment | Preserved elements |
| --- | --- | --- |
| `/` | Minor copy and shared-baseline polish | Hero composition, supporter conveyor, service order, six-step process, Raw Radicles proof |
| `/about` | Mission-block redesign and hero-copy tightening | Editorial hero image, factual journey, leadership names and portraits |
| `/brands` | Hero/pipeline copy rewrite and decorative cleanup | Raw Radicles showcase, proof grid, logo and brand artwork |
| `/marketing` | Copy rewrite and shared service-template refinement | Hero image, capability structure, FAQ behavior |
| `/branding` | Copy rewrite and shared service-template refinement | Hero image, capability structure, FAQ behavior |
| `/ecommerce` | Copy rewrite and shared service-template refinement | Hero image, capability structure, FAQ behavior |
| `/contact` | Top-half structural redesign and safer messages | Address, phone numbers, emails, fields, validation, honeypot, Web3Forms, analytics, mobile form-first order |
| `/privacy` | Operational-content reconciliation and title correction | Readable legal-page layout and verified contact details |
| `*` | Minor wording/heading polish | Recovery actions and route links |

## Shared visual baseline

### CSS ownership

- Move the reusable `.section-header`, `.section-subtitle`, `.section-title`, and `.section-title-description` rules out of lazy About and Service chunks into a globally imported shared owner.
- Give Contact and Work With Us modal fields fully owned or intentionally shared form primitives. Eliminate their dependence on whichever route loaded `Contact.css` first.
- Namespace state selectors such as success, error banner, select, submit button, and half-width field rules so Contact and the modal cannot style one another accidentally.
- Let `.container` own horizontal page gutters. Shared `.section` utilities should primarily own vertical rhythm so mobile padding is not doubled.
- Remove the `glass` utility from cards that immediately override it with an opaque white surface.

### Typography and hierarchy

- Preserve Outfit and the current type scale. Add only the shared wrapping rules specified below.
- Use `text-wrap: balance` for major headings and `text-wrap: pretty` for body/description primitives.
- Use one display heading per page and maintain sequential heading levels.
- Convert service hero taglines from decorative `h2` elements to paragraphs.
- Use `h3` for FAQ questions beneath the FAQ section's `h2`.
- Reduce repetitive uppercase eyebrow labels. Keep them only when they establish real context, not as decoration before every heading.

### Cards and motion

- Establish two deliberate surfaces: restrained 4px corporate panels for forms/contact and 8-12px editorial cards where the current design already uses them.
- Static informational cards must not lift, cast a stronger shadow, or otherwise behave like links on hover.
- Keep interaction feedback at 200ms or less and animate only `transform` and `opacity`.
- Preserve reduced-motion behavior and the existing CSS supporter-conveyor mechanics.

## Icon policy

Icons remain only when they improve recognition, scanning, or interaction.

### Keep

- Header menu/close controls.
- Contact address, phone, and email icons.
- FAQ disclosure chevrons.
- Form status, close, and submit affordances.
- LinkedIn and back/recovery actions where the icon clarifies an action.
- Service capability icons that directly represent the accompanying service.

### Remove or replace

- Remove Target and Eye from the About direction cards. The replacement uses `01`, `02`, and `03` labels rather than pictograms.
- Remove Sparkles from the Brands development panel and use a text-led status treatment.
- Remove the cookie symbol from the Raw Radicles flagship label and keep the label text-led.
- In Branding, replace Sparkles with Lucide `Palette` for Brand Identity and replace ShieldCheck with Lucide `LayoutTemplate` for Design Systems and Brand Assets. Keep `Compass` and `BookOpen` for their current Branding cards.
- In E-commerce, replace HeartHandshake with Lucide `MousePointerClick` for Conversion Rate Optimisation. Keep `ShoppingCart`, `Layers`, and `CreditCard` for their current cards.
- Keep the current `Search`, `Megaphone`, `BarChart`, and `FileText` mappings in Marketing.
- Do not add icon boxes solely to fill empty space.

## Header

Preserve the stable 76-77px desktop geometry, mobile menu behavior, logo artwork, route links, and Work With Us action. Standardize capitalization as `Work With Us` in the Header and `Work with us` only when it begins a sentence or modal title.

Use the compact mobile Header below 1040px and the full navigation at 1040px and above. Update the CSS breakpoint and Header resize logic together so the rendered state and JavaScript state cannot disagree.

## Home

Preserve the page composition. It is the strongest existing example of the desired editorial restraint.

### Hero copy

Keep the headline:

> We build brands. We help businesses grow.

Replace the supporting paragraph with:

> Dashapatmaja Solutions Pvt Ltd brings branding, marketing, and e-commerce into one coordinated system. We apply the same disciplines to Raw Radicles, the consumer brand we develop and operate.

This retains the dual operator/service perspective without promising customers or sales.

### Supporting content

- Retain the coordinated-services and six-step process structures.
- Rewrite service-card body copy as capability statements, removing guaranteed ROI, acquisition, or conversion implications.
- Change `Owned-brand proof` to `Built and operated by DSPL`.
- Preserve the supporter strip's current accessible label and do not alter its visible copy, logo files, dimensions, order, animation, or reduced-motion behavior in this scope.

## About

### Hero

Retain the current editorial image and corporate-profile context. Shorten the paragraph so the mobile hero does not become a wall of text:

> Founded in 2023, Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services. Based at MUTBI, MAHE, Manipal, our team combines healthcare, engineering, design, management, and technology experience.

Raw Radicles remains visible elsewhere on the page and does not need to be repeated in this paragraph.

At 390 x 844, the About hero must end at or before 620px from the top of the viewport and the first direction card must begin within the initial viewport.

### Vision, Mission, and Values

Use a visible section heading: `What guides our work`.

Create three equal desktop cards in this order:

1. **Vision**

   `To build enduring Indian consumer brands and the capabilities that help them grow responsibly.`

2. **Mission**

   `We develop our own brands and help businesses strengthen branding, marketing, and e-commerce through practical, accountable execution.`

3. **Values**

   `Evidence before claims. Clarity in decisions. Care in execution.`

These are the exact proposed strings for the review gate. They must not be treated as formally approved corporate values until the user approves this document.

### Presentation

- Use small `01 / 02 / 03` labels, not icons.
- Left-align headings and body copy.
- Use equal height only while cards share a desktop row; allow natural height when stacked.
- Use three columns above 900px and one column at 900px and below.
- Remove non-interactive hover lift.
- Preserve the four journey entries, images, facts, chronology, team names, positions, portraits, and LinkedIn links.

## Brands

### Hero

Replace the current generic headline with:

> We develop and operate consumer brands.

Supporting copy:

> We work across product development, packaging, compliance, market positioning, and commerce. Raw Radicles is our first flagship consumer brand, with additional concepts in development.

Use the context label `DSPL Brands` and remove `HOUSE OF BRANDS`.

### Raw Radicles

Preserve the showcase structure, brand artwork, proof grid, verified partnership wording, and enquiry action. Tighten copy only where it repeats the hero.

### Development panel

Rename the section `Portfolio in development` and use:

> Additional consumer-brand concepts are being evaluated and developed. We will publish them here when they are ready for market.

Remove the decorative sparkle icon, gradient-like decorative shapes, and oversized floating-card treatment. Retain the existing `Discuss a brand partnership` action and modal destination.

## Shared service-page design

Marketing, Branding, and E-commerce continue to use `ServicePage.jsx`. A shared component is appropriate; the problem is repetitive generic language, not reuse itself.

### Structure

1. Service hero with route-specific context, title, descriptive tagline, short capability statement, and route-specific CTA.
2. A restrained scope introduction replacing the promotional `Why It Matters` card.
3. Four capability cards with contextual icons and concrete deliverables.
4. FAQ section with route-specific answers and correct heading hierarchy.

The introduction should be part of the page flow rather than a floating white card. Use `6rem 0 4.5rem` service-hero padding above 768px and `4rem 0 3rem` at 768px and below. At 390 x 844, the beginning of the scope-introduction section must be visible in the initial viewport.

### Marketing messaging

- Tagline: `Marketing built around clear audiences, accountable channels, and measurable decisions.`
- CTA: `Discuss a marketing project`.
- Describe discovery, channel planning, search, paid media, content, measurement, reporting cadence, and optimisation.
- Remove claims such as free traffic month after month, more sales for less, guaranteed timing, or universal daily review unless DSPL confirms them as contractual commitments.

### Branding messaging

- Tagline: `Positioning, identity, and brand systems designed for consistent use.`
- CTA: `Discuss a branding project`.
- Describe positioning, identity, voice, packaging/application rules, templates, and governance.
- Remove absolute claims about competitors being unable to copy a brand, fast trust, pricing power, or guaranteed customer loyalty.

### E-commerce messaging

- Tagline: `Storefront, marketplace, payment, and fulfilment support for practical online growth.`
- CTA: `Discuss an e-commerce project`.
- Distinguish setup, integration, optimisation, and ongoing operational support.
- Remove `salesperson that never sleeps`, guaranteed revenue implications, and claims that operations require no manual work.

## Contact

### Hero

Retain a light, image-free hero but reduce its vertical padding. Use:

- Context label: `Contact`
- H1: `Contact us`
- Paragraph: `Tell us about the brand, campaign, or e-commerce requirement you are working through. We will review the details and respond using the contact information you provide.`

Do not publish a 24-hour response promise unless DSPL confirms it as an operating commitment.

Use `2.5rem 0 2rem` hero padding above 900px and `3rem 0 2rem` at 900px and below. Use `2rem` top padding for the Contact grid section.

### Desktop composition

Create two equivalent column wrappers:

1. `h2` column heading;
2. consistent heading-to-panel gap; and
3. the panel/card beneath it.

Use `Headquarters` and `Send a message` as peer `h2` headings outside their panels. Both panels begin at the same vertical coordinate, with a `1.5rem` heading-to-panel gap. Reduce the form-panel padding from `3.5rem` to `2rem` and tighten vertical group gaps without reducing input target heights. At 1440 x 900, both headings, all Headquarters rows, all five form fields, and the submit button must be visible without scrolling in the empty/default form state.

### Headquarters panel

Preserve the consolidated Address, Phone, and Email rows and all current details. Rename `Phone Call` to `Phone` and `Email Support` to `Email`. Keep the functional row icons.

### Responsive behavior

- At 900px and below, retain form-first stacking.
- Maintain comfortable field sizes and one-column name fields on narrow phones.
- Do not force both desktop panels to equal height.
- Keep the form close to the hero on mobile without crowding the fixed Header.

### Form messages

- Preserve validation requirements, error associations, submission state, honeypot, analytics event, and Web3Forms request shape.
- Replace configuration/vendor details with: `We could not send your message right now. Please try again or contact us by email.`
- Never mention an access key, environment variable, or Web3Forms in a visitor-facing error.

## Work With Us modal

Preserve the planner fields, file validation, service selection, preferred contact method, honeypot, submission behavior, and focus management.

- Replace uppercase `SECTION 1/2/3` labels with `Contact details`, `Project details`, and `Preferences`.
- Remove all visitor-facing `VIP LEAD` or internal lead-classification language.
- Remove immediate-contact and 24-hour promises unless operationally confirmed.
- Use a restrained confirmation: `Thank you. We have received your project details and will review them before contacting you.`
- Use the same generic recoverable submission error defined for Contact.
- Ensure modal styling is identical when opened from a fresh Home load and after visiting Contact.

## Footer

Remove `.footer-banner` and its `Ready to build something that lasts?` copy from the global Footer.

The remaining footer becomes a tighter corporate information surface:

- Company block with logo, LinkedIn, and: `Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.`
- Rename `Our Domains` to `Services`.
- Rename `Contact Solutions` to `Contact`.
- Preserve service, Brands, About, contact, and Privacy links.
- Retitle the legal link to `Privacy Policy` until actual Terms of Use content is approved and added.
- Stack and left-align the copyright/legal row on narrow phones.

## Privacy and utility pages

### Privacy

- Retitle the page and Footer link to `Privacy Policy` because no Terms of Use content currently exists.
- Update the `/privacy` route metadata title and description so neither claims that Terms of Use content is present.
- Reconcile the listed fields with the Contact and Work With Us forms.
- Verify analytics, processor, attachment, retention, deletion, newsletter, and security statements against actual behavior and provider terms before publication.
- Remove unsupported statements rather than replacing them with broader assurances.
- Drafting new legal terms or certifying legal compliance is outside this implementation scope.

### 404

- Change `Explore Popular Sections:` to `Explore popular sections`.
- Change `Contact Support` to `Contact us`.
- Preserve Return to Home, Go Back, and route links.

## Accessibility and interaction

- Preserve keyboard navigation, focus trapping, focus return, form labels, live regions, and error associations.
- All icon-only controls require accessible names.
- Decorative icons use `aria-hidden="true"`.
- Maintain visible focus states and current contrast targets.
- Do not place essential information only in imagery or hover states.
- Do not introduce new looping motion.

## Validation plan

### Regression coverage

- About renders exactly three Vision/Mission/Values cards in the approved order and no Target/Eye icons.
- Contact peer headings are both `h2` elements outside their panels; mobile form-first order remains.
- The global footer banner and old slogans are absent.
- Service taglines use paragraph semantics and FAQ questions use `h3`.
- Shared heading styles are present on a fresh Home/Contact load without visiting About or a service route.
- Work With Us select, field rows, errors, and submit button have identical computed styles before and after SPA navigation through Contact.
- Preserve behavioral coverage for form payloads, validation, honeypots, analytics, and success states while updating assertions that intentionally track the approved visitor-facing copy.
- Existing route metadata, prerender route count, marquee mechanics, image references, and contact details remain unchanged unless this design explicitly changes their visible label.

### Live browser checks

Review every public route and 404 at:

- 390 x 844 phone;
- 768px tablet;
- 1024-1100px intermediate desktop/header range; and
- 1440 x 900 desktop.

Confirm:

- no horizontal overflow or broken images;
- no browser console errors or warnings introduced by the change;
- the About hero ends at or before 620px and its first direction card begins within the initial 390 x 844 viewport;
- at 1440 x 900, Contact shows both peer headings, all Headquarters rows, all five default-state form fields, and the submit button without scrolling;
- Contact presents the form before Headquarters at 900px and below;
- Footer remains compact and readable without the banner;
- the scope-introduction section begins within the initial 390 x 844 viewport on every service page; and
- static cards do not imply clickability through hover motion.

### Command verification

Run:

1. focused tests while each surface changes;
2. `npm run lint`;
3. `npm test`;
4. `npm run build`;
5. `npm run verify:html`;
6. `npm audit`; and
7. `git diff --check`.

## Scope boundaries

- Do not change public routes, React/Vite architecture, SEO/prerender ownership, analytics integration, or deployment configuration. The only route-metadata content change in scope is correcting `/privacy` from Privacy/Terms wording to Privacy Policy wording.
- Do not change the Web3Forms endpoint, access key handling, form payload contracts, contact details, or validation rules except for visitor-facing error wording explicitly approved here.
- Do not change supporter logo artwork, order, dimensions, animation math, or reduced-motion behavior.
- Do not change About journey facts/images or leadership names, roles, portraits, and LinkedIn destinations.
- Do not redraw or modify the DSPL or Raw Radicles logos.
- Do not add dependencies unless implementation proves an existing requirement cannot be met with the current stack.
- Do not invent testimonials, client logos, performance metrics, response guarantees, partnerships, company values beyond the exact review copy in this document, or legal assurances.
- Do not push, merge, deploy, or alter `main` as part of implementation without separate user authorization.

## Acceptance criteria

The revamp is complete when:

1. every route reads in one evidence-led corporate voice;
2. About uses the approved three-card direction and keeps its strongest factual sections;
3. Contact presents aligned peer columns and preserves every operational contract;
4. the global footer CTA banner and generic footer slogan are gone;
5. all retained icons are contextual and static cards no longer mimic controls;
6. direct-load and route-history styling are identical;
7. Privacy accurately describes only verified behavior;
8. automated and live validation pass; and
9. the user approves the final desktop and mobile visuals before any release action.
