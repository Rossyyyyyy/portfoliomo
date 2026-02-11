import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-text">
          I'm always open to discussing new opportunities and projects.
        </p>
        <div className="contact-links">
          <a href="mailto:roschelmaeanoos@gmail.com" className="contact-btn">
            <FaEnvelope className="btn-icon" />
            Email Me
          </a>
          <a href="https://github.com/Rossyyyyyy" target="_blank" rel="noopener noreferrer" className="contact-btn">
            <FaGithub className="btn-icon" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/roschel-mae-ano-os-800324368/" target="_blank" rel="noopener noreferrer" className="contact-btn">
            <FaLinkedin className="btn-icon" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
