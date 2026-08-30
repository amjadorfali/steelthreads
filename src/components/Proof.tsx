import { proof } from '../content'
import { Reveal } from './Reveal'

// The oversized numeral is the page's one deliberate "second-read" moment.
const big = proof.metrics.find((m) => m.value === '1,630')
const rest = proof.metrics.filter((m) => m !== big)

export function Proof() {
  return (
    <section
      id="proof"
      className="bg-grid-dark relative overflow-hidden bg-deep text-deep-fg"
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 100% 0%, rgba(14,107,87,0.55), transparent 60%), linear-gradient(rgba(244,242,236,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(244,242,236,0.045) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 48px 48px, 48px 48px',
      }}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 pt-24 pb-64 lg:grid-cols-12 lg:px-16 lg:pt-24 lg:pb-72">
        <Reveal className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9 lg:order-2">
          <h2 className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-medium tracking-[-0.03em]">Proof, not promises</h2>
          <p className="text-[15px] leading-relaxed text-deep-fg/65">{proof.intro}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12 lg:col-span-7 lg:order-1">
          {rest.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="flex flex-col gap-2.5 border-t border-deep-fg/25 pt-4">
              <div className="font-mono text-4xl leading-none font-medium whitespace-nowrap">{m.value}</div>
              <div className="text-[13px] leading-snug text-deep-fg/65">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {big && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[0.18em] left-6 font-mono leading-none font-medium tracking-[-0.06em] whitespace-nowrap select-none lg:left-[72px]"
            style={{ fontSize: 'clamp(120px, 21vw, 300px)' }}
          >
            {big.value}
          </div>
          <p className="absolute left-8 flex items-center gap-3 text-sm text-deep-fg/80 lg:left-[100px]" style={{ bottom: 'clamp(110px, 18vw, 262px)' }}>
            <span className="h-px w-10 bg-teal-light" aria-hidden />
            <span>
              <span className="sr-only">{big.value} </span>
              {big.label.replace(' per month', '')}{' '}
              <span className="font-medium text-deep-fg">every month</span>
            </span>
          </p>
        </>
      )}
    </section>
  )
}
