# DSPL Website Project Context

Updated: 2026-08-21 IST
Repository: `E:\For website\dspl website`
Branch at snapshot: `release/v1.0-production`
HEAD at snapshot: `8a6838e2a81dda1311e3c1b7c978df19745b68ac`

This is a handoff ledger, not proof of current state. Refresh Git status and rerun
validation before relying on it. Current code and fresh evidence win on conflict.

## Orchestration Artifact State

All Codex-native orchestration artifacts are currently untracked and therefore
current-working-tree-only: `AGENTS.md`, `.codex/config.toml`,
`.codex/agents/evidence-mapper.toml`, `.codex/agents/project-planner.toml`,
`.codex/agents/bounded-implementer.toml`,
`.codex/agents/independent-reviewer.toml`, `docs/agent/PROJECT_CONTEXT.md`,
and `docs/superpowers/plans/2026-08-21-codex-project-orchestration.md`.
They are not yet durable or portable across new worktrees or clones. An
explicitly authorized commit is required before describing them as portable.

## Stable Decisions
- Product truth: `PRODUCT.md`.
- Visual system: `DESIGN.md`.
- Release history and deployment state: `ROADMAP.md`.
- Approved designs: `docs/superpowers/specs/`.
- Approved implementation steps: `docs/superpowers/plans/`.
- Optional broad evidence gathering uses `evidence_mapper` on Terra/high, read-only.
- Planning uses `project_planner` on Sol/high, read-only.
- Approved bounded implementation uses `bounded_implementer` on Luna/max, workspace-write.
- Completed work receives a fresh `independent_reviewer` pass on Sol/high, read-only.
- Only one implementation writer may operate at a time.
- Custom-agent TOML `sandbox_mode` values are defaults. Before spawning an agent, the coordinator sets and verifies the parent turn permission mode because a live override can supersede the TOML default.
- `bounded_implementer` on Luna/max is the requested route for clear, approved, bounded tasks. Complex, cross-cutting, security-sensitive, or high-risk work must be decomposed by Sol into safe bounded slices or stop for user-approved routing; no silent model substitution is allowed.
- Commits, pushes, merges, branch changes, and deployment require separate approval.
- `D:` is permanently outside project scope.

## Active Protected Work

### Header navigation rebuild
Status: implemented as uncommitted local work; preserve pending fresh review and handoff.
Plan: `docs/superpowers/plans/2026-08-21-dspl-header-navigation.md`

Protected active paths:
- `DESIGN.md`
- `src/__tests__/designSystemRegression.test.js`
- `src/components/Header.css`
- `src/components/Header.jsx`
- `src/components/__tests__/Header.test.jsx`
- `src/content/headerNavigation.js`
- `src/content/__tests__/headerNavigation.test.js`
- `docs/superpowers/plans/2026-08-21-dspl-header-navigation.md`

User-owned generated change:
- `src/generated/blogManifest.json`
- Snapshot SHA-256: `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`
- Do not run `build`, `build:fallback`, `content:sync`, or `sync:fallback` during unrelated work.
- Use `npm.cmd run build:site` when the active plan requires a build without content sync.

The header plan checkboxes are stale and must not be interpreted as evidence that the
existing implementation should be repeated.

### Insights Editorial Signals redesign
Status: implemented as uncommitted local work; fresh Sol/high code and visual review approved.
Plan: `docs/superpowers/plans/2026-08-21-insights-editorial-signals-redesign.md`

Task-owned paths:
- `src/pages/Blogs.jsx`
- `src/pages/Blogs.css`
- `src/pages/__tests__/Blogs.test.jsx`
- `docs/assets/insights-concepts/`
- `docs/ASSET_PROVENANCE.md`
- `src/assets/insights-brand-market-commerce-{640,960,1440}.webp`
- `src/assets/insights-packaging-to-purchase-{640,960,1440}.webp`

Selected masters are Brand/Market/Commerce v1 and Packaging-to-Purchase v2.
Packaging-to-Purchase v1 remains rejected provenance history. Keep the public
name `Insights`, retain `/blogs`, and do not add filters or other publication
chrome until the content library has enough depth to justify it.

## Pending Decision
- The Insights redesign is ready for user visual review in the current worktree.
- Commit, push, merge, and deployment remain separate approvals.

## Last Verification
Record only fresh evidence:

| Date | Scope | Command | Result | HEAD/status reference |
|---|---|---|---|---|
| 2026-08-21 IST | Pre-setup snapshot | `git status --short`; `git rev-parse HEAD`; SHA-256 of `src/generated/blogManifest.json` | Snapshot observed; tests not run during this setup pass | `8a6838e2a81dda1311e3c1b7c978df19745b68ac`; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9` |
| 2026-08-21 IST | Insights Editorial Signals | Focused Blogs test; focused ESLint; direct Vite build; `verify:html`; asset metadata/hash validation; `git diff --check`; browser QA at 1440x900 and 390x844 | 6/6 tests; lint clean; 15 pages prerendered; 14 routes plus 404 verified; six exact WebPs; zero public `.map`; no viewport overflow or console errors; fresh Sol/high review approved | HEAD unchanged; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`; work remains uncommitted |

## Next Authorized Action
- Present the local Insights redesign for user review.
- Do not commit, push, merge, deploy, or change branches without explicit authorization.

## Update Contract
- Coordinator updates this file after an accepted plan, completed task, review, or changed blocker.
- Keep only current active work here; move durable decisions into Stable Decisions.
- Never record secrets, credentials, private customer data, or unverifiable claims.

## Orchestration Handoff

1. Coordinator refreshes status/diffs and reads this ledger.
2. `evidence_mapper` optionally gathers repository and evidence context without editing for broad or uncertain work.
3. `project_planner` performs read-only synthesis and returns a bounded plan.
4. User approves material scope and design choices.
5. Coordinator records the approved plan and exact task/file allowlist.
6. `bounded_implementer` completes one bounded task as the sole writer.
7. Coordinator checks the complete worktree and protected hashes.
8. Fresh `independent_reviewer` audits the actual diff, not the worker's narrative.
9. Implementer receives only specific accepted findings; reviewer rechecks.
10. Coordinator updates this ledger and stops before commit, push, merge, or deployment.
