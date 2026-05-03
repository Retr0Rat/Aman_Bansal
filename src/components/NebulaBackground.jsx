import { useEffect, useRef } from 'react'

const ORB_DATA = [
  { depth: 0.018, speed: 0.7 },
  { depth: 0.012, speed: 1.1 },
  { depth: 0.022, speed: 0.9 },
  { depth: 0.015, speed: 1.3 },
  { depth: 0.020, speed: 0.8 },
]

const PARTICLE_COLORS = [
  'rgba(160,100,220,',
  'rgba(80,160,180,',
  'rgba(200,200,220,',
  'rgba(160,80,100,',
]

export default function NebulaBackground({ theme }) {
  const isLight = theme === 'light'
  const canvasRef = useRef(null)
  const orb1Ref   = useRef(null)
  const orb2Ref   = useRef(null)
  const orb3Ref   = useRef(null)
  const orb4Ref   = useRef(null)
  const orb5Ref   = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const orbEls = [orb1Ref, orb2Ref, orb3Ref, orb4Ref, orb5Ref].map(r => r.current)

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let mx = W / 2, my = H / 2
    let t  = 0

    // ── Particles ──
    class Particle {
      constructor() { this.init() }
      init() {
        this.ox = Math.random() * W
        this.oy = Math.random() * H
        this.x  = this.ox
        this.y  = this.oy
        this.vx = 0; this.vy = 0
        this.r  = Math.random() * 1.6 + 0.4
        this.baseOpacity = Math.random() * 0.55 + 0.15
        this.opacity = this.baseOpacity
        this.tw = Math.random() * Math.PI * 2
        this.ts = Math.random() * 0.012 + 0.003
        this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
        this.driftAngle = Math.random() * Math.PI * 2
        this.driftSpeed = Math.random() * 0.08 + 0.02
      }
      update() {
        this.tw += this.ts
        this.opacity = this.baseOpacity * (0.5 + 0.5 * Math.sin(this.tw))
        this.ox += Math.cos(this.driftAngle) * this.driftSpeed
        this.oy += Math.sin(this.driftAngle) * this.driftSpeed
        if (this.ox < 0) this.ox = W
        if (this.ox > W) this.ox = 0
        if (this.oy < 0) this.oy = H
        if (this.oy > H) this.oy = 0

        const dx = this.x - mx
        const dy = this.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const RADIUS = 120, FORCE = 2.8
        if (dist < RADIUS && dist > 0) {
          const strength = (1 - dist / RADIUS) * FORCE
          this.vx += (dx / dist) * strength
          this.vy += (dy / dist) * strength
          this.opacity = Math.min(1, this.opacity + (1 - dist / RADIUS) * 0.5)
        }
        this.vx += (this.ox - this.x) * 0.04
        this.vy += (this.oy - this.y) * 0.04
        this.vx *= 0.88; this.vy *= 0.88
        this.x += this.vx; this.y += this.vy
      }
      draw() {
        if (this.r > 1.2) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2)
          const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3)
          g.addColorStop(0, this.color + (this.opacity * 0.3) + ')')
          g.addColorStop(1, this.color + '0)')
          ctx.fillStyle = g; ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.fill()
      }
    }

    let particles = Array.from({ length: 180 }, () => new Particle())

    const onMouseMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      particles = Array.from({ length: 180 }, () => new Particle())
    }
    window.addEventListener('resize', onResize)

    // ── Loop ──
    function loop() {
      t += 0.008
      ctx.clearRect(0, 0, W, H)

      const cxv = W / 2, cyv = H / 2
      orbEls.forEach((el, i) => {
        const o = ORB_DATA[i]
        const fx = Math.sin(t * o.speed + i * 1.3) * 18
        const fy = Math.cos(t * o.speed * 0.7 + i * 0.9) * 14
        const px = (mx - cxv) * o.depth
        const py = (my - cyv) * o.depth
        el.style.transform = `translate(${px + fx}px,${py + fy}px)`
      })

      particles.forEach(p => { p.update(); p.draw() })
      rafRef.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // orb configs: [dark bg, light bg, dark opacity, light opacity]
  const orbs = [
    { size: '750px', darkBg: '#3b0764', lightBg: '#a855f7', dOp: 0.85, lOp: 0.32, top: '-220px', right: 'auto', bottom: 'auto', left: '-200px' },
    { size: '650px', darkBg: '#0d4a5c', lightBg: '#0ea5e9', dOp: 0.75, lOp: 0.25, top: '-100px', right: '-180px', bottom: 'auto', left: 'auto' },
    { size: '520px', darkBg: '#5c1a1a', lightBg: '#f59e0b', dOp: 0.65, lOp: 0.20, top: 'auto', right: 'auto', bottom: '-100px', left: '-80px' },
    { size: '480px', darkBg: '#2d1b5e', lightBg: '#8b5cf6', dOp: 0.55, lOp: 0.22, top: 'auto', right: '-60px', bottom: '-80px', left: 'auto' },
    { size: '380px', darkBg: '#0a3040', lightBg: '#06b6d4', dOp: 0.45, lOp: 0.18, top: '40%',  right: 'auto', bottom: 'auto', left: '45%' },
  ]
  const orbRefs = [orb1Ref, orb2Ref, orb3Ref, orb4Ref, orb5Ref]

  return (
    <>
      {/* Orbs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {orbs.map((o, i) => (
          <div
            key={i}
            ref={orbRefs[i]}
            style={orbStyle(
              o.size,
              `radial-gradient(circle,${isLight ? o.lightBg : o.darkBg},transparent 70%)`,
              isLight ? o.lOp : o.dOp,
              o.top, o.right, o.bottom, o.left
            )}
          />
        ))}
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: isLight ? 0.65 : 1 }}
      />
    </>
  )
}

function orbStyle(size, bg, opacity, top, right, bottom, left) {
  return {
    position: 'absolute',
    width: size, height: size,
    borderRadius: '50%',
    background: bg,
    opacity,
    top, right, bottom, left,
    filter: 'blur(120px)',
    willChange: 'transform',
  }
}
