# DSPL Supporter Marquee Optical Normalization

## Objective

Make the Home hero supporter marquee feel evenly weighted, evenly spaced, and mechanically seamless while preserving each institution's official logo artwork.

## Approved Direction

The marquee moves continuously from right to left. It uses two identical supporter sequences and translates the complete track from `0%` to `-50%`, so the second sequence replaces the first without a spacing jump.

The animation is linear, repeats indefinitely, and runs for 24 seconds. Users who prefer reduced motion see one centered, non-moving sequence.

## Logo Treatment

The four institutional marks remain official artwork. Their symbols, wording, proportions, colors, and internal composition must not be redrawn, regenerated, rearranged, or typeset again.

Create one transparent normalized canvas per logo from the existing assets:

- crop unused transparent space;
- preserve the complete visible mark;
- scale the mark for equal perceived weight rather than equal source-image height;
- center it horizontally and vertically on a shared canvas;
- export it losslessly;
- retain sufficient transparent safety space to avoid clipping anti-aliased edges.

NIDHI PRAYAS receives the largest relative scale increase because its existing square lockup renders much narrower than the other three. DST NIDHI receives a moderate increase. MUTBI and Startup Karnataka are restrained so their long wordmarks no longer dominate the band.

## Layout

Each supporter occupies an equal-width slot on a single visual center line. Desktop slots and gaps are narrower than the current treatment so the sequence reads as one supporter group rather than isolated marks.

The track consists of:

1. one complete supporter sequence;
2. a trailing gap included inside that sequence's width;
3. one identical duplicate sequence.

The two sequences must have equal computed width. The track itself must not add an unmatched inter-sequence gap.

At the band edges, a subtle mask fades entering and leaving logos without reducing legibility in the central viewing area.

## Responsive Behavior

Desktop and mobile use the same normalized assets and ordering. Mobile reduces the shared slot width, gap, and canvas display size without adding logo-specific CSS offsets.

The marquee must not create horizontal page overflow. The complete static sequence may wrap or scale within the viewport only in reduced-motion mode if required for legibility.

## Accessibility

- The first sequence exposes the existing descriptive alternative text.
- The duplicate sequence is hidden from assistive technology.
- Reduced-motion behavior remains non-animated.
- Decorative edge fading must not obscure focused or interactive content; the marquee contains no interactive controls.

## Regression Contracts

Automated checks must establish that:

- exactly two animated sequences are rendered;
- the animation target is `-50%`;
- the duration is 24 seconds with linear easing;
- duplicate content remains `aria-hidden`;
- no per-logo sizing or vertical-transform CSS is reintroduced;
- the four normalized assets are used;
- desktop and mobile share one slot size and one center line at each breakpoint.

Visual verification must confirm:

- NIDHI PRAYAS and DST NIDHI no longer look undersized;
- MUTBI and Startup Karnataka no longer dominate;
- center-to-center spacing is consistent;
- the loop crosses its sequence boundary without a visible jump;
- desktop and mobile have no horizontal overflow or console errors.

## Constraints

- Preserve supporter order.
- Preserve the Home hero copy, actions, layout, and full-viewport behavior.
- Do not modify or regenerate the official institutional artwork.
- Do not push, merge, or deploy.
