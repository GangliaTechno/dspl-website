# DSPL asset inventory and cleanup policy

Last reviewed: 2026-07-31

Scope: `src/assets`, tracked application source, `index.html`, `public`, and
build scripts.

## Current outcome

- 60 assets remain in `src/assets`.
- 42 assets are referenced by production source and total 5.23 MiB.
- 18 unreferenced source masters total 10.60 MiB and are intentionally kept.
- 54 confirmed superseded outputs totaling 42.26 MiB were removed after final
  visual approval.
- Four unreachable WebGL experiments and one obsolete critique were removed.
- Git history retains every removed file; no deployed or production-referenced
  asset was deleted.

## Method

An asset counts as production-referenced when its exact filename appears in
application source, CSS, `index.html`, `public`, or build scripts. Tests and
documentation are excluded from that calculation.

Deletion candidates had to satisfy both conditions:

1. no production reference; and
2. clearly superseded by an approved optimized asset or experimental code that
   was never integrated.

Original identity artwork, leadership photographs, institutional source marks,
and generated source masters remain available for future recropping or rights
review even when the site currently uses a derivative.

## Production-referenced assets

```text
about-journey-2023.webp
about-journey-2024.webp
about-journey-2025.webp
about-journey-2026.webp
Anusha-mam_pro.png
balakrishna_pro_extended.webp
brands_pipeline_bg.jpg
brands-hero-editorial-1200.webp
brands-hero-editorial-1672.webp
brands-hero-editorial-768.webp
brands-hero-editorial-mobile.webp
ceo_pro.png
dr_pro.png
dspl-about-hero-1440.webp
dspl-about-hero-1600.webp
dspl-about-hero-960.webp
dspl-about-hero-mobile.webp
dspl-branding-hero-1440.webp
dspl-branding-hero-1600.webp
dspl-branding-hero-960.webp
dspl-branding-hero-mobile.webp
dspl-ecommerce-hero-1440.webp
dspl-ecommerce-hero-1600.webp
dspl-ecommerce-hero-960.webp
dspl-ecommerce-hero-mobile.webp
dspl-home-editorial-1440.webp
dspl-home-editorial-1920.webp
dspl-home-editorial-960.webp
dspl-home-editorial-mobile.webp
dspl-marketing-editorial-1440.webp
dspl-marketing-editorial-1920.webp
dspl-marketing-editorial-960.webp
dspl-marketing-editorial-mobile.webp
icon_orange.png
linen_concrete_texture.png
manu_pro_fixed.jpg
raw-radicles-logo-cropped.webp
sree_pro_extended.webp
supporter-dst-nidhi-marquee.png
supporter-mutbi-marquee.png
supporter-nidhi-prayas-marquee.png
supporter-startup-karnataka-marquee.png
```

## Preserved source masters

```text
Anusha-mam.png
ceo.png
dpiitw.png
dr.png
dspl-home-editorial-source.png
dspl-marketing-editorial-source.png
DST-NIDHI.png
gokw.png
manu.jpg
manu_pro.png
nidhi_1.png
phototune.ai_1783934452.png
RR_logo embossed_tm.png
sree.jpeg
sree_pro.png
sree_pro_fixed.jpg
vice_chairman.jpg
vice_chairman_pro.png
```

These files are intentionally not cleanup candidates. Reassess them only when
there is a verified archival location and a documented source-to-derivative
mapping.
