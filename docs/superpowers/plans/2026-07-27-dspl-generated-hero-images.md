# DSPL Generated Hero Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce three coordinated desktop hero-image candidates for the About, Branding, and E-commerce pages without replacing the current website assets.

**Architecture:** Generate each page image as an independent photorealistic candidate using the built-in image-generation tool. Review the three outputs as one visual family, then obtain user selection before generating mobile companions or modifying website source.

**Tech Stack:** Built-in image generation, Codex image inspection, existing React/Vite website for later integration.

## Global Constraints

- Generate preview candidates only; do not replace or edit existing website assets.
- Generate at a landscape composition suitable for a 2048 x 1152 master.
- Use warm cream, parchment, walnut, charcoal, muted brass, and restrained gold.
- Keep the central region low-detail and dark enough for existing white and gold hero copy.
- Do not show identifiable people, real or invented DSPL locations, company names, fake logos, readable interface text, watermarks, or trademarked products.
- Preserve photographic realism and physically plausible objects.
- Generate mobile companion images only after the desktop candidates are approved.

---

### Task 1: About Hero Candidate

**Files:**
- Create: preview image under the built-in generated-image location
- Reference: `docs/superpowers/specs/2026-07-27-dspl-generated-hero-images-design.md`

**Interfaces:**
- Consumes: approved About scene, palette, composition, and avoid-list from the design specification
- Produces: one preview-only landscape About candidate

- [ ] **Step 1: Generate the About candidate**

Use the built-in image-generation tool with this prompt:

```text
Use case: photorealistic-natural
Asset type: wide website hero image for the About page of an Indian brand-building and business-incubation company
Primary request: Create a refined institutional strategy workspace that communicates research, planning, incubation, and multidisciplinary brand building without pretending to show the company's real office or employees.
Scene/backdrop: A warm contemporary Indian innovation workspace with a walnut strategy table, an open neutral notebook, market-research sheets containing abstract non-readable diagrams, unbranded packaging samples, material swatches, a brass-toned pen, and a small understated plant. Architectural shelving and frosted glass are softly visible in the background.
Style/medium: photorealistic editorial architectural and still-life photography, credible materials, subtle natural imperfections
Composition/framing: extra-wide environmental composition; concentrate objects in the outer thirds; preserve a quiet, medium-dark, low-detail central region for centered white and gold website copy; the crop must remain useful on a wide desktop hero
Lighting/mood: warm Indian daylight, calm, thoughtful, institutional, sophisticated but not luxurious
Color palette: warm cream, parchment, walnut, charcoal, muted brass, restrained gold
Constraints: no identifiable people; no claim that this is a real DSPL or MUTBI office; no readable text; no logos; no watermarks; physically plausible furniture and objects
Avoid: generic coworking stock photo, blue corporate lighting, fashion retail, futuristic screens, staged handshakes, fantasy architecture, excessive blur
```

- [ ] **Step 2: Inspect the About candidate**

Confirm:

```text
PASS when the image communicates strategy and institutional credibility, has a quiet central copy area, contains no identifiable people or readable text, and has no malformed objects.
FAIL when it resembles retail, a fake DSPL office, generic corporate stock photography, or a busy central composition.
```

- [ ] **Step 3: Keep the candidate preview-only**

Render the accepted candidate inline. Do not copy it into `src/assets` and do not modify `About.jsx` or `About.css`.

---

### Task 2: Branding Hero Candidate

**Files:**
- Create: preview image under the built-in generated-image location
- Reference: `docs/superpowers/specs/2026-07-27-dspl-generated-hero-images-design.md`

**Interfaces:**
- Consumes: approved Branding scene, palette, composition, and avoid-list
- Produces: one preview-only landscape Branding candidate

- [ ] **Step 1: Generate the Branding candidate**

Use the built-in image-generation tool with this prompt:

```text
Use case: photorealistic-natural
Asset type: wide website hero image for a Branding service page
Primary request: Show the real craft of building a consumer brand through packaging, identity systems, typography, color, and material exploration rather than showing a finished retail store.
Scene/backdrop: An art-directed brand studio tabletop with unbranded D2C packaging prototypes, blank label sheets, typography specimens represented only as abstract non-readable lines, color swatches, embossing samples, a glass jar, a carton, folded natural paper, and precise studio tools.
Style/medium: photorealistic editorial still-life photography, premium but credible Indian design-studio atmosphere
Composition/framing: wide three-quarter tabletop view; arrange packaging and tools in the left and right thirds; preserve a quiet, medium-dark central region for centered white and gold website copy
Lighting/mood: warm directional daylight, crafted, intelligent, confident, calm
Color palette: cream paper, walnut, charcoal, muted clay, brass, restrained gold
Constraints: no people; no readable words; no logos; no trademarked packaging; no watermarks; physically plausible packaging and tools
Avoid: handbags, fashion store, retail shelving, neon colors, fake brand names, excessive luxury styling, floating objects, glossy CGI
```

- [ ] **Step 2: Inspect the Branding candidate**

Confirm:

```text
PASS when the image clearly communicates identity and packaging work, remains visually distinct from E-commerce, and preserves the central copy area.
FAIL when it resembles a retail shop, product advertisement, craft hobby table, or contains readable fake branding.
```

- [ ] **Step 3: Keep the candidate preview-only**

Render the accepted candidate inline. Do not copy it into `src/assets` and do not modify `Branding.jsx` or `ServicePage.css`.

---

### Task 3: E-commerce Hero Candidate

**Files:**
- Create: preview image under the built-in generated-image location
- Reference: `docs/superpowers/specs/2026-07-27-dspl-generated-hero-images-design.md`

**Interfaces:**
- Consumes: approved E-commerce scene, palette, composition, and avoid-list
- Produces: one preview-only landscape E-commerce candidate

- [ ] **Step 1: Generate the E-commerce candidate**

Use the built-in image-generation tool with this prompt:

```text
Use case: photorealistic-natural
Asset type: wide website hero image for an E-commerce service page
Primary request: Communicate modern Indian D2C online selling, order handling, payments, fulfilment, and scalable operations without showing another physical clothing store.
Scene/backdrop: A premium but realistic D2C operations studio with neatly arranged unbranded kraft shipping boxes, parcels, tissue paper, a handheld barcode scanner, packing materials, an open laptop and smartphone displaying only abstract non-readable commerce shapes, and organized fulfilment shelving in the background.
Style/medium: photorealistic editorial operations photography, clean but actively used, credible and commercially grounded
Composition/framing: wide warehouse-studio hybrid; place operational details in the outer thirds; preserve a quiet, dark central region for centered white and gold website copy
Lighting/mood: warm controlled daylight, efficient, reliable, modern, accountable
Color palette: kraft brown, cream, charcoal, walnut, muted brass, restrained gold
Constraints: no people; no customer data; no readable dashboards; no currency values; no courier or marketplace logos; no watermarks; physically plausible equipment and parcels
Avoid: fashion boutique, clothing racks, futuristic warehouse robots, blue technology glow, fake UI text, excessive boxes, messy warehouse, obvious CGI
```

- [ ] **Step 2: Inspect the E-commerce candidate**

Confirm:

```text
PASS when the image communicates digital commerce and fulfilment, differs clearly from Branding, and preserves the central copy area.
FAIL when it resembles a fashion store, generic warehouse stock photo, logistics advertisement, or contains readable fake interface data.
```

- [ ] **Step 3: Keep the candidate preview-only**

Render the accepted candidate inline. Do not copy it into `src/assets` and do not modify `Ecommerce.jsx` or `ServicePage.css`.

---

### Task 4: Candidate Family Review

**Files:**
- Read: three generated preview candidates
- Do not modify: `src/assets`, React components, CSS, deployment configuration

**Interfaces:**
- Consumes: accepted preview candidates from Tasks 1-3
- Produces: a user decision for each page and targeted revision notes when required

- [ ] **Step 1: Review the three candidates together**

Check this matrix:

```text
About: institutional strategy and incubation
Branding: identity, packaging, and visual-system craft
E-commerce: online orders, operations, and fulfilment
Family match: consistent lighting, warmth, realism, and contrast
Copy safety: quiet central zone in all three
Truthfulness: no invented DSPL people, locations, clients, results, or partnerships
```

- [ ] **Step 2: Present the candidates for user approval**

Show all three inline with clear About, Branding, and E-commerce labels. Ask the user to approve each candidate or request one specific change per rejected candidate.

- [ ] **Step 3: Stop before integration**

Do not create mobile versions, convert files, update source paths, commit generated assets, push, or deploy until the user approves the desktop candidates.
