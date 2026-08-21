# DSPL Website Roadmap Diagram Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task by task.

**Goal:** Replace the architecture diagram with a status roadmap that clearly separates completed work, the release candidate, the next release gates, and later operations work.

**Architecture:** Produce one self-contained HTML artifact containing an accessible, responsive SVG timeline. The horizontal axis represents status progression—Done, Current, Next, Later—not elapsed time. Nine milestone cards alternate around a central status line, with DSPL gold reserved for the current release candidate.

**Tech stack:** Semantic HTML, CSS, inline SVG, Google Fonts (Outfit, Instrument Serif, Geist Mono), Git, Chrome headless screenshots, diagram-design self-check.

## Global constraints

- Follow `docs/superpowers/specs/2026-08-21-dspl-website-roadmap-diagram-design.md` as the approved source of truth.
- Do not change application runtime code or generated content.
- Do not introduce dates, completion percentages, owners, or calendar promises.
- Do not imply that the release branch is merged or deployed.
- Do not rotate credentials, merge, push, or deploy as part of this documentation task.
- Preserve `src/generated/blogManifest.json` and unrelated untracked files exactly as found.
- Use `apply_patch` for authored file changes.

### Task 1: Replace the old architecture artifact with the roadmap

**Files:**

- Delete: `docs/diagrams/dspl-content-to-visitor-architecture.html`
- Create: `docs/diagrams/dspl-website-roadmap.html`

- [ ] Build a self-contained HTML document with no JavaScript, images, iframes, or external assets except the approved Google Fonts stylesheet.
- [ ] Add a concise page heading and explanatory subtitle that explicitly states that the roadmap is status-based rather than date-based.
- [ ] Create one SVG with `viewBox="0 0 1600 760"`, `role="img"`, and labelled title and description elements. The SVG title must be its first child.
- [ ] Draw a horizontal status line at `y=380` with labelled spans and boundaries:
  - Done: `x=80–720`
  - Current: `x=720–920`
  - Next: `x=920–1400`
  - Later: `x=1400–1520`
- [ ] Place nine milestones at `x=120, 280, 440, 600, 820, 1020, 1180, 1340, 1460`.
- [ ] Alternate ordinary cards between `y=172` and `y=476`, using approximately `200×112` cards. Give the current card extra height and emphasis at approximately `y=148`.
- [ ] Use DSPL gold only for the current milestone and one current-position marker. Use checked points for Done, outlined points for Next, and a dashed treatment for Later.
- [ ] Add exactly these nine milestone narratives:
  1. **Foundations complete:** analytics, accessibility, SEO, forms/privacy, tests, and lazy routes.
  2. **Evidence-led redesign complete:** responsive heroes, brand proof and imagery, conversion structure, and visual tokens.
  3. **Launch hardening complete:** prerendering, metadata/JSON-LD, real 404 handling, security headers, focus/keyboard behavior, and source-map prevention.
  4. **Production polish complete:** Sanity blog snapshots, Insights routes, Umami plus GA4, homepage refinements, performance, and the floating header.
  5. **Release candidate:** branch `release/v1.0-production`; 38 test files and 216 tests passing; final visual/content approval and the complete release gate remain open.
  6. **Credential and evidence gate:** rotate the exposed Web3Forms key; run lint, tests, build, HTML verification, audit, source-map scan, and browser QA.
  7. **Review and merge:** obtain final approval, open/review the PR, and merge into `main`; merging is not deployment permission.
  8. **Approved deployment:** make a separate deployment decision and deploy only the generated static site.
  9. **Operate and keep current:** run production smoke tests for routes, forms, analytics, SEO, headers, and 404 behavior; synchronize ROADMAP and README.
- [ ] Use the approved diagram palette: paper `#F7F4ED`, surface `#FFF7E6`, ink `#171A22`, muted `#5E5B55`, accent `#E6A000`, and accent text `#8A5B00`.
- [ ] Use Outfit for body and milestone names, Instrument Serif for the title, and Geist Mono for status labels and small metadata.
- [ ] Add responsive title breaks and a horizontally scrollable diagram container for narrow screens without causing page-level horizontal overflow.

### Task 2: Validate semantics, structure, and visual rendering

**Files:**

- Inspect: `docs/diagrams/dspl-website-roadmap.html`
- Output screenshots outside the repository under `C:\Users\Pawan\.codex\visualizations\2026\08\21\01a022af-99f8-7191-b6e2-11faf39392c0`

- [ ] Run the diagram-design self-check:

  ```powershell
  python "C:\Users\Pawan\.codex\skills\diagram-design\scripts\self_check.py" "docs\diagrams\dspl-website-roadmap.html"
  ```

- [ ] Verify programmatically that there are exactly nine milestone groups, no more than two focal elements, one accessible SVG title/description pair, and no scripts, images, or iframes.
- [ ] Render a desktop screenshot at `1600×1000` with headless Chrome and inspect it visually.
- [ ] Render a mobile screenshot at `390×844` with headless Chrome and inspect title wrapping, page width, scroll affordance, card readability, and current-state emphasis.
- [ ] Correct any clipping, overlap, weak contrast, unintended overflow, or misleading hierarchy and repeat validation.

### Task 3: Run repository verification and commit the replacement

**Files:**

- Verify: `docs/diagrams/dspl-website-roadmap.html`
- Verify deletion: `docs/diagrams/dspl-content-to-visitor-architecture.html`

- [ ] Run the project test suite:

  ```powershell
  npm.cmd test
  ```

- [ ] Re-run the diagram self-check after any corrections.
- [ ] Inspect `git diff --check`, the complete scoped diff, and `git status --short`.
- [ ] Confirm that only the old architecture HTML deletion and new roadmap HTML addition are staged.
- [ ] Commit with:

  ```powershell
  git commit -m "docs: replace architecture diagram with roadmap"
  ```
- [ ] Report the artifact path, what the roadmap explains, verification evidence, commit hash, and preserved unrelated changes. Do not merge, push, or deploy.
