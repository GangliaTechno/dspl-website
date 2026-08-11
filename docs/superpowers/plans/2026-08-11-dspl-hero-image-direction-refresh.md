# DSPL Hero Image Direction Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace six generic hero frames with responsive route-specific editorial artwork and replace Home's global dark overlay with localized text protection.

**Architecture:** Keep the existing `RotatingHeroMedia` lifecycle and route-owned image manifests. Generate six masters, export deterministic responsive derivatives, then update only the three affected route manifests, Home presentation CSS, focused regression expectations, and asset provenance.

**Tech Stack:** React 19.2.8, Vite 8.0.12, Vitest 4.1.10, Testing Library 16.3.2, plain CSS, OpenAI built-in image generation, Python/Pillow asset exporter.

## Global Constraints

- Preserve commit `f022b1c` behavior outside approved hero imagery and Home text protection.
- Keep Marketing and E-commerce hero assets and manifests unchanged.
- Keep every affected interior route at two images with existing IDs and fixed order.
- Use one shared `20000ms` rotation interval on About, Brands, Marketing, Branding, and E-commerce. Keep the `800ms` opacity transition, visibility pause, reduced-motion behavior, and loading priorities. Home remains static.
- Do not introduce readable generated text, logos, trademarks, watermarks, public figures, or recognizable real employees.
- Export `960 x 540`, `1440 x 810`, and `640 x 853` production WebP derivatives from each selected master.
- Preserve all routes, copy, CTA behavior, form behavior, analytics, accessibility, and dependencies.
- Do not push, merge, deploy, or modify `main`.

---

### Task 1: Generate and export six responsive hero families

**Files:**
- Create: `docs/assets/hero-masters/about-team-01.png`
- Create: `docs/assets/hero-masters/about-team-02.png`
- Create: `docs/assets/hero-masters/brands-portfolio-01.png`
- Create: `docs/assets/hero-masters/brands-portfolio-02.png`
- Create: `docs/assets/hero-masters/branding-workshop-01.png`
- Create: `docs/assets/hero-masters/branding-workshop-02.png`
- Create: `src/assets/{about-team-01,about-team-02,brands-portfolio-01,brands-portfolio-02,branding-workshop-01,branding-workshop-02}-{960,1440,mobile}.webp`
- Reuse: `scripts/export_hero_assets.py`

**Interfaces:**
- Consumes: six selected image-generation outputs and the existing deterministic exporter.
- Produces: six responsive families importable by `About.jsx`, `Brands.jsx`, and `Branding.jsx`.

- [ ] **Step 1: Generate one 16:9 master for each approved scene brief**

Use one built-in image-generation call per master. Every prompt must specify a centre-safe website hero, crop-safe outer-third subjects, realistic editorial photography, fictional/unbranded content, and no readable text or watermark.

- [ ] **Step 2: Inspect every master before accepting it**

Reject malformed hands/faces, duplicated objects, synthetic text, logos, trademarks, weak category cues, or compositions that collapse under a portrait crop.

- [ ] **Step 3: Export deterministic responsive derivatives**

Run the existing exporter with per-image focal points so each family yields exact `960 x 540`, `1440 x 810`, and `640 x 853` WebP outputs without upscaling.

- [ ] **Step 4: Verify the derivative dimensions**

Run a Pillow dimension probe and require all 18 files to match the exact contract.

### Task 2: Change asset manifests through a red-green test cycle

**Files:**
- Modify: `src/pages/__tests__/About.test.jsx`
- Modify: `src/pages/__tests__/Brands.test.jsx`
- Modify: `src/pages/__tests__/ServiceCopy.test.jsx`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Brands.jsx`
- Modify: `src/pages/Branding.jsx`

**Interfaces:**
- Consumes: the 18 derivatives from Task 1.
- Produces: unchanged hero IDs and rotation behavior backed by the new semantic asset families.

- [ ] **Step 1: Update the asset expectations first**

Expect About to mount `about-team-01-1440.webp` then `about-team-02-1440.webp`; Brands to mount `brands-portfolio-01-1440.webp` then `brands-portfolio-02-1440.webp`; Branding's route case to use `branding-workshop-01-1440.webp` as primary and assert `branding-workshop-02-1440.webp` on the second layer.

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/About.test.jsx src/pages/__tests__/Brands.test.jsx src/pages/__tests__/ServiceCopy.test.jsx
```

Expected: asset-name assertions fail against the old desk-led manifests.

- [ ] **Step 3: Replace only the three route import families and manifests**

Keep `about-primary/about-02`, `brands-primary/brands-02`, and `branding-primary/branding-02`. Keep dimensions, `sizes`, and mobile breakpoints unchanged.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run the same command and require every focused test to pass.

### Task 3: Increase the shared rotating-hero hold through a red-green test cycle

**Files:**
- Modify: `src/components/__tests__/RotatingHeroMedia.test.jsx`
- Modify: `src/components/RotatingHeroMedia.jsx`

**Interfaces:**
- Consumes: the shared `HERO_ROTATION_INTERVAL_MS` constant used by every rotating interior hero.
- Produces: one `20000ms` hold for About, Brands, Marketing, Branding, and E-commerce without changing the `800ms` crossfade.

- [ ] **Step 1: Update the timing assertion first**

Require the secondary layer to remain inactive at `19999ms` and become active after the final `1ms`.

- [ ] **Step 2: Run the component test and verify RED**

Run:

```powershell
npm.cmd test -- src/components/__tests__/RotatingHeroMedia.test.jsx
```

Expected: the current `8000ms` timer activates the second layer before the new `19999ms` boundary.

- [ ] **Step 3: Change the shared interval constant**

Set `HERO_ROTATION_INTERVAL_MS = 20000`. Do not change `HERO_TRANSITION_MS`.

- [ ] **Step 4: Run the component test and verify GREEN**

Run the same command and require all rotation, visibility, cleanup, loading, and reduced-motion cases to pass.

### Task 4: Replace Home's global overlay through a red-green test cycle

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/Home.css`

**Interfaces:**
- Consumes: the current static `home-rotation-03` picture and centred `.home-hero-content` structure.
- Produces: a transparent global pseudo-overlay and a localized copy scrim that leaves the image bright.

- [ ] **Step 1: Replace the old flat-overlay regression first**

Require `.home-hero::after` to be transparent, `.home-hero-content` to establish isolated positioning and text shadow, `.home-hero-content::before` to provide the localized radial scrim, and the mobile media query to reduce that scrim.

- [ ] **Step 2: Run the focused regression and verify RED**

Run:

```powershell
npm.cmd test -- src/__tests__/designSystemRegression.test.js
```

Expected: failure because `Home.css` still applies `rgba(8, 8, 8, 0.75)` globally and has no localized scrim.

- [ ] **Step 3: Implement the minimal approved CSS**

Set `.home-hero::after { background: transparent; }`. Add isolated relative positioning and restrained text shadow to `.home-hero-content`; add an absolutely positioned radial-gradient `::before` behind the copy; add a restrained translucent background/backdrop blur to `.hero-capabilities-link`; reduce the local scrim strength at `max-width: 768px`.

- [ ] **Step 4: Run the focused regression and verify GREEN**

Run the same command and require all design-system assertions to pass.

### Task 5: Record provenance and run code validation

**Files:**
- Modify: `docs/ASSET_PROVENANCE.md`

**Interfaces:**
- Consumes: selected prompts, master paths, crop focal points, and visual review results.
- Produces: a complete audit trail for all six new families and an explicit supersession note for the old desk-led families.

- [ ] **Step 1: Add provenance rows and exact prompts**

Record built-in generation, the date, master and derivative paths, crop focal points, representation note for About, and trademark/text/watermark review.

- [ ] **Step 2: Run focused lint and tests**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/About.test.jsx src/pages/__tests__/Brands.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
npm.cmd run lint
```

Expected: zero failures and zero lint errors.

### Task 6: Full verification and live crop QA

**Files:**
- Verify only; no planned source changes.

**Interfaces:**
- Consumes: the complete implementation.
- Produces: release-readiness evidence without push, merge, or deployment.

- [ ] **Step 1: Run full automated verification**

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run verify:html
git diff --check
```

Expected: all tests pass, production build succeeds, all prerender routes verify, and no whitespace errors exist.

- [ ] **Step 2: Inspect in the live browser**

At `1440 x 900` and `390 x 844`, inspect Home plus both frames on About, Brands, and Branding. Confirm category specificity, crop integrity, text legibility, no horizontal overflow, and a visibly bright Home image. Recheck Marketing and E-commerce to confirm they remain unchanged.

- [ ] **Step 3: Inspect the final diff and worktree**

Confirm only the approved hero assets, three route manifests, Home CSS, focused tests, provenance, design, and plan are changed. Do not push or deploy.
