# Asset Provenance

This record covers production-facing visual assets introduced after the 2026
DSPL website redesign. It records origin and review evidence; it is not a legal
opinion.

| Production files | Method | Provider | Date | Prompt or source | Rights review | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| `dspl-home-editorial-{960,1440,1920}.webp`, `dspl-home-editorial-mobile.webp` | Generated original; responsive derivatives created locally from `dspl-home-editorial-source.png` | OpenAI built-in image generation | 2026-07-29 | Prompt recorded below | Reviewed: no recognizable people or third-party trademarks; packaging is generic; faint non-readable decorative marks only; no watermark | Approved for branch review |
| `dspl-marketing-editorial-{960,1440,1920}.webp`, `dspl-marketing-editorial-mobile.webp` | Generated original; responsive derivatives created locally from `dspl-marketing-editorial-source.png` | OpenAI built-in image generation | 2026-07-29 | Prompt recorded below | Reviewed: no people, trademarks, recognizable brands, billboards, or watermark; charts and planning sheets contain abstract non-readable shapes | Approved for branch review |

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

