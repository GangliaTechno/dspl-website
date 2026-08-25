# DSPL Sitewide Copy, Content, and Insights Refinement Design

Date: 2026-08-25
Status: Approved scope; implementation follows the persisted decision matrix and the Phase 2 stop

## Objective

Apply the 47 clearly approved copy, content, form, and UX changes identified by
the handwritten review of the clean DSPL Copy Deck, while preserving rejected
media proposals, unresolved facts, the current Insights publication set, and the
dormant Sanity/fallback production contract. The work is a sequence of bounded
page groups, not a site-wide rewrite.

The authoritative row-level scope is
[`2026-08-25-dspl-sitewide-copy-decision-matrix.md`](./2026-08-25-dspl-sitewide-copy-decision-matrix.md).
That matrix contains 74 stable rows: 47 approved, 6 rejected, 18 needing
confirmation, and 3 already implemented.

## Reference authority and decision model

The external PDFs are read-only sources and remain outside Git:

1. `E:\For website\dspl research\updates proper\DSPL-Website-Copy-Deck.pdf`
   — proposed replacement copy and SEO/content blocks.
2. `E:\For website\dspl research\updates proper\Scanned Document 3.pdf`
   — handwritten review/decision layer over the proposed blocks.

The review layer is interpreted as follows:

- `update`, `need to update`, `modify`, `add`, and `need to add` approve the
  corresponding existing website slot, subject to its row-level factual gate.
- Cross-outs, `X`, `do not update`, and `images need not change` reject the
  corresponding clean-deck proposal and preserve current implementation.
- `CONFIRM`, illegible handwriting, mixed decisions, and unsupported factual,
  commercial, legal, regulatory, partner, launch, pricing, duration, performance,
  or qualification claims require a separate decision. Workers must show the
  current value, proposed value, source page, and exact question before editing.
- Unannotated clean-deck suggestions are not approved automatically. They remain
  deferred or `NEEDS CONFIRMATION` in the matrix.

## Product and visual constraints

- Product truth remains `PRODUCT.md`; visual rules remain `DESIGN.md`.
- Use existing page-owned data and components. Do not add a new content system or
  broad shared abstraction for copy changes.
- `ServicePage.jsx` is protected. Phase 9 may edit each service page's local data,
  but must stop and report if its current interface cannot express an approved
  slot.
- Existing hero, product, portrait, logo, supporter, and article artwork is
  protected. No image generation, replacement, recropping, re-encoding, or
  speculative alt rewrite is approved.
- Keep typography, spacing, motion, responsive structure, accessibility, and
  reduced-motion behavior within the existing design system unless a bounded
  behavior regression requires a small correction.
- Copy must preserve British English where the existing approved page uses it,
  but the deferred global British-English and coordinate/coordinated rewrite is
  not part of this scope.
- Preserve the existing privacy boundaries, qualified-adviser disclaimers, form
  payload field names unless a row explicitly authorises a form field change, and
  current analytics event contracts.

## Publication and CMS boundary

- The current two compliance articles remain the complete publication set:
  `fssai-labelling-requirements-checklist-2026` and
  `legal-metrology-packaged-commodity-rules-india`.
- Do not restore the obsolete article proposals from clean-deck pages 23–24.
- Phase 4 may investigate official references and regulatory freshness only. It
  must show exact proposed changes for separate approval; it must not modify
  `src/cms/seedData.js`, generated article JSON, article slugs, publication dates,
  or reference text.
- Sanity remains dormant. Do not upload or mutate remote Sanity content, add
  credentials, or change the existing CMS -> normalization/sync -> generated
  publication -> React boundary.
- Generated files under `src/generated/` and `public/insights/` are protected.
  No content-sync command is part of a copy phase.

## Approved content and UX scope

### Home — page group A

Approved work covers the hero subline, homepage metadata, capability heading and
the Branding/Marketing/E-commerce cards, the deterministic structure/copy of the
existing compliance-support block and its anchors, the existing How We Deliver
heading/copy/stages, the Raw Radicles operating-experience block, and the
homepage-owned closing CTA. HOME-07 keeps a separate factual gate inside the row:
exact regulatory/legal assertions remain subject to Phase 4 and cannot be added
from the deck alone. Keep the current H1 and all hero imagery unchanged.

### About — page group B

Approved work covers the corporate-profile introduction, Vision, Mission, Values,
team-section presentation, and closing CTA. The journey framing row is pending;
only separately approved deterministic About slots may change. The 2023
MUTBI/MAHE wording is already correct. Timeline launch/grant/MOU facts, doctorate
count and identities, individual titles, biographies, and the pending journey
framing remain gated until each is confirmed. The mixed team annotations must be
handled member by member; no bulk replacement is allowed.

### Our Brands — page group C

Approved work covers hero positioning, ownership/operator narrative, Raw Radicles
flagship label/tagline/narrative, the existing flagship CTA (exact proposed copy:
`Contact us about Raw Radicles`), the portfolio-in-development block, and its
approved partnership CTA. The proof-grid structure may remain, but its product/stat facts
require confirmation. The proposed ₹300 MRP is rejected.

### Raw Radicles — page group D

Approved work covers the hero subline, ownership story, approved generic
product-development/workstream/closing copy. The range/product details,
formulation and manufacturing locations, partner facts, and product claims are
gated. Proposed partner names and rejected image changes must not be added.

### Service pages — page groups E, F, and G

Branding, Marketing, and E-commerce are separate bounded tasks under Phase 9.
Each may update its page-owned hero/intro, capability data, approved compliance
section, FAQ modifications, and closing CTA. They must not add unresolved prices,
durations, SEO timing, performance commitments, unsupported platform statements,
or unverified legal/regulatory claims.

### Contact and Start a Project — page groups H and I

Contact may update the approved intro/context, the enquiry options, and the
success state. Its address, phone, email, office hours, map, and contact-detail
facts remain unchanged and continue to come from `COMPANY_FACTS`.

Start a Project may update the approved intro, Need and Outcome briefing points,
and form behavior. The exact approved changes are:

- add `LinkedIn` to the referral-source options;
- use the combined `Packaging and FSSAI compliance` service option;
- add the optional budget bands `Under ₹1 lakh`, `₹1–3 lakh`, `₹3–10 lakh`,
  `Above ₹10 lakh`, and `Not decided yet`;
- preserve `A polished brief is not required.`;
- preserve current validation, privacy, attachment, honeypot, payload, and
  analytics contracts unless the focused form tests demonstrate a required
  field-model update.

## Architecture and implementation rules

1. Keep each page group in its own bounded diff. Do not combine all nine page
   groups into a single implementation change.
2. Prefer page-owned constants and route-owned metadata. Edit a shared component
   only when its current interface owns the approved slot or a behavior test
   proves the interface must change.
3. Use RED then GREEN for behavior changes: add the smallest failing regression,
   run it to confirm the failure, implement the smallest patch, then run the
   focused test and lint command.
4. For copy-only changes, update an existing content regression only when it
   protects a meaningful route, link, disclaimer, form option, or publication
   contract. Do not create one assertion per sentence.
5. Use `npm.cmd` on Windows. Node.js must satisfy `>=22.22.0`.
6. After every page group A–I, inspect the actual diff, run the focused tests and
   lint, request a fresh `independent_reviewer`, and correct accepted findings
   before starting the next page group.
7. No writer may edit outside its exact task allowlist. No commit, push, merge,
   deploy, branch change, generated rewrite, or production/server mutation is
   authorised by this design.

## Protected paths and contracts

- External PDFs at the two exact `E:\...` paths above.
- All media listed in the matrix protected-media registry.
- `src/generated/blogManifest.json` and both current generated article snapshots.
- `src/cms/seedData.js` and `sanity/` during copy phases unless a future,
  separately approved editorial correction names them.
- `src/components/ServicePage.jsx` during Phase 9 unless the coordinator accepts
  a reported interface blocker as a new bounded task.
- `src/content/companyFacts.js` for Contact work.
- Current article slugs/publication count and the dormant Sanity/fallback build
  contract.
- Existing privacy, analytics, form payload, accessibility, reduced-motion, and
  route metadata contracts outside the exact approved slots.

## Acceptance criteria

- Every implemented row is `APPROVED TO IMPLEMENT` in the matrix and changes only
  the named slot.
- Rejected rows remain unchanged, especially all media, Contact details, partner
  names, and the proposed MRP.
- Needs-confirmation rows remain unchanged unless the coordinator records a
  separate exact approval.
- Existing routes, anchors, form validation, privacy language, analytics, and
  current two-article publication set continue to work.
- Focused tests and lint pass after each bounded source task.
- Independent review accepts each page-group diff before the next page group.
- Phase 12 finds no new overflow, focus, contrast, reduced-motion, metadata,
  console, hydration, or article-readability regressions at 390px, 430px, 768px,
  1024px, and 1440px.
- Phase 13 passes the authorized full verification gate without changing
  protected generated content or media.
