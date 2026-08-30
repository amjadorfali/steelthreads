import { about } from '../content'

export function About() {
  return (
    <section id="about" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-col items-start gap-8 sm:flex-row">
          {/* TODO: replace monogram with face photo (plan allows photo here) */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-white">
            AO
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{about.heading}</h2>
            {about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 20)} className="mt-4 leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
