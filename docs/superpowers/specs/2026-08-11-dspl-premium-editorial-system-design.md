# DSPL Premium Editorial System Design

**Date:** 2026-08-11

**Repository:** `E:\For website\dspl website`

**Branch:** `pawan/raw-radicles-redesign`

**Design basis:** current branch at `40b6c2b`, the governing `DESIGN.md`, current source, the user's browser screenshot, and live-browser review at 1280 x 720

**Status:** Approved design direction; awaiting written-spec review before implementation planning

## Purpose

Refine the completed DSPL website into a quieter premium editorial system. The work keeps the established warm neutral identity, imagery, route structure, factual content, shared service-page architecture, and working form behavior. It removes competing conversion actions, reduces promotional emphasis, replaces template-like capability cards with text-led presentation, and integrates Contact into a single first-screen composition.

This specification supersedes only the Home hero, service hero/capability, Contact presentation, and CTA-ownership decisions in `2026-08-11-dspl-professional-refinement-design.md`. All other implemented decisions in that specification remain in force.

## Approved principles

### Precise corporate language

State what DSPL does without motivational slogans, geographic qualifiers, currency-specific claims, guaranteed outcomes, or exaggerated performance language.

### Restrained gold

Gold remains the brand accent, not a headline fill. It is reserved for the fixed Header's primary conversion action, active/focus states, and small structural accents. Entire hero sentences must not be gold.

### Text before decoration

Do not use decorative numbers or boxed capability icons. Service scope should be understood from meaningful titles and descriptions. Fine rules, spacing, and typography provide hierarchy.

### One modal owner

The fixed Header is the only component that opens the Work With Us project planner. Its desktop button and mobile-drawer equivalent are responsive representations of the same global action; only one is visible at a time.

All other contextual actions use normal navigation or are removed. After implementation, only `Header.jsx` may import and call `openWorkModal`.

## Home hero

### Approved headline

Render the H1 as two visible statements on separate lines:

> We develop brands.
>
> We deliver disciplined market execution.

Both statements remain prominent and use `#FFFFFF`. The second statement must not be rendered in gold. Add one decorative `3rem` by `3px` gold rule above the H1 through a pseudo-element on the hero content; it must not add accessible text.

### Supporting copy

Use this exact paragraph:

> Dashapatmaja Solutions Pvt Ltd develops and operates consumer brands while helping businesses coordinate branding, marketing, and e-commerce through clearly defined, accountable execution.

### Action

Remove the Home hero's Work With Us button and the redundant See Our Brands button. Add one understated internal link:

- label: `Explore our capabilities`
- destination: `#capabilities`

Give the coordinated-services section `id="capabilities"`. The link must use normal anchor navigation and must not open the modal. Raw Radicles already has a dedicated proof section and route link later on the page, so a second hero action is unnecessary.

### Presentation

- Preserve the existing hero image, supporter strip, image loading contract, overlay legibility, and responsive media sources.
- Keep the hero centred and spacious, but reduce visual competition between the two H1 statements.
- Preserve the supporter strip's motion, reduced-motion behavior, order, spacing, and overflow contracts.

## Global CTA ownership

- Retain `Work With Us` in the fixed Header and mobile drawer.
- Remove all Home and service-hero modal triggers.
- Replace the Brands partnership modal trigger with a router link:
  - label: `Contact us about a brand partnership`
  - destination: `/contact`
- Preserve the existing Raw Radicles link to `/contact`.
- Do not add a footer CTA banner or another modal trigger inside Contact.

The Contact route remains a general enquiry path. Work With Us remains the detailed project planner. Their field sets and behavior stay distinct.

## Marketing, Branding, and E-commerce heroes

All three routes continue to use `ServicePage.jsx` and their existing responsive background-image families.

### Shared structure

Each hero contains only:

1. the route H1;
2. one concise positioning paragraph; and
3. the background image with a controlled dark overlay.

Remove the repeated service eyebrow, gold hero tagline, second explanatory paragraph, and project CTA button. At `769px` and above, use a consistent `400px` minimum hero height with the content vertically centred. At `768px` and below, remove the fixed minimum and let the text and responsive padding determine natural height.

### Exact positioning paragraphs

**Marketing**

> Search, paid media, content, and measurement coordinated around defined audiences, commercial priorities, and available evidence.

**Branding**

> Positioning, identity, voice, and application systems developed for consistent use across the business.

**E-commerce**

> Storefront, marketplace, payment, and fulfilment systems planned around the selected platform and operating model.

The existing route-specific scope sections remain immediately after their heroes. Their current scope headings and explanatory copy remain unchanged.

## Service capability presentation

### Content

Preserve the four route-specific capability titles and descriptions on each service page. Do not add outcome guarantees or force the copy into identical sentence structures.

### Layout

Replace the four white icon cards with a text-led editorial grid:

- two columns on desktop and one column on mobile;
- fine horizontal rules separating entries;
- generous vertical spacing and controlled line length;
- capability title followed by its existing description;
- no boxed surfaces, icon wrappers, decorative numbers, hover lift, or static-card shadows.

Remove the Lucide capability icon imports and `icon` properties from Marketing, Branding, and E-commerce. Icons used for genuine controls, contact methods, validation, or navigation remain unaffected.

The capability heading and route-specific introduction remain. FAQ content and accordion behavior remain unchanged.

## Integrated Contact layout

### Desktop structure

Replace the separate centred Contact hero and two independently titled card columns with one integrated section directly below the fixed Header:

- left editorial column: `minmax(0, 2fr)`;
- right form column: `minmax(0, 3fr)`;
- maximum content width remains aligned with the site container;
- submit button, privacy notice, every default field, and all headquarters details remain visible at 1280 x 720 and 100% zoom;
- controls remain at least 44px high.

### Left column

Use this hierarchy and exact copy:

- small label: `Contact`
- H1: `Start a conversation.`
- paragraph: `For general enquiries, tell us what you need and how we can reach you. For a detailed project brief, use Work With Us in the header.`
- H2: `Headquarters`

Present Address, Phone, and Email as text-led information groups separated by fine rules. Remove the boxed headquarters panel and its decorative MapPin, Phone, and Mail icons. Preserve every address line, telephone link, and email link exactly.

### Right column

Use one quiet white surface with:

- H2: `General enquiry`
- the current First Name, Last Name, Email Address, help-type, and Message fields;
- the current linked Privacy Policy notice;
- the current `Send Message` action.

Do not introduce a second project-planner trigger inside this panel.

### Mobile structure

Show the compact Contact introduction first, then the General enquiry form, then Headquarters. This preserves the approved form-before-headquarters priority while ensuring the page purpose is clear before the fields. Use natural page scrolling; do not force all content into one mobile viewport.

### Preserved behavior

Do not change:

- contact details;
- field names or available help-type options;
- validation and error associations;
- honeypot behavior;
- Web3Forms endpoint or payload;
- GA4 lead tracking;
- submission states and visitor-safe errors; or
- the linked Privacy Policy notice.

## Responsive and accessibility requirements

- Header desktop navigation remains active from 1040px; the drawer remains active at 1039px and below.
- H1 text must wrap deliberately without clipping at 390px, 768px, 1024px, and 1280px.
- Service capability entries stack to one column on mobile with no horizontal overflow.
- Contact keeps 44px minimum controls and visible focus states.
- Maintain sequential heading levels, labels, error messaging, live regions, keyboard interaction, reduced motion, and modal focus management.
- Decorative rules and background imagery remain hidden from assistive technology.

## Testing and validation

### Focused automated contracts

- Home renders the exact two-statement H1 and exact supporting paragraph.
- The Home hero has no Work With Us button and links `Explore our capabilities` to `#capabilities`.
- Only Header production source imports or calls `openWorkModal`.
- Brands partnership navigation links to `/contact`.
- Service heroes render one positioning paragraph, no eyebrow, no modal CTA, and no second description.
- Marketing, Branding, and E-commerce define no Lucide capability icons or `icon` properties.
- Capability entries render as text-led articles without `.offer-icon-wrapper`.
- Contact renders the integrated hierarchy and exact new copy while preserving all details, fields, privacy notice, validation, submission, analytics, and mobile ordering.
- Existing route, SEO, 404, supporter-strip, image, FAQ, modal, and accessibility contracts remain green.

### Live browser matrix

Hard-load and client-navigate Home, Marketing, Branding, E-commerce, Contact, Brands, and an unknown route at:

- 390 x 844;
- 768px wide;
- 1024px, 1039px, 1040px, and 1100px wide;
- 1280 x 720; and
- 1440 x 900.

Confirm:

- one visible Work With Us action at every breakpoint;
- no page-level modal CTA;
- intentional Home H1 wrapping;
- consistent service-hero height and hierarchy;
- text-led capabilities without empty icon space;
- complete Contact default-state visibility at 1280 x 720 and 1440 x 900;
- correct `/contact` partnership navigation;
- no overflow, broken images, or console warnings/errors.

### Release commands

1. `npm run lint`
2. `npm test`
3. `npm run build`
4. `npm run verify:html`
5. `npm audit`
6. `git diff --check`

## Scope boundaries

- Do not change the logo, brand palette, font family, route architecture, hero-image assets, supporter strip, About content, Raw Radicles evidence, service capability facts, FAQs, Footer, Privacy disclosure, 404 behavior, form endpoints, analytics contracts, or dependency set.
- Do not add geographic qualifiers, currency-specific claims, testimonials, unverifiable metrics, guaranteed commercial outcomes, response-time promises, new animation systems, decorative numbers, or replacement icons.
- Do not deploy, push, merge, or alter `main` without separate authorization.

## Acceptance criteria

The refinement is complete when the approved two-statement Home proposition is rendered with restrained gold; Header owns the only Work With Us modal action; service pages use shorter, calmer heroes and text-led capability grids; Contact is an integrated editorial/form composition that remains complete at the agreed desktop viewports; all preserved behavior remains intact; automated checks pass; and live-browser review confirms the approved experience without overflow, broken imagery, or console errors.
