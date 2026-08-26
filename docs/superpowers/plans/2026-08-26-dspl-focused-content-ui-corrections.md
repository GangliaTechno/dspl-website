# DSPL Focused Content and UI Corrections Plan

Date: 2026-08-26
Status: Approved for implementation
Design: `docs/superpowers/specs/2026-08-26-dspl-focused-content-ui-corrections-design.md`

## Execution rules

- Use one bounded implementation writer at a time.
- Begin every behavioural task with a failing focused regression.
- Run focused tests and lint after each task, inspect the complete diff, then
  request a fresh independent review before starting the next page group.
- Keep `.github/instructions/` and all files outside the active allowlist
  untouched.
- Separate reviewed commits are authorised. Push, merge, deploy and production
  mutation are not authorised.

## Task 1 — Documentation and baseline

Allowlist:

- `docs/superpowers/specs/2026-08-26-dspl-focused-content-ui-corrections-design.md`
- `docs/superpowers/plans/2026-08-26-dspl-focused-content-ui-corrections.md`
- `docs/agent/PROJECT_CONTEXT.md`

Record the approved copy sheet, exact boundaries, clean baseline and current
branch state.

## Task 2 — Shared service layout and Branding

Allowlist:

- `src/pages/Branding.jsx`
- `src/content/serviceFaqs.js`
- `/branding` entry only in `src/content/footerCtas.js`
- `src/components/ServicePage.css`
- `src/pages/__tests__/ServiceCopy.test.jsx`
- `src/components/__tests__/ServicePage.test.jsx`
- `src/components/__tests__/Footer.test.jsx`
- `src/__tests__/designSystemRegression.test.js`

Conditional only if CSS and page-owned data cannot express the approved design:
`src/components/ServicePage.jsx`; stop and report before editing it.

RED: require four Branding capabilities, no compliance item grid, no prohibited
fixed timing/price/performance copy, `/start` footer target, and a balanced 2×2
desktop layout. GREEN: implement the exact approved Branding sheet and narrow
shared CSS. Preserve all media.

Run:

```powershell
npm.cmd test -- src/pages/__tests__/ServiceCopy.test.jsx src/components/__tests__/ServicePage.test.jsx src/components/__tests__/Footer.test.jsx src/__tests__/designSystemRegression.test.js
npm.cmd exec -- eslint src/pages/Branding.jsx src/content/serviceFaqs.js src/content/footerCtas.js
```

## Task 3 — Marketing

Allowlist:

- `src/pages/Marketing.jsx`
- Marketing entries only in `src/content/serviceFaqs.js`
- `/marketing` entry only in `src/content/footerCtas.js`
- meaningful Marketing assertions in `src/pages/__tests__/ServiceCopy.test.jsx`
- meaningful `/marketing` assertions in `src/components/__tests__/Footer.test.jsx`

RED: require the four approved capabilities, safe FAQ boundaries and `/start`
CTA. GREEN: implement the approved sheet, removing SEO timing, minimum-period
and performance commitments. Do not change shared architecture or images.

Run the service/footer focused tests and ESLint the modified source files.

## Task 4 — E-commerce

Allowlist:

- `src/pages/Ecommerce.jsx`
- E-commerce entries only in `src/content/serviceFaqs.js`
- `/ecommerce` entry only in `src/content/footerCtas.js`
- meaningful E-commerce assertions in `src/pages/__tests__/ServiceCopy.test.jsx`
- meaningful `/ecommerce` assertions in `src/components/__tests__/Footer.test.jsx`

RED: require four approved capabilities, no compliance item grid, safe FAQ
boundaries and `/start` CTA. GREEN: implement the approved sheet, removing fixed
delivery periods and unsupported platform, performance and legal claims. Keep
the existing qualified-adviser disclaimer and all images.

Run the service/footer focused tests and ESLint the modified source files.

## Task 5 — Brands hierarchy

Allowlist:

- `src/pages/Brands.jsx`
- `src/pages/Brands.css`
- `/brands` entry only in `src/content/footerCtas.js`
- `src/pages/__tests__/Brands.test.jsx`
- corresponding `/brands` assertions in `src/components/__tests__/Footer.test.jsx`

RED: assert Raw Radicles links to `/brands/raw-radicles`, the partnership action
links to `/contact`, and the footer links to `/start`. GREEN: implement the
approved hierarchy and restrained status presentation. Do not make an overflow
patch unless the clipping defect is freshly reproduced with measurements.

## Task 6 — Home process and supporter rail

Allowlist:

- `src/pages/Home.jsx`
- `src/pages/Home.css`
- `src/components/home/homeSections.css`
- `src/pages/__tests__/Home.test.jsx`
- `src/__tests__/designSystemRegression.test.js`

RED: remove the three gated duration strings; encode the process metadata
alignment contract; encode the 901–1039 rail-flow rule. GREEN: use the smallest
grid/flex/CSS correction without fixed page heights. Browser acceptance at
1024, 1181 and 1440: metadata divider tops differ by at most 1px. At 936: rail
top is not above hero-action bottom. Preserve hero and supporter artwork.

## Task 7 — Pawan-only production authorship

Allowlist:

- `src/cms/seedData.js`
- `src/generated/blogManifest.json`
- `src/generated/blog/fssai-labelling-requirements-checklist-2026.json`
- `src/generated/blog/legal-metrology-packaged-commodity-rules-india.json`
- `scripts/__tests__/sanitySetup.test.js`
- `scripts/__tests__/sync-blog-content.test.js`
- `src/content/__tests__/publication.test.js`

RED: require exactly `Pawan Shetty` in both seed and fallback article author
arrays. GREEN: remove only Namesh author objects, run the explicitly authorised
`npm.cmd run sync:fallback`, and prove no body, reference, date, slug, artwork or
publication-count change. Do not weaken generic multi-author tests.

## Task 8 — Deterministic Insights TOC

Allowlist:

- `src/pages/BlogPost.jsx`
- `src/pages/__tests__/BlogPost.test.jsx`
- conditional `src/pages/BlogPost.css` only if an active-state styling defect is
  independently reproduced.

RED: mock heading geometry and a fast scroll/hash jump with no useful observer
intersection; assert the correct later heading is active in both TOCs and that
listeners/frame work are cleaned up. GREEN: implement the approved rAF-throttled
geometry resolver and preserve accessible native details and `aria-current`.

## Task 9 — Visual and final gates

Run Gemini 3.7 Flash High as a read-only browser/visual reviewer at 390, 430,
768, 900, 936, 1024, 1181 and 1440px. Use Gemini 3.1 Pro High only if the content
hierarchy remains materially ambiguous. Make no source edits during QA.

Then run:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build:fallback
npm.cmd run verify:html
npm.cmd audit --audit-level=high
git diff --check
git status --short
```

Request a fresh independent reviewer across the final actual diff. Corrections
from accepted findings must use a new bounded task and the owning allowlist.

## Acceptance

- Four capabilities per service page; no five-item compliance panels.
- No prohibited fixed durations, performance commitments, prices or legal
  guarantees.
- Distinct Brands conversion destinations.
- Home metadata dividers aligned within 1px and no 936px supporter-rail overlap.
- Exactly Pawan Shetty on both production articles.
- Deterministic desktop/mobile TOC state after fast jumps.
- Images, publication bodies/references/dates/slugs/count, Sanity dormant state
  and fallback build contract remain unchanged.
