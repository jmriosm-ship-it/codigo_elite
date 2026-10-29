import { categories, colors, products } from '../data'
import { link } from '../router'
import { Garment } from './Garment'
import { ArrowIcon } from './Icons'

export default function Categories() {
  return (
    <section className="section" id="categorias" aria-labelledby="cat-title">
      <div className="container">
        <div className="section__head">
          <h2 id="cat-title">Compra por categoría</h2>
        </div>
        <div className="tiles">
          {categories.map((c, i) => {
            const items = products.filter((p) => p.category === c.id)
            const hex = items[0] ? colors[items[0].colors[0]].hex : colors.negro.hex
            return (
              <a key={c.id} className={`tile${i === 0 ? ' tile--wide' : ''}`} href={link.category(c.id)}>
                <span className="tile__go" aria-hidden="true"><ArrowIcon /></span>
                <span className="tile__art"><Garment type={c.type} hex={hex} /></span>
                <span className="tile__label">
                  <strong>{c.name}</strong>
                  <span>{items.length} {items.length === 1 ? 'prenda' : 'prendas'}</span>
                </span>
              </a>
            )
          })}
          <a className="tile tile--all" href={link.category('todo')}>
            <span className="tile__go" aria-hidden="true"><ArrowIcon /></span>
            <span className="tile__mark" aria-hidden="true" />
            <span className="tile__label">
              <strong>Ver todo</strong>
              <span>{products.length} prendas</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
