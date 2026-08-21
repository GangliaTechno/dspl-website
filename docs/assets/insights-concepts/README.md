# Insights article illustration masters

These approved PNG masters preserve the source artwork for the DSPL Insights
articles. The listing uses deterministic WebP delivery derivatives under
`src/assets`; the masters remain here for provenance and future recropping.

## Generation record

- Generation method: OpenAI built-in image generation through the Codex image-generation workflow.
- Generation date: 2026-08-21.
- Shared visual direction: Signal Geometry.
- Output format: PNG masters for review.
- WebP derivatives: six production outputs generated locally with Sharp using
  centre cropping, Lanczos 3, WebP quality 86, effort 6, and no upscaling.

## Asset mapping and integrity

| File | Exact article | Dimensions | Bytes | SHA-256 |
| --- | --- | ---: | ---: | --- |
| `insights-brand-market-commerce-signal-geometry-v1.png` | “Coordinating Brand, Market, and Commerce as One System” | 1672 × 941 | 1,521,692 | `D65B35B588F2717B661233BF6206EC0349839655ECC55F5CEFADC78EA8DBD190` |
| `insights-packaging-to-purchase-signal-geometry-v1.png` | “From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter” | 1672 × 941 | 1,543,093 | `A9098C52536648E5ABD49B98A8C43ECEC8D9EA0A30C1AC20F225C8E69D64F970` |
| `insights-packaging-to-purchase-signal-geometry-v2.png` | “From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter” | 1672 × 941 | 1,346,168 | `DF1D42857D0D6A8B91AE55360EC1D352EC845647A60F244CA631C1DAB2B6D307` |

## Production derivatives

| Family | Delivery files | Dimensions | Source master |
| --- | --- | --- | --- |
| Brand, Market and Commerce | `src/assets/insights-brand-market-commerce-{640,960,1440}.webp` | 640 × 360, 960 × 540, 1440 × 810 | `insights-brand-market-commerce-signal-geometry-v1.png` |
| Packaging to Purchase | `src/assets/insights-packaging-to-purchase-{640,960,1440}.webp` | 640 × 360, 960 × 540, 1440 × 810 | `insights-packaging-to-purchase-signal-geometry-v2.png` |

The PNGs are byte-for-byte copies of the generated originals. The generated
originals remain in the Codex generated-images directory and were not
overwritten.

## Shared Signal Geometry rules

- Warm off-white paper field, `#F5F3EE`.
- Crisp charcoal linework, `#111111`.
- Restrained DSPL gold, `#F5A800`, below five percent of the image.
- Precise two-dimensional geometric forms, generous negative space, and barely perceptible paper grain.
- Wide 16:9 landscape composition with meaningful marks held inside the central crop-safe area.
- Editorial, intelligent, institutional, mature, and quiet; no playful or futuristic treatment.
- No embedded text, visible language, pseudo-text, glyphs, labels, logos, watermarks, or other language-like marks.
- No people, hands, office objects, screens, dashboards, charts, UI, literal icons, generic AI-business imagery, gradients, glow, shadows, glossy 3D forms, blue or purple SaaS colours, or literal flowchart styling.

## Exact generation prompts

### Brand, Market and Commerce

```text
Use case: original editorial illustration.

Asset type: review-only 16:9 landscape article illustration for Dashapatmaja Solutions Pvt Ltd Insights.

Create a sparse abstract “Signal Geometry” composition about brand, market, and commerce operating as one coordinated system. This must be one unified visual event, not three panels and not an infographic.

On a warm off-white paper field (#F5F3EE), arrange three clearly different but visually related geometric structures around a calm shared junction positioned slightly off centre:
- At left, a disciplined formation of two or three large nested rectangular planes and one open frame, representing brand constraints and standards.
- At upper right, one sparse offset-ring structure with an open aperture, representing market sensing and feedback.
- At lower right, a stepped formation of three or four broad interlocking modules, representing commerce and operational channels.

From each structure, draw one clean fine charcoal trace toward the same central junction. Mark the shared junction with only two or three tiny restrained DSPL-gold anchor discs (#F5A800). Add one very pale charcoal return arc travelling from the lower-right structure back toward the left structure, suggesting feedback returning into brand decisions. The return arc must remain subtle and must not have an arrowhead.

Style: intelligent modernist editorial illustration, precise two-dimensional geometry, crisp charcoal linework (#111111), generous negative space, barely perceptible natural paper grain, institutional warmth, mature and quiet rather than playful or futuristic.

Composition: wide 16:9 landscape; asymmetrical but balanced; approximately 70% untouched background; keep all meaningful geometry within the central 70% of the width and central 68% of the height; no important mark touches an edge. The three systems must remain distinguishable when the image is reduced to a small article card.

Gold must occupy less than 5% of the image. Use no other accent colours.

Do not render the article title or any visible language. There must be no words, letters, numbers, glyphs, pseudo-text, tiny repeated marks, labels, logos, watermarks, barcodes, screens, UI, charts, legends, axes, arrows, cart icons, dashboards, people, hands, office objects, network-node webs, literal flowchart boxes, gradients, glow, shadows, glossy 3D forms, blue or purple SaaS colours, or generic AI-business imagery.
```

### Packaging to Purchase

```text
Use case: original editorial illustration.

Asset type: review-only 16:9 landscape article illustration for Dashapatmaja Solutions Pvt Ltd Insights.

Create a sparse abstract “Signal Geometry” composition about a consumer-brand launch progressing from packaging to purchase, fulfilment, and measurement. It must belong unmistakably to the same visual family as a warm off-white, charcoal-line, restrained-gold illustration of three systems converging on shared context. This must be one continuous geometric transformation, not a row of icons, not a timeline, and not a literal flowchart.

Across a warm off-white paper field (#F5F3EE), run one fine continuous charcoal filament from left to right without an arrowhead. Let the filament physically pass through and transform into six spacious abstract states:
1. A single folded planar shell made from two broad planes, suggesting packaging without depicting a literal branded box.
2. Three broad aligned rectangular plates held within one open frame, suggesting a structured catalogue record without resembling text, a document, or a screen.
3. One clean gate that opens the filament into three widely spaced channels and then gathers them again, suggesting channel distribution.
4. A precise circular aperture or commitment threshold through which the filament passes, suggesting checkout.
5. A compact interlocking modular cradle made from two or three large blocks, suggesting fulfilment and reliable handling.
6. One thin sensing ring with a single offset point, suggesting measurement.

Use one short DSPL-gold segment (#F5A800) on the filament between the commitment threshold and fulfilment module, plus no more than two tiny gold anchor points in the entire image. Add one very pale charcoal return curve from the sensing ring toward the folded first form to imply measurement informing the next iteration. The return curve must be quiet and have no arrowhead.

Style: intelligent modernist editorial illustration, precise two-dimensional geometry, crisp charcoal linework (#111111), generous negative space, barely perceptible natural paper grain, institutional warmth, mature and quiet rather than playful or futuristic.

Composition: wide 16:9 landscape; rhythmic but not evenly boxed; approximately 70% untouched background; contain all six states within the central 70% of the width and central 68% of the height so the full sequence survives a restrained centre crop; no meaningful mark touches an edge. At small article-card size, the continuous transformation must read before its individual stages.

Gold must occupy less than 5% of the image. Use no other accent colours.

Do not render the article title or any visible language. There must be no words, letters, numbers, glyphs, pseudo-text, tiny repeated marks, labels, logos, watermarks, barcodes, screens, UI, charts, legends, axes, arrows, cart icons, dashboards, people, hands, office objects, network-node webs, separate icon boxes, literal flowchart styling, gradients, glow, shadows, glossy 3D forms, blue or purple SaaS colours, or generic AI-business imagery.
```

## Rejection criteria

Reject a concept revision if either image contains visible or pseudo-text, accidental lettering, logos or watermarks; people, hands, screens, dashboards, literal product photography, generic AI-business imagery, or decorative stock-style scenes; dense network webs, repeated icon rows, literal flowchart boxes, arrowheads, or a timeline treatment; gradients, glow, shadows, glossy 3D rendering, blue/purple SaaS accents, or gold above the restrained limit; edge-touching geometry that fails the centre crop; or a composition that does not clearly communicate its assigned article at small card size.

Also reject the pair if the two images do not read as one coordinated Signal Geometry family: mismatched background temperature, line weight, accent treatment, density, crop behavior, or editorial maturity is grounds for revision. These assets remain concepts until both semantic fit and pair consistency are approved.

## Revision status

- `insights-packaging-to-purchase-signal-geometry-v1.png` remains rejected history because it read too much like an edge-to-edge timeline and its small details were fragile at article-card size.
- `insights-packaging-to-purchase-signal-geometry-v2.png` is the approved source master for the Packaging to Purchase production family.

## Exact targeted v2 edit prompt

```text
Edit the referenced illustration with one focused composition correction.

Preserve exactly: the warm off-white matte paper field, fine charcoal line style, restrained DSPL-gold segment and anchor points, no-text/no-logo character, the six existing semantic motifs (folded planar packaging shell, structured catalogue plates, distribution gate, circular commitment aperture, interlocking fulfilment cradle, sensing ring), and the quiet pale return curve.

Change only the spatial composition and small-scale legibility:
- Stop the main filament well inside both the left and right edges, with generous untouched gutters.
- Recompose the six states into one larger, gently staggered continuous transformation that rises and falls subtly through the field instead of forming an evenly spaced horizontal row.
- Make the whole event feel like one evolving geometric organism, not a timeline, process diagram, row of icons, or literal flowchart.
- Enlarge and simplify the catalogue plates and channel gate so their silhouettes remain clear at approximately 360 pixels wide.
- Keep all meaningful geometry within the central 72% of the width and central 66% of the height.
- Retain roughly 70% negative space and the exact rare-gold discipline.
- The filament must have no arrowhead and the return curve must remain pale and unobtrusive.

Do not add or alter anything else. Absolutely no words, letters, numbers, glyphs, pseudo-text, barcodes, labels, logos, watermarks, screens, UI, charts, axes, arrows, cart icons, people, hands, office objects, network webs, gradients, glow, shadows, glossy 3D, blue or purple colours, or generic AI-business imagery. Output a clean 16:9 landscape editorial illustration.
```
