from PIL import Image, ImageOps
img = ImageOps.exif_transpose(Image.open("Projects Pics/Code_Saga_AI.png")).convert("RGB")
mw=1400
if img.width>mw:
    h=round(img.height*mw/img.width); img=img.resize((mw,h), Image.LANCZOS)
img.save("public/media/codesage.webp","WEBP",quality=88,method=6)
import os; print(f"codesage.webp {img.width}x{img.height} {os.path.getsize('public/media/codesage.webp')//1024}KB")
