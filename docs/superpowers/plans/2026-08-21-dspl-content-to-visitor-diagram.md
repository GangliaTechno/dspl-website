# DSPL Content-to-Visitor Delivery Architecture Diagram Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and validate one self-contained, DSPL-branded architecture diagram showing the path from content sources through build/prerendering to the hydrated visitor experience.

**Architecture:** Build a static HTML document containing inline CSS and one accessible inline SVG. Organize the SVG into three light zones—content/build inputs, application/delivery, and runtime experience—with one left-to-right primary flow and a small browser-integration sidecar. Keep all website tokens local to the artifact so the installed diagram-design global skin is not changed.

**Tech Stack:** HTML, inline CSS, inline SVG, Google Fonts stylesheet for Outfit, Python 3, PowerShell, and the installed `diagram-design` `self_check.py` script.

## Global Constraints

- Use current code as the source of truth; include `/start`, legal pages, `/blogs`, and `/blogs/:slug` and do not copy the README's outdated eight-route summary.
- Use the `architecture` diagram type, `doc-wide` size, balanced detail, mixed audience, static mode, and no dot pattern or animation.
- Use DSPL tokens: paper `#F7F4ED`, ink `#171A22`, muted `#5E5B55`, accent `#E6A000`, accent text `#8A5B00`, and Outfit typography.
- Keep the diagram at or below nine primary nodes and use gold on no more than two focal elements.
- Use rounded orthogonal connectors, opaque label masks with a 6–10px gap, distinct edge attach points, and the 4px coordinate/size grid.
- Include prefixed SVG `<title>` and `<desc>`, `role="img"`, and `aria-labelledby`.
- Keep the output self-contained; do not add React/runtime changes, PNG/SVG exports, or global skill-style changes.
- Do not stage or modify the pre-existing timestamp-only change in `src/generated/blogManifest.json`.

---

### Task 1: Create the self-contained architecture diagram

**Files:**
- Create: `docs/diagrams/dspl-content-to-visitor-architecture.html`
- Reference: `docs/superpowers/specs/2026-08-21-dspl-content-to-visitor-diagram-design.md`
- Reference: `C:/Users/Pawan/.codex/skills/diagram-design/assets/template.html`
- Reference: `C:/Users/Pawan/.codex/skills/diagram-design/references/type-architecture.md`

**Interfaces:**
- Consumes: The approved spec and current source-of-truth files listed in that spec.
- Produces: A browser-openable HTML document at the exact output path with no runtime dependencies beyond the allowed Google Fonts stylesheet.

- [ ] **Step 1: Establish the output skeleton from the minimal light template.**

  Copy the template structure conceptually, but create the project artifact with `apply_patch`. Retain a short eyebrow, the title `DSPL Website: Content to Visitor`, a one-sentence subtitle, inline CSS, and an inline SVG. Do not copy any default orange tokens into the output.

- [ ] **Step 2: Add the three-zone SVG layout on the 4px grid.**

  Use a `1440 x 784` viewBox and wrap the diagram content after the background rect in `transform="translate(0 -96)"` so the header-to-diagram gap stays compact. Draw the clean DSPL paper background, then zones before connectors and nodes:

  - `CONTENT + BUILD` zone: `x=40 y=152 width=400 height=596`.
  - `APPLICATION + DELIVERY` zone: `x=464 y=152 width=560 height=596`.
  - `RUNTIME EXPERIENCE` zone: `x=1048 y=152 width=352 height=596`.

  Use zone label masks with at least 16px before the first node. Keep all node positions, widths, heights, gaps, and font sizes divisible by 4.

- [ ] **Step 3: Add the nine bounded nodes and their source labels.**

  Add these nodes with short human-readable names and monospace implementation labels:

  1. `CONTENT SOURCES` / `Sanity + fallback`.
  2. `CONTENT SYNC` / `sync-blog-content.mjs`.
  3. `ROUTE + SEO CORE` / `AppRoutes · metadata · publication`.
  4. `BUILD + PRERENDER` / `Vite · sitemap · entry-prerender`.
  5. `STATIC OUTPUT` / `dist · 404 · headers · redirects`.
  6. `BROWSER BOOTSTRAP` / `main.jsx · hydrationRoute.js`.
  7. `SITE SHELL + PAGES` / `Header · Footer · lazy routes`.
  8. `VISITOR` / `public browser experience`.
  9. `BROWSER INTEGRATIONS` / `Umami · GA4 · Web3Forms`.

  Make `BUILD + PRERENDER` the primary gold focal node and `BROWSER BOOTSTRAP` the only secondary gold focal node. Use white/backend treatment for implementation nodes, muted/store treatment for generated/static state, and external treatment for the visitor/integrations.

- [ ] **Step 4: Add labeled orthogonal connectors.**

  Draw arrows before the node boxes. Use the solid primary path:

  `CONTENT SOURCES → CONTENT SYNC → ROUTE + SEO CORE → BUILD + PRERENDER → STATIC OUTPUT → BROWSER BOOTSTRAP → SITE SHELL + PAGES → VISITOR`.

  Add dashed secondary paths for:

  - Published blog data from `CONTENT SYNC` into `ROUTE + SEO CORE`, labeled `PUBLISHED PATHS`.
  - `STATIC OUTPUT` serving the browser bootstrap, labeled `HTML`.
  - `SITE SHELL + PAGES` sending analytics/forms to `BROWSER INTEGRATIONS`, labeled `TRACK / SUBMIT`.

  Route every off-axis connector with rounded right-angle elbows. Place every arrow label on an opaque DSPL-paper mask with a visible 6–10px gap from its stroke. Fan shared edge ports by at least 12px and reroute any line that would pass behind a non-endpoint node.

- [ ] **Step 5: Add the accessible SVG contract and small legend strip.**

  Use IDs `dspl-content-to-visitor-title` and `dspl-content-to-visitor-desc`, with the title as the first child of the SVG. The description must state that the figure shows DSPL content, build/prerender, static delivery, and browser hydration. Add a horizontal bottom legend for solid `primary flow`, dashed `runtime/secondary flow`, and gold `focal node`; do not float it inside the diagram area.

- [ ] **Step 6: Run the packaged self-check before further review.**

  Run:

  ```powershell
  python "C:\Users\Pawan\.codex\skills\diagram-design\scripts\self_check.py" "docs\diagrams\dspl-content-to-visitor-architecture.html"
  ```

  Expected: the self-check exits successfully with no accessibility, single-file, or static-motion errors. If it fails, fix the HTML with `apply_patch` and rerun the same command.

### Task 2: Perform structural and visual validation

**Files:**
- Inspect: `docs/diagrams/dspl-content-to-visitor-architecture.html`
- Inspect: `src/generated/blogManifest.json`

**Interfaces:**
- Consumes: The validated diagram produced by Task 1.
- Produces: Evidence that the artifact is self-contained, accessible, within the architecture complexity budget, and isolated from unrelated worktree changes.

- [ ] **Step 1: Run exact structural checks.**

  Run:

  ```powershell
  $diagram = "docs\diagrams\dspl-content-to-visitor-architecture.html"
  rg -n 'role="img"|aria-labelledby="dspl-content-to-visitor-title dspl-content-to-visitor-desc"|<title id="dspl-content-to-visitor-title"|<desc id="dspl-content-to-visitor-desc"|fonts.googleapis.com|<script|<img|<iframe|<svg' $diagram
  ```

  Expected: one accessible SVG, one prefixed title, one prefixed description, at most the allowed Google Fonts stylesheet reference, and no script/image/iframe tags.

- [ ] **Step 2: Run the packaged self-check again after review fixes.**

  Run the same `python ... self_check.py ...` command from Task 1 and require exit code 0.

- [ ] **Step 3: Check diff hygiene and unrelated work.**

  Run:

  ```powershell
  git diff --check
  git status --short
  git diff -- src/generated/blogManifest.json
  git diff --cached -- src/generated/blogManifest.json
  ```

  Expected: the diagram is the only new implementation artifact; `src/generated/blogManifest.json` retains only the user's existing timestamp change and is not staged.

### Task 3: Commit only the finished diagram

**Files:**
- Add: `docs/diagrams/dspl-content-to-visitor-architecture.html`

**Interfaces:**
- Consumes: The self-check-passing and structurally reviewed diagram from Task 2.
- Produces: One focused git commit containing only the diagram artifact.

- [ ] **Step 1: Stage only the diagram.**

  ```powershell
  git add -- docs/diagrams/dspl-content-to-visitor-architecture.html
  git diff --cached --check
  ```

- [ ] **Step 2: Commit the artifact.**

  ```powershell
  git commit -m "docs: add DSPL delivery architecture diagram"
  ```

- [ ] **Step 3: Verify the final worktree boundary.**

  ```powershell
  git status --short
  git show --stat --oneline --summary HEAD
  ```

  Expected: the new commit contains only `docs/diagrams/dspl-content-to-visitor-architecture.html`; the pre-existing `src/generated/blogManifest.json` modification remains unstaged and uncommitted.
