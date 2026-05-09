import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import ThemeToggle from './components/ThemeToggle'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ResumePage from './components/ResumePage'
import NebulaBackground from './components/NebulaBackground'
import CustomCursor from './components/CustomCursor'

const PAGES = ['Home', 'About', 'Projects', 'Contact']

/* Walk DOM upward to find a scrollable ancestor (used for Contact mobile scroll) */
function findScrollableParent(el) {
  while (el && el !== document.documentElement) {
    if (el === document.body) break
    const { overflowY } = window.getComputedStyle(el)
    if (overflowY === 'auto' || overflowY === 'scroll') {
      if (el.scrollHeight > el.clientHeight + 2 || el.scrollTop > 0) return el
    }
    el = el.parentElement
  }
  return null
}

function PageContent({ page, onNavigate, theme, onShowResume }) {
  if (page === 'Home')     return <Hero onNavigate={onNavigate} theme={theme} onShowResume={onShowResume} />
  if (page === 'About')    return <About theme={theme} />
  if (page === 'Projects') return <Projects theme={theme} />
  if (page === 'Contact')  return <Contact theme={theme} />
  return null
}

export default function App() {
  const [loaded, setLoaded]         = useState(() => !!localStorage.getItem('visited'))
  const [currentPage, setPage]      = useState('Home')
  const [theme, setTheme]           = useState('dark')
  const [showResume, setShowResume] = useState(false)

  const containerRef     = useRef(null)
  const pageRefs         = useRef({})
  const currentIdxRef    = useRef(0)        // numeric index — always in sync with currentPage
  const isTransitioning  = useRef(false)
  const wheelAccumulator = useRef(0)
  const showResumeRef    = useRef(false)
  const touchRef         = useRef(null)     // mobile drag state
  const lastTransitionTS = useRef(0)        // mobile cooldown timestamp

  /* Apply theme synchronously — no flash */
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  /* ─────────────────────────────────────────────
     Core animated transition
     dir = 1  → going forward  (outgoing slides UP,   incoming enters from BELOW)
     dir = -1 → going backward (outgoing slides DOWN,  incoming enters from ABOVE)
  ───────────────────────────────────────────── */
  function goToPage(targetIdx) {
    if (targetIdx < 0 || targetIdx >= PAGES.length) return
    if (targetIdx === currentIdxRef.current) return
    if (isTransitioning.current) return

    isTransitioning.current  = true
    wheelAccumulator.current = 0

    const fromIdx = currentIdxRef.current
    const dir     = targetIdx > fromIdx ? 1 : -1

    const outEl = pageRefs.current[PAGES[fromIdx]]
    const inEl  = pageRefs.current[PAGES[targetIdx]]

    /* Outgoing page */
    if (outEl) {
      outEl.style.transition    = 'opacity 600ms ease-in-out, transform 600ms ease-in-out'
      outEl.style.opacity       = '0'
      outEl.style.transform     = dir > 0 ? 'translateY(-40px)' : 'translateY(40px)'
      outEl.style.zIndex        = '15'
      outEl.style.pointerEvents = 'none'
    }

    /* Incoming page — set start position first, then animate in */
    if (inEl) {
      inEl.style.transition = 'none'
      inEl.style.opacity    = '0'
      inEl.style.transform  = dir > 0 ? 'translateY(40px)' : 'translateY(-40px)'
      inEl.style.zIndex     = '20'
      inEl.style.pointerEvents = 'none'
      /* Two rAFs: first commits the "before" state, second triggers the transition */
      requestAnimationFrame(() => requestAnimationFrame(() => {
        inEl.style.transition    = 'opacity 600ms ease-in-out, transform 600ms ease-in-out'
        inEl.style.opacity       = '1'
        inEl.style.transform     = 'none'
        inEl.style.pointerEvents = 'auto'
      }))
    }

    currentIdxRef.current = targetIdx
    setPage(PAGES[targetIdx])

    /* Unlock + tidy outgoing layer after animation completes */
    setTimeout(() => {
      isTransitioning.current = false
      if (outEl) {
        outEl.style.transition = 'none'
        outEl.style.opacity    = '0'
        outEl.style.transform  = 'translateY(40px)'
        outEl.style.zIndex     = '10'
      }
    }, 900)
  }

  /* Alias used by Nav and Hero "Get In Touch" links */
  function navigate(page) {
    goToPage(PAGES.indexOf(page))
  }

  /* ─── Initialise page layer styles once loader finishes ─── */
  useEffect(() => {
    if (!loaded) return
    PAGES.forEach((p, i) => {
      const el = pageRefs.current[p]
      if (!el) return
      el.style.opacity       = i === 0 ? '1' : '0'
      el.style.transform     = i === 0 ? 'none' : 'translateY(40px)'
      el.style.zIndex        = i === 0 ? '20' : '10'
      el.style.pointerEvents = i === 0 ? 'auto' : 'none'
      el.style.willChange    = 'transform, opacity'
    })
  }, [loaded])

  /* ─────────────────────────────────────────────
     DESKTOP — wheel navigation
     Registered in CAPTURE phase so it fires before any inner
     stopPropagation() calls (e.g. Projects pane onWheel).
     e.preventDefault() is always called to prevent browser scroll.
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (!loaded) return

    function onWheel(e) {
      if (showResumeRef.current) return

      /* If a drawer/modal is open, let wheel events pass through to it,
         but block them from the backdrop (prevent background page scroll) */
      if (document.querySelector('.proj-drawer--open')) {
        if (!e.target.closest('.proj-drawer-body')) e.preventDefault()
        return  // never trigger page transitions while drawer is open
      }

      /* Always prevent default — stops inner overflow containers scrolling */
      e.preventDefault()

      if (isTransitioning.current) return

      wheelAccumulator.current += e.deltaY

      if (Math.abs(wheelAccumulator.current) >= 80) {
        const dir = wheelAccumulator.current > 0 ? 1 : -1
        wheelAccumulator.current = 0
        goToPage(currentIdxRef.current + dir)
      }
    }

    /* capture: true — fires before any inner handler can stopPropagation */
    document.addEventListener('wheel', onWheel, { capture: true, passive: false })
    return () => document.removeEventListener('wheel', onWheel, { capture: true })
  }, [loaded])

  /* ─── Keyboard navigation ─── */
  useEffect(() => {
    if (!loaded) return

    function onKey(e) {
      if (showResumeRef.current) return
      if (isTransitioning.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goToPage(currentIdxRef.current + 1)
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goToPage(currentIdxRef.current - 1)
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [loaded])

  /* ─────────────────────────────────────────────
     MOBILE — non-passive touchmove for live drag preview
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (!loaded) return
    const container = containerRef.current
    if (!container) return

    function handleTouchMove(e) {
      const ts = touchRef.current
      if (!ts) return
      if (showResumeRef.current) return
      if (window.innerWidth >= 1024) return

      const rawDy = ts.startY - e.touches[0].clientY
      const rawDx = ts.startX - e.touches[0].clientX

      /* Primarily horizontal — cancel swipe tracking */
      if (!ts.dragging && Math.abs(rawDx) > Math.abs(rawDy) + 5) {
        touchRef.current = null
        return
      }

      /* If inside a scrollable container (e.g. About / Contact), let it scroll
         until the user reaches the boundary, then take over for page transition.
         Sign convention: rawDy = startY − currentY
           rawDy > 0  →  finger moved UP   →  want next page (need atBottom)
           rawDy < 0  →  finger moved DOWN →  want prev page (need atTop)   */
      if (!ts.dragging && ts.scrollEl) {
        const el       = ts.scrollEl
        const atTop    = el.scrollTop <= 0
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
        if (rawDy > 0 && !atBottom) return   // can still scroll down — not at bottom yet
        if (rawDy < 0 && !atTop)    return   // can still scroll up   — not at top yet
      }

      ts.dragging = true
      ts.lastDy   = rawDy
      ts.lastTime = e.timeStamp
      e.preventDefault()   // prevent browser scroll during vertical drag

      const vh     = window.innerHeight
      const curIdx = currentIdxRef.current

      /* Remove transitions — follow finger in real time */
      PAGES.forEach(p => {
        const el = pageRefs.current[p]
        if (el) el.style.transition = 'none'
      })

      /* Current page follows finger */
      const curEl = pageRefs.current[PAGES[curIdx]]
      if (curEl) curEl.style.transform = `translateY(${-rawDy}px)`

      /* Adjacent page peeks in */
      if (rawDy > 0 && curIdx < PAGES.length - 1) {
        /* Dragging up → next page peeks from bottom */
        const nxtEl = pageRefs.current[PAGES[curIdx + 1]]
        if (nxtEl) {
          nxtEl.style.opacity       = '1'
          nxtEl.style.transform     = `translateY(${vh - rawDy}px)`
          nxtEl.style.zIndex        = '15'
          nxtEl.style.pointerEvents = 'none'
        }
      } else if (rawDy < 0 && curIdx > 0) {
        /* Dragging down → prev page peeks from top */
        const prvEl = pageRefs.current[PAGES[curIdx - 1]]
        if (prvEl) {
          prvEl.style.opacity       = '1'
          prvEl.style.transform     = `translateY(${-vh - rawDy}px)`
          prvEl.style.zIndex        = '15'
          prvEl.style.pointerEvents = 'none'
        }
      }
    }

    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => container.removeEventListener('touchmove', handleTouchMove)
  }, [loaded])

  function onTouchStart(e) {
    if (showResumeRef.current) return
    if (window.innerWidth >= 1024) return
    if (isTransitioning.current) return
    if (document.querySelector('.proj-drawer--open')) return  // drawer open — block page swipes
    const touch = e.touches[0]
    touchRef.current = {
      startY:    touch.clientY,
      startX:    touch.clientX,
      startTime: e.timeStamp,
      lastDy:    0,
      lastTime:  e.timeStamp,
      dragging:  false,
      scrollEl:  findScrollableParent(e.target),   // detect Contact's inner scroll
    }
  }

  function onTouchEnd() {
    const ts = touchRef.current
    touchRef.current = null
    if (!ts || !ts.dragging) return

    const dy       = ts.lastDy
    const dt       = Math.max(ts.lastTime - ts.startTime, 1)
    const vel      = Math.abs(dy) / dt   // px / ms
    const scrollEl = ts.scrollEl         // saved before ts reference is gone

    const THRESHOLD  = 60    // px
    const VEL_THRESH = 0.4   // px/ms
    const COOLDOWN   = 300   // ms between transitions

    const now    = Date.now()
    const curIdx = currentIdxRef.current

    /* Cooldown guard — prevent accidental double-swipe */
    if (now - lastTransitionTS.current < COOLDOWN) {
      resetMobileSnap(curIdx)
      return
    }

    /* Scroll boundary check — mirrors the touchmove guard */
    const atScrollBottom = scrollEl
      ? scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 5
      : true
    const atScrollTop = scrollEl
      ? scrollEl.scrollTop <= 5
      : true

    const goNext = (dy > THRESHOLD || vel > VEL_THRESH) && dy > 0 && curIdx < PAGES.length - 1 && atScrollBottom
    const goPrev = (Math.abs(dy) > THRESHOLD || vel > VEL_THRESH) && dy < 0 && curIdx > 0 && atScrollTop

    if (goNext) {
      lastTransitionTS.current = now
      commitMobileNav(curIdx, curIdx + 1)
    } else if (goPrev) {
      lastTransitionTS.current = now
      commitMobileNav(curIdx, curIdx - 1)
    } else {
      resetMobileSnap(curIdx)
    }
  }

  /* Commit a mobile swipe — sliding pages to final positions */
  function commitMobileNav(fromIdx, toIdx) {
    if (isTransitioning.current) return
    isTransitioning.current  = true
    wheelAccumulator.current = 0

    const dir    = toIdx > fromIdx ? 1 : -1
    const vh     = window.innerHeight
    const fromEl = pageRefs.current[PAGES[fromIdx]]
    const toEl   = pageRefs.current[PAGES[toIdx]]

    if (fromEl) {
      fromEl.style.transition    = 'transform 600ms ease-in-out, opacity 600ms ease-in-out'
      fromEl.style.transform     = `translateY(${dir > 0 ? -vh : vh}px)`
      fromEl.style.opacity       = '0'
      fromEl.style.pointerEvents = 'none'
    }
    if (toEl) {
      toEl.style.transition    = 'transform 600ms ease-in-out, opacity 600ms ease-in-out'
      toEl.style.transform     = 'translateY(0)'
      toEl.style.opacity       = '1'
      toEl.style.zIndex        = '20'
      toEl.style.pointerEvents = 'auto'
    }

    /* Reset About scroll to top whenever navigating away from or to it */
    const ABOUT_IDX = 1  // PAGES index for About
    if (fromIdx === ABOUT_IDX) {
      const el = document.querySelector('.about-scroll-wrapper')
      if (el) el.scrollTop = 0
    }
    if (toIdx === ABOUT_IDX) {
      setTimeout(() => {
        const el = document.querySelector('.about-scroll-wrapper')
        if (el) el.scrollTop = 0
      }, 10)
    }

    /* All other pages snap hidden immediately */
    PAGES.forEach((p, i) => {
      if (i !== fromIdx && i !== toIdx) {
        const el = pageRefs.current[p]
        if (el) {
          el.style.transition    = 'none'
          el.style.opacity       = '0'
          el.style.transform     = 'translateY(40px)'
          el.style.zIndex        = '10'
          el.style.pointerEvents = 'none'
        }
      }
    })

    currentIdxRef.current = toIdx
    setPage(PAGES[toIdx])

    setTimeout(() => {
      isTransitioning.current = false
      if (fromEl) {
        fromEl.style.transition = 'none'
        fromEl.style.opacity    = '0'
        fromEl.style.transform  = 'translateY(40px)'
        fromEl.style.zIndex     = '10'
      }
    }, 900)
  }

  /* Snap back to current page when swipe didn't reach threshold */
  function resetMobileSnap(curIdx) {
    const curEl = pageRefs.current[PAGES[curIdx]]
    if (curEl) {
      curEl.style.transition = 'transform 400ms ease-out, opacity 400ms ease-out'
      curEl.style.transform  = 'none'
      curEl.style.opacity    = '1'
    }
    PAGES.forEach((p, i) => {
      if (i !== curIdx) {
        const el = pageRefs.current[p]
        if (el) {
          el.style.transition    = 'transform 400ms ease-out'
          el.style.opacity       = '0'
          el.style.transform     = 'translateY(40px)'
          el.style.zIndex        = '10'
          el.style.pointerEvents = 'none'
        }
      }
    })
  }

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <CustomCursor />
      <NebulaBackground theme={theme} />

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {!loaded && (
        <Loader onComplete={() => { localStorage.setItem('visited', '1'); setLoaded(true) }} />
      )}

      {/* ── Page layers ── */}
      {loaded && PAGES.map(page => (
        <div
          key={page}
          ref={el => { pageRefs.current[page] = el }}
          className="absolute inset-0 page-layer"
          style={{
            opacity:       page === 'Home' ? 1 : 0,
            transform:     page === 'Home' ? 'none' : 'translateY(40px)',
            zIndex:        page === 'Home' ? 20 : 10,
            pointerEvents: page === 'Home' ? 'auto' : 'none',
            willChange:    'transform, opacity',
          }}
        >
          <PageContent
            page={page}
            onNavigate={navigate}
            theme={theme}
            onShowResume={() => { showResumeRef.current = true; setShowResume(true) }}
          />
        </div>
      ))}

      {/* Page-layer overflow: hidden on desktop (clips off-screen pages), visible on
          mobile so inner overflow-y-auto containers can actually scroll */}
      <style>{`
        .page-layer { overflow: hidden; }
        @media (max-width: 767px) { .page-layer { overflow: visible; } }
      `}</style>

      {loaded && (
        <>
          <ThemeToggle theme={theme} onToggle={toggleTheme} hidden={showResume} />
          <Nav currentPage={currentPage} onNavigate={navigate} />
          {showResume && (
            <ResumePage
              theme={theme}
              onClose={() => { showResumeRef.current = false; setShowResume(false) }}
            />
          )}
        </>
      )}
    </div>
  )
}
