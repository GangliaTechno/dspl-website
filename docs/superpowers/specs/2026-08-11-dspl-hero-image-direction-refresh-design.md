# DSPL Hero Image Direction Refresh

**Date:** 2026-08-11
**Baseline commit:** `f022b1c`
**Status:** Approved for implementation

## Objective

Replace the category-interchangeable About, Brands, and Branding hero artwork with route-specific editorial scenes, while keeping the already credible Marketing billboard and E-commerce store scenes. Make the Home image bright and clearly visible by removing the global dark veil and protecting only the centred copy.

## Approved direction

### Home

- Keep `home-rotation-03` as the static responsive artwork.
- Remove the full-frame `rgba(8, 8, 8, 0.75)` overlay.
- Protect the copy with a localized radial scrim behind `.home-hero-content`, a restrained text shadow, and a translucent treatment on the existing capabilities link.
- Keep the image bright at the outer thirds and preserve the current heading, paragraph, link, supporter marquee, and layout.

### About

- Replace both desk-led frames with two complementary, fictional multidisciplinary working scenes.
- Show credible collaboration across product development, brand strategy, marketing, and commerce rather than a posed corporate portrait.
- Use a wide editorial camera position; people may be visible but are not named or presented as actual DSPL employees.
- Keep the central copy-safe area calm and keep important people and working materials within both desktop and portrait crop-safe zones.

### Brands

- Replace both formulation-desk frames with two unmistakable consumer-brand portfolio scenes.
- Show several fictional, unbranded product categories through colourful packaging silhouettes, distinct colour systems, and a curated portfolio presentation.
- Avoid readable labels, logos, trademarks, or a single dominant product that implies an existing third-party brand.

### Branding

- Replace both desk-led frames with two active brand-identity presentation or workshop scenes.
- Show identity boards, typography studies, colour cards, packaging/application mockups, and human interaction.
- Keep the subject visibly different from About: the work is a brand-system critique and handover, not a general team meeting.

### Preserved routes

- Keep both Marketing billboard/campaign-media frames.
- Keep both E-commerce store/checkout/fulfilment frames.
- Do not alter their imports, rotation order, overlay, or crops unless final live verification exposes a concrete problem.

## Responsive asset contract

Create six new generated masters and export each to:

- desktop `960 x 540` WebP;
- desktop `1440 x 810` WebP;
- mobile `640 x 853` WebP.

Use semantic families:

- `about-team-01-*` and `about-team-02-*`;
- `brands-portfolio-01-*` and `brands-portfolio-02-*`;
- `branding-workshop-01-*` and `branding-workshop-02-*`.

Preserve `RotatingHeroMedia`, the fixed two-frame order, the `800ms` opacity transition, deferred secondary loading, document-visibility pausing, reduced-motion primary-only rendering, eager primary loading, and lazy secondary loading. Increase the shared hold interval from `8000ms` to `20000ms` for About, Brands, Marketing, Branding, and E-commerce. Home remains static.

## Provenance and representation

- Generate with OpenAI built-in image generation.
- Preserve selected masters under `docs/assets/hero-masters/` and production derivatives under `src/assets/`.
- Record prompts, crop focal points, review results, and filenames in `docs/ASSET_PROVENANCE.md`.
- No readable text, logos, third-party trademarks, watermarks, public figures, or recognizable real employees.
- The About scenes are fictional editorial representations of multidisciplinary work, not documentary photographs of the DSPL team.

## Testing and acceptance

- Update asset-order tests before changing page manifests and confirm the focused suite fails for the old filenames.
- Update the shared rotation timing test before changing `HERO_ROTATION_INTERVAL_MS` and confirm it fails at the old `8000ms` contract.
- Update the Home CSS regression before changing `Home.css` and confirm it fails on the old global overlay contract.
- Preserve route IDs and all interaction/copy assertions.
- Run focused page tests, the complete Vitest suite, ESLint, production build, prerender verification, and `git diff --check`.
- In the live browser, verify both frames for About, Brands, and Branding at `1440 x 900` and `390 x 844`.
- Verify the Home localized scrim at both viewports with no horizontal overflow and with the image visibly brighter than the baseline.
