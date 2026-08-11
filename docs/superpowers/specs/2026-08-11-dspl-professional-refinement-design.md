# DSPL Professional Refinement Design

**Date:** 2026-08-11

**Repository:** `E:\For website\dspl website`

**Branch:** `pawan/raw-radicles-redesign`

**Design basis:** current branch at `4eff488`, the user's uncommitted About edits, source review, and live-browser review at 1280 x 720 and 1440 x 900

**Status:** Approved for implementation planning

## Goal

Complete a targeted professional refinement of the existing website. This is not a second full redesign. The current route structure, visual identity, factual content, service-page component architecture, and working form behavior remain. The work removes the remaining template-like details, improves thin or repetitive copy, makes Contact usable in a short desktop viewport, gives Privacy contextual visibility, replaces the Raw Radicles email-handler dependency, and gives production deployments a genuine 404 response.

## Latest user edits

The user has uncommitted changes in `src/pages/About.jsx` and `src/pages/About.css`. They:

- extend Vision with `with long-term impact in mind`;
- extend Values with a sentence about recommendations and deliverables; and
- add optional Values-list markup and styles, although no card currently provides `items`, so that list does not render.

These edits are user-owned and must not be discarded. Their intent is authoritative: Vision must remain geography-neutral and Values needs more substance. Implementation will incorporate that intent in the final copy below, update its tests, and remove the unused list branch and styles unless a rendered list becomes necessary. It will not overwrite or reset the working tree.

## Design principles

### Specific over promotional

Use plain corporate language that describes what DSPL does and how it works. Do not use guaranteed outcomes, geographic limitations, currency-specific promises, unverified response times, or motivational slogans.

### Meaning before decoration

Numbers are retained only where they explain an actual sequence. Decorative `01 / 02 / 03` markers are removed. Icons remain only when they help identify a capability, contact method, or interactive control.

### Route-specific content in a shared system

Marketing, Branding, and E-commerce continue to share `ServicePage.jsx`. Their page structures may be consistent, but headings, introductory framing, capability descriptions, FAQs, and calls to action must be relevant to the service rather than generic substitutions.

### Complete actions in the browser

Visitors should not depend on a configured desktop email client to enquire. Form submissions must link to the Privacy Policy before submission, and unknown production URLs must receive a genuine 404 page rather than a successful app-shell response.

## Home

### Service cards

- Remove decorative `01`, `02`, and `03` labels from Marketing, Branding, and E-commerce cards.
- Preserve the three-card order and current icons because the icons identify the services.
- Keep the current professional Marketing wording. The obsolete sentence about customer acquisition cost and return on every rupee is already absent from current source and must remain absent through a regression assertion.
- Preserve the current coordinated-services section and its responsive behavior.

### Process sequence

The six-step process is a real sequence, so its ordering remains. Present its markers as `Step 1` through `Step 6`, not unexplained standalone numerals.

## About

Keep the visible heading `What guides our work` and the three-card Vision, Mission, Values order.

### Card labels

Replace decorative `01 / 02 / 03` labels with meaningful text labels:

- Vision: `Long-term direction`
- Mission: `Our mandate`
- Values: `Operating principles`

These labels are supporting text, not additional headings.

### Final copy

**Vision**

> To build an enduring portfolio of consumer brands defined by quality, relevance, and responsible growth.

This preserves the user's geography-neutral direction. The added phrase `with long-term impact in mind` is not retained because it repeats the meaning of `enduring` without adding a concrete commitment.

**Mission**

> We develop our own brands and help businesses strengthen their branding, marketing, and e-commerce capabilities through practical, accountable execution.

**Values**

> Evidence guides our recommendations. We define scope, responsibilities, and measures clearly, communicate decisions honestly, and execute agreed work with care.

This replaces the thin three-fragment version and incorporates the user's request for more context. It is concrete enough to guide work without inventing formal certifications or guarantees.

### Presentation

- Keep text-led cards with no decorative icons or hover lift.
- Preserve the existing three-column desktop and one-column responsive layout.
- Remove the dormant `card.items` rendering and `.direction-values-*` styles because Values is expressed clearly in one concise paragraph.
- Preserve the hero, journey facts and images, leadership content, portraits, and links.

## Marketing, Branding, and E-commerce

The current source already replaced the generic `Why It Matters` and `What we offer` pattern with route-specific scope and capability sections. Do not revert to the older headings.

### Shared refinement

- Remove a redundant generic `Services` eyebrow where the route title already establishes context.
- Keep each route's specific scope heading and capability heading.
- Give each FAQ section a route-specific heading and concise introduction instead of repeating the same generic label and description.
- Preserve four capability cards, contextual icons, FAQ interaction, route-specific calls to action, and current semantics.
- Review all three route configurations together for parallel depth, but do not force identical sentence structures.

### Copy boundaries

- Marketing may discuss audiences, channels, measurement, reporting, and optimisation, but not guaranteed customer acquisition, revenue, rankings, or return on every rupee.
- Branding may discuss positioning, identity, application, voice, and governance, but not guaranteed loyalty, trust, pricing power, or competitor-proof differentiation.
- E-commerce may discuss storefronts, marketplaces, payments, fulfilment, and ongoing operation, but not guaranteed conversion or revenue and not a `salesperson that never sleeps`.

## Contact

### Desktop first-view fit

At 1280 x 720 and 100% zoom, the empty/default form must show both column headings, all Headquarters rows, every form field, the privacy notice, and the complete submit button without clipping. At 1440 x 900 it must remain comfortably spaced.

To achieve this without reducing accessible target sizes:

- remove the redundant uppercase `CONTACT` eyebrow;
- compact the hero to the H1 and one concise description;
- reduce desktop hero height and the gap before the two-column layout;
- reduce panel padding and form-group gaps modestly;
- use a shorter textarea while keeping it practical;
- keep inputs and buttons at least 44px high; and
- retain natural page scrolling for unusually short or zoomed viewports.

Preserve peer `h2` headings, aligned panels, exact contact details, validation, honeypot, Web3Forms payload, analytics, and form-first mobile order.

### Privacy notice

Add the following notice immediately before the submit button:

> Information submitted through this form is handled as described in our Privacy Policy.

Link only `Privacy Policy` to `/privacy`. This is an informational link, not a consent checkbox or an unverified privacy promise.

## Work With Us form

Add the same linked Privacy Policy notice before its submit button. Preserve its fields, validation, file handling, honeypot, submission behavior, focus management, success state, and visitor-safe error wording.

## Brands and Raw Radicles

Replace the Raw Radicles `mailto:` action with an internal React Router link:

- label: `Contact us about Raw Radicles`
- destination: `/contact`

Do not send this action to the 404 page. A missing local email handler is not a missing web route, and deliberately presenting an error would make a valid enquiry path appear broken.

Do not add an unverified `coming soon` claim. Preserve the Raw Radicles evidence, imagery, proof grid, and the separate brand-partnership action.

## Privacy Policy

The Privacy Policy remains available in the Footer and gains contextual links in both forms. Preserve `/privacy`, the existing verified disclosure, route metadata, and Footer link. Do not add a Header navigation item; the form notices make the policy visible where it matters without crowding the primary navigation.

## Genuine 404 behavior

Keep the React wildcard page for client-side navigation and add production-host behavior:

- generate a root `404.html` during the Vite prerender build;
- give that document `noindex, follow` robots metadata;
- remove the catch-all `/* /index.html 200` rewrite that currently forces unknown requests to return HTTP 200;
- preserve direct access to all eight prerendered public routes; and
- extend build verification to require the eight public route documents plus `dist/404.html`.

The 404 page remains for mistyped, removed, or invalid URLs. It is not used as a placeholder for unfinished products or actions.

## Accessibility and interaction

- Preserve sequential heading levels, visible focus, keyboard access, reduced-motion behavior, form labels, field-error associations, live regions, and modal focus management.
- Do not reduce input or button targets below 44px.
- Meaningful labels must remain visible; decorative elements should not be announced.
- The form Privacy links must be keyboard accessible and visually distinguishable from surrounding text.
- Do not introduce new looping motion or clickable styling on static cards.

## Validation

### Focused regressions

- Home contains no decorative service-card numbers and no currency-specific or guaranteed-return copy.
- About uses the three meaningful card labels and exact final copy, with no `card.items`, `.direction-values-*`, or decorative numbers.
- Each service route keeps its specific scope/capability headings and has route-specific FAQ framing.
- Contact and Work With Us render the exact Privacy notice with a working `/privacy` link.
- The Raw Radicles action is a router link to `/contact` and no product mailto remains.
- `404.html` is generated with `noindex, follow`, and the catch-all 200 rewrite is absent.
- Existing form behavior, contact details, service icons, route count, and accessibility contracts remain green.

### Live browser matrix

Hard-load and client-navigate the public routes and an unknown URL at:

- 390 x 844;
- 768px wide;
- 1024px, 1039px, 1040px, and 1100px wide; and
- 1280 x 720 and 1440 x 900.

Specifically verify Contact default-state geometry at both desktop heights, both form Privacy links, Raw Radicles navigation, real unknown-route behavior, no overflow, no broken images, and no new console errors.

### Commands

Run focused tests per change, then:

1. `npm run lint`
2. `npm test`
3. `npm run build`
4. `npm run verify:html`
5. `npm audit`
6. `git diff --check`

## Scope boundaries

- Do not reset, discard, or silently overwrite user changes.
- Do not change contact details, form endpoints, payload shapes, analytics contracts, validation rules, supporter-logo behavior, brand proof, About journey facts, leadership records, or existing visual assets.
- Do not add geographic qualifiers, currency-specific claims, guaranteed commercial outcomes, response-time guarantees, testimonials, metrics, legal assurances, or dependencies.
- Do not deploy, push, merge, or alter `main` without separate authorization.

## Acceptance criteria

The refinement is complete when the remaining decorative numbering is removed or made semantically sequential, Values has concrete professional context, the service pages remain distinct within the shared architecture, Contact fits the agreed desktop first view without compromising controls, both forms expose Privacy context, Raw Radicles uses a browser-native enquiry path, production unknown URLs receive a real noindex 404, automated checks pass, and live-browser review confirms the approved desktop and mobile experience.
