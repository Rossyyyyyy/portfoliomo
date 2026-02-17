import React, { useState } from 'react'
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Simulate subscription
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Stay Updated! 📬</h3>
            <p>Get notified about new projects and tech articles</p>
          </div>
          
          {!subscribed ? (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                <FaPaperPlane /> Subscribe
              </button>
            </form>
          ) : (
            <div className="newsletter-success">
              <FaCheckCircle /> Thanks for subscribing!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
