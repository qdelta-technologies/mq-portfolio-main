"""Generate lossless, responsive site images without overwriting the originals.

Install tooling: python -m pip install -r scripts/requirements-images.txt
Run: npm run images:optimize
"""

import json
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageOps
except ImportError as error:
    raise SystemExit(
        "Install Pillow first: python -m pip install -r scripts/requirements-images.txt"
    ) from error


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUTPUT = PUBLIC / "images" / "optimized"
OUTPUT.mkdir(parents=True, exist_ok=True)

assets = [
    (PUBLIC / "images/qais-portrait-hero.png", [320, 480, 560, 840, 960, 1313]),
    (PUBLIC / "images/qais-portrait.png", [48, 96, 144]),
    (PUBLIC / "images/mq-logo.png", [168, 280, 559]),
    (PUBLIC / "images/mq-favicon.png", [64, 128, 256]),
    *[(path, [320, 400, 640, 800, 896]) for path in sorted((PUBLIC / "images/projects").glob("*.jpg"))],
]

manifest = {}
original_total = 0
full_size_total = 0

for source, requested_widths in assets:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        # Keep the head, shoulders and upper body in the circular brand portrait.
        if source.name == "qais-portrait.png":
            image = ImageOps.fit(image, (144, 144), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

        # Cards already show only this top-aligned 16:10.5 region via object-cover.
        # Discard only pixels that were never visible; do not change the card crop.
        if source.parent.name == "projects":
            image = image.crop((0, 0, image.width, round(image.width * 10.5 / 16)))

        widths = sorted({min(width, image.width) for width in requested_widths} | {image.width})
        variants = []

        for width in widths:
            resized = image if width == image.width else image.resize(
                (width, round(image.height * width / image.width)), Image.Resampling.LANCZOS
            )
            destination = OUTPUT / f"{source.stem}-{width}.webp"
            resized.save(destination, "WEBP", lossless=True, method=6, exact=True)

            # Verify the encoder preserved every pixel, including transparency.
            with Image.open(destination) as encoded:
                if encoded.convert(resized.mode).tobytes() != resized.tobytes():
                    raise RuntimeError(f"Lossless verification failed: {destination.name}")

            variants.append({
                "src": "/" + destination.relative_to(PUBLIC).as_posix(),
                "width": width,
                "height": resized.height,
                "bytes": destination.stat().st_size,
            })

        key = "/" + source.relative_to(PUBLIC).as_posix()
        manifest[key] = {
            "width": image.width,
            "height": image.height,
            "srcSet": ", ".join(f"{variant['src']} {variant['width']}w" for variant in variants),
            "variants": variants,
        }
        original_total += source.stat().st_size
        full_size_total += variants[-1]["bytes"]
        print(f"{source.name}: {source.stat().st_size:,} -> {variants[-1]['bytes']:,} bytes at full width")

(ROOT / "src/data/imageAssets.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

# Match the logo's circular portrait and fine grey frame in browser tabs.
favicon = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
frame = ImageDraw.Draw(favicon)
frame.ellipse((4, 4, 507, 507), fill=(255, 255, 255, 245), outline=(165, 169, 177, 255), width=8)
with Image.open(PUBLIC / "images/qais-portrait.png") as original:
    photo = ImageOps.fit(ImageOps.exif_transpose(original).convert("RGBA"), (432, 432), method=Image.Resampling.LANCZOS)
mask = Image.new("L", (432, 432), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 431, 431), fill=255)
favicon.paste(photo, (40, 40), mask)
for size in (32, 64):
    favicon.resize((size, size), Image.Resampling.LANCZOS).save(
        PUBLIC / f"images/portrait-favicon-{size}.png", optimize=True
    )
favicon.save(PUBLIC / "images/portrait-favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("Generated circular portrait favicons (PNG and multi-size ICO).")
print(f"Full-width total: {original_total:,} -> {full_size_total:,} bytes. Smaller screens use smaller variants.")
