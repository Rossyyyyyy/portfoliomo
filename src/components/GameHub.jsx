import React, { useState } from 'react'
import { FaTimes, FaGamepad, FaCube } from 'react-icons/fa'
import { GiSnake, GiCardRandom } from 'react-icons/gi'
import SnakeGame from './SnakeGame'
import MemoryGame from './MemoryGame'
import TetrisGame from './TetrisGame'
import './GameHub.css'

const GameHub = ({ isOpen, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    {
      id: 'snake',
      name: 'Snake',
      icon: <GiSnake />,
      description: 'Classic snake game - eat food and grow!',
      color: '#4ECDC4'
    },
    {
      id: 'memory',
      name: 'Memory Cards',
      icon: <GiCardRandom />,
      description: 'Match pairs of cards to win!',
      color: '#FF6B9D'
    },
    {
      id: 'tetris',
      name: 'Block Drop',
      icon: <FaCube />,
      description: 'Stack blocks and clear lines!',
      color: '#FFD700'
    }
  ]

  if (!isOpen) return null

  if (selectedGame === 'snake') {
    return <SnakeGame isOpen={true} onClose={() => setSelectedGame(null)} />
  }

  if (selectedGame === 'memory') {
    return <MemoryGame isOpen={true} onClose={() => setSelectedGame(null)} />
  }

  if (selectedGame === 'tetris') {
    return <TetrisGame isOpen={true} onClose={() => setSelectedGame(null)} />
  }

  return (
    <div className="game-hub-overlay">
      <div className="game-hub-modal">
        <button onClick={onClose} className="game-hub-close">
          <FaTimes />
        </button>

        <div className="game-hub-header">
          <FaGamepad className="hub-icon" />
          <h2>🎮 Game World</h2>
          <p>Choose your game and compete for the top score!</p>
        </div>

        <div className="games-grid">
          {games.map((game) => (
            <button
              key={game.id}
              className="game-card"
              onClick={() => setSelectedGame(game.id)}
              style={{ '--game-color': game.color }}
            >
              <div className="game-card-icon" style={{ color: game.color }}>
                {game.icon}
              </div>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <div className="play-btn">Play Now →</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameHub
