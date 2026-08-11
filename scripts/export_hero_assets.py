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
                "Hero master must be at least 1440x853; "
                f"received {image.width}x{image.height}"
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
