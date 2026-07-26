# DSPL website roadmap

Repository: `GangliaTechno/dspl-website`

Current branch: `pawan/raw-radicles-redesign`

Current checkout: `E:\For website\dspl website`

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

- Added the six-step execution framework, institutional support marks, owned
  brand content, and clearer conversion paths.

## Phase 8: Evidence-led site evolution — current

Branch: `pawan/raw-radicles-redesign`

Approved references:

- [Design specification](docs/superpowers/specs/2026-07-26-evidence-led-site-evolution-design.md)
- [Implementation plan](docs/superpowers/plans/2026-07-26-dspl-evidence-led-site-evolution.md)
- [Asset cleanup candidates](docs/ASSET_CLEANUP_CANDIDATES.md)

Completed in this phase:

- [x] Central enquiry-modal action with source attribution.
- [x] Pure, tested lead-form model and missing-configuration retry behavior.
- [x] Evidence-first homepage in the approved reading order.
- [x] Static institutional supporter strip without duplicate marquee images.
- [x] Owned-brand operating proof for Raw Radicles.
- [x] Shared spacing, radius, shadow, container, focus, and control tokens.
- [x] Clear CSS ownership with no embedded static `<style>` blocks.
- [x] Central metadata for all eight public routes.
- [x] Singleton canonical and Organization JSON-LD behavior.
- [x] Route-specific prerendered HTML and CI verification.
- [x] Responsive, high-priority homepage hero image markup.
- [x] Deletion-free inventory of all 74 source assets.
- [x] Repository handoff, environment, and deployment documentation.

Remaining release gate:

- [ ] Full automated verification after all commits.
- [ ] Desktop and mobile browser QA across every public route.
- [ ] Console, hydration, keyboard, and modal behavior checks.
- [ ] Review the installed dependency audit and document any accepted risk.
- [ ] Rotate the historically tracked Web3Forms key.
- [ ] Deployment remains a separate, explicitly approved action.
