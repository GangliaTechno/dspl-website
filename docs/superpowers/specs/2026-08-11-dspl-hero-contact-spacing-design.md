# DSPL Hero Imagery, About Spacing, and Contact Redesign

**Date:** 2026-08-11
**Baseline commit:** `4c66983`
**Status:** Approved direction; written specification awaiting final user review

## Objective

Give the public website more visual breathing room without changing its established warm editorial identity. The work covers three connected corrections:

1. Richer, fixed hero imagery across Home, About, Brands, Marketing, Branding, and E-commerce, with taller cinematic framing on the five interior routes.
2. More deliberate spacing between the About heading “What guides our work” and the Vision / Mission / Values cards.
3. A genuinely vertical Contact page that no longer attempts to fit all information and the complete form into one desktop viewport.

## Design principles

- Preserve the warm off-white, cream, charcoal, white, and restrained-gold palette.
- Use one stable, curated hero image per route. Do not randomise imagery or introduce a slideshow.
- Gold remains a deliberate hero emphasis, not a general text colour.
- Preserve the responsive `<picture>` contract while allowing the underlying hero artwork and crops to be replaced.
- Use white cards for bounded information or interaction; use open cream sections for narrative content.
- Do not add decorative icon boxes, numbered capability cards, gradients, glows, or heavy shadows.
- Normal page scrolling is acceptable and preferred over compressed spacing.
- Preserve verified business copy and contact details unless this specification explicitly moves it.

## 1. Richer static imagery and taller cinematic heroes

### Pages

- `/`
- `/about`
- `/brands`
- `/marketing`
- `/branding`
- `/ecommerce`

### Image behaviour

- Each route receives one fixed hero image with its own subject and focal point.
- Images do not change randomly between visits.
- Do not add a carousel, automatic crossfade, pagination controls, or timer state.
- Replace or colour-refine the current muted artwork where necessary; do not reuse visibly dated or low-resolution legacy images merely because they existed in the first site version.
- Produce responsive `960px`, `1440px`, `1920px`, and mobile crops for every replaced image family.
- Retain `<picture>`, intrinsic image dimensions, eager loading, `fetchPriority="high"`, and asynchronous decoding.
- Maintain a consistent premium photographic treatment: warm natural light, deeper colour, realistic materials, controlled contrast, and no synthetic text or logos inside generated artwork.

### Page-specific art direction

| Route | Hero subject | Colour direction |
| --- | --- | --- |
| Home | A premium brand-development worktable combining packaging, campaign planning, and commerce execution | Warm ochre, cacao, restrained teal, charcoal |
| About | A multidisciplinary studio table showing research, strategy, design, and product-development materials | Warm timber, burgundy, deep green, cream |
| Brands | Consumer-product and packaging prototypes presented as an active portfolio-development environment | Cacao, saffron, muted red, dark neutral |
| Marketing | Search, paid-media, content, and measurement artefacts arranged as one coordinated programme | Gold, cobalt accents, warm neutral, charcoal |
| Branding | Identity boards, packaging studies, typography, and material swatches in a disciplined design workspace | Saffron, forest green, burgundy, cream |
| E-commerce | Product, storefront, order, fulfilment, and measurement cues in one operational commerce workspace | Deep teal, gold, warm white, charcoal |

The six images must be visibly distinct while sharing the same photographic quality and warm DSPL palette.

### Content hierarchy

Home retains its approved two-line headline, supporting paragraph, and existing actions. Its full-viewport composition remains structurally unchanged; only the artwork and crop are revised.

Each interior hero keeps the four approved content levels in this order:

1. Context label
2. Gold H1
3. White hero tagline
4. Supporting hero description

The descriptions remain inside the hero. Congestion is corrected through height, width, and spacing rather than removing approved context.

### Desktop presentation

- About and Brands heroes use a minimum height of `38rem`.
- The shared service hero uses a minimum height of `35rem`.
- Hero content remains vertically centred.
- Content width is capped at `52rem` so copy does not become a single long line on wide screens.
- Increase the vertical separation between context label, H1, tagline, and description.
- H1 remains gold; tagline remains white; description remains softened white.
- Retain a dark flat overlay strong enough to protect legibility.

### Image framing

- Continue using responsive `<picture>` sources and mobile-specific images.
- Continue using `object-fit: cover` so heroes have no empty bands.
- Keep About and service artwork centred; keep the current Brands focal position at `center 54%`. The taller frame supplies the additional visible image area.
- Do not enlarge a raster source beyond its exported dimensions.
- Remove the continuous About image zoom; the hero should feel composed rather than restless.

### Mobile presentation

- Use a dedicated mobile crop from each route's approved replacement image.
- Keep the content centred and naturally wrapped.
- Use a `34rem` mobile minimum height rather than reverting to a shallow auto-height block.
- Reduce type size responsively while retaining clear separation between all four content levels.
- No horizontal overflow or clipped hero copy at `390px`.

## 2. About direction-section spacing

### Structure

Retain the approved three-card order and copy:

1. Vision
2. Mission
3. Values

No icons or decorative sequence numbers are introduced.

### Spacing correction

- Set vertical padding around the complete “What guides our work” section to `6.5rem 0` on desktop.
- Set the H2 to `clamp(2.5rem, 4vw, 3.25rem)` so it has the weight of a major section entrance.
- Add a `3rem` separation after “What guides our work” before the card row begins.
- Set the desktop card gap to `1.75rem`.
- Set desktop card padding to `2.5rem`.
- Keep the three cards equal-height on desktop.
- On mobile, stack the cards with natural height and a smaller but still deliberate gap.

### Visual relationship

The intended rhythm is:

```text
Taller About hero

Generous section entrance
What guides our work

Vision          Mission          Values

Generous transition
Our journey
```

## 3. Vertical Contact redesign

### Page sequence

The Contact route becomes four vertical regions:

1. Contact hero
2. Contact-information cards
3. General enquiry section and form
4. Existing global footer

The page must use normal scrolling. No CSS should compress the page based on desktop viewport height.

### Contact hero

- Use a flat charcoal hero rather than introducing a new stock image.
- Use a `22rem` desktop minimum height and an `18rem` mobile minimum height.
- Keep the context label `Contact`.
- Keep the H1 `Start a conversation.`
- Retain the current explanation distinguishing general enquiries from detailed Work With Us project briefs.
- Use the same gold-H1 and white-supporting-copy hierarchy as the other public heroes.
- Centre the hero content vertically within the specified minimum height.

### Contact-information cards

Render three peer cards in one desktop row:

- Address
- Phone
- Email

Requirements:

- White background, thin warm border, restrained radius, and no heavy shadow.
- Gold uppercase label and dark readable details.
- No decorative icons.
- Phone numbers and email addresses remain working links.
- Preserve the exact current address, phone numbers, and email addresses.
- Stack cards vertically on narrow screens.

### General enquiry section

- Give the complete General enquiry section `6rem 0` desktop padding.
- Use a centred section heading and short existing-purpose description.
- Centre one white form card with a maximum width of `800px`.
- Use `2.5rem` desktop padding inside the form card.
- Retain the first-name / last-name row on desktop and stack it on mobile.
- Increase the message area height from the compressed Contact version.
- Keep the full-width gold `Send Message` button.

### Preserved behaviour

The redesign must not change:

- Required fields and validation messages.
- Help-type options.
- Honeypot behaviour.
- Web3Forms endpoint and payload.
- Safe shared submission error.
- Success state and reset behaviour.
- GA4 lead event.
- Privacy notice and `/privacy` link.
- Work With Us modal or header CTA.

## Responsive behaviour

### Desktop (`> 900px`)

- Heroes use the cinematic heights defined above.
- About cards render in three columns.
- Contact information renders as three cards.
- Contact form is centred and comfortably padded.

### Tablet and mobile (`<= 900px`)

- Hero copy remains centred and readable over the mobile image.
- About cards stack in Vision / Mission / Values order.
- Contact cards stack Address / Phone / Email.
- The enquiry form follows the cards and uses the full available container width.
- First and last name stack at the narrow breakpoint.

## Testing and verification

### Automated contracts

- Update About regression coverage for the increased heading-to-card spacing and three-card layout.
- Update shared service-hero regression coverage for the new minimum height and retained four-level hierarchy.
- Add or update Brands and About hero contracts for cinematic height and responsive focal positions.
- Replace the current Contact split-layout expectations with vertical hero, three cards, and centred form expectations.
- Retain all Contact behavioural tests unchanged except for structural selectors.

### Required commands

```text
npm run lint
npm test
npm run build
npm run verify:html
npm audit
git diff --check
```

### Live browser review

Check Home, About, Brands, Marketing, Branding, E-commerce, and Contact at:

- `390x844`
- `768px` wide
- `1280x720`
- `1440x900`

Verify:

- No clipped hero copy.
- Every route uses its assigned stable image after reload and navigation.
- No carousel, random image selection, or automatic crossfade is present.
- Hero images retain meaningful focal areas.
- No horizontal overflow.
- The About heading-to-card gap is visibly intentional.
- Contact reads as a vertical page and is not compressed to one viewport.
- Contact links and form controls remain usable.

## Non-goals

- No Home-page layout or copy redesign beyond its hero artwork and crop.
- No changes to the supporter marquee.
- No random hero imagery or rotating slideshow.
- No new Contact backend or CMS.
- No changes to Privacy or 404 behaviour.
- No reintroduction of service capability icon cards.
- No additional global CTA beyond the existing header Work With Us action.
