# Align Global Focus and Shadow Tokens with DESIGN.md

Written against: 01a416177ef471eb211cad9060ccb80f8a6fbfc4

## Evidence chain

- Surface: `src/index.css` (Global styles & root CSS custom properties)
- Problem:
  1. `--focus-ring` is currently assigned `3px solid var(--accent-text)` (`#8A5B00`, bronze text tone), whereas `DESIGN.md` explicitly specifies a Hero Gold focus ring (`outline: 3px solid #F5A800`).
  2. `--accent-shadow` is set to `rgba(245, 168, 0, 0.06)`, drifting from the documented `rgba(245, 168, 0, 0.04)` input glow token.
- Design evidence: `DESIGN.md` (Section 2 "Colors" - Hero Gold `#F5A800`; Section 5 "Components" - Buttons Hover / Focus: `outline: 3px solid #F5A800`; Inputs Focus: `0 0 0 4px rgba(245, 168, 0, 0.04)`).
- Owner: `src/index.css`
- Scope and affected surfaces: `src/index.css` (affects all interactive `:focus-visible` elements, buttons, and form inputs)
- Uncertainty: None

## Design decision

Update root design tokens in `src/index.css` so `--focus-ring` references `3px solid var(--accent)` (`#F5A800`) and `--accent-shadow` is calibrated to `rgba(245, 168, 0, 0.04)`.

## Reuse

- `var(--accent)` (`#F5A800`)
- `var(--accent-shadow)` (`rgba(245, 168, 0, 0.04)`)
- Exemplar: Design token definition block in `DESIGN.md`.

## Changes

1. `src/index.css`
   - Change:
     - Update `--focus-ring: 3px solid var(--accent-text);` to `--focus-ring: 3px solid var(--accent);`.
     - Update `--accent-shadow: rgba(245, 168, 0, 0.06);` to `--accent-shadow: rgba(245, 168, 0, 0.04);`.
   - Preserve: Existing contrast requirements and reduced motion overrides.
   - Verify: Tabbing to links, buttons, and form fields produces the crisp Hero Gold focus ring and restrained input focus shadow.

## Scope

- Inherit: All interactive elements inheriting `--focus-ring` and `.form-input:focus` across the application.
- Verify: Contrast and focus visibility across light and dark sections (including `.home-hero` and general body sections).
- Exclude: None.

## Validation

- Product: Keyboard navigators and interactive users experience consistent, on-brand focus states matching DSPL guidelines.
- Interface: Test keyboard navigation across `/`, `/about`, `/brands/raw-radicles`, `/contact`, and `/start`.
- System: Confirm CSS variable cascade resolves properly with zero regressions.
- Repository: `npm test` or `npm run build` → Valid build output.

## Stop conditions

- Stop if changing `--focus-ring` causes automated accessibility contrast check failures against light backgrounds.

## Design documentation

- After acceptance and validation: None required (fully aligns with existing `DESIGN.md`).
