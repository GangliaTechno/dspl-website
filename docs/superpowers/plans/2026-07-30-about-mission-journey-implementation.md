# About Mission and Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Equalize the About Mission and Vision cards and replace the flat milestone ledger with four responsive, alternating image-and-story rows using original editorial imagery.

**Architecture:** Keep the About page as the owner of its milestone data and markup, following the repository's existing page-level structure. Store four optimized WebP assets under `src/assets`, map a single chronological milestone data array into `motion.article` rows, and use CSS grid areas to alternate desktop composition while preserving image-first source order on mobile.

**Tech Stack:** React 19, Vite 8, Framer Motion, CSS Grid, Vitest, Pillow 12.3 for mechanical WebP conversion, and the image-generation tool for original raster imagery.

## Global Constraints

- Work only in `E:\For website\dspl website` on `pawan/raw-radicles-redesign`.
- Do not push, merge, deploy, or modify `main`.
- Preserve all approved milestone facts and leadership content.
- Use original generated imagery; do not copy external photography, trademarks, logos, readable text, watermarks, or public figures.
- Use a warm cream, walnut, charcoal, muted navy, and restrained amber palette across all four images.
- Do not use gradients, neon colors, glow effects, floating objects, implausible anatomy, or text embedded in images.
- Use opacity and transform only for motion and retain reduced-motion behavior.
- Preserve semantic chronological source order and descriptive image alt text.
- Keep the existing public Cloudflare preview available during visual QA.

---

### Task 1: Equalize Mission and Vision Cards

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/About.css`

**Interfaces:**
- Consumes: existing `.mission-vision-grid` and `.mv-card` markup in `src/pages/About.jsx`
- Produces: equal-height desktop cards with natural-height stacked mobile cards

- [ ] **Step 1: Confirm the regression test expresses the intended layout**

The test in `src/__tests__/designSystemRegression.test.js` must contain:

```js
it('keeps the About mission and vision cards equal in height', () => {
  const about = readSource('src/pages/About.css');

  expect(about).toMatch(
    /\.mission-vision-grid\s*>\s*div\s*{[^}]*height:\s*100%;/s,
  );
  expect(about).toMatch(
    /\.mv-card\s*{[^}]*height:\s*100%;[^}]*box-sizing:\s*border-box;/s,
  );
});
```

- [ ] **Step 2: Verify the test fails against the pre-fix CSS**

Temporarily remove only these declarations if they are already present in the uncommitted working tree:

```css
.mission-vision-grid > div {
  height: 100%;
}

.mv-card {
  height: 100%;
  box-sizing: border-box;
}
```

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: FAIL only at `keeps the About mission and vision cards equal in height`.

- [ ] **Step 3: Implement the minimal equal-height rules**

Add directly after `.mission-vision-grid`:

```css
.mission-vision-grid > div {
  height: 100%;
}
```

Add to the existing `.mv-card` declaration:

```css
height: 100%;
box-sizing: border-box;
```

The existing `@media (max-width: 900px)` single-column grid remains unchanged; each stacked grid row then uses its natural height.

- [ ] **Step 4: Verify the focused test passes**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: all design-system regression tests PASS.

- [ ] **Step 5: Commit the equal-height correction**

```powershell
git add -- src/pages/About.css src/__tests__/designSystemRegression.test.js
git diff --cached --check
git commit -m "fix: equalize About mission cards"
```

---

### Task 2: Generate and Prepare Four Original Journey Images

**Files:**
- Create: `src/assets/about-journey-2023.webp`
- Create: `src/assets/about-journey-2024.webp`
- Create: `src/assets/about-journey-2025.webp`
- Create: `src/assets/about-journey-2026.webp`

**Interfaces:**
- Consumes: the four approved image briefs below
- Produces: four 1600-by-1067, 3:2 WebP assets suitable for `object-fit: cover`

- [ ] **Step 1: Generate the 2023 founding image**

Use the image-generation tool with this prompt:

```text
Create an original premium editorial photograph for a corporate About-page milestone. Scene: an early-stage Indian consumer-brand team workspace inside a calm modern incubator studio, shown without identifiable faces. A walnut table holds an open notebook, restrained packaging sketches, neutral material samples, a pencil, and one modest unbranded product prototype. Warm cream walls, walnut wood, charcoal details, muted navy accents, and one restrained amber accent. Soft directional morning light, realistic materials, generous negative space, sophisticated Indian startup context, natural photographic depth, no readable text, no logos, no trademarks, no watermark, no gradients, no neon, no floating objects, no distorted hands. Landscape 3:2 composition designed for a website image panel.
```

Save the generated source outside the repository as:

```text
<temporary-output>/dspl-about-journey/2023.png
```

- [ ] **Step 2: Generate the 2024 first-brand image**

Use:

```text
Create an original premium editorial product-development photograph for a corporate About-page milestone. Scene: dark cacao, crafted chocolate pieces, selected Ayurvedic botanicals, a small brass measuring spoon, textured navy packaging paper, and restrained gold foil details arranged on warm stone and walnut. The result should suggest a premium Indian chocolate brand without showing or imitating any existing logo or readable package text. Warm cream, walnut, charcoal, muted navy, restrained amber and gold palette; soft directional natural light; realistic materials; sophisticated negative space; no readable text, logos, trademarks, watermark, gradients, neon, floating objects, or human anatomy. Landscape 3:2 composition designed for a website image panel.
```

Save as:

```text
<temporary-output>/dspl-about-journey/2024.png
```

- [ ] **Step 3: Generate the 2025 incubation and grant image**

Use:

```text
Create an original premium editorial photograph for an Indian innovation-incubation milestone. Scene: a refined research and product-development desk with an unbranded consumer-product prototype, measured botanical ingredients in small glass vessels, technical notebook diagrams that are not readable, a caliper, and restrained institutional workspace details. No people are required. The image should communicate incubation, technical support, grant-backed prototyping, and disciplined research without reproducing MUTBI, NIDHI, MAHE, government, or company logos. Warm cream, walnut, charcoal, muted navy, and restrained amber palette; soft natural side light; realistic materials; generous negative space; no readable text, trademarks, watermark, gradients, neon, or floating objects. Landscape 3:2 composition designed for a website image panel.
```

Save as:

```text
<temporary-output>/dspl-about-journey/2025.png
```

- [ ] **Step 4: Generate the 2026 services image**

Use:

```text
Create an original premium editorial photograph for a branding, marketing, and e-commerce services milestone. Scene: a mature Indian consumer-brand operations studio with a refined unbranded packaging system, product-photography setup, laptop showing an abstract storefront layout with no readable text, a color-proof sheet, and two dispatch-ready parcels. Warm cream, walnut, charcoal, muted navy, and restrained amber palette; soft directional natural light; realistic materials; calm premium composition; generous negative space; no people, no readable text, no logos, no trademarks, no watermark, no gradients, no neon, and no floating objects. Landscape 3:2 composition designed for a website image panel.
```

Save as:

```text
<temporary-output>/dspl-about-journey/2026.png
```

- [ ] **Step 5: Visually inspect all four source images**

Check each source at original detail. Reject and regenerate an image if it contains:

- visible words or logos;
- malformed packaging, tools, hands, or screens;
- inconsistent palette or lighting;
- a focal point that cannot survive a centered 3:2 crop;
- visual styling that does not match the other three images.

- [ ] **Step 6: Convert all four sources to optimized WebP**

Run this mechanical Pillow conversion:

```powershell
@'
from pathlib import Path
from PIL import Image, ImageOps

source_dir = Path("<temporary-output>/dspl-about-journey")
target_dir = Path("<project-root>/src/assets")

for year in ("2023", "2024", "2025", "2026"):
    source = source_dir / f"{year}.png"
    target = target_dir / f"about-journey-{year}.webp"
    image = Image.open(source).convert("RGB")
    fitted = ImageOps.fit(
        image,
        (1600, 1067),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )
    fitted.save(target, "WEBP", quality=84, method=6)
    print(target.name, target.stat().st_size)
'@ | python -
```

Expected: four WebP files, each reporting a non-zero size and opening at 1600 by 1067 pixels.

- [ ] **Step 7: Commit the approved image set**

```powershell
git add -- src/assets/about-journey-2023.webp src/assets/about-journey-2024.webp src/assets/about-journey-2025.webp src/assets/about-journey-2026.webp
git diff --cached --check
git commit -m "feat: add About journey editorial imagery"
```

---

### Task 3: Replace the Ledger With Alternating Journey Stories

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.css`

**Interfaces:**
- Consumes: `about-journey-2023.webp` through `about-journey-2026.webp`
- Produces: `journeyMilestones: Array<{year, title, items, image, alt}>` and four `.journey-story` articles

- [ ] **Step 1: Write failing journey structure assertions**

Add this test to `src/__tests__/designSystemRegression.test.js`:

```js
it('presents four alternating About journey stories with original imagery', () => {
  const aboutPage = readSource('src/pages/About.jsx');
  const aboutCss = readSource('src/pages/About.css');

  for (const year of ['2023', '2024', '2025', '2026']) {
    expect(aboutPage).toContain(`about-journey-${year}.webp`);
  }
  expect(aboutPage).toContain('const journeyMilestones = [');
  expect(aboutPage).toContain('journeyMilestones.map((milestone, index)');
  expect(aboutPage).toContain("index % 2 === 1 ? 'journey-story--reverse' : ''");
  expect(aboutPage).toContain('className="journey-story-media"');
  expect(aboutPage).toContain('className="journey-story-copy"');
  expect(aboutPage).not.toContain('timeline-badge');
  expect(aboutPage).not.toContain('timeline-container');
  expect(aboutCss).toMatch(
    /\.journey-story\s*{[^}]*display:\s*grid;[^}]*grid-template-areas:\s*"media copy";/s,
  );
  expect(aboutCss).toMatch(
    /\.journey-story--reverse\s*{[^}]*grid-template-areas:\s*"copy media";/s,
  );
  expect(aboutCss).toMatch(
    /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.journey-story,[\s\S]*?\.journey-story--reverse\s*{[^}]*grid-template-areas:\s*"media"\s*"copy";/s,
  );
});
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: FAIL at `presents four alternating About journey stories with original imagery` because the assets are not imported and the ledger markup remains.

- [ ] **Step 3: Add image imports and milestone data**

In `src/pages/About.jsx`, change the Lucide import to:

```js
import { Target, Eye } from 'lucide-react';
```

Add:

```js
import journey2023Img from '../assets/about-journey-2023.webp';
import journey2024Img from '../assets/about-journey-2024.webp';
import journey2025Img from '../assets/about-journey-2025.webp';
import journey2026Img from '../assets/about-journey-2026.webp';
```

Above `const About = () => {`, add:

```js
const journeyMilestones = [
  {
    year: '2023',
    title: 'Founding and first incubation',
    image: journey2023Img,
    alt: 'Consumer-brand planning materials in an early-stage incubator workspace',
    items: [
      'Started with a plan to build consumer brands and the services that grow them.',
      'Incubated at GoK Bioincubator, Manipal, where we set up our base.',
    ],
  },
  {
    year: '2024',
    title: 'First brand',
    image: journey2024Img,
    alt: 'Cacao, chocolate, and Ayurvedic botanicals arranged for premium product development',
    items: [
      'Launched Raw Radicles, a premium chocolate brand with Ayurveda inside.',
      'Built the product, packaging, and supply chain from the ground up.',
    ],
  },
  {
    year: '2025',
    title: 'MUTBI incubation and national grant',
    image: journey2025Img,
    alt: 'Research desk with a consumer-product prototype and measured botanical ingredients',
    items: [
      'Joined MUTBI at MAHE, Manipal, for technical and academic support.',
      'Won a government grant under the NIDHI-PRAYAS scheme.',
      'Signed a Memorandum of Understanding with Amruthanjali Ayurveda for manufacturing.',
    ],
  },
  {
    year: '2026',
    title: 'Services arm',
    image: journey2026Img,
    alt: 'Brand and e-commerce operations studio with packaging, photography, and dispatch materials',
    items: [
      'Opened our branding, marketing, and e-commerce services to outside clients.',
    ],
  },
];
```

- [ ] **Step 4: Replace the ledger markup**

Replace the existing `.timeline-container` block with:

```jsx
<div className="journey-stories">
  {journeyMilestones.map((milestone, index) => (
    <motion.article
      className={[
        'journey-story',
        index % 2 === 1 ? 'journey-story--reverse' : '',
      ].filter(Boolean).join(' ')}
      key={milestone.year}
      initial={revealInitial(24)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={revealTransition({
        duration: 0.55,
        delay: index > 0 ? 0.05 : 0,
      })}
    >
      <div className="journey-story-media">
        <img
          src={milestone.image}
          alt={milestone.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="journey-story-copy">
        <div className="journey-year">{milestone.year}</div>
        <h3 className="journey-title">{milestone.title}</h3>
        <ul className="journey-list">
          {milestone.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  ))}
</div>
```

- [ ] **Step 5: Replace timeline CSS with the alternating grid**

Keep the existing `.timeline-section` heading colors and replace `.timeline-container` through `.timeline-list li` rules with:

```css
.journey-stories {
  display: grid;
  gap: clamp(4rem, 8vw, 7rem);
  max-width: 72rem;
  margin: 0 auto;
}

.journey-story {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.95fr);
  grid-template-areas: "media copy";
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
}

.journey-story--reverse {
  grid-template-columns: minmax(18rem, 0.95fr) minmax(0, 1.05fr);
  grid-template-areas: "copy media";
}

.journey-story-media {
  grid-area: media;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: #ffffff;
}

.journey-story-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.journey-story-copy {
  grid-area: copy;
  max-width: 34rem;
}

.journey-year {
  margin-bottom: 0.75rem;
  color: var(--accent-text);
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
}

.journey-title {
  margin-bottom: 1rem;
  color: var(--text-heading);
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  line-height: 1.2;
  text-wrap: balance;
}

.journey-list {
  display: grid;
  gap: 0.65rem;
  padding-left: 1.1rem;
}

.journey-list li {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.65;
  text-wrap: pretty;
}
```

Add inside the existing `@media (max-width: 768px)` block:

```css
.journey-stories {
  gap: 3.5rem;
}

.journey-story,
.journey-story--reverse {
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "media"
    "copy";
  gap: 1.5rem;
}

.journey-story-copy {
  max-width: none;
}
```

Delete the obsolete `.timeline-container`, `.timeline-item`, `.timeline-badge`, `.timeline-card`, `.timeline-year`, `.timeline-milestone-title`, and `.timeline-list` rules and their mobile overrides.

- [ ] **Step 6: Run focused tests and lint**

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
npm run lint
```

Expected: all design-system regression tests PASS and ESLint exits 0.

- [ ] **Step 7: Commit the journey layout**

```powershell
git add -- src/pages/About.jsx src/pages/About.css src/__tests__/designSystemRegression.test.js
git diff --cached --check
git commit -m "feat: redesign About journey"
```

---

### Task 4: Responsive Visual QA and Full Verification

**Files:**
- Verify: `src/pages/About.jsx`
- Verify: `src/pages/About.css`
- Verify: `src/assets/about-journey-2023.webp`
- Verify: `src/assets/about-journey-2024.webp`
- Verify: `src/assets/about-journey-2025.webp`
- Verify: `src/assets/about-journey-2026.webp`

**Interfaces:**
- Consumes: completed About page and active Vite/Cloudflare preview
- Produces: evidence that the approved design works across desktop and mobile

- [ ] **Step 1: Verify the public preview remains healthy**

```powershell
Invoke-WebRequest -Uri 'https://lake-adapters-relates-states.trycloudflare.com/about' -UseBasicParsing -TimeoutSec 20 |
  Select-Object StatusCode
```

Expected: `StatusCode` is `200`.

- [ ] **Step 2: Inspect the desktop About page**

At the public `/about` route, verify:

- Mission and Vision cards have equal visible height.
- Four milestone rows appear in chronological order.
- Image/text alternation is left/right/left/right.
- Each image uses the same 3:2 frame and visual treatment.
- Copy remains readable with no image overlap.
- There is no central timeline rule, circular badge, broken asset, or horizontal overflow.

- [ ] **Step 3: Inspect a 390-by-844 mobile viewport**

Verify:

- Mission and Vision cards stack without forced matching height.
- Every milestone image appears before its story.
- All four images retain meaningful crops.
- No horizontal overflow exists.
- The header and supporter marquee remain unchanged.
- Browser console contains no page errors.

- [ ] **Step 4: Run complete repository verification**

```powershell
git diff --check
npm run lint
npm test
npm run build
npm run verify:html
```

Expected:

- `git diff --check`: exit 0
- ESLint: exit 0
- Vitest: all test files and tests pass
- Vite build: exit 0 and eight routes prerender
- HTML verification: eight public routes verified

- [ ] **Step 5: Confirm branch state**

```powershell
git status --short
git log -4 --oneline
git rev-list --left-right --count '@{u}...HEAD'
```

Expected: clean worktree, the three implementation commits are present, and the branch is ahead of its upstream with no push performed.
