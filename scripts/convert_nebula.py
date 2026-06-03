from PIL import Image, ImageOps
img = ImageOps.exif_transpose(Image.open("Projects Pics/Nebula.png")).convert("RGB")
mw=1400
if img.width>mw:
    h=round(img.height*mw/img.width); img=img.resize((mw,h), Image.LANCZOS)
img.save("public/media/nebula.webp","WEBP",quality=86,method=6)
import os; print(f"nebula.webp {img.width}x{img.height} {os.path.getsize('public/media/nebula.webp')//1024}KB")
