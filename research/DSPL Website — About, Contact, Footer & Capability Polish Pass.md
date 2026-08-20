# DSPL Website — About, Contact, Footer & Capability Polish Pass

Implement the following coordinated refinement on the existing Dashapatmaja Solutions Pvt Ltd React website.

## Working rules

1. Before editing, run:
   - `git status --short`
   - `git branch --show-current`
2. Preserve all existing unrelated work. Do not reset, checkout over, or overwrite unrelated modifications.
3. Do not merge, commit, or push unless explicitly asked after verification.
4. Do not invent company facts, dates, achievements, partnerships, locations, statistics, certifications, claims, prices, or commercial promises.
5. Treat the factual corrections in this brief as authoritative for this implementation.
6. Reuse the existing DSPL design system and CSS variables. Do not introduce a new visual identity.
7. Maintain accessibility, keyboard navigation, semantic structure, reduced-motion handling, and existing responsive behaviour.
8. Keep the existing legal/statutory facts in the canonical configuration even where they are being removed from footer presentation.
9. Do not introduce new external libraries or new image assets for this pass.

---

# 1. Canonical contact and incubation data

Update:

`src/content/companyFacts.js`

## Contact data

Keep the existing:

- `directorEmail: 'director@dashapatmaja.in'`
- primary phone: `+91 88619 42440`
- secondary phone: `+91 90725 56665`

Add a canonical project/operations email:

`projectEmail: 'dsplmanipal@gmail.com'`

Use this value through `COMPANY_FACTS` wherever it is rendered. Do not hard-code it separately in Contact or Footer.

## Incubation correction

The current `incubation.centre: 'GoK Bioincubator, Manipal'` is no longer correct for the company-history presentation.

The 2023 incubation is:

**MUTBI, MAHE, Manipal**

The existing canonical fields already identify:

- Manipal Universal Technology Business Incubator (MUTBI)
- Manipal Academy of Higher Education (MAHE)

Remove or correct the stale `GoK Bioincubator, Manipal` centre value so it cannot accidentally be rendered again.

Do not alter the existing CIN or incorporation date.

---

# 2. About page — Vision, Mission and Values

Files:

- `src/pages/About.jsx`
- `src/pages/About.css`

Replace the current direction-card content:

- Company and operating team
- Long-term direction
- Operating principles

with:

### Vision
Title: `Where we are going`

Copy:

`Build a focused portfolio of consumer brands supported by disciplined commercial systems.`

### Mission
Title: `What we do`

Copy:

`Develop and operate DSPL-owned brands while helping businesses coordinate branding, marketing, e-commerce, and implementation through clearly defined scopes.`

### Values
Title: `How we work`

Copy:

`Clarity, evidence, accountability, and practical coordination guide how we make decisions, define responsibilities, and deliver work.`

Keep the section heading:

`What guides our work`

## Visual direction

Do not turn Vision / Mission / Values into oversized decorative cards.

Prefer a restrained editorial three-column treatment on desktop:

- transparent or existing section background
- subtle top/bottom or vertical hairline separators
- no heavy shadow
- no iconography
- compact vertical rhythm
- labels use the existing bronze/accent text treatment
- typography remains within the DSPL design system

Stack cleanly on smaller screens.

---

# 3. About page — company timeline corrections

Update the existing `journeyMilestones`.

## 2023

Year: `2023`

Title:

`First incubation`

Primary copy:

`Incubated at MUTBI, MAHE, Manipal, where we established our base.`

Reference text:

`MUTBI / MAHE, Manipal`

Remove all visible references to:

`GoK Bioincubator, Manipal`

## 2024

Keep:

Year: `2024`

Title:

`First brand`

Change:

`Launched Raw Radicles, a premium chocolate brand with Ayurveda inside.`

to:

`Launched Raw Radicles, a premium chocolate brand infused with Ayurveda.`

Keep the existing factual second sentence about building the product, packaging, and supply chain.

## 2025

Remove the MUTBI/MAHE incubation event from 2025 because incubation is now recorded in 2023.

Remove the Amruthanjali Ayurveda MOU from 2025.

Make 2025 specifically about the NIDHI-PRAYAS support/grant.

Use a concise title such as:

`NIDHI-PRAYAS support`

Keep only the existing substantiated NIDHI-PRAYAS milestone. Do not invent an amount or additional grant details.

The 2025 reference area should no longer imply that MUTBI incubation began in 2025.

## 2026

Keep the existing services-arm milestone.

Move the following factual milestone from 2025 to 2026:

`Signed a Memorandum of Understanding with Amruthanjali Ayurveda for manufacturing.`

Use a clear title such as:

`Services and manufacturing partnership`

The 2026 items should communicate:

- DSPL opened branding, marketing, and e-commerce services to outside clients.
- DSPL signed the manufacturing MOU with Amruthanjali Ayurveda.

Do not invent an Amruthanjali logo. If a visual reference is needed and no approved logo exists in the repo, use restrained text only.

---

# 4. Meet Our Team — compact desktop section

The six-member Team section currently occupies too much vertical height.

Goal:

At normal desktop sizes, the section heading plus all six team profiles should comfortably fit in approximately one viewport when the top of the Team section is aligned with the viewport.

Do not achieve this by making text unreasonably small or by removing substantive information.

## Desktop layout

Maintain:

`3 columns × 2 rows`

But redesign each `.team-card` as a compact profile layout that uses horizontal space more effectively.

Recommended structure:

- portrait approximately 88–96px
- portrait on the left
- name and role alongside the portrait
- short biography below, using the usable card width
- LinkedIn action incorporated discreetly into the identity area
- preserve a minimum accessible interaction target for the LinkedIn link
- remove unnecessary large vertical gaps
- reduce excessive card padding
- reduce grid gap
- no content clipping
- no text truncation

The current large 8rem portrait + 40px top padding + 50px name reservation creates unnecessary height. Refactor rather than simply scaling the entire card.

## Approved shorter biographies

### Dr. Manu Sudhi
`Provides governance and strategic direction across DSPL.`

### Dr. Shreepathy Rangabhatta R
`Leads executive management, operations, and project delivery.`

### Dr. Anusha Pai
`Guides healthcare and product decisions for consumer brand development.`

### Dr. Balakrishna S. Maddodi
`Advises on environmental management, sustainability, and academic development.`

### Mr. Namesh Malarout
`Leads technology strategy and digital systems architecture.`

### Dr. Dasharathraj K Shetty
`Advises on innovation, management systems, and enterprise development.`

Do not change names, titles/roles, portraits, or LinkedIn URLs.

## Responsive behaviour

Desktop: 3 × 2 compact layout.

Tablet: use the layout that provides the best readable result, normally 2 columns.

Mobile: one column.

Do not force the one-screen desktop requirement onto mobile.

---

# 5. Contact page — replace icon cards with an editorial directory

Files:

- `src/pages/Contact.jsx`
- `src/pages/Contact.css`

The current three floating white cards and circular icons should be removed.

Remove the Office / New enquiries / Existing projects icon treatment.

Do not replace them with different decorative icons.

## New visual structure

Create one clean contact-directory section using three editorial columns with restrained separators.

No heavy card shadows.

No floating cards.

No circular badges.

Use the same geometry and restrained border language used elsewhere in the DSPL site.

### Column 1

Eyebrow:

`Office`

Heading:

`Manipal office`

Show:

- canonical registered office
- office days / operating availability

### Column 2

Eyebrow:

`New enquiries`

Heading:

`Start a conversation`

Description:

`For new business, partnerships, and general questions.`

Show:

- `COMPANY_FACTS.contacts.primaryPhone`
- `COMPANY_FACTS.contacts.directorEmail`

### Column 3

Eyebrow:

`Existing projects`

Heading:

`Project coordination`

Description:

`For reviews, delivery questions, and active workstreams.`

Show:

- `COMPANY_FACTS.contacts.secondaryPhone`
- `COMPANY_FACTS.contacts.projectEmail`

The project email must therefore display as:

`dsplmanipal@gmail.com`

Retain semantic telephone and mail links.

Keep the existing Contact hero and enquiry form unless styling needs a very small alignment adjustment resulting from the directory redesign.

---

# 6. Footer redesign

Files:

- `src/components/Footer.jsx`
- `src/components/Footer.css`

Remove the entire footer metadata row displaying:

- Incorporated / 28 July 2022
- CIN / U74999KA2022PTC163810
- Incubated at / MUTBI/MAHE
- Supported through / DST-NIDHI PRAYAS

This is a presentation change only.

Do not remove the incorporation date, CIN, MUTBI, MAHE, or NIDHI-PRAYAS data from canonical data or appropriate legal/metadata usage.

## New footer contact area

Create a simpler, typographic footer contact rail after the main footer navigation.

It must expose:

### Emails
- `director@dashapatmaja.in`
- `dsplmanipal@gmail.com`

### Phones
- `+91 88619 42440`
- `+91 90725 56665`

### Office
Use `COMPANY_FACTS.registeredOffice`.

### Hours
Use the canonical operating hours where appropriate.

Avoid another row of decorative icons.

Prefer small headings, text links, thin borders, and deliberate alignment.

The footer should become shorter and cleaner than the current implementation.

Keep:

- logo
- company description
- LinkedIn
- Services links
- Company links
- Legal links
- copyright
- Back to top

---

# 7. Header and Our Brands naming

File:

`src/components/Header.jsx`

Change the visible navigation label:

`Brands`

to:

`Our Brands`

Keep the route:

`/brands`

Verify both desktop and mobile navigation.

Do not rename route paths, React component names, filenames, CSS class names, or internal identifiers merely for this copy change.

---

# 8. Brands-page and Home brand CTA wording

Files likely include:

- `src/pages/Brands.jsx`
- `src/components/home/OwnedBrandProof.jsx`

On the Brands page, change the visible eyebrow:

`DSPL Brands`

to:

`Our Brands`

Do not unnecessarily rewrite the rest of the page.

In the Home Raw Radicles/owned-brand section, change:

`View the project overview`

to:

`Explore our brands`

Because this CTA is plural, change its destination to:

`/brands`

Do not change the dedicated Raw Radicles links elsewhere that explicitly say they open the Raw Radicles project/brand page.

---

# 9. Home coordinated-capabilities section

Files:

- `src/pages/Home.jsx`
- `src/pages/Home.css`

The existing heading:

`One growth system, not three disconnected vendors`

should be replaced with:

`Brand, market, and commerce — coordinated as one system.`

Use this supporting copy:

`Start with the capability you need now, then connect strategy, market activity, and commerce as the business grows.`

Keep the three principal capability columns:

- Branding
- Marketing
- E-commerce

Keep their existing service links.

## Supporting capability redesign

The current Compliance coordination row looks appended rather than integrated.

Redesign it as a deliberate, full-width supporting-capability bridge beneath the three main capabilities.

Preferred visual direction:

- centered within the capability system
- spans the width of the three service columns
- restrained cream or existing secondary background treatment
- thin border/rule rather than a floating card
- no heavy shadow
- generous but controlled spacing
- text width constrained for readability
- two compliance links displayed cleanly alongside or directly beneath each other

Content:

Eyebrow:

`Supporting capability`

Heading:

`Compliance coordination`

Copy:

`Packaging, labelling, listing, and commerce requirements coordinated into the work, with regulated advice retained by qualified advisers.`

Links:

- `Branding compliance`
- `E-commerce compliance`

Preserve their current destinations.

At mobile widths, stack naturally.

---

# 10. Service-page visual refinement

Main file:

`src/components/ServicePage.css`

Inspect `ServicePage.jsx` only if semantic/class separation is needed.

The current CSS groups `.service-detail-grid p` and `.service-detail-disclaimer` into the same padded bordered surface.

This creates a visually awkward card-inside-card effect in Ways to engage and compliance sections.

Separate these styles.

## Service-detail/engagement copy

Normal copy inside each article should generally be:

- direct text beneath the heading
- no secondary inner bordered panel
- no unnecessary nested background
- appropriate text spacing
- existing text colour
- existing DSPL palette

## Ways to engage

Keep:

- Audit and plan
- Monthly programme
- Launch sprint

Change the section description to:

`Choose the engagement shape that matches the scope, evidence, and operating need.`

Do not introduce a new colour palette.

The current DSPL palette is correct. Improve hierarchy rather than changing the brand colours.

## E-commerce compliance disclaimer

Change the current long disclaimer to:

`DSPL coordinates implementation; tax and legal advice remains with the client’s qualified advisers.`

Give the disclaimer its own styling rather than inheriting the article paragraph style.

On normal desktop widths it should naturally fit on one line where space permits.

Do NOT use `white-space: nowrap` in a way that creates overflow.

Allow normal wrapping at narrow widths.

---

# 11. FAQ consistency

Files:

- `src/pages/Branding.jsx`
- `src/pages/Marketing.jsx`
- `src/pages/Ecommerce.jsx`

Marketing already has five FAQs. Preserve them.

Branding currently has three. Increase it to five.

E-commerce currently has three. Increase it to five.

Do not add filler questions simply to reach a number.

## Approved Branding additions

### Question
`Can branding work include packaging?`

Answer:

`Yes, when packaging is in scope. We can coordinate structure, information hierarchy, artwork application, and approved label content, while regulated advice and formal approvals remain with the appropriate qualified professionals.`

### Question
`How do reviews and approvals work?`

Answer:

`The proposal defines review stages, decision-makers, and revision responsibilities so feedback, approvals, and handover remain controlled.`

## Approved E-commerce additions

### Question
`Can product and catalogue setup be included?`

Answer:

`Yes, when included in scope. We can structure product data, variants, collections, content fields, and channel-ready records using approved source information.`

### Question
`What happens after launch?`

Answer:

`Post-launch support can cover agreed fixes, analytics checks, catalogue updates, marketplace coordination, and operating handover. Ongoing support is scoped separately when required.`

Keep the accordion behaviour and accessibility unchanged.

---

# 12. Tests that must be updated

Do not simply weaken or delete regression coverage.

Update tests so they protect the new intended behaviour.

At minimum inspect and adjust:

- `src/pages/__tests__/About.test.jsx`
- `src/components/__tests__/Footer.test.jsx`
- `src/components/__tests__/Header.test.jsx`
- `src/pages/__tests__/Contact.test.jsx`
- `src/pages/__tests__/ServiceCopy.test.jsx`
- `src/__tests__/designSystemRegression.test.js`
- `src/__tests__/canonicalNaming.test.js`

The current suite contains explicit assertions for the old state, including:

- old About direction labels
- absence of Vision/Mission
- GoK Bioincubator
- footer Incorporated/MUTBI/PRAYAS rail
- Header label `Brands`
- three Contact icons
- rejection of `gmail.com`
- only three Branding FAQs
- only three E-commerce FAQs
- `View the project overview`

Replace those assertions with tests for the approved new behaviour.

Add a canonical assertion for:

`COMPANY_FACTS.contacts.projectEmail === 'dsplmanipal@gmail.com'`

Contact tests should verify both phone links and both email links.

Footer tests should verify both phone links and both email links while confirming the obsolete metadata rail is no longer rendered.

About tests should verify:

- Vision
- Mission
- Values
- 2023 MUTBI / MAHE
- Raw Radicles `infused with Ayurveda`
- no GoK Bioincubator text
- no 2025 MUTBI milestone
- Amruthanjali MOU appears under 2026
- all six team members remain present

FAQ regression should require five FAQ items on Branding, Marketing, and E-commerce.

---

# 13. Responsive and visual acceptance criteria

Verify at minimum:

- 320px
- 375px
- 768px
- 1024px
- 1280px
- 1440px

Also specifically inspect Team at common desktop-height viewports such as:

- 1366 × 768
- 1440 × 900

For Team, align the top of the Team section with the viewport before judging the one-screen requirement.

Acceptance criteria:

- all six profiles visible at normal desktop without oversized vertical whitespace
- no clipped names
- no clipped biographies
- no overlapping LinkedIn controls
- no horizontal overflow
- Vision/Mission/Values align cleanly
- Contact directory has no decorative icon cards
- Contact displays both intended email addresses
- Footer contains both emails and both numbers
- footer statutory metadata rail is gone
- Header reads Our Brands
- Home brand CTA reads Explore our brands and points to `/brands`
- supporting Compliance capability feels integrated with the three primary capabilities
- Ways to engage no longer contains nested card surfaces
- E-commerce disclaimer is one desktop line where naturally possible and wraps safely on mobile
- all FAQ sections contain at least five real FAQs
- colours remain inside the existing DSPL palette
- no new gratuitous gradients, shadows, oversized pills, glassmorphism, or decorative iconography

---

# 14. Verification gate

After implementation run:

`npm run lint`

`npm run test`

`npm run build`

If Impeccable is installed, use it only as a final visual/UX check after the implementation. Do not allow it to replace the approved wording or invent company information.

Then perform browser QA of:

- `/`
- `/about`
- `/brands`
- `/contact`
- `/branding`
- `/marketing`
- `/ecommerce`

Report:

1. files changed
2. exact copy changes
3. responsive behaviour
4. test/lint/build results
5. any issue that remains unresolved

Do not commit, push, merge, or reset the repository after verification unless explicitly instructed.