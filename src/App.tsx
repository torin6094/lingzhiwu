import { useState } from 'react'
import './App.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { PortfolioPage } from '@/components/PortfolioPage'
import { ArticlesPage } from '@/components/ArticlesPage'
import { AboutPage } from '@/components/AboutPage'

type PageType = 'home' | 'portfolio' | 'articles' | 'about'

function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'portfolio':
        return <PortfolioPage />
      case 'articles':
        return <ArticlesPage />
      case 'about':
        return <AboutPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navbar currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as PageType)} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  )
}

export default App
