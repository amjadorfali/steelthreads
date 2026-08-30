import { contact, hero } from '../content'

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        {hero.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        {hero.heading}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
        {hero.sub}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener"
          className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover"
        >
          {contact.whatsappLabel}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
        >
          {contact.emailLabel}
        </a>
      </div>
    </section>
  )
}
