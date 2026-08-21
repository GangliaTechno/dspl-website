# DSPL Header Navigation Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking. Run implementation workers with \`gpt-5.6-luna\` at \`max\` reasoning, as requested.

**Goal:** Rebuild the DSPL header around the approved \`Company / Capabilities / Insights / Contact / Start a project\` hierarchy, using accessible desktop disclosures and mobile accordions driven by one route-aware model.

**Architecture:** Add one pure content module for labels, destinations, descriptors, ordering, publication visibility, and route-family matching. Keep interaction state in the existing \`Header.jsx\`, preserving its mobile dialog/focus trap and the persistent full-to-compact floating shell introduced by \`258c26d\`. Style compact editorial panels in \`Header.css\`; do not restore the older directional \`header-lifted\`/hidden behavior.

**Tech Stack:** React 19.2.8, React Router 8.3.0, Vite 8.0.12, Vitest 4.1.10, Testing Library 16.3.2, Lucide React, plain CSS, Node.js \`>=22.22.0\`.

## Global constraints

- Desktop first level is exactly logo/Home, \`Company\`, \`Capabilities\`, \`Insights\`, \`Contact\`, and \`Start a project\`. Do not add a Home text link.
- Company contains \`About DSPL\` then \`Our Brands\`. Do not expose Raw Radicles directly.
- Capabilities contains \`Branding\`, \`Marketing\`, then \`E-commerce\`.
- Keep URLs unchanged: \`/about\`, \`/brands\`, \`/branding\`, \`/marketing\`, \`/ecommerce\`, \`/blogs\`, \`/contact\`, and \`/start\`. Do not create Company, Capabilities, or Insights landing routes.
- Insights is a direct link to \`/blogs\`, replaces the header label \`Blogs\`, and remains conditional on \`blogsEnabled\`.
- Use the approved descriptors exactly:
  - About DSPL: \`Company, leadership, journey and direction\`
  - Our Brands: \`Consumer brands developed and operated by DSPL\`
  - Branding: \`Positioning, identity and brand systems\`
  - Marketing: \`Strategy, campaigns, content and measurement\`
  - E-commerce: \`Storefront, marketplace and commerce execution\`
- Desktop group triggers are native \`<button type="button">\` disclosures with \`aria-expanded\` and \`aria-controls\`. Children are ordinary links in ordinary lists. Never use \`role="menu"\` or \`role="menuitem"\`.
- Open on click/native Enter/Space only. Hover may style controls but must not open panels or use timers.
- Only one desktop group or mobile accordion group is open at once.
- Escape closes and returns focus to the desktop trigger; outside pointer activation closes without stealing focus; desktop Tab order remains ordinary DOM order.
- Preserve the mobile drawer's dialog semantics, body scroll lock, close autofocus, focus trap, backdrop close, Escape behavior, and hamburger focus restoration.
- Opening mobile expands the current route's parent group. The entire group row toggles.
- Exact links use \`aria-current="page"\`; family ancestors use \`aria-current="location"\`: \`/brands/*\` maps to Company/Our Brands, capability descendants map to Capabilities/the capability, and \`/blogs/*\` maps to Insights.
- \`/start\` activates only the CTA.
- Route changes, opening mobile, and crossing the 1040px breakpoint clear incompatible disclosure state.
- Record desktop disclosure opening scroll position. Under 12px absolute displacement is jitter and stays open; 12px or more closes it. The persistent header stays visible.
- Preserve the current 1040px desktop boundary, shell geometry, scroll hysteresis, logo, CTA analytics, and full-to-compact floating morph.
- Panels are 360px, nearly opaque, image-free editorial surfaces. No mega menu, promotional cards, featured content, or glass-blurred panel.
- Entry motion is 160ms opacity plus \`translateY(-6px)\`; no spring, scale, blur, or stagger. Reduced motion removes panel, caret, and accordion movement.
- Do not add dependencies, roving focus, or application-menu arrow-key behavior.
- Do not edit \`src/generated/blogManifest.json\`. It has a pre-existing user-owned \`syncedAt\` change and must retain the exact pre-execution SHA-256.
- Do not run \`npm.cmd run build\`, \`build:fallback\`, \`content:sync\`, or \`sync:fallback\`; those can rewrite generated publication state. Use \`npm.cmd run build:site\`.
- Do not commit, push, merge, deploy, reset, stash, or clean. Preserve all unrelated work.
- Follow RED → GREEN for every source change.

## File map

- Create \`src/content/headerNavigation.js\`: canonical header IA and route matching.
- Create \`src/content/__tests__/headerNavigation.test.js\`: pure ordering, gating, and route-family tests.
- Modify \`src/components/Header.jsx\`: desktop disclosures, mobile accordions, focus/outside/route/resize/scroll state.
- Modify \`src/components/Header.css\`: panels, hierarchy, active states, motion, reduced motion.
- Modify \`src/components/__tests__/Header.test.jsx\`: behavior tests.
- Modify \`src/__tests__/designSystemRegression.test.js\`: durable source/CSS contracts.
- Modify \`DESIGN.md\`: replace stale Work With Us navigation guidance with the implemented contract.
- Do not modify Footer, routes, pages, package files, dependencies, or generated publication files.

---

### Task 1: Create the shared navigation model

**Files:**
- Create: \`src/content/headerNavigation.js\`
- Create: \`src/content/__tests__/headerNavigation.test.js\`

**Produces:**
- \`createHeaderNavigation(includeInsights = blogsEnabled)\`
- \`HEADER_NAVIGATION\`
- \`HEADER_PRIMARY_ACTION\`
- \`normalizeNavigationPath(pathname)\`
- \`getNavigationMatch(pathname, item)\` returning \`'page' | 'location' | null\`
- \`getHeaderNavigationState(pathname, navigation)\` returning \`{ parentId, itemId, ariaCurrent }\`

- [ ] **Step 1: Write the failing model tests**

Test the exact first-level labels, child order, routes, five descriptors, absence of Raw Radicles, conditional omission of Insights, trailing-slash normalization, segment-safe matching, and these route results:

\`\`\`js
[
  ['/about', { parentId: 'company', itemId: 'about', ariaCurrent: 'page' }],
  ['/brands', { parentId: 'company', itemId: 'brands', ariaCurrent: 'page' }],
  ['/brands/raw-radicles', { parentId: 'company', itemId: 'brands', ariaCurrent: 'location' }],
  ['/branding', { parentId: 'capabilities', itemId: 'branding', ariaCurrent: 'page' }],
  ['/marketing', { parentId: 'capabilities', itemId: 'marketing', ariaCurrent: 'page' }],
  ['/ecommerce', { parentId: 'capabilities', itemId: 'ecommerce', ariaCurrent: 'page' }],
  ['/blogs', { parentId: null, itemId: 'insights', ariaCurrent: 'page' }],
  ['/blogs/article', { parentId: null, itemId: 'insights', ariaCurrent: 'location' }],
  ['/contact', { parentId: null, itemId: 'contact', ariaCurrent: 'page' }],
  ['/unknown', { parentId: null, itemId: null, ariaCurrent: null }],
]
\`\`\`

Also assert \`getNavigationMatch('/start', HEADER_PRIMARY_ACTION) === 'page'\` and \`/start/extra\` does not match.

- [ ] **Step 2: Run RED**

\`\`\`powershell
npm.cmd test -- src/content/__tests__/headerNavigation.test.js
\`\`\`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the minimal immutable model**

Use \`kind: 'group'\` for Company/Capabilities and \`kind: 'link'\` for Insights/Contact. Store \`activePrefixes\` only on routes with descendants. Prefix matching must use a slash boundary:

\`\`\`js
if (currentPath === destination) return 'page';
if ((item.activePrefixes || []).some((prefix) =>
  currentPath.startsWith(\`\${normalizeNavigationPath(prefix)}/\`)
)) return 'location';
return null;
\`\`\`

Freeze entries, child arrays, and the exported navigation array. Import only \`blogsEnabled\` from \`./publication\`.

- [ ] **Step 4: Run GREEN**

\`\`\`powershell
npm.cmd test -- src/content/__tests__/headerNavigation.test.js
git diff --check
git status --short
\`\`\`

Expected: model tests pass; only the two new files plus the pre-existing manifest modification appear.

---

### Task 2: Implement desktop disclosures and lifecycle integration

**Files:**
- Modify: \`src/components/Header.jsx\`
- Modify: \`src/components/__tests__/Header.test.jsx\`

**Consumes:** Task 1 exports.

**State/refs:** \`openDesktopGroup\`, \`headerRef\`, \`desktopTriggerRefs\`, \`openDesktopGroupRef\`, \`desktopMenuOpenedScrollYRef\`, and \`MENU_CLOSE_SCROLL_DELTA = 12\`.

- [ ] **Step 1: Write failing desktop tests**

Refactor the test helper to \`MemoryRouter initialEntries={[path]}\`. Add tests proving:

- Main Navigation contains native Company and Capabilities buttons, direct Insights/Contact links, no Blogs/Raw Radicles link, and no menu/menuitem roles.
- Trigger \`aria-controls\` points to stable IDs \`desktop-nav-company-panel\` and \`desktop-nav-capabilities-panel\`.
- Clicking Company reveals About DSPL and Our Brands with descriptors and routes.
- Clicking Capabilities closes Company and reveals Branding, Marketing, E-commerce in that order; clicking it again closes it.
- Outside \`pointerdown\` closes.
- Escape closes and returns focus to the opener.
- A route change closes.
- Crossing from 1040+ to 1039 closes desktop state.
- Opening a group adds \`header-navigation-open\`; 11px scroll keeps it open, 12px closes it; \`header-hidden\` and \`header-lifted\` never appear.
- Exact and family links receive \`page\` and \`location\` respectively; \`/start\` activates the CTA only.

- [ ] **Step 2: Run RED**

\`\`\`powershell
npm.cmd test -- src/components/__tests__/Header.test.jsx
\`\`\`

Expected: FAIL on missing disclosures, Insights naming, and lifecycle state.

- [ ] **Step 3: Implement desktop behavior**

Remove local \`navItems\` and \`normalizePath\`; import Task 1 exports and Lucide \`ChevronDown\`/\`ArrowRight\`. Render first-level items as a list inside the existing nav.

For each group:

\`\`\`jsx
<button
  ref={(node) => { desktopTriggerRefs.current[entry.id] = node; }}
  type="button"
  className={activeState.parentId === entry.id
    ? 'nav-disclosure-button nav-disclosure-active'
    : 'nav-disclosure-button'}
  aria-expanded={openDesktopGroup === entry.id}
  aria-controls={\`desktop-nav-\${entry.id}-panel\`}
  onClick={() => setOpenDesktopGroup((current) =>
    current === entry.id ? null : entry.id
  )}
>
  <span>{entry.label}</span>
  <ChevronDown className="nav-disclosure-caret" aria-hidden="true" />
</button>
\`\`\`

Keep each controlled panel in the DOM with \`hidden={!expanded}\`; use ordinary \`ul/li/Link\`, item title, descriptor, and decorative arrow. Never add mouse-open handlers or desktop focus trapping.

While a group is open, listen for document \`pointerdown\` outside \`headerRef\` and window Escape. Escape focuses \`desktopTriggerRefs.current[openDesktopGroup]\`.

Close both navigation states on \`location.pathname\` changes. In the existing single resize listener, close mobile at \`>= 1040\` and desktop below 1040.

Integrate meaningful scroll into the existing requestAnimationFrame listener rather than adding another scroll listener:

\`\`\`jsx
if (
  openDesktopGroupRef.current
  && Math.abs(currentScrollY - desktopMenuOpenedScrollYRef.current) >= 12
) {
  openDesktopGroupRef.current = null;
  setOpenDesktopGroup(null);
}
\`\`\`

Preserve current \`SCROLLED_ENTER_Y\`, \`SCROLLED_EXIT_Y\`, shell classes, and geometry.

- [ ] **Step 4: Run GREEN**

\`\`\`powershell
npm.cmd test -- src/content/__tests__/headerNavigation.test.js src/components/__tests__/Header.test.jsx
git diff --check
\`\`\`

Expected: model and desktop behavior pass without regressing the existing compact-shell test.

---

### Task 3: Render same-model mobile accordions and style both modes

**Files:**
- Modify: \`src/components/Header.jsx\`
- Modify: \`src/components/Header.css\`
- Modify: \`src/components/__tests__/Header.test.jsx\`
- Modify: \`src/__tests__/designSystemRegression.test.js\`
- Modify: \`DESIGN.md\`

**State:** \`openMobileGroup: string|null\`.

- [ ] **Step 1: Write failing mobile and CSS tests**

Add Header tests proving:

- At 375px the drawer uses Company/Capabilities accordion buttons plus direct Insights/Contact and separate CTA.
- The whole group row toggles and only one group opens.
- \`/brands/raw-radicles\` opens Company and marks Our Brands \`aria-current="location"\`.
- \`/branding\` opens Capabilities and marks Branding \`page\`.
- Collapsed child links are excluded from the drawer focus cycle.
- Existing close autofocus, Shift+Tab wrapping, Escape, backdrop close, body lock, focus restoration, and 1039/1040 tests remain green.
- Opening mobile clears a desktop disclosure.

Add a design regression asserting:

- shared labels/order live in \`headerNavigation.js\`;
- Header contains no menu roles or mouse-open handlers;
- \`.desktop-disclosure-panel\` is 360px with an approximately opaque white surface and no panel backdrop blur;
- desktop panel entry uses 160ms and -6px;
- mobile group buttons have \`min-height: 44px\`;
- reduced motion removes panel/sublist animation and caret movement;
- existing compact-shell and breakpoint contracts remain intact.

- [ ] **Step 2: Run RED**

\`\`\`powershell
npm.cmd test -- src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
\`\`\`

Expected: FAIL because mobile is flat and new styles/contracts do not exist.

- [ ] **Step 3: Implement mobile state and rendering**

When opening a closed drawer:

\`\`\`jsx
setOpenDesktopGroup(null);
setOpenMobileGroup(activeState.parentId);
setIsOpen(true);
\`\`\`

When closing, also clear \`openMobileGroup\`. Render groups/direct links from \`HEADER_NAVIGATION\`; group children remain in the DOM with \`hidden={!expanded}\`. Child mobile rows use labels only; descriptors remain desktop-only.

Keep the focus trap, but exclude collapsed descendants:

\`\`\`js
.filter((element) =>
  !element.closest('[aria-hidden="true"], [hidden]')
)
\`\`\`

Mobile Escape closes the dialog before desktop Escape handling. Apply Task 1 active-state output to desktop links, mobile links, and CTA.

- [ ] **Step 4: Implement compact, restrained CSS**

Preserve current header/drawer geometry. Add:

- list resets and relative group anchors;
- a centered \`360px\` panel with \`rgba(255,255,255,0.988)\`, warm 1px border, 12px radius, light ambient shadow, and no \`backdrop-filter\`;
- clear item titles, muted one-line descriptors, restrained arrows, and gold only for active/hover/focus;
- disclosure buttons visually aligned with existing nav links;
- caret rotation only while expanded;
- full-width 44px mobile group buttons, indented children, and visible current state;
- \`desktop-disclosure-enter\` and \`mobile-sublist-enter\` keyframes using opacity and at most 6px Y travel for 160ms;
- reduced-motion rules setting those animations and caret/arrow transitions to \`none\`;
- a desktop guard at \`min-width: 1040px\` so stale mobile drawer/backdrop state cannot display.

Do not add scale, blur, stagger, images, promo regions, or hover activation.

- [ ] **Step 5: Update DESIGN.md narrowly**

Replace the stale Navigation sentence with the current persistent floating shell, Start a project CTA, Company/Capabilities click disclosures, direct Insights/Contact, ordinary lists/native buttons, 360px opaque editorial panels, shared mobile accordions, hierarchical current states, and 160ms/reduced-motion rules. Do not edit unrelated design sections.

- [ ] **Step 6: Run GREEN**

\`\`\`powershell
npm.cmd test -- src/content/__tests__/headerNavigation.test.js src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js
git diff --check
git diff -- src/content/headerNavigation.js src/content/__tests__/headerNavigation.test.js src/components/Header.jsx src/components/Header.css src/components/__tests__/Header.test.jsx src/__tests__/designSystemRegression.test.js DESIGN.md
\`\`\`

Expected: all focused tests pass and the diff is limited to the seven planned paths.

---

### Task 4: Full validation and responsive QA

**Files:** Verify only.

- [ ] **Step 1: Fingerprint the user-owned generated file and run full checks**

\`\`\`powershell
$blogManifestBefore = (Get-FileHash -Algorithm SHA256 -LiteralPath 'src\generated\blogManifest.json').Hash
npm.cmd run lint
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npm.cmd test
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git diff --check
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
$blogManifestAfter = (Get-FileHash -Algorithm SHA256 -LiteralPath 'src\generated\blogManifest.json').Hash
if ($blogManifestBefore -ne $blogManifestAfter) { throw 'blogManifest changed during validation' }
\`\`\`

Expected: lint, full suite, and diff check pass; report current test totals; manifest hashes match.

- [ ] **Step 2: Build without content sync and verify prerender output**

\`\`\`powershell
$blogManifestBefore = (Get-FileHash -Algorithm SHA256 -LiteralPath 'src\generated\blogManifest.json').Hash
npm.cmd run build:site
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npm.cmd run verify:html
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
$sourceMaps = Get-ChildItem -LiteralPath 'dist' -Recurse -File -Filter '*.map'
if ($sourceMaps.Count -ne 0) { throw "Public source maps found: $($sourceMaps.FullName -join ', ')" }
$blogManifestAfter = (Get-FileHash -Algorithm SHA256 -LiteralPath 'src\generated\blogManifest.json').Hash
if ($blogManifestBefore -ne $blogManifestAfter) { throw 'blogManifest changed during build validation' }
\`\`\`

Expected: build, HTML verification, and source-map scan pass; manifest hashes match. Inspect any sitemap drift before taking action.

- [ ] **Step 3: Run responsive browser QA**

Start:

\`\`\`powershell
npm.cmd run preview -- --host 127.0.0.1 --port 4173
\`\`\`

Inspect \`/\`, \`/brands/raw-radicles\`, \`/branding\`, \`/blogs\`, an existing \`/blogs/*\`, \`/contact\`, and \`/start\` at widths 320, 375, 414, 768, 1024, 1039, 1040, 1280, and 1440 (mobile height 844; desktop height 900).

Verify:

- no collision, clipping, or horizontal overflow;
- 1040+ shows desktop and 1039- shows mobile;
- panels stay in viewport and descriptors remain legible;
- touch needs no hover;
- keyboard Tab/Enter/Space/Escape and focus return work;
- mobile focus trap/backdrop/body lock work;
- route-family active states and mobile auto-expansion are correct;
- 11px scroll stays open and 12px closes while header remains visible;
- 200% zoom switches before overlap;
- reduced motion removes movement without changing behavior;
- no console errors/warnings or broken navigation.

- [ ] **Step 4: Final scope audit**

\`\`\`powershell
git status --short
git diff --check
git diff -- src/generated/blogManifest.json
\`\`\`

Expected: only seven planned paths plus the unchanged pre-existing manifest diff. Stop without committing, pushing, merging, or deploying.

## Acceptance criteria

- Desktop reads Company, Capabilities, Insights, Contact, Start a project; no Home text, Blogs label, or Raw Radicles header item.
- Company/Capabilities are native disclosure buttons with correct ARIA, ordinary nested links, one-open state, click-again, outside, Escape/focus, route, scroll, and breakpoint closure.
- Exact descriptors and Branding → Marketing → E-commerce order are present.
- Current persistent floating shell remains visible and keeps its geometry/breakpoint.
- Mobile uses the same model as accordions, direct links, and separate CTA; active parents open automatically.
- Exact routes use \`page\`; route-family ancestors use \`location\`.
- Panels are compact, opaque, high-contrast, image-free, and restrained; reduced motion is honored.
- Focused/full tests, lint, \`build:site\`, \`verify:html\`, source-map scan, diff check, and responsive/keyboard/touch/zoom QA pass.
- \`src/generated/blogManifest.json\` retains its pre-execution hash; no unrelated files, dependencies, routes, history, push, merge, or deployment change.

## Risks

- The supplied research mentions an older hide/reveal header, but current \`258c26d\` intentionally uses a persistent compact shell. Never restore \`header-lifted\` or \`header-hidden\`.
- Normal build/sync commands rewrite the manifest. Use \`build:site\` and compare hashes.
- Hidden accordion links can leak into the focus trap. Keep \`hidden\` and filter hidden ancestors.
- Prefix matches can overmatch names such as \`/branding-other\`. Require a slash boundary.
- Panel clipping is most likely at 1040px and 200% zoom; both are mandatory QA gates.
- Gold can become noisy; keep it to CTA/current/hover/focus per DESIGN.md's rarity rule.

## Execution handoff

Execution is already selected: Luna/max, task-by-task RED → GREEN. Recheck \`git status --short\` and fingerprint \`src/generated/blogManifest.json\` before Task 1. Do not commit, push, merge, or deploy.
