import React, { useState, useEffect } from 'react'
import { FaTrophy, FaStar, FaFire, FaCode, FaRocket, FaGem, FaLock } from 'react-icons/fa'
import './Achievements.css'

const Achievements = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('portfolio-achievements')
    return saved ? JSON.parse(saved) : []
  })

  const achievements = [
    {
      id: 'visitor',
      title: 'First Visit',
      description: 'Visited the portfolio',
      icon: <FaStar />,
      color: '#FFD700',
      unlocked: true
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Viewed all sections',
      icon: <FaRocket />,
      color: '#4ECDC4',
      unlocked: unlockedAchievements.includes('explorer')
    },
    {
      id: 'terminal-master',
      title: 'Terminal Master',
      description: 'Used 5 terminal commands',
      icon: <FaCode />,
      color: '#00D9FF',
      unlocked: unlockedAchievements.includes('terminal-master')
    },
    {
      id: 'theme-switcher',
      title: 'Theme Switcher',
      description: 'Changed themes 3 times',
      icon: <FaGem />,
      color: '#FF6B9D',
      unlocked: unlockedAchievements.includes('theme-switcher')
    },
    {
      id: 'gamer',
      title: 'Gamer',
      description: 'Played Snake game',
      icon: <FaFire />,
      color: '#FF6B6B',
      unlocked: unlockedAchievements.includes('gamer')
    },
    {
      id: 'high-scorer',
      title: 'High Scorer',
      description: 'Score 50+ in Snake',
      icon: <FaTrophy />,
      color: '#FFD700',
      unlocked: unlockedAchievements.includes('high-scorer')
    }
  ]

  useEffect(() => {
    // Auto-unlock visitor achievement
    if (!unlockedAchievements.includes('visitor')) {
      const newAchievements = [...unlockedAchievements, 'visitor']
      setUnlockedAchievements(newAchievements)
      localStorage.setItem('portfolio-achievements', JSON.stringify(newAchievements))
    }
  }, [])

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <h2 className="section-title">Achievements</h2>
        <p className="achievements-subtitle">
          Unlock achievements by exploring the portfolio • {unlockedCount}/{totalCount} Unlocked
        </p>
        
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div 
                className="achievement-icon"
                style={{ color: achievement.unlocked ? achievement.color : '#666' }}
              >
                {achievement.unlocked ? achievement.icon : <FaLock />}
              </div>
              <h3>{achievement.unlocked ? achievement.title : '???'}</h3>
              <p>{achievement.unlocked ? achievement.description : 'Locked'}</p>
              {achievement.unlocked && (
                <div className="achievement-badge">
                  <FaStar /> Unlocked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
