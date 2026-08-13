# About Journey Image Regeneration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all five About journey images for 2022-2026 with new, semantically distinct, aesthetically coherent editorial photographs and wire them into the existing page with provenance and regression coverage.

**Architecture:** Generate one lossless master per milestone with the built-in image generator, review each independently, and derive deterministic 1536 x 1024 WebP delivery assets with Sharp. Keep the existing journey files untouched, update only the About image imports/data and the source-based regression contract, and record the complete prompt/reference chain in the existing provenance owner.

**Tech Stack:** OpenAI built-in image generation, Sharp 0.35.3, React 19, Vite 8, Vitest 4, ESLint 10, PowerShell on Windows.

## Global Constraints

- Work only in `E:\For website\dspl website` on `pawan/raw-radicles-redesign`.
- Use five separate built-in image-generation calls in `photorealistic-natural` generation mode.
- Preserve the warm cream, walnut, charcoal, muted navy, deep green, and restrained amber editorial language.
- Every selected image must be 3:2, semantically readable without its year label, and compositionally distinct from every journey and route image.
- No readable fake documents, pseudo-text, malformed logos, copied third-party photography, public figures, trademarks, watermarks, duplicated objects, or obvious generation artifacts.
- Do not overwrite or delete `src/assets/about-journey-2023.webp` through `src/assets/about-journey-2026.webp`.
- Do not change milestone facts, layout, CSS, motion, portraits, hero rotation, navigation, footer, supporter strip, other route imagery, or deployment.
- Do not commit, push, merge, deploy, or delete cleanup candidates without separate user authorization.

---

### Task 1: Lock the five-image runtime contract with a failing regression test

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `vite.config.js`
- Test: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: current source-text helper `readSource(relativePath): string`.
- Produces: a source contract requiring five unique `about-journey-v2-YYYY.webp` imports and rejecting the old shared 2022/2023 mapping.

- [x] **Step 1: Replace the four-image assertion with the five-image contract**

Use this exact test body while preserving the existing layout assertions after it:

```js
it('presents five alternating About journey stories with unique original imagery', () => {
  const aboutPage = readSource('src/pages/About.jsx');
  const aboutCss = readSource('src/pages/About.css');

  for (const year of ['2022', '2023', '2024', '2025', '2026']) {
    expect(aboutPage).toContain(`about-journey-v2-${year}.webp`);
    expect(aboutPage).toContain(`year: '${year}'`);
    expect(aboutPage).toMatch(
      new RegExp(
        `year:\\s*'${year}'[\\s\\S]{0,160}?image:\\s*journey${year}Img`,
      ),
    );
  }
  expect(aboutPage).toContain('const journeyMilestones = [');
  expect(aboutPage).toContain('journeyMilestones.map((milestone, index)');
  expect(aboutPage).toContain(
    "index % 2 === 1 ? 'journey-story--reverse' : ''",
  );
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

Also extend the existing Vitest config so ignored linked worktrees cannot be
collected as duplicate suites:

```js
import { configDefaults } from 'vitest/config'

test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.js',
  exclude: [...configDefaults.exclude, '**/.worktrees/**'],
},
```

- [x] **Step 2: Run the focused test and verify the new contract fails**

Run:

```powershell
npm.cmd test -- src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because `About.jsx` does not contain `about-journey-v2-2022.webp` and still maps the 2022 milestone to `journey2023Img`.

- [x] **Step 3: Check the test-only diff**

Run:

```powershell
git diff --check
git diff -- src/__tests__/designSystemRegression.test.js
```

Expected: no whitespace errors and only the five-image contract change.

### Task 2: Generate, review, and derive the five milestone image families

**Files:**
- Create: `docs/assets/journey-masters/about-journey-v2-2022.png`
- Create: `docs/assets/journey-masters/about-journey-v2-2023.png`
- Create: `docs/assets/journey-masters/about-journey-v2-2024.png`
- Create: `docs/assets/journey-masters/about-journey-v2-2025.png`
- Create: `docs/assets/journey-masters/about-journey-v2-2026.png`
- Create: `src/assets/about-journey-v2-2022.webp`
- Create: `src/assets/about-journey-v2-2023.webp`
- Create: `src/assets/about-journey-v2-2024.webp`
- Create: `src/assets/about-journey-v2-2025.webp`
- Create: `src/assets/about-journey-v2-2026.webp`

**Interfaces:**
- Consumes: approved reference assets and the five milestone facts in `src/pages/About.jsx`.
- Produces: five lossless masters and five 1536 x 1024 WebP delivery assets, each mapped one-to-one to a year.

- [x] **Step 1: Generate the 2022 incorporation master**

Call the built-in image generator with `src/assets/icon_orange.webp` labelled as a palette-only reference and `src/assets/about-journey-2023.webp` labelled as a lighting/material reference. Use this prompt:

```text
Use case: photorealistic-natural
Asset type: 3:2 editorial milestone photograph for the DSPL About-page journey, year 2022
Primary request: Create an original premium but modest company-incorporation scene that communicates a formal organisational beginning without using readable documents.
Input images: Image 1 is palette reference only; never render or recreate its logo. Image 2 is lighting and material-quality reference only; do not copy its desk, packaging, pinboard, objects, or camera framing.
Scene/backdrop: Refined small Indian founding office with cream plaster, walnut, charcoal, and restrained amber material cues.
Subject: Blank incorporation folio, closed document wallet, fountain pen, simple brass date-stamp tool with no visible characters, and neatly ordered neutral stationery.
Style/medium: Photorealistic editorial commercial photography with realistic paper, leather, brass, timber grain, subtle imperfections, and no synthetic stock-photo sheen.
Composition/framing: 3:2 landscape, oblique medium-close viewpoint, stable central subject, breathing room around important props; unlike every supplied reference composition.
Lighting/mood: Soft architectural daylight, grounded, credible, quietly consequential.
Constraints: no people, hands, packaging prototypes, cacao, laboratory glassware, e-commerce equipment, readable certificates, letters, numbers, logos, government emblems, trademarks, watermark, duplicated objects, gradients, neon, fantasy technology, or exaggerated glow.
```

Inspect the result at original resolution. Accept only if it reads as incorporation without text and contains none of the excluded product or laboratory cues. Save the selected PNG as `docs/assets/journey-masters/about-journey-v2-2022.png`.

- [x] **Step 2: Generate the 2023 first-incubation master**

Call the built-in image generator with `src/assets/about-journey-2023.webp` labelled as a subject-stage and palette reference. Use this prompt:

```text
Use case: photorealistic-natural
Asset type: 3:2 editorial milestone photograph for the DSPL About-page journey, year 2023
Primary request: Create a new early-stage food-technology incubator environment that connects a modest startup workspace to a small institutional lab bench.
Input images: Image 1 is subject-stage and palette reference only; create a completely new room, viewpoint, object arrangement, and composition.
Scene/backdrop: Credible Indian university-linked incubator with visible institutional architecture, practical office storage, and a compact food-development bench.
Subject: One early unbranded consumer-product prototype, basic food-development vessels, material samples, and planning sheets containing only abstract non-readable marks.
Style/medium: Photorealistic editorial reportage, realistic institutional materials and everyday imperfections, premium but not luxurious.
Composition/framing: 3:2 landscape, wider eye-level view with the incubator environment clearly visible; not a desk still life and not the 2022 legal composition.
Lighting/mood: Soft directional morning light, exploratory, practical, optimistic.
Constraints: no people, hands, legal-formation props, finished chocolate range, grant-award symbolism, mature photo studio, readable text, letters, numbers, institution logos, government emblems, trademarks, copied website photography, watermark, duplicated objects, gradients, neon, or fantasy technology.
```

Inspect the result at original resolution. Accept only if it reads as early incubation and does not resemble the 2022 legal scene or an advanced 2025 validation lab. Save it as `docs/assets/journey-masters/about-journey-v2-2023.png`.

- [x] **Step 3: Generate the 2024 first-brand master**

Call the built-in image generator with `src/assets/about-journey-2024.webp` labelled as the collection lighting/material anchor and the three Raw Radicles pack images labelled as product-form and colour references only. Use this prompt:

```text
Use case: photorealistic-natural
Asset type: 3:2 editorial milestone photograph for the DSPL About-page journey, year 2024
Primary request: Create a completely new finished premium consumer-brand launch still life connecting cacao, chocolate, Ayurvedic botanicals, packaging development, and retail readiness.
Input images: Image 1 anchors lighting, palette, cacao, botanical, and material treatment but its arrangement must not be copied. Images 2-4 are product-form and colour references only; do not copy their cutout composition, labels, logos, text, or exact pack artwork.
Scene/backdrop: Refined product-photography environment using navy, cream, cacao brown, warm walnut, and restrained amber.
Subject: Finished chocolate pieces, cacao pods and beans, measured Ayurvedic botanical ingredients, three structurally credible premium package silhouettes with blank surfaces, and restrained retail-presentation materials.
Style/medium: Photorealistic high-end product editorial with believable food texture, matte packaging, paper grain, timber, and subtle natural imperfections.
Composition/framing: 3:2 landscape, lower three-quarter product-photography angle, resolved market-ready grouping, new silhouette and camera position unlike all inputs.
Lighting/mood: Warm directional studio daylight, confident, premium, ready for launch.
Constraints: no people, hands, readable text, pseudo-letters, numbers, Raw Radicles logo, distorted logos, copied pack artwork, route-hero composition, trademarks, watermark, laboratory framing, duplicated products, gradients, neon, or exaggerated glow.
```

Inspect the result at original resolution. Accept only if cacao, chocolate, botanicals, finished packaging, and launch readiness are unmistakable without fake branding. Save it as `docs/assets/journey-masters/about-journey-v2-2024.png`.

- [x] **Step 4: Generate the 2025 MUTBI/grant master**

Call the built-in image generator with `src/assets/about-journey-2025.webp` labelled as prototype/measurement reference only. Do not provide institutional logos as visual inputs. Use this prompt:

```text
Use case: photorealistic-natural
Asset type: 3:2 editorial milestone photograph for the DSPL About-page journey, year 2025
Primary request: Create a new institutional prototype-validation and manufacturing-handoff scene that communicates incubation, technical review, grant-supported development, and transition toward production.
Input images: Image 1 is prototype-development and measurement reference only; replace its generic botanical formulation desk with a new institutional review composition.
Scene/backdrop: Credible Indian university-linked technical review space with cream, charcoal, muted navy, stainless steel, and restrained amber details.
Subject: Developed physical consumer-product prototype, precision measurement equipment, compact technical test fixture, neutral review sheets with abstract non-readable marks, one sealed validation sample, and a distinct production-ready sample suggesting manufacturing transfer.
Style/medium: Photorealistic institutional editorial photography with accurate material scale, realistic instruments, paper texture, and controlled natural imperfections.
Composition/framing: 3:2 landscape, structured front-facing composition with clear review and handoff relationships; not an ingredients desk and not the wider 2023 early-incubator room.
Lighting/mood: Cooler institutional daylight with warm highlights, rigorous, credible, forward-moving.
Constraints: no people, hands, money, award trophies, ceremonial cheque, cacao launch scene, institution logos, government emblems, readable grant documents, letters, numbers, copied MUTBI or NIDHI photography, trademarks, watermark, duplicated instruments, gradients, neon, or fantasy technology.
```

Inspect the result at original resolution. Accept only if it reads as validation and manufacturing handoff rather than generic formulation. Save it as `docs/assets/journey-masters/about-journey-v2-2025.png`.

- [x] **Step 5: Generate the 2026 services-arm master**

Call the built-in image generator with `src/assets/about-journey-2026.webp` labelled as operating-stage/material reference and `branding-workshop-02-1440.webp`, `marketing-primary-1440.webp`, and `ecommerce-primary-1440.webp` labelled as semantic references only. Use this prompt:

```text
Use case: photorealistic-natural
Asset type: 3:2 editorial milestone photograph for the DSPL About-page journey, year 2026
Primary request: Create a completely new mature integrated-services studio that communicates coordinated branding, marketing, and e-commerce delivery in one credible environment without becoming a collage.
Input images: Image 1 is operating-stage and material reference only; replace its desk-led composition. Images 2-4 are semantic references for identity review, campaign work, and commerce operations only; never reproduce their rooms, boards, billboards, devices, stores, object arrangements, or camera framing.
Scene/backdrop: Architectural Indian multidisciplinary studio with three connected vertical zones and warm cream, walnut, charcoal, deep green, muted navy, and restrained amber materials.
Subject: Identity-review wall made only from abstract geometric colour cards and material swatches; campaign-planning rail with blank layouts and non-readable charts; e-commerce and fulfilment zone with unbranded device silhouettes, generic packaging, and dispatch-ready parcels.
Style/medium: Photorealistic architectural editorial photography, realistic materials and scale, premium but active and operational.
Composition/framing: 3:2 landscape, wide architectural view, three zones connected through perspective and lighting, no dominant desk and no collage panels.
Lighting/mood: Warm controlled daylight, capable, coordinated, mature.
Constraints: no people, hands, readable screens, words, letters, numbers, labels, barcodes, logos, pseudo-text, trademarks, copied route imagery, duplicated devices, watermark, gradients, neon, floating interfaces, or fantasy technology.
```

Inspect the result at original resolution. Accept only if the three services read clearly as one operating environment and the scene is distinct from all supplied route images. Save it as `docs/assets/journey-masters/about-journey-v2-2026.png`.

- [x] **Step 6: Derive the five production WebP files deterministically**

Run this PowerShell command from the repository root:

```powershell
node -e "const sharp=require('sharp');const years=['2022','2023','2024','2025','2026'];Promise.all(years.map(y=>sharp('docs/assets/journey-masters/about-journey-v2-'+y+'.png').resize(1536,1024,{fit:'cover',position:'centre',withoutEnlargement:true,kernel:sharp.kernel.lanczos3}).webp({quality:86,effort:6}).toFile('src/assets/about-journey-v2-'+y+'.webp'))).then(()=>console.log('JOURNEY_WEBP_OK')).catch(e=>{console.error(e);process.exit(1)})"
```

Expected: `JOURNEY_WEBP_OK`. If a master is smaller than 1536 x 1024, preserve its native resolution and record that no-upscaling outcome instead of manufacturing pixels.

- [x] **Step 7: Verify dimensions, uniqueness, and file health**

Run:

```powershell
node -e "const sharp=require('sharp'),fs=require('fs'),crypto=require('crypto');const years=['2022','2023','2024','2025','2026'];(async()=>{const hashes=new Set();for(const y of years){const p='src/assets/about-journey-v2-'+y+'.webp';const b=fs.readFileSync(p);const m=await sharp(b).metadata();const h=crypto.createHash('sha256').update(b).digest('hex');if(hashes.has(h))throw new Error('duplicate '+y);hashes.add(h);console.log(y,m.width+'x'+m.height,h.slice(0,12))}console.log('JOURNEY_ASSET_OK')})().catch(e=>{console.error(e);process.exit(1)})"
```

Expected: five unique hashes, valid WebP metadata, and `JOURNEY_ASSET_OK`.

### Task 3: Wire the approved assets into About and record provenance

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `docs/ASSET_PROVENANCE.md`
- Test: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: the five exact WebP paths produced by Task 2.
- Produces: one-to-one milestone image mapping, accurate alt text, and an auditable five-image provenance record.

- [x] **Step 1: Replace the journey imports and mappings**

Use these imports:

```js
import journey2022Img from '../assets/about-journey-v2-2022.webp';
import journey2023Img from '../assets/about-journey-v2-2023.webp';
import journey2024Img from '../assets/about-journey-v2-2024.webp';
import journey2025Img from '../assets/about-journey-v2-2025.webp';
import journey2026Img from '../assets/about-journey-v2-2026.webp';
```

Set each milestone's `image` to the matching import and use these alt strings:

```js
2022: 'Company-incorporation folio and formal founding materials in a modest office'
2023: 'Early food-technology prototype in a university-linked incubator workspace'
2024: 'Finished chocolate, Ayurvedic botanicals, and premium packaging prepared for brand launch'
2025: 'Consumer-product prototype undergoing institutional validation and manufacturing handoff'
2026: 'Integrated branding, marketing, e-commerce, and fulfilment services studio'
```

Keep every width at `1536` and height at `1024` unless Task 2 recorded a smaller no-upscaling result, in which case use the exact verified dimensions.

- [x] **Step 2: Add the provenance table record and exact prompt set**

Add a new table row for `about-journey-v2-{2022,2023,2024,2025,2026}.webp` and the five masters. Record: OpenAI built-in image generation, date 2026-08-14, deterministic Sharp derivatives, all labelled reference roles, manual semantic/duplicate/artifact review, and approval from the 2026-08-13 design specification. Append the exact five prompts from Task 2 under a new `## 2026-08-14 About journey v2 prompts` heading.

- [x] **Step 3: Run the focused regression test**

Run:

```powershell
npm.cmd test -- src/__tests__/designSystemRegression.test.js
```

Expected: PASS, including the five unique journey assets contract.

- [x] **Step 4: Check the implementation diff**

Run:

```powershell
git diff --check
git status --short
```

Expected: only the approved spec/plan, five masters, five delivery assets, About mapping, regression test, and provenance record are changed or untracked.

### Task 4: Complete release-proportionate verification and responsive QA

**Files:**
- Verify: `src/pages/About.jsx`
- Verify: `src/assets/about-journey-v2-2022.webp`
- Verify: `src/assets/about-journey-v2-2023.webp`
- Verify: `src/assets/about-journey-v2-2024.webp`
- Verify: `src/assets/about-journey-v2-2025.webp`
- Verify: `src/assets/about-journey-v2-2026.webp`
- Verify: `docs/ASSET_PROVENANCE.md`

**Interfaces:**
- Consumes: completed Tasks 1-3.
- Produces: verified local implementation with no commit, push, merge, or deployment.

- [x] **Step 1: Run static and production validation**

Run sequentially:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run verify:html
git diff --check
```

Expected: every command exits 0; the full test count may be higher than the previous baseline but no test is skipped or failing.

- [x] **Step 2: Inspect the five production assets side by side**

Create a temporary contact sheet outside product source or inspect the five WebPs individually at original resolution. Confirm the semantic order, consistent grading, unique composition, absence of pseudo-text/logos/watermarks, and clean packaging/instrument geometry. Delete only the temporary contact sheet after review; never delete production or legacy assets.

- [x] **Step 3: Verify the rendered About page**

Build and serve the production output, then inspect `/about` at 1440 x 900 and 390 x 844. Confirm all five images load, alternate correctly on desktop, stack image-first on mobile, retain clear subjects, introduce no horizontal overflow, and produce no browser console errors.

- [x] **Step 4: Report the local handoff**

Report the five master paths, five WebP paths, final prompt set location, test/build results, and any rejected/regenerated attempts. State explicitly that existing journey assets remain, and no commit, push, merge, or deployment occurred.
