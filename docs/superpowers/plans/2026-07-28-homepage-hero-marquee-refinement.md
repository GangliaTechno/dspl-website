# Homepage Hero and Supporter Marquee Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen the homepage hero hierarchy, compact the supporter marquee, and remove the duplicate Home-only enquiry call to action.

**Architecture:** Keep the current React component boundaries and resize-aware `SupporterStrip` loop. Make content and hierarchy changes in `Home.jsx` and `Home.css`, adjust only marquee presentation tokens in `homeSections.css`, and lock the approved behavior with source-level Vitest regression assertions plus live Chrome viewport checks.

**Tech Stack:** React 19, Vite 8, Framer Motion 12, CSS, Vitest 4, ESLint 10, Playwright using the installed Google Chrome.

## Global Constraints

- Work only on local branch `pawan/raw-radicles-redesign`.
- Do not push, merge, or deploy.
- Preserve the approved official supporter artwork and offsets: DST NIDHI `-3px`, NIDHI PRAYAS `-10px`, Startup Karnataka and MUTBI `0px`.
- Keep right-to-left linear motion, dynamic sequence duplication, edge fading, and reduced-motion behavior.
- Keep the shared footer call to action unchanged.
- Preserve all unrelated uncommitted redesign work.
- Do not commit implementation files because each target already contains approved uncommitted redesign work that must not be bundled into an unrelated commit.

---

### Task 1: Hero Hierarchy and Duplicate CTA Removal

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js:42-70`
- Modify: `src/pages/Home.jsx:201-219`
- Modify: `src/pages/Home.css:40-86`
- Modify: `src/pages/Home.css:205-220`
- Modify: `src/pages/Home.css:222-278`

**Interfaces:**
- Consumes: Existing `Home` page structure, `openWorkModal`, and shared `Footer`.
- Produces: One final shared footer CTA and approved responsive hero typography/vertical rhythm.

- [ ] **Step 1: Write the failing regression test**

Replace the current desktop hero title expectation and add one focused test:

```js
expect(home).toMatch(
  /\.hero-title\s*{[^}]*font-size:\s*clamp\(3rem,\s*5\.5vw,\s*4\.75rem\);/s,
);

it('uses the approved Home hero hierarchy without a duplicate final CTA', () => {
  const home = readSource('src/pages/Home.css');
  const homePage = readSource('src/pages/Home.jsx');

  expect(home).toMatch(
    /\.home-hero-layout\s*{[^}]*padding-block:\s*clamp\(4\.75rem,\s*9vw,\s*7\.5rem\)\s+clamp\(7\.25rem,\s*13vw,\s*10rem\);/s,
  );
  expect(home).toMatch(
    /\.hero-subhead\s*{[^}]*font-size:\s*clamp\(1\.1rem,\s*1\.6vw,\s*1\.375rem\);[^}]*line-height:\s*1\.58;/s,
  );
  expect(home).toMatch(
    /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.home-hero-layout\s*{[^}]*padding-block:\s*4\.75rem\s+7\.25rem;/s,
  );
  expect(homePage).not.toContain('className="section home-enquiry"');
  expect(homePage).not.toContain('Start with context');
  expect(homePage).not.toContain('Share your project');
  expect(home).not.toContain('.home-enquiry');
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the current title is `clamp(2.5rem, 5vw, 4rem)`, the hero padding is symmetrical, the paragraph is smaller, and `home-enquiry` still exists.

- [ ] **Step 3: Remove the Home-only enquiry markup**

Delete this complete block from `src/pages/Home.jsx`:

```jsx
<section className="section home-enquiry" aria-labelledby="enquiry-title">
  <div className="container home-enquiry-inner">
    <div>
      <span className="section-subtitle">Start with context</span>
      <h2 className="section-title" id="enquiry-title">
        Tell us where the business needs to move next.
      </h2>
    </div>
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => openWorkModal('homepage-final-callout')}
      aria-haspopup="dialog"
    >
      Share your project
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  </div>
</section>
```

Keep the surrounding closing `</div>` for `.home-page`.

- [ ] **Step 4: Apply the approved hero proportions**

Use these declarations in `src/pages/Home.css`:

```css
.home-hero-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(17rem, 0.55fr);
  align-items: end;
  gap: clamp(3rem, 8vw, 8rem);
  padding-block: clamp(4.75rem, 9vw, 7.5rem)
    clamp(7.25rem, 13vw, 10rem);
}

.hero-title {
  margin-bottom: 1.75rem;
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(3rem, 5.5vw, 4.75rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.02;
  text-wrap: balance;
}

.hero-subhead {
  max-width: 45rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(1.1rem, 1.6vw, 1.375rem);
  line-height: 1.58;
}
```

Inside `@media (max-width: 768px)`, replace the layout padding with:

```css
.home-hero-layout {
  padding-block: 4.75rem 7.25rem;
}
```

Delete `.home-enquiry`, `.home-enquiry-inner`, `.home-enquiry .section-title`, and their entries from the 900px and 520px media-query selector lists.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: 5 tests pass with no failures.

- [ ] **Step 6: Record a dirty-worktree checkpoint**

Run:

```powershell
git diff --check -- src/pages/Home.jsx src/pages/Home.css src/__tests__/designSystemRegression.test.js
git diff -- src/pages/Home.jsx src/pages/Home.css src/__tests__/designSystemRegression.test.js
```

Expected: no whitespace errors; diff contains only the approved hero/CTA changes plus pre-existing redesign work. Do not stage or commit these files.

---

### Task 2: Compact Supporter Marquee

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js:76-110`
- Modify: `src/components/home/homeSections.css:1-151`
- Verify unchanged behavior: `src/components/home/SupporterStrip.jsx`

**Interfaces:**
- Consumes: `SupporterStrip` sequence measurement, duplication, Framer Motion translation, and supporter class names from `Home.jsx`.
- Produces: A content-sized compact sequence with approved optical sizing and uninterrupted coverage.

- [ ] **Step 1: Update the marquee regression expectations**

Use these assertions in the existing supporter test:

```js
expect(homeSections).toContain(
  '--supporter-sequence-min-width: max-content;',
);
expect(homeSections).toContain('--supporter-gap: 1.5rem;');
expect(homeSections).toContain('--supporter-logo-height: 2.25rem;');
expect(homeSections).toMatch(
  /\.supporter-logo-dst\s*{[^}]*--supporter-slot-width:\s*10rem;[^}]*--supporter-logo-height:\s*2\.5rem;[^}]*--supporter-y:\s*-3px;/s,
);
expect(homeSections).toMatch(
  /\.supporter-logo-nidhi\s*{[^}]*--supporter-slot-width:\s*6rem;[^}]*--supporter-logo-height:\s*3\.25rem;[^}]*--supporter-y:\s*-10px;/s,
);
expect(homeSections).toMatch(
  /\.supporter-logo-mutbi\s*{[^}]*--supporter-slot-width:\s*16\.5rem;/s,
);
expect(homeSections).toMatch(
  /\.supporter-logo-startup\s*{[^}]*--supporter-slot-width:\s*16rem;/s,
);
```

Retain the existing assertions for `ResizeObserver`, dynamic sequence count, `x: [0, -sequenceWidth]`, duration, official asset imports, and Raw Radicles palette.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the current desktop gap is `2.75rem`, the sequence is viewport-sized, and the logo sizes/slots are larger.

- [ ] **Step 3: Apply compact desktop marquee tokens**

In `.supporter-band`, use:

```css
--supporter-gap: 1.5rem;
--supporter-logo-height: 2.25rem;
--supporter-slot-height: 3.5rem;
--supporter-sequence-min-width: max-content;
```

In `.supporter-sequence`, use `justify-content: flex-start` and retain:

```css
min-width: var(--supporter-sequence-min-width);
gap: var(--supporter-gap);
padding-inline: calc(var(--supporter-gap) / 2);
```

Use these optical slots:

```css
.supporter-logo-dst {
  --supporter-slot-width: 10rem;
  --supporter-logo-height: 2.5rem;
  --supporter-y: -3px;
}

.supporter-logo-nidhi {
  --supporter-slot-width: 6rem;
  --supporter-logo-height: 3.25rem;
  --supporter-y: -10px;
}

.supporter-logo-mutbi {
  --supporter-slot-width: 16.5rem;
}

.supporter-logo-startup {
  --supporter-slot-width: 16rem;
}
```

- [ ] **Step 4: Apply proportional mobile tokens**

Inside `@media (max-width: 768px)`, use:

```css
.supporter-band {
  bottom: 2.5rem;
  padding-block: 8px;
  --supporter-gap: 1.25rem;
  --supporter-logo-height: 1.75rem;
  --supporter-slot-height: 3rem;
  --supporter-sequence-min-width: max-content;
  --supporter-edge-fade: 2.5rem;
}

.supporter-logo-dst {
  --supporter-slot-width: 7.25rem;
  --supporter-logo-height: 2rem;
}

.supporter-logo-nidhi {
  --supporter-slot-width: 4.5rem;
  --supporter-logo-height: 2.5rem;
}

.supporter-logo-mutbi {
  --supporter-slot-width: 12.5rem;
}

.supporter-logo-startup {
  --supporter-slot-width: 12rem;
}
```

Keep the reduced-motion wrapping rules.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```powershell
npm test -- src/__tests__/designSystemRegression.test.js
```

Expected: 5 tests pass with no failures.

- [ ] **Step 6: Record a dirty-worktree checkpoint**

Run:

```powershell
git diff --check -- src/components/home/homeSections.css src/__tests__/designSystemRegression.test.js
git diff -- src/components/home/homeSections.css src/__tests__/designSystemRegression.test.js
```

Expected: no whitespace errors; `SupporterStrip.jsx` loop behavior remains unchanged. Do not stage or commit these files.

---

### Task 3: Full Regression and Live Chrome QA

**Files:**
- Verify: `src/pages/Home.jsx`
- Verify: `src/pages/Home.css`
- Verify: `src/components/home/homeSections.css`
- Verify: `src/components/home/SupporterStrip.jsx`
- Verify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: Completed Tasks 1 and 2.
- Produces: Evidence that the local page builds, prerenders, remains responsive, and never exposes an empty marquee end.

- [ ] **Step 1: Run the full automated verification**

Run these commands:

```powershell
npm test
npm run lint
npm run build
npm run verify:html
```

Expected:

- 10 Vitest files and 22 tests pass.
- ESLint exits with code 0.
- Vite production build exits with code 0 and prerenders 8 routes.
- HTML verification confirms all 8 public routes.

- [ ] **Step 2: Verify live marquee coverage in installed Chrome**

Use Playwright with `C:/Program Files/Google/Chrome/Application/chrome.exe` against `http://localhost:5174/` at 390px, 1920px, and 3840px widths. For each viewport, record:

```js
{
  bandWidth,
  sequenceWidth,
  trackWidth,
  sequenceCount,
  startX,
  laterX,
  movesLeft: laterX < startX,
  postShiftCoverage: trackWidth - sequenceWidth >= bandWidth,
}
```

Expected at every viewport:

- `movesLeft` is `true`.
- `postShiftCoverage` is `true`.
- At least two sequences exist.
- No console or page errors occur.

- [ ] **Step 3: Capture and inspect screenshots**

Capture:

```text
<temporary-output>/dspl-home-refined-390.png
<temporary-output>/dspl-home-refined-1920.png
<temporary-output>/dspl-home-refined-3840.png
```

Inspect for:

- Hero title is larger without colliding with the proof panel.
- Hero group sits visibly higher while retaining header clearance.
- Supporting paragraph remains readable and does not overrun its measure.
- Marquee logos are smaller, closer, baseline-aligned, and softly faded at the viewport edges.
- No Home-only enquiry strip remains above the footer banner.

- [ ] **Step 4: Report local-only status**

Run:

```powershell
git status --short --branch
git rev-list --left-right --count origin/pawan/raw-radicles-redesign...HEAD
```

Report the exact verification counts and confirm that no implementation commit, push, merge, or deployment occurred.
