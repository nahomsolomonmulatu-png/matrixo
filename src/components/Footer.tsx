import { company, footerCopy, siteNav, siteSocial } from '../data/site'
import MatrixoMark from './MatrixoMark'

export default function Footer() {
  return (
    <footer className="footer" data-theme="dark">
      <div className="container footer__top">
        <div className="footer__brand">
          <a className="footer__mark" href="#main" aria-label="Matrixo — back to top">
            <MatrixoMark size={22} />
            <span className="footer__name">MATRIXO</span>
          </a>
          <p className="footer__line">{footerCopy.line}</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <ul>
            {siteNav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Social">
          <ul>
            {siteSocial.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container footer__meta">
        <p>{footerCopy.legal}</p>
        <p className="footer__city">{company.city}</p>
      </div>

      <div className="container footer__mega-wrap" aria-hidden="true">
        <p className="footer__mega">MATRIXO</p>
      </div>
    </footer>
  )
}
