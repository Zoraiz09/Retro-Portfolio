import io
from PIL import Image, ImageOps
import pillow_heif
pillow_heif.register_heif_opener()

SRC = "Projects Pics"
OUT = "public/media"

def save_web(img, name, max_w, quality=82):
    img = ImageOps.exif_transpose(img).convert("RGB")
    if img.width > max_w:
        h = round(img.height * max_w / img.width)
        img = img.resize((max_w, h), Image.LANCZOS)
    p = f"{OUT}/{name}.webp"
    img.save(p, "WEBP", quality=quality, method=6)
    import os
    kb = os.path.getsize(p)//1024
    print(f"{name}.webp  {img.width}x{img.height}  {kb}KB")

# Zoraiz portrait (HEIC) -> portrait + square crop
z = Image.open(f"{SRC}/Zoraiz Pic .HEIC")
z = ImageOps.exif_transpose(z).convert("RGB")
save_web(z, "zoraiz", 900)
# square version for cards
side = min(z.width, z.height)
zc = z.crop(((z.width-side)//2, (z.height-side)//2, (z.width-side)//2+side, (z.height-side)//2+side))
save_web(zc, "zoraiz-square", 700)

# IRIS field photo
save_web(Image.open(f"{SRC}/IRIS Pic.jpeg"), "iris", 1400)

# DFSS dashboard
save_web(Image.open(f"{SRC}/DFSS.png"), "dfss", 1400, quality=88)
print("done")
