import { productById } from '../data'
import ProductCard from '../components/ProductCard'
import { link } from '../router'
import { useFavorites } from '../store'

export default function FavoritesPage() {
  const { ids } = useFavorites()
  const items = ids.map(productById).filter(Boolean)

  return (
    <section className="order container" aria-labelledby="fav-title">
      <nav className="crumbs crumbs--dark" aria-label="Ruta">
        <a href={link.home}>Inicio</a><span aria-hidden="true">/</span>
        <span aria-current="page">Favoritos</span>
      </nav>
      <h1 id="fav-title">Favoritos</h1>

      {items.length === 0 ? (
        <div className="order__empty">
          <p>Toca el corazón de una prenda para guardarla aquí.</p>
          <a className="btn btn--dark" href={link.category('todo')}>Ver el catálogo</a>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 0 }}>
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </section>
  )
}
