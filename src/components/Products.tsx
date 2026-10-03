import { products } from '../data/site'
import Arrow from './Arrow'
import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

export default function Products() {
  return (
    <section className="section" id="products" aria-labelledby="products-title">
      <div className="container">
        <SectionHeader
          label="02 / Products"
          title="Products."
          lede="Software we ship and operate ourselves, alongside the systems we build for clients."
          id="products-title"
        />

        <ul className="prod-list">
          {products.map((product, i) => (
            <li className="prod reveal" key={product.index} style={revealStyle(i * 70)}>
              <span className="prod__index label">{product.index}</span>
              <div className="prod__main">
                <div className="prod__head">
                  <h3 className="prod__name">{product.name}</h3>
                  <span className="prod__status">{product.status}</span>
                </div>
                <p className="prod__body">{product.body}</p>
              </div>
              {product.href ? (
                <a
                  className="arrow-link prod__action"
                  href={product.href}
                  target="_blank"
                  rel="noopener"
                >
                  View product
                  <Arrow className="arrow-link__icon" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="prod__action prod__action--static label">Private</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
