#!/usr/bin/env python3
"""
Cloudinary 图片上传工具
使用方法:
1. 安装依赖: pip install cloudinary
2. 设置环境变量:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
3. 运行: python cloudinary-upload.py
"""

import os
import cloudinary
import cloudinary.uploader
from pathlib import Path

# 配置 Cloudinary
# 请替换为你的配置，或使用环境变量
cloudinary.config(
    cloud_name='duejkhf4j',
    api_key='785871784143326',
    api_secret='qisxRyAG97kSk9FqcMWQIyqjoqg'
)

def upload_image(file_path, folder='portfolio'):
    """上传单张图片到 Cloudinary"""
    try:
        filename = Path(file_path).stem
        result = cloudinary.uploader.upload(
            file_path,
            folder=folder,
            public_id=filename,
            overwrite=True,
            resource_type='image'
        )
        print(f"[OK] 上传成功: {filename}")
        print(f"     URL: {result['secure_url']}")
        return result['secure_url']
    except Exception as e:
        print(f"[ERR] 上传失败: {file_path}")
        print(f"      错误: {e}")
        return None

def batch_upload(portfolio_dir='public/images/portfolio'):
    """批量上传作品集图片"""
    portfolio_path = Path(portfolio_dir)
    if not portfolio_path.exists():
        print(f"目录不存在: {portfolio_dir}")
        return

    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    uploaded_urls = []

    print("=" * 50)
    print("开始批量上传到 Cloudinary...")
    print("=" * 50)

    for file_path in portfolio_path.iterdir():
        if file_path.suffix.lower() in image_extensions:
            url = upload_image(str(file_path))
            if url:
                uploaded_urls.append({
                    'title': file_path.stem,
                    'filename': file_path.name,
                    'url': url
                })

    print("\n" + "=" * 50)
    print(f"上传完成: {len(uploaded_urls)} / {len(list(portfolio_path.iterdir()))}")
    print("=" * 50)

    # 输出配置代码
    print("\n生成的图片配置:")
    print("-" * 50)
    print("const works = [")
    for item in uploaded_urls:
        print(f"  {{")
        print(f"    id: {uploaded_urls.index(item) + 1},")
        print(f"    title: '{item['title']}',")
        print(f"    image: '{item['url']}'")
        print(f"  }},")
    print("]")

    return uploaded_urls

if __name__ == '__main__':
    # 检查配置
    if cloudinary.config().cloud_name == 'YOUR_CLOUD_NAME':
        print("⚠️  请先配置 Cloudinary!")
        print("\n方法一: 设置环境变量")
        print("  CLOUDINARY_CLOUD_NAME=xxx")
        print("  CLOUDINARY_API_KEY=xxx")
        print("  CLOUDINARY_API_SECRET=xxx")
        print("\n方法二: 直接修改本文件第15-17行")
        exit(1)

    batch_upload()
