import { useEffect, useRef, useState } from 'react'
import { company, siteNav } from '../data/site'
import MatrixoMark from './MatrixoMark'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const order = siteNav.map((i) => i.href.slice(1))
    const sections = order
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        })
        setActive(order.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const bg = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, .skip-link'),
    )
    bg.forEach((el) => el.setAttribute('inert', ''))
    const first = menuRef.current?.querySelector<HTMLElement>('a')
    first?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      bg.forEach((el) => el.removeAttribute('inert'))
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#main" aria-label="Matrixo — back to top" onClick={close}>
          <MatrixoMark size={20} />
          <span className="nav__name">MATRIXO</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {siteNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav__link${active === item.href.slice(1) ? ' is-active' : ''}`}
              aria-current={active === item.href.slice(1) ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div className={`nav__menu${open ? ' is-open' : ''}`} id="nav-menu" ref={menuRef}>
        <div className="container">
          <nav aria-label="Menu">
            <ul className="nav__menu-links">
              {siteNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={close}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav__menu-foot">
            <p className="label">{company.city}</p>
            <p className="label">
              {company.phones[0].label} · {company.phones[1].label}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
