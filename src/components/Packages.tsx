import { Check } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode, type RefObject } from 'react'
import { packages, type Package } from '../content'

const perms = [
  ['Warehouse', 'Edit', 'View', '—'],
  ['Sales', 'Edit', 'Edit', '—'],
  ['Owner', 'Edit', 'Edit', 'Edit'],
]

function PermsTable() {
  return (
    <div aria-hidden className="w-full max-w-[440px] overflow-hidden rounded-[10px] border border-line bg-paper">
      <div className="grid grid-cols-4 gap-2 border-b border-line-soft px-4 py-3 font-mono text-[10px] tracking-[0.1em] text-muted">
        <div>ROLE</div>
        <div>ORDERS</div>
        <div>REPORTS</div>
        <div>STAFF</div>
      </div>
      {perms.map((row, i) => (
        <div key={row[0]} className={`grid grid-cols-4 gap-2 px-4 py-3 text-[13px] ${i === 1 ? 'bg-ink/[0.025]' : ''}`}>
          <div>{row[0]}</div>
          {row.slice(1).map((v, j) => (
            <div key={j} className={v === 'Edit' ? 'text-accent-text' : v === 'View' ? 'text-muted' : 'text-muted/50'}>
              {v}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function SyncDiagram() {
  return (
    <svg aria-hidden viewBox="0 0 400 88" className="h-auto w-full max-w-[440px] stroke-ink" fill="none" strokeWidth="1.4">
      <rect x="8" y="24" width="96" height="40" rx="6" />
      <text x="56" y="49" textAnchor="middle" className="fill-ink font-mono text-[12px]" stroke="none">
        ERP
      </text>
      <rect x="296" y="24" width="96" height="40" rx="6" />
      <text x="344" y="49" textAnchor="middle" className="fill-ink font-mono text-[11px]" stroke="none">
        WAREHOUSE
      </text>
      <path d="M104 36 H 296" className="stroke-accent-text" strokeDasharray="4 4" />
      <path d="M296 52 H 104" className="stroke-accent-text" strokeDasharray="4 4" />
      <path d="M290 32 l6 4 -6 4" className="stroke-accent-text" />
      <path d="M110 48 l-6 4 6 4" className="stroke-accent-text" />
      <text x="200" y="18" textAnchor="middle" className="fill-muted font-mono text-[10px]" stroke="none" letterSpacing="1">
        EVERY 15 MIN
      </text>
    </svg>
  )
}

function PhoneCrop() {
  return (
    <div
      aria-hidden
      className="flex h-[220px] w-[220px] flex-col gap-3 overflow-hidden rounded-t-[30px] border border-b-0 border-line bg-paper px-5 pt-8"
    >
      <div className="text-sm font-semibold">Delivery run</div>
      <div className="h-9 rounded-md border border-accent-text/30 bg-accent-soft" />
      <div className="h-9 rounded-md bg-ink/5" />
      <div className="h-9 rounded-md bg-ink/5" />
      <div className="h-9 rounded-md bg-ink/5" />
    </div>
  )
}

const visuals: Record<string, ReactNode> = {
  'Internal Ops Tools': <PermsTable />,
  'Integrations & Data Sync': <SyncDiagram />,
  'Web & Mobile Apps': <PhoneCrop />,
}

// Sticky offset below the 64px nav; each later card peeks 12px lower so the stack edges show.
const TOP = 88
const PEEK = 12

function StackCard({
  pkg,
  index,
  cardRef,
  nextRef,
}: {
  pkg: Package
  index: number
  cardRef: RefObject<HTMLElement | null>
  nextRef?: RefObject<HTMLElement | null>
}) {
  const reduce = useReducedMotion()

  // Shrink this card as the NEXT card travels from the viewport bottom up to the pin line.
  const { scrollYProgress } = useScroll({ target: nextRef, offset: ['start end', `start ${TOP}px`] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  // Dim with an opaque paper overlay, not element opacity, so cards underneath never bleed through.
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.5])
  const animate = !reduce && !!nextRef

  return (
    <motion.article
      ref={cardRef}
      className="sticky mb-6 grid grid-cols-1 gap-10 overflow-hidden rounded-2xl border border-line bg-paper-2 p-7 shadow-[0_30px_60px_-40px_var(--shadow-tint)] last:mb-0 lg:grid-cols-12 lg:gap-8 lg:p-12"
      style={{
        top: TOP + index * PEEK,
        transformOrigin: 'top center',
        scale: animate ? scale : 1,
      }}
    >
      {animate && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-paper" style={{ opacity: veil }} />
      )}
      <div className="flex flex-col gap-5 lg:col-span-7">
        <h3 className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.025em]">{pkg.title}</h3>
        <p className="max-w-[520px] text-lg leading-relaxed text-muted text-pretty">{pkg.description}</p>
        <ul className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
          {pkg.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <Check size={14} weight="bold" className="mt-1 shrink-0 text-accent-text" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="mt-2 self-start border-b border-accent-text/40 pb-0.5 text-sm font-medium text-accent-text transition-colors hover:border-accent-text"
        >
          {pkg.price} →
        </a>
      </div>
      <div className="flex items-end justify-center lg:col-span-5 lg:justify-end">{visuals[pkg.title]}</div>
    </motion.article>
  )
}

export function Packages() {
  const refs = packages.map(() => useRef<HTMLElement>(null))
  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-24 lg:px-16 lg:pt-32">
        <div className="mb-12 flex items-center gap-3">
          <span className="h-[9px] w-[9px] rounded-full bg-accent" aria-hidden />
          <h2 className="font-mono text-xs tracking-[0.12em] text-muted uppercase">What we build</h2>
        </div>
        <div>
          {packages.map((p, i) => (
            <StackCard key={p.title} pkg={p} index={i} cardRef={refs[i]} nextRef={refs[i + 1]} />
          ))}
        </div>
      </div>
    </section>
  )
}
