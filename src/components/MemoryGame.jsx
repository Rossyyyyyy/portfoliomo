import React, { useState, useEffect, useCallback } from 'react'
import { FaTimes, FaRedo, FaTrophy, FaPlay } from 'react-icons/fa'
import './MemoryGame.css'

const MemoryGame = ({ isOpen, onClose }) => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [username, setUsername] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺']

  // Fetch leaderboard from API
  const fetchLeaderboard = useCallback(async () => {
    setIsLoadingLeaderboard(true)
    try {
      const response = await fetch('/api/memory-leaderboard')
      const data = await response.json()
      if (data.success) {
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setIsLoadingLeaderboard(false)
    }
  }, [])

  // Load leaderboard when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard()
    }
  }, [isOpen, fetchLeaderboard])

  // Save score to API
  const saveScore = useCallback(async (playerName, playerMoves, playerTime) => {
    try {
      const response = await fetch('/api/memory-leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: playerName,
          moves: playerMoves,
          time: playerTime
        })
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchLeaderboard()
      }
    } catch (error) {
      console.error('Failed to save score:', error)
    }
  }, [fetchLeaderboard])

  const initializeGame = useCallback(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false }))
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setTime(0)
    setGameOver(false)
    setIsRunning(true)
  }, [])

  useEffect(() => {
    let interval
    if (isRunning && !gameOver) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, gameOver])

  useEffect(() => {
    if (matched.length === emojis.length * 2 && gameStarted) {
      setGameOver(true)
      setIsRunning(false)
      if (currentUser) {
        saveScore(currentUser, moves, time)
      }
    }
  }, [matched, gameStarted, currentUser, moves, time, saveScore])

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1)
      const [first, second] = newFlipped
      const firstCard = cards.find(c => c.id === first)
      const secondCard = cards.find(c => c.id === second)

      if (firstCard.emoji === secondCard.emoji) {
        setMatched([...matched, first, second])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  const handleUsernameSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      // Check if username already exists in leaderboard
      const usernameExists = leaderboard.some(
        entry => entry.username.toLowerCase() === username.trim().toLowerCase()
      )
      
      if (usernameExists) {
        alert('⚠️ Username already taken!\n\nThis username is already in the leaderboard. Please choose a different username to play.')
        return
      }
      
      setCurrentUser(username.trim())
      setGameStarted(true)
      initializeGame()
    }
  }

  const resetGame = () => {
    initializeGame()
  }

  const exitToMenu = () => {
    setGameStarted(false)
    setCurrentUser(null)
    setUsername('')
    setIsRunning(false)
    setShowLeaderboard(false)
    fetchLeaderboard()
  }

  if (!isOpen) return null

  if (!currentUser) {
    return (
      <div className="game-modal-overlay">
        <div className="game-modal game-world-entry">
          <button onClick={onClose} className="game-close-btn">
            <FaTimes />
          </button>
          
          <div className="game-world-header">
            <h2>🎴 Memory Card Game</h2>
            <p>Match all pairs in the least moves!</p>
          </div>

          <form onSubmit={handleUsernameSubmit} className="username-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              maxLength={15}
              className="username-input"
              autoFocus
            />
            <button type="submit" className="game-btn" disabled={!username.trim()}>
              <FaPlay /> Start Game
            </button>
          </form>

          <button 
            onClick={() => setShowLeaderboard(!showLeaderboard)} 
            className="game-btn-small"
            style={{ marginTop: '1rem' }}
          >
            <FaTrophy /> {showLeaderboard ? 'Hide' : 'View'} Leaderboard
          </button>

          {showLeaderboard && (
            <div className="leaderboard">
              <h3>🏆 Top Players</h3>
              {isLoadingLeaderboard ? (
                <p className="loading-text">Loading leaderboard...</p>
              ) : leaderboard.length === 0 ? (
                <p className="no-scores">No scores yet. Be the first!</p>
              ) : (
                <div className="leaderboard-list">
                  {leaderboard.map((entry, index) => (
                    <div key={index} className={`leaderboard-item rank-${index + 1}`}>
                      <span className="rank">#{index + 1}</span>
                      <span className="player-name">{entry.username}</span>
                      <span className="player-score">{entry.moves}m / {entry.time}s</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="game-modal-overlay">
      <div className="game-modal memory-game-modal">
        <div className="game-header">
          <div>
            <h3>🎴 Memory Cards</h3>
            <p className="player-tag">Player: {currentUser}</p>
          </div>
          <button onClick={onClose} className="game-close-btn">
            <FaTimes />
          </button>
        </div>

        <div className="game-stats">
          <div className="stat">Moves: {moves}</div>
          <div className="stat">Time: {time}s</div>
          <div className="stat">Pairs: {matched.length / 2}/{emojis.length}</div>
        </div>

        <div className="memory-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`memory-card ${
                flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''
              } ${matched.includes(card.id) ? 'matched' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </div>
          ))}
        </div>

        {gameOver && (
          <div className="game-overlay">
            <h2>🎉 You Won!</h2>
            <p className="final-score">Moves: {moves}</p>
            <p className="final-score">Time: {time}s</p>
            <div className="game-over-buttons">
              <button onClick={resetGame} className="game-btn">
                <FaRedo /> Play Again
              </button>
              <button onClick={exitToMenu} className="game-btn-secondary">
                <FaTrophy /> View Leaderboard
              </button>
            </div>
          </div>
        )}

        <div className="game-controls">
          <button onClick={resetGame} className="game-btn-small">
            <FaRedo /> Restart
          </button>
          <button onClick={exitToMenu} className="game-btn-small">
            Exit to Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemoryGame
