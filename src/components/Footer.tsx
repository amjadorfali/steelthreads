import { ArrowUpRight } from '@phosphor-icons/react'
import { contact, cta } from '../content'
import { GridSpotlight } from './GridSpotlight'
import { Reveal } from './Reveal'

// Human-readable forms of the contact details in content.ts.
const phone = '+961 78 879 278'

const channels = [
  { label: 'WhatsApp', value: phone, href: contact.whatsapp, external: true, primary: true },
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, external: false, primary: false },
]

export function Footer() {
  return (
    <footer className="bg-grid relative overflow-hidden">
      <GridSpotlight cell />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Contact */}
        <div id="contact" className="pt-24 pb-24 lg:pt-32 lg:pb-32">
          <Reveal className="flex flex-col gap-4">
            <h2 className="max-w-[820px] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.035em]">
              {cta.heading}
            </h2>
            <p className="max-w-[560px] text-lg leading-relaxed text-muted">{cta.sub}</p>
          </Reveal>

          <ul className="mt-14 border-t border-line">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={0.1 + i * 0.08}>
                <li className="border-b border-line">
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener' : undefined}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:py-8"
                  >
                    <span className="col-span-2 font-mono text-xs tracking-[0.1em] text-muted uppercase sm:col-span-1 sm:w-24">{c.label}</span>
                    <span
                      className={`min-w-0 break-all text-[clamp(1.375rem,2.8vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.02em] transition-colors duration-150 group-hover:text-accent-text ${c.primary ? 'text-ink' : 'text-ink/80'}`}
                    >
                      {c.value}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-[transform,background-color,color,border-color] duration-150 ease-out-strong group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg group-active:scale-[0.97]">
                      <ArrowUpRight size={18} weight="bold" />
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Footer strip */}
        <div className="flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="text-sm font-semibold tracking-tight">
            Orfa<span className="text-accent-text">Labs</span>
          </a>
          <p className="font-mono text-[11px] tracking-[0.06em] text-muted">© {new Date().getFullYear()} ORFALABS</p>
        </div>
      </div>
    </footer>
  )
}
