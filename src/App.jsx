import React, { useState } from 'react'

const COLORS = ['Red', 'Blue', 'Green', 'Yellow']
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

  const reset = () => {
    setStep('pickColor')
    setSelectedColor(null)
    setSelectedNumber(null)
    setFortune('')
    setFlapState('closed')
  }

  const handleColorClick = (color) => {
    setSelectedColor(color)
    setStep('pickNumber')
    setFlapState('open-horizontal')
  }

  const handleNumberClick = (number) => {
    setSelectedNumber(number)
    setFlapState('open-vertical')
    setTimeout(() => {
      setFortune(randomFortune())
      setFlapState('reveal')
      setStep('showFortune')
    }, 700)
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
