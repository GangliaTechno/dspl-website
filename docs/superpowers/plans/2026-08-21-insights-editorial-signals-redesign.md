# Insights Editorial Signals Redesign

Date: 2026-08-21
Status: Implemented locally; independent review approved; user review pending
Route: `/blogs`

## Global constraints

- Keep the public name **Insights** and the existing `/blogs` route.
- Keep exactly the current two launch articles and their canonical links.
- Use the approved 16:9 masters: Brand/Market/Commerce v1 and Packaging-to-Purchase v2.
- Do not add search, filters, pagination, newsletter signup, a cover hero, or article-page changes.
- Do not modify generated content, dependencies, Header/navigation work, global tokens, or unrelated files.
- Preserve `src/generated/blogManifest.json` at SHA-256 `065BB53CA26002C24B65631636CD7809ACBE7F187357DEC2056303175CFF22D9`.
- Do not commit, push, merge, deploy, reset, stash, clean, or change branches.

## Task 1: Implement the image-led editorial index

### Test-first contract

1. Extend `src/pages/__tests__/Blogs.test.jsx` before production changes.
2. Assert canonical artwork mapping by slug, exact accessible descriptions, `640w`/`960w`/`1440w` candidates, intrinsic `1440x810`, eager/high lead loading, lazy supporting loading, preserved `Insights` heading and links, absence of search/filter controls, and a usable text-only fallback for an unmapped slug.
3. Run the focused test and record the expected failure because article images are not implemented.
4. Implement the minimum production change and rerun the focused test to green.

### Production assets

Preserve the PNG masters unchanged in `docs/assets/insights-concepts/`.

Create with installed Sharp, centre crop, Lanczos 3, WebP quality 86, effort 6, and no upscaling:

- `src/assets/insights-brand-market-commerce-{640,960,1440}.webp`
- `src/assets/insights-packaging-to-purchase-{640,960,1440}.webp`

Exact dimensions are `640x360`, `960x540`, and `1440x810`.

### Page behavior

- Desktop above 900px: two-column masthead, subtle rule, then `1.45fr / 1fr` lead/supporting editorial modules with artwork first and no filled generic card shell.
- At 900px and below: one-column masthead and stacked stories in reading order, keeping uncropped 16:9 images.
- At 480px and below: retain the existing container gutter, allow metadata wrapping, and stack date/action without reordering DOM content.
- Keep each complete story as one link with visible `:focus-visible` outline.
- Fine-pointer hover may scale the image to `1.015`, shift the boundary to the accent border, darken the title, and move the arrow `4px`.
- Disable image and arrow transforms/transitions for reduced motion.
- Map art by canonical slug, never array position; unmapped future posts remain text-only.
- Lead image: eager, high fetch priority, async decoding. Supporting image: lazy, async decoding.

### Write allowlist

Modify only:

- `src/pages/Blogs.jsx`
- `src/pages/Blogs.css`
- `src/pages/__tests__/Blogs.test.jsx`
- `docs/assets/insights-concepts/README.md`
- `docs/ASSET_PROVENANCE.md`

Create only the six WebP files listed above.

### Validation

- Focused test: `npm.cmd test -- src/pages/__tests__/Blogs.test.jsx`
- Focused lint: `npm.cmd exec -- eslint src/pages/Blogs.jsx src/pages/__tests__/Blogs.test.jsx`
- Asset metadata/hash validation with Sharp and SHA-256.
- Safe build: `npm.cmd exec -- vite build`
- HTML verification: `npm.cmd run verify:html`
- `git diff --check` plus explicit untracked-file whitespace inspection.
- Recheck changed paths against the allowlist and the protected manifest hash.
- Fresh Sol/high review of the actual diff and browser QA at `1440x900` and `390x844`.

### Implementer report

Write the full implementation report, including RED/GREEN evidence, validation output, changed files, and self-review, to the task report path supplied by the coordinator.
