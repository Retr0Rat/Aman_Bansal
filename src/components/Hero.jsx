import { useState, useEffect } from 'react'
import CylinderText from './CylinderText'

const ROLES = [
  'AI Engineer',
  'Cybersecurity Specialist',
  'Full Stack Developer',
  'Machine Learning Expert',
  'Data Scientist'
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Retr0Rat',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aman-bansal-15b986204/',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    label: 'Mail',
    href: 'mailto:aman.bansal1@dcmail.ca',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    )
  }
]

export default function Hero({ onNavigate, theme, onShowResume }) {
  const [typed, setTyped]       = useState('')
  const [roleIdx, setRoleIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = ROLES[roleIdx]
    let timeout

    if (!deleting) {
      if (charIdx < word.length) {
        timeout = setTimeout(() => {
          setTyped(word.substring(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, 100)
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800)
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setTyped(word.substring(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 50)
      } else {
        setDeleting(false)
        setRoleIdx(r => (r + 1) % ROLES.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx])

  const isDark = theme === 'dark'

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden px-4 sm:px-6 lg:px-16">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-8 sm:gap-12 lg:gap-20 max-w-5xl w-full">

        {/* ── LEFT: text (bottom on mobile, left on desktop) ── */}
        <div className="flex-1 flex flex-col items-center sm:items-start">

          {/* availability badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: '0 0 0 0 rgba(34,197,94,0.4)', animation: 'availPulse 2s infinite' }} />
            Available to Work &nbsp;·&nbsp; Summer 2026
          </div>

          {/* hello label */}
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            Hello, I'm
          </p>

          {/* name */}
          <h1
            className="leading-none mb-4 hero-name-gradient sm:whitespace-nowrap"
            style={{
              fontSize: 'clamp(2rem,5vw,4.8rem)',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              lineHeight: 1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Aman Bansal
          </h1>

          {/* typing role */}
          <div className="mb-4 flex justify-center sm:justify-start" style={{ height: '1.75rem', overflow: 'hidden', alignItems: 'center' }}>
            <span className="text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>{typed}</span>
            <span style={{ color: 'var(--accent)', animation: 'blink 1s infinite' }}>|</span>
          </div>

          {/* tagline */}
          <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Building intelligent systems at the intersection of artificial intelligence and cybersecurity.
            Graduate student specialising in ML and security solutions.
          </p>

          {/* social icons */}
          <div className="flex items-center gap-3 mb-8">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="social-icon-btn flex items-center justify-center w-9 h-9 rounded-lg"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* actions */}
          <div className="flex items-center gap-8">
            <CylinderText
              href="#"
              onClick={e => { e.preventDefault(); onShowResume() }}
              style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: '#a855f7', letterSpacing: '0.04em' }}
              className="hero-cta"
            >
              Resume ↗
            </CylinderText>

            <CylinderText
              href="#"
              onClick={e => { e.preventDefault(); onNavigate('Contact') }}
              style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}
              className="hero-cta"
            >
              Get In Touch →
            </CylinderText>
          </div>

          {/* swipe hint — mobile only, auto-fades after 3 s */}
          <div className="swipe-hint flex flex-col items-center sm:items-start mt-8 gap-1">
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Swipe Up
            </span>
            <div style={{ animation: 'bounceY 1.6s ease-in-out infinite' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </div>

        </div>

        {/* ── RIGHT: profile photo (top on mobile, right on desktop) ── */}
        <div className="flex-shrink-0 order-first sm:order-last">
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52">
            <div
              className="absolute rounded-full"
              style={{
                inset: '-4px',
                background: 'linear-gradient(135deg,#22c55e,#00e5ff,#3b82f6,#06b6d4)',
                animation: 'spinRing 4s linear infinite',
                zIndex: 0
              }}
            />
            <div
              className="relative z-10 w-full h-full rounded-full flex items-center justify-center overflow-hidden"
              style={{
                border: `4px solid ${isDark ? '#0a0a0a' : '#ffffff'}`,
                background: isDark
                  ? 'linear-gradient(135deg,#2a1a3e,#1a0a2e)'
                  : 'linear-gradient(135deg,#f5f0ff,#ede5ff)'
              }}
            >
              {/* ── Replace the URL below with your hosted photo link ──
                  Cloudinary: https://collection.cloudinary.com/duafosnas/8b413dbfe173918bbe24cb307bf191ed
                  imgbb:      https://i.ibb.co/xxxxxxx/photo.jpg               */}
              <img
                src="https://res.cloudinary.com/duafosnas/image/upload/v1777098290/ProImage_qes1fx.jpg"
                alt="Aman Bansal"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
              />
              {/* Fallback initials shown if image fails to load */}
              <span
                className="font-black text-transparent bg-clip-text"
                style={{
                  display: 'none',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.8rem',
                  backgroundImage: 'linear-gradient(135deg,#a855f7,#7c3aed)',
                  WebkitBackgroundClip: 'text'
                }}
              >
                AB
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes blink     { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        @keyframes bounceY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        @keyframes spinRing  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes availPulse{
          0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.5)}
          50%    {box-shadow:0 0 0 6px rgba(34,197,94,0)}
        }

        @keyframes nameGradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-name-gradient {
          background: linear-gradient(135deg, #fff 0%, #a855f7 30%, #7c3aed 50%, #a855f7 70%, #fff 100%);
          background-size: 300% 300%;
          animation: nameGradient 4s ease infinite;
        }
        [data-theme="light"] .hero-name-gradient {
          background: linear-gradient(135deg, #0a0a0a 0%, #a855f7 30%, #7c3aed 50%, #a855f7 70%, #0a0a0a 100%);
          background-size: 300% 300%;
          animation: nameGradient 4s ease infinite;
        }

        .social-icon-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .social-icon-btn:hover {
          color: #a855f7;
          border-color: #a855f7;
          background: rgba(168,85,247,0.08);
        }

        /* Swipe hint — mobile only, fades out after 3 s */
        .swipe-hint {
          animation: swipeHintFade 3s ease forwards;
          pointer-events: none;
        }
        @keyframes swipeHintFade {
          0%  { opacity: 0.45; }
          60% { opacity: 0.45; }
          100%{ opacity: 0; }
        }
        /* Hide entirely on desktop — "Scroll" is handled by mouse wheel */
        @media (min-width: 1024px) {
          .swipe-hint { display: none; }
        }
      `}</style>
    </div>
  )
}
