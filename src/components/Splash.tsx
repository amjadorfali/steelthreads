import { useEffect, useState } from 'react'
import { SLAB_LOWER, SLAB_UPPER, THREAD_PATH } from './Mark'

const THREAD_LEN = 538 // measured via getTotalLength()
const TOTAL = 1550 // draw + retract + assemble, before the curtain lifts
const FADE = 400

/**
 * First-paint splash: the thread draws through the channel, the slab closes
 * around it, the terminal lands, then the whole curtain lifts to reveal the page.
 * Skipped entirely under prefers-reduced-motion.
 */
export function Splash() {
  const [show, setShow] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!show) return
    // Lock scroll while the curtain is up.
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setLeaving(true), TOTAL)
    const t2 = setTimeout(() => setShow(false), TOTAL + FADE)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = prev
    }
  }, [show])

  if (!show) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-50 grid place-items-center bg-paper"
      style={{
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE}ms cubic-bezier(0.23,1,0.32,1)`,
        pointerEvents: leaving ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes sp-draw { to { stroke-dashoffset: 0; } }
        /* Past zero the dash keeps travelling, so the line retracts left-to-right
           and collapses into a round cap exactly on the terminal. */
        @keyframes sp-retract { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -${THREAD_LEN}; } }
        @keyframes sp-in { to { opacity: 1; transform: translateY(0); } }
        @keyframes sp-pop { to { opacity: 1; transform: scale(1); } }
        .sp-thread { stroke-dasharray: ${THREAD_LEN}; stroke-dashoffset: ${THREAD_LEN};
          animation: sp-draw 600ms cubic-bezier(0.23,1,0.32,1) 80ms forwards,
                     sp-retract 450ms cubic-bezier(0.65,0,0.35,1) 700ms forwards; }
        .sp-slab { opacity: 0; }
        .sp-upper { transform: translateY(-20px); animation: sp-in 450ms cubic-bezier(0.23,1,0.32,1) 750ms forwards; }
        .sp-lower { transform: translateY(20px);  animation: sp-in 450ms cubic-bezier(0.23,1,0.32,1) 750ms forwards; }
        .sp-dot { opacity: 0; transform: scale(0.4); transform-origin: 454px 324px;
          animation: sp-pop 380ms cubic-bezier(0.34,1.56,0.64,1) 1080ms forwards; }
      `}</style>

      <svg viewBox="0 0 512 512" className="h-24 w-24 text-ink sm:h-28 sm:w-28">
        <path
          className="sp-thread"
          d={THREAD_PATH}
          fill="none"
          stroke="var(--accent-text)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path className="sp-slab sp-upper" fill="currentColor" d={SLAB_UPPER} />
        <path className="sp-slab sp-lower" fill="currentColor" d={SLAB_LOWER} />
        <circle className="sp-dot" fill="var(--accent-text)" cx="454" cy="324" r="18" />
      </svg>
    </div>
  )
}
