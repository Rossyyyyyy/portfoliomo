import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className={`App ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
