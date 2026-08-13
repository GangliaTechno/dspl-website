# Homepage Mobile Breathing Design

**Date:** 2026-08-13
**Status:** Approved design; awaiting written-spec review
**Branch:** `pawan/raw-radicles-redesign`
**Baseline commit:** `9ebad41`

## Goal

Make the deployed homepage hero feel calmer and easier to read on phones and
small tablets while preserving the current DSPL identity, approved static
artwork, proposition, responsive image sources, supporter marquee, and desktop
composition.

The live audit found no page-level horizontal overflow at the tested widths.
The congestion comes from vertical crowding: at `390px` the supporter strip
occupies the same visual zone as the full-width capability action, and the
current mobile heading and paragraph consume most of the hero before the action
and proof rail. The hero also changes abruptly from content-height at `768px`
to nearly a full viewport at `769px`.

## Approved Direction

Use a restrained mobile breathing pass rather than a new hero design.

- Preserve the current centered hierarchy, words, colour treatment, image, and
  marquee.
- Reduce mobile type and vertical gaps enough to create a clear sequence:
  heading, supporting copy, action, supporter rail.
- Keep the action at its natural content width on ordinary phones instead of
  stretching it edge to edge.
- Reserve explicit space below the action so it cannot collide with the
  supporter rail.
- Extend the compact, content-driven hero treatment through the tablet/menu
  range so the layout does not double in height immediately above `768px`.
- Preserve the full-viewport desktop hero once the desktop navigation and
  composition have enough room.

## Responsive Layout

### Phones (`<= 520px`)

- Keep the existing `1.25rem` container inset and centred text.
- Use a slightly smaller, bounded H1 scale with tight but readable line-height.
- Reduce the supporting paragraph size and line-height while retaining
  `text-wrap: pretty` and a comfortable measure.
- Use smaller, deliberate title-to-copy and copy-to-action gaps.
- Keep the capability action at natural width, centred, with a minimum
  `44px` target height.
- Place the supporter rail below the action with a visible buffer; no overlap
  is permitted at `320px`, `360px`, `390px`, `412px`, or `430px`.
- Allow the hero to grow naturally on short/narrow screens. Content and actions
  must not be clipped merely to keep the hero inside one viewport.

### Small tablets (`521px` to `1039px`)

- Continue the content-driven hero instead of switching to the desktop
  full-viewport minimum at `769px`.
- Use intermediate spacing and type values so the transition is continuous.
- Keep the current mobile navigation through `1039px`.
- Continue using the dedicated mobile artwork only through its existing
  `768px` picture-source boundary; do not change image selection in this task.

### Desktop (`>= 1040px`)

- Preserve the current full-viewport hero minimum, desktop navigation,
  typography, CTA presentation, and supporter placement.
- No desktop copy, artwork, or layout redesign is in scope.

## Components and Ownership

- `src/pages/Home.css` owns hero height, typography, spacing, and CTA width.
- `src/components/home/homeSections.css` owns the supporter rail's responsive
  bottom position and sizing.
- `src/__tests__/designSystemRegression.test.js` owns the CSS contract for the
  breakpoint transition and mobile separation.
- `src/pages/Home.jsx`, `SupporterStrip.jsx`, image assets, header behavior,
  route definitions, and copy remain unchanged.

No new component, state, dependency, data flow, or error state is required.

## Accessibility and Motion

- Preserve one semantic H1 and the real anchor for the capability action.
- Preserve at least `44px` action and menu targets.
- Preserve visible focus behavior and readable image contrast.
- Preserve the marquee's existing reduced-motion behavior.
- Do not add animation, gradients, colour tokens, or decorative effects.
- Do not rely on global `overflow-x: hidden` as proof of fit; visible content
  bounds and document width must both be checked.

## Verification

### Automated

- Update the desktop-home-height contract so full-viewport height begins with
  the desktop layout rather than immediately above `768px`.
- Add source-level assertions for mobile type, spacing, natural-width CTA, and
  supporter separation.
- Run targeted Home/design-system tests, lint, the full test suite, production
  build, prerender verification, and `git diff --check`.

### Browser matrix

Verify the homepage at:

- `320x568`
- `360x800`
- `375x667`
- `390x844`
- `412x915`
- `430x932`
- `500x800`
- `768x1024`
- `769x900`
- `820x1180`
- `1024x768`
- `1039x900`
- `1040x900`
- `1280x800`
- `1440x900`

For every width, confirm no horizontal overflow, clipped copy, CTA/supporter
collision, broken image, or console error. At the breakpoint boundaries,
confirm the hero height changes deliberately rather than jumping at `769px`.
Open and close the mobile drawer at `390px` to confirm its existing fit remains
unchanged.

## Non-goals

- No copy rewrite or shorter proposition.
- No new hero image or crop.
- No change to supporter order, logos, speed, duplication, or measurement.
- No header or drawer redesign.
- No changes to sections below the hero except observing their entry position.
- No deployment, push, merge, or `main` change.

## Success Criteria

The task is complete when the phone hero reads as four distinct layers,
the capability action and supporter rail never overlap, tablet widths retain a
compact content-driven hero without the `768px`/`769px` height jump, desktop
presentation is unchanged, all verification passes, and the deployed site is
left untouched until separately approved for release.
