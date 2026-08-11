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
