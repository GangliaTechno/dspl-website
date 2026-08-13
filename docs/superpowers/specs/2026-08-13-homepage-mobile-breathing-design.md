# Homepage Mobile Breathing and Responsive Hero Media Design

**Date:** 2026-08-13
**Status:** Approved design
**Branch:** `pawan/raw-radicles-redesign`
**Baseline commit:** `9ebad41`

## Goal

Make the deployed homepage hero feel calmer and easier to read on phones and
small tablets, correct its tablet artwork choice, and improve the mobile
resolution of the existing Marketing and E-commerce dashboard frames while preserving the current DSPL
identity, approved proposition, supporter marquee, desktop composition, and
two-frame service-page rotation.

The live audit found no page-level horizontal overflow at the tested widths.
The congestion comes from vertical crowding: at `390px` the supporter strip
occupies the same visual zone as the full-width capability action, and the
current mobile heading and paragraph consume most of the hero before the action
and proof rail. The hero also changes abruptly from content-height at `768px`
to nearly a full viewport at `769px`.

The expanded live audit found two image-quality issues. Home serves its
portrait crop through `768px`, which leaves only about 35 percent of the scene
visible in the shallow `768px` tablet hero. Marketing and E-commerce also use
dashboard frames with only `480px`-wide mobile files; those frames look softer
than the retained `640px` mobile families.

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
- Serve Home's portrait artwork only on phones and use the landscape family on
  tablets, where the hero has a landscape composition.
- Preserve the existing two-frame Marketing and E-commerce rotation, its order,
  timing, transition, deferred loading, visibility pause, and reduced-motion
  fallback.
- Preserve the current dashboard scenes and generate faithful higher-resolution
  mobile enhancements from those exact images. Do not substitute alternate
  Marketing or E-commerce artwork.
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
- Continue using Home's dedicated portrait artwork.

### Small tablets (`521px` to `1039px`)

- Continue the content-driven hero instead of switching to the desktop
  full-viewport minimum at `769px`.
- Use intermediate spacing and type values so the transition is continuous.
- Keep the current mobile navigation through `1039px`.
- Switch Home to the landscape artwork above `600px`; do not force the portrait
  crop into the shallow tablet hero.

### Desktop (`>= 1040px`)

- Preserve the current full-viewport hero minimum, desktop navigation,
  typography, CTA presentation, and supporter placement.
- No desktop copy, artwork, or layout redesign is in scope.

## Service-page Rotation and Image Quality

- Marketing remains `marketing-primary` followed by `marketing-02`.
- E-commerce remains `ecommerce-dashboard` followed by `ecommerce-primary`.
- Keep `HERO_ROTATION_INTERVAL_MS` at `20000` and
  `HERO_TRANSITION_MS` at `800`.
- Keep secondary mounting deferred, primary loading eager, secondary loading
  lazy, document-visibility pausing, cleanup, and primary-only rendering for
  reduced motion.
- Keep `marketing-dashboard-{960,1440}.webp` and
  `ecommerce-dashboard-{960,1440}.webp` unchanged.
- Create `marketing-dashboard-mobile-hq.webp` and
  `ecommerce-dashboard-mobile-hq.webp` from high-fidelity edits of the current
  mobile files. Preserve the same portrait crop, objects, scene, colour,
  lighting, and visual identity; improve only resolution and clarity.
- Retain the original `480px` mobile files for source comparison and document
  the enhanced derivatives in `docs/ASSET_PROVENANCE.md`.
- This pass improves the objectively weak mobile dashboard sources but does not
  claim native Retina coverage across every route or manufacture `1920px`
  desktop files from smaller masters.
- The broader native high-DPI source-generation programme remains a separate
  visual-art direction task because it requires genuinely larger landscape and
  portrait masters for every route.

## Components and Ownership

- `src/pages/Home.css` owns hero height, typography, spacing, and CTA width.
- `src/pages/Home.jsx` owns the phone-versus-tablet picture boundary.
- `src/components/home/homeSections.css` owns the supporter rail's responsive
  bottom position and sizing.
- `src/pages/Marketing.jsx` and `src/pages/Ecommerce.jsx` own their fixed
  two-frame image manifests and select the enhanced mobile dashboard sources.
- `src/components/RotatingHeroMedia.jsx` owns rotation behaviour and remains
  functionally unchanged.
- `src/__tests__/designSystemRegression.test.js` owns the CSS contract for the
  breakpoint transition and mobile separation.
- `src/pages/__tests__/ServiceCopy.test.jsx` owns service image order and asset
  identity assertions.
- `SupporterStrip.jsx`, header behavior, route definitions, and copy remain
  unchanged.

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
- Assert Home's portrait source ends at `600px` and its landscape source set is
  retained.
- Assert Marketing and E-commerce still expose exactly two frames in their
  existing order and reference the enhanced mobile dashboard files.
- Keep the existing `RotatingHeroMedia` lifecycle tests passing unchanged.
- Run the deterministic asset-export tests before regenerating derivatives.
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
- `600x900`
- `601x900`
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
confirm the Home crop changes deliberately at `600px`/`601px` and the hero
height does not jump at `768px`/`769px` or `1039px`/`1040px`. Open and close the
mobile drawer at `390px` to confirm its existing fit remains unchanged.

At `390x844`, `768x1024`, `1440x900`, and `1920x1080`, also inspect both
Marketing and E-commerce frames after rotation. Confirm that each route still
rotates after 20 seconds, the dashboard frame is sharper on mobile, the centre
copy remains legible, and the focal content survives the crop.

## Non-goals

- No copy rewrite or shorter proposition.
- No alternate Marketing or E-commerce scene and no change to the desktop
  dashboard artwork.
- No change to supporter order, logos, speed, duplication, or measurement.
- No header or drawer redesign.
- No removal, reordering, shortening, or acceleration of service-page rotation.
- No behavioural change to `RotatingHeroMedia`.
- No deletion of superseded dashboard files in this task; cleanup requires a
  separate candidate review and approval.
- No claim of full 2x/3x device-density coverage from the current masters.
- No changes to sections below the hero except observing their entry position.
- No deployment, push, merge, or `main` change.

## Success Criteria

The task is complete when the phone hero reads as four distinct layers, the
capability action and supporter rail never overlap, Home uses a suitable crop
on phones and tablets, tablet widths retain a compact content-driven hero
without the `768px`/`769px` height jump, Marketing and E-commerce retain their
same two-frame 20-second rotation with sharper mobile dashboard sources, desktop
presentation remains intentional, all verification passes, and the deployed
site is left untouched until separately approved for release.
