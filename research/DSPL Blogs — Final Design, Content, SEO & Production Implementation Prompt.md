You are working on the **Dashapatmaja Solutions Pvt Ltd (DSPL)** React/Vite website.

Your task is to **fully activate, redesign, populate, prerender, test, and production-harden the Blogs/Insights section**.

This is not just a CSS redesign. Treat it as a complete publication launch covering:

- editorial design
- article content
- responsive UX
- accessibility
- React routing
- SSG/prerendering
- SEO metadata
- structured data
- hydration
- regression tests
- production verification

Do not make unrelated changes.

---

# 0. Safety and repository rules

Before editing anything:

1. Run:
   - `git status --short`
   - `git branch --show-current`
   - `git log -1 --oneline`

2. Do not automatically switch branches, reset files, discard changes, or overwrite unrelated work.

3. Read the repository context before editing:
   - `DESIGN.md`
   - `PRODUCT.md`
   - `README.md`
   - `CONTRIBUTING.md`
   - `ROADMAP.md`
   - relevant source/tests

4. Treat the current DSPL design system as authoritative.

5. Do not invent a new visual identity for Blogs.

6. Do not perform a broad design-token or global CSS refactor as part of this task.

7. Do not commit or push until the implementation, tests, build, prerender verification, and visual QA are complete.

8. At the end, report what changed and wait for review before committing/pushing unless I explicitly instruct otherwise.

---

# 1. Research the references before editing

Inspect these current reference sites/pages in a browser before designing:

- Cartesia Blog
- Ploy Blog
- Mobbin → Discover Sites → Latest
- Interbrand → Thinking
- Stripe Blog
- Linear → Now

Use them for **patterns and hierarchy only**.

Do not clone any site.

Do not copy their branding, colors, components, exact grids, wording, illustrations, or animations.

## What to learn from each

### Cartesia

Study:

- clean publication heading
- strong latest/featured-story hierarchy
- category taxonomy
- restrained metadata
- article breadcrumb/category treatment
- author/date area
- long-form article rhythm
- table of contents
- clear heading hierarchy

Use the structural lessons.

Do not make DSPL look like an AI developer product.

### Ploy

Study:

- confident oversized editorial typography
- clear date + reading-time metadata
- strong story titles
- direct `Read story →` treatment
- simple scanning rhythm
- publication intro

Do **not** copy its high-volume SEO/listicle content strategy.

DSPL should publish fewer, more thoughtful pieces.

### Interbrand

This is particularly relevant to DSPL.

Study:

- consultancy/editorial voice
- ideas presented as thinking rather than generic blog content
- restrained visual presentation
- strong typography
- category/content hierarchy
- brand expertise communicated through thoughtful writing

DSPL should feel closer to a thoughtful **brand/commerce consultancy publication** than a SaaS content-marketing blog.

### Stripe

Study for future scalability:

- dominant featured article
- clear category system
- metadata
- content hierarchy
- strong article previews
- ability to expand to many posts without redesigning the entire system

Do not implement all of Stripe's complexity for only two articles.

### Linear

Study:

- restrained metadata
- list rhythm
- minimal UI chrome
- strong typography
- small visual distinctions rather than excessive cards

### Mobbin

Use Mobbin only as a pattern-research source.

Look for:

- editorial landing pages
- publication indexes
- asymmetric content grids
- clean article lists
- thoughtful responsive transformations
- typography-led layouts

Again: understand patterns, do not copy screenshots.

---

# 2. Core design objective

Turn `/blogs` into a small DSPL editorial publication visually called:

# Insights

The page must feel like a natural extension of the redesigned DSPL homepage and brand system.

Desired character:

- editorial
- composed
- intelligent
- premium
- restrained
- typography-first
- spacious
- operational rather than promotional

It must **not** look like:

- a generic SaaS blog template
- Medium
- a CMS starter theme
- a content farm
- a bento dashboard
- a grid of identical rounded cards
- an AI-company clone
- a design-agency gimmick page

The reading experience itself should communicate quality.

---

# 3. Preserve the existing DSPL visual language

Use the existing DSPL tokens and visual system.

The current identity is based around:

- warm ivory / linen-like surfaces
- deep navy / near-black
- restrained accessible bronze
- editorial typography
- subtle rules
- generous negative space
- limited radius
- restrained motion

Do not introduce unrelated neon colors, purple AI gradients, glassmorphism, excessive shadows or a new design system.

Read `DESIGN.md` before deciding exact values.

Reuse existing tokens where possible rather than adding arbitrary hard-coded colors.

---

# 4. Important anti-patterns

Avoid all of the following:

- giant decorative uppercase eyebrow above every section
- excessive pill badges
- rounded cards everywhere
- gradients used merely to make a blank area interesting
- glassmorphism
- thick orange/gold borders
- multiple shadows
- shimmer
- floating cards
- marquee animation
- fake testimonials
- fake authors
- fake metrics
- fake case-study results
- fake clients
- fake awards
- stock imagery added solely because "blogs need images"
- AI-generated packaging or fake DSPL work
- decorative icons beside every heading
- excessive scroll animation
- hover effects that physically move large content blocks
- underlined text links that resemble browser-default styling
- repeated `Learn more` CTAs

Use typography, scale, spacing and alignment to create hierarchy.

---

# 5. Launch content strategy

Keep the existing publication gate:

`BLOG_MINIMUM_POSTS = 2`

Do not weaken it.

The blog becomes publicly enabled only when there are at least two approved articles.

Publish exactly **two strong launch articles**.

---

# 6. Article 1

Use:

**Slug**

`coordinating-brand-market-commerce`

**Title**

`Coordinating Brand, Market, and Commerce as One System`

**Category**

`Branding`

**Published date**

`2026-08-20`

**Status**

`approved`

Suggested description:

`Why positioning, market execution, and commerce operations work better when they share context, decisions, and feedback instead of operating as disconnected handoffs.`

## Editorial objective

Explain DSPL's view that:

- brand
- market
- commerce

should operate as a coordinated system rather than isolated departments or vendors.

Possible sections:

1. Why the handoffs matter
2. Brand decisions create downstream consequences
3. Market feedback should travel backwards
4. Commerce is part of the brand experience
5. Shared operating context reduces rework
6. What coordinated execution looks like

Target approximately **1,200–1,600 useful words**.

Do not pad it simply to reach word count.

---

# 7. Article 2

Use:

**Slug**

`from-packaging-to-purchase`

**Title**

`From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter`

**Category**

`E-commerce`

**Published date**

`2026-08-20`

**Status**

`approved`

Suggested description:

`A practical look at how packaging, product information, catalogue assets, channel setup, checkout, fulfilment, and measurement connect during a consumer-brand launch.`

Possible sections:

1. A launch is a chain, not a moment
2. Packaging becomes operational data
3. Product information must survive every channel
4. Catalogue and marketplace readiness
5. Checkout and fulfilment complete the promise
6. Measurement closes the loop

Target approximately **1,100–1,500 useful words**.

---

# 8. Content integrity rules

This is extremely important.

Use existing DSPL source material as the factual basis for both articles.

Inspect:

- Home
- Branding
- Marketing
- E-commerce
- Brands
- Raw Radicles
- About
- existing company facts
- current service copy

The articles may express principles and operational observations.

They must not invent:

- revenue numbers
- conversion improvements
- growth percentages
- campaign results
- client results
- customer counts
- sales volumes
- market share
- ROI
- regulatory certifications
- awards
- partnerships
- endorsements
- specific Raw Radicles commercial outcomes

Do not turn Raw Radicles into a fabricated quantified case study.

Where Raw Radicles is relevant, describe it only within what current DSPL source material supports: direct operating experience across consumer-brand development, packaging, presentation, commerce and related coordination.

The writing should sound like a thoughtful operator explaining a system—not SEO copy stuffed with keywords.

Avoid phrases such as:

- "In today's fast-paced digital landscape"
- "unlock your brand's full potential"
- "game-changing"
- "revolutionary"
- "in an ever-evolving marketplace"
- "one-stop solution"
- generic AI prose

Use concrete language.

---

# 9. Improve the publication schema

Inspect:

`src/content/publication.js`

and all consumers/tests before changing anything.

The UI currently relies on article category, so make sure the documented schema accurately represents the data actually used.

The canonical article record should support at least:

- slug
- title
- description
- category
- publishedAt
- status
- sections

Do not introduce fields without a clear consumer.

---

# 10. Reading-time metadata

Add a small deterministic utility to calculate estimated reading time from the actual article text.

Do not manually hard-code:

`7 min read`

unless there is a strong architectural reason.

Use a normal, documented word-per-minute assumption.

Round sensibly.

Expose:

`X min read`

in article previews and article headers.

Add tests for the utility.

Do not add unnecessary dependencies for this.

---

# 11. Blogs index redesign

Primary files likely include:

- `src/pages/Blogs.jsx`
- `src/pages/Blogs.css`

Inspect first. Do not assume nothing else is involved.

## Hero

Do not use another homepage-sized marketing hero.

Use a quieter publication opening.

Recommended composition:

`Insights`

as the main H1.

Supporting line:

`Thinking from the work of building brands.`

Then a short restrained introduction such as:

`Notes on branding, market execution, commerce, and the operating decisions that connect them.`

Refine wording if required, but remain factual and concise.

No giant decorative graphic is required.

---

# 12. Two-article launch layout

There are only two articles.

Do **not** show:

- search
- `All / Branding / Marketing / E-commerce` filter pills
- pagination
- category dropdowns
- archive controls

at launch.

These controls are unjustified with two stories.

Instead create an asymmetric editorial layout.

## Desktop concept

Use approximately:

- dominant feature story: 60–65%
- supporting story: 35–40%

or another carefully balanced editorial grid justified by the actual container.

The feature article must clearly dominate.

Possible structure:

**Feature**

01  
Branding · 6 min read  
Large title  
Description  
August 20, 2026  
Read article →

**Supporting**

02  
E-commerce · 5 min read  
Title  
Description  
August 20, 2026  
Read article →

Do not blindly use those exact read times—derive them.

---

# 13. No fake image requirement

The current archive does not need generic blog imagery simply to look complete.

For v1 prefer:

- typography
- subtle surface contrast
- article index numbers
- borders/rules
- negative space

over irrelevant imagery.

If an existing asset is genuinely semantically connected to an article and improves the design, you may propose it.

Do not reuse random service-page hero photos.

Do not generate fake case-study imagery.

If no image is clearly justified, launch typography-first.

That is acceptable and preferred.

---

# 14. Card treatment

Do not create two generic cards like:

`background + border + 16px radius + shadow`.

Use editorial blocks.

Prefer:

- thin rules
- surface shifts
- strong type scale
- content alignment
- negative space

If radius is used, keep it restrained and consistent with `DESIGN.md`.

Make the entire article preview semantically clickable only if accessibility and interaction remain correct.

Visible focus styles are required.

Hover state should be subtle.

Possible hover changes:

- title color
- arrow translation of only a few pixels
- rule/accent change

Do not animate the entire card upward.

---

# 15. Mobile index

At mobile sizes:

- stack feature and supporting story
- preserve hierarchy
- avoid tiny metadata
- prevent title overflow
- use natural line wrapping
- maintain comfortable horizontal padding
- do not force desktop aspect ratios
- do not retain large empty decorative areas

Test at minimum:

- 320px
- 375px
- 414px
- 768px
- 1024px
- 1280px
- 1440px

No horizontal scrolling.

---

# 16. Article page redesign

Primary files likely include:

- `src/pages/BlogPost.jsx`
- `src/pages/BlogPost.css`
- `src/pages/blogPostModel.js`

Inspect before editing.

The article page should feel closer to a high-quality journal than a service page.

---

# 17. Article header

Recommended structure:

`Insights / Branding`

# Article title

Article description/standfirst

`August 20, 2026 · X min read`

Do not display the raw ISO date to users.

Use `<time dateTime="">` semantically.

Use natural human-readable formatting.

No fake author portrait.

If DSPL has no approved named article author, do not invent one.

The publisher may be represented through structured data rather than adding a fictional byline.

---

# 18. Article typography

Desktop title:

Large and editorial, but not comically oversized.

Use responsive `clamp()` sizing consistent with current DSPL title scale.

The title should have:

- deliberate line breaks resulting naturally from width
- tight but readable tracking
- strong line height
- controlled max width

Do not hard-code `<br>` tags simply to force a screenshot composition unless linguistically necessary.

---

# 19. Reading column

Body text should be intentionally narrower than the overall site container.

Target approximately:

`680–760px`

depending on the site's actual font.

Optimize for roughly 60–75 characters per line.

Body copy should have generous leading.

Do not stretch paragraphs across a 1200px container.

---

# 20. Lead paragraph

Treat the description/standfirst as a proper editorial lead.

It should be visibly larger than body text but smaller than the title.

Give it enough spacing before the main article begins.

---

# 21. Table of contents

Take inspiration from Cartesia's long-form structure.

Generate an accessible table of contents from the article section headings.

Requirements:

- automatically derives from actual sections
- stable IDs generated from headings
- anchor links
- visible keyboard focus
- no duplicate IDs
- active-scroll tracking is optional and should not be implemented unless it remains simple and robust

Desktop may use a restrained two-column composition:

left:
- table of contents

right:
- article

The TOC may be sticky on sufficiently wide screens.

On mobile:

- place TOC before the article
- make it naturally collapsible only if necessary
- do not create a complicated JavaScript disclosure merely for visual effect

If the resulting design becomes visually busy, keep the TOC static.

---

# 22. Article sections

Each section should use semantic `<section>` markup where appropriate.

Use:

- H2
- paragraphs
- occasional lists only where the writing genuinely requires a list
- pull quote only if the article contains a genuinely meaningful statement worth isolating

Do not add decorative pull quotes merely to imitate a magazine.

Avoid wrapping each section in a card.

Use spacing and thin rules.

---

# 23. End of article

After the article body include a quiet related-story area.

Example:

`Continue reading`

Show the other approved article.

Do not create a huge recommendation carousel for only one related piece.

Below or beside it, a restrained DSPL action may appear:

`Start a project →`

linking to the existing `/start` route.

Do not insert a large sales banner that destroys the reading experience.

---

# 24. Blog navigation state

Once the blog publication gate opens:

- Blogs/Insights must become available in the primary navigation according to the existing intended Header architecture.
- mobile and desktop navigation must behave consistently.
- current-page state should work.
- keyboard accessibility must remain correct.

Update tests accordingly.

Do not add duplicate nav entries.

---

# 25. Publication gate must control discoverability

The current design intentionally keeps Blogs staged until enough approved content exists.

Preserve this architecture.

Once two approved posts exist:

`blogsEnabled === true`

must control all relevant behavior consistently.

This includes:

- Header visibility
- blog availability
- SEO/indexability
- prerendering
- route discovery where applicable

Avoid a situation where the Header says Blogs are live but the emitted HTML still says `noindex`.

---

# 26. Fix `/blogs` SEO activation

Inspect:

`src/seo/routeMetadata.js`

Currently `/blogs` metadata exists but Blogs are intentionally excluded from the normal indexed public route system.

When the publication gate is open:

`/blogs`

must emit:

`robots: index, follow`

and a correct self-referencing canonical.

Do not permanently make Blogs indexable if the publication gate later closes.

Keep staged behavior coherent.

---

# 27. Dynamic article SEO

Each approved article must have:

- unique `<title>`
- unique meta description
- canonical `/blogs/<slug>`
- `robots: index, follow`
- `og:type = article`
- OG title
- OG description
- OG URL
- OG image
- Twitter card metadata

Do not reuse `/blogs` metadata blindly where article-specific values are required.

Keep canonical URL generation tied to `SITE_CONFIG`.

Do not duplicate the production domain across multiple modules.

---

# 28. BlogPosting structured data

Upgrade article structured data.

Approved article pages should emit valid `BlogPosting` or appropriate `Article` JSON-LD with at least:

- `@context`
- `@type`
- `headline`
- `description`
- `datePublished`
- `mainEntityOfPage`
- `url`
- publisher Organization
- publisher logo where valid
- image using the existing approved DSPL default OG image if there is no genuine article-specific image

Use existing canonical company/site configuration.

Do not fabricate:

- author credentials
- dates
- images
- organizations

Preserve Organization structured data where appropriate.

Avoid duplicate conflicting schemas.

---

# 29. Prerender the blog index

Inspect:

`src/entry-prerender.jsx`

The existing prerender setup does not currently fully treat Blogs as production content.

Add the necessary page wiring.

`/blogs`

must produce a real static file:

`dist/blogs/index.html`

containing meaningful prerendered content, not an empty root shell.

---

# 30. Prerender every approved article

Both launch articles must produce:

- `dist/blogs/coordinating-brand-market-commerce/index.html`
- `dist/blogs/from-packaging-to-purchase/index.html`

Article prerender routes should be **derived from approved publication data**, not duplicated manually in several unrelated arrays.

Create a small reusable helper if appropriate, for example:

- approved posts
- approved blog paths
- `isPublishedBlogRoute(pathname)`
- `getBlogPostBySlug(slug)`

Do not create circular imports.

---

# 31. Fix dynamic metadata resolution during prerender

The current static metadata resolver understands fixed routes.

A pathname such as:

`/blogs/coordinating-brand-market-commerce`

must not be blindly passed into a fixed-route lookup that will throw.

Resolve article route metadata using the actual blog record.

Keep static routes using the normal static metadata function.

Handle unknown slugs as 404/not-found behavior.

---

# 32. Fix hydration recognition

Inspect:

`src/hydrationRoute.js`

The existing prerender-hydration logic is based on known static public routes.

Approved blog article routes must also be recognised as valid prerendered pages.

Otherwise React may discard correct server-generated article markup and client-render unnecessarily.

Create a clear abstraction such as:

`isPrerenderedRoute(pathname)`

rather than scattering conditions.

It should recognise:

- normal public routes
- `/blogs` when enabled
- approved `/blogs/:slug` routes

and reject:

- unapproved posts
- unknown blog slugs

Add regression tests.

---

# 33. App routing

Inspect:

- `src/App.jsx`
- `src/AppRoutes.jsx`

Preserve existing lazy/hydration architecture.

Do not replace the router merely to implement Blogs.

Unknown blog slugs must produce the intended Not Found behavior.

No blank page.

No console errors.

---

# 34. Vite prerender configuration

Inspect:

`vite.config.js`

The current prerender architecture includes fixed additional routes.

Integrate Blogs using the project's existing prerender plugin correctly.

Prefer deriving approved article links through the prerender crawler/returned links where supported rather than copying every slug into hard-coded config.

Make the architecture maintainable for article #3, #4, #5, etc.

Adding a future approved article to the publication data should require as little infrastructure editing as possible.

---

# 35. Update prerender verification

Inspect:

`scripts/verify-prerender.mjs`

Extend it so production verification covers:

## Blog index

Confirm:

- emitted HTML exists
- non-empty `<main>`
- correct H1
- canonical
- `index, follow`
- unique title
- correct OG metadata
- structured data
- no duplicate head tags

## Both article pages

Confirm:

- emitted static HTML exists
- correct H1 title
- correct canonical
- `index, follow`
- article-specific title
- article description
- `og:type="article"`
- valid JSON-LD
- `BlogPosting`/Article schema
- publication date
- DSPL publisher
- no duplicate critical head tags

Do not weaken existing checks for other pages.

---

# 36. Sitemap

Inspect the current sitemap implementation.

Once Blogs are approved and public:

include:

- `/blogs`
- both approved article URLs

Do not manually create inconsistent dates.

If sitemap generation is static in this project, update it carefully.

If an existing generation mechanism exists, integrate with it instead.

Do not expose draft/unapproved posts.

---

# 37. Accessibility

Maintain WCAG-oriented behavior.

Check:

- one H1 per page
- logical H2 hierarchy
- semantic `<article>`
- semantic `<section>`
- `<time dateTime>`
- visible focus
- sufficient contrast
- keyboard-accessible article links
- TOC anchors
- no color-only meaning
- `aria-current` where appropriate
- proper focus behavior in mobile navigation
- reduced-motion preferences

Any decorative article number such as `01` should not pollute screen-reader output if it adds no semantic value.

---

# 38. Motion

Use almost none.

Permitted:

- subtle opacity/translate entrance if already consistent with the DSPL system
- tiny arrow movement
- restrained color/rule transition

Do not introduce:

- parallax
- text reveal gimmicks
- scroll hijacking
- animated gradients
- marquee
- floating article cards
- continuous motion

Respect `prefers-reduced-motion`.

---

# 39. Performance

The blog should remain lightweight.

Do not add:

- another animation library
- a markdown renderer unless genuinely necessary
- a rich text editor
- a search dependency
- a date library simply to format one date
- a TOC package
- a reading-time package

Implement these small needs locally.

Avoid loading unrelated large service-page images on Blogs.

No WebGL is required.

---

# 40. Tests that must be reviewed

Do not update only two assertions.

Search the entire repository for Blog staging assumptions.

At minimum inspect/update where relevant:

- `src/content/__tests__/publication.test.js`
- `src/components/__tests__/Header.test.jsx`
- `src/pages/__tests__/Blogs.test.jsx`
- `src/pages/__tests__/BlogPost.test.jsx`
- `src/seo/__tests__/routeMetadata.test.js`
- `src/__tests__/hydrationRoute.test.js`
- `src/__tests__/designSystemRegression.test.js`
- any route-stub tests
- any sitemap/prerender tests
- `scripts/verify-prerender.mjs`

Search globally for:

- `blogsEnabled`
- `/blogs`
- `noindex`
- `BLOG_MINIMUM_POSTS`
- assumptions that Blogs are intentionally staged
- assumptions that `/blogs` is excluded from prerender
- assertions that `vite.config.js` must not include Blogs

Update tests to express the **new intended architecture**, not merely to silence failures.

---

# 41. New regression cases

Add tests for at least:

1. two approved posts enable Blogs
2. one approved post does not
3. draft/unapproved posts do not count
4. Header shows Blogs when enabled
5. `/blogs` metadata becomes indexable when enabled
6. each approved post produces unique metadata
7. normalized slug resolution
8. unknown blog slug returns not-found behavior
9. approved article paths are considered prerendered routes
10. unapproved/unknown article paths are not
11. reading-time calculation
12. formatted dates remain semantically correct
13. Blogs index renders both approved posts
14. article page renders sections
15. article page TOC points to valid section IDs
16. article structured data contains expected publisher/date/headline

Use existing testing patterns.

---

# 42. Responsive browser QA

After code-level tests pass, visually inspect the real rendered site.

Test `/blogs` at:

- 320 × 568
- 375 × 812
- 414 × 896
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900

Test both article pages at:

- 320
- 375
- 768
- 1024
- 1440 widths

Check:

- no horizontal overflow
- clean title wrapping
- line length
- metadata legibility
- asymmetric layout balance
- TOC behavior
- sticky TOC does not collide with sticky Header
- footer transition
- focus state
- article rhythm
- no orphaned giant whitespace
- no tiny text
- no accidental card-grid appearance

---

# 43. Compare against the rest of DSPL

Before considering Blogs finished, open:

- Home
- About
- Branding
- Marketing
- E-commerce
- Brands
- Raw Radicles
- Contact

Blogs should clearly belong to the same website.

Check particularly:

- container width
- typography
- spacing
- bronze usage
- navy
- ivory
- borders
- Header
- Footer
- title scaling

Do not redesign those pages.

---

# 44. Visual quality standard

Ask these questions during QA:

### Does `/blogs` look intentionally designed with only two articles?

If it looks empty, improve composition—not by adding fake content.

### Does Article 1 clearly dominate?

It should.

### Are the articles readable for ten minutes?

Reading comfort matters more than decorative impact.

### Would removing all shadows break the design?

Ideally no.

### Would removing all animation break the design?

Definitely no.

### Is the layout recognisably DSPL?

It must be.

### Does it look like Cartesia/Ploy?

It should show lessons learned but **not** look copied.

---

# 45. Future-ready behavior

Design v1 so later articles can be added without a redesign.

But do not prematurely expose controls.

A sensible future threshold is around 5–6 articles before introducing:

- category filtering
- search
- archive browsing

Do not implement dormant complex search UI now unless the existing architecture requires it.

The publication data should already support categories, so later expansion should be straightforward.

---

# 46. Commands to run after implementation

Run all of these:

```bash
npm run lint
npm run test
npm run build
npm run verify:html
```

All must pass.

Do not report an old hard-coded test count.

Report the actual result.

Also run:

```bash
git status --short
git diff --stat
```

Then inspect the relevant source diff.

---

# 47. Inspect emitted production HTML directly

Do not trust the build command alone.

Inspect:

```text
dist/blogs/index.html
dist/blogs/coordinating-brand-market-commerce/index.html
dist/blogs/from-packaging-to-purchase/index.html
```

Confirm actual HTML contains:

- visible article content
- H1
- meta description
- canonical
- robots
- OG
- Twitter
- JSON-LD

Confirm these are not empty client shells.

---

# 48. Source checks

Search the repository after implementation for obsolete assumptions such as:

- blog must be hidden
- blog must be noindex
- blog must not be prerendered
- empty `blogPosts`
- obsolete filter UI tests

Do not leave contradictory tests/comments behind.

---

# 49. Do not alter unrelated production facts

This task does not authorize changes to:

- CIN
- incorporation date
- address
- phone
- email
- directors/team details
- privacy commitments
- terms
- analytics
- forms
- service claims
- Raw Radicles facts

Use canonical config where required by metadata.

Do not "clean up" unrelated parts of the site while you are here.

---

# 50. Expected files

The final diff will likely involve some combination of:

```text
src/content/publication.js
src/pages/Blogs.jsx
src/pages/Blogs.css
src/pages/BlogPost.jsx
src/pages/BlogPost.css
src/pages/blogPostModel.js
src/components/Header.jsx
src/seo/routeMetadata.js
src/entry-prerender.jsx
src/hydrationRoute.js
src/AppRoutes.jsx
vite.config.js
public/sitemap.xml
scripts/verify-prerender.mjs

plus relevant tests
```

This is only a scope guide.

Do not edit a file merely because it appears in this list.

Inspect dependencies first.

---

# 51. Final acceptance criteria

The task is complete only when all of these are true:

- [ ] Two approved, substantive DSPL articles exist
- [ ] `blogsEnabled` becomes true through the real publication gate
- [ ] Blogs appears correctly in navigation
- [ ] `/blogs` has been redesigned into a premium editorial Insights page
- [ ] feature article has clear visual dominance
- [ ] two-post launch does not show unnecessary search/filter controls
- [ ] design is typography-first and DSPL-native
- [ ] article pages have high-quality long-form reading layouts
- [ ] table of contents works
- [ ] dates are human-readable and semantic
- [ ] reading time is derived from content
- [ ] no fake authors/results/metrics/images are introduced
- [ ] `/blogs` is indexable when publication is open
- [ ] article pages have unique metadata
- [ ] BlogPosting/Article structured data is valid
- [ ] `/blogs` is statically prerendered
- [ ] both article slugs are statically prerendered
- [ ] approved blog routes hydrate existing prerendered markup correctly
- [ ] unknown slugs behave as 404
- [ ] sitemap contains only approved public blog URLs
- [ ] all existing non-blog pages remain visually and functionally unchanged
- [ ] responsive QA passes at all required widths
- [ ] accessibility is preserved
- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] `npm run verify:html` passes
- [ ] emitted production HTML has been manually inspected
- [ ] Git diff contains no unrelated modifications

---

# 52. Final report format

When finished, do not just say "implemented successfully."

Give me:

## A. Design changes

Explain:

- index composition
- typography hierarchy
- feature/supporting article hierarchy
- responsive behavior
- article reading layout
- TOC treatment
- hover/focus behavior

## B. Content

List:

- both article titles
- slugs
- categories
- publication dates
- calculated reading times
- section headings

## C. Architecture

Explain:

- publication gate
- approved-post helpers
- routing
- prerender route generation
- hydration recognition
- dynamic metadata resolution

## D. SEO

For `/blogs` and each article report:

- title
- canonical
- robots
- OG type
- structured-data type

## E. Tests

Report:

- lint result
- number of test files passed
- number of tests passed
- build result
- prerender verification result

## F. Production files

Confirm existence of:

- `dist/blogs/index.html`
- Article 1 HTML
- Article 2 HTML

## G. Browser QA

Report all tested viewports and any visual issue discovered/fixed.

## H. Git

Report:

- branch
- `git status --short`
- `git diff --stat`

Do not commit or push until I review this report.

---

# Final principle

Do not make the Blog page impressive by adding more things.

Make it impressive by making the **hierarchy, typography, spacing, writing and reading experience unusually well resolved**.

Borrow Cartesia's long-form discipline, Ploy's confidence, Interbrand's consultancy/editorial restraint, Stripe's scalable content architecture, Linear's simplicity, and the pattern diversity visible through Mobbin.

Then translate those lessons into **DSPL**, rather than translating DSPL into one of those websites.