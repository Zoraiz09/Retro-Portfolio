from PIL import Image, ImageOps
img = ImageOps.exif_transpose(Image.open("Projects Pics/Hermes.png")).convert("RGB")
mw=1400
if img.width>mw:
    h=round(img.height*mw/img.width); img=img.resize((mw,h), Image.LANCZOS)
img.save("public/media/hermes.webp","WEBP",quality=86,method=6)
import os; print(f"hermes.webp {img.width}x{img.height} {os.path.getsize('public/media/hermes.webp')//1024}KB")
