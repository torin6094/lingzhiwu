// 获取简书单篇文章全文
// 路由: /api/articles/:id
// 
// 抓取简书文章页，提取 article 标签内所有段落文本

export async function onRequest(context) {
  const { request, params } = context
  const id = params.id

  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  if (!id) {
    return new Response(JSON.stringify({ success: false, error: 'Missing article id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }

  try {
    const article = await fetchJianshuArticle(id)

    if (!article) {
      return new Response(JSON.stringify({ success: false, error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }

    return new Response(JSON.stringify({
      success: true,
      data: article
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}

async function fetchJianshuArticle(id) {
  const url = `https://www.jianshu.com/p/${id}`

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Referer': 'https://www.jianshu.com/'
    }
  })

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`)
  }

  const html = await response.text()

  // 提取文章标题
  let title = ''
  const titleMatch = html.match(/<title>([^<]+)<\/title>/)
  if (titleMatch) {
    title = titleMatch[1].replace(/\s*-\s*简书\s*$/, '').trim()
  }

  // 提取 <article> 标签内的段落文本
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)
  if (!articleMatch) {
    return { id, title, content: '无法提取文章内容' }
  }

  const articleHtml = articleMatch[1]

  // 提取所有段落文本，智能识别标题
  const items = []
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g
  let match
  while ((match = pRegex.exec(articleHtml)) !== null) {
    const raw = match[1]
    // 检查是否包含 strong/b 标签（简书作者偶尔用）
    const hasBold = /<(strong|b)[^>]*>/i.test(raw)
    const text = cleanHtml(raw)
    if (text.length > 0) {
      const type = detectType(text, hasBold)
      items.push({ type, text })
    }
  }

  // 提取纯文本段落（兼容旧格式）
  const paragraphs = items.map(i => i.text)

  return {
    id,
    title: title || '',
    content: paragraphs.join('\n\n'),
    paragraphs,
    items  // 新增：带类型的结构化数据
  }
}

// 智能检测段落类型
function detectType(text, hasBold) {
  // 规则1: 原文有 bold 标记 → 标题
  if (hasBold) return 'heading'

  // 规则2: 短段落（≤18字符）且不以常规标点结尾 → 标题
  const sentenceEndings = /[。！？…，、》」』）\)]$/
  if (text.length <= 18 && !sentenceEndings.test(text)) {
    // 排除一些误判：纯引用语、纯对话
    if (/^[""''「『]/.test(text)) return 'text'
    return 'heading'
  }

  // 规则3: 以特殊格式开头（如"XX曰："、"史书记载："）
  if (/^.{1,6}[：:]\s*$/.test(text) && text.length <= 12) {
    return 'heading'
  }

  return 'text'
}

function cleanHtml(str) {
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .trim()
}
