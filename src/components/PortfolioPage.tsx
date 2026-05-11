import { useState, useCallback } from 'react'

const works = [
  {
    id: 1,
    title: '丰子恺的画',
    image: 'https://res.cloudinary.com/duejkhf4j/image/upload/v1778470017/portfolio/%E4%B8%B0%E5%AD%90%E6%81%BA%E7%9A%84%E7%94%BB.jpg'
  },
  {
    id: 2,
    title: '泠之屋炫彩LOGO',
    image: 'https://res.cloudinary.com/duejkhf4j/image/upload/v1778470020/portfolio/%E6%B3%A0%E4%B9%8B%E5%B1%8B%E7%82%AB%E5%BD%A9LOGO.png'
  },
  {
    id: 3,
    title: '猫大侠海报',
    image: 'https://res.cloudinary.com/duejkhf4j/image/upload/v1778470022/portfolio/%E7%8C%AB%E5%A4%A7%E4%BE%A0%E6%B5%B7%E6%8A%A5.png'
  },
  {
    id: 4,
    title: '毛子大侠东方版',
    image: 'https://res.cloudinary.com/duejkhf4j/image/upload/v1778470018/portfolio/%E6%AF%9B%E5%AD%90%E5%A4%A7%E4%BE%A0%E4%B8%9C%E6%96%B9%E7%89%88.png'
  },
  {
    id: 5,
    title: '涂鸦派大星',
    image: 'https://res.cloudinary.com/duejkhf4j/image/upload/v1778470020/portfolio/%E6%B6%82%E9%B8%A6%E6%B4%BE%E5%A4%A7%E6%98%9F.jpg'
  },
  {
    id: 6,
    title: '中国风俩臭猫',
    image: 'https://res.cloudinary.com/duejkhf4j/image/upload/v1778470001/portfolio/%E4%B8%AD%E5%9B%BD%E9%A3%8E%E4%BF%A9%E8%87%AD%E7%8C%AB.png'
  },
  {
    id: 7,
    title: '阳台上的两只猫',
    image: 'https://res.cloudinary.com/duejkhf4j/image/upload/v1778470387/%E9%98%B3%E5%8F%B0%E4%B8%8A%E7%9A%84%E4%B8%A4%E5%8F%AA%E7%8C%AB.jpg'
  }
]

export function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

  return (
    <section className="pt-24 pb-16 px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-foreground mb-4">
            作品集
          </h1>
          <p className="text-sm text-muted-foreground">记录创作的每一个瞬间</p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
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
