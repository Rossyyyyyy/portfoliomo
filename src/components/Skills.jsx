import React from 'react'
import './Skills.css'

const Skills = () => {
  const skills = [
    {
      title: 'Programming Languages',
      items: 'JavaScript, PHP, Java, Python, C++'
    },
    {
      title: 'Frontend Development',
      items: 'React, React Native, HTML, CSS'
    },
    {
      title: 'Backend Development',
      items: 'Laravel, Node.js, PHP'
    },
    {
      title: 'Database',
      items: 'MongoDB, MySQL, PostgreSQL'
    },
    {
      title: 'Full-Stack Development',
      items: 'MERN Stack, Laravel + React'
    },
    {
      title: 'Mobile Development',
      items: 'React Native, Cross-platform Apps'
    }
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill.title}</h3>
              <p>{skill.items}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
