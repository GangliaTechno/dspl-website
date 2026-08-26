# DSPL Focused Content and UI Corrections

Date: 2026-08-26
Status: Approved
Branch: `review/content-seo-pdf-reconciliation`

## Purpose

Correct the approved PDF-driven service content and the reproduced UI defects
without turning the work into another site-wide redesign. The handwritten scan
remains the decision layer over the clean Copy Deck. Current source and fresh
browser evidence outrank older planning notes.

## Protected boundaries

- Preserve every image, artwork file, hero treatment, article slug, publication
  date, article body, reference list, and the two-article publication set.
- Keep Sanity dormant and preserve the fallback publication contract.
- Do not introduce prices, fixed delivery periods, SEO timing, rankings, leads,
  sales, ROAS, launch status, partner identities, legal advice, or guaranteed
  compliance/performance claims.
- Do not edit the external PDFs or copy them into the repository.
- Leave the user-owned `.github/instructions/` directory untouched.
- Do not push, merge, deploy, or mutate production.

## Service-page design decision

Branding, Marketing, and E-commerce each use exactly four non-sequential
capabilities in a balanced two-by-two editorial grid. Capability cards are not
numbered. Branding and E-commerce use one prose-led compliance information band
with a qualified-adviser disclaimer; the five-item compliance-card treatment is
removed. The existing shared `ServicePage` markup is retained unless a failing
regression proves it cannot express the approved result.

The voice is founder-facing: plain, specific, and operational without sounding
like developer documentation. All language below is constrained to approved
Copy Deck areas and removes the unsupported commitments found in the current
branch.

## Approved service copy sheet

### Branding

Hero subline:

> Positioning, identity, packaging and voice, developed as one practical brand
> system.

Intro heading:

> A brand system your team can use

Intro:

> We bring positioning, identity, packaging and messaging into one clear system.
> The work is shaped around the people who will use it—from internal teams to
> printers and production partners—so approved decisions can move consistently
> from the brief into everyday brand communication.

Capabilities:

1. **Brand positioning and strategy** — Define who the brand is for, what it
   stands for and how it should be understood. The result is a practical brief
   that guides identity, packaging and communication decisions.
2. **Visual identity system** — Create the core visual system—logo, colour,
   typography and supporting elements—with clear guidance for everyday use
   across print and digital channels.
3. **Packaging design and production** — Develop packaging around the selected
   format, approved product information and production requirements, then
   coordinate artwork revisions with the appointed vendor.
4. **Brand voice and messaging** — Set the tone, key messages and reusable copy
   patterns so websites, campaigns, product pages and customer communication
   sound like the same brand.

Capability description:

> Four connected areas, adapted to the decisions and production needs of the
> project.

Compliance heading:

> Packaging compliance for food and consumer products

Compliance copy:

> For packaged products, required information needs to be considered while the
> artwork is being developed. We organise client-approved label content,
> coordinate artwork revisions and help keep the production pack aligned with
> marketplace product information.

Disclaimer:

> Regulated legal opinions stay with qualified advisers; the preparation and the
> paperwork sit with us.

FAQ intent: explain scope, existing-brand work, production artwork, approved
label inputs, collaboration, handover and required client inputs. Do not state a
fixed duration, a price, automatic legal clearance, a guaranteed-compliant
label, or an unsupported operating footprint.

Footer CTA: **Start a branding project** → `/start`.

### Marketing

Hero subline:

> Search, paid media, content and reporting, planned around measures agreed
> before work begins.

Intro heading:

> Marketing with measures you can review

Intro:

> We begin by understanding where traffic comes from, what is already being
> measured and what a useful result would look like. The agreed plan then defines
> the channels, responsibilities and reporting cadence. Because we also work on
> an owned consumer brand, we approach channel decisions with the same care we
> expect when spending our own budget.

Capabilities:

1. **Search engine optimisation** — Review technical foundations, search intent,
   page structure and internal links, then prioritise improvements against the
   agreed audience and business goals.
2. **Paid campaign management** — Plan and manage agreed search, social or
   marketplace campaigns, with account ownership, budgets and review measures
   made clear before activity begins.
3. **Analytics and reporting** — Check that agreed actions can be measured, keep
   definitions consistent and report what changed, what it may mean and what to
   review next.
4. **Content and copywriting** — Develop landing pages, articles, product copy
   and campaign messages around the audience, channel and approved brand voice.

Capability description:

> A focused channel mix, selected around the evidence, budget and responsibilities
> agreed for the engagement.

FAQ intent: explain scoping, measurement, account ownership, collaboration,
inputs and the no-guarantee boundary. Do not state SEO result periods, minimum
retainer periods, guaranteed outcomes, unsupported regional reach, or commercial
performance commitments.

Footer CTA: **Start a marketing project** → `/start`.

### E-commerce

Hero subline:

> Storefronts, marketplaces, payments and delivery, planned around the way your
> team operates.

Intro heading:

> Commerce built around the operating model

Intro:

> We plan the customer journey alongside catalogue ownership, payments, delivery,
> returns and reporting. That keeps the storefront and the day-to-day operating
> process connected, with responsibilities and dependencies agreed before the
> build moves forward.

Capabilities:

1. **Store setup and build** — Plan and build the agreed storefront around the
   catalogue, content structure, customer journey and routine updates your team
   needs to manage.
2. **Conversion journey review** — Review discovery, product, cart and checkout
   journeys, identify supported points of friction and prioritise practical
   improvements.
3. **Marketplace and multi-channel selling** — Prepare catalogue structure,
   listing content and operating responsibilities for the marketplaces and
   channels included in scope.
4. **Payments, delivery and returns** — Coordinate the agreed payment, delivery
   and returns flows with the selected platform and providers, then verify the
   customer journey before launch.

Capability description:

> Four connected areas, scoped to the selected platform, channels and operating
> responsibilities.

Compliance heading:

> Listing and marketplace compliance

Compliance copy:

> Product information on the physical pack and the digital catalogue needs to
> remain consistent. We prepare channel-ready records from client-approved
> product and packaging information, organise the fields required by agreed
> marketplaces and coordinate updates when approved source information changes.

Disclaimer:

> Regulated legal opinions stay with qualified advisers; the preparation and the
> paperwork sit with us.

FAQ intent: explain platform selection, existing-store work, catalogue scope,
account ownership, post-launch options, marketplace scope and required inputs.
Do not state delivery periods, prices, platform/performance guarantees, legal
outcomes or unsupported catalogue limits.

Footer CTA: **Start an e-commerce project** → `/start`.

## Brands conversion hierarchy

- Raw Radicles detail: **Explore Raw Radicles** → `/brands/raw-radicles`.
- Portfolio-in-development partnership: retain its approved partnership action
  → `/contact`.
- Page footer: **Start a project** → `/start`.
- Present Portfolio in development as a restrained status section using only
  approved existing copy. Add no concepts, launch claims, statistics or media.
- The supplied clipping symptom is not reproducible in the clean 1181px check;
  no speculative overflow patch is approved.

## Home corrections

- Replace gated process timing labels with `Initial scope review`, `Approved
  roadmap`, and `Engagement cadence`.
- Align all three desktop/tablet metadata dividers within 1px without fixed page
  heights or changing mobile stacking.
- At 901–1039px, move the supporter rail into the hero's second grid row so it
  cannot overlap the hero actions. Use a sufficiently opaque dark surface and
  compact logo sizing through this band. At 936px, the rail top must be at or
  below the actions bottom.

## Insights corrections

- Both production article author arrays contain exactly one author: Pawan
  Shetty. Generic component/schema support for multiple authors remains.
- Regenerate fallback files from the corrected seed only; bodies, references,
  dates, slugs, artwork and publication count remain unchanged.
- TOC tracking uses a requestAnimationFrame-throttled geometry resolver on
  scroll, resize and hash changes. Select the last heading to cross the reading
  anchor, or the first heading as fallback. Desktop and mobile keep matching
  `aria-current="location"` state.

## Verification widths

390, 430, 768, 900, 936, 1024, 1181 and 1440px. Visual QA covers all changed
routes, keyboard focus, reduced motion, horizontal overflow, CTA targets,
service hierarchy, Pawan-only bylines, and fast-jump TOC behaviour.
