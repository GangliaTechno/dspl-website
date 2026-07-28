# DSPL website roadmap

Repository: `GangliaTechno/dspl-website`

Current implementation branch: `pawan/raw-radicles-redesign`

The branch names listed for phases 1–7 are historical implementation branches,
not active worktrees.

## Historical phases

### Phase 1: Analytics foundation — completed

Historical branch: `pawan/analytics-cleanup`

- Centralized GA4 initialization and SPA page-view tracking.
- Unified Work With Us lead-event tracking.

### Phase 2: Accessibility baseline — completed

Historical branch: `pawan/accessibility-baseline`

- Added mobile navigation state, Escape handling, focus visibility, modal
  semantics, form announcements, and reduced-motion support.

### Phase 3: SEO foundation and 404 route — completed

Historical branch: `pawan/seo-foundation`

- Added canonical and social metadata, robots and sitemap files, stable schema
  imagery, and the tracked 404 route.

### Phase 4: Forms and privacy — completed

Historical branch: `pawan/forms-privacy`

- Added privacy and terms content, Web3Forms submissions, honeypot handling,
  attachment behavior, and consistent response messaging.

### Phase 5: Testing and CI — completed

Historical branch: `pawan/testing-ci`

- Added Vitest, React Testing Library, jsdom, and the GitHub Actions quality
  gate.

### Phase 6: Performance and component refactoring — completed

Historical branch: `pawan/performance`

- Added route-level lazy loading, an accessible loading fallback, and initial
  bundle splitting.

### Phase 7: Conversion content and proof — completed

Historical branch: `pawan/conversion`

- Added the six-step execution framework, institutional support marks,
  owned-brand content, and clearer conversion paths.

## Phase 8: Evidence-led site evolution — release candidate

Branch: `pawan/raw-radicles-redesign`

Approved references:

- [Design specification](docs/superpowers/specs/2026-07-26-evidence-led-site-evolution-design.md)
- [Implementation plan](docs/superpowers/plans/2026-07-26-dspl-evidence-led-site-evolution.md)
- [Asset cleanup candidates](docs/ASSET_CLEANUP_CANDIDATES.md)

Completed in this phase:

- [x] Evidence-first homepage in the approved reading order.
- [x] Responsive full-height hero treatment across desktop and mobile.
- [x] Continuous supporter marquee with optically normalized marks.
- [x] Warm Raw Radicles proof treatment aligned with the DSPL palette.
- [x] Generated responsive hero families for About, Branding, and E-commerce.
- [x] Standardized leadership portraits without changing facial features.
- [x] Central enquiry-modal action with source attribution.
- [x] Pure, tested lead-form model and missing-configuration retry behavior.
- [x] Shared spacing, radius, shadow, container, focus, and control tokens.
- [x] Clear CSS ownership with no embedded static `<style>` blocks.
- [x] Central metadata for all eight public routes.
- [x] Singleton canonical and Organization JSON-LD behavior.
- [x] Route-specific prerendered HTML and CI verification.
- [x] Responsive, high-priority homepage hero image markup.
- [x] Repository handoff, security, contribution, and deployment documentation.
- [x] CI aligned to `main` and the active Pawan feature branch family.

Remaining release gate:

- [x] Full automated verification after implementation changes.
- [x] Desktop and mobile browser QA across every public route.
- [x] Console, hydration, keyboard, and modal behavior checks.
- [x] Review the installed dependency audit and document accepted risk.
- [ ] Rotate the historically tracked Web3Forms key.
- [ ] Obtain final visual approval.
- [ ] Merge into `main` through a reviewed pull request.
- [ ] Deploy as a separate, explicitly approved action.

### Release evidence

- `npm run lint`, `npm test`, `npm run build`, and `npm run verify:html` pass.
  The current suite contains 28 passing tests across 10 files, and the build
  emits verified HTML for all eight public routes.
- Browser QA covered desktop and mobile route rendering, horizontal overflow,
  headings, metadata singletons, header navigation, the mobile menu, keyboard
  focus wrapping and restoration, form validation, back-to-top behavior, and
  fresh-session hydration.
- Hydration preloads only the component for the initial pathname so the client
  begins with the same page markup as the prerendered HTML. Later navigation
  continues to use lazy page chunks.
- `npm audit --omit=dev` reports two high findings through
  `react-router-dom` for
  [GHSA-qwww-vcr4-c8h2](https://github.com/advisories/GHSA-qwww-vcr4-c8h2).
  The advisory applies only to unstable React Server Components APIs. This
  repository is a static Vite SPA using `BrowserRouter` and prerendered HTML,
  with no RSC APIs, server actions, or React Router server runtime. The
  vulnerable execution path is therefore absent. Do not apply npm's suggested
  downgrade to `react-router-dom@7.11.0`; reassess when a compatible patched
  major-version migration is planned.

### Asset status

- 91 files currently exist in `src/assets`.
- 35 participate in production source.
- 56 unreferenced originals and alternates remain intentionally deferred until
  final visual approval; they total 46.63 MiB and are not emitted by the tested
  production build.
- The obsolete one-off background processor, temporary audit output, and
  unreferenced React/Vite starter marks were removed.

### Deployment drift

The production site at `https://dashapatmaja.in` was last inspected read-only
on 2026-07-26. It still served the earlier homepage structure, repeated
supporter logos, embedded static styles, and omitted the homepage canonical
link. This branch contains the approved evidence-led structure, extracted CSS,
responsive visual system, and route-specific canonical metadata.

No deployment has been performed from this branch.
