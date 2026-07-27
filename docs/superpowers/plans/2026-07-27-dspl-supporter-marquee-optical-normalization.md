# DSPL Supporter Marquee Optical Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver an optically balanced four-logo supporter marquee with a seamless right-to-left loop.

**Architecture:** Derive four lossless, same-size transparent canvases from the existing official logo files, with each complete mark scaled to an approved optical target. Render two identical semantic sequences inside one Framer Motion track and translate the track by exactly half its width.

**Tech Stack:** React 19, Framer Motion, CSS, Pillow 12, Vitest, Vite

## Global Constraints

- Preserve each official institutional mark's pixels, proportions, wording, and internal composition.
- Preserve supporter order and all Home hero content and behavior outside the marquee.
- Animate right to left from `0%` to `-50%` for 24 seconds with linear easing.
- Render one non-moving sequence for reduced-motion users.
- Do not add logo-specific sizing or vertical-transform CSS.
- Do not push, merge, or deploy.

---

### Task 1: Lock the Marquee Contract

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Test: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: `SupporterStrip.jsx`, `Home.jsx`, and `homeSections.css` source text
- Produces: regression assertions for the two-sequence loop, normalized assets, and shared layout rules

- [ ] **Step 1: Replace the old equal-height-only assertion with the refined contract**

Add assertions equivalent to:

```js
const supporter = readSource('src/components/home/SupporterStrip.jsx');
const home = readSource('src/pages/Home.jsx');
const homeSections = readSource('src/components/home/homeSections.css');

expect(supporter).toContain('const sequenceCount = prefersReducedMotion ? 1 : 2;');
expect(supporter).toContain('x: ["0%", "-50%"]');
expect(supporter).toContain('duration: 24');
expect(supporter).toContain('className="supporter-sequence"');
expect(homeSections).toContain('--supporter-slot-width: 13.5rem;');
expect(homeSections).toContain('--supporter-gap: 2.75rem;');
expect(homeSections).not.toMatch(
  /supporter-logo-(dst|nidhi1|1|2)\s+\.supporter-logo/,
);
expect(home).toContain('supporter-dst-nidhi.webp');
expect(home).toContain('supporter-nidhi-prayas.webp');
expect(home).toContain('supporter-mutbi.webp');
expect(home).toContain('supporter-startup-karnataka.webp');
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the current component renders three flattened copies, translates `-33.333333%`, and uses the old assets.

---

### Task 2: Derive Optically Normalized Official Assets

**Files:**
- Read: `src/assets/dst-nidhi-normalized.png`
- Read: `src/assets/nidhi-prayas-normalized.png`
- Read: `src/assets/mutbi-normalized.png`
- Read: `src/assets/startup-karnataka-normalized.png`
- Create: `src/assets/supporter-dst-nidhi.webp`
- Create: `src/assets/supporter-nidhi-prayas.webp`
- Create: `src/assets/supporter-mutbi.webp`
- Create: `src/assets/supporter-startup-karnataka.webp`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: four existing transparent official lockups
- Produces: four `720x240` lossless WebP canvases consumed by `Home.jsx`

- [ ] **Step 1: Crop each alpha bound and place it on the shared canvas**

Use Pillow with these exact visible target bounds:

```python
targets = {
    "dst-nidhi-normalized.png": ("supporter-dst-nidhi.webp", (510, 154)),
    "nidhi-prayas-normalized.png": ("supporter-nidhi-prayas.webp", (365, 233)),
    "mutbi-normalized.png": ("supporter-mutbi.webp", (610, 104)),
    "startup-karnataka-normalized.png": (
        "supporter-startup-karnataka.webp",
        (610, 105),
    ),
}
```

For each input, crop the alpha channel bounding box, resize the complete crop with `Image.Resampling.LANCZOS`, center it on a transparent `720x240` RGBA canvas, and save with `lossless=True, method=6`.

- [ ] **Step 2: Inspect all four canvases against the dark hero surface**

Confirm that no symbol, wording, subtitle, ray, or anti-aliased edge is clipped. Confirm that NIDHI PRAYAS is larger than before while MUTBI and Startup Karnataka remain readable without dominating.

- [ ] **Step 3: Update `Home.jsx` imports**

Replace the four current supporter asset imports with:

```js
import dstNidhiLogo from '../assets/supporter-dst-nidhi.webp';
import nidhiPrayasLogo from '../assets/supporter-nidhi-prayas.webp';
import mutbiLogo from '../assets/supporter-mutbi.webp';
import startupKarnatakaLogo from '../assets/supporter-startup-karnataka.webp';
```

Remove the obsolete supporter-specific `className` properties from the `supporters` array.

---

### Task 3: Build the Seamless Two-Sequence Marquee

**Files:**
- Modify: `src/components/home/SupporterStrip.jsx`
- Modify: `src/components/home/homeSections.css`
- Test: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: `supporters: Array<{src: string, alt: string}>`
- Produces: one accessible sequence for reduced motion or two equal-width sequences for animation

- [ ] **Step 1: Group supporters into sequences**

Use:

```jsx
const sequenceCount = prefersReducedMotion ? 1 : 2;

{Array.from({ length: sequenceCount }, (_, sequenceIndex) => (
  <div
    className="supporter-sequence"
    key={`supporter-sequence-${sequenceIndex}`}
    aria-hidden={sequenceIndex > 0 ? 'true' : undefined}
  >
    {supporters.map((logo) => (
      <div className="supporter-logo-slot" key={`${logo.alt}-${sequenceIndex}`}>
        <img
          src={logo.src}
          alt={sequenceIndex > 0 ? '' : logo.alt}
          className="supporter-logo"
          loading="eager"
          decoding="async"
          draggable="false"
        />
      </div>
    ))}
  </div>
))}
```

Set animation and transition to:

```jsx
animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
transition={
  prefersReducedMotion
    ? undefined
    : { repeat: Infinity, ease: "linear", duration: 24 }
}
```

- [ ] **Step 2: Replace track gaps with equal sequence geometry**

Use these desktop values:

```css
.supporter-band {
  --supporter-gap: 2.75rem;
  --supporter-slot-width: 13.5rem;
  --supporter-slot-height: 4rem;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 4rem,
    #000 calc(100% - 4rem),
    transparent
  );
}

.supporter-track {
  display: flex;
  width: max-content;
}

.supporter-sequence {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--supporter-gap);
  padding-right: var(--supporter-gap);
}

.supporter-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

Add the equivalent `-webkit-mask-image`. Remove track-level `gap`, `padding-right`, and `--supporter-logo-height`.

- [ ] **Step 3: Define mobile and reduced-motion sizing**

At `max-width: 768px`, set:

```css
--supporter-gap: 2rem;
--supporter-slot-width: 9.5rem;
--supporter-slot-height: 3.5rem;
```

For `.supporter-track-static`, center its sequence and remove the trailing padding. At mobile width, reduce its four slots to `4.75rem` and its gap to `0.5rem` so one non-moving row fits the viewport.

- [ ] **Step 4: Run the focused regression test**

Run:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: PASS.

---

### Task 4: Verify Motion, Optical Balance, and Regressions

**Files:**
- Verify: all files changed in Tasks 1-3

**Interfaces:**
- Consumes: completed marquee implementation
- Produces: automated and visual evidence for local review

- [ ] **Step 1: Run all automated checks**

```powershell
npm test -- --run
npm run lint
npm run build
npm run verify:html
```

Expected: every command exits `0`.

- [ ] **Step 2: Verify desktop rendering**

At `1440x900`, confirm:

- four first-sequence slots have identical computed widths, heights, and top coordinates;
- the sequence width is identical for both copies;
- the second sequence begins exactly where the first sequence plus its trailing gap ends;
- NIDHI PRAYAS and DST NIDHI are no longer visually undersized;
- no horizontal document overflow or console warning occurs.

- [ ] **Step 3: Verify mobile rendering**

At `390x844`, confirm the shared mobile slot dimensions, right-to-left animation, balanced lockups, no horizontal document overflow, and no console warning.

- [ ] **Step 4: Stop before publication**

Leave the implementation local on `pawan/raw-radicles-redesign`. Do not push, merge, or deploy.
