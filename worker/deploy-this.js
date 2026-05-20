// Cloudflare Worker - 读取 Cloudinary 图片列表
const CLOUD_NAME = 'duejkhf4j';
const API_KEY = '785871784143326';
const API_SECRET = 'qisxRyAG97kSk9FqcMWQIyqjoqg';
const FOLDER = 'portfolio';

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
      
      // 获取 portfolio 文件夹下的所有图片
      const portfolioUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?prefix=${FOLDER}/&max_results=100`;
      
      // 获取根目录下的"阳台上的两只猫"
      const balconyCatUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?public_ids[]=阳台上的两只猫`;
      
      // 并行请求
      const [portfolioRes, balconyCatRes] = await Promise.all([
        fetch(portfolioUrl, {
          headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' }
        }),
        fetch(balconyCatUrl, {
          headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' }
        })
      ]);

      if (!portfolioRes.ok) {
        throw new Error(await portfolioRes.text());
      }

      const portfolioData = await portfolioRes.json();
      const balconyCatData = balconyCatRes.ok ? await balconyCatRes.json() : { resources: [] };
      
      // 合并所有图片
      const allResources = [
        ...(portfolioData.resources || []),
        ...(balconyCatData.resources || [])
      ];
      
      // 格式化数据
      const images = allResources
        .filter(r => r && r.public_id)
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
