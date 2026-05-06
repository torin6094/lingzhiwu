// Cloudflare Worker - 天气 API 代理
// 部署后与前端同域名，解决 CORS 问题

export async function onRequest(context) {
  const { request, env } = context;
  
  // 只允许 GET 请求
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  // 从 URL 获取参数
  const url = new URL(request.url);
  const location = url.searchParams.get('location') || '101020100'; // 默认上海
  
  // 从环境变量读取 API Key（在 Cloudflare Dashboard 中设置）
  const key = env.WEATHER_API_KEY;
  
  if (!key) {
    return new Response(JSON.stringify({ 
      code: '400', 
      message: 'Missing API key' 
    }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  try {
    // 调用和风天气 API
    const apiUrl = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${key}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    const data = await response.json();
    
    // 返回数据给前端
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300' // 缓存5分钟
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      code: '500', 
      message: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
