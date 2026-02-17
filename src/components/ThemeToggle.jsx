import React from 'react'
import { FaGamepad, FaPalette } from 'react-icons/fa'
import './ThemeToggle.css'

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === 'arcade' ? 'modern' : 'arcade'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('portfolio-theme', newTheme)
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'arcade' ? <FaPalette /> : <FaGamepad />}
      <span className="theme-label">{theme === 'arcade' ? 'Modern' : 'Arcade'}</span>
    </button>
  )
}

export default ThemeToggle
