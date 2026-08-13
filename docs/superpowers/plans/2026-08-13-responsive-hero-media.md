# Responsive Hero Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Home more mobile breathing room, select its artwork appropriately on phones and tablets, and improve the existing Marketing and E-commerce dashboard images on mobile without changing their scenes or rotation.

**Architecture:** Keep Home as one static responsive `<picture>` and keep the service-page image manifests and `RotatingHeroMedia` lifecycle unchanged. Add non-destructive high-quality mobile dashboard derivatives from the exact current artwork, point only the two mobile manifest imports at them, and preserve every existing desktop source and frame order.

**Tech Stack:** React 19, Vite 8, Vitest, CSS, WebP image assets.

## Global Constraints

- Preserve the exact current Marketing and E-commerce scenes and frame order.
- Preserve the two-frame `20000ms` rotation, `800ms` transition, deferred secondary mounting, visibility pause, cleanup, and reduced-motion primary-only rendering.
- Keep all existing dashboard files; add `-mobile-hq.webp` siblings non-destructively.
- Home remains static and uses its portrait artwork only through `600px`.
- Do not alter copy, supporter order or speed, headers, routes, or sections below the Home hero.
- Keep all work local and unstaged. Do not commit, push, merge, deploy, or modify `main` without separate approval.

---

### Task 1: Add higher-quality versions of the same mobile dashboard images

**Files:**
- Create: `src/assets/ecommerce-dashboard-mobile-hq.webp`
- Create: `src/assets/marketing-dashboard-mobile-hq.webp`
- Modify: `docs/ASSET_PROVENANCE.md`

**Interfaces:**
- Consumes: `src/assets/ecommerce-dashboard-mobile.webp` and `src/assets/marketing-dashboard-mobile.webp` as exact edit references.
- Produces: two portrait WebP assets at greater than `480px` width, preserving the existing crop and scene identity.

- [ ] **Step 1: Generate high-fidelity edits from the exact current mobile files**

Use the built-in image editor separately for each source. Lock portrait crop, camera, object positions, lighting, colour, and scene. Permit only increased resolution, micro-detail, edge definition, and photographic clarity.

- [ ] **Step 2: Inspect both outputs against their originals**

Reject any output that substitutes the scene, changes the crop materially, introduces a new brand or watermark, or moves/removes the laptop, phone, charts, road, skyline, vehicles, buildings, or billboards.

- [ ] **Step 3: Save non-destructive WebP derivatives**

Copy the accepted outputs into `src/assets` as the exact `-mobile-hq.webp` filenames. Preserve the original 480px files.

- [ ] **Step 4: Verify the new image contract**

Run:

```powershell
node -e "const sharp=require('sharp'); Promise.all(['src/assets/ecommerce-dashboard-mobile-hq.webp','src/assets/marketing-dashboard-mobile-hq.webp'].map(async p=>({p,m:await sharp(p).metadata()}))).then(rows=>{for(const {p,m} of rows){if(m.format!=='webp'||m.width<=480||m.height<=854)throw new Error(p); console.log(p,m.width+'x'+m.height,m.format)}})"
```

Expected: both files report WebP format with dimensions greater than `480x854`.

- [ ] **Step 5: Record provenance**

Add rows to `docs/ASSET_PROVENANCE.md` stating that each `-mobile-hq.webp` is a high-fidelity built-in edit of its corresponding current mobile dashboard file, with scene/crop invariants visually reviewed and the original retained.

### Task 2: Select the enhanced mobile files without changing rotation

**Files:**
- Modify: `src/pages/__tests__/ServiceCopy.test.jsx`
- Modify: `src/pages/Marketing.jsx`
- Modify: `src/pages/Ecommerce.jsx`
- Test: `src/pages/__tests__/ServiceCopy.test.jsx`
- Verify unchanged: `src/components/RotatingHeroMedia.jsx`

**Interfaces:**
- Consumes: the two `-mobile-hq.webp` assets from Task 1.
- Produces: unchanged frame IDs/order and desktop sources with enhanced mobile dashboard imports.

- [ ] **Step 1: Add failing mobile-source assertions**

Add `dashboardMobileAsset` to the Marketing and E-commerce cases:

```js
// Marketing
dashboardMobileAsset: 'marketing-dashboard-mobile-hq.webp',

// E-commerce
dashboardMobileAsset: 'ecommerce-dashboard-mobile-hq.webp',
```

Accept the field in the test callback and assert that one hero `<source media="(max-width: 767px)">` has a `srcset` containing that value. Keep the current `heroIds`, `primaryHeroAsset`, and `secondaryHeroAsset` values unchanged.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/ServiceCopy.test.jsx
```

Expected: Marketing and E-commerce fail because their source manifests still reference the old mobile filenames.

- [ ] **Step 3: Change only the two mobile imports**

In `Marketing.jsx`, replace the dashboard mobile import target with:

```js
import marketingRotation02Mobile from '../assets/marketing-dashboard-mobile-hq.webp';
```

In `Ecommerce.jsx`, replace the dashboard mobile import target with:

```js
import ecommerceDashboardMobile from '../assets/ecommerce-dashboard-mobile-hq.webp';
```

Do not modify either `heroImages` array, any 960/1440 import, ID, order, interval, transition, or component prop.

- [ ] **Step 4: Verify image manifests and rotation lifecycle**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/ServiceCopy.test.jsx src/components/__tests__/RotatingHeroMedia.test.jsx
```

Expected: both test files pass and all existing lifecycle assertions remain green.

### Task 3: Give Home mobile breathing room and correct the tablet crop

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.css`
- Modify: `src/components/home/homeSections.css`
- Test: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: existing Home content, static picture family, and supporter strip.
- Produces: portrait source through `600px`, content-height layout through `1039px`, natural-width phone CTA, and explicit CTA-to-supporter separation.

- [ ] **Step 1: Add failing Home source and layout contracts**

Use source assertions for `<source media="(max-width: 600px)"`, `min-height: auto` under `max-width: 1039px`, `width: auto` plus `min-height: 44px` for the phone CTA, and `bottom: 1.25rem` for the mobile supporter band. Replace the old assertion that requires compact height only under `768px`.

- [ ] **Step 2: Run the focused test and confirm the old layout fails**

Run:

```powershell
npm.cmd test -- src/__tests__/designSystemRegression.test.js
```

Expected: failure on the old `768px` picture boundary, old compact-height boundary, full-width phone CTA, and `2.5rem` supporter position.

- [ ] **Step 3: Implement the approved Home source and CSS values**

- Change the portrait `<source>` boundary in `Home.jsx` to `max-width: 600px`.
- Add `max-width: 1039px` compact hero rules with layout padding `clamp(4.25rem, 8vw, 5.5rem) clamp(8rem, 14vw, 9.5rem)`.
- At `max-width: 768px`, use title margin `1.25rem`, title size `clamp(2.125rem, 8.5vw, 2.875rem)`, paragraph margin `1.75rem`, paragraph size `1.0625rem`, and line-height `1.55`.
- At `max-width: 520px`, use layout padding `3.5rem 8rem`, title size `clamp(2rem, 9vw, 2.5rem)`, paragraph measure `34ch`, paragraph margin `1.5rem`, paragraph size `1rem`, line-height `1.5`, and CTA `width: auto; min-height: 44px`.
- In `homeSections.css`, change only the mobile supporter `bottom` to `1.25rem`.

- [ ] **Step 4: Verify the focused Home contract**

Run:

```powershell
npm.cmd test -- src/__tests__/designSystemRegression.test.js
```

Expected: the design-system test file passes.

### Task 4: Release-level verification and responsive browser QA

**Files:**
- Verify: all changed source, tests, documentation, and generated assets.

**Interfaces:**
- Consumes: completed Tasks 1-3.
- Produces: evidence that layout, image quality, rotation, accessibility, build, and prerendering remain intact.

- [ ] **Step 1: Run the repository validation gate**

Run separately: `python -m unittest scripts.test_generate_public_assets scripts.test_export_hero_assets`, `npm.cmd run lint`, `npm.cmd test`, `npm.cmd run build`, `npm.cmd run verify:html`, `npm.cmd audit --audit-level=high`, and `git diff --check`.

Expected: all commands exit zero and the test count is at least the 104-test baseline.

- [ ] **Step 2: Check production output for source maps**

Confirm a recursive `dist` search returns zero `.map` files.

- [ ] **Step 3: Verify Home across the approved matrix**

Inspect `320x568`, `360x800`, `375x667`, `390x844`, `412x915`, `430x932`, `500x800`, `600x900`, `601x900`, `768x1024`, `769x900`, `820x1180`, `1024x768`, `1039x900`, `1040x900`, `1280x800`, and `1440x900`. Confirm no overflow, clipping, CTA/supporter overlap, broken image, or console error; portrait at `600px`, landscape at `601px`; no height jump at the breakpoint boundaries; and the drawer still fits at `390px`.

- [ ] **Step 4: Verify both rotating frames**

At `390x844`, `768x1024`, `1440x900`, and `1920x1080`, inspect both Marketing and E-commerce frames after rotation. Confirm the exact current frame order and scene identity, sharper dashboard mobile rendering, acceptable crop and text contrast, no layout shift, no console error, and primary-only reduced-motion behaviour.

- [ ] **Step 5: Review the final worktree without staging it**

Run `git status --short`, `git diff --stat`, and `git diff --check`. Leave all files unstaged for review.

## Self-review

- Spec coverage: same-image preservation, dashboard resolution, unchanged rotation/order, Home spacing, tablet crop, tests, provenance, and browser QA each have an implementing task.
- Placeholder scan: no deferred or unspecified implementation step remains.
- Type consistency: route manifests retain `id`, `src`, `desktopSrcSet`, `mobileSrc`, `sizes`, `width`, and `height`; `RotatingHeroMedia` receives no new prop.
- Ownership: Home layout stays in Home CSS, supporter position stays in `homeSections.css`, and service image selection stays route-owned.
