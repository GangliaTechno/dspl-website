# Homepage Hero and Canonical Naming Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the approved centered homepage hero and make `Dashapatmaja Solutions Pvt Ltd`, `Dr. Shreepathy Rangabhatta R`, and `Dr. Anusha Pai` the exact active-repository names without disturbing the completed supporter marquee.

**Architecture:** Keep the existing React page, modal utility, router link, responsive picture assets, and CSS token system. Change hero content and composition only in `Home.jsx` and `Home.css`; treat naming corrections as textual consistency work across active source, metadata, scripts, tests, and documentation. Verify the separately owned marquee in place without rewriting its component or CSS.

**Tech Stack:** React 19, React Router, Vite 8, Vitest 4, Testing Library, plain CSS, Playwright-controlled Chrome for visual verification.

## Global Constraints

- The homepage H1 content remains `We build brands.` followed by `We help businesses grow.`.
- Desktop and tablet render the H1 as two deliberate lines; narrow mobile may wrap only to prevent overflow.
- Hero supporting copy is exactly: `Dashapatmaja Solutions Pvt Ltd helps businesses grow. We build your brand, bring you customers, and sell your products online. We also build and sell our own brand, Raw Radicles, so we know this work from both sides.`
- Hero actions are `Work With Us` and `See Our Brands`.
- The primary action keeps the existing `openWorkModal('homepage-hero')` behavior.
- The secondary action keeps the existing `/brands` route.
- The hero uses a uniform neutral-black translucent scrim, never a gradient, glow, blur, or content card.
- The only canonical company name is `Dashapatmaja Solutions Pvt Ltd`.
- The exact leadership names are `Dr. Shreepathy Rangabhatta R` and `Dr. Anusha Pai`.
- Keep the `dashapatmaja.in` domain and its email addresses unchanged.
- Keep `main`, deployment, and the hosted site untouched.
- Preserve the separate marquee task's files and content during hero and naming implementation.

---

## File Structure

### Hero responsibility

- Modify `src/pages/Home.jsx`: exact hero content, semantic structure, and CTA labels.
- Modify `src/pages/Home.css`: centered composition, uniform scrim, responsive type, and spacing.
- Modify `src/pages/__tests__/Home.test.jsx`: accessible-content and removed-content regression coverage.

### Naming responsibility

- Create `src/__tests__/canonicalNaming.test.js`: active tracked-text scan for prohibited name variants.
- Modify `src/seo/__tests__/routeMetadata.test.js`: exact organization-name contract.
- Modify `src/components/__tests__/Header.test.jsx`: exact canonical logo-alt contract.
- Modify active copy/metadata files found by the test and repository scan, including:
  - `index.html`
  - `README.md`
  - `CONTRIBUTING.md`
  - `PRODUCT.md`
  - `DESIGN.md`
  - `.github/REPOSITORY_SETTINGS.md`
  - `design-system/dasha-patmaja-services/MASTER.md`
  - `scripts/verify-prerender.mjs`
  - `src/seo/routeMetadata.js`
  - `src/pages/About.jsx`
  - `src/pages/Brands.jsx`
  - `src/pages/Contact.jsx`
  - `src/pages/PrivacyPolicy.jsx`
  - `src/components/Header.jsx`
  - `src/components/Footer.jsx`
  - active design and implementation documents containing current product naming

### Marquee responsibility

- Read-only verify `src/components/home/SupporterStrip.jsx`.
- Read-only verify `src/components/home/homeSections.css`.
- Leave the supporter task's marquee assertions in `src/__tests__/designSystemRegression.test.js` under that task's ownership.

---

### Task 1: Protect and Implement the Centered Homepage Hero

**Files:**
- Modify: `src/pages/__tests__/Home.test.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.css`

**Interfaces:**
- Consumes: `openWorkModal('homepage-hero')`, React Router `Link`, existing desktop/mobile hero images, existing `.btn` primitives.
- Produces: one centered semantic hero with exact content and unchanged interactions.

- [ ] **Step 1: Add the failing hero-content regression**

Extend `src/pages/__tests__/Home.test.jsx` with an additional test:

```jsx
it('renders the approved centered hero content and removes the legacy proof panel', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'We build brands. We help businesses grow.',
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      'Dashapatmaja Solutions Pvt Ltd helps businesses grow. We build your brand, bring you customers, and sell your products online. We also build and sell our own brand, Raw Radicles, so we know this work from both sides.',
    ),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'Work With Us' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'See Our Brands' })).toHaveAttribute(
    'href',
    '/brands',
  );

  expect(
    screen.queryByText('Brand systems for Indian consumer businesses'),
  ).not.toBeInTheDocument();
  expect(screen.queryByText('One accountable team')).not.toBeInTheDocument();
  expect(
    screen.queryByText('Brand strategy and identity'),
  ).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused test and confirm the old hero fails**

Run:

```powershell
npx vitest run src/pages/__tests__/Home.test.jsx
```

Expected: the new test fails because the supporting copy and CTA labels are
still old and the kicker/proof panel are still rendered.

- [ ] **Step 3: Implement the exact semantic hero content**

Replace the content inside `.home-hero-layout` in `src/pages/Home.jsx` with:

```jsx
<div className="container home-hero-layout">
  <div className="home-hero-content">
    <h1 className="hero-title">
      <span>We build brands.</span>
      <span className="accent-text">We help businesses grow.</span>
    </h1>
    <p className="hero-subhead">
      Dashapatmaja Solutions Pvt Ltd helps businesses grow. We build your
      brand, bring you customers, and sell your products online. We also build
      and sell our own brand, Raw Radicles, so we know this work from both
      sides.
    </p>
    <div className="hero-ctas">
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => openWorkModal('homepage-hero')}
        className="btn btn-primary"
      >
        Work With Us
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      <Link to="/brands" className="btn btn-secondary hero-secondary">
        See Our Brands
      </Link>
    </div>
  </div>
</div>
```

Do not alter `<SupporterStrip supporters={supporters} />`.

- [ ] **Step 4: Implement the centered flat-scrim layout**

In `src/pages/Home.css`:

1. Replace `.home-hero::after` with a flat scrim:

```css
.home-hero::after {
  position: absolute;
  z-index: 0;
  inset: 0;
  background: rgba(8, 8, 8, 0.72);
  content: '';
}
```

2. Replace the two-column layout with a centered content column:

```css
.home-hero-layout {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding-block: clamp(4.5rem, 8vw, 7rem)
    clamp(7rem, 12vw, 9.5rem);
}

.home-hero-content {
  width: min(100%, 68rem);
  text-align: center;
}
```

3. Make each H1 phrase a deliberate line and center the body/actions:

```css
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

.hero-title > span {
  display: block;
}

.hero-subhead {
  max-width: 66ch;
  margin: 0 auto 2.5rem;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(1.05rem, 1.45vw, 1.25rem);
  line-height: 1.65;
  text-wrap: pretty;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
```

4. Remove obsolete kicker, proof-panel, two-column, and mobile-gradient rules.
5. At `max-width: 768px`, keep content-driven height and set the mobile-safe
   H1 size to `clamp(2.25rem, 10vw, 3.125rem)`.
6. At `max-width: 520px`, retain full-width stacked CTA buttons.

- [ ] **Step 5: Run the focused hero regression**

Run:

```powershell
npx vitest run src/pages/__tests__/Home.test.jsx
```

Expected: all Home tests pass.

- [ ] **Step 6: Verify the hero diff is isolated**

Run:

```powershell
git diff --check -- src/pages/Home.jsx src/pages/Home.css src/pages/__tests__/Home.test.jsx
git diff --name-only
```

Expected: no whitespace errors; marquee files remain modified only by their
separate task and contain no new hero-task edits.

- [ ] **Step 7: Commit the hero deliverable**

Run:

```powershell
git add -- src/pages/Home.jsx src/pages/Home.css src/pages/__tests__/Home.test.jsx
git commit -m "feat: center and simplify homepage hero"
```

Expected: only the three hero files are committed.

---

### Task 2: Enforce Canonical Company and Leadership Names

**Files:**
- Create: `src/__tests__/canonicalNaming.test.js`
- Modify: `src/seo/__tests__/routeMetadata.test.js`
- Modify: `src/components/__tests__/Header.test.jsx`
- Modify: active copy, metadata, scripts, and documentation listed in the File Structure section

**Interfaces:**
- Consumes: tracked repository text and `organizationStructuredData`.
- Produces: exact canonical names in visible copy, SEO, structured data, current documentation, and leadership cards.

- [ ] **Step 1: Add the failing tracked-text naming regression**

Create `src/__tests__/canonicalNaming.test.js`:

```js
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { describe, expect, it } from 'vitest';

const canonicalCompanyName = 'Dashapatmaja Solutions Pvt Ltd';
const trackedTextExtensions = new Set([
  '.html',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.mjs',
]);
const intentionalLegacyDiscussion = new Set([
  'docs/superpowers/specs/2026-07-29-homepage-hero-and-canonical-naming-design.md',
]);
const prohibitedVariants = [
  ['Dasha', 'Patmaja'].join(' '),
  ['Dasha', 'Patmaja', 'Services'].join(' '),
  ['Dashapatmaja', 'Services'].join(' '),
  ['Dashapatmaja', 'Solutions', 'Private', 'Limited'].join(' '),
  ['Dashapatmaja', 'Solutions', 'Pvt.', 'Ltd.'].join(' '),
  ['Mr.', 'Shreepathy', 'Ranga', 'Bhatta'].join(' '),
  ['Ms.', 'Anusha', 'Pai'].join(' '),
];

function trackedTextFiles() {
  return execFileSync('git', ['ls-files', '-z'], {
    encoding: 'utf8',
  })
    .split('\0')
    .filter(Boolean)
    .filter((file) => trackedTextExtensions.has(extname(file)))
    .filter((file) => !intentionalLegacyDiscussion.has(file));
}

describe('canonical naming', () => {
  it('uses the exact company and leadership names in active tracked text', () => {
    const violations = [];

    for (const file of trackedTextFiles()) {
      const content = readFileSync(file, 'utf8');

      for (const variant of prohibitedVariants) {
        if (content.includes(variant)) {
          violations.push(`${file}: ${variant}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('keeps the approved exact names available to product code', () => {
    expect(canonicalCompanyName).toBe('Dashapatmaja Solutions Pvt Ltd');
    expect('Dr. Shreepathy Rangabhatta R').not.toContain(' Ranga Bhatta');
    expect('Dr. Anusha Pai').toMatch(/^Dr\./);
  });
});
```

- [ ] **Step 2: Strengthen the structured-data contract**

Add to `src/seo/__tests__/routeMetadata.test.js` inside the verified facts test:

```js
expect(organizationStructuredData.name).toBe(
  'Dashapatmaja Solutions Pvt Ltd',
);
```

Update `src/components/__tests__/Header.test.jsx` to expect the exact accessible
logo name:

```js
expect(
  screen.getByAltText('Dashapatmaja Solutions Pvt Ltd logo'),
).toBeInTheDocument();
```

- [ ] **Step 3: Run naming tests and record every failing file**

Run:

```powershell
npx vitest run src/__tests__/canonicalNaming.test.js src/seo/__tests__/routeMetadata.test.js
```

Expected: failures list the old company and leadership variants.

- [ ] **Step 4: Apply exact naming corrections**

Use targeted edits, not an unrestricted replacement:

- company display name: `Dashapatmaja Solutions Pvt Ltd`;
- leadership names: `Dr. Shreepathy Rangabhatta R` and `Dr. Anusha Pai`;
- About H1: `About Dashapatmaja Solutions Pvt Ltd`;
- HTML and route titles: retain the page descriptor and use the exact company
  name after or before it;
- About/body/legal/contact/brand copy: replace only the company-name phrase,
  not generic uses of the word “services”;
- Header/Footer image alt: `Dashapatmaja Solutions Pvt Ltd logo`;
- README/design/product/contribution/repository-setting titles and current
  prose: use the exact company name;
- prerender About heading expectation: use the corrected About H1;
- keep domain, email, LinkedIn URL, roles, portrait transforms, and asset paths
  unchanged.

Also update current historical plan prose where it states the live company
name, while retaining genuinely historical Git evidence.

- [ ] **Step 5: Coordinate the excluded portrait assertion**

Wait for task `019fad8a-5155-7e43-8074-ba777442b968` to report that its owned
`src/__tests__/designSystemRegression.test.js` expectation now uses
`Dr. Shreepathy Rangabhatta R`.

Do not edit that file in this task.

- [ ] **Step 6: Run naming and focused page tests**

Run:

```powershell
npx vitest run src/__tests__/canonicalNaming.test.js src/seo/__tests__/routeMetadata.test.js src/pages/__tests__/Home.test.jsx src/components/__tests__/Header.test.jsx
```

Expected: all selected tests pass.

- [ ] **Step 7: Run a repository-wide exact scan**

Run:

```powershell
$legacyPatterns = @(
  ('Dasha' + ' Patmaja'),
  ('Dashapatmaja' + ' Services'),
  ('Private' + ' Limited'),
  ('Pvt.' + ' Ltd.'),
  ('Mr.' + ' Shreepathy Ranga Bhatta'),
  ('Ms.' + ' Anusha Pai')
) -join '|'
rg --hidden -n -S $legacyPatterns --glob "!node_modules/**" --glob "!dist/**" --glob "!docs/superpowers/specs/2026-07-29-homepage-hero-and-canonical-naming-design.md" .
```

Expected: no active-product matches. A result is acceptable only if it is a
deliberate historical comparison and is documented before proceeding.

- [ ] **Step 8: Commit the naming deliverable**

Stage only the canonical-naming test and the files changed for exact names:

```powershell
git add -- src/__tests__/canonicalNaming.test.js src/seo/__tests__/routeMetadata.test.js src/components/__tests__/Header.test.jsx index.html README.md CONTRIBUTING.md PRODUCT.md DESIGN.md .github/REPOSITORY_SETTINGS.md design-system/dasha-patmaja-services/MASTER.md scripts/verify-prerender.mjs src/seo/routeMetadata.js src/pages/About.jsx src/pages/Brands.jsx src/pages/Contact.jsx src/pages/PrivacyPolicy.jsx src/components/Header.jsx src/components/Footer.jsx docs/superpowers/plans/2026-07-26-dspl-evidence-led-site-evolution.md
git diff --cached --check
git commit -m "fix: standardize DSPL company and leadership names"
```

Before committing, inspect `git diff --cached --name-only` and unstage any
supporter-marquee file if present.

---

### Task 3: Verify the Complete Homepage and Marquee

**Files:**
- Read-only: `src/components/home/SupporterStrip.jsx`
- Read-only: `src/components/home/homeSections.css`
- Read-only: `src/__tests__/designSystemRegression.test.js`
- Verify: all files changed in Tasks 1 and 2

**Interfaces:**
- Consumes: final homepage DOM/CSS and the completed supporter task.
- Produces: browser evidence and repository validation; no new production code.

- [ ] **Step 1: Confirm ownership and branch state**

Run:

```powershell
git status --short --branch
git diff -- src/components/home/SupporterStrip.jsx src/components/home/homeSections.css src/__tests__/designSystemRegression.test.js
```

Expected: the three supporter files contain only the completed other-task
changes, including its coordinated leadership-name expectation.

- [ ] **Step 2: Run the complete automated gate**

Run:

```powershell
npm run lint
npm test
npm run build
npm run verify:html
git diff --check
```

Expected:

- ESLint exits 0;
- every Vitest test passes;
- Vite production build exits 0;
- all eight prerender routes verify;
- no whitespace errors.

- [ ] **Step 3: Verify the desktop hero in Chrome**

At a 1440 × 900 viewport:

- H1 is visibly two lines;
- content block and CTAs are horizontally centered;
- H1, paragraph, and CTAs sit above the supporter rail without overlap;
- uniform scrim is flat and contains no gradient;
- image detail remains visible;
- `Work With Us` opens the existing modal;
- `See Our Brands` navigates to `/brands`;
- no console or page errors occur.

- [ ] **Step 4: Verify the 390 px mobile hero**

At a 390 × 844 viewport:

- no horizontal overflow;
- H1 remains readable and unclipped;
- paragraph measure is comfortable;
- CTA buttons stack and remain fully visible;
- hero content does not collide with the supporter strip;
- work modal opens and remains usable;
- `/brands` navigation works.

- [ ] **Step 5: Verify the marquee at both viewports**

Check computed values and geometry:

- desktop shared gap is 60 px;
- mobile shared gap is 48 px;
- animation duration is 18 seconds;
- timing function is linear;
- track uses compositor-safe transform animation;
- one measured shift equals exactly one sequence width;
- no visible loop jump;
- no page overflow;
- reduced motion renders the static accessible sequence.

- [ ] **Step 6: Verify naming in rendered pages**

Open `/`, `/about`, `/brands`, `/contact`, and `/privacy` and confirm:

- company text uses `Dashapatmaja Solutions Pvt Ltd`;
- About cards use `Dr. Shreepathy Rangabhatta R` and `Dr. Anusha Pai`;
- page title/description values use the canonical company name;
- no old display variants appear.

- [ ] **Step 7: Final branch audit**

Run:

```powershell
git status --short --branch
git log -5 --oneline --decorate
git diff --stat
git diff --cached --stat
```

Expected:

- hero and naming work are committed only on
  `pawan/raw-radicles-redesign`;
- supporter files remain exactly as handed off unless their owner separately
  commits them;
- `main`, deployment, and the hosted site remain untouched;
- nothing is pushed without the user's explicit final push instruction.
