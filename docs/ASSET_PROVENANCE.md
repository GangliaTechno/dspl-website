# Asset Provenance

This record covers production-facing visual assets introduced after the 2026
DSPL website redesign. It records origin and review evidence; it is not a legal
opinion.

| Production files | Method | Provider | Date | Prompt or source | Rights review | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| `dspl-home-editorial-{960,1440,1920}.webp`, `dspl-home-editorial-mobile.webp` | Generated original; responsive derivatives created locally from `dspl-home-editorial-source.png` | OpenAI built-in image generation | 2026-07-29 | Prompt recorded below | Reviewed: no recognizable people or third-party trademarks; packaging is generic; faint non-readable decorative marks only; no watermark | Approved for branch review |
| `dspl-marketing-editorial-{960,1440,1920}.webp`, `dspl-marketing-editorial-mobile.webp` | Generated original; responsive derivatives created locally from `dspl-marketing-editorial-source.png` | OpenAI built-in image generation | 2026-07-29 | Prompt recorded below | Reviewed: no people, trademarks, recognizable brands, billboards, or watermark; charts and planning sheets contain abstract non-readable shapes | Approved for branch review |
| `brands-hero-editorial-{768,1200,1672}.webp`, `brands-hero-editorial-mobile.webp` | Generated original; locally cropped and optimized responsive family | OpenAI built-in image generation | 2026-07-30 | Premium brand-development studio with center-safe composition and generic packaging | Reviewed: no people, readable brand names, third-party trademarks, or watermark | Superseded by the explicit portfolio-scene direction at `f022b1c` |
| `about-journey-{2023,2024,2025,2026}.webp` | Four generated originals; locally fitted and optimized to a shared editorial ratio | OpenAI built-in image generation | 2026-07-30 | Milestone briefs in the About mission and journey design record | Reviewed: no recognizable people, copied marks, readable text, or watermark | Approved for branch review |
| `supporter-*-marquee.png` | Optically normalized derivatives made from supplied institutional source marks; transparent canvases and visual baselines standardized without redrawing logos | Local image processing | 2026-07-30 | DSPL-supplied Startup Karnataka, DST NIDHI, NIDHI-PRAYAS, and MUTBI/MAHE marks | Identity artwork preserved; only whitespace, scale, and canvas placement changed | Approved for branch review |
| `home-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/home-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Home 02 brief below; focal points desktop `0.5,0.5`, mobile `0.32,0.5` | Reviewed: no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `home-rotation-03-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/home-03.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Home 03 brief below; focal points desktop `0.5,0.5`, mobile `0.65,0.5` | Reviewed: no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `about-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/about-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus About 02 brief below; focal points desktop/mobile `0.5,0.5` | Reviewed: no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Superseded by the explicit multidisciplinary-team direction at `f022b1c` |
| `brands-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/brands-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Brands 02 brief below; focal points desktop `0.5,0.5`, mobile `0.35,0.5` | Reviewed: blank generic packaging; no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Superseded by the explicit portfolio-scene direction at `f022b1c` |
| `marketing-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/marketing-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Marketing 02 brief below; focal points desktop `0.5,0.5`, mobile `0.35,0.5` | Regenerated after rejecting a branded-camera draft; selected master has no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `branding-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/branding-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus Branding 02 brief below; focal points desktop/mobile `0.5,0.5` | Reviewed: abstract unreadable glyph studies only; no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Superseded by the explicit active-workshop direction at `f022b1c` |
| `ecommerce-rotation-02-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/ecommerce-02.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Site-wide rotation prompt plus E-commerce 02 brief below; focal points desktop `0.5,0.5`, mobile `0.65,0.5` | Reviewed: generic blank devices and packaging; no recognizable people, readable text, logos, third-party trademarks, watermark, or malformed objects | Approved for implementation |
| `contact-hero-{960,1440,mobile}.webp` | Generated master `docs/assets/hero-masters/contact-01.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Contact prompt below; focal points desktop `0.5,0.5`, mobile `0.62,0.5` | Reviewed: blank notebook and unbranded meeting environment; no people, readable text, logos, third-party trademarks, or watermark | Approved for implementation |
| `marketing-primary-{960,1440,mobile}.webp` | Regenerated master `docs/assets/hero-masters/marketing-billboard-01.png` using the deleted legacy `src/assets/marketing-banner.jpg` at `428501ec^` as a visual reference; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Marketing regeneration prompt below; focal points desktop `0.5,0.5`, mobile `0.68,0.5` | The legacy file was not republished. Selected derivative contains abstract billboard artwork only; no people, readable campaign copy, logos, third-party trademarks, or watermark | Approved for implementation |
| `ecommerce-primary-{960,1440,mobile}.webp` | Regenerated master `docs/assets/hero-masters/ecommerce-store-01.png` using the deleted legacy `src/assets/ecom.png` at `428501ec^` as a visual reference; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | E-commerce regeneration prompt below; focal points desktop/mobile `0.5,0.5` | The low-resolution legacy file was not republished. Selected derivative uses generic merchandise, blank packaging, and unbranded commerce hardware; no people, readable text, logos, third-party trademarks, or watermark | Approved for implementation |
| `about-team-{01,02}-{960,1440,mobile}.webp` | Generated masters `docs/assets/hero-masters/about-team-{01,02}.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Approved refresh prompts below; desktop focal `0.50,0.50`; mobile focal `01: 0.50,0.50`, `02: 0.52,0.50` | Reviewed: fictional adult collaborators, natural anatomy, no readable text, real logos, trademarks, public figures, named DSPL employees, or watermark | Approved by user; final live crop QA required |
| `brands-portfolio-{01,02}-{960,1440,mobile}.webp` | Generated masters `docs/assets/hero-masters/brands-portfolio-{01,02}.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Approved refresh prompts below; desktop focal `0.50,0.50`; mobile focal `01: 0.50,0.50`, `02: 0.46,0.50` | First `02` draft rejected for synthetic label-like marks; selected families use fictional blank packaging with no readable text, logos, trademarks, people, malformed products, or watermark | Approved by user; final live crop QA required |
| `branding-workshop-{01,02}-{960,1440,mobile}.webp` | Generated masters `docs/assets/hero-masters/branding-workshop-{01,02}.png`; deterministic local crops | OpenAI built-in image generation | 2026-08-11 | Approved refresh prompts below; desktop focal `0.50,0.50`; mobile focal `01: 0.52,0.50`, `02: 0.50,0.50` | First `01` draft rejected for synthetic label-like marks; selected scenes use fictional adults and abstract geometric identity applications with no readable text, real logos, trademarks, public figures, named DSPL employees, malformed anatomy, or watermark | Approved by user; final live crop QA required |

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

## 2026-08-11 approved hero refinements

```text
Contact: Create a premium cinematic editorial website hero photograph for the Contact page of a multidisciplinary brand development, marketing, and e-commerce company. Wide 16:9 composition. A refined contemporary studio meeting table prepared for a serious business conversation: open blank notebook, elegant pen, subtle material samples, a slim laptop seen only as an unbranded edge, warm architectural light, charcoal and cream surfaces, restrained golden amber accents, small green plant in the distance, generous negative space through the center-left for overlaid headline copy. Sophisticated corporate editorial photography, mature, credible, tactile, natural lighting, rich but restrained colour, high-end commercial art direction. No people, no readable text, no letters, no logos, no trademarks, no phone, no UI screens, no watermark, no exaggerated glow, no stock-photo handshake imagery.

Marketing primary: Transform the referenced legacy marketing analytics photograph into a premium cinematic wide website hero for a professional marketing services page. The new scene must clearly communicate real campaign execution rather than a desk: a sophisticated urban media planning and campaign review environment with several large outdoor billboard mockups and digital display panels, colourful abstract campaign artwork in saffron, deep blue, burgundy, teal and warm cream, subtle media-plan sheets and audience charts in the foreground, architectural city light, credible commercial photography, mature editorial art direction. Leave calm negative space through the center for overlaid headline copy. No readable words or numbers, no logos, no trademarks, no recognizable brands, no watermark, no malformed hands or people; use no visible people. Wide 16:9 composition, realistic, rich colour, moderately bright so detail remains visible beneath a restrained overlay.

E-commerce primary: Transform the referenced legacy boutique image into a premium cinematic wide website hero for an e-commerce services page. Preserve the immediate visual idea of a real store, but create a modern omnichannel retail environment: elegant unbranded physical storefront with product shelves and clothing rails, generic blank packaging, a subtle digital storefront display and checkout/payment station, packed order boxes and fulfilment cues, warm architectural light, deep teal, cream, charcoal and restrained saffron accents. Mature corporate editorial photography, realistic, colourful but refined, strong depth, wide 16:9 composition, calm negative space through the center for overlaid headline copy. No readable text, no logos, no trademarks, no recognizable brands, no watermark, no people, no malformed objects. High-resolution and bright enough that the store remains identifiable beneath a restrained dark overlay.
```

The user-selected Home artwork is the existing `home-03.png` master and its
`home-rotation-03-{960,1440,mobile}.webp` derivatives. It is now used as one
static responsive Home hero; no duplicate export family was created.

## 2026-08-11 route-specific hero direction refresh

The user explicitly rejected treating the then-current About, Brands, and
Branding hero images as approved. The old desk-led families remain in the
repository for provenance, but are no longer referenced by those routes.
This also supersedes the earlier `dspl-about-hero-*` and
`dspl-branding-hero-*` route use.

Selected built-in generation prompts:

```text
About team 01: Premium realistic editorial website hero of four fictional
Indian professionals collaborating across product development, brand
strategy, marketing, and e-commerce in a contemporary warm-timber studio.
Use packaging prototypes, an unbranded laptop, research sheets without
readable text, colour samples, and fulfilment materials. Wide cinematic 16:9;
keep the group meaningful in a centre portrait crop and leave a calm
medium-dark central copy band. No named DSPL employees, public figures,
logos, trademarks, readable text, watermark, posed handshake, malformed
hands, or duplicated people.

About team 02: Premium realistic editorial cross-functional standing review
connecting research, a physical consumer-product prototype, campaign
planning, and digital commerce operations. Three to five fictional Indian
professionals discuss a refined review wall and standing worktable with
abstract charts, blank packaging, material samples, and an unbranded tablet.
Wide 16:9 with at least three collaborators and clear multidisciplinary cues
surviving a centre portrait crop. No readable text, logos, trademarks,
watermark, posed portrait, malformed anatomy, or duplicated objects.

Brands portfolio 01: Photorealistic high-end consumer-brand portfolio on
tiered plinths and a curved retail-display backdrop. Show fictional unbranded
chocolate, botanical wellness, beverage, personal-care, and pantry families
through bottle, pouch, carton, jar, and bar silhouettes in saffron, cacao,
teal, coral, violet, green, and warm cream. Wide 16:9, portfolio unmistakable
in a centre portrait crop, calm darker central copy area, no single hero
product. No readable text, pseudo-letters, logos, trademarks, people,
watermark, chemistry-lab framing, or warped containers.

Brands portfolio 02: Photorealistic premium architectural showroom with
illuminated shelves and tiered plinths holding fictional consumer families
for chocolate, snacks, botanical wellness, beverages, personal care, and home
fragrance. Every package surface is blank and uses only solid colour blocking
or non-symbolic material bands in cacao, saffron, cobalt, coral, forest green,
violet, and cream. Wide 16:9 with multiple categories surviving a centre
portrait crop and a calm deep-teal central copy wall. Absolutely no words,
letters, numbers, logos, symbols, emblems, seals, pseudo-text, people,
trademarks, watermark, laboratory glassware, or warped containers.

Branding workshop 01: Premium realistic editorial identity-studio critique
with a large charcoal presentation wall using only solid colour cards, grids,
circles, arcs, lines, material samples, and blank packaging applications.
Three fictional Indian professionals stand and discuss the system; the wall,
not a desk, is dominant. Wide 16:9 with people and visual-system artefacts
surviving a centre portrait crop and a calm dark copy band. No words, letters,
numbers, typography, logos, monograms, emblems, seals, pseudo-text,
trademarks, public figures, watermark, malformed hands, or duplicated people.

Branding workshop 02: Photorealistic premium design-studio reportage of an
active brand workshop and handover. A standing pinboard and presentation rail
show colour standards, abstract symbol construction, packaging applications,
poster and blank-device mockups while four fictional Indian professionals
pin, compare, point, and hold applications. Wide 16:9; retain people and
identity boards in a centre portrait crop; use controlled dark board spacing
for the central copy zone. No readable words, real logos, brands, trademarks,
public figures, watermark, generic meeting pose, malformed anatomy, or
duplicated hands.
```

The first generated `brands-portfolio-02` and `branding-workshop-01` drafts
were rejected and were not copied into the repository because small
synthetic label-like marks violated the prompt contract. The selected masters
listed above are the regenerated blank-surface versions.
