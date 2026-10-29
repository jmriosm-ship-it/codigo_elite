import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryById, colors, products } from '../data'
import { link } from '../router'
import { money, normalize } from '../utils'
import { Picture } from './Garment'
import { SearchIcon } from './Icons'

const haystack = products.map((p) => ({
  p,
  text: normalize([p.name, categoryById[p.category].name, ...p.colors.map((c) => colors[c].name)].join(' ')),
}))

// Búsqueda rápida: desplegable bajo el encabezado con resultados mientras se escribe
export default function SearchPanel({ open, onClose }) {
  const [query, setQuery] = useState('')
  const input = useRef(null)

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return []
    return haystack.filter((h) => q.split(/\s+/).every((word) => h.text.includes(word))).map((h) => h.p).slice(0, 6)
  }, [query])

  const submit = (e) => {
    e.preventDefault()
    if (results[0]) window.location.hash = link.product(results[0].id)
  }

  return (
    <div className="searchpanel" data-open={open} aria-hidden={!open}>
      <div className="searchpanel__inner">
        <form className="searchpanel__form" role="search" onSubmit={submit}>
          <SearchIcon />
          <input
            ref={input}
            type="search"
            value={query}
            tabIndex={open ? 0 : -1}
            placeholder="Busca una prenda, categoría o color"
            aria-label="Buscar en el catálogo"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="link-btn" tabIndex={open ? 0 : -1} onClick={onClose}>Cerrar</button>
        </form>

        {query.trim() && (
          results.length ? (
            <ul className="searchpanel__list">
              {results.map((p) => (
                <li key={p.id}>
                  <a href={link.product(p.id)} tabIndex={open ? 0 : -1} onClick={onClose}>
                    <span className="searchpanel__img"><Picture product={p} /></span>
                    <span className="searchpanel__name">{p.name}<small>{categoryById[p.category].name}</small></span>
                    <span className="searchpanel__price">{money(p.price)}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="searchpanel__empty">No encontramos "{query.trim()}". Prueba con otra palabra.</p>
          )
        )}
      </div>
    </div>
  )
}
