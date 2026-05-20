// Cloudflare Worker - 读取 Cloudinary 图片列表
// 使用 asset_folder 字段正确识别 portfolio 文件夹内的图片

const CLOUD_NAME = 'duejkhf4j';
const API_KEY = '785871784143326';
const API_SECRET = 'qisxRyAG97kSk9FqcMWQIyqjoqg';
const TARGET_FOLDER = 'portfolio';

export default {
  async fetch(request) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    try {
      const auth = btoa(`${API_KEY}:${API_SECRET}`);
      
      // 获取所有图片（最多500张）
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?max_results=500`;
      
      const response = await fetch(url, {
        headers: { 
          'Authorization': `Basic ${auth}`, 
          'Content-Type': 'application/json' 
        }
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      
      // 过滤：asset_folder 为 "portfolio" 的图片
      // 兼容两种模式：
      // 1. Fixed 模式：public_id = "portfolio/文件名"
      // 2. Dynamic 模式：asset_folder = "portfolio", public_id = "文件名"
      const images = (data.resources || [])
        .filter(r => {
          const publicId = r.public_id || '';
          const assetFolder = r.asset_folder || '';
          
          // 判断是否在 portfolio 文件夹
          const isInPortfolio = 
            publicId.startsWith(`${TARGET_FOLDER}/`) ||  // Fixed 模式
            assetFolder === TARGET_FOLDER ||              // Dynamic 模式
            assetFolder.startsWith(`${TARGET_FOLDER}/`);  // 子文件夹
          
          return isInPortfolio;
        })
        .map((r, i) => ({
          id: String(i + 1),
          title: decodeURIComponent(r.public_id.split('/').pop() || r.public_id),
          image: r.secure_url
        }));

      return new Response(JSON.stringify(images), { headers });

    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500, headers }
      );
    }
  }
};
