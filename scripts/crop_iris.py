from PIL import Image
img = Image.open("Projects Pics/IRIS Pic.jpeg").convert("RGB")
W,H = img.size
# keep the people band: drop top ~37% (sky/trees), keep down to ~99%
top = int(0.37*H); bottom = int(0.99*H)
crop = img.crop((0, top, W, bottom))
# scale to max width 1400
mw=1200
if crop.width>mw:
    h=round(crop.height*mw/crop.width); crop=crop.resize((mw,h), Image.LANCZOS)
crop.save("public/media/iris-team.webp","WEBP",quality=80,method=6)
import os
print(f"iris-team.webp {crop.width}x{crop.height} {os.path.getsize('public/media/iris-team.webp')//1024}KB")
