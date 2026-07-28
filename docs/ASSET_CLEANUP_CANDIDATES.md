# DSPL asset inventory and cleanup policy

Last reviewed: 2026-07-29

Scope: `src/assets`, tracked application source, `index.html`, `public`, and
the all-route production build.

## Current outcome

- 91 source assets inspected.
- 35 assets are referenced by production source.
- 56 assets are currently unreferenced and total 46.63 MiB.
- Unreferenced media is not imported into the Vite asset graph and therefore
  does not add to the tested production transfer.
- Original photographs and source artwork remain deferred until final visual
  approval, even when a generated or optimized derivative is now used.
- The unreferenced React and Vite starter marks were removed.
- No original DSPL, Raw Radicles, institutional, or leadership media was
  deleted in this cleanup.

## Method

An asset counts as production-referenced when its exact filename appears in
application source, CSS, `index.html`, `public`, or build scripts. Test and
documentation-only references do not count.

The release gate rebuilds and prerenders every public route, then validates the
generated HTML. This inventory is a repository-cleanliness report, not field
Core Web Vitals evidence.

## Production-referenced assets

These files are required by the current implementation:

```text
Anusha-mam_pro.png
balakrishna_pro_extended.webp
brands_pipeline_bg.jpg
brands-hero-studio.webp
ceo_pro.png
dr_pro.png
dspl_banner-mobile.webp
dspl_banner.webp
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
dspl_img.jpg
icon_orange.png
linen_concrete_texture.png
manu_pro_fixed.jpg
Marketing_hero_section-1440.webp
Marketing_hero_section-1920.webp
Marketing_hero_section-640.webp
Marketing_hero_section-960.webp
Marketing_hero_section-mobile.webp
raw-radicles-logo-cropped.webp
sree_pro_extended.webp
supporter-dst-nidhi.webp
supporter-mutbi.webp
supporter-nidhi-prayas.webp
supporter-startup-karnataka.webp
```

## Deferred cleanup candidates

These exact files have no current production reference. They are deliberately
retained until final visual approval because several are originals, alternate
crops, or source material for the optimized derivatives:

```text
1000_F_623257356_2NfIGM8Obq9bohiy5M5ghg2GRgdqICmt.jpeg
about_dashapatmaja.jpg
about_dspl.jpeg
Anusha-mam.png
branding_hero.png
brand_hero.jpg
ceo.png
cocoa_chocolate_texture.png
dark_studio_workspace.png
design_studio_flatlay.png
dpiitw.png
dr.png
dspl_banner.png
DST-NIDHI.png
ecom-mobile.webp
ecom.png
ecom.webp
ganglia_logo1.png
ganglia_logo2.png
ganglia_logo3.png
ganglia_logo4.png
ganglia_logo5.png
gokw.png
grow_dspl.jpeg
Help_grow-mobile.webp
Help_grow.png
Help_grow.webp
hero.png
icon_orange_title.png
india_map_parchment_1.png
india_map_parchment.jpg
manu.jpg
manu_pro.png
marketing banner image.jpg
marketing banner image1.jpg
marketing image 2.jpg
marketing image.jpg
Marketing_hero_section.jpg
Marketing_hero_section.webp
Marketing_img.jpg
marketing-banner.jpg
nidhi_1.png
nidhi-prayas-normalized.png
packaging_moodboard.png
phototune.ai_1783934452.png
RR_logo embossed_tm.png
sree.jpeg
sree_pro.png
sree_pro_fixed.jpg
startup_team_incubator.png
startup-karnataka-normalized.png
Upcoming_brands.jpeg
vice_chairman.jpg
vice_chairman_pro.png
mutbi-normalized.png
dst-nidhi-normalized.png
```

## Next cleanup decision

After the redesigned site is approved, review the deferred files visually in
families and remove only confirmed superseded material in a separate commit.
Re-run the full quality gate after each approved batch. Git history is not a
substitute for preserving licensed or difficult-to-recreate source artwork.
