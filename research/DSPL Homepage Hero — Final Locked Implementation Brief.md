# DSPL Homepage Hero — Final Locked Implementation Brief

Implement this directly in the existing DSPL React project.

Do NOT start another brainstorming/design phase.

Do NOT propose alternative hero concepts before implementation.

The visual direction is now locked.

Use the attached **centered generated hero mockup** as the primary composition reference.

Use the attached **older/live DSPL hero screenshot** only as a reference for the supporter-marquee visibility, logo scale and integration with the photograph.

Do not copy either screenshot as an image.

Everything must be recreated from the existing real project assets and code.

---

# THE TARGET

The homepage opening should feel like:

**one full photographic canvas**

+

**large centered editorial typography**

+

**minimal factual supporting copy**

+

**clear CTA hierarchy**

+

**large continuously moving supporter proof**

The redesign should come from composition, scale and hierarchy.

Do not introduce a new visual gimmick.

---

# 1. KEEP THE EXISTING APPROVED HERO PHOTOGRAPH

The approved current DSPL homepage photograph remains the hero artwork.

Do not regenerate it.

Do not alter it.

Do not create a replacement image.

Do not split it into a separate column.

Do not put an ivory panel beside it.

Do not put it inside a card.

The photograph must remain:

**full-width**
**full-bleed**
**cinematic**
**the complete first-screen canvas**

The image should begin directly beneath the real DSPL header.

Preserve the existing responsive image architecture:

- desktop source
- mobile source
- `srcSet`
- `sizes`
- explicit width/height
- `loading="eager"`
- `fetchPriority="high"`
- `decoding="async"`
- `object-fit: cover`

Do not introduce layout shift.

---

# 2. HERO HEIGHT

Desktop hero should feel close to a complete screen underneath the header.

Start from:

```css
min-height: max(680px, calc(100svh - var(--header-height)));
```

Do not blindly retain that value if screenshot QA shows a better proportion.

At 1440×900 and 1920×1032, a visitor should see:

- header
- complete hero message
- CTAs
- supporter marquee

before the next major section begins.

Do not let a large part of the Capabilities section intrude into the initial desktop viewport.

The hero should feel like its own opening statement.

---

# 3. REMOVE THE CURRENT LEFT-ALIGNED VERSION

The latest local implementation with the headline heavily positioned toward the left is rejected.

Do not preserve:

- left-column-style typography
- serif/italic display treatment
- directional gradient
- opaque dark marquee block
- tiny moving supporter logos

The text composition now needs to return toward the **middle of the hero**, as shown in the attached centered mockup.

---

# 4. CENTER THE HERO COMPOSITION

Hero content should sit approximately in the central visual field of the photograph.

It should be centered horizontally.

However, do NOT blindly use:

```css
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

and stop there.

Use a proper grid/flex composition so the typography responds naturally.

Preferred conceptual structure:

```text
HEADER

FULL BLEED PHOTOGRAPH


              We build
           consumer brands.

     We help businesses build theirs.

          short supporting copy

    [ Start a project ]   Raw Radicles →


       RECOGNISED AND SUPPORTED BY

 ← supporter logos continuously moving ←


END OF HERO
```

The content may sit slightly above the exact geometric vertical center so sufficient room remains for the supporter marquee.

Aim for the visual centre, not mathematical perfection.

---

# 5. USE THE ORIGINAL APPROVED POSITIONING

Use:

**We build consumer brands.**

**We help businesses build theirs.**

Do not change this wording during implementation.

Do not return to:

“From brand idea to market reality.”

Do not invent a third positioning line.

---

# 6. REMOVE THE NEW SERIF

The recent serif/italic hero typography is rejected.

Use the existing DSPL typography system.

Use **Outfit** for the hero.

Do not load Instrument Serif or another display serif specifically for this section.

If the temporary serif dependency/import exists only because of the rejected hero experiment, remove it cleanly.

Do not leave unused font imports.

---

# 7. TYPOGRAPHIC COMPOSITION

Use two visually related but clearly hierarchical lines.

Primary:

**We build consumer brands.**

Secondary:

**We help businesses build theirs.**

The first statement is the strongest typographic object.

The second is slightly smaller but still substantial.

Reference feeling:

```text
              We build
           consumer brands.

     We help businesses build theirs.
```

Do not force these exact line breaks at every width.

Let them respond intentionally.

---

# 8. PRIMARY HEADLINE SCALE

At 1440px desktop, begin testing roughly:

```css
font-size: clamp(4.25rem, 6vw, 6.25rem);
```

Approximately 68–100px depending on viewport.

Use:

```css
font-weight: 800;
line-height: 0.95–1.00;
letter-spacing: approximately -0.04em;
```

These are starting ranges.

The screenshot decides the final values.

The primary headline should look much more substantial than a normal website H1.

---

# 9. SECONDARY HEADLINE SCALE

The second statement:

**We help businesses build theirs.**

should be approximately:

```css
font-size: clamp(2.5rem, 4vw, 4.25rem);
```

approximately 40–68px depending on viewport.

Use Outfit 700/800.

Do not make it tiny relative to the first statement.

The relationship should feel like:

**statement**
then
**reinforcement**

not headline + subtitle.

---

# 10. COLOUR TREATMENT

Primary statement:

**white / warm white**

Secondary statement:

**DSPL gold**

This is one place where the generated centered mockup works particularly well.

Start with:

```text
We build consumer brands.          white

We help businesses build theirs.  gold
```

Do not add:

- gradient text
- outlines
- glows
- strokes
- shadows beyond what is genuinely required for legibility

The photograph and typography should do the work.

Use the existing canonical accent token where appropriate.

---

# 11. NO DECORATIVE DIVIDER

The generated reference contains a small gold line/dot between the headline parts.

Do NOT implement that.

It is unnecessary decoration.

The whitespace between the two statements provides sufficient separation.

---

# 12. HERO OVERLAY

Remove the directional black gradient.

There should be NO left-to-right or right-to-left readability gradient.

Do not visually divide the photograph.

If contrast needs support, use one restrained **uniform scrim** across the entire hero.

Start around:

```css
background: rgba(5, 7, 10, 0.30);
```

Visually test approximately:

```text
0.26 → 0.36 opacity
```

Use the lowest value that keeps all hero text comfortably legible.

The shelves, packages, garments, workspace and image atmosphere must remain visible.

The hero should not look blackened.

---

# 13. SUPPORTING DESCRIPTION — KEEP IT, BUT SHORTEN IT

The generated centered mockup benefits from one small explanatory layer, so retain a concise subhead.

Use:

**DSPL develops its own consumer brands and helps businesses coordinate branding, marketing, e-commerce and compliance support.**

Do not use the full legal company name here.

The logo/header and site already identify the company.

Do not write another paragraph.

Maximum:

**2 lines on normal desktop**

Target approximately:

```css
max-width: 48ch;
font-size: clamp(1rem, 1.3vw, 1.2rem);
line-height: 1.55;
```

Use muted white:

approximately `rgba(255,255,255,.82–.88)`.

It should clarify the H1, not compete with it.

---

# 14. DESCRIPTION SPACING

Aim for approximately:

```text
primary statement
8–16px
secondary statement

24–30px

description

28–34px

actions
```

Do not create giant gaps.

Do not squash everything together.

Tune based on rendered screenshots.

---

# 15. CTA HIERARCHY

Keep:

**Start a project**

and

**See how we built Raw Radicles**

Primary:

filled DSPL gold button.

Secondary:

text-led action with arrow.

Preferred visual:

```text
[ Start a project ]     See how we built Raw Radicles →
```

Do not make the secondary action another equally dominant filled button.

It may use a subtle transparent hit area but should visually read as text/action.

Maintain:

- minimum 44px hit target
- keyboard focus style
- good contrast
- existing routes

Do not alter the destinations.

---

# 16. CONTENT WIDTH

Do not constrain the hero to the old narrow 700px text column.

The centred typography needs room.

Start around:

```css
width: min(92vw, 1180px);
```

for the hero composition wrapper.

The paragraph gets its own narrow max-width.

The headline may use the wider wrapper.

This lets the first statement breathe naturally.

---

# 17. HERO VERTICAL ARCHITECTURE

Prefer a clean structure such as:

```css
.home-hero {
  position: relative;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
}
```

Background picture remains absolutely positioned behind both rows.

Row 1:

hero message + CTAs

Row 2:

supporter proof/marquee

This allows the supporter area to remain visually part of the image while avoiding random absolute-position spacing.

Do not allow the marquee to push the hero content unpredictably.

---

# 18. RESTORE THE OLD MARQUEE FEEL

The earlier/live DSPL screenshot is the proof-strip reference.

What worked there:

- logos were clearly visible
- logos were substantially larger
- movement happened over the photographic hero
- proof felt integrated with the first screen

Restore that feeling.

Do NOT restore MUTBI.

---

# 19. VERIFIED SUPPORTERS ONLY

Unique supporters are exactly:

1. DST NIDHI
2. NIDHI PRAYAS
3. Startup Karnataka

MUTBI remains removed.

Do not invent additional supporters.

Do not add generic placeholder logos.

Do not duplicate logos semantically.

Visual repetition is allowed only for marquee continuity.

---

# 20. MARQUEE LABEL

Use:

**RECOGNISED AND SUPPORTED BY**

Preferred placement:

**centered above the moving logo row**

This better matches the centred hero composition than the recent fixed left-hand label panel.

Concept:

```text
          RECOGNISED AND SUPPORTED BY

DST NIDHI   NIDHI PRAYAS   STARTUP KARNATAKA   DST NIDHI ...
←                                                    ←
```

Keep the label static.

Only logos move.

Label should be approximately:

```text
11–13px
700–800 weight
0.08–0.12em tracking
uppercase
```

Use muted white.

Do not make it gold-heavy.

---

# 21. DO NOT CREATE A SOLID MARQUEE BAR

The current opaque navy/black rectangle behind the supporter strip is rejected.

The marquee should remain visibly **on top of the photograph**.

Preferred background:

```css
transparent
```

or at most:

```css
rgba(5, 7, 10, 0.10–0.18)
```

if visual QA proves it is necessary.

Do not turn it into a footer.

No heavy top/bottom borders.

No card.

No rounded corners.

---

# 22. MAKE SUPPORTER LOGOS LARGE

The latest local logos are almost invisible.

That is not acceptable.

At a full-page desktop screenshot, the user must immediately recognize each supporter.

Optical targets:

```text
DST NIDHI:
visible height ~36–44px

NIDHI PRAYAS:
visible height ~38–46px

Startup Karnataka:
visible height ~34–42px
```

These are visual targets, not mandatory raw CSS heights.

The source PNGs have different internal whitespace.

Normalize each independently.

Use per-logo classes if required.

Example:

```text
supporter-logo-dst
supporter-logo-nidhi
supporter-logo-startup
```

Tune each so all three feel equally important.

---

# 23. KEEP LOGOS BRIGHT

Use white/monochrome supporter assets at high visibility.

Target opacity approximately:

```css
opacity: .92–1;
```

Do not use low-opacity background-decoration treatment.

Do not reduce logos to 40–50% opacity.

If the photograph causes readability problems, use a tiny restrained shadow behind the image marks rather than making the entire marquee dark.

---

# 24. REMOVE MARQUEE ARROWS

The generated concept contains left/right arrows around the supporter strip.

Do NOT implement them.

The marquee is not a carousel.

There are no manual controls.

It simply moves continuously.

---

# 25. MARQUEE DIRECTION

Normal mode:

**right → left**

Always.

Do not alternate.

Do not bounce.

Do not reverse.

Do not stop after one sequence.

---

# 26. MARQUEE MUST BE TRULY INFINITE

There must be:

- no visible first item
- no visible last item
- no blank interval
- no reset flash
- no backwards jump
- no large gap between repeated sequences

Watch it for two complete loops before declaring completion.

---

# 27. USE A PURE-CSS LOOP

Do not restore the old:

- ResizeObserver
- runtime width measurement
- layout effect
- animation-state calculations

unless there is absolutely no alternative.

Prefer deterministic CSS.

Suggested structure:

```jsx
<div className="supporter-marquee">
  <div className="supporter-track">

    <div className="supporter-sequence">
      DST
      NIDHI PRAYAS
      STARTUP KARNATAKA
    </div>

    <div
      className="supporter-sequence"
      aria-hidden="true"
    >
      DST
      NIDHI PRAYAS
      STARTUP KARNATAKA
    </div>

    <div
      className="supporter-sequence"
      aria-hidden="true"
    >
      DST
      NIDHI PRAYAS
      STARTUP KARNATAKA
    </div>

  </div>
</div>
```

Use 3 repeated sequences if that makes first-paint coverage and wide-screen continuity more robust.

---

# 28. DETERMINISTIC MARQUEE GEOMETRY

The repeated sequence must have a known identical width.

A strong starting architecture is:

```css
.supporter-band {
  --supporter-sequence-width: 75vw;
}

.supporter-sequence {
  flex: 0 0 var(--supporter-sequence-width);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
```

Then animate exactly one sequence width:

```css
@keyframes supporter-loop {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform:
      translate3d(calc(-1 * var(--supporter-sequence-width)), 0, 0);
  }
}
```

This is a starting implementation pattern, not a mandatory literal value.

The final geometry must be visually seamless.

Do not animate an approximate percentage unrelated to the sequence width.

---

# 29. MARQUEE SPEED

Start at approximately:

```css
animation: supporter-loop 28s linear infinite;
```

Test:

```text
26–34 seconds
```

Choose the calmest speed that still makes motion obvious.

It should feel like ambient proof.

Not a ticker.

---

# 30. DESKTOP LOGO DENSITY

With only three unique supporters, avoid large empty areas.

At 1440–1920px, aim to have approximately **4–6 logo instances visible** across the moving viewport at most moments because the following repeated sequence is already entering.

This is intentional repetition of the same three verified supporters.

It must not imply additional organisations.

---

# 31. FIRST PAINT

The supporter row must appear full immediately.

Do not wait for measurements.

Do not render a tiny static version and then switch to animation.

No layout shift.

No flash of unstyled logos.

The repeated DOM sequences should already exist on first render.

---

# 32. PAUSE ON HOVER

On pointer-capable devices:

```css
.supporter-track:hover {
  animation-play-state: paused;
}
```

or equivalent interaction.

Do not apply hover-pausing on touch-only devices.

---

# 33. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

In reduced-motion mode:

- disable marquee animation
- display one real supporter sequence
- hide animation-only duplicates
- keep all three logos visible
- keep logo sizes large
- keep the supporter label

Do not remove the proof section.

---

# 34. MARQUEE ACCESSIBILITY

Only the first semantic sequence exposes supporter names.

Animation-only repetitions must use:

```jsx
aria-hidden="true"
```

and duplicate image alts must be empty.

Keep the region accessible as:

**Recognised and supported by**

Do not cause screen readers to read:

DST NIDHI
NIDHI PRAYAS
Startup Karnataka

three times.

---

# 35. DO NOT ADD EDGE GRADIENTS

No marquee edge-mask gradients for this implementation.

No:

```css
mask-image: linear-gradient(...)
```

No fading logos in/out through white/dark gradients.

Clean clipping is preferred.

If later visual QA genuinely proves a subtle fade is required, report it first rather than automatically adding it.

---

# 36. MOBILE HERO

Keep the photographic hero on mobile.

Use the existing approved mobile-specific image asset.

Do not create:

text section
then photograph
then proof section

as three separate blocks.

The photograph remains the canvas.

At mobile widths, the headline naturally becomes:

```text
We build
consumer brands.

We help businesses
build theirs.
```

Keep the content centered.

Do not force the desktop line wrapping.

---

# 37. MOBILE TYPE SCALE

Start around:

Primary:

```css
clamp(2.7rem, 12vw, 4rem)
```

Secondary:

```css
clamp(1.8rem, 8vw, 2.75rem)
```

Description:

```text
15–17px
```

Tune per actual screenshot.

Avoid a headline that consumes so much vertical space that actions or proof disappear.

---

# 38. MOBILE CTA

At narrow widths:

```text
[ Start a project ]

See how we built Raw Radicles →
```

Stack if necessary.

Center them.

Maintain proper touch sizes.

Do not make the secondary action a full gold button.

---

# 39. MOBILE MARQUEE

The marquee still moves on normal-motion mobile.

Do not shrink the supporter marks into tiny icons.

Target optical logo height approximately:

```text
26–34px
```

The label may sit in its own centered line above the moving track.

Give the marquee enough vertical room.

---

# 40. TABLET

At 768–1024px, do not simply inherit desktop values.

Check:

- headline wrap
- vertical centre
- paragraph width
- CTA position
- marquee overlap
- image focal point

Use responsive adjustments intentionally.

---

# 41. DO NOT CHANGE THE HEADER

Keep the existing production DSPL header.

Do not recreate the generated mockup's header.

Do not change:

- logo
- navigation structure
- Start a Project header action
- sticky behaviour

unless a hero regression requires a minor technical fix.

This task is not a header redesign.

---

# 42. DO NOT REDESIGN THE PHOTOGRAPH

The generated mockup is only a **layout reference**.

Do not try to recreate:

- its altered shelf placement
- its altered parcel placement
- lighting changes
- different crop details
- generated clothing/product objects

Use the actual existing DSPL hero asset.

---

# 43. DO NOT MODIFY BELOW-THE-FOLD CONTENT IN THIS PASS

Do not restart another redesign of:

- Brand / Market / Commerce
- Compliance coordination
- How We Work With You
- testimonials
- Raw Radicles
- footer

Those sections have already been iterated.

This pass is specifically about getting the hero and supporter marquee right.

Only make a below-the-fold change if required to fix the immediate hero → next-section transition.

---

# 44. REMOVE REJECTED HERO CODE

Clean out CSS/JS left from the rejected experiments:

- split-screen layout
- ivory left panel
- serif hero typography
- directional overlay gradient
- solid dark proof strip
- tiny static logo layout
- dead supporter-marquee implementations

There should be one clear implementation when finished.

Do not layer new overrides on top of obsolete CSS.

---

# 45. PRESERVE PROJECT FACTS AND SYSTEMS

Do not change:

- company facts
- statutory data
- contact details
- SEO metadata
- route metadata
- Sanity integration
- analytics
- form behaviour
- blog architecture
- Raw Radicles factual claims
- route destinations
- prerender behaviour

This is a visual homepage hero task.

---

# 46. TESTS

Update tests only where behaviour intentionally changes.

Expected hero regressions should cover:

- exactly 3 unique verified supporters
- MUTBI absent
- H1 remains the approved consumer-brand proposition
- existing hero artwork still uses one responsive `<picture>`
- eager/high-priority hero image remains
- supporter region is accessible
- duplicated marquee sequences do not create duplicate accessible supporter names

Do not weaken unrelated tests.

Do not write brittle tests for exact pixel values.

Structural intent matters more than literal CSS numbers.

---

# 47. PRIMARY DESKTOP ACCEPTANCE VIEW

At `1440×900`, the hero should visually resemble this composition:

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER                                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                 FULL APPROVED PHOTOGRAPH                     │
│                                                              │
│                         We build                             │
│                     consumer brands.                         │
│                                                              │
│             We help businesses build theirs.                 │
│                                                              │
│        DSPL develops its own consumer brands and helps       │
│         businesses coordinate branding, marketing,          │
│            e-commerce and compliance support.                │
│                                                              │
│      [ Start a project ]   Raw Radicles →                    │
│                                                              │
│              RECOGNISED AND SUPPORTED BY                     │
│                                                              │
│ ← DST   NIDHI   STARTUP   DST   NIDHI   STARTUP   DST ←     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

This diagram expresses hierarchy only.

Do not copy its exact coordinates blindly.

---

# 48. WHAT SHOULD BE MOST NOTICEABLE

When viewing the screenshot from normal distance, attention should occur in this order:

1. **We build consumer brands.**
2. **We help businesses build theirs.**
3. hero photograph
4. Start a project
5. supporter logos
6. supporting description
7. secondary action

If the paragraph becomes the third-most-dominant element, it is too strong.

If the logos are almost invisible, they are too small.

If the gold sentence overwhelms everything, reduce its scale/weight rather than changing the whole concept.

---

# 49. NO EXTRA DECORATION

Do not add:

- eyebrow above H1
- gold divider line
- dot
- arrows around marquee
- floating statistics
- service chips
- glass cards
- badges
- noise overlays
- grain overlays
- custom cursor
- scroll hint
- animated words
- 3D effects
- WebGL
- parallax
- new icon decorations

The visual strength must come from the photograph and typography.

---

# 50. MANDATORY SCREENSHOT QA

Render and inspect:

```text
1920×1032
1440×900
1280×800
1024×768
768×1024
390×844
375×812
320×568
```

Do not rely only on automated tests.

---

# 51. COMPARE AGAINST THE ATTACHED REFERENCE

At desktop, compare side-by-side with the attached generated centered mockup.

Match its principles:

- centered visual composition
- large first statement
- strong gold second statement
- short supporting paragraph
- restrained CTAs
- visible proof
- full photographic canvas

Do NOT copy its generated photograph/header/decorative line/arrows.

---

# 52. COMPARE AGAINST THE OLD DSPL SCREENSHOT

Use the old/live screenshot only to validate:

- supporter logos are clearly visible
- marquee feels integrated with the photograph
- supporter movement occupies enough horizontal space
- logo size feels credible

Do NOT restore MUTBI.

Do NOT restore outdated page/navigation content.

---

# 53. WATCH THE MARQUEE

Screenshots cannot prove a seamless marquee.

At these widths:

```text
1920
1440
1024
390
```

observe at least **two complete cycles**.

Reject the implementation if you see:

- seam
- rewind
- pause
- blank space
- jump
- inconsistent spacing

Fix the geometry before continuing.

---

# 54. REDUCED-MOTION QA

Emulate:

```text
prefers-reduced-motion: reduce
```

and verify visually.

Capture at least one screenshot.

Ensure:

- no movement
- all 3 supporters visible
- no huge empty spaces
- no duplicate accessible content

---

# 55. VISUAL ITERATION IS MANDATORY

Do not make one CSS pass and declare success.

Use this sequence:

1. implement desktop structure
2. capture 1440 screenshot
3. compare to reference
4. adjust typography/vertical position
5. adjust supporter optical sizes
6. verify marquee loop
7. test 1920/1280/1024
8. implement tablet/mobile
9. inspect mobile crop and wrapping
10. run automated verification

If the 1440 screenshot is weak, iterate BEFORE moving on.

---

# 56. AUTOMATED VERIFICATION

After the visual composition is approved locally, run:

```bash
npm run lint
npm test
npm run build
node scripts/verify-prerender.mjs
```

Report actual numbers/results.

Do not copy previous counts.

---

# 57. WORKING TREE SAFETY

Before editing:

```bash
git status --short
git branch --show-current
```

Preserve unrelated local changes.

Do not overwrite unrelated work.

After completion report:

```bash
git status --short
git diff --stat
```

and summarize the relevant diff.

---

# 58. DO NOT COMMIT OR PUSH

Do not:

- commit
- push
- merge
- open a PR

unless explicitly instructed after visual review.

The user wants to see the finished local implementation first.

---

# FINAL ACCEPTANCE STANDARD

This work passes only when the homepage opening looks like **one intentional cinematic brand statement**.

It must have:

**the existing full-bleed DSPL photograph**

**large centered Outfit typography**

**white primary statement**

**gold secondary statement**

**one concise factual subhead**

**one dominant CTA + one quieter secondary action**

**large visible verified supporter logos**

**continuous right-to-left infinite marquee**

**no opaque marquee footer**

**no directional gradient**

**no serif**

**no unnecessary decorative elements**

The attached generated centered mockup is the main composition reference.

Do not copy its generated artwork.

Recreate its hierarchy and feeling using the real DSPL assets and code.

If the final 1440 screenshot feels like:

“large centered brand statement over one immersive photograph”

the implementation is correct.

If it feels like:

“ordinary text and buttons laid over a background image”

continue iterating before reporting completion.