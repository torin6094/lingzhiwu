// 抓取简书文章列表 - 使用简书内部API
// 路由: /api/articles

const JIANSHU_USER_ID = '9aa9f349f3fb'

export async function onRequest(context) {
  const { request } = context

  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const articles = await fetchJianshuArticles()
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
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      data: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

async function fetchJianshuArticles() {
  // 方案1: 尝试简书用户文章列表 API
  try {
    const apiArticles = await fetchFromApi()
    if (apiArticles.length > 0) return apiArticles
  } catch (e) {
    console.error('API fetch failed:', e)
  }

  // 方案2: 从用户主页HTML解析
  try {
    const htmlArticles = await fetchFromHtml()
    if (htmlArticles.length > 0) return htmlArticles
  } catch (e) {
    console.error('HTML fetch failed:', e)
  }

  return []
}

// 确保每篇文章都有完整的字段
function normalizeArticle(note) {
  const id = String(note.slug || note.id || '')
  const link = `https://www.jianshu.com/p/${id}`
  return {
    id,
    title: note.title || note.screen_title || '',
    content: note.description || note.abstract || note.content || '',
    image: note.first_image_url || note.cover_image_url || note.image_url || note.list_image_url || '',
    date: formatNoteDate(note),
    link
  }
}

// 智能提取日期
function formatNoteDate(note) {
  const timestamp = note.first_shared_at || note.created_at || note.published_at || 
                    note.first_shared_time || note.share_time || note.mounted_at
  if (timestamp) {
    return formatDate(timestamp)
  }
  // 如果字段名不确定，尝试遍历常见时间字段
  for (const key of Object.keys(note)) {
    if (key.includes('time') || key.includes('date') || key.includes('at')) {
      const val = note[key]
      if (typeof val === 'number' && val > 1000000000) {
        return formatDate(val)
      }
      if (typeof val === 'string' && val.match(/^\d{4}/)) {
        return val
      }
    }
  }
  return ''
}

// 方案1: 简书内部 API
async function fetchFromApi() {
  const urls = [
    `https://www.jianshu.com/api/users/${JIANSHU_USER_ID}/notes?page=1&per_page=10&order=newest`,
    `https://www.jianshu.com/asimov/api/users/${JIANSHU_USER_ID}/notes?page=1&per_page=10&order=newest`,
  ]

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Referer': 'https://www.jianshu.com/',
    'Origin': 'https://www.jianshu.com',
    'X-Requested-With': 'XMLHttpRequest'
  }

  for (const url of urls) {
    try {
      const response = await fetch(url, { headers })
      if (response.ok) {
        const data = await response.json()
        if (data && Array.isArray(data)) {
          return data.map(normalizeArticle)
        }
      }
    } catch (e) {
      // 继续尝试下一个URL
    }
  }

  return []
}

// 方案2: 从 HTML 页面解析
async function fetchFromHtml() {
  const response = await fetch(`https://www.jianshu.com/u/${JIANSHU_USER_ID}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Referer': 'https://www.jianshu.com/'
    }
  })

  if (!response.ok) throw new Error(`HTML fetch failed: ${response.status}`)

  const html = await response.text()

  // 尝试从 window.__INITIAL_STATE__ 提取
  const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\})\s*<\/script>/)

  if (stateMatch) {
    try {
      let stateStr = stateMatch[1]
      const lastBrace = stateStr.lastIndexOf('}')
      if (lastBrace > -1) {
        stateStr = stateStr.substring(0, lastBrace + 1)
      }

      const state = JSON.parse(stateStr)

      // 尝试多种路径找到文章列表
      let notes = []
      if (state.user?.notes) {
        notes = state.user.notes
      } else if (state.entities?.notes) {
        notes = Object.values(state.entities.notes)
      } else if (state.notes) {
        notes = Array.isArray(state.notes) ? state.notes : (state.notes.list || [])
      } else if (state.entities?.users?.[JIANSHU_USER_ID]?.notes) {
        notes = state.entities.users[JIANSHU_USER_ID].notes
      }

      if (Array.isArray(notes) && notes.length > 0) {
        return notes.slice(0, 10).map(normalizeArticle)
      }
    } catch (e) {
      console.error('Failed to parse INITIAL_STATE:', e.message)
    }
  }

  // 备用: 从 HTML 正则解析
  return parseHtmlArticles(html)
}

// 从 HTML 正则解析文章
function parseHtmlArticles(html) {
  const articles = []

  const noteListMatch = html.match(/<ul class="note-list"[^>]*>([\s\S]*?)<\/ul>/)
  if (!noteListMatch) return articles

  const noteListHtml = noteListMatch[1]
  const items = noteListHtml.match(/<li[^>]*>[\s\S]*?<\/li>/g) || []

  for (const item of items.slice(0, 10)) {
    const titleMatch = item.match(/<a[^>]*class="title"[^>]*>([\s\S]*?)<\/a>/)
    const linkMatch = item.match(/<a[^>]*class="title"[^>]*href="([^"]+)"/)
    const abstractMatch = item.match(/<p[^>]*class="abstract"[^>]*>([\s\S]*?)<\/p>/)
    const timeMatch = item.match(/<span[^>]*class="time"[^>]*data-shared-at="([^"]+)"/) ||
                      item.match(/<span[^>]*class="time"[^>]*>([\s\S]*?)<\/span>/)

    // 尝试多种方式提取图片
    let image = ''
    const imgMatch = item.match(/<img[^>]*src="([^"]+)"[^>]*>/) ||
                     item.match(/<img[^>]*data-src="([^"]+)"[^>]*>/) ||
                     item.match(/<img[^>]*data-original-src="([^"]+)"[^>]*>/)
    if (imgMatch) {
      image = imgMatch[1]
      if (image && !image.startsWith('http')) {
        image = `https:${image}`
      }
    }

    if (!image) {
      const bgMatch = item.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/)
      if (bgMatch) {
        image = bgMatch[1]
        if (image && !image.startsWith('http')) {
          image = `https:${image}`
        }
      }
    }

    const title = titleMatch ? cleanHtml(titleMatch[1]) : ''
    const link = linkMatch ? `https://www.jianshu.com${linkMatch[1]}` : ''

    if (title && link) {
      const slug = link.split('/').pop() || ''
      let date = ''
      if (timeMatch) {
        const raw = timeMatch[1]
        date = raw.match(/^\d/) ? formatDate(Number(raw)) : cleanHtml(raw)
      }

      articles.push({
        id: slug,
        title,
        content: abstractMatch ? cleanHtml(abstractMatch[1]) : '',
        image,
        date,
        link
      })
    }
  }

  return articles
}

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

function formatDate(input) {
  if (!input) return ''
  const date = new Date(input)
  if (isNaN(date.getTime())) return String(input)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}
