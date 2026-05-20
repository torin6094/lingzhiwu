// Cloudflare Worker - 获取 Cloudinary 图片列表（修复版）
const CLOUDINARY_CLOUD_NAME = 'duejkhf4j';
const CLOUDINARY_API_KEY = '785871784143326';
const CLOUDINARY_API_SECRET = 'qisxRyAG97kSk9FqcMWQIyqjoqg';

async function generateSignature(timestamp) {
  const str = `folder=portfolio&max_results=100&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const data = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    try {
      const ts = Math.floor(Date.now() / 1000);
      const sig = await generateSignature(ts);
      
      // 使用 resources 端点获取文件夹内所有图片
      const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`;
      
      const formData = new URLSearchParams();
      formData.append('api_key', CLOUDINARY_API_KEY);
      formData.append('timestamp', ts.toString());
      formData.append('signature', sig);
      formData.append('folder', 'portfolio');
      formData.append('max_results', '100');
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }
      
      const data = await res.json();
      
      // 过滤只保留 portfolio 文件夹的图片
      const images = data.resources
        ?.filter(r => r.public_id.startsWith('portfolio/'))
        ?.map((r, i) => ({
          id: String(i + 1),
          title: r.public_id.split('/').pop(),
          image: r.secure_url
        })) || [];
      
      return new Response(JSON.stringify(images), { headers: cors });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: e.message }), 
        { status: 500, headers: cors }
      );
    }
  }
};
