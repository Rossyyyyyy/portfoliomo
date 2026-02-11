import React, { useState, useEffect, useRef } from 'react'
import { FaCode, FaProjectDiagram, FaCoffee, FaGithub } from 'react-icons/fa'
import './Stats.css'

const Stats = () => {
  const [counts, setCounts] = useState({ repos: 0, projects: 0, coffee: 0, tech: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef(null)

  const stats = [
    { icon: <FaProjectDiagram />, end: 22, label: 'GitHub Repositories', color: '#ff6b9d' },
    { icon: <FaCode />, end: 10, label: 'Projects Completed', color: '#feca57' },
    { icon: <FaCoffee />, end: 500, label: 'Cups of Coffee', color: '#a29bfe' },
    { icon: <FaGithub />, end: 8, label: 'Technologies Used', color: '#74b9ff' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [isVisible])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.end / steps
      const key = ['repos', 'projects', 'coffee', 'tech'][index]

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.end) {
          setCounts(prev => ({ ...prev, [key]: stat.end }))
          clearInterval(timer)
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }))
        }
      }, interval)
    })
  }

  return (
    <section className="stats" ref={statsRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-number" style={{ color: stat.color }}>
                {Object.values(counts)[index]}+
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
