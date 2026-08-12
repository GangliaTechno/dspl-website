from pathlib import Path
import json

from PIL import Image, ImageDraw, ImageFont, ImageOps


RESAMPLE = Image.Resampling.LANCZOS


def _font(size: int, bold: bool = False):
    candidates = [
        Path(
            "C:/Windows/Fonts/segoeuib.ttf"
            if bold
            else "C:/Windows/Fonts/segoeui.ttf"
        ),
        Path(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
            if bold
            else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
        ),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default(size=size)


def _fit_font(draw: ImageDraw.ImageDraw, text: str, size: int, max_width: int):
    while size >= 24:
        font = _font(size, bold=True)
        if draw.textbbox((0, 0), text, font=font)[2] <= max_width:
            return font
        size -= 2
    return _font(24, bold=True)


def _save_icon(source: Image.Image, path: Path, size: int):
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    mark = ImageOps.contain(source.convert("RGBA"), (size, size), RESAMPLE)
    canvas.alpha_composite(
        mark,
        ((size - mark.width) // 2, (size - mark.height) // 2),
    )
    canvas.save(path, optimize=True)


def optimize_texture(path: Path):
    with Image.open(path) as source:
        image = source.copy()
    image.thumbnail((896, 896), RESAMPLE)
    image.save(path, "WEBP", quality=50, method=6)


def generate_assets(root: Path):
    public = root / "public"
    assets = root / "src/assets"
    public.mkdir(parents=True, exist_ok=True)

    with Image.open(assets / "dspl-home-editorial-1920.webp") as source:
        hero = source.convert("RGB")
    og = ImageOps.fit(hero, (1200, 630), method=RESAMPLE)
    overlay = Image.new("RGBA", og.size, (12, 13, 14, 168))
    og = Image.alpha_composite(og.convert("RGBA"), overlay)

    with Image.open(assets / "icon_orange.png") as source:
        logo = ImageOps.contain(source.convert("RGBA"), (520, 122), RESAMPLE)
    og.alpha_composite(logo, (64, 54))

    draw = ImageDraw.Draw(og)
    line_one = "We develop brands."
    line_two = "We deliver disciplined market execution."
    draw.text(
        (68, 286),
        line_one,
        font=_fit_font(draw, line_one, 62, 1064),
        fill="#ffffff",
    )
    draw.text(
        (68, 374),
        line_two,
        font=_fit_font(draw, line_two, 38, 1064),
        fill="#f0a23a",
    )
    draw.text(
        (70, 545),
        "dashapatmaja.in",
        font=_font(24),
        fill="#ffffff",
    )

    og_path = public / "og-cover.jpg"
    og.convert("RGB").save(
        og_path,
        quality=86,
        optimize=True,
        progressive=True,
    )

    with Image.open(public / "logo.png") as source:
        mark = source.copy()
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

    manifest = {
        "name": "Dashapatmaja Solutions Pvt Ltd",
        "short_name": "DSPL",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#111111",
        "icons": [
            {
                "src": "/icon-192.png",
                "sizes": "192x192",
                "type": "image/png",
            },
            {
                "src": "/icon-512.png",
                "sizes": "512x512",
                "type": "image/png",
            },
        ],
    }
    (public / "site.webmanifest").write_text(
        json.dumps(manifest, indent=2) + "\n",
        encoding="utf-8",
    )

    logo_webp = assets / "icon_orange.webp"
    with Image.open(assets / "icon_orange.png") as source:
        source.save(logo_webp, "WEBP", quality=88, method=6)

    team_webp = assets / "manu_pro_fixed.webp"
    with Image.open(assets / "manu_pro_fixed.jpg") as source:
        source.save(team_webp, "WEBP", quality=82, method=6)

    for path, quality in [
        (assets / "raw-radicles-logo-cropped.webp", 82),
    ]:
        with Image.open(path) as source:
            image = source.copy()
        image.save(path, "WEBP", quality=quality, method=6)

    optimize_texture(assets / "linen_concrete_texture.webp")

    return {
        "og": og_path,
        **icons,
        "logo_webp": logo_webp,
        "team_webp": team_webp,
    }


if __name__ == "__main__":
    generate_assets(Path(__file__).resolve().parents[1])
