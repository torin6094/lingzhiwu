// 图片代理 Worker - 绕过简书等平台的防盗链
// 路由: /api/proxy-image?url=<encoded_image_url>

export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)
  const imageUrl = url.searchParams.get('url')

  if (!imageUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }

  // 只允许代理已知的图片CDN域名，防止被滥用
  const allowedHosts = [
    'upload-images.jianshu.io',
    'cdn2.jianshu.io',
    'upload.jianshu.io',
  ]

  let parsedUrl
  try {
    parsedUrl = new URL(imageUrl)
  } catch {
    return new Response('Invalid URL', { status: 400 })
  }

  if (!allowedHosts.includes(parsedUrl.hostname)) {
    return new Response('Host not allowed', { status: 403 })
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.jianshu.com/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      }
    })

    if (!response.ok) {
      return new Response(`Upstream failed: ${response.status}`, { status: response.status })
    }

    const contentType = response.headers.get('Content-Type') || 'image/jpeg'
    const imageBuffer = await response.arrayBuffer()

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // 缓存24小时
        'Access-Control-Allow-Origin': '*',
      }
    })
  } catch (error) {
    return new Response(`Proxy error: ${error.message}`, { status: 502 })
  }
}
