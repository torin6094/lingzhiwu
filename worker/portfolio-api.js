// Cloudflare Worker - 获取 Cloudinary 图片列表
// 部署后访问: https://your-worker.your-subdomain.workers.dev

const CLOUDINARY_CLOUD_NAME = 'duejkhf4j';
const CLOUDINARY_API_KEY = '785871784143326';
const CLOUDINARY_API_SECRET = 'qisxRyAG97kSk9FqcMWQIyqjoqg';
const FOLDER = 'portfolio';

// 生成 Cloudinary API 签名
async function generateSignature(timestamp) {
  const str = `folder=${FOLDER}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env, ctx) {
    // CORS 头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = await generateSignature(timestamp);

      // 调用 Cloudinary API
      const params = new URLSearchParams({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        timestamp: timestamp.toString(),
        signature: signature,
        folder: FOLDER,
        max_results: '100'
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary API error: ${response.status}`);
      }

      const data = await response.json();

      // 格式化返回数据
      const images = data.resources.map((resource, index) => ({
        id: String(index + 1),
        title: resource.public_id.split('/').pop() || '未命名',
        image: resource.secure_url
      }));

      return new Response(JSON.stringify(images), {
        headers: corsHeaders
      });

    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: corsHeaders
        }
      );
    }
  }
};
