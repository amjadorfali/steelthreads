import { contact, cta } from '../content'

export function Contact() {
  return (
    <section id="contact" className="border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {cta.heading}
        </h2>
        <p className="mt-4 text-lg text-slate-600">{cta.sub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener"
            className="rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-hover"
          >
            {contact.whatsappLabel}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="rounded-lg border border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 hover:border-slate-400"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  )
}
