import { useEffect, useState } from 'react'
import { categoryById, colors, guideOf, productById, products, statuses } from '../data'
import { Picture } from '../components/Garment'
import { CloseIcon, HeartIcon } from '../components/Icons'
import Rail from '../components/Rail'
import { useDialog } from '../hooks'
import { link } from '../router'
import { markSeen, useFavorites, useSeen } from '../store'
import { hasBack, money } from '../utils'

export default function ProductPage({ id, onAdd, onOrderNow }) {
  const product = products.find((p) => p.id === id)
  if (!product) {
    return (
      <section className="section container notfound">
        <h1>No encontramos esa prenda</h1>
        <a className="btn btn--dark" href={link.category('todo')}>Ver todo el catálogo</a>
      </section>
    )
  }
  // key = prenda: al cambiar de prenda, el color y la talla arrancan limpios
  return <Details key={product.id} product={product} onAdd={onAdd} onOrderNow={onOrderNow} />
}

// Foto con zoom: con mouse se acerca siguiendo el puntero
function ZoomPicture({ product, color, view }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--zx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--zy', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <div className="pp__main" onMouseMove={move}>
      <div className="pp__zoom"><Picture product={product} color={color} view={view} /></div>
      {product.status ? <span className="tag tag--status">{statuses[product.status]}</span> : product.isNew && <span className="tag">Nuevo</span>}
    </div>
  )
}

function SizeGuide({ guide, open, onClose }) {
  const ref = useDialog(open, onClose)
  return (
    <dialog className="guide" ref={ref} aria-labelledby="guide-title">
      <div className="guide__head">
        <h2 id="guide-title">Guía de tallas</h2>
        <button className="icon-btn" type="button" aria-label="Cerrar guía" onClick={() => ref.current.close()}><CloseIcon /></button>
      </div>
      <table className="guide__table">
        <thead><tr>{guide.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{guide.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c} cm</td>))}</tr>)}</tbody>
      </table>
      <p className="guide__note">Medidas de la prenda en centímetros, tomadas en plano. Si dudas entre dos tallas, escríbenos y te asesoramos.</p>
    </dialog>
  )
}

function Details({ product, onAdd, onOrderNow }) {
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null)
  const [error, setError] = useState(false)
  const [view, setView] = useState('front')
  const [guideOpen, setGuideOpen] = useState(false)
  const category = categoryById[product.category]
  const guide = guideOf(product.category)
  const { has, toggle } = useFavorites()
  const saved = has(product.id)
  const soldOut = product.status === 'agotado'
  const seen = useSeen()

  useEffect(() => { markSeen(product.id) }, [product.id])

  const line = () => {
    if (!size) { setError(true); document.getElementById('sizes')?.scrollIntoView({ block: 'center' }); return null }
    return { id: product.id, color, size, qty: 1 }
  }
  const add = () => { const l = line(); if (l) onAdd(l) }
  const order = () => { const l = line(); if (l) onOrderNow(l) }

  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 8)
  const recent = seen.filter((sid) => sid !== product.id).map(productById).filter(Boolean).slice(0, 8)

  return (
    <>
      <article className="pp container" aria-labelledby="pp-title">
        <nav className="crumbs crumbs--dark" aria-label="Ruta">
          <a href={link.home}>Inicio</a><span aria-hidden="true">/</span>
          <a href={link.category(category.id)}>{category.name}</a><span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pp__grid">
          <div className="pp__gallery">
            {hasBack(product) && (
              <div className="pp__thumbs" role="group" aria-label="Vistas">
                {[['front', 'Frente'], ['back', 'Espalda']].map(([v, label]) => (
                  <button key={v} type="button" className="thumb" aria-pressed={view === v} aria-label={label} onClick={() => setView(v)}>
                    <Picture product={product} color={color} view={v} />
                  </button>
                ))}
              </div>
            )}
            <ZoomPicture product={product} color={color} view={view} />
          </div>

          <div className="pp__info">
            <p className="pp__cat"><a href={link.category(category.id)}>{category.name}</a></p>
            <h1 id="pp-title">{product.name}</h1>
            <p className="pp__price">{money(product.price)}</p>
            {product.status && <p className={`pp__status pp__status--${product.status}`}>{statuses[product.status]}</p>}
            <p className="pp__desc">{product.description}</p>

            <fieldset className="opt">
              <legend>Color: <strong>{colors[color].name}</strong></legend>
              <div className="opt__row">
                {product.colors.map((c) => (
                  <button key={c} type="button" className="swatch" style={{ '--c': colors[c].hex }} aria-label={colors[c].name} aria-pressed={color === c} onClick={() => setColor(c)} />
                ))}
              </div>
            </fieldset>

            <fieldset className="opt" id="sizes">
              <legend>
                Talla
                {guide && <button type="button" className="link-btn opt__guide" onClick={() => setGuideOpen(true)}>Guía de tallas</button>}
              </legend>
              <div className="opt__row">
                {product.sizes.map((s) => (
                  <button key={s} type="button" className="size" aria-pressed={size === s} onClick={() => { setSize(s); setError(false) }}>{s}</button>
                ))}
              </div>
              {error && <p className="opt__error" role="alert">Elige una talla para continuar.</p>}
            </fieldset>

            <div className="pp__actions">
              <button className="btn btn--dark btn--block" type="button" disabled={soldOut} onClick={add}>
                {soldOut ? 'Agotado' : product.status === 'preventa' ? 'Reservar en preventa' : 'Agregar al pedido'}
              </button>
              <button className="btn btn--outline-dark btn--block" type="button" disabled={soldOut} onClick={order}>Pedir esta prenda ahora</button>
              <button className="btn btn--outline-dark btn--block pp__fav" type="button" aria-pressed={saved} onClick={() => toggle(product.id)}>
                <span className="fav-heart"><HeartIcon /></span>{saved ? 'Guardada en favoritos' : 'Guardar en favoritos'}
              </button>
            </div>

            <div className="acc">
              <details>
                <summary>Cómo pedir</summary>
                <p>Agrega tus prendas al pedido y envíalo por chat. Te confirmamos disponibilidad, forma de pago y entrega.</p>
              </details>
              <details>
                <summary>Envíos</summary>
                <p>El costo y el tiempo de envío se acuerdan por chat según tu ciudad.</p>
              </details>
            </div>
          </div>
        </div>
      </article>

      <Rail id="related" title="Completa tu pinta" items={related} tone="mist" moreHref={link.category('todo')} moreLabel="Ver todo" />
      {recent.length > 0 && <Rail id="recent" title="Vistos recientemente" items={recent} />}

      {guide && <SizeGuide guide={guide} open={guideOpen} onClose={() => setGuideOpen(false)} />}

      <div className="buybar">
        <div>
          <strong>{money(product.price)}</strong>
          <span>{size ? `Talla ${size}` : 'Elige tu talla'}</span>
        </div>
        <button className="btn btn--dark" type="button" disabled={soldOut} onClick={add}>{soldOut ? 'Agotado' : 'Agregar al pedido'}</button>
      </div>
    </>
  )
}
