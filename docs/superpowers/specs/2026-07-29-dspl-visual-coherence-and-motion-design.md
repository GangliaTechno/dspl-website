# DSPL Visual Coherence and Motion Design

Date: 2026-07-29

## Objective

Refine the public DSPL website so that its header motion, supporter proof,
homepage imagery, Marketing imagery, and About journey read as one deliberate
professional system. Preserve the approved homepage copy, company naming,
supporter-logo artwork, logo sizes, and optical baseline corrections.

## Evidence

- The fixed header is approximately 97 px tall at the top of the page and
  approximately 64 px tall after only 20 px of scrolling.
- The header container padding and logo height currently change with a
  zero-second layout transition, which creates a visible snap.
- The supporter loop uses a 60 px desktop gap, a 48 px mobile gap, and an
  18-second continuous animation.
- The About journey occupies approximately 1,577 px on a 1440 x 900 viewport
  and approximately 1,939 px on a 390 x 844 viewport for four milestones.
- The About journey background source is a 413 x 257 blurred supermarket
  photograph.
- The Marketing hero is a Times Square photograph containing visible
  third-party brand marks.
- The repository contains no source or license record for the existing Home,
  Marketing, or journey photographs.

## Design Direction

Use a warm editorial-realism system:

- cream, warm white, charcoal, saffron gold, warm wood, and restrained navy;
- realistic Indian consumer-business environments;
- composed negative space for page copy;
- no readable third-party labels, trademarks, fake interface text, or
  watermarks;
- no futuristic dashboards or generic corporate-office imagery.

The generated images are new compositions, not edits or imitations of the
existing photographs.

## Header

The header must keep stable geometry while the visitor scrolls.

- Desktop outer height: 76 px.
- Mobile outer height: 72 px.
- Desktop logo height: 48 px.
- Mobile logo height: 44 px.
- Scrolling may strengthen the white background, bottom border, and shadow.
- Scrolling must not change header, container, or logo dimensions.
- Visual-state transitions use 200 ms and the existing emphasized easing.
- The scroll listener is passive.
- `prefers-reduced-motion: reduce` disables the transition.

The shared page top offsets must match the stable header rather than relying on
the former 97-to-64 px collapse.

## Supporter Marquee

Preserve the four approved files and their individual optical values.

- Do not regenerate, resize, recrop, or vertically reposition the supporter
  logos.
- Desktop gap: 72 px.
- Mobile gap: 56 px.
- Cycle duration: 22 seconds, linear, continuous, and seam-free.
- Keep the ResizeObserver measurement and exact sequence-width translation.
- Pause the track while its viewport is hovered or keyboard focus is within
  the supporter region.
- Add a compact explicit pause/play button for touch and keyboard users.
- The control has an accessible name and at least a 36 x 36 px visible target.
- Reduced-motion users receive the existing static layout and no redundant
  pause control.

## Homepage Hero Image

Create a new photorealistic editorial scene for the homepage:

- premium Indian consumer-goods retail or brand-studio environment;
- warm wood, cream stone, saffron-gold accents, and restrained navy;
- carefully arranged unbranded consumer packaging;
- wide landscape framing with calm central negative space;
- realistic material grain and lighting;
- no people, trademarks, readable packaging, fake text, or watermarks.

Retain the approved centered two-line H1, paragraph, buttons, and flat dark
scrim. Produce responsive WebP derivatives and keep the existing eager,
high-priority picture loading behavior.

## Marketing Hero Image

Create a matching photorealistic editorial scene:

- Indian D2C campaign-planning worktable;
- unbranded packaging prototypes, media-planning sheets, a phone, and
  restrained analytics shapes;
- warm editorial lighting and the same palette as the homepage;
- wide landscape framing with calm central negative space;
- no people, billboards, trademarks, readable screens, fake interface text,
  or watermarks.

Retain the shared ServicePage hero structure and responsive `<picture>`
pipeline.

## About Journey

Remove the photograph, dark overlay, alternating cards, and center zig-zag
timeline.

Use a cream editorial ledger:

- one section heading followed by four chronological rows;
- desktop row columns: year, gold marker, milestone content;
- mobile row columns: gold marker and content, with the year above the title;
- thin neutral row dividers and one restrained vertical gold rule;
- transparent content surfaces without card shadows;
- existing milestone wording and icons remain;
- the layout must not overflow horizontally.

## Asset Provenance

Create `docs/ASSET_PROVENANCE.md` and record:

- production filename;
- whether the asset is generated, commissioned, or licensed;
- tool or source provider;
- generation date or download date;
- final production prompt or source URL;
- visible-rights review notes;
- human approval status.

Keep the current files in the repository until the new production derivatives
are verified. Deletion remains a separate approval decision.

## Verification

- Source-level regression tests cover stable header geometry, motion
  preferences, marquee spacing/duration/control, new hero asset references,
  and the photo-free journey ledger.
- Existing component tests remain green.
- ESLint, the full Vitest suite, production build, prerender verification, and
  `git diff --check` pass.
- Live checks cover `/`, `/about#timeline`, and `/marketing` at 1440 x 900 and
  390 x 844.
- The live checks confirm no horizontal overflow, no header height change after
  scrolling, readable hero copy, a seamless marquee, and a compact journey.

