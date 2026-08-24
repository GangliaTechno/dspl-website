# DSPL Website Project Context

Updated: 2026-08-24 IST
Repository: `E:\For website\dspl website`
Branch at snapshot: `release/v1.0-production`
HEAD at snapshot: `454f9206608027fce9f9f907921031d6e543f3b9`

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

### Sanity-backed Insights publication

Status: implemented and release-gated as uncommitted local work; fresh Sol/high
holistic review approved with no P0-P3 findings.

Design: `docs/superpowers/specs/2026-08-21-dspl-sanity-insights-setup-design.md`

Plan: `docs/superpowers/plans/2026-08-21-dspl-sanity-insights-setup.md`

Current contract:
- Sanity project and dataset selection are explicit; strict live sync requires
  the authoritative build trio and the `production` dataset before any fetch or
  filesystem write.
- Bootstrap defaults to dry-run, creates only missing approved documents, and
  performs no transaction when both documents already exist.
- Publication output is deterministic, path-contained, stale-file reconciled,
  and limited to the two approved published article snapshots plus the manifest.
- `.env.local` is ignored and untracked. It contains the five expected local
  configuration keys and no API token.
- The local Vite previews are concurrent user-owned processes. Do not terminate
  or restart them unless the user asks.
- The 21 Sanity implementation/config/generated/docs paths recorded in the final
  report remain unstaged and uncommitted. Preserve them as one task boundary.

## Pending Decision

- The Sanity-backed Insights setup is ready for commit/push/deployment only
  after explicit user authorization for those release actions.

## Last Verification
Record only fresh evidence:

| Date | Scope | Command | Result | HEAD/status reference |
|---|---|---|---|---|
| 2026-08-21 IST | Pre-setup snapshot | `git status --short`; `git rev-parse HEAD`; SHA-256 of `src/generated/blogManifest.json` | Snapshot observed; tests not run during this setup pass | `8a6838e2a81dda1311e3c1b7c978df19745b68ac`; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9` |
| 2026-08-21 IST | Insights Editorial Signals | Focused Blogs test; focused ESLint; direct Vite build; `verify:html`; asset metadata/hash validation; `git diff --check`; browser QA at 1440x900 and 390x844 | 6/6 tests; lint clean; 15 pages prerendered; 14 routes plus 404 verified; six exact WebPs; zero public `.map`; no viewport overflow or console errors; fresh Sol/high review approved | HEAD unchanged; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`; work remains uncommitted |
| 2026-08-24 IST | Sanity-backed Insights setup | Exact six-file recovery gate; full lint; full tests; strict live build; `verify:html`; manifest/sitemap/security/scope audits; fresh Sol/high holistic review | 197 focused tests; lint clean; 42 files / 393 tests; exact two live posts with no fallback; deterministic generated digest; 14 routes plus 404; three Insights HTML files; zero public `.map`; review approved with no P0-P3 findings | `454f9206608027fce9f9f907921031d6e543f3b9`; 21 Sanity paths remained unstaged before this ledger update; no Sanity-task commit/push/deploy |

## Next Authorized Action

- Hand back the approved local Sanity setup and wait for explicit authorization
  before any commit, push, merge, deployment, or branch change.

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
