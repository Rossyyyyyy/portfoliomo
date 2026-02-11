import React, { useState, useEffect } from 'react'
import './Hero.css'

const Hero = () => {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const roles = ['Full-Stack Developer', 'React Developer', 'Laravel Developer', 'MongoDB Expert']

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-text">
          <p className="greeting">Hello, I'm</p>
          <h1 className="hero-title">
            <span className="name">Roschel Mae E. Ano-os</span>
          </h1>
          <div className="typing-container">
            <span className="typing-text">{text}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-description">
            IT Student passionate about building amazing web and mobile applications
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="profile-circle">
            <div className="circle-content">
              <span className="emoji">👩‍💻</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll Down</p>
      </div>
    </section>
  )
}

export default Hero
