# DSPL Website Status Roadmap Diagram

## Status

Approved replacement design. This specification supersedes the earlier content-to-visitor architecture diagram specification.

## Goal

Create a concise roadmap that lets a stakeholder immediately understand what has been completed, what is current, what must happen next, and what follows after release.

The diagram is a truthful status view, not a technical architecture map and not a promise of calendar dates. It should reconcile the historical roadmap against the current branch, current code, recent commits, and current verification evidence.

## Source of truth

Use evidence in this order:

1. Current code and current branch state.
2. Recent Git commits on `release/v1.0-production`.
3. Current verification results.
4. `ROADMAP.md` for historical phases and explicitly unfinished release gates.

Do not repeat stale claims from `ROADMAP.md` without reconciliation. In particular:

- The active branch is `release/v1.0-production`, not `pawan/raw-radicles-redesign`.
- The current test suite passes 216 tests across 38 files, not the older 47-test/12-file baseline.
- The current branch includes the Sanity blog snapshot pipeline, Umami plus GA4 consent-aware analytics, and subsequent hero, capability, and floating-header polish.
- A passing test suite does not by itself prove the complete release gate; lint, build, prerender verification, audit, source-map scan, and final browser approval still belong to the release decision.
- Deployment and merge into `main` remain separate actions requiring explicit approval.

## Chosen visual approach

Use the diagram-design **timeline** type as a status progression rather than a calendar timeline. The axis labels are explicit status stages—`DONE`, `CURRENT`, `NEXT`, and `LATER`—so equal visual spacing does not imply equal dates or durations.

Use a horizontal left-to-right baseline with four lightly bounded stage regions. Completed milestones use check marks and neutral ink; the current release-candidate milestone is the primary gold focal point; next actions use outlined nodes; later work uses a lighter dashed treatment.

Use `doc-wide` size, balanced detail, mixed audience, static mode, no animation, and no decorative dot pattern.

## Roadmap content

Keep the roadmap to nine milestones.

### Done

1. **Foundations complete** — analytics, accessibility, SEO, forms/privacy, testing/CI, lazy loading, and conversion structure.
2. **Evidence-led redesign complete** — responsive hero system, supporter proof, Raw Radicles treatment, route-specific media, portraits, enquiry flows, and shared visual tokens.
3. **Launch hardening complete** — prerendered routes, metadata/JSON-LD, real 404 handling, security/caching headers, keyboard/focus behavior, and source-map prevention.
4. **Production polish complete** — Sanity-generated blog snapshots, insights routes, Umami plus GA4 consent-aware analytics, homepage refinement, performance work, and persistent floating header.

### Current

5. **Release candidate** — `release/v1.0-production`; 38 test files and 216 tests pass. Final visual/content approval and a fresh complete release gate remain open.

### Next

6. **Credential and evidence gate** — rotate the historically exposed Web3Forms key, then run lint, tests, production build, prerender verification, audit, source-map scan, and responsive browser QA on the final tree.
7. **Review and merge** — obtain final approval, create/review the pull request, and merge into `main` without treating merge as deployment permission.
8. **Approved deployment** — deploy the generated static site only after a separate explicit deployment decision.

### Later

9. **Operate and keep current** — perform production smoke checks for routes, forms, analytics, SEO, headers, and 404 behavior; then keep `ROADMAP.md` and README route/status information synchronized with code.

## Visual system

Use current DSPL website tokens locally in the self-contained artifact:

- Paper: `#F7F4ED`.
- Paper surface: `#FFF7E6`.
- Ink: `#171A22`.
- Muted: `#5E5B55`.
- Accent: `#E6A000`.
- Accent text: `#8A5B00`.
- Body and milestone names: Outfit.
- Diagram title and technical/status labels: the diagram-design editorial serif/mono roles.

Gold is reserved for the current release-candidate milestone and one small current-position marker. Do not use separate colors for every status; status must remain legible through labels, line styles, and check/outline/dash treatments.

## Output and replacement scope

Create one self-contained HTML file:

`docs/diagrams/dspl-website-roadmap.html`

Remove the superseded architecture artifact:

`docs/diagrams/dspl-content-to-visitor-architecture.html`

Replace the old implementation plan with a roadmap-named plan during the planning step. The old files remain recoverable through Git history.

The HTML must contain inline CSS and one inline accessible SVG. External font loading is allowed only through the approved Google Fonts stylesheet. Do not add JavaScript, images, iframe content, or an automatic PNG/SVG export.

## Validation

Before handoff:

- Run the installed diagram-design `self_check.py` against the roadmap HTML.
- Verify the accessible SVG title/description contract and single-file safety.
- Confirm exactly nine roadmap milestones and no more than two gold focal elements.
- Render and visually inspect desktop and mobile widths; the wide timeline may scroll inside its own container, but the page title and explanatory copy must wrap within the viewport.
- Run `git diff --check` and the project test suite.
- Stage and commit only the roadmap replacement files; do not stage or alter the user's existing `src/generated/blogManifest.json` change.

## Non-goals

- Do not modify website runtime code, route behavior, copy, metadata, deployment configuration, or the global diagram-design style guide.
- Do not assign dates, percentages, or owners that are not supported by current project evidence.
- Do not claim the branch has been merged or deployed.
- Do not perform credential rotation, merge, push, pull-request creation, or deployment as part of producing this roadmap.
