// 抓取简书文章列表
// 路由: /api/articles

export async function onRequest(context) {
  const { request } = context
  
  // 只允许 GET 请求
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // 抓取简书用户主页
    const jianshuUrl = 'https://www.jianshu.com/u/9aa9f349f3fb'
    
    const response = await fetch(jianshuUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Referer': 'https://www.jianshu.com/'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()
    
    // 解析文章列表
    const articles = parseArticles(html)
    
    // 只返回最新10条
    const latestArticles = articles.slice(0, 10)

    return new Response(JSON.stringify({
      success: true,
      data: latestArticles,
      total: latestArticles.length,
      source: 'jianshu',
      updatedAt: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600' // 缓存1小时
      }
    })

  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      data: [] // 返回空数组，前端可以显示占位内容
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// 解析 HTML 中的文章列表
function parseArticles(html) {
  const articles = []
  
  // 简书文章列表通常在 <div class="note-list"> 中
  // 每篇文章的结构:
  // <li class="have-img">
  //   <a class="wrap-img" href="/p/xxxxx"><img src="..."></a>
  //   <div class="content">
  //     <a class="title" href="/p/xxxxx">标题</a>
  //     <p class="abstract">摘要...</p>
  //     <div class="meta">
  //       <span class="time">2024.01.15</span>
  //     </div>
  //   </div>
  // </li>
  
  // 使用正则匹配文章列表
  const noteListMatch = html.match(/<ul class="note-list"[^>]*>([\s\S]*?)<\/ul>/)
  
  if (!noteListMatch) {
    // 尝试其他可能的结构
    return parseAlternativeStructure(html)
  }
  
  const noteListHtml = noteListMatch[1]
  const articleMatches = noteListHtml.match(/<li[^>]*class="[^"]*have-img[^"]*"[^>]*>[\s\S]*?<\/li>/g) || 
                         noteListHtml.match(/<li[^>]*>[\s\S]*?<\/li>/g)
  
  if (!articleMatches) {
    return parseAlternativeStructure(html)
  }
  
  for (const articleHtml of articleMatches.slice(0, 10)) {
    const article = parseArticleItem(articleHtml)
    if (article) {
      articles.push(article)
    }
  }
  
  return articles
}

// 解析单篇文章
function parseArticleItem(html) {
  // 提取标题
  const titleMatch = html.match(/<a[^>]*class="title"[^>]*>([\s\S]*?)<\/a>/)
  const title = titleMatch ? cleanHtml(titleMatch[1]) : ''
  
  // 提取链接
  const linkMatch = html.match(/<a[^>]*class="title"[^>]*href="([^"]+)"/)
  const link = linkMatch ? `https://www.jianshu.com${linkMatch[1]}` : ''
  
  // 提取摘要
  const abstractMatch = html.match(/<p[^>]*class="abstract"[^>]*>([\s\S]*?)<\/p>/)
  const abstract = abstractMatch ? cleanHtml(abstractMatch[1]) : ''
  
  // 提取图片
  const imgMatch = html.match(/<img[^>]*src="([^"]+)"[^>]*>/)
  let image = imgMatch ? imgMatch[1] : ''
  // 处理图片 URL
  if (image && !image.startsWith('http')) {
    image = `https:${image}`
  }
  
  // 提取日期
  const timeMatch = html.match(/<span[^>]*class="time"[^>]*>([\s\S]*?)<\/span>/)
  const date = timeMatch ? cleanHtml(timeMatch[1]) : ''
  
  if (title && link) {
    return {
      id: link.split('/').pop() || String(Date.now()),
      title,
      content: abstract, // 摘要作为内容预览
      image,
      date,
      link // 简书原文链接
    }
  }
  
  return null
}

// 备用解析方案 - 尝试从页面脚本中提取
function parseAlternativeStructure(html) {
  const articles = []
  
  // 尝试从 window.__INITIAL_STATE__ 中提取
  const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({[\s\S]*?});/)
  
  if (stateMatch) {
    try {
      const state = JSON.parse(stateMatch[1])
      const notes = state.notes?.list || state.user?.notes || []
      
      for (const note of notes.slice(0, 10)) {
        articles.push({
          id: String(note.id || note.slug),
          title: note.title || '',
          content: note.content || note.abstract || '',
          image: note.first_image || note.cover_image || '',
          date: formatDate(note.first_shared_at || note.published_at),
          link: `https://www.jianshu.com/p/${note.slug || note.id}`
        })
      }
    } catch (e) {
      console.error('Failed to parse initial state:', e)
    }
  }
  
  return articles
}

// 清理 HTML 标签
function cleanHtml(str) {
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim()
}

// 格式化日期
function formatDate(timestamp) {
  if (!timestamp) return ''
  
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return timestamp
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}.${month}.${day}`
}
