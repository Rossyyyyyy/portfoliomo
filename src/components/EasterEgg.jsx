import React, { useState, useEffect } from 'react'
import { FaTimes, FaRocket } from 'react-icons/fa'
import './EasterEgg.css'

const EasterEgg = () => {
  const [isActive, setIsActive] = useState(false)
  const [konamiIndex, setKonamiIndex] = useState(0)
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase()
      
      if (key === konamiCode[konamiIndex] || e.key === konamiCode[konamiIndex]) {
        setKonamiIndex(prev => prev + 1)
        
        if (konamiIndex === konamiCode.length - 1) {
          setIsActive(true)
          setKonamiIndex(0)
          
          // Unlock achievement
          const achievements = JSON.parse(localStorage.getItem('portfolio-achievements') || '[]')
          if (!achievements.includes('secret-finder')) {
            achievements.push('secret-finder')
            localStorage.setItem('portfolio-achievements', JSON.stringify(achievements))
          }
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [konamiIndex])

  if (!isActive) return null

  return (
    <div className="easter-egg-overlay">
      <div className="easter-egg-modal">
        <button className="easter-egg-close" onClick={() => setIsActive(false)}>
          <FaTimes />
        </button>
        
        <div className="easter-egg-content">
          <div className="easter-egg-icon">
            <FaRocket />
          </div>
          <h2>🎉 Konami Code Activated! 🎉</h2>
          <p>You found the secret Easter egg!</p>
          <div className="easter-egg-message">
            <p>✨ Achievement Unlocked: Secret Finder</p>
            <p>🚀 You're a true explorer!</p>
            <p>💎 Keep discovering hidden features!</p>
          </div>
          <div className="easter-egg-animation">
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EasterEgg
