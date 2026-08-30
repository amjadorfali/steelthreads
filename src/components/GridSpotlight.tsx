import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import { GridCanvas } from './GridCanvas'

type Props = {
  /** Also snap-highlight the 48px cell under the cursor. */
  cell?: boolean
}

const OFF = -9999

/**
 * Mouse-reactive layer for `.bg-grid` sections. Mount it as the first child of a
 * `relative` container; it listens on the parent and writes CSS variables directly,
 * so the React tree never re-renders on pointer movement. The spotlight trails the
 * pointer on a spring (decorative motion needs momentum); the cell snaps instantly.
 */
export function GridSpotlight({ cell = false }: Props) {
  const spotRef = useRef<HTMLDivElement>(null)
  const cellRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(OFF)
  const rawY = useMotionValue(OFF)
  const x = useSpring(rawX, { stiffness: 260, damping: 28, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    const spot = spotRef.current
    const parent = spot?.parentElement
    if (!spot || !parent) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Gate on the actual pointer type per event (not a media query) so a real mouse works even
    // inside touch emulation such as Chrome's device mode.

    const cellEl = cellRef.current
    const unsubX = x.on('change', (v) => spot.style.setProperty('--mx', `${v}px`))
    const unsubY = y.on('change', (v) => spot.style.setProperty('--my', `${v}px`))

    const local = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect()
      return { px: e.clientX - r.left, py: e.clientY - r.top }
    }
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      // Start the spring at the pointer, not from off-screen.
      const { px, py } = local(e)
      x.jump(px)
      y.jump(py)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const { px, py } = local(e)
      rawX.set(px)
      rawY.set(py)
      if (cellEl) {
        // Grid is offset 24px on x (see .bg-grid), so snap relative to that origin.
        const cx = Math.floor((px - 24) / 48) * 48 + 24
        const cy = Math.floor(py / 48) * 48
        cellEl.style.setProperty('--cx', `${cx}px`)
        cellEl.style.setProperty('--cy', `${cy}px`)
        cellEl.style.setProperty('--co', '1')
      }
    }
    const leave = () => {
      x.jump(OFF)
      y.jump(OFF)
      rawX.set(OFF)
      rawY.set(OFF)
      cellEl?.style.setProperty('--co', '0')
    }

    parent.addEventListener('pointerenter', enter)
    parent.addEventListener('pointermove', move)
    parent.addEventListener('pointerleave', leave)
    return () => {
      unsubX()
      unsubY()
      parent.removeEventListener('pointerenter', enter)
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerleave', leave)
    }
  }, [x, y, rawX, rawY])

  return (
    <>
      {cell && (
        <div
          ref={cellRef}
          aria-hidden
          className="grid-cell pointer-events-none absolute top-0 left-0 h-12 w-12 bg-accent-soft"
        />
      )}
      <div ref={spotRef} aria-hidden className="grid-spot pointer-events-none absolute inset-0" />
      {/* Touch devices: twinkling cells + tap ripples (no-op wherever a fine pointer exists). */}
      <GridCanvas />
    </>
  )
}
