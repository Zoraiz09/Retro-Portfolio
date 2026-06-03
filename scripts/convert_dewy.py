from PIL import Image, ImageOps
SRC="Projects Pics"; OUT="public/media"
def save(src, name, max_w=680, q=84):
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if img.width > max_w:
        h = round(img.height*max_w/img.width); img = img.resize((max_w,h), Image.LANCZOS)
    p=f"{OUT}/{name}.webp"; img.save(p,"WEBP",quality=q,method=6)
    import os; print(f"{name}.webp {img.width}x{img.height} {os.path.getsize(p)//1024}KB")
save(f"{SRC}/dewy.jpeg","dewy")
save(f"{SRC}/dewy 2.jpeg","dewy2")
