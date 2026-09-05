import { motion, useReducedMotion } from 'motion/react'
import { contact, hero } from '../content'
import { GridSpotlight } from './GridSpotlight'

const rows = [
  { id: '#48211', customer: 'Dbayeh Pharmacy', items: 24, status: 'Packed', tone: 'ok', time: '09:42' },
  { id: '#48210', customer: 'Al Sabbah Trading', items: 112, status: 'Picking', tone: 'neutral', time: '09:31' },
  { id: '#48209', customer: 'Riyadh Depot', items: 8, status: 'Hold', tone: 'warn', time: '09:05' },
  { id: '#48208', customer: 'Beirut Souks Outlet', items: 40, status: 'Shipped', tone: 'ok', time: '08:50' },
] as const

const tone = {
  ok: 'bg-accent-soft text-accent-text',
  neutral: 'bg-ink/8 text-ink',
  warn: 'bg-amber-700/12 text-amber-800 dark:text-amber-400',
}

export function Hero() {
  const reduce = useReducedMotion()
  // Reduced motion keeps a short fade (no movement) so the hero never teleports in.
  const enter = (i: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2, ease: 'easeOut' as const },
        }
      : {
          initial: { opacity: 0, transform: 'translateY(18px)' },
          animate: { opacity: 1, transform: 'translateY(0px)' },
          transition: { duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.23, 1, 0.32, 1] as const },
        }

  return (
    <section className="bg-grid relative overflow-hidden">
      <GridSpotlight cell />

      {/* Sample ops dashboard, cropped like an instrument on a bench. Sample data. */}
      <motion.div
        {...enter(0)}
        aria-hidden
        className="relative mx-auto mt-8 hidden h-[260px] max-w-[1040px] overflow-hidden rounded-t-[10px] border border-b-0 border-line bg-paper-2 shadow-[0_30px_60px_-30px_var(--shadow-tint)] md:block"
      >
        <div className="flex h-[400px]">
          <div className="flex w-[200px] flex-col gap-1.5 border-r border-line-soft p-5 text-[13px]">
            <div className="mb-2.5 font-mono text-[10px] tracking-[0.1em] text-muted">OPERATIONS</div>
            <div className="rounded-md bg-accent-soft px-2.5 py-2 font-medium text-accent-text">Orders</div>
            {['Dispatch', 'Inventory', 'Reports', 'Staff & roles'].map((s) => (
              <div key={s} className="px-2.5 py-2">
                {s}
              </div>
            ))}
          </div>
          <div className="flex grow flex-col gap-3.5 p-5 pr-6">
            <div className="flex items-center justify-between">
              <div className="text-[15px] font-semibold tracking-tight">Orders · Today</div>
              <div className="flex gap-2 font-mono text-[11px]">
                <div className="rounded-md border border-line px-2.5 py-1.5 text-muted">Filter</div>
                <div className="rounded-md bg-accent px-2.5 py-1.5 text-accent-fg">New order</div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 border-b border-line-soft px-2 pb-2 font-mono text-[11px] text-muted">
              <div>ORDER</div>
              <div>CUSTOMER</div>
              <div>ITEMS</div>
              <div>STATUS</div>
              <div>UPDATED</div>
            </div>
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-5 items-center gap-3 px-2 py-1 text-[13px]">
                <div className="font-mono">{r.id}</div>
                <div>{r.customer}</div>
                <div>{r.items}</div>
                <div>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${tone[r.tone]}`}>{r.status}</span>
                </div>
                <div className="font-mono text-muted">{r.time}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-paper" />
      </motion.div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 pt-16 pb-24 text-center md:pt-12 md:pb-28">
        <motion.p {...enter(1)} className="font-mono text-xs tracking-[0.12em] text-accent-text uppercase">
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          {...enter(2)}
          className="max-w-[900px] text-[clamp(2.5rem,4.8vw,4rem)] leading-[1.04] font-medium tracking-[-0.03em]"
        >
          {hero.heading}
        </motion.h1>
        <motion.p {...enter(3)} className="max-w-[620px] text-lg leading-relaxed text-muted text-pretty">
          {hero.sub}
        </motion.p>
        <motion.div {...enter(4)} className="mt-2 flex flex-wrap items-center justify-center gap-5">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center rounded-full bg-accent px-6 text-[15px] font-medium text-accent-fg transition-[background-color,transform] duration-150 ease-out-strong hover:bg-accent-hover active:scale-[0.97]"
          >
            {contact.whatsappLabel}
          </a>
          <a
            href={contact.booking}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center rounded-full border border-accent-text px-6 text-[15px] font-medium text-accent-text transition-[background-color,transform] duration-150 ease-out-strong hover:bg-accent-soft active:scale-[0.97]"
          >
            {contact.bookingLabel}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-[15px] font-medium text-ink transition-colors hover:text-accent-text"
          >
            {contact.emailLabel} →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
