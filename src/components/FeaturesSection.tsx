import { Sparkles, Heart, BookOpen, Leaf } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: '美学探索',
      subtitle: '发现与感知'
    },
    {
      icon: Heart,
      title: '匠心设计',
      subtitle: '极致与品质'
    },
    {
      icon: BookOpen,
      title: '文化传承',
      subtitle: '创意与价值'
    },
    {
      icon: Leaf,
      title: '生活美学',
      subtitle: '艺术与日常'
    }
  ]

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Brand Intro */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-serif font-medium text-foreground mb-4">
            泠之屋
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
            中国文创设计工作室，专注于东方美学与现代设计的融合，<br />
            用创意传递文化温度，打造有灵魂的作品。
          </p>
          <button className="btn-outline">
            了解我们
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F5F0E8] flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-[#A67B5B]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
