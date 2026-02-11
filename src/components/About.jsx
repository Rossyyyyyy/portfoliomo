import React from 'react'
import { FaLightbulb, FaRocket, FaBullseye } from 'react-icons/fa'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-card">
            <div className="about-icon"><FaLightbulb /></div>
            <h3>Who I Am</h3>
            <p className="about-text">
              I'm an IT student with a passion for full-stack development. I love working with 
              MongoDB and building complete applications from front-end to back-end.
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon"><FaRocket /></div>
            <h3>What I Do</h3>
            <p className="about-text">
              With experience in React, React Native, and Laravel, I create responsive web 
              and mobile applications that solve real-world problems.
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon"><FaBullseye /></div>
            <h3>My Goal</h3>
            <p className="about-text">
              I'm constantly exploring new technologies and enjoy solving complex problems. 
              My goal is to create impactful solutions that make a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
