import { categoryById, colors, statuses } from '../data'
import { link } from '../router'
import { useFavorites } from '../store'
import { hasBack, money } from '../utils'
import { Picture } from './Garment'
import { HeartIcon } from './Icons'

export default function ProductCard({ product, index = 0 }) {
  const { has, toggle } = useFavorites()
  const saved = has(product.id)

  return (
    <div className={`card${product.status === 'agotado' ? ' is-sold' : ''}`} style={{ '--i': Math.min(index, 8) }}>
      <a className="card__link" href={link.product(product.id)}>
        <span className="card__img">
          <span className="card__pic"><Picture product={product} /></span>
          {hasBack(product) && <span className="card__pic card__pic--alt"><Picture product={product} view="back" /></span>}
          {product.status ? <span className="tag tag--status">{statuses[product.status]}</span> : product.isNew && <span className="tag">Nuevo</span>}
        </span>
        <span className="card__info">
          <span className="card__top">
            <span className="card__name">{product.name}</span>
            <span className="card__price">{money(product.price)}</span>
          </span>
          <span className="card__bottom">
            <span className="card__cat">{categoryById[product.category].name}</span>
            <span className="dots">
              {product.colors.map((c) => (
                <span key={c} className="dot" style={{ background: colors[c].hex }} title={colors[c].name} />
              ))}
            </span>
          </span>
        </span>
      </a>
      <button
        type="button"
        className="fav"
        aria-pressed={saved}
        aria-label={saved ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
        onClick={() => toggle(product.id)}
      >
        <HeartIcon />
      </button>
    </div>
  )
}
