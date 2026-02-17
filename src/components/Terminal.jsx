import React, { useState, useEffect, useRef } from 'react'
import { FaTerminal, FaTimes } from 'react-icons/fa'
import './Terminal.css'

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Roschel\'s Portfolio Terminal v2.0' },
    { type: 'system', text: 'Type "help" for available commands' }
  ])
  const inputRef = useRef(null)
  const historyRef = useRef(null)

  const commands = {
    help: () => [
      { type: 'output', text: 'Available commands:' },
      { type: 'output', text: '  about       - Learn about me' },
      { type: 'output', text: '  skills      - View my skills' },
      { type: 'output', text: '  projects    - See my projects' },
      { type: 'output', text: '  achievements- View achievements' },
      { type: 'output', text: '  contact     - Get contact info' },
      { type: 'output', text: '  play        - Play Snake game' },
      { type: 'output', text: '  theme       - Toggle theme' },
      { type: 'output', text: '  clear       - Clear terminal' },
      { type: 'output', text: '  github      - Open GitHub profile' },
      { type: 'output', text: '  linkedin    - Open LinkedIn' },
      { type: 'output', text: '  secret      - ???' }
    ],
    about: () => [
      { type: 'output', text: 'Hi! I\'m Roschel Mae, an IT student passionate about' },
      { type: 'output', text: 'full-stack development. I love building web and mobile' },
      { type: 'output', text: 'applications with React, Laravel, and MongoDB.' }
    ],
    skills: () => [
      { type: 'output', text: 'Core Skills:' },
      { type: 'output', text: '  • React & React Native' },
      { type: 'output', text: '  • JavaScript & TypeScript' },
      { type: 'output', text: '  • PHP & Laravel' },
      { type: 'output', text: '  • MongoDB & SQL' },
      { type: 'output', text: '  • Python & C++' }
    ],
    projects: () => [
      { type: 'output', text: 'Featured Projects:' },
      { type: 'output', text: '  1. ProtectOcean - Marine conservation app' },
      { type: 'output', text: '  2. SmartB - Barangay management system' },
      { type: 'output', text: '  3. SingKarga - IoT charging station' },
      { type: 'output', text: '  4. Email Phishing Detector' }
    ],
    achievements: () => {
      document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })
      return [{ type: 'output', text: 'Scrolling to achievements section...' }]
    },
    contact: () => [
      { type: 'output', text: 'Contact Information:' },
      { type: 'output', text: '  Email: roschelmaeanoos@gmail.com' },
      { type: 'output', text: '  GitHub: github.com/Rossyyyyyy' },
      { type: 'output', text: '  LinkedIn: linkedin.com/in/roschel-mae-ano-os-800324368' }
    ],
    play: () => {
      // Trigger game open via custom event
      window.dispatchEvent(new CustomEvent('openGame'))
      return [{ type: 'output', text: 'Launching Snake game... 🐍' }]
    },
    theme: () => {
      window.dispatchEvent(new CustomEvent('toggleTheme'))
      return [{ type: 'output', text: 'Theme toggled! ✨' }]
    },
    github: () => {
      window.open('https://github.com/Rossyyyyyy', '_blank')
      return [{ type: 'output', text: 'Opening GitHub profile...' }]
    },
    linkedin: () => {
      window.open('https://www.linkedin.com/in/roschel-mae-ano-os-800324368/', '_blank')
      return [{ type: 'output', text: 'Opening LinkedIn profile...' }]
    },
    secret: () => [
      { type: 'output', text: '🎮 Easter Egg Found!' },
      { type: 'output', text: 'You discovered the secret command!' },
      { type: 'output', text: 'Achievement Unlocked: Secret Finder 🏆' },
      { type: 'output', text: 'Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A' }
    ],
    clear: () => {
      setHistory([])
      return []
    }
  }

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    setHistory(prev => [...prev, { type: 'input', text: `> ${cmd}` }])

    if (trimmedCmd === '') return

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]()
      setHistory(prev => [...prev, ...output])
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        text: `Command not found: ${trimmedCmd}. Type "help" for available commands.` 
      }])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      <button 
        className="terminal-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle terminal"
      >
        <FaTerminal />
      </button>

      {isOpen && (
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-title">
              <FaTerminal /> Terminal
            </div>
            <button 
              className="terminal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close terminal"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="terminal-body" ref={historyRef}>
            {history.map((item, index) => (
              <div key={index} className={`terminal-line ${item.type}`}>
                {item.text}
              </div>
            ))}
          </div>

          <form className="terminal-input-wrapper" onSubmit={handleSubmit}>
            <span className="terminal-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command..."
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </>
  )
}

export default Terminal
