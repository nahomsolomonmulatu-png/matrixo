import { logo } from '../assets'

type NavProps = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

const links = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Capabilities' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu }: NavProps) {
  return (
    <nav>
      <div className="wrap navin">
        <a className="brand" href="#top" aria-label="Matrixo home">
          <img src={logo} alt="Matrixo — Free Your Mind" />
        </a>
        <div className="navlinks" id="navlinks">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={onCloseMenu}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="actions">
          <button
            className="iconbtn"
            id="theme"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={onToggleTheme}
          >
            ◐
          </button>
          <a className="btn primary" href="#contact">
            Start a project <span>↗</span>
          </a>
          <button
            className="menu"
            id="menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="navlinks"
            onClick={onToggleMenu}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  )
}
