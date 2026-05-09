import { useState, useEffect, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

interface Article {
  id: string
  title: string
  content: string
  image: string
  date: string
  link: string
}

// 默认占位文章（API失败时显示）
const fallbackArticles: Article[] = [
  {
    id: '1',
    title: '澶渊之盟',
    date: '2024.01.15',
    image: './images/articles/宋真宗.jpeg',
    content: '与辽国议和的特使出发前，宋真宗专门将他叫到跟前，说："实在不行许给那些契丹人一些钱财也无所谓，比如每年给个一百万。。。"',
    link: 'https://www.jianshu.com'
  },
  {
    id: '2',
    title: '管宁割席',
    date: '2024.01.10',
    image: './images/articles/管宁割席.jpg',
    content: '《管宁割席》是《世说新语》里非常有名的一则故事。话说东汉末年有这么两位年轻的好友，一位叫管宁一位叫华歆...',
    link: 'https://www.jianshu.com'
  },
  {
    id: '3',
    title: '清苦的范仲淹',
    date: '2024.01.05',
    image: './images/articles/范仲淹.jpeg',
    content: '范仲淹年轻时独自在南京求学，生活极其清苦，粥吃不饱，晚上被盖都不够要和衣睡觉...',
    link: 'https://www.jianshu.com'
  }
]

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取文章列表
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        
        // 调用 Cloudflare Worker API
        const response = await fetch('/api/articles')
        const data = await response.json()
        
        if (data.success && data.data && data.data.length > 0) {
          setArticles(data.data)
        } else {
          // API 返回空数据，使用占位数据
          setArticles(fallbackArticles)
        }
      } catch (err) {
        console.error('获取文章失败:', err)
        setError('获取文章失败，显示默认内容')
        setArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedArticle(null)
  }, [])

  const openArticle = (article: Article) => {
    setSelectedArticle(article)
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
  }

  const closeArticle = () => {
    setSelectedArticle(null)
    document.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
  }

  // 截取内容预览（前150字）
  const getPreviewContent = (content: string) => {
    if (!content) return ''
    const maxLength = 150
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <section className="pt-24 pb-16 px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-foreground mb-4">
            文章墙
          </h1>
          <p className="text-sm text-muted-foreground">历史人文叙事 · 叙议结合</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">加载文章中...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-4 mb-4">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Articles List */}
        {!loading && (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex gap-4 bg-white rounded-xl p-4 card-shadow cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openArticle(article)}
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={article.image || './images/articles/default.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 图片加载失败时使用默认图片
                      (e.target as HTMLImageElement).src = './images/articles/default.jpg'
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    {article.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
          onClick={closeArticle}
        >
          <div
            className="bg-[#F5F0E8] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Article Header Image */}
            <div className="relative">
              <img
                src={selectedArticle.image || './images/articles/default.jpg'}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-t-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './images/articles/default.jpg'
                }}
              />
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors"
                onClick={closeArticle}
              >
                ✕
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 lg:p-8">
              <h2 className="text-2xl font-serif font-medium text-foreground mb-2">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-muted-foreground mb-6">{selectedArticle.date}</p>
              
              {/* 内容预览 */}
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-foreground/80 leading-relaxed mb-4 indent-8">
                  {getPreviewContent(selectedArticle.content)}
                </p>
              </div>

              {/* 查看完整文章链接 */}
              <div className="mt-6 pt-4 border-t border-foreground/10">
                <a
                  href={selectedArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  【看完整文章】
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
