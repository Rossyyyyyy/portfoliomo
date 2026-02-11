import React from 'react'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'Project 1',
      description: 'Description of your first project. What technologies did you use? What problem does it solve?',
      link: '#'
    },
    {
      title: 'Project 2',
      description: 'Description of your second project. Highlight the key features and your role in development.',
      link: '#'
    },
    {
      title: 'Project 3',
      description: 'Description of your third project. Mention any challenges you overcame or lessons learned.',
      link: '#'
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="project-link">View Project →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
