import React, { useState, useEffect, useRef } from 'react'
import { FaPaintBrush, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaLock, FaPlug, FaPalette, FaPython, FaCode } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, SiCplusplus, SiPhp, SiDotnet } from 'react-icons/si'
import './Skills.css'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const skillsRef = useRef(null)

  const skills = [
    { name: 'HTML & CSS', percentage: 100, icon: <FaPaintBrush />, color: '#E34C26' },
    { name: 'JavaScript', percentage: 90, icon: <FaJs />, color: '#F7DF1E' },
    { name: 'PHP', percentage: 90, icon: <SiPhp />, color: '#777BB4' },
    { name: 'Python', percentage: 85, icon: <FaPython />, color: '#3776AB' },
    { name: 'TypeScript', percentage: 85, icon: <SiTypescript />, color: '#3178C6' },
    { name: 'React', percentage: 93, icon: <FaReact />, color: '#61DAFB' },
    { name: 'C++', percentage: 70, icon: <SiCplusplus />, color: '#00599C' },
    { name: 'VB.NET', percentage: 75, icon: <SiDotnet />, color: '#512BD4' },
    { name: 'Next.js', percentage: 60, icon: <SiNextdotjs />, color: '#FFFFFF' },
    { name: 'Git & GitHub', percentage: 40, icon: <FaGitAlt />, color: '#F05032' },
    { name: 'Node.js', percentage: 50, icon: <FaNodeJs />, color: '#339933' },
    { name: 'MongoDB', percentage: 90, icon: <SiMongodb />, color: '#47A248' },
    { name: 'SQL/NoSQL', percentage: 89, icon: <SiPostgresql />, color: '#4169E1' },
    { name: 'UI Design', percentage: 80, icon: <FaPalette />, color: '#FF6B9D' },
    { name: 'API Design', percentage: 50, icon: <FaPlug />, color: '#FFA500' },
    { name: 'Authentication', percentage: 65, icon: <FaLock />, color: '#DC143C' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [])

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <p className="skills-subtitle">Technologies I work with</p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-header">
                <span className="skill-icon" style={{ borderColor: skill.color }}>
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                </span>
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-percentage">{skill.percentage}%</span>
                </div>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress"
                  style={{
                    width: isVisible ? `${skill.percentage}%` : '0%'
                  }}
                >
                  <span className="progress-glow"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
