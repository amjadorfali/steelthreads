import { proof } from '../content'

export function Proof() {
  return (
    <section id="proof" className="border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Proof, not promises</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{proof.intro}</p>

        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {proof.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="text-3xl font-bold text-accent">{metric.value}</dt>
              <dd className="mt-1 text-sm text-slate-600">{metric.label}</dd>
            </div>
          ))}
        </dl>

        <article className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-lg font-semibold text-slate-900">{proof.caseStudy.title}</h3>
          <p className="mt-3 leading-relaxed text-slate-600">{proof.caseStudy.body}</p>
        </article>
      </div>
    </section>
  )
}
