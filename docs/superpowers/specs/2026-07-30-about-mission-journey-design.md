# About Mission and Journey Design

## Goal

Polish the About page by:

1. making the Mission and Vision cards equal in height without adding filler copy; and
2. replacing the flat milestone ledger with a premium alternating image-and-story layout.

The result must match the existing Dashapatmaja cream, black, white, and amber design system and remain readable, restrained, and responsive.

## Mission and Vision

- Preserve the approved Mission and Vision wording.
- Stretch both cards to the same height within their shared desktop grid row.
- Keep the icon, heading, and paragraph aligned from the same top positions.
- When the cards stack on smaller screens, allow each card to use its natural content height.
- Do not add decorative content solely to balance the cards.

## Journey Structure

The journey contains four editorial milestone rows:

1. **2023 — Founding and first incubation**
2. **2024 — First brand**
3. **2025 — MUTBI incubation and national grant**
4. **2026 — Services arm**

Desktop rows alternate:

- 2023: image left, story right
- 2024: story left, image right
- 2025: image left, story right
- 2026: story left, image right

Each story contains the existing year, milestone heading, and factual bullet points. The current central rule and circular timeline badges are removed.

On mobile, every row becomes one column with the image first and the story second. Source order must support that layout without duplicating content.

## Original Editorial Image Set

Create four original images specifically for this page. They must feel like one photographic collection:

- warm cream, walnut, charcoal, muted navy, and restrained amber palette;
- soft directional natural light;
- premium editorial product and workspace photography;
- Indian consumer-brand and startup context;
- realistic materials, restrained composition, and generous negative space;
- no readable text, watermarks, copied trademarks, generated company logos, or recognizable public figures;
- no exaggerated AI effects, neon colors, gradients, floating objects, or implausible hands/faces.

### Image Subjects

- **2023:** early-stage consumer-brand planning in a calm incubator studio; notebooks, packaging sketches, material samples, and a modest prototype workspace.
- **2024:** premium cacao and Ayurvedic botanical product-development still life; chocolate, cacao, herbs, navy packaging materials, and subtle gold accents without reproducing the Raw Radicles logo.
- **2025:** innovation-grant and incubation workspace; product prototype, measured ingredients, technical notes, and institutional research atmosphere without reproducing MUTBI or NIDHI marks.
- **2026:** mature brand and e-commerce operations studio; refined packaging system, product photography setup, laptop storefront workflow, and dispatch-ready parcels.

All four final assets use the same aspect ratio and visual treatment. Export responsive WebP files with an appropriate mobile crop if the desktop framing does not survive narrow screens.

## Visual Layout

- Journey uses the existing `.container`; the milestone list is constrained to a `72rem` maximum width for comfortable reading.
- Desktop grid: two balanced columns with a consistent image aspect ratio.
- Row spacing: generous enough to establish a narrative rhythm without turning each milestone into a full-screen panel.
- Image frame: subtle border, four-pixel corner radius, `object-fit: cover`, and no heavy shadow.
- Story surface: no floating white card; hierarchy comes from year, heading, copy, spacing, and a restrained rule.
- Background: existing warm cream surface with no gradient.
- Accent usage: amber only for year labels and small structural details.
- Body copy remains limited to a readable line length.

## Motion and Accessibility

- Reuse the page's existing one-time viewport reveal pattern.
- Animate only opacity and transform.
- Respect the existing reduced-motion handling.
- Provide descriptive alt text for every milestone image.
- Preserve semantic heading order and chronological source order.
- Maintain sufficient text contrast and avoid placing essential copy over images.

## Responsive Behavior

- Desktop and tablet: alternating two-column rows.
- Narrow screens: single-column rows, image before text, consistent gaps, and no horizontal overflow.
- Images retain a stable aspect ratio and use intentional focal positioning.
- Mission and Vision stack cleanly without forced desktop height.

## Validation

- Regression test for equal Mission and Vision card height.
- Regression test for four milestone images and alternating row classes.
- Verify desktop and 390-pixel mobile layouts in the public preview.
- Confirm no horizontal overflow, broken images, or browser console errors.
- Run lint, the full test suite, production build, prerender verification, and `git diff --check`.

## Scope Boundaries

- Do not change milestone facts without separate approval.
- Do not alter leadership names or portraits.
- Do not change the header, supporter marquee, navigation, or production deployment.
- Do not use external copyrighted photography.
