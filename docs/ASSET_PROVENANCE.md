# Asset Provenance

This record covers production-facing visual assets introduced after the 2026
DSPL website redesign. It records origin and review evidence; it is not a legal
opinion.

| Production files | Method | Provider | Date | Prompt or source | Rights review | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| `dspl-home-editorial-{960,1440,1920}.webp`, `dspl-home-editorial-mobile.webp` | Generated original; responsive derivatives created locally from `dspl-home-editorial-source.png` | OpenAI built-in image generation | 2026-07-29 | Prompt recorded below | Reviewed: no recognizable people or third-party trademarks; packaging is generic; faint non-readable decorative marks only; no watermark | Approved for branch review |
| `dspl-marketing-editorial-{960,1440,1920}.webp`, `dspl-marketing-editorial-mobile.webp` | Generated original; responsive derivatives created locally from `dspl-marketing-editorial-source.png` | OpenAI built-in image generation | 2026-07-29 | Prompt recorded below | Reviewed: no people, trademarks, recognizable brands, billboards, or watermark; charts and planning sheets contain abstract non-readable shapes | Approved for branch review |
| `brands-hero-editorial-{768,1200,1672}.webp`, `brands-hero-editorial-mobile.webp` | Generated original; locally cropped and optimized responsive family | OpenAI built-in image generation | 2026-07-30 | Premium brand-development studio with center-safe composition and generic packaging | Reviewed: no people, readable brand names, third-party trademarks, or watermark | Approved for branch review |
| `about-journey-{2023,2024,2025,2026}.webp` | Four generated originals; locally fitted and optimized to a shared editorial ratio | OpenAI built-in image generation | 2026-07-30 | Milestone briefs in the About mission and journey design record | Reviewed: no recognizable people, copied marks, readable text, or watermark | Approved for branch review |
| `supporter-*-marquee.png` | Optically normalized derivatives made from supplied institutional source marks; transparent canvases and visual baselines standardized without redrawing logos | Local image processing | 2026-07-30 | DSPL-supplied Startup Karnataka, DST NIDHI, NIDHI-PRAYAS, and MUTBI/MAHE marks | Identity artwork preserved; only whitespace, scale, and canvas placement changed | Approved for branch review |
| `home-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/home-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Home 02 brief below; focal points desktop `0.5,0.5`, mobile `0.32,0.5` | Reviewed: no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `home-rotation-03-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/home-03.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Home 03 brief below; focal points desktop `0.5,0.5`, mobile `0.65,0.5` | Reviewed: no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `about-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/about-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus About 02 brief below; focal points desktop/mobile `0.5,0.5` | Reviewed: no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `brands-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/brands-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Brands 02 brief below; focal points desktop `0.5,0.5`, mobile `0.35,0.5` | Reviewed: blank generic packaging; no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `marketing-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/marketing-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Marketing 02 brief below; focal points desktop `0.5,0.5`, mobile `0.35,0.5` | Regenerated after rejecting a branded-camera draft; selected master has no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `branding-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/branding-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Branding 02 brief below; focal points desktop/mobile `0.5,0.5` | Reviewed: abstract unreadable glyph studies only; no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `ecommerce-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/ecommerce-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus E-commerce 02 brief below; focal points desktop `0.5,0.5`, mobile `0.65,0.5` | Reviewed: generic blank devices and packaging; no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |

## Homepage editorial source prompt

```text
Use case: photorealistic-natural
Asset type: DSPL homepage hero background, wide 16:9 website banner
Primary request: Create an original premium Indian consumer-brand environment that communicates brand building, retail readiness, and thoughtful growth. This must be a new composition, not a recreation of any existing photograph.
Scene/backdrop: A refined contemporary Indian consumer-goods brand studio blending into a premium retail presentation space, with warm timber shelving, cream stone or lime-plaster surfaces, restrained brass or saffron-gold accents, subtle deep navy details, and carefully arranged unbranded consumer packaging.
Subject: Cohesive shelves and display tables with believable premium food, wellness, and lifestyle package silhouettes, all fully generic and without readable labels.
Style/medium: Photorealistic editorial architectural and product photography, realistic material grain, natural imperfections, credible scale, high-end but not extravagant.
Composition/framing: Very wide landscape composition suitable for a website hero; calm, uncluttered central area and balanced visual weight across the frame so large centered white headline copy remains readable after a dark overlay; no single hero product; avoid strong objects directly behind the center.
Lighting/mood: Warm diffused late-afternoon interior light, confident, grounded, sophisticated, quietly premium.
Color palette: Warm wood, cream, charcoal, restrained saffron gold, subtle navy.
Constraints: no people; no text; no letters; no numbers; no logos; no trademarks; no recognizable packaging; no watermark; no fake signage; no screens; no futuristic elements; no visual clutter; no dramatic lens distortion.
```

## Marketing editorial source prompt

```text
Use case: photorealistic-natural
Asset type: DSPL Marketing service-page hero background, wide 16:9 website banner
Primary request: Create an original premium editorial scene that communicates practical marketing strategy for an Indian direct-to-consumer brand. It must belong to the same visual family as a warm wood, cream stone, saffron-gold, charcoal, and restrained navy consumer-brand studio, while being a completely new composition.
Scene/backdrop: A refined campaign-planning worktable inside a contemporary Indian brand studio, with unbranded packaging prototypes, blank media-planning sheets, a smartphone with an abstract non-readable analytics visualization, physical colour swatches, a simple campaign storyboard made of blank shapes, and a few restrained product samples.
Subject: The process of connecting product, campaign planning, measurement, and market launch; objects only, no people or hands.
Style/medium: Photorealistic editorial still-life photography, real paper texture, warm timber grain, matte packaging, credible shadows, subtle imperfections, sophisticated but practical.
Composition/framing: Very wide landscape composition suitable for a service-page hero; balanced frame with calm uncluttered central negative space for centered white heading copy after a dark overlay; planning objects arranged primarily around the outer thirds; no dominant screen.
Lighting/mood: Warm controlled studio daylight, confident, intelligent, focused, quietly premium.
Color palette: Warm wood, cream, charcoal, restrained saffron gold, subtle deep navy.
Constraints: no people; no hands; no text; no letters; no numbers; no logos; no trademarks; no recognizable brands or packaging; no billboards; no fake readable interface; no watermark; no neon cityscape; no futuristic holograms; no visual clutter.
```

## Derivative settings

- Desktop aspect ratio: 16:9.
- Desktop widths: 960, 1440, and 1920 pixels.
- Mobile dimensions: 768 x 1024 pixels.
- Format: WebP.
- Quality: 86.
- Resampling: Lanczos.
- Source PNG files remain in `src/assets` for future recropping.

The detailed About milestone briefs are recorded in
`docs/superpowers/specs/2026-07-30-about-mission-journey-design.md`.

## 2026-08-11 site-wide rotation prompt

The selected masters used this shared prompt scaffold:

```text
Use case: photorealistic-natural
Asset type: premium website hero background for Dashapatmaja Solutions Pvt Ltd, very wide landscape master
Style/medium: photorealistic editorial commercial photography, realistic materials, refined but not sterile
Composition/framing: very wide cinematic landscape, calm uncluttered centre for four levels of centred website copy, meaningful objects concentrated in the outer thirds, must also support a 3:4 mobile crop
Lighting/mood: warm natural directional light, controlled contrast, credible working environment
Constraints: no people as the focal subject, no readable text, no logos, no trademarks, no watermark, no floating interface, no fantasy technology, no generic corporate handshake, no repeated objects, no gold colour cast over the whole frame
```

Page-specific selected-master briefs:

```text
Home 02: Coordinated campaign planning workspace with search research, media planning, content layouts, neutral analytics charts without readable labels, and photography contact sheets. Saffron, cobalt accents, burgundy, charcoal, and warm paper accents.

Home 03: Operational commerce workspace connecting premium generic consumer products, storefront photography, order preparation, packaging materials, fulfilment labels with no readable text, and measurement notes. Deep teal, restrained gold, warm white, charcoal, and natural timber.

About 02: Multidisciplinary studio table connecting research, strategy, design, product-development samples, material swatches, technical notes without readable text, and prototyping tools. Warm timber, burgundy, deep green, cream, and restrained gold details.

Brands 02: Active consumer-brand development environment with completely blank unprinted packaging prototypes, formulation materials in plain unlabelled glass vessels, colour studies, blank compliance check sheets, and route-to-market planning represented only by abstract lines and colour blocks. No marks, glyphs, labels, barcodes, logos, or writing on any package or vessel. Cacao, saffron, muted red, forest green, and dark neutral.

Marketing 02: One coordinated marketing programme represented by blank campaign layout sheets, search-intent clustering with abstract lines only, paid-media allocation using unlabelled colour blocks, editorial content planning, unbranded photography contact sheets, and simple measurement charts without numbers or words. All paper and devices must be completely unbranded and unreadable. Restrained gold, cobalt, burgundy, warm neutral, and charcoal.

Branding 02: Disciplined identity-development workspace with unbranded identity boards, typography specimens using abstract unreadable glyphs, packaging studies, paper stocks, print samples, and material swatches. Saffron, forest green, burgundy, cream, and charcoal.

E-commerce 02: End-to-end commerce operations workspace connecting generic product presentation, storefront device silhouettes without readable UI, order flow, payment hardware, packaging, dispatch, inventory, and measurement cues. Deep teal, restrained gold, warm white, charcoal, and natural timber.
```

New rotation derivatives use 16:9 desktop crops at 960 and 1440 pixels, a
640 x 853 mobile crop, WebP quality 86, and Lanczos resampling. The built-in
generation outputs varied between 1659 and 1823 pixels wide, so no 1920-pixel
derivative was manufactured; this preserves the no-upscaling quality rule.
