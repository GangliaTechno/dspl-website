# DSPL Supporter Alignment and Raw Radicles Palette Design

**Date:** 2026-07-27
**Status:** Approved direction
**Scope:** Home supporter marquee, Home owned-brand proof, and Brands Raw Radicles showcase

## Objective

Make institutional supporter logos read as one orderly row and present the Raw Radicles navy-and-gold mark on warm DSPL surfaces instead of pure black.

The work must preserve the current information architecture, copy, routes, actions, responsive stacking, marquee behavior, and Raw Radicles trademark artwork.

## Governing Design Language

Use the existing DSPL semantic tokens:

- Page canvas: `var(--bg-primary)` (`#F5F3EE`)
- Cream surface: `var(--bg-secondary)` (`#FFF8E7`)
- Warm parchment: `var(--bg-tertiary)` (`#F5EFEB`)
- Card surface: `var(--card-bg)` (`#FFFFFF`)
- Heading text: `var(--text-heading)` (`#111111`)
- Secondary text: `var(--text-secondary)`
- Primary gold: `var(--accent)` (`#F5A800`)
- Accessible bronze: `var(--accent-text)` (`#8A5B00`)
- Existing border and accent-alpha tokens for dividers and rings

Do not introduce a new navy, cocoa, black, gradient, shadow, or glow token. The Raw Radicles artwork supplies its own navy-and-gold identity.

## Supporter Marquee

### Alignment

Every supporter must occupy the same fixed slot and share the same image height.

- Desktop slot: `14rem` wide and `4rem` high
- Desktop logo height: `2.25rem`
- Mobile slot: `10rem` wide and `3rem` high
- Mobile logo height: `1.875rem`
- Image width: `100%`
- Image fit: `object-fit: contain`
- Alignment: centered on both axes
- Preserve each logo's natural aspect ratio

Remove all logo-specific height rules and the NIDHI PRAYAS vertical translation. Do not stretch any logo to fill the slot width.

### Motion

Preserve the existing continuous horizontal marquee, tripled data sequence, and reduced-motion static state. Do not change its speed or direction in this change.

## Raw Radicles Artwork

Create one derived transparent asset from `RR_logo embossed_tm.png`.

- Crop to the visible alpha bounds with a small transparent safety margin.
- Preserve the original pixels, aspect ratio, colors, trademark mark, and transparency.
- Do not redraw, recolor, sharpen, regenerate, or reinterpret the logo.
- Save the derived asset as an optimized transparent WebP or PNG under `src/assets`.
- Use the derived asset in both Home and Brands so the mark has one visual owner.

## Home Owned-Brand Proof

Replace the black section with a warm, layered DSPL treatment:

- Section background: `var(--bg-secondary)`
- Section borders: existing `var(--border-color)` on the top and bottom
- Logo field: `var(--bg-tertiary)`
- Logo field shape: retain the existing circular composition
- Ring: existing accessible bronze or accent-border-alpha token
- Heading: `var(--text-heading)`
- Tagline and eyebrow: `var(--accent-text)`
- Description: `var(--text-secondary)`
- Primary action: retain the gold `btn-primary`
- Secondary text action: dark heading text, changing to bronze on hover

Remove the dark-only white text rules and heavy black drop shadow. Keep a restrained surface shadow only if an existing token is already available.

## Brands Raw Radicles Showcase

Keep the current split-card layout and white information panel.

- Visual panel background: `var(--bg-tertiary)`
- Visual-panel border: existing border token at the split
- Decorative ring: the same restrained ring used on Home
- Use the shared tightly cropped Raw Radicles asset
- Change the primary enquiry action from black to the standard gold primary-button treatment
- Preserve all proof copy, email destination, responsive stacking, and card dimensions

The Home and Brands logo fields must feel related, but they do not need identical dimensions.

## Responsive Behavior

- Preserve the existing Home two-column to one-column breakpoint.
- Preserve the existing Brands split-card to stacked-card breakpoint.
- The logo must remain fully visible with no clipping at all supported widths.
- Marquee logos must remain on one centered horizontal axis.
- Do not add new animations.

## Verification

Implementation is complete only when:

1. All four supporter logos have identical computed heights and vertical centers on desktop and mobile.
2. No supporter-specific transform or height override remains.
3. Raw Radicles uses the same derived logo asset on Home and Brands.
4. The navy circle, gold rays, lion, wording, and trademark are visible on both warm surfaces.
5. Home and Brands use existing DSPL semantic color tokens instead of new raw colors.
6. Existing CTA destinations and modal behavior remain unchanged.
7. Reduced-motion marquee behavior remains unchanged.
8. Unit tests, lint, production build, prerender verification, and rendered desktop/mobile reviews pass.

## Out of Scope

- Redesigning the Raw Radicles trademark
- Changing supporter organizations or their order
- Replacing the Home hero image
- Replacing the Marketing hero image
- Changing marquee speed or direction
- Editing page copy or business claims
- Pushing, merging, or deploying
