import { Sparkles, Heart, Lightbulb, Leaf, Mail, MapPin } from 'lucide-react'

const philosophies = [
  {
    icon: Sparkles,
    title: '东方美学',
    subtitle: '传承千年文化精髓'
  },
  {
    icon: Heart,
    title: '匠心精神',
    subtitle: '专注细节与品质'
  },
  {
    icon: Lightbulb,
    title: '创新表达',
    subtitle: '现代设计语言'
  },
  {
    icon: Leaf,
    title: '生活美学',
    subtitle: '融入日常生活'
  }
]

export function AboutPage() {
  return (
    <section className="pt-24 pb-16 px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-foreground mb-4">
            关于泠之屋
          </h1>
          <p className="text-sm text-muted-foreground">文创设计工作室</p>
        </div>

        {/* Brand Story */}
        <div className="bg-white rounded-2xl p-8 card-shadow mb-12">
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            泠之屋是一个专注于东方美学与现代设计融合的文创工作室。
            我们相信，好的设计不仅是视觉的呈现，更是文化与情感的传递。
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            从产品创作到空间美学，从品牌视觉到文化策展，
            我们致力于用设计连接过去与未来，
            让传统文化在现代生活中焕发新的生命力。
          </p>
        </div>

        {/* Philosophy */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-serif font-medium text-foreground">
            我们的理念
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {philosophies.map((item, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#F5F0E8] flex items-center justify-center">
                <item.icon className="w-6 h-6 text-[#A67B5B]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info - 底部简洁展示 */}
        <div className="bg-white rounded-2xl p-8 card-shadow">
          <h2 className="text-xl font-serif font-medium text-foreground mb-6 text-center">
            联系方式
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#A67B5B]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">邮箱</p>
                <p className="text-sm text-foreground">jin6094@qq.com</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border/30" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#A67B5B]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">所在地</p>
                <p className="text-sm text-foreground">中国 · 上海</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
