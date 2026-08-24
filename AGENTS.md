# DSPL Website Agent Instructions

## Start Here
- Read `docs/agent/PROJECT_CONTEXT.md`.
- Read `PRODUCT.md` for product truth, `DESIGN.md` for visual rules, and `ROADMAP.md` for release state.
- For approved feature work, read the matching file in `docs/superpowers/specs/` and `docs/superpowers/plans/`.
- Current code, `git status`, and fresh verification outrank stale documentation.

## Orchestration
- For broad or uncertain repository orientation, dependency tracing, docs/web research, logs, or evidence compression, delegate to `evidence_mapper` (Terra/high) before planning when useful.
- Planning and architecture: delegate to `project_planner`.
- Implementation after plan approval: delegate only the bounded task to `bounded_implementer`.
- Review completed changes with a fresh `independent_reviewer`.
- The normal route is `evidence_mapper` (optional) -> `project_planner` -> `bounded_implementer` -> `independent_reviewer`.
- Use one writer at a time. The coordinator owns task boundaries, file assignments, approvals, and `PROJECT_CONTEXT.md` updates.
- Do not implement a plan until the user approves its material design and scope choices.
- Custom-agent TOML `sandbox_mode` values are defaults for the agent definition, not guarantees for the live turn. Before spawning any agent, the coordinator must set and verify the parent turn permission mode; a live permission override can supersede the TOML default.
- The requested `bounded_implementer` route is `gpt-5.6-luna` at `max` for clear, approved, bounded tasks. Apply a suitability gate first: complex, cross-cutting, security-sensitive, or high-risk work must be decomposed by Sol into safe bounded slices or stop for user-approved routing. Never silently substitute a model.

## Worktree Safety
- Before edits, inspect `git status --short`, `git diff --name-only`, and relevant diffs.
- Preserve all existing tracked and untracked work. Edit only the approved file allowlist.
- Never reset, stash, clean, discard, overwrite, or broadly reformat user work.
- Never access `D:` as source, destination, temporary storage, backup, or scan target.
- Do not commit, push, merge, deploy, or change branches without explicit authorization.
- Read-only, review, research, diagnosis, and planning requests do not authorize source edits.
- Do not edit generated content or run content-sync commands unless the active plan explicitly authorizes them.
- The Codex-native orchestration artifacts are tracked and portable in worktrees/clones containing their commits: `AGENTS.md`, `.codex/config.toml`, the four `.codex/agents/*.toml` files, `docs/agent/PROJECT_CONTEXT.md`, and `docs/superpowers/plans/2026-08-21-codex-project-orchestration.md`.

## Package and Validation
- Use npm through `npm.cmd` on Windows. Node.js must satisfy `>=22.22.0`.
- Focused test: `npm.cmd test -- path/to/test`
- Focused lint: `npm.cmd exec -- eslint path/to/file`
- Full gate when authorized: `npm.cmd run lint`, `npm.cmd test`, approved build command, `npm.cmd run verify:html`, and `git diff --check`.
- Follow the active plan when its safe build command differs from the general gate.
- `git diff --check` covers tracked orchestration artifacts, while any other untracked task artifacts need an explicit untracked-aware whitespace/format check.

## Commit Attribution
- No commit without explicit approval. Before an approved commit, inspect the complete worktree.
- Approved AI commits must include a truthful `Co-Authored-By` line for the actual agent model.
