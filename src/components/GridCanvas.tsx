import { useEffect, useRef } from 'react'

const CELL = 48
const X_OFFSET = 24 // .bg-grid is shifted 24px on x
const TEAL = '14, 107, 87'

type Cell = { cx: number; cy: number; born: number; life: number; peak: number }
type Ripple = { x: number; y: number; born: number }

/**
 * Grid life. Mount inside a `relative` `.bg-grid` container.
 * A tap or click sends a ripple outward that lights the cells it passes; on touch devices
 * cells also twinkle sparsely on their own. Draws only while the section is on screen.
 */
export function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Fine pointers already have the cursor spotlight; only touch gets the ambient twinkles.
    const ambient = !window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const cells: Cell[] = []
    const ripples: Ripple[] = []
    let raf = 0
    let visible = false
    let last = performance.now()

    const spawnTwinkle = (now: number) => {
      const cols = Math.ceil(w / CELL) + 1
      const rows = Math.ceil(h / CELL) + 1
      cells.push({
        cx: Math.floor(Math.random() * cols),
        cy: Math.floor(Math.random() * rows),
        born: now,
        life: 2200 + Math.random() * 2200,
        peak: 0.07 + Math.random() * 0.08,
      })
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      // Clamp the delta so a paused tab or a long time off-screen never produces a burst.
      const dt = Math.min(now - last, 50)
      last = now
      if (!visible) return

      ctx.clearRect(0, 0, w, h)

      // Ambient: roughly one new twinkle every ~1.2s, at most 4 alive. Quiet by design.
      if (ambient && cells.length < 4 && Math.random() < dt / 1200) spawnTwinkle(now)

      for (let i = cells.length - 1; i >= 0; i--) {
        const c = cells[i]
        const t = (now - c.born) / c.life
        if (t >= 1) {
          cells.splice(i, 1)
          continue
        }
        const a = c.peak * Math.sin(t * Math.PI)
        ctx.fillStyle = `rgba(${TEAL}, ${a})`
        ctx.fillRect(c.cx * CELL + X_OFFSET + 1, c.cy * CELL + 1, CELL - 1, CELL - 1)
      }

      // Ripples: a ring expanding at ~650px/s, ~140px thick, fading over 1.8s.
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        const age = (now - r.born) / 1000
        if (age > 1.8) {
          ripples.splice(i, 1)
          continue
        }
        const radius = age * 650
        const fade = 1 - age / 1.8
        const cols = Math.ceil(w / CELL) + 1
        const rows = Math.ceil(h / CELL) + 1
        for (let cy = 0; cy < rows; cy++) {
          for (let cx = 0; cx < cols; cx++) {
            const px = cx * CELL + X_OFFSET + CELL / 2
            const py = cy * CELL + CELL / 2
            const d = Math.hypot(px - r.x, py - r.y)
            const k = 1 - Math.abs(d - radius) / 140
            if (k <= 0) continue
            ctx.fillStyle = `rgba(${TEAL}, ${0.5 * k * k * fade})`
            ctx.fillRect(px - CELL / 2 + 1, py - CELL / 2 + 1, CELL - 1, CELL - 1)
          }
        }
        // Bright ring on the lines themselves.
        ctx.strokeStyle = `rgba(${TEAL}, ${0.6 * fade})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // One continuous loop; off-screen frames are skipped, and the canvas is wiped on resume so
    // nothing stale (a half-faded ripple, expired cells) is ever shown.
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (!visible) {
          ctx.clearRect(0, 0, w, h)
          cells.length = 0
          ripples.length = 0
        } else {
          last = performance.now()
        }
      },
      { threshold: 0 },
    )
    io.observe(parent)
    raf = requestAnimationFrame(draw)

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const rect = parent.getBoundingClientRect()
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, born: performance.now() })
    }
    parent.addEventListener('pointerdown', onDown, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      parent.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0" />
}
