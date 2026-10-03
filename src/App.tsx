import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Proof from './components/Proof'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import About from './components/About'
import Fit from './components/Fit'
import { choices } from './choices'
import Cta from './components/Cta'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    localStorage.getItem('matrixo-theme') === 'light' ? 'light' : 'dark',
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [choiceIndex, setChoiceIndex] = useState(0)
  const [projectType, setProjectType] = useState(choices[0].type)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('matrixo-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.classList.toggle('mobileOpen', menuOpen)
    return () => document.body.classList.remove('mobileOpen')
  }, [menuOpen])

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('.reveal')]
    const show = (el: HTMLElement) => {
      el.classList.add('show')
      io.unobserve(el)
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) show(e.target as HTMLElement)
        }),
      { threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))

    // Safety net: fast scrolling can skip the intersecting frame, so sweep on scroll.
    let raf = 0
    const sweep = () => {
      raf = 0
      els.forEach((el) => {
        if (el.classList.contains('show')) return
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) show(el)
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sweep)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    sweep()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const choose = (index: number) => {
    setChoiceIndex(index)
    setProjectType(choices[index].type)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>
      <div className="glow" aria-hidden="true" />
      <div className="glow two" aria-hidden="true" />
      <Nav
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <main id="top">
        <Hero />
        <Proof />
        <Services />
        <Work />
        <Process />
        <About />
        <Fit active={choiceIndex} onChoose={choose} />
        <Cta />
        <Contact type={projectType} onTypeChange={setProjectType} />
      </main>
      <Footer />
    </>
  )
}
