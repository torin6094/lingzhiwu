from PIL import Image
import os

# 读取原图
img = Image.open(r'C:\Users\Jeffrey\Documents\BaiduSyncdisk\工作文件\娱美德\个人资料\AI创作图\图片.png')
w, h = img.size
print(f"Original image size: {w}x{h}")

# 根据设计图判断，图片是2x2布局
# 左上: 风铃, 右上: 花瓶, 左下: (空), 右下: 茶碗
# 实际上是左半部分风铃，右半部分上半是花瓶、下半是茶碗

# 左半部分 - 风铃
left_half = img.crop((0, 0, w//2, h))
left_half.save('public/images/about-bell.jpg', quality=95)
print("Saved: about-bell.jpg")

# 右半部分上半 - 花瓶 (拱形图)
right_half = img.crop((w//2, 0, w, h))
# 花瓶在右半部分的上半
vase_height = h // 2
vase = right_half.crop((0, 0, w//2, vase_height))
vase.save('public/images/about-vase.jpg', quality=95)
print("Saved: about-vase.jpg")

# 右半部分下半 - 茶碗
tea_bowl = right_half.crop((0, vase_height, w//2, h))
tea_bowl.save('public/images/about-teabowl.jpg', quality=95)
print("Saved: about-teabowl.jpg")

print("All images cropped successfully!")
