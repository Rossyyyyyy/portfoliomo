import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FaTimes, FaRedo, FaTrophy, FaPlay, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './TetrisGame.css'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]]
}

const COLORS = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000'
}

const TetrisGame = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [board, setBoard] = useState(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)))
  const [currentPiece, setCurrentPiece] = useState(null)
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const gameLoopRef = useRef(null)

  const createPiece = useCallback(() => {
    const shapes = Object.keys(SHAPES)
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
    return {
      shape: SHAPES[randomShape],
      color: COLORS[randomShape],
      type: randomShape
    }
  }, [])

  const fetchLeaderboard = useCallback(async () => {
    setIsLoadingLeaderboard(true)
    try {
      const response = await fetch('/api/tetris-leaderboard')
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

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard()
    }
  }, [isOpen, fetchLeaderboard])

  const saveScore = useCallback(async (playerName, playerScore, playerLines) => {
    try {
      const response = await fetch('/api/tetris-leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: playerName,
          score: playerScore,
          lines: playerLines
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

  const checkCollision = useCallback((piece, pos, newBoard = board) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x
          const newY = pos.y + y

          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true
          }
          if (newY >= 0 && newBoard[newY][newX]) {
            return true
          }
        }
      }
    }
    return false
  }, [board])

  const mergePiece = useCallback(() => {
    const newBoard = board.map(row => [...row])
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = currentPos.y + y
          const boardX = currentPos.x + x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color
          }
        }
      })
    })
    return newBoard
  }, [board, currentPiece, currentPos])

  const clearLines = useCallback((newBoard) => {
    let linesCleared = 0
    const clearedBoard = newBoard.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++
        return false
      }
      return true
    })

    while (clearedBoard.length < BOARD_HEIGHT) {
      clearedBoard.unshift(Array(BOARD_WIDTH).fill(0))
    }

    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared)
      setScore(prev => prev + linesCleared * 100 * linesCleared)
    }

    return clearedBoard
  }, [])

  const rotatePiece = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    )

    const rotatedPiece = { ...currentPiece, shape: rotated }

    if (!checkCollision(rotatedPiece, currentPos)) {
      setCurrentPiece(rotatedPiece)
    }
  }, [currentPiece, currentPos, checkCollision, isPaused, gameOver])

  const movePiece = useCallback((dir) => {
    if (!currentPiece || isPaused || gameOver) return

    const newPos = { ...currentPos }
    if (dir === 'left') newPos.x -= 1
    if (dir === 'right') newPos.x += 1
    if (dir === 'down') newPos.y += 1

    if (!checkCollision(currentPiece, newPos)) {
      setCurrentPos(newPos)
    } else if (dir === 'down') {
      const merged = mergePiece()
      const cleared = clearLines(merged)
      setBoard(cleared)

      const newPiece = createPiece()
      const startPos = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }

      if (checkCollision(newPiece, startPos, cleared)) {
        setGameOver(true)
        if (currentUser && score > 0) {
          saveScore(currentUser, score, lines)
        }
      } else {
        setCurrentPiece(newPiece)
        setCurrentPos(startPos)
      }
    }
  }, [currentPiece, currentPos, checkCollision, mergePiece, clearLines, createPiece, isPaused, gameOver, currentUser, score, lines, saveScore])

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') movePiece('left')
      if (e.key === 'ArrowRight') movePiece('right')
      if (e.key === 'ArrowDown') movePiece('down')
      if (e.key === 'ArrowUp' || e.key === ' ') rotatePiece()
      if (e.key === 'p') setIsPaused(prev => !prev)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [movePiece, rotatePiece, gameStarted, gameOver, isPaused])

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return

    gameLoopRef.current = setInterval(() => {
      movePiece('down')
    }, 500)

    return () => clearInterval(gameLoopRef.current)
  }, [movePiece, gameStarted, gameOver, isPaused])

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
      startGame()
    }
  }

  const startGame = () => {
    const newBoard = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0))
    setBoard(newBoard)
    const piece = createPiece()
    setCurrentPiece(piece)
    setCurrentPos({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 })
    setScore(0)
    setLines(0)
    setGameOver(false)
    setGameStarted(true)
    setIsPaused(false)
  }

  const resetGame = () => {
    startGame()
  }

  const exitToMenu = () => {
    setGameStarted(false)
    setCurrentUser(null)
    setUsername('')
    setShowLeaderboard(false)
    fetchLeaderboard()
  }

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row])

    if (currentPiece && !gameOver) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = currentPos.y + y
            const boardX = currentPos.x + x
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color
            }
          }
        })
      })
    }

    return displayBoard
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
            <h2>🧱 Block Drop</h2>
            <p>Stack blocks and clear lines!</p>
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
                      <span className="player-score">{entry.score} pts</span>
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
      <div className="game-modal tetris-modal">
        <div className="game-header">
          <div>
            <h3>🧱 Block Drop</h3>
            <p className="player-tag">Player: {currentUser}</p>
          </div>
          <button onClick={onClose} className="game-close-btn">
            <FaTimes />
          </button>
        </div>

        <div className="game-stats">
          <div className="stat">Score: {score}</div>
          <div className="stat">Lines: {lines}</div>
        </div>

        <div className="tetris-container">
          <div className="tetris-board">
            {renderBoard().map((row, y) => (
              <div key={y} className="tetris-row">
                {row.map((cell, x) => (
                  <div
                    key={`${y}-${x}`}
                    className="tetris-cell"
                    style={{
                      backgroundColor: cell || 'transparent',
                      border: cell ? '1px solid rgba(0,0,0,0.3)' : '1px solid rgba(78, 205, 196, 0.2)'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {gameOver && (
            <div className="game-overlay">
              <h2>Game Over!</h2>
              <p className="final-score">Score: {score}</p>
              <p className="final-score">Lines: {lines}</p>
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
              <p className="pause-hint-desktop">Press P to continue</p>
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
                onTouchStart={rotatePiece}
                onClick={rotatePiece}
              >
                <FaArrowUp />
              </button>
              <div className="control-row">
                <button 
                  className="control-btn left"
                  onTouchStart={() => movePiece('left')}
                  onClick={() => movePiece('left')}
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
                  onTouchStart={() => movePiece('right')}
                  onClick={() => movePiece('right')}
                >
                  <FaArrowRight />
                </button>
              </div>
              <button 
                className="control-btn down"
                onTouchStart={() => movePiece('down')}
                onClick={() => movePiece('down')}
              >
                <FaArrowDown />
              </button>
            </div>
          )}
        </div>

        <div className="game-controls">
          <p className="desktop-hint">Desktop: Arrow Keys • SPACE/↑ to rotate • P to pause</p>
          <p className="mobile-hint">Mobile: Use on-screen controls</p>
          <button onClick={exitToMenu} className="game-btn-small">
            Exit to Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default TetrisGame
