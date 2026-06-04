from PIL import Image, ImageOps
img = ImageOps.exif_transpose(Image.open("Projects Pics/System Forge.png")).convert("RGB")
mw=1400
if img.width>mw:
    h=round(img.height*mw/img.width); img=img.resize((mw,h), Image.LANCZOS)
img.save("public/media/systemforge.webp","WEBP",quality=88,method=6)
import os; print(f"systemforge.webp {img.width}x{img.height} {os.path.getsize('public/media/systemforge.webp')//1024}KB")
