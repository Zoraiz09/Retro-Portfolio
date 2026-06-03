from PIL import Image
img = Image.open("screenshots/arch_desktop.png")
W,H = img.size
# the diagram is roughly y 460-720 of a ~1180 tall (2x scale) -> crop the blueprint area
crop = img.crop((int(0.10*W), int(0.40*H), int(0.95*W), int(0.62*H)))
crop.save("screenshots/arch_crop.png")
print("ok", crop.size)
