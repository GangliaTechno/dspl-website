# About Journey Image Regeneration Design

**Date:** 2026-08-13
**Source commit:** `03c9ecb`
**Status:** Implemented and verified on 2026-08-14

## Goal

Replace the complete 2022-2026 About-page journey image set with five newly
generated editorial photographs. Every image must clearly represent its own
year and achievement, feel like part of one DSPL collection, and avoid reusing
an image, composition, or dominant visual story from another milestone or
route.

The milestone facts, order, copy, layout, animation, and leadership content do
not change in this work.

## Why the Full Set Changes

The current journey artwork was designed for a four-year 2023-2026 story. The
later 2022 incorporation entry reuses the 2023 image, and the object-led studio
scenes do not distinguish every institutional, product, grant, manufacturing,
and services achievement strongly enough. A five-image regeneration is more
coherent than adding one isolated replacement.

## Collection Art Direction

All five images use one photographic language:

- premium, photorealistic editorial commercial photography;
- warm cream, walnut, charcoal, muted navy, deep green, and restrained amber;
- soft directional daylight, controlled contrast, realistic material grain,
  and natural imperfections;
- a 3:2 landscape composition designed for the existing journey frame;
- a stable central subject and adequate breathing room around important props;
- Indian startup, consumer-brand, research, and operating context expressed
  through credible environments rather than decorative stereotypes;
- no gradients, neon, floating objects, fantasy technology, exaggerated glow,
  generic handshake imagery, watermark, or synthetic stock-photo polish;
- no readable fake documents, fake interfaces, pseudo-letters, corrupted
  logos, copied trademarks, or identifiable public figures;
- no repeated hero arrangement, camera angle, or dominant prop family across
  two years.

The palette and photographic treatment repeat. The narrative composition does
not.

## Year-by-Year Image Briefs

### 2022 - Company incorporation

Create a refined but modest founding-office scene focused on formal company
formation: a blank incorporation folio, fountain pen, closed document wallet,
simple brass date-stamp tool without visible characters, and restrained DSPL
cream, charcoal, and amber material cues. Use an oblique medium-close camera
angle and architectural daylight. The scene should communicate a legal and
organisational beginning, not product design.

Do not include packaging prototypes, cacao, laboratory glassware, e-commerce
equipment, readable certificates, government emblems, or the 2023 incubator
composition.

Reference roles:

- `src/assets/icon_orange.webp`: palette reference only; do not render or
  recreate the logo.
- `src/assets/about-journey-2023.webp`: lighting and material-quality reference
  only; do not copy its desk, packaging, pinboard, or camera framing.

### 2023 - First incubation

Create an early-stage food-technology incubator environment where a modest
shared workspace transitions into a small institutional lab bench. Show one
early unbranded consumer-product prototype, basic food-development vessels,
material samples, and practical startup planning sheets with no readable text.
Use a wider eye-level composition with visible institutional architecture so it
cannot be mistaken for the 2022 legal desk or 2025 advanced validation scene.

Do not include legal-formation props, a finished chocolate launch range,
grant-award symbolism, a mature photo studio, institution logos, or copied
photography from the GoK Bioincubator website.

Reference roles:

- `src/assets/about-journey-2023.webp`: subject-stage and palette reference;
  generate a new environment and composition.
- Official Manipal-GoK Bioincubator material: factual/environmental reference
  for the combined incubation, food-technology, laboratory, and office context
  only; never copy its photography or branding.

### 2024 - First brand

Create a finished premium product-launch still life that unmistakably connects
cacao, chocolate, Ayurvedic botanicals, product packaging, and retail
readiness. Use a lower three-quarter product-photography angle with a restrained
navy, cream, cacao, and amber composition. The scene should feel more resolved
and market-ready than the exploratory 2023 prototype.

Do not reuse the Raw Radicles route hero, its exact layout, or its product
cutouts. Do not invent readable Raw Radicles text or a distorted logo. Package
surfaces may use authentic colour and structural cues but must remain free of
fake lettering.

Reference roles:

- `src/assets/about-journey-2024.webp`: primary collection anchor for lighting,
  palette, cacao, botanical, and material treatment; generate a completely new
  arrangement.
- `src/assets/raw-radicles-holy-sin.webp`,
  `src/assets/raw-radicles-wrath-relief.webp`, and
  `src/assets/raw-radicles-smart-sin.webp`: product-form and colour references
  only; do not reuse or reproduce the existing cutout composition.

### 2025 - MUTBI incubation and national grant

Create an institutional prototype-validation and manufacturing-handoff scene.
Show a developed physical prototype, precision measurement equipment, a small
technical test setup, neutral review sheets without readable text, a sealed
sample batch, and a second production-ready sample that suggests transfer from
research to manufacturing. Use a structured front-facing composition with
cooler institutional cream, charcoal, muted navy, and restrained amber light.

This is a review, validation, grant-supported development, and manufacturing
transition story. It must not look like another botanical ingredients desk.

Do not show money, award trophies, ceremonial cheque imagery, institution
logos, government emblems, readable grant documents, copied MUTBI/NIDHI
photographs, or a duplicate of the 2023 lab composition.

Reference roles:

- `src/assets/about-journey-2025.webp`: prototype-development and measurement
  reference only; replace its generic formulation-desk composition.
- `src/assets/supporter-mutbi-marquee.png`,
  `src/assets/supporter-dst-nidhi-marquee.png`, and
  `src/assets/supporter-nidhi-prayas-marquee.png`: factual programme references
  only; none of these marks appears inside the generated photograph.
- Official MUTBI and NIDHI-PRAYAS material: factual reference for incubation,
  mentoring, prototype support, technical validation, and access to facilities;
  never copy institutional photography.

### 2026 - Services arm

Create a mature integrated-services studio with three connected vertical zones:
an identity-review wall using abstract shapes and material swatches, campaign
planning represented by blank layouts and non-readable charts, and an
e-commerce/fulfilment zone with unbranded device silhouettes, packaging, and
dispatch-ready parcels. Use an architectural wide view rather than another
dominant desk still life.

The result must communicate coordinated branding, marketing, and e-commerce
delivery in one credible operating environment without becoming a collage.

Do not reuse any About hero, Branding workshop, Marketing billboard/dashboard,
or E-commerce route image. Do not include readable screens, labels, barcodes,
logos, pseudo-text, duplicated devices, or repeated people.

Reference roles:

- `src/assets/about-journey-2026.webp`: operating-stage and material reference;
  replace its desk-led composition.
- `src/assets/branding-workshop-02-1440.webp`,
  `src/assets/marketing-primary-1440.webp`, and
  `src/assets/ecommerce-primary-1440.webp`: semantic references for identity,
  campaign, and commerce cues only; do not reproduce their compositions.

## Generation and Asset Handling

- Use the built-in image generation tool in generation mode.
- Generate each year with its own prompt and tool call; do not request five
  unrelated scenes as variants of one prompt.
- Treat every local image above as a labelled visual reference, never as an edit
  target.
- Save selected lossless masters as
  `docs/assets/journey-masters/about-journey-v2-<year>.png`.
- Export delivery assets as
  `src/assets/about-journey-v2-<year>.webp` at 1536 x 1024, WebP quality 86,
  using Lanczos resampling without upscaling.
- Preserve the existing `about-journey-2023.webp` through
  `about-journey-2026.webp` files for provenance and rollback. They become
  cleanup candidates only after separate approval.
- Record the final prompt, input-reference roles, generation method, review
  result, and derivative settings in `docs/ASSET_PROVENANCE.md`.

## Duplicate-Prevention Gate

Before implementation, every selected image must pass all of these checks:

1. The five production paths are unique and each milestone imports exactly one
   matching year asset.
2. No selected output is an edit, crop, or resized copy of another journey or
   route asset.
3. Manual side-by-side review finds no repeated camera framing, dominant prop
   arrangement, or scene narrative.
4. 2022 reads as incorporation; 2023 as early incubation; 2024 as finished
   brand launch; 2025 as prototype validation and manufacturing handoff; and
   2026 as coordinated client services without relying on the year label.
5. No image contains copied third-party photography, a malformed logo,
   pseudo-text, watermark, repeated object, or obvious generation artifact.

If an image fails one semantic or visual check, regenerate only that year with
one targeted correction. Do not weaken the collection-wide constraints.

## Code and Documentation Changes After Approval

- Add five lossless masters under `docs/assets/journey-masters/`.
- Add five production WebP assets under `src/assets/`.
- Update `src/pages/About.jsx` so 2022-2026 each import and render their matching
  `about-journey-v2-<year>.webp` file.
- Update every affected alt description to state the new scene accurately.
- Update the About journey regression test to require five unique year assets
  and prohibit reusing one imported image for two milestones.
- Update `docs/ASSET_PROVENANCE.md` with the complete five-image record.
- Do not change the journey layout or CSS unless live QA reveals a crop defect.

## Validation

- Inspect each master and WebP output at original resolution.
- Compare all five journey images side by side with the route hero and relevant
  service-page references.
- Run the focused About and design-system regression tests.
- Run lint, the complete test suite, the production build, HTML verification,
  asset checks, and `git diff --check`.
- Verify `/about` at desktop and 390 x 844 mobile dimensions with no broken
  images, overflow, console errors, or ambiguous milestone crops.

## Scope Boundaries

- Do not change milestone facts, dates, headings, or body copy.
- Do not change leadership portraits, About hero rotation, navigation, footer,
  supporter strip, other route imagery, or production deployment.
- Do not delete or overwrite the current journey images.
- Do not commit, push, merge, or deploy without separate user authorization.
