import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p className="about-text">
            I'm an IT student with a passion for full-stack development. I love working with 
            MongoDB and building complete applications from front-end to back-end. With experience 
            in React, React Native, and Laravel, I create responsive web and mobile applications.
          </p>
          <p className="about-text">
            I'm constantly exploring new technologies and enjoy solving complex problems through code. 
            My goal is to create impactful solutions that make a difference in people's lives.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
