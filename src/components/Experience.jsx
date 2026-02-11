import React, { useState } from 'react'
import { FaGraduationCap, FaLaptopCode, FaRocket, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const timeline = [
    {
      year: '2023',
      title: 'Started Learning',
      description: 'Began programming journey with Visual Basic .NET. Created file handling systems and a phone shop inventory with Access database.',
      icon: <FaGraduationCap />,
      color: '#4ECDC4'
    },
    {
      year: '2024',
      title: 'Web Development',
      description: 'Expanded to web technologies - PHP, JavaScript, HTML & CSS. Built school websites, inventory systems, and email phishing detection tool.',
      icon: <FaLaptopCode />,
      color: '#FFE66D'
    },
    {
      year: '2025',
      title: 'Full-Stack & Mobile',
      description: 'Learning Laravel, React, and React Native. Created SmartB barangay system, ProtectOcean app, and various e-commerce platforms.',
      icon: <FaRocket />,
      color: '#4ECDC4'
    },
    {
      year: '2026',
      title: 'Current Learning',
      description: 'Exploring IoT with Raspberry Pi. Building SingKarga charging station system and continuously learning new technologies as a student.',
      icon: <FaStar />,
      color: '#FFE66D'
    }
  ]

  return (
    <section className="experience">
      <div className="container">
        <h2 className="section-title">My Journey</h2>
        <p className="experience-subtitle">Learning & Growing as a Student</p>
        
        <button 
          className="toggle-experience-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <FaChevronUp /> Hide Timeline
            </>
          ) : (
            <>
              <FaChevronDown /> Show My Learning Journey
            </>
          )}
        </button>

        {isExpanded && (
          <div className="timeline">
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="timeline-content">
                  <div className="timeline-icon">
                    {item.icon}
                  </div>
                  <div className="timeline-year">
                    {item.year}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Experience
