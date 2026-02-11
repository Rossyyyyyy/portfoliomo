import React from 'react'
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
          <a href="mailto:your.email@example.com" className="contact-btn">Email Me</a>
          <a href="https://github.com/yourusername" className="contact-btn">GitHub</a>
          <a href="https://linkedin.com/in/yourusername" className="contact-btn">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}

export default Contact
