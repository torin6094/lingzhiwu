import { Sparkles, Heart, Lightbulb, Leaf, Target, Compass } from 'lucide-react'

const philosophies = [
  {
    icon: Sparkles,
    title: '东方美学',
    subtitle: '传承千年文化精髓',
    description: '探索东方美学的当代表达\n让美学融入日常'
  },
  {
    icon: Heart,
    title: '匠心精神',
    subtitle: '专注细节与品质',
    description: '以匠心打磨每一个细节\n用品质传递温度'
  },
  {
    icon: Lightbulb,
    title: '创新表达',
    subtitle: '现代设计语言',
    description: '打破边界与传统的界限\n创造新的可能'
  },
  {
    icon: Leaf,
    title: '生活美学',
    subtitle: '融入日常生活',
    description: '关注生活中的美好瞬间\n让设计回归生活'
  }
]

export function AboutPage() {
  return (
    <section className="pt-24 pb-16 px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section - 左右布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* 左侧文字 */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-serif font-medium text-foreground tracking-wide">
                关于泠之屋
              </h1>
              <Leaf className="w-6 h-6 text-[#A67B5B]" />
            </div>
            <p className="text-sm text-muted-foreground tracking-[0.3em] uppercase mb-8">
              ABOUT US
            </p>
            
            {/* 品牌故事 */}
            <div className="space-y-4">
              <p className="text-sm text-foreground leading-relaxed">
                泠之屋是一个专注于东方美学与现代设计融合的文创工作室。
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                我们相信，好的设计不仅是视觉的呈现，更是文化与情感的传递。
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                从产品创作到空间美学，从品牌视觉到文化策展，我们致力于<br />
                用设计连接过去与未来，让传统文化在现代生活中焕发新的生命力。
              </p>
            </div>
          </div>
          
          {/* 右侧拱形图片 */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[380px]">
              {/* 拱形边框 */}
              <div className="absolute inset-0 border-2 border-[#A67B5B]/30 rounded-t-[140px]"></div>
              {/* 图片 */}
              <div className="absolute inset-3 rounded-t-[130px] overflow-hidden">
                <img 
                  src="/images/about-vase.jpg" 
                  alt="东方美学" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section - 我们的理念 */}
        <div className="mb-20">
          {/* 标题带装饰线 */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="h-px w-16 bg-[#A67B5B]/30"></div>
            <div className="text-center">
              <h2 className="text-xl font-serif font-medium text-foreground">
                我们的理念
              </h2>
              <Leaf className="w-4 h-4 text-[#A67B5B] mx-auto mt-1" />
            </div>
            <div className="h-px w-16 bg-[#A67B5B]/30"></div>
          </div>

          {/* 四个理念卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {philosophies.map((item, index) => (
              <div key={index} className="text-center">
                {/* 图标 */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-[#A67B5B]/30 flex items-center justify-center bg-white/50">
                  <item.icon className="w-7 h-7 text-[#A67B5B]" />
                </div>
                {/* 标题 */}
                <h3 className="text-base font-medium text-foreground mb-1">
                  {item.title}
                </h3>
                {/* 副标题 */}
                <p className="text-xs text-muted-foreground mb-3">
                  {item.subtitle}
                </p>
                {/* 描述 */}
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* 左侧图片 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img 
                  src="/images/about-bell.jpg" 
                  alt="东方意境" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] rounded-lg overflow-hidden mt-8">
                <img 
                  src="/images/about-teabowl.jpg" 
                  alt="茶道美学" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* 右侧文字 */}
            <div className="space-y-8">
              {/* 愿景 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#A67B5B]/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#A67B5B]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    我们的愿景
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    让传统文化通过设计走进更多人的生活，<br />
                    在现代的语境中延续与新生。
                  </p>
                </div>
              </div>
              
              {/* 使命 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#A67B5B]/30 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#A67B5B]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    我们的使命
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    通过设计的力量，连接文化与生活，<br />
                    传递美好与温度，激发更多的共鸣与思考。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact - 底部优雅收尾 */}
        <div className="pt-10 border-t border-[#A67B5B]/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#A67B5B]" />
            </div>
            <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Contact</p>
            <a href="mailto:jin6094@qq.com" className="text-sm text-foreground hover:text-[#A67B5B] transition-colors font-serif">
              jin6094@qq.com
            </a>
            <p className="text-xs text-muted-foreground">中国 · 上海</p>
          </div>
        </div>
      </div>
    </section>
  )
}
