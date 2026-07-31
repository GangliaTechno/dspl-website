# Homepage Hero and Canonical Naming Design

**Date:** 2026-07-29
**Status:** Approved design; awaiting written-spec review
**Branch:** `pawan/raw-radicles-redesign`

## Purpose

Refine the homepage hero into a calmer, centered, premium composition and
standardize the company and leadership names across the active repository.
The redesign must preserve the existing full-viewport hero image, the current
brand palette, the work-enquiry flow, and the brands route.

This specification supersedes only the homepage-hero content and layout
requirements in the earlier homepage refinement documents. It does not
supersede or modify the supporter-marquee design.

## Approved Direction

Use a centered editorial composition over the existing retail image.

The hero will have:

- one two-part H1;
- one centered supporting paragraph;
- two centered calls to action;
- one uniform dark scrim over the image;
- no kicker;
- no right-side proof panel;
- no gradient, glow, blur, or inset content card.

This is preferred over a card-based treatment because it retains more of the
photography and feels less templated. It is preferred over the former
left-column layout because the proof panel is being removed and the centered
composition gives the remaining content a clear visual anchor.

## Hero Content

### Heading

The H1 content and order are fixed:

1. `We build brands.`
2. `We help businesses grow.`

Desktop and tablet layouts must render these as two deliberate lines, with the
second line using the existing gold accent. Narrow mobile layouts may reduce
the type size or wrap safely only when needed to prevent horizontal overflow;
the words and order must not change.

### Supporting copy

Use this copy below the H1:

> Dashapatmaja Solutions Pvt Ltd helps businesses grow. We build your brand,
> bring you customers, and sell your products online. We also build and sell
> our own brand, Raw Radicles, so we know this work from both sides.

The paragraph must be centered, use a readable line length of approximately
60-68 characters, and remain visually subordinate to the heading.

### Calls to action

The primary action is:

- label: `Work With Us`
- behavior: open the existing work-enquiry modal
- source identifier: keep the existing homepage-hero source value unless the
  implementation finds a tested analytics contract requiring another value

The secondary action is:

- label: `See Our Brands`
- destination: `/brands`

Both actions remain visible together on desktop. On narrow mobile screens they
may stack to preserve comfortable touch targets and avoid overflow.

### Removed content

Remove these homepage-hero elements completely:

- `Brand systems for Indian consumer businesses`
- `One accountable team`
- `Brand strategy and identity`
- `Go-to-market execution`
- `E-commerce systems`
- `Discuss your next stage`
- `See our owned brand`

No hidden or visually suppressed duplicate of this content should remain in the
hero DOM.

## Visual Treatment

### Composition

The main content block is horizontally centered and vertically centered within
the usable hero area above the supporter rail. It uses the existing container
system and must not become a full-width text block.

The hero remains a strong opening viewport on desktop. Mobile height may remain
content-driven so browser chrome and short screens do not clip the calls to
action.

### Image and overlay

Keep the existing desktop and mobile hero image assets and responsive
`<picture>` behavior.

Replace the current directional gradients with one uniform, neutral-black
translucent scrim. The scrim must:

- provide sufficient contrast for white text and the gold accent;
- preserve visible photographic detail;
- use a flat color with alpha rather than a gradient;
- avoid blur, glow, and animated overlay effects.

The final alpha value is an implementation detail and should be selected by
desktop and 390 px visual verification. It should be the lightest value that
keeps the full text block consistently readable over the image.

### Typography and spacing

Reuse the existing heading and body fonts and existing gold accent token.
Retain a bold, high-impact heading while giving the paragraph and actions clear
breathing room.

The implementation must:

- keep the H1 balanced and free of clipping;
- keep the paragraph at a comfortable reading measure;
- center the CTA group;
- avoid arbitrary new color, shadow, or spacing systems;
- avoid animation because none is required for this content change.

## Canonical Naming

### Company name

The only canonical company name is:

`Dashapatmaja Solutions Pvt Ltd`

For active product copy, metadata, structured data, repository guidance, and
legal/contact copy:

- `Dashapatmaja` is one word;
- use `Solutions`, not `Services`;
- use `Pvt Ltd`, without periods;
- do not use `Private Limited`, `Pvt. Ltd.`, `Dasha Patmaja`, or other display
  variants.

This correction applies to user-facing pages, SEO metadata, structured data,
HTML metadata, current README/product/design/contribution guidance, scripts,
tests, and active repository-setting documentation.

Do not change:

- the `dashapatmaja.in` domain;
- email addresses using that domain;
- file names or asset paths solely because they contain an older internal
  label, unless the file name itself is displayed to users.

Historical Git commit messages are immutable and outside scope.

### Leadership names

Use these exact names everywhere they appear:

- `Dr. Shreepathy Rangabhatta R`
- `Dr. Anusha Pai`

Their roles, links, facial features, and approved portrait treatment remain
unchanged.

## Components and Boundaries

### Homepage

`src/pages/Home.jsx` owns the hero content and element removal.

`src/pages/Home.css` owns the centered hero layout, uniform scrim, responsive
type, and spacing.

The work-enquiry modal and `/brands` route remain the existing interaction
boundaries. No new component, state store, route, or data-fetching layer is
required.

### Naming consistency

Naming updates should be mechanical and scoped to textual company/name
references. They must not trigger unrelated copy rewrites or design changes on
other pages.

### Supporter marquee exclusion

The following files were owned by the separate supporter-marquee task and were
excluded from this historical task:

- `src/components/home/SupporterStrip.jsx`
- `src/components/home/homeSections.css`
- `src/__tests__/designSystemRegression.test.js`

This task must not edit, stage, commit, restore, or overwrite those files.
Implementation must wait until the supporter task is no longer actively
validating the shared checkout.

If a stale company or leadership-name expectation remains inside the excluded
regression file, coordinate that one expectation with the supporter task
instead of editing the file here.

## Data Flow and Error Handling

The hero has no asynchronous data flow.

- Clicking `Work With Us` calls the existing modal-opening utility.
- Clicking `See Our Brands` uses the existing client-side route.
- The responsive image retains its existing desktop/mobile source selection.

No new error state is required. Existing modal and router behavior remain the
source of truth. A regression in either interaction is a test or verification
failure, not a condition to hide with fallback UI.

## Accessibility

The implementation must preserve:

- one semantic H1 on the homepage;
- a real button for the modal action;
- a real link for the brands route;
- visible keyboard focus from the existing button/link primitives;
- readable contrast over every part of the hero image;
- no horizontal overflow at 390 px;
- no decorative duplicate content announced by assistive technology.

The background image remains decorative with an empty alt value and
`aria-hidden` picture wrapper.

## Verification

Implementation begins with regression coverage that does not edit the
supporter task's test file.

The verification set must cover:

1. exact homepage H1 and supporting copy;
2. absence of the kicker and proof-panel content;
3. exact CTA labels and their existing behaviors;
4. exact canonical company and leadership names;
5. absence of known disallowed naming variants in active source, metadata,
   scripts, tests, and current documentation;
6. desktop hero hierarchy and centered composition;
7. 390 px mobile wrapping, CTA layout, and horizontal overflow;
8. flat scrim with no hero gradient;
9. unchanged supporter-marquee files relative to the other task's handoff;
10. targeted lint/tests, full test suite, production build, prerender
    verification, and `git diff --check`.

## Success Criteria

The work is complete when:

- the homepage opens with the approved centered two-part heading;
- the supporting paragraph and both renamed actions are centered and readable;
- the removed kicker and proof panel are absent;
- the hero uses a uniform premium scrim rather than a directional gradient;
- desktop and 390 px mobile layouts have no clipping or horizontal overflow;
- the company and two leadership names match the exact canonical forms across
  the active repository;
- the separate supporter-marquee work is preserved without alteration;
- all agreed verification commands pass;
- `main` and the deployed site remain untouched.
