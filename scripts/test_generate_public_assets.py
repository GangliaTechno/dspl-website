from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from PIL import Image

from scripts.generate_public_assets import generate_assets, optimize_texture


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


def image_size(path: Path):
    with Image.open(path) as image:
        return image.size


def image_format(path: Path):
    with Image.open(path) as image:
        return image.format


class GeneratePublicAssetsTests(unittest.TestCase):
    def test_generates_exact_social_and_icon_dimensions(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            create_fixture(root)

            generated = generate_assets(root)

            self.assertEqual(image_size(generated["og"]), (1200, 630))
            for key, size in {
                "favicon_16": (16, 16),
                "favicon_32": (32, 32),
                "apple_touch": (180, 180),
                "icon_192": (192, 192),
                "icon_512": (512, 512),
            }.items():
                self.assertEqual(image_size(generated[key]), size)

    def test_writes_optimized_webp_delivery_assets_and_manifest(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            create_fixture(root)

            generated = generate_assets(root)

            self.assertEqual(image_format(generated["logo_webp"]), "WEBP")
            self.assertEqual(image_format(generated["team_webp"]), "WEBP")
            manifest = (root / "public/site.webmanifest").read_text(
                encoding="utf-8"
            )
            self.assertIn('"name": "Dashapatmaja Solutions Pvt Ltd"', manifest)
            self.assertIn('"src": "/icon-512.png"', manifest)

    def test_texture_optimizer_caps_delivery_dimensions(self):
        with TemporaryDirectory() as temp:
            target = Path(temp) / "texture.webp"
            Image.effect_noise((1024, 1024), 12).save(target, "WEBP", quality=90)

            optimize_texture(target)

            self.assertEqual(image_size(target), (896, 896))
            self.assertLess(target.stat().st_size, 100_000)


if __name__ == "__main__":
    unittest.main()
