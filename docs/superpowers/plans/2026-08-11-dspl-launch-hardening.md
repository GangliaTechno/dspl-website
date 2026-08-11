# DSPL Launch Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the approved local launch-hardening pass without changing CIN, hosting configuration, HTTP status behavior, security headers, or Web3Forms submission behavior.

**Architecture:** Keep the current React/Vite and prerender architecture. Add one reproducible Pillow asset generator for public/social assets and optimized production copies, then make small test-backed changes in the existing Footer, 404, form, Header, and build boundaries. Preserve current route metadata and component ownership rather than introducing another framework or state system.

**Tech Stack:** React 19.2.8, React Router 8.3.0, Vite 8.0.12, Vitest 4.1.10, Testing Library, Python 3.12 with Pillow 12.3.0.

## Global Constraints

- Work on `pawan/raw-radicles-redesign`; do not modify `main`.
- Preserve all existing uncommitted user changes and do not reset or overwrite them.
- Do not change the displayed CIN until DSPL's Certificate of Incorporation or exact verified CIN is provided.
- Do not add hosting rewrites, CSP, security headers, or claim real HTTP 404 delivery.
- Do not change Web3Forms keys, endpoints, payloads, retries, timeouts, success behavior, or error behavior.
- Do not invent testimonials, metrics, legal assurances, outcomes, or business facts.
- Keep the Header as the primary Work With Us modal trigger; the new global CTA links to `/contact`.
- Preserve source masters and provenance; delete only a superseded production asset after proving it has no source reference.
- Because target files already contain user changes, do not create implementation commits that would mix ownership. Leave implementation local for review.

---

### Task 1: Reproducible social artwork, icons, and production asset optimization

**Files:**
- Create: `scripts/generate_public_assets.py`
- Create: `scripts/test_generate_public_assets.py`
- Create: `public/favicon-16.png`
- Create: `public/favicon-32.png`
- Create: `public/apple-touch-icon.png`
- Create: `public/icon-192.png`
- Create: `public/icon-512.png`
- Create: `public/site.webmanifest`
- Create: `src/assets/icon_orange.webp`
- Create: `src/assets/manu_pro_fixed.webp`
- Modify: `public/og-cover.jpg`
- Modify in place: `src/assets/raw-radicles-logo-cropped.webp`
- Modify in place: `src/assets/linen_concrete_texture.webp`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/pages/About.jsx`
- Modify: `index.html`
- Modify: `src/__tests__/designSystemRegression.test.js`
- Remove after reference proof: `src/assets/manu_pro_fixed.jpg`
- Remove after reference proof: `public/favicon.png`

**Interfaces:**
- Consumes: approved `src/assets/dspl-home-editorial-1920.webp`, `src/assets/icon_orange.png`, `public/logo.png`, and the four current production-heavy assets.
- Produces: `generate_assets(root: Path) -> dict[str, Path]`, stable public icon paths, a 1200 x 630 OG JPEG, and optimized import targets.

- [ ] **Step 1: Write the failing generator tests**

Create `scripts/test_generate_public_assets.py` with tests that import
`generate_public_assets`, run it against a temporary fixture tree, and assert:

```python
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from PIL import Image

from scripts.generate_public_assets import generate_assets


def create_fixture(root: Path):
    (root / "public").mkdir()
    (root / "src/assets").mkdir(parents=True)
    Image.new("RGB", (1920, 1080), "#7a4a22").save(
        root / "src/assets/dspl-home-editorial-1920.webp"
    )
    Image.new("RGBA", (806, 190), (240, 156, 40, 255)).save(
        root / "src/assets/icon_orange.png"
    )
    Image.new("RGBA", (167, 167), (240, 156, 40, 255)).save(
        root / "public/logo.png"
    )
    Image.new("RGB", (1024, 1024), "#92745f").save(
        root / "src/assets/manu_pro_fixed.jpg"
    )
    Image.new("RGBA", (748, 692), (25, 90, 35, 255)).save(
        root / "src/assets/raw-radicles-logo-cropped.webp"
    )
    Image.new("RGB", (1024, 1024), "#d5c9b8").save(
        root / "src/assets/linen_concrete_texture.webp"
    )


class GeneratePublicAssetsTests(unittest.TestCase):
    def test_generates_exact_social_and_icon_dimensions(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            create_fixture(root)

            generated = generate_assets(root)

            self.assertEqual(Image.open(generated["og"]).size, (1200, 630))
            for key, size in {
                "favicon_16": (16, 16),
                "favicon_32": (32, 32),
                "apple_touch": (180, 180),
                "icon_192": (192, 192),
                "icon_512": (512, 512),
            }.items():
                self.assertEqual(Image.open(generated[key]).size, size)

    def test_writes_optimized_webp_delivery_assets(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            create_fixture(root)

            generated = generate_assets(root)

            self.assertEqual(Image.open(generated["logo_webp"]).format, "WEBP")
            self.assertEqual(Image.open(generated["team_webp"]).format, "WEBP")
            manifest = (root / "public/site.webmanifest").read_text(encoding="utf-8")
            self.assertIn('"name": "Dashapatmaja Solutions Pvt Ltd"', manifest)
            self.assertIn('"src": "/icon-512.png"', manifest)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the generator tests and verify RED**

Run:

```powershell
python -m unittest scripts/test_generate_public_assets.py -v
```

Expected: import failure because `scripts/generate_public_assets.py` does not yet exist.

- [ ] **Step 3: Implement the asset generator**

Create `scripts/generate_public_assets.py` with:

```python
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import json

RESAMPLE = Image.Resampling.LANCZOS


def _font(size: int, bold: bool = False):
    candidates = [
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default(size=size)


def _save_icon(source: Image.Image, path: Path, size: int):
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    mark = ImageOps.contain(source.convert("RGBA"), (size, size), RESAMPLE)
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    canvas.save(path, optimize=True)


def generate_assets(root: Path):
    public = root / "public"
    assets = root / "src/assets"
    public.mkdir(parents=True, exist_ok=True)

    hero = Image.open(assets / "dspl-home-editorial-1920.webp").convert("RGB")
    og = ImageOps.fit(hero, (1200, 630), method=RESAMPLE)
    overlay = Image.new("RGBA", og.size, (12, 13, 14, 168))
    og = Image.alpha_composite(og.convert("RGBA"), overlay)
    logo = ImageOps.contain(
        Image.open(assets / "icon_orange.png").convert("RGBA"),
        (520, 122),
        RESAMPLE,
    )
    og.alpha_composite(logo, (64, 54))
    draw = ImageDraw.Draw(og)
    draw.text((68, 286), "We develop brands.", font=_font(62, True), fill="#ffffff")
    draw.text((68, 374), "We deliver disciplined market execution.", font=_font(38, True), fill="#f0a23a")
    draw.text((70, 545), "dashapatmaja.in", font=_font(24), fill="#ffffff")
    og_path = public / "og-cover.jpg"
    og.convert("RGB").save(og_path, quality=86, optimize=True, progressive=True)

    mark = Image.open(public / "logo.png")
    icons = {}
    for key, filename, size in [
        ("favicon_16", "favicon-16.png", 16),
        ("favicon_32", "favicon-32.png", 32),
        ("apple_touch", "apple-touch-icon.png", 180),
        ("icon_192", "icon-192.png", 192),
        ("icon_512", "icon-512.png", 512),
    ]:
        path = public / filename
        _save_icon(mark, path, size)
        icons[key] = path

    (public / "site.webmanifest").write_text(json.dumps({
        "name": "Dashapatmaja Solutions Pvt Ltd",
        "short_name": "DSPL",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#111111",
        "icons": [
            {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }, indent=2) + "\n", encoding="utf-8")

    Image.open(assets / "icon_orange.png").save(
        assets / "icon_orange.webp", "WEBP", quality=88, method=6
    )
    Image.open(assets / "manu_pro_fixed.jpg").save(
        assets / "manu_pro_fixed.webp", "WEBP", quality=82, method=6
    )
    for path, quality in [
        (assets / "raw-radicles-logo-cropped.webp", 82),
        (assets / "linen_concrete_texture.webp", 72),
    ]:
        with Image.open(path) as source:
            image = source.copy()
        image.save(path, "WEBP", quality=quality, method=6)

    return {"og": og_path, **icons,
            "logo_webp": assets / "icon_orange.webp",
            "team_webp": assets / "manu_pro_fixed.webp"}


if __name__ == "__main__":
    generate_assets(Path(__file__).resolve().parents[1])
```

Keep the exact approved copy. If local font metrics make the second line exceed
the safe inset, reduce that line's font size without changing the words.

- [ ] **Step 4: Run tests and generate the real outputs**

Run:

```powershell
python -m unittest scripts/test_generate_public_assets.py -v
python scripts/generate_public_assets.py
```

Expected: tests pass and all declared files are generated.

- [ ] **Step 5: Wire metadata and optimized imports**

Update `index.html` to contain exactly these icon/manifest references:

```html
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#111111" />
```

Change Header and Footer imports to `../assets/icon_orange.webp` and About's
team import to `../assets/manu_pro_fixed.webp`. Do not change the existing
absolute OG URL or declared 1200 x 630 dimensions.

- [ ] **Step 6: Add deterministic static regression assertions**

Extend `src/__tests__/designSystemRegression.test.js` to assert all five icon
references, manifest existence/content, the new optimized imports, no old team
JPG import, and exact OG dimensions via the JPEG file header helper used by the
test. Keep asset-size assertions in Python because Vitest does not decode WebP.

- [ ] **Step 7: Verify assets and remove the superseded team JPG**

Run:

```powershell
python -m unittest scripts/test_generate_public_assets.py -v
& 'C:\Program Files\nodejs\npm.cmd' test -- src/__tests__/designSystemRegression.test.js
rg -n "manu_pro_fixed\.jpg" src
```

Expected: tests pass and `rg` has no source match. Then remove only
`src/assets/manu_pro_fixed.jpg` with `Remove-Item -LiteralPath` after verifying
its resolved path is inside `E:\For website\dspl website\src\assets`. Also
prove `/favicon.png` has no source or metadata reference, then remove only
`public/favicon.png` after verifying its resolved path is inside the repository's
`public` directory. Keep `public/logo.png` because structured data and the asset
generator still use it.

---

### Task 2: Deterministic 404 hydration and stable metadata

**Files:**
- Modify: `src/pages/__tests__/NotFound.test.jsx`
- Modify: `src/hooks/__tests__/useSEO.test.jsx`
- Modify: `src/__tests__/hydrationRoute.test.js`
- Modify: `src/pages/NotFound.jsx`
- Modify: `src/hydrationRoute.js`
- Modify: `src/main.jsx`
- Modify: `scripts/verify-prerender.mjs`

**Interfaces:**
- Consumes: `NOT_FOUND_METADATA` with canonical `/404.html`.
- Produces: path-independent 404 body, a safe unknown-route client-render
  fallback, and preserved pathname analytics.

- [ ] **Step 1: Write failing 404 regressions**

Change the NotFound test to expect generic text, no visible `/missing-page`, and
the analytics label `/missing-page`. Change the SEO test to expect the canonical
link `https://dashapatmaja.in/404.html` after rendering an unknown route.

- [ ] **Step 2: Run focused tests and verify RED**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/pages/__tests__/NotFound.test.jsx src/hooks/__tests__/useSEO.test.jsx
```

Expected: failures because the current body and canonical use `location.pathname`.

- [ ] **Step 3: Implement the stable fallback**

In `NotFound.jsx`, call `useSEO(NOT_FOUND_METADATA)` and replace the explanation with:

```jsx
<p className="not-found-description">
  The requested page does not exist, has been removed, or is temporarily unavailable.
</p>
```

Keep `location.pathname` only in the analytics effect.

- [ ] **Step 4: Harden prerender verification**

In the `404.html` verifier, reject visible fallback copy containing
`<code class="missing-path">/404.html</code>` and require the stable canonical
`https://dashapatmaja.in/404.html`.

Production browser verification must also cover a host that returns the Home
document for an unknown URL. In that case, startup must not hydrate incompatible
markup: known prerendered pages continue to hydrate, while a loaded `NotFound`
page clears the fallback markup and mounts with `createRoot`.

- [ ] **Step 5: Verify GREEN**

Run the focused tests, then `npm run build` and `npm run verify:html`.

---

### Task 3: Global Contact CTA and unused Home CSS cleanup

**Files:**
- Modify: `src/components/__tests__/Footer.test.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.css`
- Modify: `src/pages/Home.css`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: existing `.footer-cta-*` styles and React Router `Link`.
- Produces: one global `/contact` CTA before the footer grid.

- [ ] **Step 1: Add failing Footer and CSS regressions**

Assert the Footer renders `Start a conversation`, the exact heading/supporting
copy, and a `Contact DSPL` link with `href="/contact"`. Assert `Home.css` no
longer contains `.home-mid-cta`.

- [ ] **Step 2: Run focused tests and verify RED**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/components/__tests__/Footer.test.jsx src/__tests__/designSystemRegression.test.js
```

- [ ] **Step 3: Render the CTA before the main Footer content**

Add this as the first child of `<footer>`:

```jsx
<section className="footer-cta-strip" aria-labelledby="footer-cta-title">
  <div className="container footer-cta-inner">
    <div className="footer-cta-text">
      <span className="section-subtitle">Start a conversation</span>
      <h2 id="footer-cta-title" className="footer-cta-heading">
        Ready to build with greater clarity?
      </h2>
      <p className="footer-cta-subtext">
        Tell us what you are building, where you need support, and what a successful next step looks like.
      </p>
    </div>
    <Link to="/contact" className="btn btn-primary footer-cta-btn">
      Contact DSPL
    </Link>
  </div>
</section>
```

Adjust the existing CTA CSS only as needed for 44 px targets and existing DSPL
tokens. Remove the complete `.home-mid-cta` block and its media query.

- [ ] **Step 4: Verify GREEN**

Run the focused tests and `git diff --check` for the five files.

---

### Task 4: First-invalid-field focus in both forms

**Files:**
- Modify: `src/pages/__tests__/Contact.test.jsx`
- Modify: `src/components/__tests__/WorkWithUsModal.test.jsx`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/components/WorkWithUsModal.jsx`

**Interfaces:**
- Consumes: existing validation error insertion order and field `name` values.
- Produces: focus movement only; submission/network contracts remain unchanged.

- [ ] **Step 1: Write failing focus regressions**

For each form, submit empty data and assert `document.activeElement` is the
first-name/full-name input. Add a Work With Us case with valid contact fields
and no service selected, asserting the first service checkbox receives focus.

- [ ] **Step 2: Run focused tests and verify RED**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/pages/__tests__/Contact.test.jsx src/components/__tests__/WorkWithUsModal.test.jsx
```

- [ ] **Step 3: Implement direct native focus**

Add a `formRef` to each `<form>`. After validation fails, resolve the first
error key and focus:

```js
const firstErrorKey = Object.keys(validationErrors)[0];
const field = formRef.current?.elements.namedItem(firstErrorKey);
const focusTarget = field instanceof RadioNodeList ? field[0] : field;
focusTarget?.focus();
```

In implementation, avoid a hard dependency on `RadioNodeList` where it is not
defined; use `typeof field?.length === 'number'` to select the first checkbox.
Retain the modal's existing scroll-into-view behavior.

- [ ] **Step 4: Verify GREEN and submission isolation**

Run focused tests and confirm no Web3Forms endpoint/payload line changed in the diff.

---

### Task 5: Mobile drawer close control inside the focus trap

**Files:**
- Modify: `src/components/__tests__/Header.test.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`

**Interfaces:**
- Consumes: `drawerRef`, `menuBtnRef`, `handleLinkClick`, Escape handling, and existing focus selector.
- Produces: labelled `.mobile-drawer-close` as initial and trapped focus.

- [ ] **Step 1: Write failing drawer regressions**

Open the drawer, assert a button named `Close navigation menu` exists inside
`#mobile-navigation`, assert it receives initial focus, and assert Shift+Tab
from it wraps to the final Work With Us control. Click it and assert focus
returns to the external menu trigger.

- [ ] **Step 2: Run the Header test and verify RED**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/components/__tests__/Header.test.jsx
```

- [ ] **Step 3: Add the internal close control**

Add at the start of the drawer:

```jsx
<button
  type="button"
  className="mobile-drawer-close"
  aria-label="Close navigation menu"
  onClick={handleLinkClick}
>
  <X size={24} aria-hidden="true" />
</button>
```

Initial focus must target `.mobile-drawer-close`. Hide the external toggle from
the active dialog interaction using `tabIndex={isOpen ? -1 : 0}` and make the
internal control visually occupy the drawer's top-right area. Preserve Escape,
backdrop closing, reduced motion, and focus restoration.

- [ ] **Step 4: Verify GREEN**

Run the Header test and `git diff --check` for Header JSX/CSS/test.

---

### Task 6: Source maps and rotating-hero warning gate

**Files:**
- Modify: `vite.config.js`
- Modify only if a warning reproduces: `src/components/__tests__/RotatingHeroMedia.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`

**Interfaces:**
- Consumes: Vite build config and current RotatingHeroMedia behavior.
- Produces: zero public `.map` files and a warning-free focused test.

- [ ] **Step 1: Add a failing source-map configuration assertion**

Assert `vite.config.js` contains `sourcemap: false` and does not contain
`sourcemap: 'hidden'`.

- [ ] **Step 2: Run the design regression and verify RED**

Run the design-system regression test; expect failure on the current hidden map setting.

- [ ] **Step 3: Disable source maps**

Set:

```js
build: {
  sourcemap: false,
},
```

- [ ] **Step 4: Reproduce the RotatingHeroMedia warning in isolation**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/components/__tests__/RotatingHeroMedia.test.jsx
```

If the warning reproduces, wrap every visibility-change dispatch and timer-driven
state update in `act`, and ensure cleanup does not dispatch after unmount. If it
does not reproduce, make no speculative test change and record the fresh clean output.

- [ ] **Step 5: Verify build output**

Run build, then fail if `(Get-ChildItem dist -Recurse -Filter *.map)` returns any file.

---

### Task 7: Supporter marquee clarity without cadence drift

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/components/home/homeSections.css`

**Interfaces:**
- Consumes: exact `--supporter-shift`, 28-second linear transform loop, current gaps, and reduced-motion contract.
- Produces: unfiltered full-opacity white marquee assets without changing geometry or speed.

- [ ] **Step 1: Add a failing marquee clarity regression**

Change the existing supporter assertion to require:

```js
expect(homeSections).toMatch(
  /\.supporter-logo\s*{[^}]*filter:\s*none;[^}]*opacity:\s*1;/s,
);
expect(homeSections).not.toContain('drop-shadow(');
expect(homeSections).not.toMatch(/\.supporter-logo\s*{[^}]*transition:/s);
expect(homeSections).toContain('animation: supporter-marquee 28s linear infinite;');
```

- [ ] **Step 2: Run the design regression and verify RED**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/__tests__/designSystemRegression.test.js
```

Expected: failure because the current moving logos use brightness/invert,
drop-shadow, 0.86 opacity, and an opacity transition.

- [ ] **Step 3: Remove paint-heavy logo treatment**

Set the delivery rule to:

```css
.supporter-logo {
  display: block;
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transform: none;
  filter: none;
  opacity: 1;
  image-rendering: auto;
  backface-visibility: hidden;
}
```

Remove `.supporter-logo:hover`; keep every track, sequence, keyframe, gap,
duration, edge mask, and reduced-motion declaration unchanged.

- [ ] **Step 4: Verify GREEN and the motion contract**

Run the design regression and confirm the diff contains no change to
`SupporterStrip.jsx`, `--supporter-gap`, `--supporter-shift`, the 28-second
duration, or reduced-motion declarations.

---

### Task 8: Reserve execution language for the Home proposition

**Files:**
- Modify: `src/pages/__tests__/Home.test.jsx`
- Modify: `src/pages/__tests__/About.test.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/About.jsx`

**Interfaces:**
- Consumes: existing Home hero/capability and About hero/direction-card composition.
- Produces: one use of `execution` across both rendered routes, in the Home H1 only.

- [ ] **Step 1: Add failing exact-copy regressions**

Assert the exact five approved replacement strings on their respective pages.
Also concatenate `src/pages/Home.jsx` and `src/pages/About.jsx` in the static
design regression and assert `/\bexecution\b/gi` has length `1`.

- [ ] **Step 2: Run focused tests and verify RED**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/pages/__tests__/Home.test.jsx src/pages/__tests__/About.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: failure because six current source occurrences remain and none of the
five approved replacements is rendered.

- [ ] **Step 3: Apply the approved copy exactly**

Use the five exact strings recorded under `Home and About copy discipline` in
`docs/superpowers/specs/2026-08-11-dspl-launch-hardening-design.md`. Do not
change the Home H1 proposition or any array/section structure.

- [ ] **Step 4: Verify GREEN**

Run the focused tests and prove:

```powershell
rg -n -i "\bexecution\b" src/pages/Home.jsx src/pages/About.jsx
```

Expected: one match, the Home hero proposition.

---

### Task 9: Full automated and responsive verification

**Files:**
- Verify all touched files and generated binary assets.

**Interfaces:**
- Consumes: Tasks 1-8.
- Produces: fresh release-readiness evidence without deployment.

- [ ] **Step 1: Run complete automated verification**

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run verify:html
if (Get-ChildItem -LiteralPath dist -Recurse -Filter *.map) { throw 'Public source maps remain' }
& 'C:\Program Files\nodejs\npm.cmd' audit
git diff --check
```

Expected: every command exits 0, 96 or more tests pass with no React warning,
all nine prerender documents verify, no source map exists, and audit reports zero vulnerabilities.

- [ ] **Step 2: Inspect generated dimensions, file sizes, references, and deferrals**

Use Pillow to print exact image dimensions/sizes. Use `rg` to prove old team-JPG
imports are absent and Web3Forms fetch/payload lines, the disputed CIN, and
hosting/security configuration remain unchanged.

- [ ] **Step 3: Run production browser checks**

Serve `dist` and inspect Home, Contact, Privacy, and an unknown path at 390 x
844, 768 px, 1039/1040 px, 1280 x 720, and 1440 x 900. Confirm no overflow,
broken image, console error, hydration mismatch, trapped-focus escape, or CTA
collision. The preview's HTTP status is not an acceptance criterion.

- [ ] **Step 4: Review the final diff against the approved specification**

Confirm each acceptance criterion is supported by output, list the deferred
items explicitly, and do not push, merge, or deploy.
