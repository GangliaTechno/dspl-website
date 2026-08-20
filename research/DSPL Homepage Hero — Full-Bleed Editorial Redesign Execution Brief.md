# DSPL Homepage Hero — Full-Bleed Editorial Redesign

Implement this directly. Do not produce another design proposal before editing.

The current split-screen hero is rejected.

The homepage hero must return to the earlier **full-width, full-bleed image treatment**, while substantially redesigning the typography, text hierarchy, positioning, overlay and supporter marquee.

The goal is:

**same strong full-page photographic hero + much better editorial typography + stronger hierarchy + seamless moving proof rail.**

Do not create a left ivory panel.

Do not place the photograph inside a separate column.

Do not turn the hero into two cards or two panels.

---

# 1. Restore the Full-Bleed Hero Image

The approved existing hero photograph must fill the entire hero area again.

Structure:

```text
HEADER
────────────────────────────────────────

FULL-WIDTH PHOTOGRAPH
FULL-WIDTH PHOTOGRAPH
FULL-WIDTH PHOTOGRAPH

      editorial hero typography
      supporting copy
      CTAs

FULL-WIDTH PHOTOGRAPH

────────────────────────────────────────
SEAMLESS SUPPORTER MARQUEE
```

The image should:

- cover 100% viewport width
- visually occupy most of the first screen
- use the existing responsive hero sources
- retain `object-fit: cover`
- preserve `fetchPriority="high"`
- preserve explicit image dimensions
- preserve responsive `srcSet`
- avoid layout shift

Do not crop the image so aggressively that the recognizable workspace composition disappears.

At approximately 1440×900, the hero should feel close to a full viewport beneath the header.

Suggested:

```css
min-height: calc(100svh - var(--header-height));
```

But allow a sensible minimum such as approximately 650–700px so short desktop screens remain usable.

The supporter marquee can sit at the bottom of the hero or immediately after it, but visually it should feel integrated into the first-screen composition.

---

# 2. Do NOT Keep the Current Split Typography

The current:

```text
From brand idea
to market reality.

We build our
own, too.
```

inside a white panel is rejected.

The original DSPL positioning is stronger and should remain recognizable:

```text
We build consumer brands.
We help businesses build theirs.
```

Do not rewrite this again unless absolutely necessary.

The redesign should come primarily from **typography and composition**, not from replacing the proposition.

---

# 3. Create a Much Stronger Editorial Headline Treatment

Use the original two-part statement, but make each part visually distinct.

Preferred direction:

```text
WE BUILD
CONSUMER BRANDS.

We help businesses
build theirs.
```

or:

```text
We build
consumer brands.

We help businesses
build theirs.
```

Do not force this exact line break blindly. Test it visually at 1280px and 1440px.

The important idea is:

**Line/statement one = strong, structured, authoritative**

**Line/statement two = expressive, contrasting, editorial**

Explore a controlled combination of:

- existing Outfit / strong sans for the first statement
- one restrained editorial serif or italic display style for the second statement

Do not introduce several fonts.

If introducing a serif, use it only for the expressive second statement or a small part of the headline.

Potential direction:

```text
WE BUILD
CONSUMER BRANDS.

We help businesses
build theirs.
```

Where:

- first statement is bold sans
- second statement is larger/lighter editorial serif or italic serif
- gold is used selectively, not across the entire H1

The result should feel like a sophisticated brand consultancy, not a corporate PowerPoint slide.

---

# 4. Headline Size and Scale

At 1440px desktop, explore approximately:

```text
primary statement: 72–92px
expressive statement: 76–100px
```

depending on line wrapping.

Do not mechanically use the same size for both.

Hierarchy should come from contrast.

For example:

```text
We build consumer brands.
```

Strong white heavy sans.

Then:

```text
We help businesses build theirs.
```

Gold/ivory editorial serif or lighter display typography.

Do not use bright gold for large blocks if it visually overwhelms the photograph.

Use DSPL gold selectively.

---

# 5. Move Away From Perfect Centering

The old hero was too mechanically centered.

Do not return to a perfectly centered block floating in the exact middle of the image.

Use an editorial asymmetric placement while keeping the image full bleed.

Preferred desktop direction:

```text
          IMAGE IMAGE IMAGE IMAGE

      We build
      consumer brands.

      We help businesses
      build theirs.

      supporting text

      CTA     secondary action

          IMAGE IMAGE IMAGE IMAGE
```

Place the copy slightly left of the geometric centre.

Use the site's actual container alignment.

Suggested content width:

```css
width: min(760px, 100%);
```

or visually appropriate equivalent.

Avoid putting text over the busiest part of the photograph.

Use the dark negative-space section of the image for typography wherever possible.

---

# 6. Improve the Overlay

Do not use one flat black overlay across the whole photograph.

Use a controlled layered overlay that preserves image detail.

For example:

- subtle global darkening
- stronger local gradient behind the text
- almost transparent treatment over visually important parts of the image

Conceptually:

```css
background:
  linear-gradient(
    90deg,
    rgba(5, 7, 10, 0.76) 0%,
    rgba(5, 7, 10, 0.54) 38%,
    rgba(5, 7, 10, 0.16) 70%,
    rgba(5, 7, 10, 0.10) 100%
  );
```

Do not copy this exact value without checking the image.

The objective is:

**excellent text legibility without making the entire photograph muddy.**

---

# 7. Supporting Copy

Keep the factual meaning.

Preferred concise version:

> Dashapatmaja Solutions Pvt Ltd develops its own consumer brands and supports businesses across branding, marketing, e-commerce and compliance coordination.

Do not make this paragraph visually dominant.

Target:

```text
16–20px
~40–52ch
1.5–1.6 line height
```

Use slightly muted white rather than pure white.

---

# 8. CTA Treatment

Keep:

**Start a project**

**See how we built Raw Radicles**

But change the hierarchy.

Primary:

```text
gold filled button
```

Secondary:

Prefer either:

```text
text link + arrow
```

or a very restrained transparent/outline treatment.

Do not make both CTAs look equally heavy.

Preferred:

```text
[ Start a project ]    See how we built Raw Radicles →
```

This would suit the editorial hero better than two large boxes.

Maintain 44px minimum touch targets.

---

# 9. Supporter Marquee MUST Move Continuously

The current static proof row is rejected.

Restore continuous movement.

Verified supporters remain ONLY:

- DST NIDHI
- NIDHI PRAYAS
- Startup Karnataka

MUTBI remains removed.

Because only three unique organisations exist, repeat those three visually to create a continuous track.

That repetition is for motion/layout only and must not imply additional supporters.

---

# 10. Marquee Must Be Truly Seamless

The current/requested behaviour is an infinite directional loop with **no visible ending**.

It must never:

- reach the last logo and stop
- show a giant empty gap
- jump visibly back to the first logo
- restart from an obvious beginning
- briefly show an empty track

Use duplicated identical sequences.

Conceptual DOM:

```html
<div class="supporter-marquee">
  <div class="supporter-track">
    <div class="supporter-sequence">
      DST
      NIDHI PRAYAS
      STARTUP KARNATAKA
    </div>

    <div class="supporter-sequence" aria-hidden="true">
      DST
      NIDHI PRAYAS
      STARTUP KARNATAKA
    </div>
  </div>
</div>
```

The two sequences must have exactly matching:

- widths
- gaps
- padding
- logo slot geometry

Animate the track by exactly one sequence width.

For example conceptually:

```css
@keyframes supporter-loop {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
}
```

Only use `-50%` if the track structure guarantees exactly two equal halves.

Otherwise implement an equivalent mathematically seamless structure.

Do not use an approximate percentage that produces a jump.

---

# 11. Marquee Direction

Default direction:

**right → left**

Logos should continuously enter from the right edge and leave through the left edge.

Animation should feel calm, not like a news ticker.

Suggested desktop duration:

```text
28–36 seconds
```

depending on actual sequence width.

Use:

```css
linear infinite
```

No easing.

No acceleration/deceleration.

Pause on hover for pointer devices.

---

# 12. Marquee Should Already Be Filled on First Paint

This is important.

Do not wait for JavaScript measurement before rendering the correct track.

Do not start with three tiny centered logos and then switch into animation.

Prefer pure CSS layout.

The viewport should appear occupied immediately.

If necessary use 3 repeated sequences rather than 2 so wide screens always remain filled.

Example concept:

```text
DST   NIDHI   STARTUP   DST   NIDHI   STARTUP   DST...
← continuous direction
```

There should always be another logo entering before the previous sequence leaves.

---

# 13. Make the Logos Significantly Larger

The current proof logos are too small.

Increase their optical presence.

Do not assign identical raw image widths because the artwork has different internal whitespace.

Create equal visual slots and normalize each asset individually.

Suggested desktop band:

```text
height: approximately 92–110px
```

Label:

```text
RECOGNISED AND SUPPORTED BY
```

Logo visible height:

approximately:

```text
DST NIDHI: ~34–42px
NIDHI PRAYAS: ~38–46px
Startup Karnataka: ~32–40px
```

These are visual targets, not mandatory literal CSS values.

Adjust each based on actual rendered artwork.

The three marks should look equal in prominence.

---

# 14. Marquee Label

The label should not travel with the logos.

Preferred structure:

```text
┌────────────────────────────────────────────────────────────┐
│ RECOGNISED AND SUPPORTED BY │ logo logo logo logo logo → │
└────────────────────────────────────────────────────────────┘
```

Fixed label on desktop.

Animated logos to its right.

Use a subtle divider between label and logo viewport.

On narrow mobile screens the label may move above the marquee rather than consuming too much horizontal width.

---

# 15. Marquee Accessibility

Only the first semantic sequence exposes real alt text.

Duplicated visual sequences:

```text
aria-hidden="true"
```

and their images use empty alt text.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

In reduced-motion mode:

- disable animation
- show one clean static supporter row
- maintain proper logo size
- keep all supporters visible

Do not remove the supporter content entirely.

---

# 16. Hero + Marquee Composition

The marquee should feel intentionally attached to the hero.

Desktop target:

```text
HEADER

┌──────────────────────────────────────────────┐
│                                              │
│               FULL BLEED IMAGE               │
│                                              │
│     HERO TYPOGRAPHY                          │
│     HERO TYPOGRAPHY                          │
│                                              │
│     short supporting copy                    │
│                                              │
│     CTA      secondary action →              │
│                                              │
│                                              │
├──────────────────────────────────────────────┤
│ RECOGNISED │ ← logos continuously moving ←  │
└──────────────────────────────────────────────┘

NEXT SECTION
```

Do not insert a large cream gap between hero and marquee.

Do not make the marquee look like an unrelated footer.

---

# 17. Do Not Put Excessive Information Above the Fold

The hero only needs:

1. H1
2. short clarification
3. primary action
4. secondary action
5. supporter proof

Nothing else.

No additional badge.

No eyebrow just for decoration.

No floating statistics.

No service chips.

No fake client logos.

No animated decorative shapes.

---

# 18. Hero Typography Is the Main Redesign

Spend most visual iteration time here.

Test several internal compositions before finalizing:

### Direction A

```text
We build
consumer brands.

We help businesses
build theirs.
```

### Direction B

```text
WE BUILD CONSUMER
BRANDS.

We help businesses build theirs.
```

### Direction C

```text
We build consumer brands.

We help businesses
build theirs.
```

Do not change the actual wording between concepts.

Choose whichever works best with the available image negative space.

The final choice must be based on rendered screenshots, not CSS assumptions.

---

# 19. Mobile Hero

Do not turn mobile into the rejected split-panel design.

Keep the image as the hero background/full-bleed photographic field.

Use appropriate mobile-specific hero crop already available in the project.

Target approximately:

```text
min-height: 650–760px
```

depending on device.

Place typography toward the upper/middle region where the mobile crop gives sufficient negative space.

Headline approximately:

```text
42–54px
```

depending on width.

Do not force desktop line breaks on mobile.

Actions may stack.

The supporter marquee continues underneath.

Logo sizes should reduce moderately, not become tiny.

---

# 20. Process Section

Keep the recently improved Audit / Build / Grow information architecture.

Do not revert it.

But make the editorial numerals stronger if that has not yet been done.

Desktop:

```text
01                     02                     03
Audit                  Build                  Grow

description            description            description

──────────             ──────────             ──────────

TIMING                 TIMING                 TIMING
...

OUTPUT                 OUTPUT                 OUTPUT
...
```

`01`, `02`, `03` should become visible compositional elements.

Suggested:

```text
48–72px
```

depending on final design.

No rounded SaaS cards.

No shadows.

Use rules and typography.

---

# 21. Capabilities Section

Do not undertake another major redesign there unless needed to visually connect it with the hero/process system.

Preserve:

- Branding
- Marketing
- E-commerce
- compliance coordination
- current routes

Prefer typography/rules/spacing rather than adding more cards or decoration.

---

# 22. Keep Existing DSPL Brand Language

Core palette remains:

```text
Warm ivory
Deep navy / charcoal
DSPL gold / bronze
White on photography
```

Do not introduce unrelated blues, greens or purple gradients.

Do not make the site visually resemble a generic AI startup.

---

# 23. Implementation Files

Inspect and update as required:

`src/pages/Home.jsx`

`src/pages/Home.css`

`src/components/home/SupporterStrip.jsx`

`src/components/home/ProcessSteps.jsx`

`src/components/home/homeSections.css`

`src/index.css`

`src/pages/__tests__/Home.test.jsx`

`src/__tests__/designSystemRegression.test.js`

Delete dead split-screen hero CSS.

Delete obsolete supporter implementations.

Do not leave two competing hero systems in the stylesheet.

---

# 24. Do Not Modify Unrelated Systems

Do not change:

- Sanity integration
- SEO metadata
- analytics
- company facts
- statutory content
- contact information
- blog architecture
- routing
- prerender architecture
- Raw Radicles facts

This is a homepage visual implementation.

---

# 25. Visual Acceptance Criteria

The redesign FAILS if:

- the hero becomes a white/ivory split panel again
- the photograph occupies only half the viewport
- headline typography looks almost identical to the previous centered version
- all hero text is simply centered
- supporter logos are tiny
- supporter strip is static in normal-motion mode
- marquee visibly ends
- marquee jumps back to its beginning
- there is empty track space during normal animation
- the three supporter logos look materially different in optical size
- mobile becomes a generic stacked white card + image layout

The redesign PASSES if:

- full-bleed image again owns the first screen
- typography itself makes the hero feel redesigned
- H1 has a distinct editorial hierarchy
- copy is positioned deliberately rather than mechanically centered
- photograph remains visibly rich
- CTA hierarchy is clear
- supporter logos are clearly visible
- marquee continuously moves right-to-left without any visible reset
- hero + marquee feel like one composition
- mobile still feels photographic and premium

---

# 26. Mandatory Visual QA

Render actual screenshots at:

`1440×900`

`1280×800`

`1024×768`

`768×1024`

`390×844`

`375×812`

`320×568`

At 1440×900 compare directly against BOTH:

1. the old centered full-image hero
2. the rejected split-screen hero

The final version should retain the immersive full-image quality of version 1 while having substantially stronger typography and composition than either previous version.

Inspect the marquee for at least two complete animation cycles in-browser.

Specifically verify that the loop has no visible seam/reset.

Also enable `prefers-reduced-motion` and confirm the supporter logos become a well-aligned static row.

---

# 27. Verification

After visual QA:

`npm run lint`

`npm test`

`npm run build`

`node scripts/verify-prerender.mjs`

Report actual results.

Do not commit or push unless explicitly instructed.

---

# Final Instruction

Do not stop after getting the DOM/CSS technically correct.

Render the page and visually iterate it.

The desired hero is:

**full photographic first screen + distinctive editorial typography + restrained supporting copy + strong CTA hierarchy + large continuously moving supporter proof rail.**

The rejected direction is:

**cream text panel on the left + photograph on the right.**

Do not return to that split layout.