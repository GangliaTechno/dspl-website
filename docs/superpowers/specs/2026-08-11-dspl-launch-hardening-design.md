# DSPL Launch Hardening Design

**Date:** 2026-08-11
**Status:** Approved for implementation
**Repository:** `E:\For website\dspl website`
**Branch:** `pawan/raw-radicles-redesign`

## Goal

Prepare the current DSPL marketing website for a cleaner and more reliable
release by correcting social-sharing artwork, reducing production asset weight,
removing public source maps, repairing application-side 404 hydration, and
finishing the identified CTA, accessibility, and test-quality work.

This is a surgical hardening pass, not another redesign or a broad refactor.
Existing routes, verified copy, form payloads, analytics contracts, visual
identity, and service-page architecture remain intact.

## Current constraints

- Preserve every existing uncommitted user change and make only scoped edits.
- Keep Web3Forms key rotation, endpoint behavior, retries, timeouts, and other
  submission changes out of this implementation.
- Do not change the displayed CIN until DSPL's Certificate of Incorporation or
  its exact verified CIN is provided.
- Do not add hosting-specific rewrites, CSP, or HTTP security headers until the
  production hosting platform is selected.
- Do not deploy, push, merge, or alter `main` without separate authorization.
- Do not invent testimonials, metrics, legal assurances, outcomes, or business
  facts.

## Selected approach

Use a focused launch-hardening pass. A performance-only pass was rejected
because it would leave known accessibility and correctness defects behind. A
broad component and repository refactor was rejected because the 500-line
modal and 14 KB About page are maintainability work, not release blockers.

## Social-sharing artwork and metadata

Replace `public/og-cover.jpg` with a deterministic 1200 x 630 JPEG composed
from current DSPL brand assets. The artwork will:

- use an existing approved DSPL editorial image as the background;
- apply a restrained dark overlay for legibility;
- show the existing DSPL logo and exact company name;
- use the verified homepage proposition, "We develop brands. We deliver
  disciplined market execution.";
- keep essential content inside a safe inset so common social crops do not cut
  it off;
- contain no invented claim, testimonial, metric, or third-party mark; and
- remain at or below 300 KB unless visible quality requires a documented small
  exception.

Keep the existing single metadata system. `index.html`, `useSEO`, route
metadata, and prerender metadata continue to reference the same stable absolute
URL. Metadata dimensions must match the delivered 1200 x 630 file.

## Icons and manifest

Create a conventional icon set from the existing DSPL mark:

- 16 x 16 and 32 x 32 browser favicons;
- a 180 x 180 Apple touch icon;
- 192 x 192 and 512 x 512 manifest icons; and
- `public/site.webmanifest` with the canonical company name, short name,
  intentional theme/background colors, `start_url: "/"`, and
  `display: "standalone"`.

Reference the icons and manifest once in `index.html`. Do not add a service
worker, install prompt, offline behavior, or other PWA functionality.

## Production image optimization

Optimize only assets that are currently delivered by production code:

- the approximately 486 KB team portrait;
- the approximately 311 KB Raw Radicles logo;
- the approximately 206 KB texture; and
- the approximately 137 KB DSPL horizontal logo.

Use WebP or an equivalently supported optimized format for photographic and UI
delivery when it materially reduces weight. Preserve dimensions, transparency,
color, and visible quality at the rendered sizes. Update imports before removing
any superseded production copy, then prove the old file has no remaining source
reference. Preserve documented source masters and provenance assets.

Target budgets are:

- team portrait: at or below 200 KB;
- Raw Radicles logo: at or below 150 KB;
- texture: at or below 100 KB; and
- rendered DSPL horizontal logo: at or below 60 KB.

These are quality-aware budgets rather than permission to introduce visible
compression artifacts.

## Source-map behavior

Set the Vite production build to emit no browser source maps. A fresh `dist`
must contain zero `.map` files. Private error-tracker upload can be designed
later if DSPL adopts one.

## Application-side 404 repair

Retain the React wildcard route and generated root `404.html`, but make the
prerendered and hydrated 404 body deterministic:

- the visible explanation must not interpolate `location.pathname`;
- 404 metadata must use the stable `/404.html` canonical and
  `noindex, follow`;
- analytics may still record the actual missing pathname after client startup;
  and
- a production fallback loaded at an unknown pathname must transition to the
  NotFound route without attempting incompatible hydration.

Known prerendered routes continue to hydrate normally. Unknown paths are
client-rendered after clearing any fallback markup because a generic static-host
fallback may contain the Home document rather than `404.html`; trying to hydrate
that markup as NotFound causes React error 418 even when the NotFound body itself
is path-independent.

The build verifier will continue requiring all eight public route documents and
`dist/404.html`, and will additionally reject a 404 document that leaks the
prerender-only `/404.html` pathname into visible explanatory copy.

The local Vite preview may still return HTTP 200 for the fallback document.
Real HTTP 404 delivery is explicitly deferred until the static host or Nginx
configuration is known.

## Global pre-footer CTA

Render one restrained CTA immediately before the main Footer on every route.
It will use the already introduced footer CTA styling and the following content:

- eyebrow: `Start a conversation`
- heading: `Ready to build with greater clarity?`
- supporting text: `Tell us what you are building, where you need support, and
  what a successful next step looks like.`
- action: `Contact DSPL`, linking to `/contact`

Use a normal router link rather than opening the Work With Us modal. This keeps
the Header as the primary detailed-project trigger and makes the global CTA a
low-complexity path to the general enquiry page. The CTA must stack cleanly on
small screens, preserve a 44 px action target, and add no new animation.

Remove the unused `.home-mid-cta` block from `Home.css`; do not create a second
homepage-only CTA.

## Form error focus

On invalid submission, both public forms must move keyboard focus to the first
field with an error:

- Contact follows its visible field order;
- Work With Us follows `validateLead` insertion order, with `services` focusing
  the first service checkbox;
- existing inline error messages, `aria-invalid`, `aria-describedby`, and live
  announcements remain; and
- Web3Forms endpoints, payloads, success behavior, and network handling remain
  unchanged.

The Work With Us modal may continue scrolling the first invalid section into
view, but focus—not scrolling alone—is the accessibility requirement.

## Mobile navigation focus cycle

Add a labelled close button inside the mobile drawer dialog and make it the
initial focus target when the drawer opens. Include it in the existing focus
trap, preserve Escape closing and trigger-focus restoration, and prevent the
Header's external menu toggle from remaining the only visible close control
while the modal drawer is active. Use the existing icon and design tokens; do
not introduce a new interaction library for this targeted correction.

## Rotating hero test warnings

Remove the two React `act(...)` warnings from the RotatingHeroMedia tests by
placing test-driven visibility and timer state updates inside React's testing
boundary and ensuring cleanup does not dispatch state-changing events after a
test. Production rotation timing, lazy mounting, visibility pausing, and reduced
motion behavior must not change unless a failing regression proves a production
defect.

## Supporter marquee clarity and cadence

Keep the existing measured CSS conveyor architecture: `SupporterStrip` measures
one complete sequence with `ResizeObserver`, duplicates that sequence, and
animates exactly one measured sequence width with `translate3d`. Preserve the
28-second linear duration, current desktop/mobile gaps, compositor promotion,
and reduced-motion fallback.

The four dedicated marquee assets are already transparent white artwork. Remove
the redundant `brightness(0) invert(1) drop-shadow(...)` filter, render the logos
at full opacity, and remove their hover-opacity transition. This produces clearer
marks and removes continuous filter paint from the moving surface without
changing sequence geometry or introducing a second animation system. Do not
change speed unless a later rendered review still identifies a cadence defect.

## Home and About copy discipline

Reserve the word `execution` for the primary Home proposition, `We deliver
disciplined market execution.` Remove the five supporting repetitions so Home
states the market promise once and About develops company identity, mission, and
values rather than echoing the same noun.

Use these exact replacements:

- Home subhead: `Dashapatmaja Solutions Pvt Ltd develops and operates consumer
  brands while helping businesses coordinate branding, marketing, and
  e-commerce through clearly defined, accountable delivery.`
- Home coordinated-services description: `Start with the capability you need
  now. Keep strategy, market activity, and commerce aligned as the business
  grows.`
- About hero subtitle: `A multidisciplinary company focused on developing brands
  and building coordinated commercial capabilities.`
- About Mission: `We develop our own brands and help businesses strengthen their
  branding, marketing, and e-commerce capabilities through practical,
  accountable collaboration.`
- About Values: `Evidence guides our recommendations. We define scope,
  responsibilities, and measures clearly, communicate decisions honestly, and
  carry agreed work through with care.`

Do not alter the Home proposition, route metadata, journey facts, leadership
records, service scope, or business claims.

## Testing strategy

Behavior changes follow red-green-refactor cycles:

1. add focused failing regressions for the stable 404 body and canonical;
2. add a Footer CTA regression and unused-style contract;
3. add Contact and Work With Us invalid-focus regressions;
4. add a mobile drawer internal-close/focus-cycle regression;
5. reproduce the RotatingHeroMedia warning in isolation before correcting the
   test lifecycle; and
6. add static asset assertions for OG dimensions, manifest references, icon
   existence, source-map absence, asset references, and size budgets where
   deterministic.

Finish with fresh runs of:

1. focused tests after each red-green cycle;
2. `npm run lint`;
3. `npm test` with no React warnings;
4. `npm run build`;
5. `npm run verify:html`;
6. a recursive assertion that `dist` contains no `.map` files;
7. `npm audit`;
8. `git diff --check`; and
9. responsive browser checks at 390 x 844, 768 px, 1039/1040 px, 1280 x 720,
   and 1440 x 900, including unknown-route hydration and broken-image checks.

## Deferred work

The following are recorded but are not implementation tasks in this pass:

- verifying and correcting the CIN;
- production HTTP 404 status;
- CSP and other server security headers;
- every Web3Forms security or submission improvement;
- privacy-policy legal review;
- testimonials, case studies, or measurable outcomes without approved evidence;
- modal/About refactoring; and
- optional card-radius standardization.

## Acceptance criteria

The pass is complete when the approved 1200 x 630 social image and icon set are
delivered, the four production-heavy assets meet quality-aware budgets, fresh
builds emit no source maps, unknown-path hydration is mismatch-free, the global
Contact CTA is present without duplicate Home CTA CSS, both forms focus their
first invalid field, the mobile drawer contains its own keyboard-reachable close
control, the hero test suite emits no React warnings, supporter logos render
without filter/shadow work while retaining the exact measured loop, `execution`
appears only in the primary Home proposition across Home and About, and the full
automated and responsive-browser validation matrix passes. CIN, hosting
configuration, security headers, and Web3Forms behavior must remain unchanged.
