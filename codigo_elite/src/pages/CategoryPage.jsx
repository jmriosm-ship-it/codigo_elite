import { useMemo, useState } from 'react'
import { allCategory, categories, categoryById, colors, products } from '../data'
import { Garment } from '../components/Garment'
import { ArrowIcon, SearchIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import { link } from '../router'

export default function CategoryPage({ id }) {
  const category = id === 'todo' ? allCategory : categoryById[id]
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter((p) => (id === 'todo' || p.category === id) && (!q || p.name.toLowerCase().includes(q)))
    if (sort === 'low') list.sort((a, b) => a.price - b.price)
    if (sort === 'high') list.sort((a, b) => b.price - a.price)
    if (sort === 'new') list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew))
    return list
  }, [id, query, sort])

  if (!category) {
    return (
      <section className="section container notfound">
        <h1>No encontramos esa categoría</h1>
        <a className="btn btn--dark" href={link.category('todo')}>Ver todo el catálogo</a>
      </section>
    )
  }

  const total = id === 'todo' ? products.length : products.filter((p) => p.category === id).length
  const order = categories.map((c) => c.id)
  const nextId = id === 'todo' ? order[0] : order[(order.indexOf(id) + 1) % order.length]
  const next = categoryById[nextId]

  return (
    <>
      <section className="cat-hero" aria-labelledby="cat-title">
        <p className="cat-hero__ghost" aria-hidden="true">{category.name}</p>
        <div className="cat-hero__art" aria-hidden="true">
          {category.cover
            ? <img src={category.cover} alt="" />
            : category.type === 'mark'
              ? <span className="mark" />
              : <Garment type={category.type} hex={colors.blanco.hex} />}
        </div>
        <div className="container cat-hero__inner">
          <nav className="crumbs" aria-label="Ruta">
            <a href={link.home}>Inicio</a><span aria-hidden="true">/</span><span aria-current="page">{category.name}</span>
          </nav>
          <h1 id="cat-title">{category.name}</h1>
          <p className="cat-hero__blurb">{category.blurb}</p>
          <p className="cat-hero__count">{total} {total === 1 ? 'prenda' : 'prendas'}</p>
        </div>
      </section>

      <div className="toolbar">
        <div className="container toolbar__inner">
          <div className="chips" aria-label="Categorías">
            {[allCategory, ...categories].map((c) => (
              <a key={c.id} className="chip" href={link.category(c.id)} aria-current={c.id === id ? 'page' : undefined}>
                {c.id === 'todo' ? 'Todo' : c.name}
              </a>
            ))}
          </div>
          <div className="toolbar__tools">
            <label className="search">
              <SearchIcon />
              <input type="search" placeholder="Buscar" aria-label="Buscar prenda" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <label className="select">
              <span className="sr-only">Ordenar</span>
              <select aria-label="Ordenar" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Destacados</option>
                <option value="new">Lo nuevo</option>
                <option value="low">Precio: menor a mayor</option>
                <option value="high">Precio: mayor a menor</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <section className="container catalog-body" aria-live="polite">
        <div className="grid">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        {items.length === 0 && (
          <div className="empty">
            <p>No encontramos prendas con esa búsqueda.</p>
            <button className="btn btn--dark" type="button" onClick={() => setQuery('')}>Limpiar búsqueda</button>
          </div>
        )}
      </section>

      <a className="next" href={link.category(nextId)}>
        <span className="container next__inner">
          <span className="next__label">Siguiente categoría</span>
          <strong>{next.name}</strong>
          <span className="next__go"><ArrowIcon /></span>
        </span>
      </a>
    </>
  )
}
