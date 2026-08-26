# DSPL Website Project Context

Updated: 2026-08-27 IST
Repository: `E:\For website\dspl website`
Branch at snapshot: `review/content-seo-pdf-reconciliation`
HEAD at snapshot: `0daf0bed8268f8a481f40ea6fa022ca6c502b719`

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

### Approved focused content and UI correction pass

Status: implementation completed on 2026-08-27 and awaiting the final combined
Sol/high review. The current branch was selectively corrected; commit `b7d4e93`
was preserved because it contains unrelated accepted work.

Design and exact service copy sheet:
`docs/superpowers/specs/2026-08-26-dspl-focused-content-ui-corrections-design.md`

Implementation plan:
`docs/superpowers/plans/2026-08-26-dspl-focused-content-ui-corrections.md`

Approved corrections:

- exactly four capabilities per Branding, Marketing and E-commerce page in a
  balanced 2×2 editorial layout;
- prose-led Branding/E-commerce compliance bands, safe FAQs and route-owned
  `/start` footer actions;
- distinct Brands actions for Raw Radicles detail, portfolio partnership and
  starting a project;
- removal of gated Home process timings, aligned metadata dividers and a
  non-overlapping supporter rail throughout the 901–1039px band;
- exactly Pawan Shetty on both generated production articles; and
- deterministic desktop/mobile Insights TOC tracking after fast jumps.

For this approved programme, the user explicitly selected Gemini 3.7 Flash High
as the sole bounded writer and browser/visual QA agent, with Sol/high for planning
and review and Luna/max available only as a reported fallback. One writer was
used at a time. Per-task review was consolidated into one final combined Sol/high
review to reduce token use. Separate commits are authorised; push, merge,
deployment and production mutation are not.

Completed correction commits after the approved design/plan commit `335bf19`:
- `fb8d084` and `734d0aa`: Branding and safely scoped 2x2 service layout;
- `eb3a2b4`: Marketing content refinement;
- `ddd0c78`: E-commerce content refinement;
- `8347cda` and `79ef017`: Brands conversion hierarchy and regression update;
- `3f24bc3`: Home process alignment and supporter rail correction;
- `c2d00ad`: Pawan-only generated Insights authorship; and
- `0daf0be`: deterministic desktop/mobile Insights TOC tracking.

Current baseline: branch `review/content-seo-pdf-reconciliation`, HEAD
`0daf0bed8268f8a481f40ea6fa022ca6c502b719`, 46 test files / 523 tests passing.
Focused/full lint and HTML verification passed. Consolidated read-only Chromium
QA covered eight routes at 390, 430, 768, 900, 936, 1024, 1181 and 1440px with
no P0-P3 findings, horizontal overflow or console errors. Home process divider
spread measured 0px, and the 936px supporter rail retained 40px clearance.
The untracked `.github/instructions/` directory is user-owned and excluded from
all task diffs and commits.

### Approved sitewide copy, content, and Insights refinement

Status: The handwritten scan is the decision layer over the clean Copy Deck. The
approved working matrix contains 74 stable rows: 47 `APPROVED TO IMPLEMENT`, 6
`REJECTED`, 18 `NEEDS CONFIRMATION`, and 3 `ALREADY IMPLEMENTED`. Source
implementation and the subsequent focused correction pass are present on the
current review branch. Rejected and unresolved facts remain protected/deferred.

Decision matrix:
`docs/superpowers/specs/2026-08-25-dspl-sitewide-copy-decision-matrix.md`

Design:
`docs/superpowers/specs/2026-08-25-dspl-sitewide-insights-audit-design.md`

Plan:
`docs/superpowers/plans/2026-08-25-dspl-sitewide-insights-audit.md`

External read-only sources:
- `E:\For website\dspl research\updates proper\DSPL-Website-Copy-Deck.pdf`
- `E:\For website\dspl research\updates proper\Scanned Document 3.pdf`

Current scope:
- Home, About, Our Brands, Raw Radicles, Branding, Marketing, E-commerce,
  Contact, and Start a Project are separate bounded page groups.
- Contact options are approved exactly as Branding; Marketing and SEO;
  E-commerce and marketplaces; Packaging and FSSAI compliance; New consumer
  brand; Something else.
- Start changes are approved exactly for LinkedIn referral, the combined
  Packaging and FSSAI compliance service choice, and the budget bands Under ₹1
  lakh; ₹1–3 lakh; ₹3–10 lakh; Above ₹10 lakh; Not decided yet. The sentence
  `A polished brief is not required.` remains protected.
- The current two Insights compliance articles remain the publication set.
  Phase 4 is read-only reference/regulatory investigation only; exact proposed
  article corrections require separate approval.

Execution boundary:
- Phase 1 persists this matrix/spec/plan and ledger.
- Phase 2 read-only production diagnosis was completed on 2026-08-25 IST and is
  now a mandatory STOP awaiting user acknowledgement. After acknowledgement,
  Phases 3 and 5-13 may proceed as planned; Phase 4 remains read-only and
  conditional.
- Preserve rejected media/artwork, unresolved facts, generated publication,
  dormant Sanity, and all protected source paths. Use one writer per bounded task
  and request a fresh independent review after page groups A–I.
- User-authorised bounded commits are permitted on the current branch. Push,
  merge, deployment, branch change, production mutation, PDF mutation, unrelated
  generated rewrite, and scope expansion remain unauthorised.

Phase 2 production diagnosis (2026-08-25 IST, read-only):
- Local `npm.cmd run build:site` and `npm.cmd run verify:html` passed against the
  current source contract; the expected prerendered route set, `404` artifact,
  and current two-article publication contract were present locally.
- Public `/` and `/blogs` returned `200 text/html`. Both current article paths,
  `/blogs/fssai-labelling-requirements-checklist-2026` and
  `/blogs/legal-metrology-packaged-commodity-rules-india`, returned the homepage
  title/canonical/body instead of article identity. `/does-not-exist` also
  returned the homepage with `200`; slashless and trailing-slash variants
  followed the same fallback behavior.
- The public `/blogs` artifact exposed the stale older Insights identity,
  including `Coordinating Brand, Market, and Commerce as One System`, rather
  than the current source titles `FSSAI Labelling Requirements for Packaged Food`
  and `Legal Metrology Packaged Commodity Rules`.
- Read-only headers exposed `Server: nginx/1.30.2` and `Content-Type: text/html`
  but no observed CSP, HSTS, frame-protection, or other expected security
  headers. `/_headers` and `/_redirects` returned `200 application/octet-stream`
  as static downloads rather than response policy.
- EC2/Nginx is a strong infrastructure inference from the public header and file
  behavior; the exact provider account, deployed commit, build command, output
  directory, and Node version are not exposed publicly and remain an explicit
  confirmed/unknown boundary. Recommendation: keep source links and canonicals
  slashless, and have the deployment owner resolve slashless prerendered files
  before SPA fallback while adding real-404 and header policy. This is a
  recommendation only, not a source or production mutation by this pass.
- No repository, hosting/server, generated-content, or PDF mutation occurred.

Protected concurrent worktree changes observed during the diagnosis refresh:
- `src/pages/Brands.jsx`: user-owned wording change from `Kerala` to `Keralam`.
- `src/pages/RawRadicles.jsx`: user-owned `Keralam`/`Ernakulam` wording changes.
These diffs are outside this documentation task's allowlist, were not created by
the agent, and do not resolve or approve the matrix's unresolved location facts.
Preserve them exactly and do not claim their factual content as accepted.

Protected concurrent external commit observed after the prior snapshot:
- `4ac5f4281a0084029056911a861afe85da495583` — `content: set single author
  Pawan Shetty in seed data`, co-authored by Google Gemini.
- It modifies `src/cms/seedData.js`,
  `src/generated/blog/fssai-labelling-requirements-checklist-2026.json`,
  `src/generated/blog/legal-metrology-packaged-commodity-rules-india.json`,
  and `src/generated/blogManifest.json`.
- This commit was not created by this Codex run and is not authorised by the
  sitewide matrix. Preserve it as external work. After user acknowledgement,
  every future phase must refresh the generated publication hashes and baseline
  before implementation or verification; do not infer approval from this commit.

### Release-integrated Insights publication

Status: Insights publication Phases 1-3 and the homepage social-preview refresh
are merged into and pushed on `main`; fresh Sol/high review approved the staged
merge with no P0-P3 findings.

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
  branch as `main`, build command as `npm run build:fallback`,
  output directory as `dist`, and Node.js as `>=22.22.0`.
- `main` is the only local and remote branch. All merged branches were removed,
  and the user explicitly discarded the two remaining unmerged refs. The former
  Phase 3 host-owned worktree is preserved in detached state and owns no branch.
- Pre-cleanup refs are recoverable from
  `C:\Users\Pawan\.codex\backups\dspl-website-before-single-main-20260825-132821.bundle`
  (SHA-256 `2ABDF1BAE387E990E549CF7F1B6E6CA9F05D66EA341187A3E5D23DF08AC4D7A2`).

## Last Verification
Record only fresh evidence:

| Date | Scope | Command | Result | HEAD/status reference |
|---|---|---|---|---|
| 2026-08-21 IST | Pre-setup snapshot | `git status --short`; `git rev-parse HEAD`; SHA-256 of `src/generated/blogManifest.json` | Snapshot observed; tests not run during this setup pass | `8a6838e2a81dda1311e3c1b7c978df19745b68ac`; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9` |
| 2026-08-21 IST | Insights Editorial Signals | Focused Blogs test; focused ESLint; direct Vite build; `verify:html`; asset metadata/hash validation; `git diff --check`; browser QA at 1440x900 and 390x844 | 6/6 tests; lint clean; 15 pages prerendered; 14 routes plus 404 verified; six exact WebPs; zero public `.map`; no viewport overflow or console errors; fresh Sol/high review approved | HEAD unchanged; manifest `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`; work remains uncommitted |
| 2026-08-24 IST | Sanity-backed Insights setup | Exact six-file recovery gate; full lint; full tests; strict live build; `verify:html`; manifest/sitemap/security/scope audits; fresh Sol/high holistic review | 197 focused tests; lint clean; 42 files / 393 tests; exact two live posts with no fallback; deterministic generated digest; 14 routes plus 404; three Insights HTML files; zero public `.map`; review approved with no P0-P3 findings | `454f9206608027fce9f9f907921031d6e543f3b9`; 21 Sanity paths remained unstaged before this ledger update; no Sanity-task commit/push/deploy |
| 2026-08-25 IST | Phase 1-3 release merge and homepage social preview | Full tests; full lint; `build:fallback`; `verify:og`; `verify:html`; public-map audit; `git diff --check`; fresh Sol/high merge review | 43 files / 434 tests; lint clean; exact two fallback compliance articles; 15 prerendered pages; 14 routes plus 404 verified; six exact responsive WebPs; zero public `.map`; 1200x630 OG card parity verified; review approved with no P0-P3 findings | Merge `c9ecb4a05732e74f54319ff2f1cfc65879ead8b6` promoted to `origin/main`; final pre-cleanup context commit `d50b3477913bd6f60b3ce62404146b98f379078d`; one local/remote branch remains; no deployment performed |
| 2026-08-25 IST | Phase 2 production diagnosis | Read-only GET/HEAD checks against `/`, `/blogs`, both current article paths, `/does-not-exist`, slashless/trailing-slash variants, `/_headers`, and `/_redirects`; local `build:site` and `verify:html` evidence | Production served a stale old Insights artifact; article and unknown paths served homepage HTML with `200`; no observed security headers; `_headers`/`_redirects` were static downloads; `Server: nginx/1.30.2`; source/deployment divergence recorded; no mutation | Deployment owner/provider, deployed commit, build/output, and Node version not exposed publicly; EC2/Nginx remains a strong inference/confirmed boundary; mandatory STOP for user acknowledgement |
| 2026-08-27 IST | Focused content/UI correction pass | Full lint; full tests; `build:fallback`; `verify:html`; consolidated Chromium QA across eight routes and eight viewport widths; `git diff --check` | 46 files / 523 tests; lint clean; 15 prerendered pages; 14 routes plus 404 verified; OG card verified; zero visual P0-P3 findings, overflow, or console errors; diff-check clean | `0daf0bed8268f8a481f40ea6fa022ca6c502b719`; only the protected untracked `.github/instructions/` directory remains outside task scope; final combined Sol/high review pending |
| 2026-08-27 IST | Dependency advisory check | `npm audit --audit-level=high`; dependency tree inspection; npm registry version check | One high and six moderate advisories remain under dormant Sanity CLI tooling through `@vercel/frameworks`/`typeid-js`; npm's automatic remedy is a breaking forced change, so no dependency mutation was made in this content/UI pass | Installed `sanity@6.10.1`; registry `sanity@6.11.0`; treat a Sanity/toolchain upgrade as a separately approved maintenance task, not a silent correction-pass change |

## Next Authorized Action

- Complete one combined Sol/high review of `b7d4e93..HEAD`, including the final
  verification evidence and the explicitly deferred Sanity CLI advisory.
- If that review finds no correction-pass P0-P2 defects, the focused programme
  is complete on the current branch. Do not push, merge or deploy without a new
  explicit instruction.
- Keep Sanity dormant and use the fallback build path. Dependency maintenance
  and deployment/server correction remain separate explicitly approved actions;
  no host mutation is authorised by this ledger.

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
