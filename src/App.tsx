import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import Story from './sections/Story'
import BrandMoment from './sections/BrandMoment'
import Services from './sections/Services'
import About from './sections/About'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import Stage from './three/Stage'
import { startThemeController } from './lib/theme'
import { initScrollDrive } from './three/scroll'

const REVEAL_SELECTOR = '.reveal'

function useReveals() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)]
    const show = (el: HTMLElement) => {
      el.classList.add('is-visible')
      io.unobserve(el)
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) show(e.target as HTMLElement)
        }),
      { threshold: 0.08, rootMargin: '0px' },
    )
    els.forEach((el) => io.observe(el))

    let raf = 0
    const sweep = () => {
      raf = 0
      els.forEach((el) => {
        if (el.classList.contains('is-visible')) return
        if (el.getBoundingClientRect().top < window.innerHeight * 0.99) show(el)
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
}

export default function App() {
  useReveals()
  useEffect(() => startThemeController(), [])
  useEffect(() => initScrollDrive(), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Stage />
      <Navigation />
      <main id="main">
        <Hero />
        <Story />
        <BrandMoment />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
