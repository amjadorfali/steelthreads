import { useScroll, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'
import { Mark } from './Mark'

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <header
      className="sticky top-0 z-20 border-b bg-paper/85 backdrop-blur transition-[border-color] duration-300"
      style={{ borderColor: scrolled ? 'var(--line)' : 'transparent' }}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-16">
        <a href="#" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <Mark size={26} />
          <span>
            Steel<span className="text-accent-text">Threads</span>
          </span>
        </a>
        <a
          href="#contact"
          className="font-mono text-xs tracking-[0.08em] text-accent-text uppercase border-b border-accent-text pb-0.5 transition-colors hover:text-ink hover:border-ink"
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
