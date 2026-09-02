import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Packages } from './components/Packages'
import { Proof } from './components/Proof'
import { CaseStudy } from './components/CaseStudy'
import { Footer } from './components/Footer'
import { Splash } from './components/Splash'

function App() {
  return (
    <div className="min-h-[100dvh]">
      <Splash />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Packages />
        <Proof />
        <CaseStudy />
      </main>
      <Footer />
    </div>
  )
}

export default App
