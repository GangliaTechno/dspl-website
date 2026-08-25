# DSPL Sitewide Copy, Content, and Insights Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 47 approved deterministic copy, content, form, and UX refinements from the handwritten review while preserving rejected proposals, unresolved facts, current Insights publication, and the dormant Sanity/fallback contract.

**Architecture:** Keep existing route-owned React pages and page-owned data as the content boundary. Execute one bounded phase and one writer at a time; use existing components and tests, changing shared architecture only after a demonstrated interface blocker. Treat the handwritten decision matrix as the exact allowlist of approved slots, and stop at Phase 2 for user acknowledgement before source implementation.

**Tech Stack:** React, React Router, Vite prerendering, Vitest, React Testing Library, ESLint, PowerShell, Node.js `>=22.22.0`, `npm.cmd`, existing fallback publication scripts, and read-only browser/Impeccable QA.

**Spec:** `docs/superpowers/specs/2026-08-25-dspl-sitewide-insights-audit-design.md`; row-level scope: `docs/superpowers/specs/2026-08-25-dspl-sitewide-copy-decision-matrix.md`.

## Global Constraints

- Follow `AGENTS.md`, `docs/agent/PROJECT_CONTEXT.md`, `PRODUCT.md`, and `DESIGN.md`; fresh code, Git status, and fresh verification outrank stale notes.
- Use `npm.cmd` on Windows and require Node.js `>=22.22.0`.
- The external sources are read-only: `E:\For website\dspl research\updates proper\DSPL-Website-Copy-Deck.pdf` and `E:\For website\dspl research\updates proper\Scanned Document 3.pdf`. Never move, copy, rename, modify, commit, or generate repository copies of them.
- The handwritten decision matrix is the scope boundary. Implement only `APPROVED TO IMPLEMENT` rows; preserve `REJECTED` rows; do not touch `NEEDS CONFIRMATION` rows until exact separate approval; retain `ALREADY IMPLEMENTED` rows.
- Preserve all existing media, hero/product/portrait/logo artwork, article artwork, current article slugs/publication set, `src/generated/`, `public/insights/`, dormant Sanity, and the fallback build contract.
- Do not edit generated content, run `content:sync`, run `sync:fallback`, or rewrite generated JSON during source phases.
- Do not modify `src/components/ServicePage.jsx` in Phase 9 unless the existing interface makes an approved slot impossible. Stop and report the exact blocker before expanding scope.
- Use RED then GREEN for behavior changes. Copy-only work may update existing meaningful content assertions; do not add sentence-by-sentence tests.
- After each page group A–I, inspect the actual diff, run focused tests and lint, request a fresh `independent_reviewer`, and correct accepted findings before the next group.
- No commit, push, merge, deploy, branch change, reset, stash, clean, broad formatter, dependency update, or production/server mutation is authorised.

## Status and approval boundary

The matrix contains 74 rows: 47 `APPROVED TO IMPLEMENT`, 6 `REJECTED`, 18
`NEEDS CONFIRMATION`, and 3 `ALREADY IMPLEMENTED`.

Implementation approval begins only after the Phase 2 read-only diagnosis is
reported and acknowledged by the user. After that acknowledgement, Phases 3
and 5–13 are approved as written. Phase 4 is conditionally approved for
read-only evidence collection only and must show exact proposed reference or
regulatory corrections for separate approval; it must not edit article content.

Explicitly deferred throughout this plan:

- unresolved About timeline facts, doctorate/doctor identities, titles, and bios;
- Raw Radicles developed/launched status, MRP, partner names, and unclear
  Kerala/Ernakulam or formulation locations;
- service prices, project durations, SEO timing, and commercial performance
  promises;
- unsupported factual, legal, regulatory, product, partner, or performance
  claims;
- global title-tag, footer, schema, British-English, and
  coordinate/coordinated rewrites; and
- all image or artwork changes.

## Phase sequence

| Phase | Purpose | Authority / stop boundary |
| --- | --- | --- |
| 1 | Persist matrix, spec, plan, and ledger | Documentation-only; complete after exact checks |
| 2 | Read-only production diagnosis | Mandatory STOP for user acknowledgement |
| 3 | Opt-in deployment smoke verifier | Approved after Phase 2; no deployment mutation |
| 4 | Compliance/reference investigation | Read-only only; exact corrections require separate approval |
| 5 | Mobile/tablet Insights TOC parity | Approved source behavior task |
| 6 | Homepage deterministic approved changes | Page group A |
| 7 | About deterministic approved changes | Page group B |
| 8 | Brands and Raw Radicles | Separate page groups C and D |
| 9 | Service pages | Separate bounded tasks 9A Branding, 9B Marketing, 9C E-commerce |
| 10 | Contact and Start | Separate page groups H and I as 10A and 10B |
| 11 | README correction | Documentation-only source task |
| 12 | Browser/Impeccable QA | Verification-only; findings require bounded follow-up |
| 13 | Final full verification and review | Full gate; no commit/deploy |

## Phase 1: Persist the decision matrix, specification, plan, and ledger

**Status:** The bounded documentation task persists these artifacts; source
implementation remains not started.

**Exact allowlist:**

- Create `docs/superpowers/specs/2026-08-25-dspl-sitewide-copy-decision-matrix.md`.
- Create `docs/superpowers/specs/2026-08-25-dspl-sitewide-insights-audit-design.md`.
- Create `docs/superpowers/plans/2026-08-25-dspl-sitewide-insights-audit.md`.
- Modify `docs/agent/PROJECT_CONTEXT.md`.

**Protected:** every other tracked and untracked path, both external PDFs, all
source/media/generated files, and all existing orchestration artifacts.

- [x] Record all 74 stable matrix rows with route/slot, current owner/location,
  Copy Deck page/proposal, scan page/decision, interpretation/status, factual
  gate, test owner, and protected media.
- [x] Record an exact-copy annex keyed to all 74 stable IDs, with the current
  source copy/behavior and exact clean-deck proposal; label every unresolved
  `[X]`/`[Y]`/`[Z]`/`[A]` placeholder as gated rather than silently resolving it.
- [x] Record the exact Contact options and Start form changes/budget bands.
- [x] Record the Phase 1–13 sequence, Phase 2 mandatory stop, Phase 4
  read-only-only condition, page groups A–I, allowlists, protected contracts,
  tests, review cadence, and no-commit boundary.
- [x] Update the ledger with the approved plan paths, external PDF paths,
  current scope, protected contracts, and next action.

**Checks:**

```powershell
git status --short
git diff --name-only
git diff --check
$matrix = Get-Content -Raw -LiteralPath 'docs/superpowers/specs/2026-08-25-dspl-sitewide-copy-decision-matrix.md'
([regex]::Matches($matrix, '^\| [A-Z-]+-[0-9]+ \|', [System.Text.RegularExpressions.RegexOptions]::Multiline)).Count
([regex]::Matches($matrix, '\*\*APPROVED TO IMPLEMENT\*\*')).Count
([regex]::Matches($matrix, '\*\*REJECTED\*\*')).Count
([regex]::Matches($matrix, '\*\*NEEDS CONFIRMATION\*\*')).Count
([regex]::Matches($matrix, '\*\*ALREADY IMPLEMENTED\*\*')).Count
```

Expected counts are `74`, `47`, `6`, `18`, and `3`. Run an untracked-aware
trailing-whitespace check over the four allowlisted files. If any path outside
the allowlist changes, stop and report protected work.

**Acceptance:** all four allowlisted artifacts exist, the matrix counts are exact,
phase references consistently start at 1, no unlabelled placeholder markers
remain (clean-deck commercial placeholders are explicitly gated), and no
source/generated/media/PDF file changes.

**Rollback:** use `apply_patch` against only the four allowlisted artifacts to
correct documentation. Do not use reset, checkout, stash, clean, or broad file
replacement.

## Phase 2: Read-only production diagnosis — mandatory stop

**Allowlist:** no tracked-file edits. A local ignored report or temporary browser
state may be used only if it is outside the repository and contains no source or
PDF copy. Do not create a tracked report.

**Protected:** all repository paths, both PDFs, deployment configuration, remote
hosting state, and the current two-article publication set.

Perform only read-only inspection:

- Refresh `git status --short`, `git diff --name-only`, `git rev-parse HEAD`, and
  the protected generated/media hashes before any browser work.
- Identify the public host/provider from existing repository/deployment context;
  if provider login, SSO, or a mutation-capable action is required, stop and ask.
- Determine the deployed commit, branch, build command, output directory, Node
  version, and whether the deployed artifact came from `build:fallback`.
- Inspect the deployed `/`, `/blogs`, both current article routes,
  `/does-not-exist`, and trailing/slashless variants with read-only GET/HEAD.
- Record article identity markers, canonical URL behavior, response status, body
  identity, file-first versus SPA fallback behavior, and whether `_redirects` or
  `_headers` are honored.
- Record CSP, HSTS, frame-protection, content-type, cache, and other relevant
  headers without changing provider settings.
- Compare deployed results with the current source/prerender contract without
  changing `src/generated/`, `public/insights/`, or hosting configuration.

Use read-only requests such as:

```powershell
$origin = 'https://dashapatmaja.in'
$paths = @('/', '/blogs', '/blogs/fssai-labelling-requirements-checklist-2026', '/blogs/legal-metrology-packaged-commodity-rules-india', '/does-not-exist')
foreach ($path in $paths) {
  $response = Invoke-WebRequest -Uri ($origin + $path) -Method Get -MaximumRedirection 5 -UseBasicParsing
  [pscustomobject]@{ Path = $path; Status = $response.StatusCode; ContentType = $response.Headers['Content-Type']; Canonical = ([regex]::Match($response.Content, '<link[^>]+rel=["'']canonical["''][^>]+>').Value) }
}
```

The command is diagnostic only. Do not submit forms, log in, change settings,
or deploy. If the host returns a 403/5xx or requires credentials, report the
exact blocker and stop rather than substituting assumptions.

**Required handoff:** report deployed commit/build/output, article identity,
unknown-route status, redirect/canonical policy, security headers, source-versus-
deployment divergence, and the next recommended bounded action. Then STOP and
wait for user acknowledgement. No Phase 3 or Phase 5 source work begins before
that acknowledgement.

**Completion record — 2026-08-25 IST:** The read-only diagnosis is complete.
The local `npm.cmd run build:site` and `npm.cmd run verify:html` gates passed,
with the current source contract producing the expected prerendered route set,
the two current compliance article routes, and the `404` artifact. The public
host returned `200 text/html` for `/` and `/blogs`, but the two current article
paths returned the homepage HTML/title/canonical rather than their article
identity. `/does-not-exist` also returned the homepage with `200`, and slashless
and trailing-slash article variants followed the same fallback behavior. The
public `/blogs` artifact exposed the stale pre-current Insights identity (for
example `Coordinating Brand, Market, and Commerce as One System`) rather than
the current source publication titles `FSSAI Labelling Requirements for Packaged
Food` and `Legal Metrology Packaged Commodity Rules`.

Read-only response headers showed `Server: nginx/1.30.2`, `Content-Type:
text/html`, and no observed CSP, HSTS, frame-protection, or other expected
security headers. Public `/_headers` and `/_redirects` returned `200
application/octet-stream` as downloadable static files, so the deployed server
did not apply those repository files as response policy. EC2/Nginx hosting is a
strong infrastructure inference from the header and file behavior; the exact
provider account, deployed commit, build command, output directory, and Node
version are not exposed by the public responses and remain unconfirmed. No
hosting, server, repository, generated-content, or PDF mutation was performed.

**Stop state:** Phase 2 is complete, and the next authorized action is a
mandatory STOP awaiting explicit user acknowledgement. Until that acknowledgement,
do not begin Phase 3, Phase 5, or any source implementation. The recommended
follow-up is a bounded, opt-in deployment smoke verifier plus a host-side
slashless-route/real-404/header correction plan after the user chooses the
deployment owner and policy. Keep source links and canonicals slashless and
resolve those prerendered files before SPA fallback; this is a recommendation,
not an authorisation to mutate source or hosting in Phase 2.

**Acceptance:** a fresh, evidence-backed diagnosis exists in the coordinator
handoff, with no repository or production mutation.

**Rollback:** none; this phase is read-only. Remove only an explicitly created
local temporary diagnostic file if the exact path is known and it is outside the
repository and not one of the source PDFs.

## Phase 3: Opt-in deployment smoke verifier

**Allowlist:**

- Create `scripts/verify-deployment.mjs`.
- Create `scripts/__tests__/verify-deployment.test.js`.
- Modify `package.json` only to add the explicit verifier script if required.

**Protected:** deployment settings, generated publication, `src/cms/seedData.js`,
all page/media files, both PDFs, and `src/components/ServicePage.jsx`.

The verifier must be opt-in and URL-driven; ordinary `npm.cmd test` must not
depend on production availability. It must check:

- `/blogs` contains the Insights identity;
- each current article URL contains its own title/JSON-LD identity rather than
  homepage fallback;
- an unknown route returns a real Not Found response/body rather than homepage
  HTML with HTTP 200;
- redirects and canonical URLs follow the policy recorded in Phase 2; and
- CSP, HSTS, and frame-protection headers meet the diagnosed provider contract.

**RED/GREEN:** add tests for identity matching, homepage-fallback rejection,
404 rejection, canonical/redirect matching, and required headers. Run:

```powershell
npm.cmd test -- scripts/__tests__/verify-deployment.test.js
```

Expected RED is failure for the missing verifier behavior. Implement the
smallest URL-injectable verifier, rerun the same focused test to GREEN, then
run:

```powershell
npm.cmd exec -- eslint scripts/verify-deployment.mjs scripts/__tests__/verify-deployment.test.js
npm.cmd test -- scripts/__tests__/verify-deployment.test.js
```

The live command must be explicitly invoked with the approved origin after the
Phase 2 diagnosis; it must not mutate the host.

**Acceptance:** verifier tests pass, the normal test command remains offline,
the script produces actionable failures, and only the allowlist changes.

**Rollback:** remove the verifier entry and revert only the three allowlisted
files with `apply_patch`; do not alter deployment or generated content.

## Phase 4: Compliance/reference investigation — read-only only

**Allowlist:** no source edits. Read `src/cms/seedData.js`, both generated
article snapshots, the current publication manifest, official reference pages,
and the two external PDFs. Do not edit or regenerate any file.

**Protected:** `src/cms/seedData.js`, `src/generated/blogManifest.json`,
`src/generated/blog/*.json`, `public/insights/*`, article slugs/dates, Sanity,
and all external sources.

For each suspected issue, show:

- current website value and exact source location;
- clean-deck proposal/page, if applicable;
- scan decision/page or explicit absence of a resolving annotation;
- candidate official source and retrieval date;
- exact proposed replacement URL or regulatory sentence; and
- the decision required from the user/legal/editorial approver.

At minimum inspect the known Legal Metrology reference problem, the incomplete
clickable-reference coverage, and time-sensitive 2026–2027 claims. Do not change
the dead URL, reference text, article body, publication date, slug, or generated
JSON. The obsolete clean-deck article concepts remain rejected.

**Acceptance:** the coordinator receives a precise read-only evidence table and
no tracked/untracked repository mutation. Stop for separate approval before any
article correction.

**Rollback:** none; this phase is read-only.

## Phase 5: Mobile/tablet Insights TOC parity

**Allowlist:**

- Modify `src/pages/BlogPost.jsx`.
- Modify `src/pages/__tests__/BlogPost.test.jsx`.

**Protected:** `src/cms/seedData.js`, generated article files, article artwork,
`src/pages/BlogPost.css` unless a test-proven style correction is separately
approved, article slugs, and Sanity.

Use the existing `activeHeadingId` observer state. Do not change article data,
observer thresholds, native `<details>`, desktop structure, or publication
content. The mobile/tablet TOC must expose the same active class and
`aria-current="location"` behavior as desktop.

**RED/GREEN:** add a focused test that renders a post with at least two headings,
sets the active heading through the existing observer test seam, and asserts:

```js
expect(mobileTocLink).toHaveClass('is-active');
expect(mobileTocLink).toHaveAttribute('aria-current', 'location');
expect(otherTocLink).not.toHaveAttribute('aria-current');
```

Run the focused test to RED, make the smallest shared-state/template change,
then run:

```powershell
npm.cmd test -- src/pages/__tests__/BlogPost.test.jsx
npm.cmd exec -- eslint src/pages/BlogPost.jsx src/pages/__tests__/BlogPost.test.jsx
```

**Acceptance:** desktop and mobile/tablet TOCs share active state, keyboard and
details behavior remain unchanged, focused test/lint pass, and only the two
allowlisted files change.

**Rollback:** revert only the TOC template/state patch and its focused test with
`apply_patch`; preserve all article/generated files.

## Phase 6: Homepage deterministic approved changes — page group A

**Allowlist:**

- Modify `src/pages/Home.jsx`.
- Modify `src/components/home/ProcessSteps.jsx` only for approved process-slot
  rendering changes; keep its interface stable.
- Modify `src/components/home/OwnedBrandProof.jsx` only for the approved Raw
  Radicles block.
- Modify `src/seo/routeMetadata.js` only for the `/` metadata entry.
- Modify `src/content/footerCtas.js` only for the `/` CTA entry.
- Modify `src/pages/__tests__/Home.test.jsx`,
  `src/seo/__tests__/routeMetadata.test.js`, and
  `src/components/__tests__/Footer.test.jsx` only when existing assertions
  protect the changed slots.

**Protected:** `HOME-02` H1, `HOME-03` hero media/alt, all PM-HOME assets,
supporter assets, global metadata routes, shared CSS, article/generated files,
and the exact regulatory/legal assertions separately gated inside `HOME-07`.

Implement HOME-01, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09, and
HOME-10. For HOME-07, implement only the deterministic block, qualified
non-legal operational wording, and `/branding#compliance` plus
`/ecommerce#compliance` links/anchors; leave exact regulatory/legal assertions
for the separate Phase 4 evidence gate. Preserve all anchors and links.

**RED/GREEN and tests:** existing Home content assertions are the regression
surface; add a behavior assertion only if a link/anchor or ordered process
semantics changes. Run:

```powershell
npm.cmd test -- src/pages/__tests__/Home.test.jsx src/seo/__tests__/routeMetadata.test.js src/components/__tests__/Footer.test.jsx
npm.cmd exec -- eslint src/pages/Home.jsx src/components/home/ProcessSteps.jsx src/components/home/OwnedBrandProof.jsx src/seo/routeMetadata.js src/content/footerCtas.js
```

**Acceptance:** approved copy is present in existing slots, rejected H1/media
remain unchanged, HOME-07 deterministic links/anchors are valid without adding
ungated legal guarantees, tests/lint pass, and the diff is limited to the
allowlist.

**Rollback:** restore only the affected page-owned strings and matching meaningful
assertions with `apply_patch`; do not revert unrelated header/footer work.

## Phase 7: About deterministic approved changes — page group B

**Allowlist:**

- Modify `src/pages/About.jsx` only for ABOUT-01 through ABOUT-04, ABOUT-09, and
  approved CTA wiring if it is page-local.
- Modify `src/content/footerCtas.js` only for the `/about` entry.
- Modify `src/pages/__tests__/About.test.jsx` and
  `src/components/__tests__/Footer.test.jsx` only for meaningful contracts.

**Protected:** ABOUT-05 pending journey framing, ABOUT-06 current MUTBI/MAHE wording, ABOUT-07 launch status,
ABOUT-08 dates/grant/MOU, ABOUT-10 individual biographies/titles/doctorate
facts, all PM-ABOUT media, `COMPANY_FACTS`, CSS/motion, and generated content.

Implement the approved intro, Vision, Mission, Values, team presentation, and
closing CTA. ABOUT-05 journey framing is still gated; do not bulk-rewrite team
data or timeline content.

**Tests/lint:** run the existing About page tests after any RED/GREEN behavior
change; copy-only updates should adjust only assertions that protect approved
headings/links/structure:

```powershell
npm.cmd test -- src/pages/__tests__/About.test.jsx src/components/__tests__/Footer.test.jsx
npm.cmd exec -- eslint src/pages/About.jsx src/content/footerCtas.js
```

**Acceptance:** all gated facts and rejected member changes remain intact, media
hashes/paths remain unchanged, approved deterministic copy is in the existing
sections, and focused tests/lint pass.

**Rollback:** revert only the approved About strings and their meaningful tests
with `apply_patch`; preserve unresolved data and media.

## Phase 8A: Our Brands deterministic changes — page group C

**Allowlist:**

- Modify `src/pages/Brands.jsx`.
- Modify `src/content/footerCtas.js` only if the `/brands` CTA is part of the
  approved existing slot.
- Modify `src/pages/__tests__/Brands.test.jsx` and the relevant content
  regression only for meaningful approved contracts.

**Protected:** BRANDS-05 proof facts, BRANDS-07 ₹300 MRP, all PM-BRANDS assets,
trademark status unless verified, shared CSS, and generated content.

Implement BRANDS-01 through BRANDS-04 and BRANDS-06, including the exact
approved existing flagship CTA `Contact us about Raw Radicles` in BRANDS-04.
If the approved narrative
contains an unverified proof fact, keep the current safe wording and report the
exact sentence rather than guessing.

**Tests/lint:**

```powershell
npm.cmd test -- src/pages/__tests__/Brands.test.jsx
npm.cmd exec -- eslint src/pages/Brands.jsx src/content/footerCtas.js
```

**Acceptance:** approved positioning, flagship narrative, exact `Contact us about
Raw Radicles` CTA, and portfolio block use existing structure; MRP and unresolved
proof claims are absent; media is unchanged; focused tests/lint pass.

**Rollback:** restore only the Brands copy/CTA edits with `apply_patch`.

## Phase 8B: Raw Radicles deterministic changes — page group D

**Allowlist:**

- Modify `src/pages/RawRadicles.jsx` only for RAW-01, RAW-04, and RAW-08.
- Modify `src/pages/__tests__/RawRadicles.test.jsx` and
  `src/__tests__/contentEvidenceRegression.test.js` only for meaningful
  approved contracts.

**Protected:** RAW-02 images/alt, RAW-03 range facts, RAW-05 production facts,
RAW-06 locations, RAW-07 partner names, all PM-RAW assets, and generated content.

Implement only the approved hero subline, ownership wording, generic workstream
copy, and closing block. Keep generic qualified-partner wording where the
proposal would name an unresolved partner or location.

**Tests/lint:**

```powershell
npm.cmd test -- src/pages/__tests__/RawRadicles.test.jsx src/__tests__/contentEvidenceRegression.test.js
npm.cmd exec -- eslint src/pages/RawRadicles.jsx
```

**Acceptance:** no MRP, partner, location, launch-status, or unsupported product
claim is introduced; product imagery and alt behavior are unchanged; tests/lint
pass.

**Rollback:** restore only the Raw Radicles text edits and relevant assertions
with `apply_patch`.

## Phase 9A: Branding service page — page group E

**Allowlist:**

- Modify `src/pages/Branding.jsx` page-owned hero, scope, offers, compliance,
  FAQ, and only the approved local CTA slot if present.
- Modify `src/content/footerCtas.js` only for `/branding` CTA copy.
- Modify `src/pages/__tests__/ServiceCopy.test.jsx` and
  `src/components/__tests__/ServicePage.test.jsx` only for meaningful Branding
  contracts.

**Protected:** `src/components/ServicePage.jsx`, BRANDING-06 prices/durations,
unverified legal/regulatory claims, PM-BRANDING assets, shared service CSS,
generated content, and unrelated service pages.

Implement BRANDING-01 through BRANDING-05 and BRANDING-07. The compliance
section may change only where the approved copy retains the qualified-adviser
boundary and does not introduce a claim that Phase 4 has not evidenced. If the
clean proposal requires a new shared prop or component, stop and report instead
of editing `ServicePage.jsx`.

**Tests/lint:**

```powershell
npm.cmd test -- src/pages/__tests__/ServiceCopy.test.jsx src/components/__tests__/ServicePage.test.jsx
npm.cmd exec -- eslint src/pages/Branding.jsx src/content/footerCtas.js
```

**Acceptance:** Branding copy/FAQ/compliance updates are page-owned, prices and
durations remain absent, shared architecture is untouched, and focused tests/lint
pass.

**Rollback:** restore only `Branding.jsx`, `/branding` CTA strings, and their
meaningful assertions with `apply_patch`.

## Phase 9B: Marketing service page — page group F

**Allowlist:**

- Modify `src/pages/Marketing.jsx` page-owned hero, scope, offers, FAQ, and only
  the approved local CTA slot if present.
- Modify `src/content/footerCtas.js` only for `/marketing` CTA copy.
- Modify `src/pages/__tests__/ServiceCopy.test.jsx` only for meaningful Marketing
  contracts.

**Protected:** `src/components/ServicePage.jsx`, MARKETING-05 prices/SEO timing,
MARKETING-06 result promises, PM-MARKETING assets, shared service CSS, generated
content, and unrelated service pages.

Implement MARKETING-01 through MARKETING-04. Preserve the current no-guarantee
FAQ boundary and measurement caveats. Stop if the proposal requires shared
architecture or unsupported performance language.

**Tests/lint:**

```powershell
npm.cmd test -- src/pages/__tests__/ServiceCopy.test.jsx
npm.cmd exec -- eslint src/pages/Marketing.jsx src/content/footerCtas.js
```

**Acceptance:** approved intro/capabilities/FAQ/CTA copy is present, no prices,
SEO timing, or performance promise is introduced, and focused tests/lint pass.

**Rollback:** restore only Marketing page/CTA copy and meaningful assertions.

## Phase 9C: E-commerce service page — page group G

**Allowlist:**

- Modify `src/pages/Ecommerce.jsx` page-owned hero, scope, offers, compliance,
  FAQ, and only the approved local CTA slot if present.
- Modify `src/content/footerCtas.js` only for `/ecommerce` CTA copy.
- Modify `src/pages/__tests__/ServiceCopy.test.jsx` only for meaningful
  E-commerce contracts.

**Protected:** `src/components/ServicePage.jsx`, ECOMMERCE-06 prices/durations,
ECOMMERCE-07 platform/performance/legal claims, PM-ECOMMERCE assets, shared
service CSS, generated content, and unrelated service pages.

Implement ECOMMERCE-01 through ECOMMERCE-05. Preserve the tax/legal disclaimer
and do not add 4–6 or 8–16 week promises. Stop if the proposal requires shared
architecture or unsupported legal/platform claims.

**Tests/lint:**

```powershell
npm.cmd test -- src/pages/__tests__/ServiceCopy.test.jsx
npm.cmd exec -- eslint src/pages/Ecommerce.jsx src/content/footerCtas.js
```

**Acceptance:** approved E-commerce copy, compliance section, FAQ, and CTA use
existing page-owned data; unresolved commercial/legal claims stay unchanged;
focused tests/lint pass.

**Rollback:** restore only E-commerce page/CTA copy and meaningful assertions.

## Phase 10A: Contact deterministic changes — page group H

**Allowlist:**

- Modify `src/pages/Contact.jsx` for CONTACT-01, CONTACT-04, and CONTACT-05.
- Modify `src/pages/contactFormModel.js` for CONTACT-03 exact options.
- Modify `src/pages/__tests__/Contact.test.jsx` and
  `src/pages/__tests__/contactFormModel.test.js` for option/success behavior.

**Protected:** CONTACT-02 address, office hours, phone, email, map/contact cards,
`src/content/companyFacts.js`, contact hero media, privacy/payload contracts,
generated content, and unrelated forms.

Set `CONTACT_HELP_OPTIONS` exactly to:

```js
[
  'Branding',
  'Marketing and SEO',
  'E-commerce and marketplaces',
  'Packaging and FSSAI compliance',
  'New consumer brand',
  'Something else',
]
```

Keep the field name `helpType`, validation, payload shape, analytics event, and
privacy link. Use RED/GREEN for any success-state behavior assertion; copy-only
heading assertions should remain limited to meaningful route contracts.

**Tests/lint:**

```powershell
npm.cmd test -- src/pages/__tests__/Contact.test.jsx src/pages/__tests__/contactFormModel.test.js
npm.cmd exec -- eslint src/pages/Contact.jsx src/pages/contactFormModel.js
```

**Acceptance:** only approved intro, enquiry options, enquiry framing, and
success copy change; all contact details remain authoritative and unchanged;
tests/lint pass.

**Rollback:** restore only Contact/model copy and exact option assertions with
`apply_patch`; do not alter `companyFacts.js`.

## Phase 10B: Start a Project deterministic changes — page group I

**Allowlist:**

- Modify `src/pages/StartProject.jsx` for START-01, START-03, and START-04.
- Modify `src/components/ProjectPlannerForm.jsx` for the approved referral,
  service, and budget controls.
- Modify `src/components/work-with-us/formModel.js` for exact service options,
  initial state, validation, and payload fields required by the new controls.
- Modify `src/pages/__tests__/StartProject.test.jsx`,
  `src/components/__tests__/ProjectPlannerForm.test.jsx`, and
  `src/components/work-with-us/__tests__/formModel.test.js` only for meaningful
  behavior/content contracts.

**Protected:** START-02 Context wording, START-08 retained sentence,
attachment/honeypot/privacy behavior, analytics event names, current form
submission endpoint, media, generated content, and unrelated modal forms.

Implement these exact approved changes:

- referral-source select includes `LinkedIn`;
- service options include the single combined `Packaging and FSSAI compliance`
  choice in the approved taxonomy;
- optional budget field exposes exactly `Under ₹1 lakh`, `₹1–3 lakh`, `₹3–10
  lakh`, `Above ₹10 lakh`, and `Not decided yet`;
- payload carries the selected referral, service values, and budget without
  changing existing privacy or lead-classification semantics; and
- `A polished brief is not required.` remains unchanged.

**RED/GREEN:** first add focused tests asserting the exact option arrays,
initial-state shape, rendered controls, and payload inclusion. Run:

```powershell
npm.cmd test -- src/pages/__tests__/StartProject.test.jsx src/components/__tests__/ProjectPlannerForm.test.jsx src/components/work-with-us/__tests__/formModel.test.js
```

Expected RED is the missing LinkedIn/combined-service/budget behavior. Add the
smallest model and form changes, then rerun the same command and:

```powershell
npm.cmd exec -- eslint src/pages/StartProject.jsx src/components/ProjectPlannerForm.jsx src/components/work-with-us/formModel.js
```

**Acceptance:** exact options and bands render, optionality and validation stay
correct, payload tests pass, no form endpoint/analytics/privacy regression is
introduced, and the diff stays within the allowlist.

**Rollback:** restore only the Start/form/model changes and their focused tests
with `apply_patch`; do not touch unrelated Work With Us behavior.

## Phase 11: README correction

**Allowlist:**

- Modify `README.md` only for the stale enquiry-flow ownership/documentation
  description.
- Modify `src/__tests__/contentEvidenceRegression.test.js` only if a meaningful
  regression assertion protects the corrected architecture statement.

**Protected:** all source, generated, media, orchestration, and PDF files.

Update the documentation to describe the current enquiry flow and preserve the
dormant Sanity/fallback publication contract. Do not rewrite unrelated history.

**Tests/lint:**

```powershell
npm.cmd test -- src/__tests__/contentEvidenceRegression.test.js
git diff --check
```

**Acceptance:** README no longer documents removed enquiry architecture, no
source behavior changes, and the narrow regression check passes.

**Rollback:** restore only the README sentence/section and any matching test
assertion with `apply_patch`.

## Phase 12: Browser and Impeccable visual/accessibility QA

**Allowlist:** no source edits. This is verification-only; a reproduced defect
requires a new bounded task with an exact allowlist before implementation.

Use the available browser/Impeccable QA capability against a local preview only
after confirming an existing preview is not a user-owned process that must be
preserved. Do not terminate or restart user-owned previews without permission.

Check every public route, both current Insights articles, forms without sending
real submissions, and the mobile/tablet TOC at approximately:

- 390px, 430px, 768px, 1024px, and 1440px.

Record evidence for overflow, article readability, table/reference overflow,
TOC active state, focus visibility, contrast, touch targets, native details,
modal/form semantics, reduced motion, hydration, console errors, canonical/meta
identity, structured data, and protected artwork. Verify Contact details and
rejected image decisions remain unchanged.

**Acceptance:** no P1/P2 regression is introduced by the approved copy/form
changes; all unresolved behavior is reported separately; no source file changes
occur during QA.

**Rollback:** none for verification. Any fix is a new bounded task and cannot be
folded into QA opportunistically.

## Phase 13: Final full verification and fresh review

**Allowlist:** read-only verification of the completed approved diff. No source
edits, generated rewrites, commit, push, merge, deploy, or branch change.

Run the authorized full gate:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build:fallback
npm.cmd run verify:html
npm.cmd audit --audit-level=high
git diff --check
```

The build command is explicitly the fallback path because Sanity is dormant.
After the build, verify that generated changes are absent or exactly authorized
by a separately approved content task; this plan does not authorize generated
article rewrites. Also run an untracked-aware trailing-whitespace check over all
task artifacts and inspect:

- exact two current article slugs/publication set;
- 15 expected prerendered pages and 404 behavior;
- no public source maps;
- deterministic generated-content hashes where protected;
- unchanged protected media hashes;
- deployment verifier tests and Phase 2 evidence; and
- complete worktree scope against every phase allowlist.

Request a fresh `independent_reviewer` on the actual final diff, not the plan
narrative. Correct accepted findings in a new bounded task or the current
allowlist before handoff. If a finding expands scope, stop and request approval.

**Acceptance:** full commands pass, protected contracts remain intact, the fresh
review accepts the actual diff, and the coordinator receives changed files,
focused/full output, remaining risks, and exact status. Deployment remains a
separate explicitly approved action.

**Rollback:** no destructive rollback. If a source change must be removed, use a
new apply-patch bounded correction against the owning task files; never reset,
checkout, stash, or clean the worktree.

## Page-group review ledger

The coordinator must request the reviewer after each group and record the result
before the next group begins:

| Group | Page | Matrix rows | Reviewer gate |
| --- | --- | --- | --- |
| A | Home | HOME-01, HOME-04, HOME-05, HOME-06, HOME-07 (deterministic compliance wording/structure/anchors; legal claims gated), HOME-08, HOME-09, HOME-10 | Fresh independent review before About |
| B | About | ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, ABOUT-09, ABOUT-11 | Fresh independent review before Brands |
| C | Our Brands | BRANDS-01, BRANDS-02, BRANDS-03, BRANDS-04, BRANDS-06 | Fresh independent review before Raw Radicles |
| D | Raw Radicles | RAW-01, RAW-04, RAW-08 | Fresh independent review before Branding |
| E | Branding | BRANDING-01 through BRANDING-05 and BRANDING-07 | Fresh independent review before Marketing |
| F | Marketing | MARKETING-01 through MARKETING-04 | Fresh independent review before E-commerce |
| G | E-commerce | ECOMMERCE-01 through ECOMMERCE-05 | Fresh independent review before Contact |
| H | Contact | CONTACT-01, CONTACT-03, CONTACT-04, CONTACT-05 | Fresh independent review before Start |
| I | Start a Project | START-01, START-03 through START-07 | Fresh independent review before README/QA |

No page-group task may edit a matrix row marked `REJECTED`, `NEEDS CONFIRMATION`,
or `ALREADY IMPLEMENTED`. The coordinator owns plan/ledger updates and the
one-writer boundary; bounded workers return changed files, focused output,
remaining risks, and exact status without committing.
