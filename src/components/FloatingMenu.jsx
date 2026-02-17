import React, { useState } from 'react'
import { FaGamepad, FaTrophy, FaRocket, FaPlus, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import './FloatingMenu.css'

const FloatingMenu = ({ onOpenGame }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      icon: <FaGamepad />,
      label: 'Game Hub',
      action: () => {
        onOpenGame()
        setIsOpen(false)
      },
      color: '#4ECDC4'
    },
    {
      icon: <FaTrophy />,
      label: 'Achievements',
      action: () => {
        document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
      },
      color: '#FFD700'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      action: () => {
        window.open('https://github.com/Rossyyyyyy', '_blank')
        setIsOpen(false)
      },
      color: '#fff'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      action: () => {
        window.open('https://www.linkedin.com/in/roschel-mae-ano-os-800324368/', '_blank')
        setIsOpen(false)
      },
      color: '#0077B5'
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      action: () => {
        window.location.href = 'mailto:roschelmaeanoos@gmail.com'
        setIsOpen(false)
      },
      color: '#FF6B9D'
    }
  ]

  return (
    <div className="floating-menu">
      <button 
        className={`floating-menu-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaRocket />}
      </button>

      {isOpen && (
        <div className="floating-menu-items">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="floating-menu-item"
              onClick={item.action}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                '--item-color': item.color
              }}
              title={item.label}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FloatingMenu
