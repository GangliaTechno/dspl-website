# DSPL Cinematic Heroes and Contact Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver controlled site-wide hero rotation, seven new colourful hero families, taller editorial hero spacing, a stronger About direction section, and a vertical Contact page while preserving copy, routes, form behaviour, accessibility, and the DSPL visual identity.

**Architecture:** Add one reusable `RotatingHeroMedia` component that owns deterministic sequencing, deferred secondary media, document-visibility pausing, cleanup, and reduced-motion behaviour. Each lazy route keeps its own image imports and manifest so it loads only its own assets. Generate seven trademark-free masters, export responsive WebP derivatives with a deterministic Pillow script, then integrate the shared component route by route before restructuring Contact into independent hero, information-card, and enquiry regions.

**Tech Stack:** React 19.2.8, React Router 8.3.0, Vite 8.0.12, Vitest 4.1.10, Testing Library 16.3.2, plain CSS, Python 3.12 with Pillow 12.3.0, OpenAI built-in image generation.

## Approved live-review amendment

The implementation below records the original task sequence. The final live-reviewed result supersedes conflicting details as follows:

- Home uses the user-selected `home-03` artwork as one static responsive image. Rotation remains only on About, Brands, Marketing, Branding, and E-commerce.
- Interior heroes use three content levels: context label, gold H1, and one white tagline. The tertiary hero description was removed and its detail remains in the next scope section.
- About, Brands, and shared service heroes use a `38rem` desktop minimum height; interior overlays use `rgba(0, 0, 0, 0.55)`.
- About, Brands, and Branding retain both approved images but open on their refreshed colourful artwork; the previous image becomes the second controlled frame.
- Marketing and E-commerce use newly generated page-specific primary scenes informed by audited legacy subject matter, without republishing the low-resolution or unclear-provenance legacy files.
- Contact uses a new static meeting-table image, `0.56` overlay, three peer information panels with a restrained gold rule and stronger internal hierarchy, and a separate centred enquiry section.
- The Home supporter logos use higher opacity plus a restrained contour-following drop shadow for visibility against the hero image.

## Global Constraints

- Home uses three images; About, Brands, Marketing, Branding, and E-commerce use two images each.
- Every sequence starts with the route's current approved hero image, advances every `8000ms`, and crossfades with an `800ms` opacity transition.
- Never randomise image order, change hero text during rotation, add carousel controls, or add visible pagination.
- Pause rotation while `document.hidden` is true and remove timers/listeners after route navigation.
- Under `prefers-reduced-motion: reduce`, render only the current approved primary image.
- The first image is eager with `fetchPriority="high"`; secondary images mount after idle and use `loading="lazy"` without high fetch priority.
- Keep responsive `<picture>` sources, intrinsic dimensions, async decoding, `object-fit: cover`, and route-specific focal positions.
- Retain the warm cream, charcoal, white, and restrained-gold palette. H1 is gold; tagline is white; description is softened white.
- Do not restore literal legacy retail photographs or introduce third-party logos, readable product labels, watermarks, synthetic text, or unclear licensing.
- About and Brands heroes use `38rem` desktop minimum height; shared service heroes use `35rem`; all five interior heroes use `34rem` at `<= 768px`.
- Preserve all approved page copy, Home structure, supporter marquee, About chronology/team, Brands proof, service capability/FAQ content, Header's sole Work With Us CTA, Contact fields/options/payload, Web3Forms, GA4, privacy notice, success/error behaviour, Footer, Privacy, 404, and dependencies.
- Follow RED -> GREEN TDD for source changes. Commit only files owned by the active task after focused checks pass.
- Do not deploy, push, merge, or modify `main`.

## File Map

- Create `src/components/RotatingHeroMedia.jsx`: shared deterministic media rotation and loading lifecycle.
- Create `src/components/RotatingHeroMedia.css`: layer positioning and opacity-only transition.
- Create `src/components/__tests__/RotatingHeroMedia.test.jsx`: interval, load, visibility, cleanup, and reduced-motion contracts.
- Create `scripts/export_hero_assets.py`: deterministic 16:9 and 3:4 WebP exporter with focal-point controls.
- Create `scripts/test_export_hero_assets.py`: exporter crop/size/validation tests.
- Create `docs/assets/hero-masters/*.png`: seven selected image-generation masters.
- Create `src/assets/*-rotation-0{2,3}-*.webp`: production responsive derivatives.
- Modify `docs/ASSET_PROVENANCE.md`: prompts, tool, master paths, review findings, crops, and derivative paths.
- Modify `src/pages/Home.jsx`, `Home.css`, and `Home.test.jsx`: three-image Home integration.
- Modify `src/pages/About.jsx`, `About.css`, and `About.test.jsx`: two-image hero, cinematic spacing, no zoom, and direction rhythm.
- Modify `src/pages/Brands.jsx`, `Brands.css`, and `Brands.test.jsx`: two-image cinematic hero while preserving Raw Radicles.
- Modify `src/components/ServicePage.jsx`, `ServicePage.css`, and `ServicePage.test.jsx`: shared two-image service hero.
- Modify `src/pages/Marketing.jsx`, `Branding.jsx`, `Ecommerce.jsx`, and `ServiceCopy.test.jsx`: route image manifests.
- Modify `src/pages/Contact.jsx`, `Contact.css`, and `Contact.test.jsx`: vertical hero, three contact cards, and centred form.
- Modify `src/__tests__/designSystemRegression.test.js`: expensive source/CSS design contracts.

---

### Task 1: Produce and validate the seven new hero image families

**Files:**
- Create: `scripts/export_hero_assets.py`
- Create: `scripts/test_export_hero_assets.py`
- Create: `docs/assets/hero-masters/home-02.png`
- Create: `docs/assets/hero-masters/home-03.png`
- Create: `docs/assets/hero-masters/about-02.png`
- Create: `docs/assets/hero-masters/brands-02.png`
- Create: `docs/assets/hero-masters/marketing-02.png`
- Create: `docs/assets/hero-masters/branding-02.png`
- Create: `docs/assets/hero-masters/ecommerce-02.png`
- Create: `src/assets/home-rotation-02-{960,1440,mobile}.webp`
- Create: `src/assets/home-rotation-03-{960,1440,mobile}.webp`
- Create: `src/assets/about-rotation-02-{960,1440,mobile}.webp`
- Create: `src/assets/brands-rotation-02-{960,1440,mobile}.webp`
- Create: `src/assets/marketing-rotation-02-{960,1440,mobile}.webp`
- Create: `src/assets/branding-rotation-02-{960,1440,mobile}.webp`
- Create: `src/assets/ecommerce-rotation-02-{960,1440,mobile}.webp`
- Modify: `docs/ASSET_PROVENANCE.md`

**Interfaces:**
- Consumes: seven built-in image-generation outputs at or above `1440x853` with centre-safe composition.
- Produces: `export_family(input_path, output_dir, slug, desktop_focal, mobile_focal)` and seven named responsive asset families used by Tasks 3-5.

- [ ] **Step 1: Write the failing Pillow exporter tests**

Create `scripts/test_export_hero_assets.py`:

```python
import tempfile
import unittest
from pathlib import Path

from PIL import Image

from scripts.export_hero_assets import export_family


class ExportHeroAssetsTest(unittest.TestCase):
    def test_exports_exact_responsive_dimensions_without_upscaling(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            source = root / "master.png"
            output = root / "out"
            Image.new("RGB", (1440, 853), "#b56d24").save(source)

            paths = export_family(
                source,
                output,
                "sample-rotation-02",
                desktop_focal=(0.5, 0.5),
                mobile_focal=(0.5, 0.5),
            )

            expected = {
                "960": (960, 540),
                "1440": (1440, 810),
                "mobile": (640, 853),
            }
            self.assertEqual(set(paths), set(expected))
            for variant, size in expected.items():
                with Image.open(paths[variant]) as image:
                    self.assertEqual(image.size, size)
                    self.assertEqual(image.format, "WEBP")

    def test_rejects_a_master_smaller_than_the_largest_export(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            source = root / "small.png"
            Image.new("RGB", (1400, 1000), "#245c50").save(source)

            with self.assertRaisesRegex(ValueError, "at least 1440x853"):
                export_family(source, root / "out", "small")


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the exporter tests to verify RED**

Run:

```powershell
python -m unittest scripts/test_export_hero_assets.py -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'scripts.export_hero_assets'`.

- [ ] **Step 3: Implement the deterministic exporter**

Create `scripts/export_hero_assets.py`:

```python
import argparse
from pathlib import Path

from PIL import Image, ImageOps


VARIANTS = {
    "960": (960, 540),
    "1440": (1440, 810),
    "mobile": (640, 853),
}


def export_family(
    input_path,
    output_dir,
    slug,
    desktop_focal=(0.5, 0.5),
    mobile_focal=(0.5, 0.5),
):
    input_path = Path(input_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    with Image.open(input_path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        if image.width < 1440 or image.height < 853:
            raise ValueError(
                f"Hero master must be at least 1440x853; received {image.width}x{image.height}"
            )

        outputs = {}
        for variant, size in VARIANTS.items():
            focal = mobile_focal if variant == "mobile" else desktop_focal
            crop = ImageOps.fit(
                image,
                size,
                method=Image.Resampling.LANCZOS,
                centering=focal,
            )
            path = output_dir / f"{slug}-{variant}.webp"
            crop.save(path, "WEBP", quality=86, method=6)
            outputs[variant] = path
        return outputs


def parse_focal(value):
    x_value, y_value = value.split(",", maxsplit=1)
    focal = (float(x_value), float(y_value))
    if any(point < 0 or point > 1 for point in focal):
        raise argparse.ArgumentTypeError("focal points must be between 0 and 1")
    return focal


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output-dir", default="src/assets")
    parser.add_argument("--slug", required=True)
    parser.add_argument("--desktop-focal", type=parse_focal, default=(0.5, 0.5))
    parser.add_argument("--mobile-focal", type=parse_focal, default=(0.5, 0.5))
    args = parser.parse_args()
    export_family(
        args.input,
        args.output_dir,
        args.slug,
        args.desktop_focal,
        args.mobile_focal,
    )


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run the exporter tests to verify GREEN**

Run:

```powershell
python -m unittest scripts/test_export_hero_assets.py -v
```

Expected: 2 tests PASS.

- [ ] **Step 5: Generate seven masters with the built-in image tool**

Issue one built-in image-generation call per prompt. Use case for all seven: `photorealistic-natural`. Request a wide landscape master; reject any result below `1440x853`, any visible text/logo/watermark, or any composition without a calm central copy area. Preserve native resolution rather than upscaling the generated output.

Shared constraints appended to every prompt:

```text
Asset type: premium website hero background for Dashapatmaja Solutions Pvt Ltd
Style/medium: photorealistic editorial commercial photography, realistic materials, refined but not sterile
Composition/framing: very wide cinematic landscape, calm uncluttered centre for four levels of centred website copy, meaningful objects concentrated in the outer thirds, must also support a 3:4 mobile crop
Lighting/mood: warm natural directional light, controlled contrast, credible working environment
Constraints: no people as the focal subject, no readable text, no logos, no trademarks, no watermark, no floating interface, no fantasy technology, no generic corporate handshake, no repeated objects, no gold colour cast over the whole frame
```

Use these exact page-specific prompt bodies:

```text
home-02: Coordinated campaign planning workspace with search research, media planning, content layouts, neutral analytics charts without readable labels, and photography contact sheets. Saffron, cobalt, burgundy, charcoal, and warm paper accents.

home-03: Operational commerce workspace connecting premium generic consumer products, storefront photography, order preparation, packaging materials, fulfilment labels with no readable text, and measurement notes. Deep teal, restrained gold, warm white, charcoal, and natural timber.

about-02: Multidisciplinary studio table connecting research, strategy, design, product-development samples, material swatches, technical notes without readable text, and prototyping tools. Warm timber, burgundy, deep green, cream, and restrained gold details.

brands-02: Active consumer-brand development environment with unbranded packaging prototypes, product formulation materials, colour studies, compliance checklists without readable text, and route-to-market planning. Cacao, saffron, muted red, forest green, and dark neutral.

marketing-02: One coordinated marketing programme represented through search planning, paid-media allocation, editorial content, campaign photography, and measurement artefacts with no readable screen content. Gold, cobalt, burgundy, warm neutral, and charcoal.

branding-02: Disciplined identity-development workspace with unbranded identity boards, typography specimens using abstract unreadable glyphs, packaging studies, paper stocks, print samples, and material swatches. Saffron, forest green, burgundy, cream, and charcoal.

ecommerce-02: End-to-end commerce operations workspace connecting generic product presentation, storefront device silhouettes without readable UI, order flow, payment hardware, packaging, dispatch, inventory, and measurement cues. Deep teal, restrained gold, warm white, charcoal, and natural timber.
```

Inspect each output visually. If one fails only a single criterion, issue one targeted follow-up edit; otherwise regenerate. Copy selected masters into `docs/assets/hero-masters/` with the exact filenames listed in this task.

- [ ] **Step 6: Export and verify all responsive families**

Run these seven commands with focal values adjusted only after inspecting each master:

```powershell
python scripts/export_hero_assets.py --input docs/assets/hero-masters/home-02.png --slug home-rotation-02 --desktop-focal 0.5,0.5 --mobile-focal 0.5,0.5
python scripts/export_hero_assets.py --input docs/assets/hero-masters/home-03.png --slug home-rotation-03 --desktop-focal 0.5,0.5 --mobile-focal 0.5,0.5
python scripts/export_hero_assets.py --input docs/assets/hero-masters/about-02.png --slug about-rotation-02 --desktop-focal 0.5,0.5 --mobile-focal 0.5,0.5
python scripts/export_hero_assets.py --input docs/assets/hero-masters/brands-02.png --slug brands-rotation-02 --desktop-focal 0.5,0.54 --mobile-focal 0.56,0.52
python scripts/export_hero_assets.py --input docs/assets/hero-masters/marketing-02.png --slug marketing-rotation-02 --desktop-focal 0.5,0.5 --mobile-focal 0.5,0.5
python scripts/export_hero_assets.py --input docs/assets/hero-masters/branding-02.png --slug branding-rotation-02 --desktop-focal 0.5,0.5 --mobile-focal 0.5,0.5
python scripts/export_hero_assets.py --input docs/assets/hero-masters/ecommerce-02.png --slug ecommerce-rotation-02 --desktop-focal 0.5,0.5 --mobile-focal 0.5,0.5
```

Open every `1440` and `mobile` derivative and confirm subject, crop, calm copy region, colour consistency, no trademark/text, and no visible generation artefacts.

- [ ] **Step 7: Record provenance and commit the assets**

Add one row per master to `docs/ASSET_PROVENANCE.md` with: production family, master path, exact prompt, `OpenAI built-in image generation`, date `2026-08-11`, derivative sizes, focal points, and the review result `No readable text, logos, trademarks, watermark, or malformed objects observed.`

Run:

```powershell
git diff --check -- scripts docs/ASSET_PROVENANCE.md
python -m unittest scripts/test_export_hero_assets.py -v
git add -- scripts/export_hero_assets.py scripts/test_export_hero_assets.py docs/assets/hero-masters docs/ASSET_PROVENANCE.md src/assets/*-rotation-*.webp
git commit -m "assets: add cinematic hero rotation families"
```

Expected: exporter tests pass and the commit contains only the exporter, seven masters, 21 derivatives, provenance, and the documented native-resolution adjustment.

---

### Task 2: Add the shared deterministic rotating hero component

**Files:**
- Create: `src/components/RotatingHeroMedia.jsx`
- Create: `src/components/RotatingHeroMedia.css`
- Create: `src/components/__tests__/RotatingHeroMedia.test.jsx`

**Interfaces:**
- Consumes: `images: Array<{ id, src, desktopSrcSet, mobileSrc, sizes, width, height }>` plus `className`, `imageClassName`, and optional `mobileBreakpoint`.
- Produces: `RotatingHeroMedia`, an `aria-hidden` layered picture stack with `data-active`, `data-hero-id`, deterministic `8000ms` rotation, and deferred secondary mounting.

- [ ] **Step 1: Write failing lifecycle and accessibility tests**

Create `src/components/__tests__/RotatingHeroMedia.test.jsx` with a two-image fixture. Assert:

```jsx
expect(container.querySelectorAll('picture')).toHaveLength(1);
expect(screen.getByTestId('hero-primary')).toHaveAttribute('loading', 'eager');
expect(screen.getByTestId('hero-primary')).toHaveAttribute('fetchpriority', 'high');

act(() => vi.runOnlyPendingTimers());
expect(container.querySelectorAll('picture')).toHaveLength(2);
expect(screen.getByTestId('hero-secondary')).toHaveAttribute('loading', 'lazy');
expect(screen.getByTestId('hero-secondary')).not.toHaveAttribute('fetchpriority');

fireEvent.load(screen.getByTestId('hero-secondary'));
act(() => vi.advanceTimersByTime(8000));
expect(container.querySelector('[data-hero-id="secondary"]')).toHaveAttribute('data-active', 'true');
```

Add separate tests that set `document.hidden = true` and dispatch `visibilitychange` before advancing time, verify the index does not change until visible, unmount and assert no timer remains, and mock reduced motion to confirm secondary pictures never mount.

- [ ] **Step 2: Run the component test to verify RED**

Run:

```powershell
npm.cmd test -- src/components/__tests__/RotatingHeroMedia.test.jsx
```

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the rotation lifecycle**

Create `RotatingHeroMedia.jsx` with the complete lifecycle:

```jsx
import { useCallback, useEffect, useState } from 'react';
import './RotatingHeroMedia.css';

export const HERO_ROTATION_INTERVAL_MS = 8000;
export const HERO_TRANSITION_MS = 800;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getReducedMotion = () =>
  typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
  && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const RotatingHeroMedia = ({
  images,
  className,
  imageClassName,
  mobileBreakpoint = 767,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mountSecondary, setMountSecondary] = useState(false);
  const [loadedIndexes, setLoadedIndexes] = useState(() => new Set([0]));
  const [isVisible, setIsVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotion);

  const markLoaded = useCallback((index) => {
    setLoadedIndexes((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(REDUCED_MOTION_QUERY);
    if (!mediaQuery) return undefined;
    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return undefined;
    const mount = () => setMountSecondary(true);
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(mount);
      return () => window.cancelIdleCallback?.(idleId);
    }
    const timeoutId = window.setTimeout(mount, 0);
    return () => window.clearTimeout(timeoutId);
  }, [images.length, prefersReducedMotion]);

  useEffect(() => {
    const handleVisibility = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (
      prefersReducedMotion
      || !mountSecondary
      || !isVisible
      || images.length < 2
    ) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % images.length;
        return loadedIndexes.has(next) ? next : current;
      });
    }, HERO_ROTATION_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [images.length, isVisible, loadedIndexes, mountSecondary, prefersReducedMotion]);

  return (
    <div className={`${className} rotating-hero-media`} aria-hidden="true">
      {images.map((image, index) => {
        if (index > 0 && (!mountSecondary || prefersReducedMotion)) return null;
        const isActive = index === activeIndex;
        return (
          <picture
            key={image.id}
            className={`rotating-hero-layer${isActive ? ' is-active' : ''}`}
            data-active={isActive ? 'true' : 'false'}
            data-hero-id={image.id}
          >
            <source
              media={`(max-width: ${mobileBreakpoint}px)`}
              srcSet={image.mobileSrc}
            />
            <source
              srcSet={image.desktopSrcSet}
              sizes={image.sizes ?? '100vw'}
            />
            <img
              className={imageClassName}
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : undefined}
              decoding="async"
              onLoad={() => markLoaded(index)}
              data-testid={`hero-${image.id}`}
            />
          </picture>
        );
      })}
    </div>
  );
};

export default RotatingHeroMedia;
```

- [ ] **Step 4: Add opacity-only shared CSS**

Create `RotatingHeroMedia.css`:

```css
.rotating-hero-media {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.rotating-hero-layer {
  position: absolute;
  inset: 0;
  display: block;
  opacity: 0;
  transition: opacity 800ms ease;
}

.rotating-hero-layer.is-active {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .rotating-hero-layer {
    transition: none;
  }
}
```

- [ ] **Step 5: Run the component test to verify GREEN**

Run:

```powershell
npm.cmd test -- src/components/__tests__/RotatingHeroMedia.test.jsx
```

Expected: all rotation, visibility, cleanup, loading, and reduced-motion tests PASS.

- [ ] **Step 6: Check and commit Task 2**

Run:

```powershell
npm.cmd run lint -- --quiet src/components/RotatingHeroMedia.jsx src/components/__tests__/RotatingHeroMedia.test.jsx
git diff --check -- src/components/RotatingHeroMedia.jsx src/components/RotatingHeroMedia.css src/components/__tests__/RotatingHeroMedia.test.jsx
git add -- src/components/RotatingHeroMedia.jsx src/components/RotatingHeroMedia.css src/components/__tests__/RotatingHeroMedia.test.jsx
git commit -m "feat: add controlled hero media rotation"
```

Expected: focused tests, scoped lint, and diff check pass.

---

### Task 3: Integrate the three-image Home hero

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.css`
- Modify: `src/pages/__tests__/Home.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: `RotatingHeroMedia` and the existing plus new Home responsive families.
- Produces: `homeHeroImages` with exactly three deterministic entries and unchanged hero copy/actions/supporter structure.

- [ ] **Step 1: Add failing Home image-manifest assertions**

In `Home.test.jsx`, assert the wrapper contains exactly three `picture` elements after idle timers, that their `data-hero-id` order is `home-primary`, `home-02`, `home-03`, and that the existing H1, paragraph, capabilities link, and supporter strip remain unchanged. Update the source regression to require `const homeHeroImages = [` and exactly three `id:` entries.

- [ ] **Step 2: Run the focused Home suite to verify RED**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Home.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because Home still renders one direct `<picture>`.

- [ ] **Step 3: Replace the direct picture with the shared component**

Import `RotatingHeroMedia`, the eight new Home derivative files, and define:

```jsx
const homeHeroImages = [
  {
    id: 'home-primary',
    src: homeHero1440,
    desktopSrcSet: `${homeHero960} 960w, ${homeHero1440} 1440w, ${homeHero1920} 1920w`,
    mobileSrc: homeHeroMobile,
    width: 1440,
    height: 810,
  },
  {
    id: 'home-02',
    src: homeRotation021440,
    desktopSrcSet: `${homeRotation02960} 960w, ${homeRotation021440} 1440w`,
    mobileSrc: homeRotation02Mobile,
    width: 1440,
    height: 810,
  },
  {
    id: 'home-03',
    src: homeRotation031440,
    desktopSrcSet: `${homeRotation03960} 960w, ${homeRotation031440} 1440w`,
    mobileSrc: homeRotation03Mobile,
    width: 1440,
    height: 810,
  },
];
```

Replace the direct `<picture>` with:

```jsx
<RotatingHeroMedia
  images={homeHeroImages}
  className="home-hero-media"
  imageClassName="home-hero-image"
  mobileBreakpoint={768}
/>
```

Change `.home-hero-media img` to `.home-hero-image` while retaining width, height, `object-fit: cover`, and the current overlay/content rules.

- [ ] **Step 4: Run the focused Home suite to verify GREEN**

Run the Step 2 command. Expected: Home and design regression tests PASS.

- [ ] **Step 5: Check and commit Task 3**

Run scoped lint, `git diff --check`, stage the four named files, and commit:

```powershell
git commit -m "feat: rotate homepage hero artwork"
```

---

### Task 4: Expand About and Brands heroes and About direction spacing

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.css`
- Modify: `src/pages/Brands.jsx`
- Modify: `src/pages/Brands.css`
- Modify: `src/pages/__tests__/About.test.jsx`
- Modify: `src/pages/__tests__/Brands.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: `RotatingHeroMedia`, `about-rotation-02-*`, and `brands-rotation-02-*`.
- Produces: two-entry manifests `aboutHeroImages` and `brandsHeroImages`; `38rem` desktop/`34rem` mobile heroes; a static About background without zoom; and the approved direction-section rhythm.

- [ ] **Step 1: Write failing About and Brands structure/CSS contracts**

Assert each route mounts two ordered pictures after idle. Require these CSS contracts:

```js
expect(aboutCss).toMatch(/\.about-hero\s*{[^}]*min-height:\s*38rem;/s);
expect(aboutCss).not.toContain('@keyframes subtleZoom');
expect(aboutCss).toMatch(/\.direction-section\s*{[^}]*padding:\s*6\.5rem 0;/s);
expect(aboutCss).toMatch(/#direction-title\s*{[^}]*font-size:\s*clamp\(2\.5rem,\s*4vw,\s*3\.25rem\);[^}]*margin-bottom:\s*3rem;/s);
expect(aboutCss).toMatch(/\.direction-grid\s*{[^}]*gap:\s*1\.75rem;/s);
expect(aboutCss).toMatch(/\.direction-card\s*{[^}]*padding:\s*2\.5rem;/s);
expect(brandsCss).toMatch(/\.brands-hero\s*{[^}]*min-height:\s*38rem;/s);
expect(brandsCss).toMatch(/@media\s*\(max-width:\s*768px\)[\s\S]*?\.brands-hero\s*{[^}]*min-height:\s*34rem;/s);
```

Keep all existing About direction copy/order, journey/team, Raw Radicles links/proof, and no-icon assertions.

- [ ] **Step 2: Run the focused suites to verify RED**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/About.test.jsx src/pages/__tests__/Brands.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: FAIL on direct pictures, old hero heights, About zoom, and direction spacing.

- [ ] **Step 3: Integrate the two route manifests**

Replace each direct picture with `RotatingHeroMedia`. The primary entry keeps the current responsive family; the second uses the route's `*-rotation-02-*` family. Use `mobileBreakpoint={767}` for About and `600` for Brands. Retain the current image class names so page-specific object positioning continues to apply.

- [ ] **Step 4: Apply the approved cinematic and direction CSS**

Set:

```css
.about-hero,
.brands-hero {
  min-height: 38rem;
}

.direction-section {
  padding: 6.5rem 0;
}

#direction-title {
  margin-bottom: 3rem;
  font-size: clamp(2.5rem, 4vw, 3.25rem);
}

.direction-grid {
  gap: 1.75rem;
}

.direction-card {
  padding: 2.5rem;
}
```

Remove `subtleZoom`, its animation property, and its reduced-motion exception. Keep About and Brands content capped at `52rem`, vertically centred, and over the existing flat overlays. At `<= 768px`, use `min-height: 34rem`, balanced padding, stacked direction cards, `2.25rem` heading gap, and natural card height.

- [ ] **Step 5: Run focused tests to verify GREEN**

Run the Step 2 command. Expected: all tests PASS.

- [ ] **Step 6: Check and commit Task 4**

Run scoped lint and diff checks, stage only the seven named files, and commit:

```powershell
git commit -m "feat: expand About and Brands hero rhythm"
```

---

### Task 5: Integrate cinematic rotation across Marketing, Branding, and E-commerce

**Files:**
- Modify: `src/components/ServicePage.jsx`
- Modify: `src/components/ServicePage.css`
- Modify: `src/pages/Marketing.jsx`
- Modify: `src/pages/Branding.jsx`
- Modify: `src/pages/Ecommerce.jsx`
- Modify: `src/components/__tests__/ServicePage.test.jsx`
- Modify: `src/pages/__tests__/ServiceCopy.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: `RotatingHeroMedia` and `heroImages: Array<HeroImage>`.
- Produces: shared service hero with a two-image route manifest, retained context label/H1/tagline/description, `35rem` desktop height, and `34rem` mobile height.

- [ ] **Step 1: Write failing shared and route manifest tests**

Change the ServicePage fixture from `heroImage` to a two-entry `heroImages` array. Assert two pictures mount in fixture order after idle, all four approved text levels remain inside `.domain-hero`, and no page-level CTA or icon card appears. In `ServiceCopy.test.jsx`, assert each route passes exactly two image entries and retain every exact copy assertion.

- [ ] **Step 2: Run focused service tests to verify RED**

Run:

```powershell
npm.cmd test -- src/components/__tests__/ServicePage.test.jsx src/pages/__tests__/ServiceCopy.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because the shared component still accepts one `heroImage` and the hero is `400px`/auto-height.

- [ ] **Step 3: Replace `heroImage` with `heroImages`**

In `ServicePage.jsx`, accept `heroImages` and render:

```jsx
<RotatingHeroMedia
  images={heroImages}
  className="domain-hero-picture"
  imageClassName="domain-hero-bg-img"
  mobileBreakpoint={767}
/>
```

Keep context label, gold H1, white tagline, and description unchanged. In each route, keep the current family as entry one and add its new rotation family as entry two.

- [ ] **Step 4: Apply the taller shared hero rhythm**

Set `.domain-hero` to `min-height: 35rem; padding: 5rem 0;`, cap `.domain-hero .container` at `52rem`, and increase existing vertical margins without changing type roles or colours. At `<= 768px`, set `min-height: 34rem; padding: 4rem 0;` and retain readable wrapping. Keep the existing flat `rgba(0, 0, 0, 0.70)` overlay.

- [ ] **Step 5: Run focused service tests to verify GREEN**

Run the Step 2 command. Expected: all service and regression tests PASS.

- [ ] **Step 6: Check and commit Task 5**

Run scoped lint and diff checks, stage only the eight named files, and commit:

```powershell
git commit -m "feat: add cinematic service hero rotation"
```

---

### Task 6: Replace the compressed Contact split with a vertical page

**Files:**
- Modify: `src/pages/Contact.jsx`
- Modify: `src/pages/Contact.css`
- Modify: `src/pages/__tests__/Contact.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: the existing Contact state, validation, payload, submission, GA4, success/error, privacy, and link behaviour without logic changes.
- Produces: `.contact-hero`, `.contact-information-section`, `.contact-info-grid` with three `.contact-info-card` articles, and `.contact-enquiry-section` containing one centred `.contact-form-panel`.

- [ ] **Step 1: Replace old layout expectations with failing vertical-page contracts**

Assert DOM order and semantics:

```jsx
const pageSections = container.querySelectorAll('.contact-page > section');
expect(pageSections).toHaveLength(3);
expect(pageSections[0]).toHaveClass('contact-hero');
expect(pageSections[1]).toHaveClass('contact-information-section');
expect(pageSections[2]).toHaveClass('contact-enquiry-section');
expect(container.querySelectorAll('.contact-info-card')).toHaveLength(3);
expect(screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent))
  .toEqual(['Address', 'Phone', 'Email']);
expect(screen.getByRole('heading', { level: 2, name: 'General enquiry' }))
  .toBeInTheDocument();
expect(container.querySelector('.contact-enquiry-section .contact-form-panel'))
  .toBeInTheDocument();
expect(container.querySelector('.contact-enquiry-surface')).not.toBeInTheDocument();
```

Keep every existing field, option, validation, provider-error, payload, success/reset, GA4, privacy, phone, email, and address assertion.

- [ ] **Step 2: Run Contact tests to verify RED**

Run:

```powershell
npm.cmd test -- src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: FAIL because Contact still uses the compressed integrated split.

- [ ] **Step 3: Restructure only the presentation markup**

Create this page sequence around the existing unchanged form body:

```jsx
<section className="contact-hero">
  <div className="container contact-hero-content">
    <span className="section-subtitle">Contact</span>
    <h1 className="contact-title">Start a conversation.</h1>
    <p className="contact-description">...</p>
  </div>
</section>

<section className="section contact-information-section" aria-labelledby="contact-details-title">
  <div className="container">
    <h2 id="contact-details-title" className="sr-only">Contact details</h2>
    <div className="contact-info-grid">
      <article className="contact-info-card"><h3>Address</h3>...</article>
      <article className="contact-info-card"><h3>Phone</h3>...</article>
      <article className="contact-info-card"><h3>Email</h3>...</article>
    </div>
  </div>
</section>

<section className="section contact-enquiry-section" aria-labelledby="contact-enquiry-title">
  <div className="container contact-enquiry-layout">
    <header className="contact-enquiry-header">
      <span className="section-subtitle">Send a message</span>
      <h2 id="contact-enquiry-title" className="section-title">General enquiry</h2>
      <p className="section-title-description">Tell us what you need and how we can reach you.</p>
    </header>
    <div className="contact-form-panel">...</div>
  </div>
</section>
```

Keep `Send a message` as the eyebrow so the accessible `General enquiry` heading is not duplicated. Keep the hero description's Work With Us distinction.

- [ ] **Step 4: Replace compressed CSS with the approved vertical composition**

Implement these owner rules:

```css
.contact-page {
  padding-top: 5rem;
}

.contact-hero {
  display: grid;
  min-height: 22rem;
  place-items: center;
  background: #111111;
  text-align: center;
}

.contact-title {
  color: var(--accent);
}

.contact-description {
  max-width: 58ch;
  margin: 1.5rem auto 0;
  color: rgba(255, 255, 255, 0.84);
}

.contact-information-section {
  padding: 5rem 0;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.contact-info-card {
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: #ffffff;
}

.contact-enquiry-section {
  padding: 6rem 0;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.contact-enquiry-layout {
  max-width: 800px;
}

.contact-enquiry-header {
  margin-bottom: 3rem;
  text-align: center;
}

.contact-form-panel {
  padding: 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: #ffffff;
  box-shadow: var(--shadow-sm);
}

.contact-form-panel textarea.form-input {
  min-height: 9rem;
}
```

Delete `.contact-main-section`, `.contact-intro`, `.contact-enquiry-surface`, column grid-area rules, viewport-height compression rules, and the `max-height: 760px` media query. At `<= 900px`, stack the three cards. At `<= 576px`, use `18rem` hero height, `4rem` section padding, `1.25rem` card/form padding, and a one-column name row. Never reduce form controls below `44px`.

- [ ] **Step 5: Run Contact tests to verify GREEN**

Run the Step 2 command. Expected: structure and all preserved behaviour tests PASS.

- [ ] **Step 6: Check and commit Task 6**

Run scoped lint and diff checks, stage only the four named files, and commit:

```powershell
git commit -m "feat: redesign Contact as a vertical enquiry page"
```

---

### Task 7: Full verification and live browser review

**Files:**
- Modify only the owning source/test file for any defect found.

**Interfaces:**
- Consumes: Tasks 1-6.
- Produces: a clean release candidate with verified routes, media lifecycle, responsive crops, Contact behaviour, and no regressions.

- [ ] **Step 1: Run the complete automated gate**

Run each command independently:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run verify:html
npm.cmd audit
git diff --check
```

Expected: all commands exit 0, prerender prints `Verified 8 prerendered public routes.`, and audit reports 0 vulnerabilities.

- [ ] **Step 2: Review all routes in the live browser**

Hard-load and SPA-navigate `/`, `/about`, `/brands`, `/marketing`, `/branding`, `/ecommerce`, and `/contact` at `390x844`, `768px`, `1280x720`, and `1440x900`.

For every rotating hero, verify: primary first, fixed order, no copy/layout movement, 8-second advance, smooth opacity-only crossfade, meaningful desktop/mobile crop, no trademark/text artefact, no stale previous-route image, and no horizontal overflow. Simulate a hidden document and reduced motion to verify pause/static fallbacks.

For About verify: 38rem/34rem hero, no zoom, readable four-level copy, deliberate 3rem heading-to-card gap, equal desktop cards, and natural mobile stacking.

For Contact verify: 22rem/18rem charcoal hero, three peer cards, generous vertical space, centred 800px form, 44px controls, complete scrolling, phone/email/privacy links, validation, safe error, success/reset, and no duplicate Work With Us action.

- [ ] **Step 3: Inspect performance and console behaviour**

In the browser network panel confirm the primary route image loads eagerly, secondary route images begin only after initial content, unrelated routes' hero images are not requested, and no image is loaded twice. Confirm no console errors/warnings and no orphaned timer activity after repeated route navigation.

- [ ] **Step 4: Review the final diff and commit any owner-specific correction**

Run:

```powershell
git status --short
git diff --stat
git log --oneline -8
```

If verification required a correction, rerun its focused test and the complete gate, then commit it with a specific owner message. Do not create a generic cleanup commit when no changes remain.

## Self-Review Record

- Spec coverage: all image counts, fixed timing, transition duration, loading strategy, reduced motion, visibility pause, provenance, cinematic heights, About spacing, Contact sequence, preserved behaviour, automated commands, and live viewport checks map to Tasks 1-7.
- Placeholder scan: complete; every step contains concrete paths, commands, assertions, prompts, or implementation code.
- Type consistency: all page integrations consume `RotatingHeroMedia` with the same `images`, `className`, `imageClassName`, and `mobileBreakpoint` interface; image entries consistently use `id`, `src`, `desktopSrcSet`, `mobileSrc`, `sizes`, `width`, and `height`.
