import { useEffect, useRef } from 'react'

// A drifting "embedding space": points orbit a few cluster centroids and link to
// close neighbours. The cursor acts like a query vector, lighting up what's near it.
export default function EmbeddingField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let raf = 0
    let running = true
    let colors = readColors()
    const pointer = { x: -9999, y: -9999 }

    const centroids = [
      { x: 0.72, y: 0.3, r: 0.16 },
      { x: 0.88, y: 0.66, r: 0.12 },
      { x: 0.55, y: 0.74, r: 0.13 },
      { x: 0.35, y: 0.22, r: 0.09 },
    ]

    let points = []

    function readColors() {
      const s = getComputedStyle(document.documentElement)
      return {
        ink: s.getPropertyValue('--ink').trim() || '#111',
        accent: s.getPropertyValue('--accent').trim() || '#ff6a3d',
      }
    }

    function seed() {
      const count = width < 640 ? 70 : 140
      points = Array.from({ length: count }, (_, i) => {
        const c = centroids[i % centroids.length]
        const angle = Math.random() * Math.PI * 2
        const dist = Math.sqrt(Math.random()) * c.r
        return {
          c,
          angle,
          dist,
          speed: (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? -1 : 1) * 0.0012,
          size: Math.random() * 1.4 + 0.8,
          x: 0,
          y: 0,
        }
      })
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function frame(t) {
      ctx.clearRect(0, 0, width, height)
      const scale = Math.min(width, height * 1.6)
      const linkDist = width < 640 ? 46 : 64

      for (const p of points) {
        p.angle += p.speed
        const wobble = Math.sin(t * 0.0004 + p.dist * 40) * 0.008
        p.x = p.c.x * width + Math.cos(p.angle) * (p.dist + wobble) * scale
        p.y = p.c.y * height + Math.sin(p.angle) * (p.dist + wobble) * scale * 0.8
      }

      ctx.lineWidth = 0.6
      for (let i = 0; i < points.length; i++) {
        const a = points[i]
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < linkDist) {
            ctx.globalAlpha = (1 - d / linkDist) * 0.22
            ctx.strokeStyle = colors.ink
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of points) {
        const dq = Math.hypot(p.x - pointer.x, p.y - pointer.y)
        const near = dq < 120
        if (near) {
          ctx.globalAlpha = (1 - dq / 120) * 0.7
          ctx.strokeStyle = colors.accent
          ctx.beginPath()
          ctx.moveTo(pointer.x, pointer.y)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
        ctx.globalAlpha = near ? 1 : 0.55
        ctx.fillStyle = near ? colors.accent : colors.ink
        ctx.beginPath()
        ctx.arc(p.x, p.y, near ? p.size + 1 : p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (running && !reduced) raf = requestAnimationFrame(frame)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      if (reduced) frame(0)
    }
    function onLeave() {
      pointer.x = pointer.y = -9999
      if (reduced) frame(0)
    }

    // Pause when the hero scrolls out of view.
    const io = new IntersectionObserver(([entry]) => {
      const wasRunning = running
      running = entry.isIntersecting
      if (running && !wasRunning && !reduced) raf = requestAnimationFrame(frame)
      if (!running) cancelAnimationFrame(raf)
    })
    io.observe(canvas)

    // Re-read colours when the theme flips.
    const mo = new MutationObserver(() => {
      colors = readColors()
      if (reduced) frame(0)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) frame(0)
    })
    ro.observe(canvas)

    const host = canvas.parentElement
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    resize()
    if (reduced) frame(0)
    else raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="field" aria-hidden="true" />
}
