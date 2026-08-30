export function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <span className="font-semibold text-slate-900">
          Orfa<span className="text-accent">Lab</span>
        </span>
        <span>Based in Beirut — serving Lebanon &amp; the Gulf</span>
        <span>© {new Date().getFullYear()} OrfaLab</span>
      </div>
    </footer>
  )
}
