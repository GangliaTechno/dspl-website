# Align Home Service Evidence Cards with Design System Container Spec

Written against: 01a416177ef471eb211cad9060ccb80f8a6fbfc4

## Evidence chain

- Surface: `src/pages/Home.jsx`, `src/pages/Home.css` (Route: `/`)
- Problem: `.service-evidence-card` elements in the "Coordinated services" section are displayed in an unstyled border grid without card background, rounded corners, or surface isolation, contrary to the documented container language.
- Design evidence: `DESIGN.md` (Section 5 "Cards / Containers": "Corner Style: 8px or 12px rounded corners", "Background: White (#FFFFFF) or Cream (#FFF8E7)", "Border: 1px solid rgba(26, 26, 26, 0.08)", "Internal Padding: 1.5rem to 2.5rem").
- Owner: `src/pages/Home.css`
- Scope and affected surfaces: `src/pages/Home.css` (`.service-evidence-grid`, `.service-evidence-card`)
- Uncertainty: None

## Design decision

Refactor `.service-evidence-grid` and `.service-evidence-card` in `src/pages/Home.css` to render discrete surface cards using the design system's `--card-bg`, `--radius-card` (12px), and `--border-color` tokens, with explicit grid gap spacing (`gap: 1.5rem`) instead of top/right/bottom grid border-cuts.

## Reuse

- `var(--card-bg)` (`#ffffff`)
- `var(--card-hover-bg)` (`#FFF8E7`)
- `var(--radius-card)` (`12px`)
- `var(--border-color)` (`rgba(26, 26, 26, 0.08)`)
- `var(--shadow-lg)` / `var(--shadow-surface)`
- Exemplar: Card container specifications in `DESIGN.md` and `.form-input` / `.service-evidence-card` in `src/index.css`.

## Changes

1. `src/pages/Home.css`
   - Change:
     - Update `.service-evidence-grid`:
       - Remove `border-top: 1px solid var(--border-color);` and `border-bottom: 1px solid var(--border-color);`.
       - Add `gap: 1.5rem;`.
     - Update `.service-evidence-card`:
       - Remove `border-right: 1px solid var(--border-color);`.
       - Add `background: var(--card-bg);`.
       - Add `border: 1px solid var(--border-color);`.
       - Add `border-radius: var(--radius-card);`.
       - Set padding to `2rem` (within the 1.5rem–2.5rem card container token guideline).
       - Add hover transition for subtle depth/color lift (`background-color: var(--card-hover-bg);`).
     - Update mobile breakpoint `@media (max-width: 900px)`:
       - Update grid to 2 columns with `gap: 1.25rem;` (or single column on `< 600px`).
       - Remove outdated `border-bottom` / `border-right` reset overrides.
     - Update mobile breakpoint `@media (max-width: 520px)`:
       - Remove `padding-inline: 0;` reset on `.service-evidence-card` so cards retain proper 1.5rem internal padding on small viewports.
   - Preserve: Existing typography, text colors, icons, and CTA link hierarchy inside each card.
   - Verify: Service cards render as distinct warm white/cream rectangular cards with 12px rounded corners and 1px soft borders across desktop and mobile viewports.

## Scope

- Inherit: Coordinated services section on the Home page (`/`).
- Verify: Responsive layout at 1440px, 1024px, 768px, and 375px viewports.
- Exclude: Process steps and testimonial sections (which have independent styling in `homeSections.css`).

## Validation

- Product: Users visiting `/` clearly perceive the 4 core service offerings as structured, high-credibility institutional cards.
- Interface: Verify `/` across viewports. Ensure text wrapping, button links, and icon alignments maintain baseline rhythm.
- System: Confirm full reuse of CSS custom properties defined in `src/index.css`.
- Repository: `npm run build` → Success without CSS or bundling errors.

## Stop conditions

- Stop if changing card styling requires altering content schemas or breaking SEO crawlability in `src/pages/Home.jsx`.

## Design documentation

- After acceptance and validation: None required (fully conforms to existing `DESIGN.md`).
