import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = {
    main: [
      { label: '首页', href: '#' },
      { label: '作品集', href: '#' },
      { label: '文章墙', href: '#' },
      { label: '关于我们', href: '#' }
    ],
    portfolio: [
      { label: '文创产品', href: '#' },
      { label: '视觉设计', href: '#' },
      { label: '空间美学', href: '#' },
      { label: '摄影作品', href: '#' }
    ],
    articles: [
      { label: '设计思考', href: '#' },
      { label: '文化探寻', href: '#' },
      { label: '生活美学', href: '#' },
      { label: '工作记录', href: '#' }
    ]
  }

  return (
    <footer className="bg-white border-t border-border/30 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Logo & Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#A67B5B] flex items-center justify-center">
                <span className="text-white text-xs font-serif">泠</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-serif font-medium">泠之屋</span>
                <span className="text-[10px] text-muted-foreground tracking-wider">LINGZHIWU</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              文创设计 · 美学生活 · 东方意境
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium text-foreground mb-3">导航</p>
            <ul className="space-y-2">
              {navLinks.main.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <p className="text-xs font-medium text-foreground mb-3">作品集</p>
            <ul className="space-y-2">
              {navLinks.portfolio.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Articles */}
          <div>
            <p className="text-xs font-medium text-foreground mb-3">文章墙</p>
            <ul className="space-y-2">
              {navLinks.articles.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium text-foreground mb-3">联系我们</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3 h-3" />
                hello@lingzhiwu.com
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                +86 188 8888 8888
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                中国 · 杭州
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-6 h-6 rounded-full bg-[#F5F0E8] flex items-center justify-center hover:bg-[#A67B5B] hover:text-white transition-colors">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
                </svg>
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-[#F5F0E8] flex items-center justify-center hover:bg-[#A67B5B] hover:text-white transition-colors">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443z"/>
                </svg>
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-[#F5F0E8] flex items-center justify-center hover:bg-[#A67B5B] hover:text-white transition-colors">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} 泠之屋文创工作室 版权所有 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
