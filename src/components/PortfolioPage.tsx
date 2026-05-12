import { useState, useCallback, useEffect } from 'react'

interface CloudinaryImage {
  id: string
  title: string
  image: string
}

// Cloudinary 配置
const CLOUDINARY_CLOUD_NAME = 'duejkhf4j'
const CLOUDINARY_FOLDER = 'portfolio'

// Worker API 地址
const WORKER_API_URL = 'https://lingzhiwu-api.jinchunji.workers.dev'

// 从 Worker 获取图片列表
async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  try {
    const response = await fetch(WORKER_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // 检查返回数据格式
    if (!Array.isArray(data)) {
      console.error('API 返回格式错误:', data)
      return []
    }
    
    return data
  } catch (error) {
    console.error('获取图片失败:', error)
    return []
  }
}

export function PortfolioPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 加载图片
  useEffect(() => {
    fetchCloudinaryImages().then(data => {
      setImages(data)
      setLoading(false)
    })
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedImage(null)
  }, [])

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    document.addEventListener('keydown', handleKeyDown)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.removeEventListener('keydown', handleKeyDown)
  }

  if (loading) {
    return (
      <section className="pt-24 pb-16 px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif font-medium text-foreground mb-4">作品集</h1>
            <p className="text-sm text-muted-foreground">加载中...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-24 pb-16 px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-foreground mb-4">
            作品集
          </h1>
          <p className="text-sm text-muted-foreground">
            共 {images.length} 件作品
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((work) => (
            <div
              key={work.id}
              className="group bg-white rounded-2xl overflow-hidden card-shadow cursor-pointer"
              onClick={() => openLightbox(work.image)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-foreground">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">暂无作品</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 cursor-pointer"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-light z-10"
            onClick={closeLightbox}
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="作品大图"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
