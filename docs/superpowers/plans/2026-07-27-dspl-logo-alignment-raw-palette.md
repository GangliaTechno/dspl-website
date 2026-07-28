# DSPL Logo Alignment and Raw Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align every supporter logo on one visual axis and replace the black Raw Radicles panels with the approved warm DSPL parchment treatment.

**Architecture:** Keep the existing React compositions and marquee behavior. Normalize supporter sizing through shared CSS variables, derive one tightly cropped lossless logo asset from the existing trademark artwork, and consume that asset from both Home and Brands.

**Tech Stack:** React 19, CSS, Pillow 12, Vitest, Vite

## Global Constraints

- Preserve supporter order, marquee speed, marquee direction, and reduced-motion behavior.
- Preserve the Raw Radicles trademark pixels, colors, wording, and transparency.
- Use existing DSPL semantic color tokens; introduce no new palette colors.
- Preserve routes, copy, CTA destinations, modal behavior, and responsive stacking.
- Do not push, merge, or deploy.

---

### Task 1: Regression Contracts

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: source CSS and JSX files
- Produces: source-level regression checks for shared sizing, warm palette tokens, shared artwork, and gold CTA treatment

- [ ] **Step 1: Add failing assertions**

Add a test that checks:

```js
const homeSections = readSource('src/components/home/homeSections.css');
const brandsCss = readSource('src/pages/Brands.css');
const homePage = readSource('src/pages/Home.jsx');
const brandsPage = readSource('src/pages/Brands.jsx');

expect(homeSections).toContain('--supporter-logo-height: 2.25rem;');
expect(homeSections).not.toMatch(/supporter-logo-(dst|nidhi1|1|2)\s+\.supporter-logo/);
expect(homeSections).toMatch(
  /\.owned-brand-section\s*{[^}]*background:\s*var\(--bg-secondary\);/s,
);
expect(brandsCss).toMatch(
  /\.rr-visual-panel\s*{[^}]*background:\s*var\(--bg-tertiary\);/s,
);
expect(homePage).toContain("raw-radicles-logo-cropped.webp");
expect(brandsPage).toContain("raw-radicles-logo-cropped.webp");
expect(brandsPage).toContain('className="btn btn-primary rr-cta-btn"');
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the current CSS uses per-logo sizing and both Raw panels remain black.

---

### Task 2: Shared Raw Radicles Asset

**Files:**
- Read: `src/assets/RR_logo embossed_tm.png`
- Create: `src/assets/raw-radicles-logo-cropped.webp`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Brands.jsx`

**Interfaces:**
- Consumes: original transparent PNG
- Produces: lossless cropped WebP imported by Home and Brands

- [ ] **Step 1: Crop the visible alpha bounds**

Use Pillow to crop the original alpha bounding box with a 32px safety margin and save losslessly:

```python
from pathlib import Path
from PIL import Image

source = Path("src/assets/RR_logo embossed_tm.png")
target = Path("src/assets/raw-radicles-logo-cropped.webp")

with Image.open(source) as image:
    rgba = image.convert("RGBA")
    left, top, right, bottom = rgba.getchannel("A").getbbox()
    margin = 32
    crop = (
        max(0, left - margin),
        max(0, top - margin),
        min(rgba.width, right + margin),
        min(rgba.height, bottom + margin),
    )
    rgba.crop(crop).save(target, "WEBP", lossless=True, method=6)
```

- [ ] **Step 2: Update both imports**

Replace imports of `RR_logo embossed_tm.png` in `Home.jsx` and `Brands.jsx` with `raw-radicles-logo-cropped.webp`.

- [ ] **Step 3: Inspect the derived asset**

Confirm that the navy circle, gold rays, lion, wording, and trademark remain intact and that the large empty transparent margins are gone.

---

### Task 3: Supporter Alignment

**Files:**
- Modify: `src/components/home/homeSections.css`

**Interfaces:**
- Consumes: existing `SupporterStrip` markup
- Produces: identical slot and image heights without logo-specific offsets

- [ ] **Step 1: Normalize desktop sizing**

Define on `.supporter-band`:

```css
--supporter-slot-width: 14rem;
--supporter-slot-height: 4rem;
--supporter-logo-height: 2.25rem;
```

Set `.supporter-logo-slot` to the shared width and height. Set `.supporter-logo` to `width: 100%`, the shared height, `max-height: none`, `object-fit: contain`, and `object-position: center`.

- [ ] **Step 2: Remove optical overrides**

Delete every `.supporter-logo-dst`, `.supporter-logo-nidhi1`, `.supporter-logo-1`, and `.supporter-logo-2` sizing rule, including `translateY(-6px)`.

- [ ] **Step 3: Normalize mobile sizing**

Inside the existing `max-width: 768px` query, override only:

```css
--supporter-slot-width: 10rem;
--supporter-slot-height: 3rem;
--supporter-logo-height: 1.875rem;
```

---

### Task 4: Warm Raw Radicles Surfaces

**Files:**
- Modify: `src/components/home/homeSections.css`
- Modify: `src/pages/Brands.css`
- Modify: `src/pages/Brands.jsx`

**Interfaces:**
- Consumes: existing DSPL semantic tokens and shared cropped logo
- Produces: related warm Home and Brands logo fields with standard gold CTA treatment

- [ ] **Step 1: Restyle Home proof**

Use `var(--bg-secondary)` for `.owned-brand-section`, existing borders, `var(--bg-tertiary)` for the circular `.owned-brand-visual`, and dark semantic text tokens. Replace the glow fill with a tokenized border-only ring. Keep the existing responsive layout.

- [ ] **Step 2: Restyle Brands visual panel**

Use `var(--bg-tertiary)` for `.rr-visual-panel`, add the existing border token at the split, and change `.rr-glow-ring` to a restrained border-only ring.

- [ ] **Step 3: Standardize the enquiry CTA**

Change the Brands CTA to:

```jsx
className="btn btn-primary rr-cta-btn"
```

Remove black background and black-specific hover rules from `.rr-cta-btn`, retaining only layout properties not already owned by `.btn`.

---

### Task 5: Verification

**Files:**
- Verify: all files changed in Tasks 1–4

**Interfaces:**
- Consumes: completed implementation
- Produces: evidence that the change is correct and regression-safe

- [ ] **Step 1: Run focused and full checks**

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
npm test -- --run
npm run lint
npm run build
npm run verify:html
```

Expected: all commands exit `0`.

- [ ] **Step 2: Render Home and Brands**

Verify desktop and mobile:

- every supporter logo shares one computed height and vertical center;
- the marquee remains continuous;
- the Raw artwork is fully visible and larger;
- warm surfaces use existing DSPL tokens;
- the Home and Brands actions still work;
- no horizontal overflow or browser console error appears.

- [ ] **Step 3: Stop before publishing**

Leave changes local for user review. Do not push, merge, or deploy.
