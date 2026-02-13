import React, { useState } from 'react'
import { FaGraduationCap, FaLaptopCode, FaRocket, FaStar, FaChevronDown, FaChevronUp, FaCode } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const timeline = [
    {
      year: '2020',
      title: 'Started Programming',
      description: 'Began my programming journey learning C++ language. First steps into the world of coding and problem-solving.',
      icon: <FaGraduationCap />,
      color: '#4ECDC4'
    },
    {
      year: '2022',
      title: 'Visual Basic .NET',
      description: 'Started learning Visual Basic .NET. Created file handling systems and a phone shop inventory with Access database.',
      icon: <FaLaptopCode />,
      color: '#4ECDC4'
    },
    {
      year: '2023',
      title: 'Multiple Languages',
      description: 'Expanded skills to PHP, Java, and Python. Built various projects and strengthened programming fundamentals.',
      icon: <FaCode />,
      color: '#4ECDC4'
    },
    {
      year: '2024',
      title: 'Web Development',
      description: 'Dove into web development with HTML & CSS. Built school websites, inventory systems, and email phishing detection tool.',
      icon: <FaLaptopCode />,
      color: '#4ECDC4'
    },
    {
      year: '2025',
      title: 'IoT & Hardware',
      description: 'Exploring IoT with Arduino and Raspberry Pi. Building SingKarga charging station system combining software and hardware.',
      icon: <FaRocket />,
      color: '#4ECDC4'
    },
    {
      year: '2026',
      title: 'Current Learning',
      description: 'Learning more languages for website and app development. Expanding database knowledge and exploring modern frameworks as a student.',
      icon: <FaStar />,
      color: '#4ECDC4'
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
