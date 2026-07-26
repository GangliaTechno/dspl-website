# DSPL Asset Inventory and Cleanup Candidates

Date: 2026-07-26

Scope: `src/assets`, the production Vite build, tracked source, `public`, and
`index.html`.

## Outcome

- 74 source assets inspected.
- 27 assets are referenced and emitted by the all-route production build.
- 47 assets have no tracked source reference: 41 standalone candidates and 6
  same-stem alternate-format candidates.
- All 74 assets are tracked by Git and clean at the time of inspection.
- SHA-256 comparison found no byte-identical asset pairs.
- No asset is classified as a visual duplicate. Similar names require visual
  review before any future deletion.
- No asset references were found in the experimental `Lightfall` or
  `LiquidEther` components.
- Nothing was deleted.

## Production measurements

The baseline is the prerendered all-route build from commit `39cb998`. The
comparison build includes the homepage LCP markup change in this task.

| Measure | Baseline | After | Interpretation |
|---|---:|---:|---|
| Initial modulepreload JS, gzip | 86.43 kB | 86.43 kB | No change |
| Homepage route JS, gzip | 2.44 kB | 2.58 kB | +0.14 kB for responsive image markup |
| Initial shared CSS, gzip | 3.60 kB | 3.60 kB | No change |
| Homepage route CSS, gzip | 1.83 kB | 1.82 kB | Effectively unchanged |
| Root prerendered HTML, gzip | 4.59 kB | 4.66 kB | +0.07 kB for explicit picture markup |
| Desktop homepage hero | 397.70 kB | 397.70 kB | Existing WebP retained |
| Mobile homepage hero | 118.95 kB | 118.95 kB | Existing WebP retained |

The initial JS figure is the sum of the root document's modulepreloaded
`index`, `AppRoutes`, JSX runtime, Lucide factory, and small shared index
chunks. Lazy route chunks are excluded.

Largest emitted images:

| Emitted asset | Bytes |
|---|---:|
| `linen_concrete_texture.png` | 938,381 |
| `brand_hero.jpg` | 902,118 |
| `brands_pipeline_bg.jpg` | 840,427 |
| `sree_pro_fixed.jpg` | 581,638 |
| `RR_logo embossed_tm.png` | 527,186 |
| `manu_pro_fixed.jpg` | 485,700 |
| `Marketing_hero_section-1920.webp` | 430,282 |
| `dspl_banner.webp` | 397,700 |

These are build measurements, not field Core Web Vitals.

## Homepage LCP delivery

The homepage hero now uses an explicit responsive `<picture>` instead of CSS
background URLs:

- desktop: `dspl_banner.webp`, 1545 × 1018, 397,700 bytes;
- mobile: `dspl_banner-mobile.webp`, 800 × 527, 118,956 bytes;
- explicit width and height on the fallback image;
- `loading="eager"`, `fetchPriority="high"`, and `decoding="async"`;
- the existing media-specific preloads remain in `index.html`.

This improves resource discovery and preserves the smaller mobile transfer.
It does not reduce source or emitted image bytes.

## Emitted and referenced assets

Recommendation for every row: keep. These files participate in the
production build.

| Path | Bytes | References | Git | Recommendation |
|---|---:|---|---|---|
| `src/assets/about_dspl.jpeg` | 139,515 | `src/pages/About.jsx` | tracked | Keep |
| `src/assets/Anusha-mam_pro.png` | 97,730 | `src/pages/About.jsx` | tracked | Keep |
| `src/assets/brand_hero.jpg` | 902,118 | `src/pages/Branding.jsx` | tracked | Keep; large emitted hero |
| `src/assets/brands_pipeline_bg.jpg` | 840,427 | `src/pages/Brands.jsx` | tracked | Keep; large emitted background |
| `src/assets/brands-hero-studio.webp` | 68,192 | `src/pages/Brands.jsx` | tracked | Keep |
| `src/assets/ceo_pro.png` | 65,504 | `src/pages/About.jsx` | tracked | Keep |
| `src/assets/dr_pro.png` | 97,908 | `src/pages/About.jsx` | tracked | Keep |
| `src/assets/dspl_banner.webp` | 397,700 | `index.html`, `src/pages/Home.jsx` | tracked | Keep desktop LCP source |
| `src/assets/dspl_banner-mobile.webp` | 118,956 | `index.html`, `src/pages/Home.jsx` | tracked | Keep mobile LCP source |
| `src/assets/dspl_img.jpg` | 22,895 | `src/pages/About.jsx` | tracked | Keep |
| `src/assets/dst-nidhi-normalized.png` | 16,211 | `src/pages/Home.jsx` | tracked | Keep |
| `src/assets/ecom.webp` | 68,350 | `src/pages/Ecommerce.jsx` | tracked | Keep |
| `src/assets/ecom-mobile.webp` | 40,714 | `src/pages/Ecommerce.jsx` | tracked | Keep |
| `src/assets/icon_orange.png` | 136,984 | `src/components/Header.jsx`, `src/components/Footer.jsx` | tracked | Keep |
| `src/assets/linen_concrete_texture.png` | 938,381 | `src/pages/About.jsx` | tracked | Keep; largest emitted image |
| `src/assets/manu_pro_fixed.jpg` | 485,700 | `src/pages/About.jsx` | tracked | Keep |
| `src/assets/Marketing_hero_section-640.webp` | 73,014 | `src/pages/Marketing.jsx` | tracked | Keep responsive candidate |
| `src/assets/Marketing_hero_section-960.webp` | 143,424 | `src/pages/Marketing.jsx` | tracked | Keep responsive candidate |
| `src/assets/Marketing_hero_section-1440.webp` | 277,960 | `src/pages/Marketing.jsx` | tracked | Keep responsive candidate |
| `src/assets/Marketing_hero_section-1920.webp` | 430,282 | `src/pages/Marketing.jsx` | tracked | Keep responsive candidate |
| `src/assets/Marketing_hero_section-mobile.webp` | 102,554 | `src/pages/Marketing.jsx` | tracked | Keep responsive candidate |
| `src/assets/mutbi-normalized.png` | 13,126 | `src/pages/Home.jsx` | tracked | Keep |
| `src/assets/nidhi-prayas-normalized.png` | 8,002 | `src/pages/Home.jsx` | tracked | Keep |
| `src/assets/RR_logo embossed_tm.png` | 527,186 | `src/pages/Home.jsx`, `src/pages/Brands.jsx` | tracked | Keep |
| `src/assets/sree_pro_fixed.jpg` | 581,638 | `src/pages/About.jsx` | tracked | Keep |
| `src/assets/startup-karnataka-normalized.png` | 239,449 | `src/pages/Home.jsx` | tracked | Keep |
| `src/assets/vice_chairman_pro.png` | 71,531 | `src/pages/About.jsx` | tracked | Keep |

## Review-only cleanup candidates

“Review for removal” means the file is unreferenced in tracked application
source and absent from the tested production build. It is not approval to
delete. “Review alternate” means another file has the same stem in a different
format; no visual-equivalence claim is made.

| Path | Bytes | References | Git | Recommendation |
|---|---:|---|---|---|
| `src/assets/1000_F_623257356_2NfIGM8Obq9bohiy5M5ghg2GRgdqICmt.jpeg` | 103,523 | none | tracked | Review for removal |
| `src/assets/about_dashapatmaja.jpg` | 3,582,630 | none | tracked | Review for removal |
| `src/assets/Anusha-mam.png` | 97,588 | none | tracked | Review for removal |
| `src/assets/branding_hero.png` | 1,620,069 | none | tracked | Review for removal |
| `src/assets/ceo.png` | 62,767 | none | tracked | Review for removal |
| `src/assets/cocoa_chocolate_texture.png` | 830,769 | none | tracked | Review for removal |
| `src/assets/dark_studio_workspace.png` | 765,427 | none | tracked | Review for removal |
| `src/assets/design_studio_flatlay.png` | 783,849 | none | tracked | Review for removal |
| `src/assets/dpiitw.png` | 1,077,818 | none | tracked | Review for removal |
| `src/assets/dr.png` | 120,829 | none | tracked | Review for removal |
| `src/assets/dspl_banner.png` | 2,831,276 | none | tracked | Review alternate to `dspl_banner.webp` |
| `src/assets/DST-NIDHI.png` | 39,153 | none | tracked | Review for removal |
| `src/assets/ecom.png` | 1,620,069 | none | tracked | Review alternate to `ecom.webp` |
| `src/assets/ganglia_logo1.png` | 16,096 | none | tracked | Review for removal |
| `src/assets/ganglia_logo2.png` | 200,355 | none | tracked | Review for removal |
| `src/assets/ganglia_logo3.png` | 409,798 | none | tracked | Review for removal |
| `src/assets/ganglia_logo4.png` | 21,949 | none | tracked | Review for removal |
| `src/assets/ganglia_logo5.png` | 597,720 | none | tracked | Review for removal |
| `src/assets/gokw.png` | 832,539 | none | tracked | Review for removal |
| `src/assets/grow_dspl.jpeg` | 48,553 | none | tracked | Review for removal |
| `src/assets/Help_grow.png` | 2,001,252 | none | tracked | Review alternate with `Help_grow.webp` |
| `src/assets/Help_grow.webp` | 80,180 | none | tracked | Review alternate with `Help_grow.png` |
| `src/assets/Help_grow-mobile.webp` | 48,198 | none | tracked | Review with Help Grow family |
| `src/assets/hero.png` | 13,057 | none | tracked | Review for removal |
| `src/assets/icon_orange_title.png` | 40,743 | none | tracked | Review for removal |
| `src/assets/india_map_parchment.jpg` | 1,856,853 | none | tracked | Review for removal |
| `src/assets/india_map_parchment_1.png` | 714,340 | none | tracked | Review for removal |
| `src/assets/manu.jpg` | 85,921 | none | tracked | Review for removal |
| `src/assets/manu_pro.png` | 470,481 | none | tracked | Review for removal |
| `src/assets/marketing banner image.jpg` | 2,245,426 | none | tracked | Review for removal |
| `src/assets/marketing banner image1.jpg` | 709,713 | none | tracked | Review for removal |
| `src/assets/marketing image 2.jpg` | 1,229,184 | none | tracked | Review for removal |
| `src/assets/marketing image.jpg` | 1,434,371 | none | tracked | Review for removal |
| `src/assets/Marketing_hero_section.jpg` | 7,773,636 | none | tracked | Review alternate with original WebP |
| `src/assets/Marketing_hero_section.webp` | 5,032,628 | none | tracked | Review alternate with original JPEG |
| `src/assets/Marketing_img.jpg` | 1,527,819 | none | tracked | Review for removal |
| `src/assets/marketing-banner.jpg` | 1,136,987 | none | tracked | Review for removal |
| `src/assets/nidhi_1.png` | 8,182 | none | tracked | Review for removal |
| `src/assets/packaging_moodboard.png` | 847,360 | none | tracked | Review for removal |
| `src/assets/phototune.ai_1783934452.png` | 2,001,252 | none | tracked | Review for removal |
| `src/assets/react.svg` | 4,126 | none | tracked | Review boilerplate removal |
| `src/assets/sree.jpeg` | 49,923 | none | tracked | Review for removal |
| `src/assets/sree_pro.png` | 264,059 | none | tracked | Review for removal |
| `src/assets/startup_team_incubator.png` | 927,754 | none | tracked | Review for removal |
| `src/assets/Upcoming_brands.jpeg` | 116,976 | none | tracked | Review for removal |
| `src/assets/vice_chairman.jpg` | 6,211 | none | tracked | Review for removal |
| `src/assets/vite.svg` | 8,710 | none | tracked | Review boilerplate removal |

## Safe next decision

If cleanup is approved later, review visual families first, then remove only
the exact approved paths in a separate commit. Rebuild and rerun
`npm run verify:html` after each batch. The largest immediate repository-only
candidate is `Marketing_hero_section.jpg` at 7,773,636 bytes; it is not a
production transfer today.
