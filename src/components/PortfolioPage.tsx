import { useState, useCallback } from 'react'

const works = [
  {
    id: 1,
    title: '丰子恺的画',
    image: './images/portfolio/丰子恺的画.jpg'
  },
  {
    id: 2,
    title: '泠之屋炫彩LOGO',
    image: './images/portfolio/泠之屋炫彩LOGO.png'
  },
  {
    id: 3,
    title: '猫大侠海报',
    image: './images/portfolio/猫大侠海报.png'
  },
  {
    id: 4,
    title: '毛子大侠东方版',
    image: './images/portfolio/毛子大侠东方版.png'
  },
  {
    id: 5,
    title: '涂鸦派大星',
    image: './images/portfolio/涂鸦派大星.jpg'
  },
  {
    id: 6,
    title: '中国风俩臭猫',
    image: './images/portfolio/中国风俩臭猫.png'
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
