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
- [x] Reconciled the redesign history with `origin/main` while preserving the
      approved redesign tree and leaving `main` unchanged.
- [x] Migrated to patched React Router 8.3.0 and Node.js 22.22+.
- [x] Removed confirmed superseded media and unreachable experiments while
      preserving source masters and provenance records.

Remaining release gate:

- [x] Full automated verification after implementation changes.
- [x] Desktop and mobile browser QA across every public route.
- [x] Console, hydration, keyboard, and modal behavior checks.
- [x] Resolve the React Router dependency audit findings.
- [ ] Rotate the historically tracked Web3Forms key.
- [ ] Obtain final visual approval.
- [ ] Merge into `main` through a reviewed pull request.
- [ ] Deploy as a separate, explicitly approved action.

### Release evidence

- `npm run lint`, `npm test`, `npm run build`, and `npm run verify:html` pass.
  The current suite contains 47 passing tests across 12 files, and the build
  emits verified HTML for all eight public routes.
- Browser QA covered desktop and mobile route rendering, horizontal overflow,
  headings, metadata singletons, header navigation, the mobile menu, keyboard
  focus wrapping and restoration, form validation, back-to-top behavior, and
  fresh-session hydration.
- Hydration preloads only the component for the initial pathname so the client
  begins with the same page markup as the prerendered HTML. Later navigation
  continues to use lazy page chunks.
- `npm audit` reports zero vulnerabilities after migrating from
  `react-router-dom` 7 to patched `react-router` 8.3.0. The CI runtime and local
  requirements now use Node.js 22.22 or newer, matching the router baseline.

### Asset status

- 60 files currently exist in `src/assets`.
- 42 participate in production source and total 5.23 MiB.
- 18 unreferenced source masters total 10.60 MiB and remain intentionally
  preserved for recropping, identity provenance, or portrait recovery.
- 54 superseded outputs totaling 42.26 MiB, four unreachable WebGL experiments,
  and one obsolete critique were removed after approval.

### Deployment drift

The production site at `https://dashapatmaja.in` was last inspected read-only
on 2026-07-26. It still served the earlier homepage structure, repeated
supporter logos, embedded static styles, and omitted the homepage canonical
link. This branch contains the approved evidence-led structure, extracted CSS,
responsive visual system, and route-specific canonical metadata.

No deployment has been performed from this branch.
