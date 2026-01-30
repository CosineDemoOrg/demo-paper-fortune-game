import React, { useState } from 'react'

const COLORS = ['Red', 'Blue', 'Yellow', 'Green']
const NUMBERS = [1, 2, 3, 4]

const FORTUNES = [
  'You will discover a new favorite hobby soon.',
  'A pleasant surprise is waiting for you this week.',
  'You will make someone smile today.',
  'An opportunity will appear—be ready to say yes.',
  'You will learn something that changes how you see the world.',
  'A small risk you take will pay off.',
  'You will reconnect with someone you miss.',
  'Kindness you share will come back to you.',
]

function randomFortune() {
  return FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
}

function App() {
  const [step, setStep] = useState('pickColor')
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [fortune, setFortune] = useState('')
  const [flapState, setFlapState] = useState('closed') // closed | open-horizontal | open-vertical | reveal
  const [isAnimating, setIsAnimating] = useState(false)

  const reset = () => {
    setStep('pickColor')
    setSelectedColor(null)
    setSelectedNumber(null)
    setFortune('')
    setFlapState('closed')
    setIsAnimating(false)
  }

  const playFoldSequence = (steps, startAxis, onDone) => {
    if (steps <= 0) {
      onDone()
      return
    }

    setIsAnimating(true)

    let current = 0
    let axis = startAxis

    const tick = () => {
      const openState = axis === 'x' ? 'open-horizontal' : 'open-vertical'

      // open along current axis
      setFlapState(openState)

      setTimeout(() => {
        // then close back to center
        setFlapState('closed')
        current += 1

        if (current >= steps) {
          setIsAnimating(false)
          onDone()
          return
        }

        // alternate axis each count to mimic real finger motion
        axis = axis === 'x' ? 'y' : 'x'

        setTimeout(tick, 180)
      }, 180)
    }

    tick()
  }

  const handleColorClick = (color) => {
    if (isAnimating) return

    setSelectedColor(color)

    const steps = color.length
    // Spell the color name, starting with a horizontal open
    playFoldSequence(steps, 'x', () => {
      setStep('pickNumber')
    })
  }

  const handleNumberClick = (number) => {
    if (isAnimating) return

    setSelectedNumber(number)

    // Count the number, starting with a vertical open
    playFoldSequence(number, 'y', () => {
      setFortune(randomFortune())
      setFlapState('reveal')
      setStep('showFortune')
    })
  }

  const instructionText = {
    pickColor: 'Pick a color',
    pickNumber: `Now pick a number, spelling out \'${selectedColor || ''}\' as you tap.`,
    showFortune: 'Your fortune is revealed!',
  }[step]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Paper Fortune Teller</h1>
        <p className="subtitle">The classic playground game, reimagined on screen.</p>
      </header>

      <main className="content">
        <section className="teller-section">
          <div className={`teller ${flapState}`}>
            <div className="teller-inner">
              <div className="flap flap-top" />
              <div className="flap flap-right" />
              <div className="flap flap-bottom" />
              <div className="flap flap-left" />

              {step !== 'showFortune' ? (
                <div className="teller-center">
                  <span className="prompt">Tap a choice below</span>
                </div>
              ) : (
                <div className="teller-center teller-center-fortune">
                  <p className="fortune-text">{fortune}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="controls-section">
          <p className="instruction">{instructionText}</p>

          {step === 'pickColor' && (
            <div className="choices-grid">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`choice choice-color choice-color-${color.toLowerCase()}`}
                  onClick={() => handleColorClick(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          )}

          {step === 'pickNumber' && (
            <div className="choices-grid">
              {NUMBERS.map((number) => (
                <button
                  key={number}
                  className="choice choice-number"
                  onClick={() => handleNumberClick(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          )}

          {step === 'showFortune' && (
            <div className="actions">
              <button className="primary" onClick={reset}>
                Play again
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <span>Tip: Try different color-number combos to see new fortunes.</span>
      </footer>
    </div>
  )
}

export default App
