import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FaTimes, FaRedo, FaTrophy, FaPlay, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './SnakeGame.css'

const SnakeGame = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [username, setUsername] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false)
  const gameLoopRef = useRef(null)

  const gridSize = 20
  const tileSize = 20

  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 })

  // Fetch leaderboard from API
  const fetchLeaderboard = useCallback(async () => {
    setIsLoadingLeaderboard(true)
    try {
      const response = await fetch('/api/leaderboard')
      const data = await response.json()
      if (data.success) {
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
      // Fallback to localStorage if API fails
      const savedLeaderboard = localStorage.getItem('snake-leaderboard')
      if (savedLeaderboard) {
        setLeaderboard(JSON.parse(savedLeaderboard))
      }
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
  const saveScore = useCallback(async (playerName, playerScore) => {
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: playerName,
          score: playerScore
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Refresh leaderboard after saving
        await fetchLeaderboard()
        
        // Also save to localStorage as backup
        const localLeaderboard = JSON.parse(localStorage.getItem('snake-leaderboard') || '[]')
        localLeaderboard.push({
          username: playerName,
          score: playerScore,
          date: new Date().toISOString()
        })
        localStorage.setItem('snake-leaderboard', JSON.stringify(
          localLeaderboard.sort((a, b) => b.score - a.score).slice(0, 10)
        ))
      }
    } catch (error) {
      console.error('Failed to save score:', error)
      // Fallback to localStorage if API fails
      const localLeaderboard = JSON.parse(localStorage.getItem('snake-leaderboard') || '[]')
      localLeaderboard.push({
        username: playerName,
        score: playerScore,
        date: new Date().toISOString()
      })
      const updated = localLeaderboard.sort((a, b) => b.score - a.score).slice(0, 10)
      localStorage.setItem('snake-leaderboard', JSON.stringify(updated))
      setLeaderboard(updated)
    }
  }, [fetchLeaderboard])

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
    }
  }

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    }
    setFood(newFood)
  }, [])

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }])
    setDirection({ x: 1, y: 0 })
    setNextDirection({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
    setGameStarted(true)
    generateFood()
  }, [generateFood])

  const exitToMenu = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setCurrentUser(null)
    setUsername('')
    setShowLeaderboard(false)
    fetchLeaderboard() // Refresh leaderboard when returning to menu
  }

  // Mobile touch controls
  const handleDirectionChange = (newDirection) => {
    if (gameOver || isPaused || !gameStarted) return

    const { x, y } = newDirection
    if (x !== 0 && direction.x === 0) setNextDirection(newDirection)
    if (y !== 0 && direction.y === 0) setNextDirection(newDirection)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen || gameOver || isPaused || !gameStarted) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 })
          break
        case ' ':
          setIsPaused(prev => !prev)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, direction, gameOver, isPaused, gameStarted])

  useEffect(() => {
    if (!isOpen || gameOver || isPaused || !gameStarted) return

    const gameLoop = () => {
      setDirection(nextDirection)

      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + nextDirection.x,
          y: prevSnake[0].y + nextDirection.y
        }

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize) {
          setGameOver(true)
          if (currentUser && score > 0) {
            saveScore(currentUser, score)
          }
          return prevSnake
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true)
          if (currentUser && score > 0) {
            saveScore(currentUser, score)
          }
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 10)
          generateFood()
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    gameLoopRef.current = setInterval(gameLoop, 150)
    return () => clearInterval(gameLoopRef.current)
  }, [isOpen, nextDirection, food, gameOver, isPaused, gameStarted, generateFood, currentUser, score, saveScore])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.1)'
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath()
      ctx.moveTo(i * tileSize, 0)
      ctx.lineTo(i * tileSize, gridSize * tileSize)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * tileSize)
      ctx.lineTo(gridSize * tileSize, i * tileSize)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#4ECDC4' : '#2a9d8f'
      ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize - 2, tileSize - 2)
    })

    // Draw food
    ctx.fillStyle = '#FF6B9D'
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2)
  }, [snake, food])

  if (!isOpen) return null

  // Username Entry Screen
  if (!currentUser) {
    return (
      <div className="game-modal-overlay">
        <div className="game-modal game-world-entry">
          <button onClick={onClose} className="game-close-btn">
            <FaTimes />
          </button>
          
          <div className="game-world-header">
            <h2>🎮 Welcome to Snake World</h2>
            <p>Enter your username to start playing</p>
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
              <FaPlay /> Enter Game World
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
                      <span className="player-score">{entry.score}</span>
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

  // Game Screen
  return (
    <div className="game-modal-overlay">
      <div className="game-modal">
        <div className="game-header">
          <div>
            <h3>🐍 Snake World</h3>
            <p className="player-tag">Player: {currentUser}</p>
          </div>
          <button onClick={onClose} className="game-close-btn">
            <FaTimes />
          </button>
        </div>
        
        <div className="game-stats">
          <div className="stat">Score: {score}</div>
          <div className="stat">Best: {Math.max(...leaderboard.map(e => e.score), 0)}</div>
        </div>

        <div className="game-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={gridSize * tileSize}
            height={gridSize * tileSize}
            className="game-canvas"
          />
          
          {gameOver && (
            <div className="game-overlay">
              <h2>Game Over!</h2>
              <p className="final-score">Final Score: {score}</p>
              <p className="score-saved">Score saved to leaderboard!</p>
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

          {isPaused && !gameOver && (
            <div className="game-overlay">
              <h2>Paused</h2>
              <p className="pause-hint-desktop">Press SPACE to continue</p>
              <button 
                onClick={() => setIsPaused(false)} 
                className="game-btn pause-resume-btn"
              >
                <FaPlay /> Resume Game
              </button>
            </div>
          )}

          {!gameOver && !isPaused && (
            <div className="mobile-controls">
              <button 
                className="control-btn up"
                onTouchStart={() => handleDirectionChange({ x: 0, y: -1 })}
                onClick={() => handleDirectionChange({ x: 0, y: -1 })}
              >
                <FaArrowUp />
              </button>
              <div className="control-row">
                <button 
                  className="control-btn left"
                  onTouchStart={() => handleDirectionChange({ x: -1, y: 0 })}
                  onClick={() => handleDirectionChange({ x: -1, y: 0 })}
                >
                  <FaArrowLeft />
                </button>
                <button 
                  className="control-btn pause"
                  onTouchStart={() => setIsPaused(prev => !prev)}
                  onClick={() => setIsPaused(prev => !prev)}
                >
                  ⏸
                </button>
                <button 
                  className="control-btn right"
                  onTouchStart={() => handleDirectionChange({ x: 1, y: 0 })}
                  onClick={() => handleDirectionChange({ x: 1, y: 0 })}
                >
                  <FaArrowRight />
                </button>
              </div>
              <button 
                className="control-btn down"
                onTouchStart={() => handleDirectionChange({ x: 0, y: 1 })}
                onClick={() => handleDirectionChange({ x: 0, y: 1 })}
              >
                <FaArrowDown />
              </button>
            </div>
          )}
        </div>

        <div className="game-controls">
          <p className="desktop-hint">Desktop: Arrow Keys • SPACE to pause</p>
          <p className="mobile-hint">Mobile: Use on-screen controls</p>
          <button onClick={exitToMenu} className="game-btn-small">
            Exit to Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default SnakeGame
