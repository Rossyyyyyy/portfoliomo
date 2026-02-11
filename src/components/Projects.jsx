import React from 'react'
import { FaShoppingCart, FaCheckSquare, FaBriefcase, FaShieldAlt, FaSchool, FaBuilding, FaMobileAlt, FaChargingStation } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'ProtectOcean',
      description: 'Full-stack web and mobile app using React and React Native. Report illegal ocean activities, track trash, and protect marine life. Real-time reporting system with geolocation.',
      link: '#',
      icon: <FaMobileAlt />,
      tags: ['React', 'React Native', 'MongoDB']
    },
    {
      title: 'SmartB Barangay System',
      description: 'Digital barangay management system using PHP. Citizens can request documents online, file blotter reports, and track requests without visiting the office.',
      link: '#',
      icon: <FaBuilding />,
      tags: ['PHP', 'MySQL', 'System']
    },
    {
      title: 'SingKarga Charging Station',
      description: 'IoT charging station management system using JavaScript and Raspberry Pi. Monitor charging status, manage payments, and track usage in real-time.',
      link: '#',
      icon: <FaChargingStation />,
      tags: ['JavaScript', 'IoT', 'Hardware']
    },
    {
      title: 'Email Phishing Detector',
      description: 'JavaScript-based security tool that analyzes emails to detect phishing attempts and scam patterns. Helps users identify suspicious emails before clicking.',
      link: '#',
      icon: <FaShieldAlt />,
      tags: ['JavaScript', 'Security', 'AI']
    },
    {
      title: 'Ice Cream Shop',
      description: 'E-commerce platform built with Laravel. Features online ordering, inventory management, customer accounts, and payment integration.',
      link: '#',
      icon: <FaShoppingCart />,
      tags: ['Laravel', 'PHP', 'E-commerce']
    },
    {
      title: 'Dress Shop',
      description: 'Modern online clothing store using React and PHP. Browse collections, shopping cart, order tracking, and admin dashboard for inventory.',
      link: '#',
      icon: <FaShoppingCart />,
      tags: ['React', 'PHP', 'Shopping']
    },
    {
      title: 'School Website',
      description: 'Responsive school website built with HTML & CSS. Features announcements, faculty directory, student portal, and event calendar.',
      link: '#',
      icon: <FaSchool />,
      tags: ['HTML', 'CSS', 'Web Design']
    },
    {
      title: 'PC Inventory System',
      description: 'Desktop inventory management system using PHP. Track computer hardware, manage stock levels, generate reports, and monitor equipment.',
      link: '#',
      icon: <FaCheckSquare />,
      tags: ['PHP', 'MySQL', 'Desktop']
    },
    {
      title: 'Phone Shop System',
      description: 'Point-of-sale system built with VB.NET and Access database. Manage phone inventory, sales transactions, customer records, and generate invoices.',
      link: '#',
      icon: <FaBriefcase />,
      tags: ['VB.NET', 'Access', 'POS']
    },
    {
      title: 'File Handling System',
      description: 'Document management system using VB.NET. Organize, search, and manage files with user authentication and access control.',
      link: '#',
      icon: <FaCheckSquare />,
      tags: ['VB.NET', 'Desktop', 'Files']
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="projects-subtitle">Real-world applications I've built</p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
                <div className="project-title-wrapper">
                  <h3>{project.title}</h3>
                </div>
              </div>
              <div className="project-content">
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
