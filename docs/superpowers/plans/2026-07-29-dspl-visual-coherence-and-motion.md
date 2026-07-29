# DSPL Visual Coherence and Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a stable scrolling header, a calmer accessible supporter
marquee, a compact About journey ledger, and two original responsive hero
image families with documented provenance.

**Architecture:** Keep the existing React component boundaries, shared CSS
tokens, responsive `<picture>` elements, ResizeObserver marquee measurement,
and route content. Change presentation contracts in the existing Header,
SupporterStrip, Home, About, and Marketing surfaces; generate new source
images, derive WebP candidates, and lock the approved behavior with the
existing source-level regression suite.

**Tech Stack:** React 19, Vite 8, Vitest 4, CSS, Framer Motion, Lucide React,
built-in image generation, Pillow/Sharp-compatible workspace tooling.

## Global Constraints

- Work only on `pawan/raw-radicles-redesign`; do not merge to `main`, push,
  deploy, or create a pull request without a later explicit instruction.
- Preserve the exact homepage H1: `We build brands.` and
  `We help businesses grow.`
- Preserve `Dashapatmaja Solutions Pvt Ltd`,
  `Dr. Shreepathy Rangabhatta R`, and `Dr. Anusha Pai`.
- Do not regenerate, resize, recrop, or vertically reposition supporter-logo
  artwork.
- Header dimensions remain 76 px desktop and 72 px mobile in both top and
  scrolled states.
- Supporter gaps are 72 px desktop and 56 px mobile; duration is 22 seconds.
- Respect `prefers-reduced-motion`.
- Preserve responsive `<picture>`, explicit dimensions, eager discovery,
  `fetchPriority="high"`, and `decoding="async"` for hero images.
- Keep superseded source images until a separate cleanup approval.

---

### Task 1: Generate and document the two hero image families

**Files:**
- Create: `src/assets/dspl-home-editorial-source.png`
- Create: `src/assets/dspl-home-editorial-960.webp`
- Create: `src/assets/dspl-home-editorial-1440.webp`
- Create: `src/assets/dspl-home-editorial-1920.webp`
- Create: `src/assets/dspl-home-editorial-mobile.webp`
- Create: `src/assets/dspl-marketing-editorial-source.png`
- Create: `src/assets/dspl-marketing-editorial-960.webp`
- Create: `src/assets/dspl-marketing-editorial-1440.webp`
- Create: `src/assets/dspl-marketing-editorial-1920.webp`
- Create: `src/assets/dspl-marketing-editorial-mobile.webp`
- Create: `docs/ASSET_PROVENANCE.md`

**Interfaces:**
- Consumes: the exact image briefs in the approved design specification.
- Produces: responsive Home and Marketing image modules imported by Tasks 5
  and 6.

- [ ] **Step 1: Generate the homepage source image**

Use the built-in image-generation tool with the complete homepage prompt from
the design specification. Inspect the result for central negative space,
realistic materials, absence of text/logos/people, and palette fit.

- [ ] **Step 2: Generate the Marketing source image**

Use the built-in image-generation tool with the complete Marketing prompt from
the design specification. Inspect the result for campaign-planning relevance,
absence of text/logos/people, and family resemblance to the homepage source.

- [ ] **Step 3: Create responsive derivatives**

Use the workspace image tooling to create 960, 1440, 1920, and mobile WebP
files. Use a consistent crop that preserves the central copy-safe area. Record
the derivative dimensions and byte sizes.

- [ ] **Step 4: Write the provenance record**

Create a table with these exact columns:

```markdown
| Production files | Method | Provider | Date | Prompt or source | Rights review | Approval |
```

Record both final prompts verbatim, state that no third-party trademarks,
recognizable people, readable packaging, or watermarks were accepted, and mark
the assets `Approved for branch review`.

- [ ] **Step 5: Validate the image files**

Run an image metadata script that opens every derivative and prints width,
height, format, and byte size. Expected: every file decodes, is WebP, and has a
non-zero width and height.

- [ ] **Step 6: Commit**

```powershell
git add src/assets/dspl-home-editorial-source.png `
  src/assets/dspl-home-editorial-960.webp `
  src/assets/dspl-home-editorial-1440.webp `
  src/assets/dspl-home-editorial-1920.webp `
  src/assets/dspl-home-editorial-mobile.webp `
  src/assets/dspl-marketing-editorial-source.png `
  src/assets/dspl-marketing-editorial-960.webp `
  src/assets/dspl-marketing-editorial-1440.webp `
  src/assets/dspl-marketing-editorial-1920.webp `
  src/assets/dspl-marketing-editorial-mobile.webp `
  docs/ASSET_PROVENANCE.md
git commit -m "feat: add original editorial hero assets"
```

### Task 2: Stabilize the shared header

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`

**Interfaces:**
- Consumes: existing `scrolled` boolean and fixed header structure.
- Produces: one stable-size header whose scrolled class changes only visual
  elevation.

- [ ] **Step 1: Write the failing regression assertions**

Add assertions requiring:

```js
expect(header).toContain('min-height: 76px;');
expect(header).toContain('height: 48px;');
expect(header).toContain('min-height: 72px;');
expect(header).toContain('height: 44px;');
expect(header).not.toContain('.header-scrolled .header-container');
expect(header).not.toContain('.header-scrolled .logo-image');
expect(header).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
expect(headerPage).toContain(
  "window.addEventListener('scroll', handleScroll, { passive: true })",
);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the stable height rules and passive listener are absent.

- [ ] **Step 3: Implement stable geometry**

In `Header.jsx`, retain the scrolled boolean but use a passive listener.

In `Header.css`:

```css
.header-container {
  min-height: 76px;
  padding: 0 1.5rem;
}

.logo-image {
  height: 48px;
}

@media (max-width: 900px) {
  .header-container {
    min-height: 72px;
  }

  .logo-image {
    height: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header,
  .logo-image {
    transition: none;
  }
}
```

Delete the scrolled container-padding and logo-height selectors. Let
`.header-scrolled` strengthen only the border/background/shadow over 200 ms.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/components/Header.jsx src/components/Header.css `
  src/__tests__/designSystemRegression.test.js
git commit -m "fix: stabilize header scroll motion"
```

### Task 3: Add spacing and user control to the supporter marquee

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/__tests__/Home.test.jsx`
- Modify: `src/components/home/SupporterStrip.jsx`
- Modify: `src/components/home/homeSections.css`

**Interfaces:**
- Consumes: `supporters`, ResizeObserver sequence measurement, and
  `useReducedMotion`.
- Produces: `isPaused`, `supporter-track-paused`, and a pause/play button with
  accessible labels.

- [ ] **Step 1: Write failing component and source assertions**

Require one button named `Pause supporter logos` in normal motion, then click
it and require `Resume supporter logos`. Update the source assertions to
require:

```js
expect(homeSections).toContain('--supporter-gap: 4.5rem;');
expect(homeSections).toContain('--supporter-gap: 3.5rem;');
expect(homeSections).toMatch(
  /\.supporter-track-running\s*{[^}]*animation:\s*supporter-marquee 22s linear infinite;/s,
);
expect(supporter).toContain('supporter-track-paused');
expect(supporter).toContain('Pause supporter logos');
expect(supporter).toContain('Resume supporter logos');
```

Retain every existing assertion for sequence measurement, logo size,
individual Y offsets, and reduced motion.

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npx vitest run src/pages/__tests__/Home.test.jsx `
  src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the control, 22-second duration, and new gaps are absent.

- [ ] **Step 3: Implement the controlled loop**

Add `isPaused` state and Lucide `Pause`/`Play` icons. Wrap the track in
`.supporter-viewport`; move the edge mask to that viewport. Add
`supporter-track-paused` when paused and render the button only when reduced
motion is not requested.

Use:

```css
.supporter-band {
  --supporter-gap: 4.5rem;
}

.supporter-track-running {
  animation: supporter-marquee 22s linear infinite;
}

.supporter-track-paused,
.supporter-band:focus-within .supporter-track-running,
.supporter-viewport:hover .supporter-track-running {
  animation-play-state: paused;
}

@media (max-width: 768px) {
  .supporter-band {
    --supporter-gap: 3.5rem;
  }
}
```

Do not modify any supporter slot width, image height, optical trim, opacity, or
Y offset.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run the focused command from Step 2. Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/components/home/SupporterStrip.jsx `
  src/components/home/homeSections.css `
  src/pages/__tests__/Home.test.jsx `
  src/__tests__/designSystemRegression.test.js
git commit -m "feat: refine and control supporter marquee"
```

### Task 4: Replace the About journey with an editorial ledger

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.css`

**Interfaces:**
- Consumes: existing four milestone strings, Lucide icons, and motion wrappers.
- Produces: a photo-free `.timeline-item` grid with year, marker, and content.

- [ ] **Step 1: Write failing regression assertions**

Require:

```js
expect(aboutPage).not.toContain("import dsplImg");
expect(aboutPage).not.toContain("'--about-story-image'");
expect(aboutCss).not.toContain('background-image: var(--about-story-image)');
expect(aboutCss).not.toContain('.timeline-section::before');
expect(aboutCss).toMatch(
  /\.timeline-item\s*{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*7rem 2\.5rem minmax\(0,\s*1fr\);/s,
);
expect(aboutCss).toMatch(
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.timeline-item\s*{[^}]*grid-template-columns:\s*2\.5rem minmax\(0,\s*1fr\);/s,
);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the photo-backed alternating timeline still exists.

- [ ] **Step 3: Implement the ledger**

Remove the `dspl_img.jpg` import and story-image custom property. Restructure
each milestone to:

```jsx
<div className="timeline-item">
  <div className="timeline-year">2023</div>
  <div className="timeline-badge"><Calendar size={18} /></div>
  <div className="timeline-card">
    <h3 className="timeline-milestone-title">...</h3>
    <ul className="timeline-list">...</ul>
  </div>
</div>
```

Use a cream section, a 960 px maximum ledger, neutral row rules, one restrained
gold marker line, transparent cards, no hover lift, and the approved responsive
column switch.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run the focused command from Step 2. Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/pages/About.jsx src/pages/About.css `
  src/__tests__/designSystemRegression.test.js
git commit -m "refactor: simplify About journey timeline"
```

### Task 5: Integrate the homepage editorial image

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: responsive homepage derivatives from Task 1.
- Produces: a responsive homepage `<picture>` using the new asset family.

- [ ] **Step 1: Write the failing asset-reference assertions**

Require imports and use of:

```text
dspl-home-editorial-960.webp
dspl-home-editorial-1440.webp
dspl-home-editorial-1920.webp
dspl-home-editorial-mobile.webp
```

Require `srcSet`, `sizes="100vw"`, `fetchPriority="high"`, and
`decoding="async"`. Reject `dspl_banner.webp` and
`dspl_banner-mobile.webp` in `Home.jsx`.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because Home still imports the former retail image.

- [ ] **Step 3: Integrate the new responsive picture**

Import all four derivatives and use desktop `srcSet` values of 960w, 1440w,
and 1920w with the mobile source below 768 px. Preserve the flat scrim and all
approved copy and actions.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run the focused command from Step 2. Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/pages/Home.jsx src/__tests__/designSystemRegression.test.js
git commit -m "feat: use original homepage editorial image"
```

### Task 6: Integrate the Marketing editorial image

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/Marketing.jsx`

**Interfaces:**
- Consumes: responsive Marketing derivatives from Task 1 and the existing
  `ServicePage` `heroImage` contract.
- Produces: a Marketing hero free of visible third-party advertising.

- [ ] **Step 1: Write the failing asset-reference assertions**

Require imports and use of:

```text
dspl-marketing-editorial-960.webp
dspl-marketing-editorial-1440.webp
dspl-marketing-editorial-1920.webp
dspl-marketing-editorial-mobile.webp
```

Reject `Marketing_hero_section` in `Marketing.jsx`.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because Marketing still imports the Times Square image.

- [ ] **Step 3: Integrate the new image family**

Replace only the image imports and `heroImage` values. Preserve the Marketing
title, subtitle, description, CTA, offers, and FAQ content.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run the focused command from Step 2. Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/pages/Marketing.jsx src/__tests__/designSystemRegression.test.js
git commit -m "feat: use original Marketing editorial image"
```

### Task 7: Verify the complete branch

**Files:**
- Verify: all files changed by Tasks 1-6

**Interfaces:**
- Consumes: the complete implementation.
- Produces: fresh automated and live evidence for branch review.

- [ ] **Step 1: Run static and automated verification**

Run:

```powershell
npm run lint
npm test
npm run build
npm run verify:html
git diff --check
```

Expected: every command exits 0; Vitest reports zero failed files and tests;
prerender verification reports all expected routes.

- [ ] **Step 2: Verify desktop live behavior**

At 1440 x 900 inspect `/`, `/about#timeline`, and `/marketing`. Confirm:

- header height is 76 px before and after scrolling;
- supporter gap computes to 72 px and duration to 22 seconds;
- pause/play state changes the animation play state;
- homepage and Marketing copy remain readable;
- journey rows are aligned and materially shorter than the former section;
- no horizontal overflow or browser-console errors.

- [ ] **Step 3: Verify mobile live behavior**

At 390 x 844 repeat the route checks. Confirm:

- header height is 72 px before and after scrolling;
- supporter gap computes to 56 px;
- the pause control remains reachable;
- hero copy and CTAs fit without horizontal overflow;
- journey uses the two-column mobile ledger.

- [ ] **Step 4: Review branch scope**

Run:

```powershell
git status --short --branch
git log --oneline --decorate -12
git diff origin/pawan/raw-radicles-redesign...HEAD --stat
```

Confirm no unrelated source, logo artwork, deployment configuration, or
superseded-image deletion entered the branch.

