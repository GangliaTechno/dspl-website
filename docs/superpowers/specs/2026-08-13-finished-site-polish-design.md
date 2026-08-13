# DSPL Finished-Site Content and UI Polish

Date: 2026-08-13
Status: Approved design direction

## Objective

Present Dashapatmaja Solutions Pvt Ltd as a finished, credible operating company rather than an internal prototype or audit artifact. Preserve the established warm editorial design system while reducing repetition, strengthening hierarchy, and making every public-facing statement read confidently.

## Design principles

- Preserve the existing cream, charcoal, and restrained amber palette, Outfit typography, header, supporter strip, and approved route-specific hero imagery.
- Use cards only where each item is a genuinely independent choice or object. Prefer spacing, dividers, and typography for ordinary information groups.
- Remove internal review language from public pages. Unsupported facts remain unpublished without explaining the publication policy to visitors.
- Keep page imagery purposeful. Add only one new About milestone image; do not add decorative images to Home, Contact, or the service pages.
- Use only verified DSPL, Raw Radicles, and supporter marks. Do not generate or imply institutional logos.

## Home

Retain the current hero, two hero actions, and supporter strip.

Replace the four equal service pillars with three primary pillars:

1. Branding
2. Marketing
3. E-commerce

Present compliance coordination as a supporting capability beneath the three pillars, with links to the relevant Branding and E-commerce sections.

Remove the standalone "Owned experience informs the work" section. Incorporate its useful operating-experience message into the Raw Radicles proof section.

Reduce the process from six steps to three stages:

1. Audit — understand the current position, audience, constraints, and priorities.
2. Build — create and coordinate the agreed brand, market, and commerce system.
3. Grow — launch, measure, and improve the operating system.

Keep the Raw Radicles proof section and final project CTA. The result should be substantially shorter on mobile and should introduce visual contrast through section treatment rather than additional photography.

## Raw Radicles and Brands copy

Remove public-facing phrases such as:

- "Evidence boundary"
- "confirmed facts only"
- "approved evidence"
- "owner approval"
- descriptions of what the page "does not claim"

Rewrite the Raw Radicles hero and overview in confident present/past tense. Keep factual ownership, portfolio, partnership, and workstream information. Omit unsupported medical, commercial, regulatory, or confidential claims without explaining the omission.

Replace the final boundary section with a concise commercial closing section and the existing brand/project actions.

On Brands and shared footer CTAs, remove defensive or internal-review phrasing while retaining accurate trademark and ownership information.

## Contact

Keep the current Contact hero image and opening message.

Fix the global selector collision in `PrivacyPolicy.css` that overrides `.contact-info-card` styles outside the privacy page.

Give the three contact cards a consistent finished hierarchy:

- visible restrained gold rail or top edge;
- compact gold icon treatment for Office, New enquiries, and Existing projects;
- aligned headings, summaries, descriptions, and contact actions;
- enough supporting copy that the Existing projects card does not appear unfinished.

The cards remain white/cream rather than becoming fully gold. Mobile cards stack with consistent spacing and no forced equal height.

## About journey

Keep the existing 2023–2026 journey images. They form a coherent editorial family and match the milestones, but the repeated 2022/2023 image must be removed.

Create one new 3:2 landscape image for 2022. Direction: warm premium editorial scene showing early company formation and consumer-brand planning materials, including neutral incorporation papers or folders, with no readable legal text, institutional logo, watermark, or invented credential.

Add a compact milestone-reference row where verified:

- 2022: DSPL mark and incorporation date.
- 2023: text reference to GoK Bioincubator, Manipal; no generated logo.
- 2024: approved Raw Radicles logo.
- 2025: approved MUTBI and NIDHI-PRAYAS marks.
- 2026: DSPL services reference.

Keep milestone text specific and concise. The references should enrich context without turning the journey into a logo wall.

## Branding, Marketing, and E-commerce

Use the shared `ServicePage` component to establish a clearer hierarchy across all three pages.

- Capabilities: editorial three-column grid with sequence number, heading, body copy, and quiet separators rather than filled cards.
- Five-item pages: three items on the first row and two balanced items on the second row; do not invent a sixth capability.
- Six-item pages: true 3-by-2 grid.
- Compliance coordination: quieter supporting band or compact line grid, visually secondary to capabilities.
- Ways to engage: retain cards because these are genuine engagement alternatives.
- Proof sections: retain their editorial split/list treatment.

## FAQ

Keep the accessible accordion behavior and Outfit typography.

Replace the glass-card stack with a divider-based accordion. Normalize question weight, answer size, line height, spacing, icon alignment, and focus treatment. Maintain at least 44-pixel touch targets and preserve keyboard/ARIA behavior.

## Motion and responsive behavior

- Do not add smooth-scroll hijacking or scroll-speed manipulation.
- Keep reveal motion subtle and consistent; respect `prefers-reduced-motion`.
- Verify that no section creates horizontal overflow at 390 px.
- Check Home, About, Contact, Branding, Marketing, E-commerce, Brands, and Raw Radicles at representative desktop and mobile viewports.

## Accessibility and release acceptance

The implementation is complete only when:

- headings remain semantically ordered;
- icons are decorative or correctly labelled;
- focus states remain visible;
- FAQ and links are keyboard accessible;
- new imagery has accurate dimensions and alternative text;
- no internal audit/prototype wording remains on public routes;
- targeted UI regression tests cover the new shared patterns;
- lint, tests, build, HTML verification, asset checks, and diff checks pass;
- rendered desktop and mobile QA confirms balanced layouts, normal scroll behavior, and no regressions to approved heroes or the Raw Radicles visual.

## Out of scope

- Replacing approved route heroes.
- Generating new institutional or supporter logos.
- Adding unverified client, revenue, regulatory, medical, or performance claims.
- Merging to `main` or deploying. The verified implementation remains on `pawan/raw-radicles-redesign` until separately approved for push.
