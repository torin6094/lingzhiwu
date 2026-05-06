import { useState } from 'react'
import './App.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { PortfolioPage } from '@/components/PortfolioPage'
import { ArticlesPage } from '@/components/ArticlesPage'
import { AboutPage } from '@/components/AboutPage'
import { ContactPage } from '@/components/ContactPage'

type PageType = 'home' | 'portfolio' | 'articles' | 'about' | 'contact'

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
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
      case 'contact':
        return <ContactPage />
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
