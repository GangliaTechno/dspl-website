# Contact and Supporter Marquee Polish Design

## Goal

Improve two approved website surfaces without changing the site's identity:

1. give the homepage supporter-logo conveyor more visual breathing room; and
2. make the Contact page more focused, balanced, and useful on phones.

The result must preserve Dashapatmaja's warm institutional design language, the existing contact-form behavior, and the exact institutional logo artwork.

## Current Evidence

- The supporter conveyor currently uses equal visible edge gaps of `3.75rem` (`60px`) on desktop and `2.5rem` (`40px`) on phones. The measurements are consistent, but the rhythm feels compressed beside the wider MUTBI and Startup Karnataka wordmarks.
- On a `390px` phone viewport, the Contact form begins about `1158px` down the page because the three headquarters cards appear first.
- The Contact hero is about `341px` high on the same phone viewport, creating more introductory whitespace than the conversion task needs.
- Contact markup renders `.detail-info h3`, while the stylesheet targets `.detail-info h4`; the intended contact-row typography therefore does not apply.

## Supporter Marquee

- Increase the shared visible edge gap to `4.5rem` (`72px`) on desktop and `3rem` (`48px`) on phones.
- Preserve the current logo asset dimensions, common visual baseline, monochrome treatment, and opacity.
- Preserve the CSS `translate3d` conveyor, measured duplicated sequence, exact sequence-width shift, and `22s linear infinite` motion.
- Preserve the reduced-motion static presentation.
- Apply the same gap between all adjacent marks and across the sequence seam.
- Do not add individual logo offsets, unequal slot widths, a pause button, or interactive controls.
- Do not redraw, regenerate, distort, or replace the institutional logos.
- Do not exceed the approved gap values; wider spacing would make the proof strip feel disconnected.

## Contact Page Structure

### Hero

- Keep the existing calm light hero; do not add a photograph, gradient, or decorative illustration.
- Preserve the `Get in Touch`, `Contact us`, and response-time copy.
- Constrain the description to `58ch`.
- Set the phone hero padding to `4.5rem 0 3rem` so the primary task appears sooner.

### Headquarters Panel

- Replace the three separate Address, Phone, and Email cards with one restrained white Headquarters panel.
- Present Address, Phone, and Email as three clearly separated rows inside that panel.
- Keep the current icons, wording, phone links, email links, and postal address.
- Use one shared border and subtle row dividers instead of three floating card shadows.
- Correct the heading selector to style the rendered `h3` elements.

### Form

- Preserve every current field, option, validation message, honeypot, submission state, analytics event, and Web3Forms integration.
- Preserve the existing desktop two-column composition, with headquarters on the left and the form on the right.
- At `900px` and below, place the form before the headquarters panel so phone and tablet users reach the primary action first.
- Keep the form surface, input styling, and primary gold submit button consistent with the design system.

## Responsive Behavior

- Desktop: balanced two-column layout with the consolidated Headquarters panel aligned near the top of the form.
- Tablet and phone: form first, Headquarters panel second, with no horizontal overflow.
- Phone hero spacing is reduced without crowding the fixed header.
- Marquee gaps resolve to exactly `72px` desktop and `48px` mobile, including the repeat seam.

## Accessibility and Motion

- Preserve semantic headings, link destinations, field labels, error associations, live regions, and keyboard behavior.
- Keep readable contrast on warm neutral surfaces.
- Preserve the existing reduced-motion behavior for the supporter conveyor.
- Do not introduce hover-only information or essential content over imagery.

## Validation

- Add regression coverage for the `4.5rem` desktop and `3rem` mobile marquee gaps.
- Add regression coverage for the consolidated Headquarters panel, corrected `h3` styling, and mobile form-first order.
- Visually verify the homepage and Contact page at desktop and `390px` phone widths.
- Measure every marquee edge gap and the repeat seam.
- Confirm the Contact form appears before headquarters on phone and after headquarters on desktop.
- Confirm no horizontal overflow, clipped logos, broken links, missing form states, or browser console errors.
- Run lint, the full test suite, production build, prerender verification, and `git diff --check`.

## Scope Boundaries

- Do not redesign the Contact page from scratch.
- Do not change contact details, form destinations, validation rules, or submission behavior.
- Do not change the homepage hero, header, navigation, other page heroes, or footer.
- Do not push, merge, deploy, or modify `main`; work remains on `pawan/raw-radicles-redesign` until approval.
