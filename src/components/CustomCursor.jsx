import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const rafRef  = useRef(null)

  // Don't render on touch devices at all
  const isTouch = window.matchMedia('(pointer: coarse)').matches
  if (isTouch) return null

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    let mx = window.innerWidth / 2,  my = window.innerHeight / 2
    let rx = mx, ry = my
    let hovering = false

    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    // hover detection on interactive elements
    const addHover = el => {
      el.addEventListener('mouseenter', () => { hovering = true })
      el.addEventListener('mouseleave', () => { hovering = false })
    }
    const observe = new MutationObserver(() => {
      document.querySelectorAll('a,button,[data-cursor-hover]').forEach(addHover)
    })
    observe.observe(document.body, { childList: true, subtree: true })
    document.querySelectorAll('a,button,[data-cursor-hover]').forEach(addHover)

    function loop() {
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'

      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'

      if (hovering) {
        dot.style.width  = '5px'
        dot.style.height = '5px'
        ring.style.width  = '52px'
        ring.style.height = '52px'
        ring.style.borderColor = 'rgba(168,85,247,0.8)'
        ring.style.background  = 'rgba(168,85,247,0.04)'
      } else {
        dot.style.width  = '8px'
        dot.style.height = '8px'
        ring.style.width  = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = 'rgba(168,85,247,0.5)'
        ring.style.background  = 'transparent'
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    // hide default cursor globally
    document.documentElement.style.cursor = 'none'
    loop()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      observe.disconnect()
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99999,
        width: '8px', height: '8px', borderRadius: '50%',
        background: '#a855f7',
        boxShadow: '0 0 10px rgba(168,85,247,0.9), 0 0 20px rgba(168,85,247,0.4)',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.2s, height 0.2s',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99998,
        width: '36px', height: '36px', borderRadius: '50%',
        border: '1.5px solid rgba(168,85,247,0.5)',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.3s, height 0.3s, border-color 0.3s, background 0.3s',
      }} />
    </>
  )
}
