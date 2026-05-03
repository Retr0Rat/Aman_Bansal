export default function ThemeToggle({ theme, onToggle, hidden = false }) {
  const isDark = theme === 'dark'

  function handleClick() {
    const newColor    = isDark ? '#f5f5f5' : '#0a0a0a'
    const FADE_IN_MS  = 200
    const FADE_OUT_MS = 250

    /* Simple full-screen fade — works reliably on all devices including mobile Safari */
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999; pointer-events: none;
      background: ${newColor}; opacity: 0;
      transition: opacity ${FADE_IN_MS}ms ease;
    `
    document.body.appendChild(overlay)

    /* Fade IN */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.style.opacity = '1'
    }))

    /* Switch theme once fully covered, then fade OUT */
    setTimeout(() => {
      onToggle()
      overlay.style.transition = `opacity ${FADE_OUT_MS}ms ease`
      overlay.style.opacity    = '0'
      setTimeout(() => overlay.remove(), FADE_OUT_MS)
    }, FADE_IN_MS + 16)
  }

  if (hidden) return null

  return (
    <>
      <style>{`
        /* ── Theme toggle — icon-only on mobile, pill on desktop ── */
        .theme-btn {
          position: fixed;
          top: 14px;
          right: 14px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
          gap: 0;
          padding: 0;
        }
        .theme-btn-label {
          display: none;
        }

        /* Desktop pill — wider with text label */
        @media (min-width: 768px) {
          .theme-btn {
            width: auto;
            height: 36px;
            border-radius: 12px;
            padding: 0 14px 0 10px;
            gap: 7px;
            font-size: 15px;
          }
          .theme-btn-label {
            display: inline;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            color: var(--text-muted);
          }
        }

        .theme-btn:hover {
          border-color: rgba(168,85,247,0.5);
          box-shadow: 0 0 14px rgba(168,85,247,0.2);
          transform: scale(1.05);
        }
      `}</style>

      <button
        className="theme-btn"
        onClick={handleClick}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span>{isDark ? '☀️' : '🌙'}</span>
        <span className="theme-btn-label">{isDark ? 'Light' : 'Dark'}</span>
      </button>
    </>
  )
}
