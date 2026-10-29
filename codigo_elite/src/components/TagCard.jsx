import { categoryById, colors, statuses } from '../data'
import { link } from '../router'
import { useFavorites } from '../store'
import { money } from '../utils'
import { Picture } from './Garment'
import { HeartIcon } from './Icons'

// Código de barras decorativo: siempre el mismo para cada producto
function Barcode({ seed }) {
  let n = seed * 9301 + 49297
  const bars = []
  let x = 0
  while (x < 92) {
    n = (n * 9301 + 49297) % 233280
    const w = 1 + (n % 3)
    if ((n >> 3) % 3 !== 0) bars.push(<rect key={x} x={x} y="0" width={w} height="22" />)
    x += w + 1
  }
  return <svg className="tagc__barcode" viewBox="0 0 92 22" aria-hidden="true">{bars}</svg>
}

const sizesText = (sizes) => (sizes.length === 1 ? (sizes[0] === 'Única' ? 'Talla única' : sizes[0]) : `Talla ${sizes.join(' · ')}`)

// Tarjeta de producto con forma de etiqueta colgante de prenda
export default function TagCard({ product, index = 0 }) {
  const { has, toggle } = useFavorites()
  const saved = has(product.id)
  const ref = `CE-${String(product.id).padStart(4, '0')}`

  return (
    <div className={`tagc${product.status === 'agotado' ? ' is-sold' : ''}`} style={{ '--i': Math.min(index, 8) }}>
      <a className="tagc__link" href={link.product(product.id)}>
        <span className="tagc__hole" aria-hidden="true" />
        <span className="tagc__img">
          <Picture product={product} />
          {product.status ? <span className="tagc__flag tagc__flag--status">{statuses[product.status]}</span> : product.isNew && <span className="tagc__flag">Nuevo</span>}
        </span>
        <span className="tagc__body">
          <span className="tagc__row">
            <span className="tagc__name">{product.name}</span>
          </span>
          <span className="tagc__meta">{categoryById[product.category].name} — {sizesText(product.sizes)}</span>
          <span className="tagc__dots">
            {product.colors.map((c) => <span key={c} className="dot" style={{ background: colors[c].hex }} title={colors[c].name} />)}
          </span>
          <span className="tagc__foot">
            <span className="tagc__price">{money(product.price)}</span>
            <span className="tagc__code">
              <Barcode seed={product.id} />
              <span>{ref}</span>
            </span>
          </span>
        </span>
      </a>
      <button
        type="button"
        className="fav tagc__fav"
        aria-pressed={saved}
        aria-label={saved ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
        onClick={() => toggle(product.id)}
      >
        <HeartIcon />
      </button>
    </div>
  )
}
