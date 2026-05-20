#!/usr/bin/env python3
"""列出 Cloudinary portfolio 文件夹中的所有图片"""

import cloudinary
import cloudinary.api

cloudinary.config(
    cloud_name='duejkhf4j',
    api_key='785871784143326',
    api_secret='qisxRyAG97kSk9FqcMWQIyqjoqg'
)

try:
    result = cloudinary.api.resources(
        type="upload",
        prefix="portfolio/",
        max_results=100
    )
    
    print("Cloudinary portfolio 文件夹中的图片:")
    print("=" * 60)
    
    for resource in result.get('resources', []):
        filename = resource['public_id'].replace('portfolio/', '')
        url = resource['secure_url']
        print(f"\n文件名: {filename}")
        print(f"URL: {url}")
    
    print(f"\n{'=' * 60}")
    print(f"总计: {len(result.get('resources', []))} 张图片")
    
except Exception as e:
    print(f"获取失败: {e}")
