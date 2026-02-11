import React, { useState } from 'react'
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaBars, FaTimes, FaStar } from 'react-icons/fa'
import './Navbar.css'

const Navbar = ({ isOpen, setIsOpen }) => {
  const handleLinkClick = () => {
    if (window.innerWidth <= 968) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      <nav className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-wrapper">
            <FaStar className="logo-icon" />
            <h1 className="logo">Roschel</h1>
          </div>
        </div>
        
        <ul className="nav-links">
          <li>
            <a href="#hero" onClick={handleLinkClick}>
              <FaHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleLinkClick}>
              <FaUser className="nav-icon" />
              <span className="nav-text">About</span>
            </a>
          </li>
          <li>
            <a href="#skills" onClick={handleLinkClick}>
              <FaCode className="nav-icon" />
              <span className="nav-text">Skills</span>
            </a>
          </li>
          <li>
            <a href="#experience" onClick={handleLinkClick}>
              <FaProjectDiagram className="nav-icon" />
              <span className="nav-text">Experience</span>
            </a>
          </li>
          <li>
            <a href="#projects" onClick={handleLinkClick}>
              <FaProjectDiagram className="nav-icon" />
              <span className="nav-text">Projects</span>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleLinkClick}>
              <FaEnvelope className="nav-icon" />
              <span className="nav-text">Contact</span>
            </a>
          </li>
        </ul>

        <div className="sidebar-footer">
          <p>© 2026 Roschel</p>
        </div>
      </nav>
      
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  )
}

export default Navbar
