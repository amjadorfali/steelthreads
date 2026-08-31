import { proof } from '../content'
import { Reveal } from './Reveal'

// Sample pipeline log, rendered as the section's background. Sample data.
const log: Array<[string, string, 'info' | 'ok' | 'warn']> = [
  ['09:00:01Z', 'INFO   job=erp-warehouse   start   window=15m', 'info'],
  ['09:00:01Z', 'INFO   source=erp          pulled  rows=2,418   dur=1.2s', 'info'],
  ['09:00:03Z', 'INFO   source=warehouse    pulled  rows=2,391   dur=0.9s', 'info'],
  ['09:00:03Z', 'INFO   diff                changed=27   new=4   removed=0', 'info'],
  ['09:00:04Z', 'INFO   apply               ok=31   failed=0', 'info'],
  ['09:00:04Z', 'INFO   reconcile           mismatches=0', 'info'],
  ['09:00:04Z', 'INFO   job=erp-warehouse   done    dur=3.4s   next=09:15:00Z', 'ok'],
  ['', '', 'info'],
  ['09:15:00Z', 'INFO   job=erp-warehouse   start   window=15m', 'info'],
  ['09:15:01Z', 'INFO   source=erp          pulled  rows=2,440   dur=1.1s', 'info'],
  ['09:15:02Z', 'INFO   source=warehouse    pulled  rows=2,422   dur=0.8s', 'info'],
  ['09:15:02Z', 'INFO   diff                changed=18   new=22  removed=0', 'info'],
  ['09:15:02Z', 'WARN   apply               sku=LB-4471  price mismatch  → flagged, notified', 'warn'],
  ['09:15:03Z', 'INFO   apply               ok=39   failed=0   flagged=1', 'info'],
  ['09:15:03Z', 'INFO   job=erp-warehouse   done    dur=3.1s   next=09:30:00Z', 'ok'],
]

const tone = { info: '', ok: 'text-teal-light', warn: 'text-amber-400' }

export function CaseStudy() {
  return (
    <section className="relative overflow-hidden bg-deep-ink text-deep-fg">
      <pre
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden px-6 py-12 font-mono text-[13px] leading-[1.9] text-teal-light/55 select-none lg:px-16"
      >
        {'$ steel-sync run --job erp-warehouse --schedule "*/15 * * * *"\n'}
        {log.map(([ts, line, t], i) => (
          <span key={i} className="block">
            {ts && <span className="text-deep-fg/35">2026-08-30T{ts}</span>}
            {ts && '  '}
            <span className={tone[t]}>{line}</span>
          </span>
        ))}
      </pre>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(20,22,26,0.75) 0%, rgba(20,22,26,0.25) 55%, rgba(20,22,26,0) 100%)' }}
      />
      {/* Below lg the card spans the full width, so the log becomes noise: fade it almost out. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-deep-ink/85 lg:hidden" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {proof.caseStudies.map((cs, i) => (
            <Reveal
              key={cs.title}
              delay={i * 0.1}
              className="flex flex-col gap-4 rounded-2xl bg-deep-fg p-7 text-deep-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-9"
            >
              {i === 0 && <p className="font-mono text-xs tracking-[0.12em] text-[#0e6b57] uppercase">In practice</p>}
              {i > 0 && <p className="font-mono text-xs tracking-[0.12em] text-[#6b6f76] uppercase">{String(i + 1).padStart(2, '0')}</p>}
              <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.03em]">{cs.title}</h2>
              <p className="text-[15px] leading-relaxed text-[#6b6f76]">{cs.body}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2 font-mono text-[11px] tracking-[0.06em]">
                {cs.tags.map((t) => (
                  <li key={t} className="rounded-full border border-[rgba(20,22,26,0.18)] px-2.5 py-1.5">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <a
          href="#contact"
          className="self-start border-b border-deep-fg/40 pb-1 text-[15px] font-medium text-deep-fg transition-colors hover:border-teal-light hover:text-teal-light"
        >
          Ask how this would work for your stack →
        </a>
      </div>
    </section>
  )
}
