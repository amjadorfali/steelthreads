import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Packages } from './components/Packages'
import { Proof } from './components/Proof'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Packages />
        <Proof />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
