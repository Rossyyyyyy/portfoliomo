import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Terminal from './components/Terminal'
import ThemeToggle from './components/ThemeToggle'
import ParticleBackground from './components/ParticleBackground'
import GameHub from './components/GameHub'
import FloatingMenu from './components/FloatingMenu'
import ScrollProgress from './components/ScrollProgress'
import EasterEgg from './components/EasterEgg'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [gameOpen, setGameOpen] = React.useState(false)
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('portfolio-theme') || 'arcade'
  })

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  React.useEffect(() => {
    const handleOpenGame = () => setGameOpen(true)
    const handleToggleTheme = () => {
      const newTheme = theme === 'arcade' ? 'modern' : 'arcade'
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('portfolio-theme', newTheme)
    }

    window.addEventListener('openGame', handleOpenGame)
    window.addEventListener('toggleTheme', handleToggleTheme)

    return () => {
      window.removeEventListener('openGame', handleOpenGame)
      window.removeEventListener('toggleTheme', handleToggleTheme)
    }
  }, [theme])

  return (
    <div className={`App ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <ScrollProgress />
      <ParticleBackground />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Newsletter />
      <Contact />
      <Footer />
      <Terminal />
      <FloatingMenu onOpenGame={() => setGameOpen(true)} />
      <GameHub isOpen={gameOpen} onClose={() => setGameOpen(false)} />
      <EasterEgg />
    </div>
  )
}

export default App
