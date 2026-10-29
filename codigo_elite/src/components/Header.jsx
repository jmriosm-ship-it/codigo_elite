import { useEffect, useRef, useState } from 'react'
import { allCategory, categories, colors, products } from '../data'
import { link } from '../router'
import { Garment, Picture } from './Garment'
import { useFavorites } from '../store'
import { ArrowIcon, BagIcon, ChevronIcon, HeartIcon, MenuIcon, SearchIcon } from './Icons'
import SearchPanel from './SearchPanel'

const entries = [allCategory, ...categories]
const countOf = (id) => (id === 'todo' ? products.length : products.filter((p) => p.category === id).length)

const hasPhoto = (p) => !!(p.image || p.imagesByColor)

// Productos para el mosaico: primero los que tienen foto. En "Todo", uno de cada categoría.
function previewItems(id) {
  if (id === 'todo') {
    const picks = categories.map((c) => products.find((p) => p.category === c.id && hasPhoto(p))).filter(Boolean)
    return picks.slice(0, 3)
  }
  const list = products.filter((p) => p.category === id)
  return [...list.filter(hasPhoto), ...list.filter((p) => !hasPhoto(p))].slice(0, 3)
}

// Vista previa de la categoría sobre la que se pasa el mouse: mosaico con sus productos
function Preview({ category }) {
  const count = countOf(category.id)
  const items = previewItems(category.id)
  return (
    <a className={`mega__preview mega__preview--${items.length}`} href={link.category(category.id)}>
      {items.map((p) => (
        <span key={p.id} className={`mega__cell${hasPhoto(p) ? '' : ' mega__cell--draw'}`} aria-hidden="true">
          <Picture product={p} />
        </span>
      ))}
      {items.length === 0 && (
        <span className="mega__cell mega__cell--draw" aria-hidden="true">
          {category.type === 'mark' ? <span className="mark" /> : <Garment type={category.type} hex={colors.negro.hex} />}
        </span>
      )}
      <span className="mega__caption">
        <strong>{category.name}</strong>
        <span>Ver {count === 1 ? 'el producto' : `los ${count}`} <ArrowIcon /></span>
      </span>
    </a>
  )
}

export default function Header({ count, menuOpen, onMenu }) {
  const [mega, setMega] = useState(false)
  const [hover, setHover] = useState('todo')
  const [searching, setSearching] = useState(false)
  const favs = useFavorites().ids.length
  const timer = useRef(0)

  // Cada vez que cambia la cantidad, la bolsa se sacude (tick distinto = animación nueva)
  const [lastCount, setLastCount] = useState(count)
  const [tick, setTick] = useState(0)
  if (lastCount !== count) { setLastCount(count); setTick((t) => t + 1) }

  const open = () => { clearTimeout(timer.current); setSearching(false); setMega(true) }
  const closeSoon = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setMega(false), 160) }
  const closeNow = () => { clearTimeout(timer.current); setMega(false); if (menuOpen) onMenu() }

  useEffect(() => {
    const close = () => { setMega(false); setSearching(false) }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', close)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('hashchange', close)
    }
  }, [])

  const previewed = entries.find((c) => c.id === hover) || allCategory

  return (
    <header className="header" id="top" onMouseEnter={() => clearTimeout(timer.current)} onMouseLeave={closeSoon}>
      <div className="header__bar">
        <a className="brand" href={link.home} aria-label="Código Élite, inicio" onClick={closeNow}>
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Código Élite</span>
        </a>

        <nav className="nav" id="nav" aria-label="Principal">
          <button
            type="button"
            className="nav__link nav__trigger"
            aria-expanded={mega}
            aria-controls="mega"
            onMouseEnter={open}
            onClick={() => setMega((v) => !v)}
          >
            Colección <ChevronIcon />
          </button>
          <a className="nav__link" href="#proceso" onMouseEnter={closeSoon} onClick={closeNow}>Cómo pedir</a>
          <a className="nav__link" href="#contacto" onMouseEnter={closeSoon} onClick={closeNow}>Contacto</a>

          {/* En el celular el menú de colección va directo en la lista */}
          <ul className="nav__cats">
            {entries.map((c) => (
              <li key={c.id}>
                <a href={link.category(c.id)} onClick={closeNow}>{c.name}<span>{countOf(c.id)}</span></a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button className="icon-btn" type="button" aria-label="Buscar" aria-expanded={searching} onClick={() => { setMega(false); setSearching((v) => !v) }}>
            <SearchIcon />
          </button>
          <a className="icon-btn fav-link" href={link.favorites} aria-label="Ver mis favoritos">
            <HeartIcon />
            {favs > 0 && <span className="cart-btn__count">{favs}</span>}
          </a>
          <a className="icon-btn cart-btn" href={link.cart} aria-label="Ver mi pedido">
            <span className={`cart-btn__bag${tick ? ' is-bump' : ''}`} key={`bag-${tick}`}><BagIcon /></span>
            {count > 0 && <span className={`cart-btn__count${tick ? ' is-bump' : ''}`} key={`n-${tick}`}>{count}</span>}
          </a>
          <button className="icon-btn menu-btn" type="button" aria-label="Abrir menú" aria-expanded={menuOpen} aria-controls="nav" onClick={onMenu}>
            <MenuIcon />
          </button>
        </div>
      </div>

      <SearchPanel open={searching} onClose={() => setSearching(false)} />

      <div className="mega" id="mega" data-open={mega}>
        <div className="mega__inner">
          <ul className="mega__list">
            {entries.map((c) => (
              <li key={c.id}>
                <a
                  href={link.category(c.id)}
                  className={hover === c.id ? 'is-hover' : undefined}
                  tabIndex={mega ? 0 : -1}
                  onMouseEnter={() => setHover(c.id)}
                  onFocus={() => setHover(c.id)}
                  onClick={closeNow}
                >
                  <span>{c.id === 'todo' ? 'Todo' : c.name}</span>
                  <small>{countOf(c.id)}</small>
                </a>
              </li>
            ))}
          </ul>
          <div onClick={closeNow}><Preview key={previewed.id} category={previewed} /></div>
        </div>
      </div>
    </header>
  )
}
