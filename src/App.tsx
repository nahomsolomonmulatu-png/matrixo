import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SelectedWork from './components/SelectedWork'
import Products from './components/Products'
import Capabilities from './components/Capabilities'
import Engineering from './components/Engineering'
import Principles from './components/Principles'
import Company from './components/Company'
import TechnologyIndex from './components/TechnologyIndex'
import Insights from './components/Insights'
import ContactCTA from './components/ContactCTA'
import ContactPage from './components/ContactPage'
import Footer from './components/Footer'
import { useHashRoute } from './router'

const REVEAL_SELECTOR = '.reveal, .reveal-mask, .reveal-media, .reveal-3d'

function useReveals(route: string) {
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

    // Safety net: fast scrolling can skip the intersecting frame, so sweep on scroll.
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
  }, [route])
}

export default function App() {
  const route = useHashRoute()

  useReveals(route)

  // Route change: reset scroll position to the top of the page.
  useEffect(() => {
    if (route === '/') {
      if (window.location.hash === '#/' || window.location.hash === '') {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [route])

  const isHome = route === '/'

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation route={route} />
      <main id="main" className={isHome ? undefined : 'page'} key={route}>
        {isHome ? (
          <>
            <Hero />
            <SelectedWork />
            <Products />
            <Capabilities />
            <Engineering />
            <Principles />
            <Company />
            <TechnologyIndex />
            <Insights />
            <ContactCTA />
          </>
        ) : (
          <ContactPage />
        )}
      </main>
      <Footer />
    </>
  )
}
