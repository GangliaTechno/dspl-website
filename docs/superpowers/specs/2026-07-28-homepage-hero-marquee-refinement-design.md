# Homepage Hero and Supporter Marquee Refinement

Date: 2026-07-28  
Status: Approved design, pending implementation

## Objective

Refine the homepage hierarchy so the hero carries more visual authority, the supporter marquee supports rather than competes with it, and the page ends with one clear enquiry call to action.

## Scope

This change is limited to the homepage hero, its supporter marquee, and the duplicate homepage enquiry section. The shared footer call to action remains unchanged. Other pages, routing, modal behavior, and hosted production output remain untouched.

## Approved Design

### Hero hierarchy

- Increase the desktop hero title maximum from `4rem` (64px) to `4.75rem` (76px).
- Use a responsive title scale of `clamp(3rem, 5.5vw, 4.75rem)`.
- Increase the supporting paragraph maximum to `1.375rem` (22px), with a tighter line-height near `1.58` so the larger copy remains cohesive.
- Move the full hero content group approximately 20px upward using asymmetric vertical padding rather than an isolated transform. This preserves normal document flow and responsive behavior.
- Keep the current heading line breaks, wording, buttons, proof panel, background image, and dark overlay.
- On mobile, retain the existing title range and shift the layout upward proportionally by reducing top padding while reserving enough bottom space for the supporter marquee.

### Supporter marquee

- Preserve the approved Option B official artwork and user-selected vertical offsets:
  - DST NIDHI: `-3px`
  - NIDHI PRAYAS: `-10px`
  - Startup Karnataka and MUTBI: `0px`
- Reduce the perceived logo scale by approximately 18–20%:
  - Base/wide logos: approximately 36px high on desktop.
  - DST NIDHI: approximately 40px high.
  - NIDHI PRAYAS: approximately 52px high.
- Reduce the desktop inter-logo gap from `2.75rem` (44px) to `1.5rem` (24px), with a smaller proportional mobile gap.
- Replace viewport-wide distribution with a content-sized sequence so the logos read as one compact institutional group.
- Keep dynamic sequence duplication, right-to-left linear motion, reduced-motion behavior, and edge fading so the marquee never reveals an empty end.
- Preserve stable per-logo slots so the loop does not jump when it repeats.

### Call to action

- Remove the Home-only `home-enquiry` section containing “Start with context” and “Share your project.”
- Remove its now-unused responsive CSS.
- Keep the shared footer banner containing “Ready to build something that lasts?” and “Get in Touch.”
- Both actions currently open the same work enquiry modal, so removing the Home-only section does not remove any unique user path.

## Component Boundaries

- `src/pages/Home.jsx`: remove the duplicate final enquiry markup; keep supporter data and hero content.
- `src/pages/Home.css`: adjust hero type and vertical rhythm; remove unused enquiry styles.
- `src/components/home/homeSections.css`: reduce supporter size and spacing while retaining approved optical offsets.
- `src/components/home/SupporterStrip.jsx`: retain the existing resize-aware endless-loop implementation unless verification reveals a coverage regression.
- `src/__tests__/designSystemRegression.test.js`: update regression expectations for the approved dimensions and removed duplicate CTA.

## Responsive Behavior

- Desktop: the hero content sits about 20px higher, the title caps at 76px, and a compact marquee crosses the lower hero edge without dominating it.
- Tablet: title and paragraph continue scaling through `clamp()`, with enough space between content, proof panel, and marquee.
- Mobile: no horizontal overflow; marquee remains content-sized and continuously covered; the hero retains safe space above the marquee.
- Reduced motion: supporters remain visible as a static wrapped group.

## Verification

- Add regression assertions before implementation and confirm they fail for the current values.
- Confirm the updated regression test passes after implementation.
- Run the full Vitest suite, ESLint, production build, and prerender verification.
- Render the homepage in Chrome at 390px, 1920px, and 3840px widths.
- Confirm the marquee moves left, retains enough duplicated coverage after one sequence shift, and produces no console errors.
- Visually confirm the hero does not collide with the header, buttons, proof panel, or supporter rail.

## Delivery Constraint

All changes remain local on `pawan/raw-radicles-redesign`. Do not push, merge, or deploy without separate approval.
