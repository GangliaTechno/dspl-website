# Codex-Native Project Orchestration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Record and validate the complete project-scoped Codex orchestration setup without changing the DSPL application or any existing dirty work.

**Architecture:** Repository instructions live in `AGENTS.md`; `.codex/config.toml` enables project-scoped custom agents; four agent TOMLs define the evidence, planning, implementation, and review roles with their required model, reasoning, and sandbox settings. `docs/agent/PROJECT_CONTEXT.md` is the coordinator handoff ledger for stable decisions, protected work, hashes, and the one-writer workflow.

**Tech Stack:** Codex CLI v0.149.0, TOML project configuration, Markdown handoff documents, PowerShell, Git, and Node.js `>=22.22.0` for the DSPL application validation commands.

## Global Constraints

- The seven setup files are already present and are documented here as a completed installation: `AGENTS.md`, `.codex/config.toml`, `.codex/agents/evidence-mapper.toml`, `.codex/agents/project-planner.toml`, `.codex/agents/bounded-implementer.toml`, `.codex/agents/independent-reviewer.toml`, and `docs/agent/PROJECT_CONTEXT.md`.
- The exact edit allowlist for this review pass is `AGENTS.md`, `docs/agent/PROJECT_CONTEXT.md`, and `docs/superpowers/plans/2026-08-21-codex-project-orchestration.md`; no other path may be edited.
- All eight Codex-native orchestration artifacts are currently untracked and therefore current-working-tree-only: `AGENTS.md`, `.codex/config.toml`, the four `.codex/agents/*.toml` files, `docs/agent/PROJECT_CONTEXT.md`, and this plan. They are not yet durable or portable across new worktrees or clones; an explicitly authorized commit is required before portability can be claimed.
- Preserve the existing header-navigation work and every other pre-existing tracked or untracked change. Do not reset, stash, clean, overwrite, reformat, commit, push, merge, deploy, or change branches.
- The protected header paths are `DESIGN.md`, `src/__tests__/designSystemRegression.test.js`, `src/components/Header.css`, `src/components/Header.jsx`, `src/components/__tests__/Header.test.jsx`, `src/content/headerNavigation.js`, `src/content/__tests__/headerNavigation.test.js`, and `docs/superpowers/plans/2026-08-21-dspl-header-navigation.md`.
- The generated file `src/generated/blogManifest.json` is protected user-owned work and must retain this exact pre-hash: `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`.
- Do not run `npm.cmd run build`, `build:fallback`, `content:sync`, or `sync:fallback` during this orchestration work because those commands can rewrite generated publication state. No app/source test or build is authorized by this plan.
- Never access `D:`. Use one writer at a time; project agents remain bounded by their explicit role and file allowlist.
- Custom-agent TOML `sandbox_mode` values are defaults, not guarantees for the live turn. Before spawning any agent, the coordinator must set and verify the parent turn permission mode because a live permission override can supersede the TOML default.
- Preserve the requested `bounded_implementer` route as `gpt-5.6-luna` at `max` for clear, approved, bounded tasks. Complex, cross-cutting, security-sensitive, or high-risk work must be decomposed by Sol into safe bounded slices or stop for user-approved routing; never silently substitute a model.
- A strict Codex doctor must show the project configuration loaded. Doctor warnings about the host, terminal, or pre-existing thread state are recorded separately from configuration syntax.

## Completed setup manifest

| File | Completed responsibility | Required values |
| --- | --- | --- |
| `AGENTS.md` | Project contract, safe-worktree rules, orchestration route, package validation, and commit attribution rules | Reads `PROJECT_CONTEXT.md`; protects dirty work; forbids unauthorized commits, pushes, merges, deploys, branch changes, and `D:` access |
| `.codex/config.toml` | Enables project-scoped custom agents and bounds session concurrency | `enabled = true`; `max_concurrent_threads_per_session = 3`; `interrupt_message = true` |
| `.codex/agents/evidence-mapper.toml` | Read-only evidence and orientation worker | `name = "evidence_mapper"`; `model = "gpt-5.6-terra"`; `model_reasoning_effort = "high"`; `sandbox_mode = "read-only"` |
| `.codex/agents/project-planner.toml` | Read-only architecture and plan-synthesis worker | `name = "project_planner"`; `model = "gpt-5.6-sol"`; `model_reasoning_effort = "high"`; `sandbox_mode = "read-only"` |
| `.codex/agents/bounded-implementer.toml` | Single-task implementation worker after explicit approval | `name = "bounded_implementer"`; `model = "gpt-5.6-luna"`; `model_reasoning_effort = "max"`; `sandbox_mode = "workspace-write"` |
| `.codex/agents/independent-reviewer.toml` | Fresh read-only review worker for correctness and scope | `name = "independent_reviewer"`; `model = "gpt-5.6-sol"`; `model_reasoning_effort = "high"`; `sandbox_mode = "read-only"` |
| `docs/agent/PROJECT_CONTEXT.md` | Current-state ledger, protected header ownership, manifest hash, and orchestration handoff sequence | Records the `release/v1.0-production` snapshot, one-writer rule, optional Terra evidence, Sol planning/review, Luna implementation, and stop-before-commit/push/deploy boundary |

---

### Task 1: Record the completed seven-file orchestration setup

**Files:**
- Modify: `AGENTS.md`
- Read: `.codex/config.toml`
- Read: `.codex/agents/evidence-mapper.toml`
- Read: `.codex/agents/project-planner.toml`
- Read: `.codex/agents/bounded-implementer.toml`
- Read: `.codex/agents/independent-reviewer.toml`
- Modify: `docs/agent/PROJECT_CONTEXT.md`
- Modify: `docs/superpowers/plans/2026-08-21-codex-project-orchestration.md`

**Interfaces:**
- Consumes: the seven existing setup files and the protected-work ledger in `docs/agent/PROJECT_CONTEXT.md`.
- Produces: this completed installation record, including exact paths, role/model mapping, protected paths, and validation requirements.

- [x] **Step 1: Confirm the seven setup files and preserve their existing contracts**

  Verify the exact paths listed in the completed setup manifest. Preserve all existing application changes and all setup content except the explicitly requested permission, suitability, portability, and validation clarifications in the three-file allowlist.

- [x] **Step 2: Record the role and model contracts**

  Preserve these exact mappings in the manifest: evidence mapper → Terra/high/read-only; project planner → Sol/high/read-only; bounded implementer → Luna/max/workspace-write; independent reviewer → Sol/high/read-only. Treat each TOML `sandbox_mode` as a default, set and verify the parent turn permission mode before spawning, and account for live overrides that can supersede the default. Keep Luna/max for clear bounded tasks; have Sol decompose complex, cross-cutting, security-sensitive, or high-risk work into safe slices or stop for user-approved routing, with no silent model substitution.

- [x] **Step 3: Record the protected header work and generated-file hash**

  Preserve the header-navigation paths listed in Global Constraints and record the exact pre-hash `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9` for `src/generated/blogManifest.json`.

- [x] **Step 4: Confirm the plan has the required writing-plans header and checkbox tracking**

  Keep this file's first section in the required `Goal`, `Architecture`, `Tech Stack`, and `Global Constraints` format, and keep execution steps in checkbox form so a later approved worker can audit the handoff.

### Task 2: Run strict validation and preserve the worktree

**Files:**
- Read-only validation: all seven setup files, protected header paths, and `src/generated/blogManifest.json`
- No source or configuration edits authorized

**Interfaces:**
- Consumes: Task 1's manifest and the current worktree.
- Produces: fresh validation evidence showing configuration loading, clean patch formatting, unchanged protected work, and the expected manifest hash.

- [x] **Step 1: Run the strict Codex configuration doctor**

  Run:

  ```powershell
  & 'C:\Users\Pawan\AppData\Roaming\npm\codex.cmd' --strict-config doctor --summary --no-color --ascii
  ```

  Acceptance evidence: the `Configuration` section reports `[ok] config loaded`. If the command exits nonzero for unrelated host diagnostics, record those diagnostics separately; do not edit a valid orchestration TOML to silence them.

- [x] **Step 2: Run an untracked-aware format check over all eight orchestration artifacts**

  Run this PowerShell check so untracked files are covered instead of relying on `git diff --check`:

  ```powershell
  $orchestrationArtifacts = @(
    'AGENTS.md'
    '.codex/config.toml'
    '.codex/agents/evidence-mapper.toml'
    '.codex/agents/project-planner.toml'
    '.codex/agents/bounded-implementer.toml'
    '.codex/agents/independent-reviewer.toml'
    'docs/agent/PROJECT_CONTEXT.md'
    'docs/superpowers/plans/2026-08-21-codex-project-orchestration.md'
  )
  $formatIssues = @(
    foreach ($path in $orchestrationArtifacts) {
      $lineNumber = 0
      foreach ($line in [System.IO.File]::ReadLines((Resolve-Path -LiteralPath $path).Path)) {
        $lineNumber++
        if ($line -match '[\t ]+$') {
          [pscustomobject]@{ Path = $path; Line = $lineNumber }
        }
      }
    }
  )
  if ($formatIssues.Count -gt 0) {
    $formatIssues | Format-Table -AutoSize
    exit 1
  }
  "Checked $($orchestrationArtifacts.Count) orchestration artifacts: no trailing whitespace."
  ```

  Expected result: `Checked 8 orchestration artifacts: no trailing whitespace.`

- [x] **Step 3: Retain the tracked-diff check**

  Run:

  ```powershell
  git diff --check
  ```

  Expected result: exit code `0` for tracked changes. This check is retained for tracked content but is not the evidence for the untracked orchestration artifacts.

- [x] **Step 4: Reconfirm the protected manifest hash**

  Run:

  ```powershell
  ((Get-FileHash -Algorithm SHA256 -LiteralPath 'src/generated/blogManifest.json').Hash).ToUpperInvariant()
  ```

  Expected output:

  ```text
  065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9
  ```

- [x] **Step 5: Confirm status and hand off without repository mutation**

  Run:

  ```powershell
  git status --short
  ```

  Report the doctor result, untracked-aware format check, tracked `git diff --check`, status, and hash only. State that the eight orchestration artifacts remain current-working-tree-only until an explicitly authorized commit. Stop before commit, push, merge, deploy, branch changes, or any modification outside the three-file allowlist or protected header work.

## Acceptance Criteria

- All seven setup files exist at the exact paths in the completed setup manifest.
- `AGENTS.md` and `docs/agent/PROJECT_CONTEXT.md` preserve the project safety and one-writer orchestration contracts.
- `.codex/config.toml` loads under strict Codex validation, and all four agent TOMLs retain the exact Terra/Sol/Luna model and reasoning assignments shown above.
- The coordinator treats each custom-agent `sandbox_mode` as a default, sets and verifies the parent turn permission mode before spawning, and accounts for live overrides.
- Luna/max is used for clear, approved, bounded implementation tasks. Sol decomposes complex, cross-cutting, security-sensitive, or high-risk work into safe bounded slices or stops for user-approved routing; no model is silently substituted.
- All eight orchestration artifacts are explicitly described as untracked and current-working-tree-only until an authorized commit; no cross-worktree or clone durability is claimed.
- The protected header work remains untouched by this task, including `src/generated/blogManifest.json` at SHA-256 `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`.
- The untracked-aware trailing-whitespace/format check passes over all eight orchestration artifacts, and `git diff --check` passes for tracked changes.
- No app/source file, generated file, branch, remote, deployment, commit, or repository history is changed.
- The final handoff is concise and names any non-configuration doctor diagnostics rather than calling them setup failures.

## Validation record

| Check | Command | Passing evidence |
| --- | --- | --- |
| Strict Codex config | `codex --strict-config doctor --summary --no-color --ascii` | `Configuration` reports `[ok] config loaded`; unrelated doctor diagnostics remain noted in the handoff |
| Untracked orchestration format | PowerShell eight-file check in Task 2, Step 2 | `Checked 8 orchestration artifacts: no trailing whitespace.` |
| Tracked patch formatting | `git diff --check` | Exit code `0` |
| Worktree preservation | `git status --short` | Existing dirty files remain present; no unexpected app/source changes |
| Protected generated state | `Get-FileHash -Algorithm SHA256 -LiteralPath 'src/generated/blogManifest.json'` | Exact pre-hash `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9` |

## Recovery and execution boundary

This plan is a documentation and validation handoff for setup that is already complete. The eight orchestration artifacts remain current-working-tree-only until an explicitly authorized commit; do not describe them as durable across worktrees or clones before then. If the record needs correction, edit only the three-file allowlist above; leave the four agent TOMLs and protected header work unchanged. Any future implementation must obtain explicit scope approval, pass the Luna/max suitability gate, use the bounded agent workflow described in `AGENTS.md`, and stop before commit, push, merge, or deployment.
