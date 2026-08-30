export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold tracking-tight text-slate-900">
          Orfa<span className="text-accent">Labs</span>
        </a>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#services" className="hidden text-slate-600 hover:text-slate-900 sm:inline">Services</a>
          <a href="#proof" className="hidden text-slate-600 hover:text-slate-900 sm:inline">Proof</a>
          <a href="#about" className="hidden text-slate-600 hover:text-slate-900 sm:inline">About</a>
          <a
            href="#contact"
            className="rounded-md bg-accent px-3 py-1.5 text-white hover:bg-accent-hover"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}
