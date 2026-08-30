import { packages } from '../content'

export function Packages() {
  return (
    <section id="services" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">What we build</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.title}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">{pkg.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{pkg.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {pkg.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 font-semibold text-accent">{pkg.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
