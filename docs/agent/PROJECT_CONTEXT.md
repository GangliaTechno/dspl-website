# DSPL Website Project Context

Updated: 2026-08-25 IST
Repository: `E:\For website\dspl website`
Branch at snapshot: `release/v1.0-production`
HEAD at snapshot: `c9ecb4a05732e74f54319ff2f1cfc65879ead8b6`

This is a handoff ledger, not proof of current state. Refresh Git status and rerun
validation before relying on it. Current code and fresh evidence win on conflict.

## Orchestration Artifact State

All Codex-native orchestration artifacts are tracked in the current branch:
`AGENTS.md`, `.codex/config.toml`,
`.codex/agents/evidence-mapper.toml`, `.codex/agents/project-planner.toml`,
`.codex/agents/bounded-implementer.toml`,
`.codex/agents/independent-reviewer.toml`, `docs/agent/PROJECT_CONTEXT.md`,
and `docs/superpowers/plans/2026-08-21-codex-project-orchestration.md`.
They are durable across worktrees and clones that contain those commits.

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

### Release-integrated Insights publication

Status: Insights publication Phases 1-3 are merged into and pushed on
`release/v1.0-production`; fresh Sol/high review approved the staged merge with
no P0-P3 findings.

Design: `docs/superpowers/specs/2026-08-21-dspl-sanity-insights-setup-design.md`

Plan: `docs/superpowers/plans/2026-08-21-dspl-sanity-insights-setup.md`

Current contract:
- Production and ordinary development use the fallback/generated publication
  pipeline with exactly the two approved compliance articles.
- Hosting must use `npm run build:fallback` while Sanity is dormant. The default
  `npm run build` intentionally remains the strict Sanity path and must not be
  selected by the host during this stage.
- Sanity schema, sync, bootstrap, and package integration remain in the
  repository for migration safety but are operationally dormant. Do not upload
  or configure article content in Sanity during this stage.
- `.sanity/` is ignored generated Studio runtime state. `.env.local` remains
  ignored and untracked.
- The homepage social-preview card is `public/og-home-2026.jpg`; its generator
  and byte-parity check are `npm run generate:og` and `npm run verify:og`.
- The local Vite previews are concurrent user-owned processes. Do not terminate
  or restart them unless the user asks.
- A future Strapi adapter must preserve the current CMS -> normalization/sync ->
  generated publication -> React boundary and should be developed separately.

## Pending Decision

- Deployment remains a separate action. Before deployment, configure the host
  branch as `release/v1.0-production`, build command as `npm run build:fallback`,
  output directory as `dist`, and Node.js as `>=22.22.0`.
- Branch deletion/remote cleanup remains pending explicit branch-by-branch
  confirmation. The Phase 3 branch is checked out in a host-owned worktree.

## Last Verification
Record only fresh evidence:

| Date | Scope | Command | Result | HEAD/status reference |
|---|---|---|---|---|
| 2026-08-21 IST | Pre-setup snapshot | `git status --short`; `git rev-parse HEAD`; SHA-256 of `src/generated/blogManifest.json` | Snapshot observed; tests not run during this setup pass | `8a6838e2a81dda1311e3c1b7c978df19745b68ac`; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9` |
| 2026-08-21 IST | Insights Editorial Signals | Focused Blogs test; focused ESLint; direct Vite build; `verify:html`; asset metadata/hash validation; `git diff --check`; browser QA at 1440x900 and 390x844 | 6/6 tests; lint clean; 15 pages prerendered; 14 routes plus 404 verified; six exact WebPs; zero public `.map`; no viewport overflow or console errors; fresh Sol/high review approved | HEAD unchanged; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`; work remains uncommitted |
| 2026-08-24 IST | Sanity-backed Insights setup | Exact six-file recovery gate; full lint; full tests; strict live build; `verify:html`; manifest/sitemap/security/scope audits; fresh Sol/high holistic review | 197 focused tests; lint clean; 42 files / 393 tests; exact two live posts with no fallback; deterministic generated digest; 14 routes plus 404; three Insights HTML files; zero public `.map`; review approved with no P0-P3 findings | `454f9206608027fce9f9f907921031d6e543f3b9`; 21 Sanity paths remained unstaged before this ledger update; no Sanity-task commit/push/deploy |
| 2026-08-25 IST | Phase 1-3 release merge and homepage social preview | Full tests; full lint; `build:fallback`; `verify:og`; `verify:html`; public-map audit; `git diff --check`; fresh Sol/high merge review | 43 files / 434 tests; lint clean; exact two fallback compliance articles; 15 prerendered pages; 14 routes plus 404 verified; six exact responsive WebPs; zero public `.map`; 1200x630 OG card parity verified; review approved with no P0-P3 findings | Merge `c9ecb4a05732e74f54319ff2f1cfc65879ead8b6` pushed to `origin/release/v1.0-production`; no deployment performed |

## Next Authorized Action

- Keep Sanity dormant and use the fallback build path. Wait for explicit
  authorization before deployment or branch/worktree deletion.

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
