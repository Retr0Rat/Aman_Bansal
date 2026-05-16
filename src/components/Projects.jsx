import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import CylinderText from './CylinderText'

/* ─── Project data ─── */
const PROJECTS = [
  {
    num: '01',
    type: 'Machine Learning · Capstone',
    name: 'Social Media Integrity Platform',
    shortName: 'ML Integrity',
    desc: 'ML platform detecting bot accounts and fake news using calibrated Random Forest (TwiBot-20, 700K+ samples, 88% accuracy) and DistilBERT fake news classifier at 91% accuracy. FastAPI backend with React admin dashboard, served via Docker.',
    tech: ['Python', 'FastAPI', 'React', 'DistilBERT', 'scikit-learn', 'Docker', 'MongoDB'],
    live: false,
    stats: [
      { num: '91%',   lbl: 'Accuracy'  },
      { num: '700K+', lbl: 'Samples'   },
      { num: '2026',  lbl: 'Shipped'   },
      { num: 'ML',    lbl: 'Powered'   },
    ],
    info: { label: '🤖 Models', val: 'DistilBERT + Random Forest', sub: 'Calibrated on TwiBot-20 dataset' },
    btn2: null,
    btnLabel: '↗ GitHub',
    btnHref: 'https://github.com/Retr0Rat',
    image: 'https://placehold.co/800x450/1a0533/a855f7?text=ML+Integrity',
  },
  {
    num: '02',
    type: 'Security AI · NLP · MLOps',
    name: 'Prompt Injection & LLM Security Scanner',
    shortName: 'LLM Scanner',
    desc: 'Fine-tuned DistilBERT to detect prompt injection attacks in LLM applications, achieving 95% accuracy and F1-score of 0.95. Deployed as a production REST API via FastAPI and Docker with a full pytest suite at 10/10 coverage.',
    tech: ['DistilBERT', 'Python', 'FastAPI', 'Docker', 'pytest', 'scikit-learn'],
    live: false,
    stats: [
      { num: '95%',   lbl: 'Accuracy' },
      { num: '0.95',  lbl: 'F1-Score' },
      { num: '10/10', lbl: 'Coverage' },
      { num: '2026',  lbl: 'Shipped'  },
    ],
    info: { label: '🔐 Model', val: 'Fine-tuned DistilBERT', sub: 'Prompt injection detection for LLM apps' },
    btn2: null,
    btnLabel: '↗ GitHub',
    btnHref: 'https://github.com/Retr0Rat/prompt-injection-scanner.git',
    image: 'https://placehold.co/800x450/1a0533/a855f7?text=LLM+Scanner',
  },
  {
    num: '03',
    type: 'Machine Learning · Anomaly Detection',
    name: 'SIEM Network Anomaly Detector',
    shortName: 'Anomaly Detector',
    desc: 'Unsupervised anomaly detection system using Isolation Forest on the CICIDS 2017 dataset, identifying DDoS attacks without any labelled attack data. Achieved Macro F1 of 0.71, deployed as a REST API via FastAPI and Docker.',
    tech: ['Python', 'Isolation Forest', 'FastAPI', 'scikit-learn', 'Docker', 'pandas'],
    live: false,
    stats: [
      { num: '0.71',  lbl: 'Macro F1'  },
      { num: 'SIEM',  lbl: 'Domain'    },
      { num: '2026',  lbl: 'Shipped'   },
      { num: 'REST',  lbl: 'API'       },
    ],
    info: { label: '🛡️ Dataset', val: 'CICIDS 2017', sub: 'Unsupervised DDoS detection — no labelled data' },
    btn2: null,
    btnLabel: '↗ GitHub',
    btnHref: 'https://github.com/Retr0Rat/siem-anomaly-detector.git',
    image: 'https://placehold.co/800x450/1a0533/a855f7?text=Anomaly+Detector',
  },
  {
    num: '04',
    type: 'Full Stack · React',
    name: 'Expense Splitter App',
    shortName: 'Expense Splitter',
    desc: 'Group expense splitting app with real-time balance tracking and settlement suggestions. Built with full TDD — 25 passing Vitest tests — and automated CI/CD via GitHub Actions.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Vitest', 'GitHub Actions'],
    live: false,
    stats: [
      { num: '25',    lbl: 'Tests'    },
      { num: 'CI/CD', lbl: 'Pipeline' },
      { num: '2025',  lbl: 'Shipped'  },
      { num: 'TDD',   lbl: 'Approach' },
    ],
    info: { label: '🧪 Testing', val: 'Vitest + GitHub Actions', sub: '100% test pass rate' },
    btn2: null,
    btnLabel: '↗ GitHub',
    btnHref: 'https://github.com/Retr0Rat/expense-splitter',
    image: 'https://placehold.co/800x450/1a0533/a855f7?text=Expense+Splitter',
  },
  {
    num: '05',
    type: 'Data Analytics · Visualisation',
    name: 'Tableau & Data Analytics',
    shortName: 'Data Analytics',
    desc: 'Hands-on experience transforming raw datasets into actionable insights using Tableau and Python. Work spans data cleaning, feature engineering, statistical analysis, and building interactive dashboards — covering business KPIs, customer behaviour, and regional performance across multiple projects.',
    tech: ['Tableau', 'Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Excel', 'Statistical Analysis'],
    live: false,
    stats: [
      { num: 'Multi', lbl: 'Dashboards' },
      { num: 'KPI',   lbl: 'Focus'      },
      { num: 'EDA',   lbl: 'Approach'   },
      { num: '2026',  lbl: 'Ongoing'    },
    ],
    info: { label: '📊 Tools', val: 'Tableau + Python (Pandas / Matplotlib)', sub: 'End-to-end: cleaning → analysis → storytelling' },
    btn2: 'Live Demo →',
    btnLabel: '↗ GitHub',
    btnHref: 'https://github.com/Retr0Rat',
    image: 'https://placehold.co/800x450/1a0533/a855f7?text=Data+Analytics',
  },
  {
    num: '06',
    type: 'Full Stack · MERN',
    name: 'Mon Amour — E-Commerce',
    shortName: 'Mon Amour',
    desc: 'Full-stack fashion e-commerce platform with JWT auth, MongoDB, product reviews, wishlist, size modal, admin dashboard, and a complete mock checkout flow.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'Vite'],
    live: false,
    stats: [
      { num: '18+',  lbl: 'Products'  },
      { num: 'JWT',  lbl: 'Full Auth' },
      { num: '2026', lbl: 'Shipped'   },
      { num: 'FS',   lbl: 'Full Stack'},
    ],
    info: { label: '🛍️ Stack', val: 'MERN + Tailwind', sub: 'Admin dashboard + checkout flow' },
    btn2: 'Live Demo →',
    btnLabel: '↗ GitHub',
    btnHref: 'https://github.com/Retr0Rat',
    image: 'https://placehold.co/800x450/1a0533/a855f7?text=Mon+Amour',
  },
]

/* ─── Stat card (desktop right column + drawer) ─── */
function StatCard({ s, size = 'md' }) {
  const pad  = size === 'lg' ? '14px 16px' : '12px 14px'
  const fnum = size === 'lg' ? '1.5rem'    : 'clamp(1rem,2.5vw,1.6rem)'
  return (
    <div
      className="proj-stat-card"
      style={{ padding: pad, borderRadius: 14, border: '1px solid rgba(168,85,247,0.12)', background: 'rgba(168,85,247,0.04)', transition: 'all 0.3s', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.35)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(168,85,247,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.12)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: fnum, fontWeight: 900, color: 'var(--accent)', lineHeight: 1, wordBreak: 'break-all' }}>{s.num}</div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{s.lbl}</div>
    </div>
  )
}

/* ─── Tag pill ─── */
function Tag({ label }) {
  return (
    <span style={{ display: 'inline-block', padding: '3px 11px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: 'var(--accent)' }}>
      {label}
    </span>
  )
}

/* ════════════════════════════════════════════════
   DETAIL DRAWER
════════════════════════════════════════════════ */
function Drawer({ p, open, onClose, isDark }) {
  const bg = isDark ? '#0d0118' : '#ffffff'

  /* Track desktop vs mobile in JS so we can drive styles inline —
     avoids any CSS inset / media-query cascade issues with the portal */
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024)
  useEffect(() => {
    function onResize() { setIsDesktop(window.innerWidth >= 1024) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const slides = document.querySelectorAll('.proj-slide')
    slides.forEach(el => { el.style.overflowY = open ? 'hidden' : '' })
    return () => { slides.forEach(el => { el.style.overflowY = '' }) }
  }, [open])

  /* ── Overlay: full-viewport fixed layer, flex-centres the panel ── */
  const overlayStyle = {
    position:           'fixed',
    top:                0,
    left:               0,
    width:              '100%',
    height:             '100%',
    zIndex:             50,
    background:         'rgba(0,0,0,0.65)',
    backdropFilter:     'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    opacity:            open ? 1 : 0,
    pointerEvents:      open ? 'auto' : 'none',
    transition:         'opacity 250ms ease',
    display:            'flex',
    alignItems:         isDesktop ? 'center' : 'flex-end',
    justifyContent:     'center',
  }

  /* ── Panel: mobile bottom-sheet or desktop centred modal ── */
  const panelTransform = isDesktop
    ? (open ? 'scale(1)'       : 'scale(0.95)')
    : (open ? 'translateY(0)'  : 'translateY(100%)')

  const panelTransition = open
    ? 'transform 420ms cubic-bezier(0.32,0.72,0,1), opacity 250ms ease'
    : 'transform 300ms ease-in, opacity 250ms ease-in'

  const panelStyle = {
    background:    bg,
    border:        '1px solid rgba(168,85,247,0.2)',
    boxShadow:     isDesktop ? '0 25px 60px rgba(0,0,0,0.6)' : '0 -8px 60px rgba(0,0,0,0.6)',
    width:         isDesktop ? '680px' : '100%',
    maxWidth:      isDesktop ? '90vw'  : undefined,
    height:        isDesktop ? '85vh'  : '88vh',
    borderRadius:  isDesktop ? '20px'  : '20px 20px 0 0',
    display:       'flex',
    flexDirection: 'column',
    flexShrink:    0,
    overflow:      'hidden',          // clips content to border-radius
    zIndex:        60,
    transform:     panelTransform,
    opacity:       isDesktop ? (open ? 1 : 0) : 1,
    transition:    panelTransition,
  }

  return createPortal(
    <div style={overlayStyle} onClick={onClose}>
      {/* proj-drawer--open class is a DOM signal used by App.jsx wheel/touch handlers */}
      <div style={panelStyle} className={open ? 'proj-drawer--open' : ''} onClick={e => e.stopPropagation()}>

        {/* Drag handle (mobile / tablet only) */}
        {!isDesktop && (
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', margin: '12px auto' }} />
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '12px 20px', flexShrink: 0 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3, paddingRight: 12 }}>
            {p.name}
          </h2>
          <button
            onClick={onClose}
            style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
          >×</button>
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

        {/* Scrollable body */}
        <div className="proj-drawer-body">
          {/* Image */}
          <img
            src={p.image}
            alt={p.name}
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(168,85,247,0.25)', display: 'block' }}
          />

          {/* Eyebrow */}
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', margin: '16px 0 6px' }}>
            {p.num} — {p.type}
          </p>

          {/* Description */}
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 16 }}>
            {p.desc}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
            {p.tech.map(t => <Tag key={t} label={t} />)}
          </div>

          {/* Key Metrics */}
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(168,85,247,0.1)' }}>
            Key Metrics
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {p.stats.map(s => <StatCard key={s.lbl} s={s} size="lg" />)}
          </div>

          {/* Info card */}
          <div style={{ padding: '14px 16px', borderRadius: 14, marginBottom: 24, border: '1px solid rgba(168,85,247,0.12)', background: 'rgba(168,85,247,0.04)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{p.info.label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{p.info.val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{p.info.sub}</div>
          </div>

          {/* Separator */}
          <div style={{ height: 1, background: 'rgba(168,85,247,0.1)', marginBottom: 18 }} />

          {/* GitHub ghost button */}
          <a
            href={p.btnHref}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-drawer-gh"
          >
            {p.btnLabel}
          </a>
        </div>

      </div>
    </div>,
    document.body
  )
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════ */
export default function Projects({ theme }) {
  const [active, setActive]         = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isDark = theme === 'dark'
  const total  = PROJECTS.length
  const p      = PROJECTS[active]

  function go(idx) {
    setActive((idx + total) % total)
    setDrawerOpen(false)
  }
  function navTo(i) {
    setActive(i)
    setDrawerOpen(false)
  }

  return (
    <>
    <Drawer p={p} open={drawerOpen} onClose={() => setDrawerOpen(false)} isDark={isDark} />
    <div className="projects-wrapper">

      {/* ── Carousel slides ── */}
      <div className="proj-slides-area">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.num}
            className="proj-slide"
            style={{
              opacity:       i === active ? 1 : 0,
              transform:     i === active ? 'none' : 'translateY(16px)',
              pointerEvents: i === active ? 'auto' : 'none',
              transition:    'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* ── MOBILE (< 768px) ── */}
            <div className="proj-mobile">
              <div className="proj-mobile-top">
                <p className="proj-eyebrow">{proj.num} — {proj.type}</p>
                <h1 className="proj-title">{proj.name}</h1>
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="proj-img proj-img--mobile"
                />
              </div>
              <div className="proj-mobile-btns">
                <a href={proj.btnHref} target="_blank" rel="noopener noreferrer" className="proj-btn proj-btn--ghost">
                  {proj.btnLabel}
                </a>
                {proj.btn2 && (
                  <button onClick={() => { setActive(i); setDrawerOpen(true) }} className="proj-btn proj-btn--filled">
                    {proj.btn2}
                  </button>
                )}
              </div>
            </div>

            {/* ── TABLET (768–1023px) ── */}
            <div className="proj-tablet">
              <div className="proj-tablet-inner">
                <p className="proj-eyebrow">{proj.num} — {proj.type}</p>
                <h1 className="proj-title proj-title--tablet">{proj.name}</h1>
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="proj-img proj-img--tablet"
                />
                <p className="proj-tablet-desc">{proj.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {proj.tech.map(t => <Tag key={t} label={t} />)}
                </div>
                <div className="proj-tablet-btns">
                  <a href={proj.btnHref} target="_blank" rel="noopener noreferrer" className="proj-btn proj-btn--ghost">
                    {proj.btnLabel}
                  </a>
                  {proj.btn2 && (
                    <button onClick={() => { setActive(i); setDrawerOpen(true) }} className="proj-btn proj-btn--filled">
                      {proj.btn2}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── DESKTOP (≥ 1024px) ── */}
            <div className="proj-desktop">
              <div className="proj-desktop-grid">
                {/* Left column */}
                <div className="proj-desktop-left">
                  <p className="proj-eyebrow">{proj.num} — {proj.type}</p>
                  <h1 className="proj-title proj-title--desktop">{proj.name}</h1>
                  <p className="proj-desktop-desc">{proj.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                    {proj.tech.map(t => <Tag key={t} label={t} />)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
                    <CylinderText
                      href={proj.btnHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: '#a855f7', letterSpacing: '0.04em' }}
                    >
                      {proj.btnLabel}
                    </CylinderText>
                    {proj.btn2 && (
                      <CylinderText
                        as="button"
                        onClick={() => { setActive(i); setDrawerOpen(true) }}
                        style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: '#ffffff', letterSpacing: '0.04em' }}
                      >
                        {proj.btn2}
                      </CylinderText>
                    )}
                  </div>
                </div>

                {/* Right column */}
                <div className="proj-desktop-right">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="proj-img proj-img--desktop"
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                    {proj.stats.map(s => <StatCard key={s.lbl} s={s} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Nav bar ── */}
      <div className="proj-nav-bar" style={{ position: 'relative', zIndex: 70 }}>
        <div className="proj-nav" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: isDark ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(168,85,247,0.15)',
          borderRadius: 16, padding: 8,
        }}>
          <button
            onClick={() => go(active - 1)}
            className="proj-nav-arrow"
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.color = '#a855f7' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.12)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >‹</button>

          <div style={{ width: 1, height: 24, background: 'rgba(168,85,247,0.1)' }} />

          {PROJECTS.map((proj, i) => (
            <div key={proj.num} style={{ display: 'contents' }}>
              <button
                onClick={() => navTo(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '9px 16px', borderRadius: 10, cursor: 'pointer',
                  border: i === active ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                  background: i === active ? 'rgba(168,85,247,0.12)' : 'transparent',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { if (i !== active) { e.currentTarget.style.background = 'rgba(168,85,247,0.07)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)' } }}
                onMouseLeave={e => { if (i !== active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: i === active ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'uppercase', transition: 'color 0.25s' }}>
                  {proj.num}
                </span>
                <span className="proj-nav-label" style={{ fontSize: 12, fontWeight: 600, color: i === active ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap', transition: 'color 0.25s' }}>
                  {proj.shortName}
                </span>
              </button>
              {i < PROJECTS.length - 1 && <div style={{ width: 1, height: 24, background: 'rgba(168,85,247,0.1)' }} />}
            </div>
          ))}

          <div style={{ width: 1, height: 24, background: 'rgba(168,85,247,0.1)' }} />

          <button
            onClick={() => go(active + 1)}
            className="proj-nav-arrow"
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.color = '#a855f7' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.12)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >›</button>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          STYLES
      ════════════════════════════════════════════ */}
      <style>{`

        /* ── Wrapper ── */
        .projects-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100dvh;
        }

        /* ── Slides area ── */
        .proj-slides-area {
          flex: 1;
          position: relative;
          min-height: 0;
          overflow: hidden;
        }

        /* ── Individual slide ── */
        .proj-slide {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* ── Eyebrow ── */
        .proj-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 8px;
        }

        /* ── Title (gradient) ── */
        .proj-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          line-height: 1.05;
          margin: 0 0 12px;
          background: linear-gradient(135deg, #0a0a0a 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        [data-theme="dark"] .proj-title {
          background: linear-gradient(135deg, #ffffff 0%, #a855f7 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* ── Images ── */
        .proj-img {
          display: block;
          width: 100%;
          object-fit: cover;
          border: 1px solid rgba(168,85,247,0.25);
        }
        .proj-img--mobile {
          aspect-ratio: 16/9;
          border-radius: 12px;
          margin-top: 16px;
        }
        .proj-img--tablet {
          aspect-ratio: 16/9;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        .proj-img--desktop {
          aspect-ratio: 16/9;
          border-radius: 16px;
          border-color: rgba(168,85,247,0.3);
          box-shadow: 0 0 40px rgba(168,85,247,0.12);
        }

        /* ── Shared action buttons ── */
        .proj-btn {
          flex: 1;
          height: 48px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }
        .proj-btn--ghost {
          border: 1px solid rgba(168,85,247,0.5);
          background: transparent;
          color: #fff;
        }
        [data-theme="light"] .proj-btn--ghost { color: #1a0533; }
        .proj-btn--ghost:hover {
          background: rgba(168,85,247,0.12);
          border-color: #a855f7;
        }
        .proj-btn--filled {
          border: none;
          background: #a855f7;
          color: #fff;
          box-shadow: 0 4px 16px rgba(168,85,247,0.4);
        }
        .proj-btn--filled:hover {
          box-shadow: 0 6px 24px rgba(168,85,247,0.6);
          transform: translateY(-1px);
        }
        .proj-btn--filled:active { transform: scale(0.97); }

        /* ── Nav bar ── */
        .proj-nav-bar {
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          padding: 6px 16px calc(10px + env(safe-area-inset-bottom, 16px));
        }
        .proj-nav-arrow {
          width: 34px; height: 34px;
          border-radius: 8px;
          border: 1px solid rgba(168,85,247,0.12);
          background: transparent;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .proj-nav-label { display: none; }

        /* ═══════════════════════════════
           MOBILE (< 768px)
        ═══════════════════════════════ */
        .proj-mobile {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100%;
          padding: 20px 20px 0;
          box-sizing: border-box;
        }
        .proj-mobile-top { flex: 1; }
        .proj-mobile-btns {
          display: flex;
          gap: 10px;
          padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
          padding-top: 16px;
          flex-shrink: 0;
        }
        .proj-title { font-size: clamp(1.6rem, 7vw, 2.4rem); }
        .proj-tablet { display: none; }
        .proj-desktop { display: none; }

        /* ═══════════════════════════════
           TABLET (768–1023px)
        ═══════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .proj-mobile  { display: none; }
          .proj-tablet  { display: flex; align-items: center; justify-content: center; min-height: 100%; padding: 32px 24px; box-sizing: border-box; }
          .proj-desktop { display: none; }

          .proj-tablet-inner {
            width: 100%;
            max-width: 560px;
          }
          .proj-title--tablet {
            font-size: clamp(1.8rem, 5vw, 2.8rem);
            margin-bottom: 14px;
          }
          .proj-tablet-desc {
            font-size: 14px;
            line-height: 1.75;
            color: var(--text-secondary);
            margin-bottom: 14px;
          }
          .proj-tablet-btns {
            display: flex;
            gap: 10px;
            margin-top: 4px;
          }
          .proj-nav-bar { padding: 5px 12px calc(8px + env(safe-area-inset-bottom, 12px)); }
        }

        /* ═══════════════════════════════
           DESKTOP (≥ 1024px)
        ═══════════════════════════════ */
        @media (min-width: 1024px) {
          .proj-mobile  { display: none; }
          .proj-tablet  { display: none; }
          .proj-desktop {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100%;
            padding: 40px 60px;
            box-sizing: border-box;
          }

          .proj-desktop-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            width: 100%;
            max-width: 1100px;
            align-items: center;
          }
          .proj-desktop-left { display: flex; flex-direction: column; }
          .proj-desktop-right { display: flex; flex-direction: column; }

          .proj-title--desktop {
            font-size: clamp(2rem, 3.5vw, 3.2rem);
            margin-bottom: 14px;
          }
          .proj-desktop-desc {
            font-size: 14px;
            line-height: 1.8;
            color: var(--text-secondary);
            margin-bottom: 16px;
          }

          .proj-nav-bar { padding: 6px 16px 10px; }
          .proj-nav-label { display: inline; }
        }

        /* ═══════════════════════════════
           DETAIL DRAWER — helper classes only
           (overlay + panel positioning/animation is fully inline)
        ═══════════════════════════════ */

        /* Scrollable body */
        .proj-drawer-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 20px 20px calc(28px + env(safe-area-inset-bottom, 0px));
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          box-sizing: border-box;
        }
        @media (min-width: 1024px) {
          .proj-drawer-body { padding: 24px 28px 28px; }
        }

        /* GitHub button inside drawer */
        .proj-drawer-gh {
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 48px; border-radius: 12px;
          border: 1px solid rgba(168,85,247,0.35);
          background: transparent;
          color: #a855f7;
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px;
          text-decoration: none; transition: all 0.2s;
          letter-spacing: 0.04em;
          box-sizing: border-box;
        }
        .proj-drawer-gh:hover {
          background: rgba(168,85,247,0.1);
          border-color: #a855f7;
        }
      `}</style>
    </div>
    </>
  )
}
