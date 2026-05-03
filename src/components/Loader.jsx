import { useState, useEffect } from 'react'
import '../styles/loader.css'

const WELCOME_WORDS = ['Hello', 'Bonjour', 'Hola', 'こんにちは', 'नमस्ते']
const PROGRESS_LABELS = ['INITIALIZING', 'LOADING ASSETS', 'BUILDING UI', 'ALMOST THERE']

export default function Loader({ onComplete }) {
  const [progress, setProgress]           = useState(0)
  const [label, setLabel]                 = useState('INITIALIZING')
  const [phase, setPhase]                 = useState('loading') // loading | fadeAB | welcome | exit
  const [welcomeIndex, setWelcomeIndex]   = useState(0)
  const [welcomeVisible, setWelcomeVisible] = useState(false)
  const [abHidden, setAbHidden]           = useState(false)
  const [progressHidden, setProgressHidden] = useState(false)
  const [exiting, setExiting]             = useState(false)

  // ── Phase: loading — progress bar
  useEffect(() => {
    if (phase !== 'loading') return
    let current = 0

    const interval = setInterval(() => {
      const step = current < 60 ? 2.5 : current < 85 ? 1.2 : 0.4
      current = Math.min(current + step, 100)
      setProgress(current)

      if      (current < 30) setLabel(PROGRESS_LABELS[0])
      else if (current < 60) setLabel(PROGRESS_LABELS[1])
      else if (current < 85) setLabel(PROGRESS_LABELS[2])
      else                   setLabel(PROGRESS_LABELS[3])

      if (current >= 100) {
        clearInterval(interval)
        setLabel('COMPLETE')
        setTimeout(() => setPhase('fadeAB'), 300)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [phase])

  // ── Phase: fadeAB — hide AB and progress, then move to welcome
  useEffect(() => {
    if (phase !== 'fadeAB') return
    setAbHidden(true)
    setProgressHidden(true)
    setTimeout(() => setPhase('welcome'), 600)
  }, [phase])

  // ── Phase: welcome — cycle words
  useEffect(() => {
    if (phase !== 'welcome') return
    let index = 0
    let cancelled = false

    function showNext() {
      if (cancelled) return
      if (index >= WELCOME_WORDS.length) {
        setPhase('exit')
        return
      }
      setWelcomeIndex(index)
      setWelcomeVisible(true)

      setTimeout(() => {
        if (cancelled) return
        setWelcomeVisible(false)
        setTimeout(() => {
          index++
          showNext()
        }, 450)
      }, 600)
    }

    showNext()
    return () => { cancelled = true }
  }, [phase])

  // ── Phase: exit — fade loader out, reveal main page
  useEffect(() => {
    if (phase !== 'exit') return
    setExiting(true)
    setTimeout(() => onComplete?.(), 600)
  }, [phase])

  return (
    <div className={`loader-overlay fixed inset-0 z-50 flex items-center justify-center opacity-0 ${exiting ? 'loader-exit' : ''}`}>

      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Grid */}
      <div className="loader-grid absolute inset-0 pointer-events-none" />

      {/* Scanlines */}
      <div className="loader-scanlines absolute inset-0 pointer-events-none" />

      {/* Corner accents */}
      <div className="corner corner-tl absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-purple-500" />
      <div className="corner corner-tr absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-purple-500" />
      <div className="corner corner-bl absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-purple-500" />
      <div className="corner corner-br absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-purple-500" />

      {/* Center stage — AB and Welcome share this space */}
      <div className="relative flex items-center justify-center w-80 h-48 z-10">

        {/* AB glitch block */}
        <div className="absolute flex items-center justify-center">
          <div className="glow-ring absolute w-56 h-56 rounded-full" />
          <div className={`ab-wrap relative z-10 ${abHidden ? 'hidden' : ''}`}>
            <div className="glitch-text text-[130px] font-black">AB</div>
          </div>
        </div>

        {/* Welcome word block */}
        <div className={`welcome-block absolute flex items-center justify-center ${welcomeVisible ? 'visible' : ''}`}>
          <span
            className="text-6xl font-bold text-transparent bg-clip-text whitespace-nowrap"
            style={{ backgroundImage: 'linear-gradient(135deg, #fff, #a855f7)', WebkitBackgroundClip: 'text' }}
          >
            {WELCOME_WORDS[welcomeIndex]}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={`progress-wrap absolute bottom-12 flex flex-col items-center gap-2 ${progressHidden ? 'hidden' : ''}`}>
        <div className="w-48 h-[2px] bg-purple-900/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)',
              boxShadow: '0 0 8px rgba(168,85,247,0.6)'
            }}
          />
        </div>
        <span className="text-[11px] text-neutral-600 tracking-widest">{label}</span>
      </div>

    </div>
  )
}
