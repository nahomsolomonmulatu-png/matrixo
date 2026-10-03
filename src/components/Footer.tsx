import { company, footerNav } from '../data/site'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__wordmark">MATRIXO</p>
            <p className="footer__tagline">{company.tagline}</p>
            <p className="footer__address">{company.location}</p>
          </div>

          {footerNav.map((group) => (
            <nav className="footer__col" key={group.title} aria-label={`${group.title} (footer)`}>
              <p className="label footer__col-title">{group.title}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener' }
                        : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p className="footer__built">Built and maintained in Addis Ababa.</p>
        </div>
      </div>
    </footer>
  )
}
