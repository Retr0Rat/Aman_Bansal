import '../styles/nav.css'

const PAGES = ['Home', 'About', 'Projects', 'Contact']

export default function Nav({ currentPage, onNavigate }) {
  const currentIndex = PAGES.indexOf(currentPage)
  const total        = PAGES.length - 1
  const fillPct      = total === 0 ? 0 : (currentIndex / total) * 100

  function goTo(index) {
    if (index < 0 || index > total) return
    onNavigate(PAGES[index])
  }

  function handleDotClick(index, e) {
    const marker = e.currentTarget
    marker.classList.remove('burst-anim')
    void marker.offsetWidth
    marker.classList.add('burst-anim')
    setTimeout(() => marker.classList.remove('burst-anim'), 500)
    goTo(index)
  }

  return (
    <>
      {/* ── Desktop: right sidebar dots ── */}
      <nav className="nav-desktop fixed right-8 top-1/2 -translate-y-1/2 flex-col items-end z-50">

        {/* vertical progress track */}
        <div
          className="absolute right-[11px] top-3 bottom-3 w-[2px] rounded-full overflow-hidden"
          style={{ background: 'rgba(168,85,247,0.08)' }}
        >
          <div
            className="absolute top-0 left-0 right-0 rounded-full transition-all duration-500 ease-in-out"
            style={{
              height: `${fillPct}%`,
              background: 'linear-gradient(180deg, #000000 0%, #a855f7 100%)',
              boxShadow: '0 0 10px rgba(168,85,247,0.4)'
            }}
          />
        </div>

        {PAGES.map((page, i) => {
          const isActive = page === currentPage
          return (
            <div
              key={page}
              className={`s-marker relative flex items-center justify-end gap-3 cursor-pointer py-3 group ${isActive ? 'active' : ''}`}
              onClick={e => handleDotClick(i, e)}
            >
              <span
                className="text-[11px] font-semibold tracking-[0.18em] uppercase pointer-events-none
                           opacity-0 translate-x-2 transition-all duration-250 ease-out whitespace-nowrap
                           group-hover:opacity-100 group-hover:translate-x-0"
                style={{
                  color:     isActive ? '#a855f7' : 'var(--text-secondary)',
                  opacity:   isActive ? 1 : undefined,
                  transform: isActive ? 'translateX(0)' : undefined
                }}
              >
                {page}
              </span>

              <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
                <div className="ripple absolute inset-0 rounded-full border border-transparent" />
                <div className="ripple absolute inset-0 rounded-full border border-transparent" />
                <div className="ripple absolute inset-0 rounded-full border border-transparent" />
                <div className="burst absolute inset-[-8px] rounded-full border-2 border-purple-500 opacity-0 pointer-events-none" />
                <div
                  className="relative z-10 w-2 h-2 rounded-full border-2 transition-all duration-300"
                  style={isActive ? {
                    background: '#a855f7',
                    borderColor: '#a855f7',
                    transform: 'scale(1.4)',
                    boxShadow: '0 0 0 3px rgba(168,85,247,0.15), 0 0 16px rgba(168,85,247,0.5)'
                  } : {
                    background: 'var(--text-muted)',
                    borderColor: 'var(--border)'
                  }}
                />
              </div>
            </div>
          )
        })}
      </nav>

    </>
  )
}
