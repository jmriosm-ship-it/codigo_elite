import { colors, productById } from '../data'
import { Picture } from '../components/Garment'
import { link } from '../router'
import { money } from '../utils'

export default function CartPage({ cart, onSend }) {
  const { items, change, remove, clear, total, count } = cart

  return (
    <section className="order container" aria-labelledby="order-title">
      <nav className="crumbs crumbs--dark" aria-label="Ruta">
        <a href={link.home}>Inicio</a><span aria-hidden="true">/</span>
        <span aria-current="page">Tu pedido</span>
      </nav>
      <h1 id="order-title">Tu pedido</h1>

      {items.length === 0 ? (
        <div className="order__empty">
          <p>Todavía no has agregado prendas.</p>
          <a className="btn btn--dark" href={link.category('todo')}>Ver el catálogo</a>
        </div>
      ) : (
        <div className="order__grid">
          <ul className="lines">
            {items.map((i, idx) => {
              const p = productById(i.id)
              return (
                <li className="line" key={`${i.id}-${i.color}-${i.size}`}>
                  <a className="line__img" href={link.product(p.id)}><Picture product={p} color={i.color} /></a>
                  <div className="line__info">
                    <a className="line__name" href={link.product(p.id)}>{p.name}</a>
                    <p className="line__meta">{colors[i.color].name} · Talla {i.size}</p>
                    <div className="qty">
                      <button type="button" aria-label="Quitar una unidad" onClick={() => change(idx, -1)}>−</button>
                      <span aria-live="polite">{i.qty}</span>
                      <button type="button" aria-label="Agregar una unidad" onClick={() => change(idx, 1)}>+</button>
                    </div>
                  </div>
                  <div className="line__side">
                    <p>{money(p.price * i.qty)}</p>
                    <button type="button" className="link-btn" onClick={() => remove(idx)}>Quitar</button>
                  </div>
                </li>
              )
            })}
          </ul>

          <aside className="order__sum" aria-label="Resumen del pedido">
            <h2>Resumen</h2>
            <div className="order__row"><span>{count} {count === 1 ? 'prenda' : 'prendas'}</span><span>{money(total)}</span></div>
            <div className="order__row"><span>Envío</span><span>Se acuerda por chat</span></div>
            <div className="order__total"><span>Total estimado</span><strong>{money(total)}</strong></div>
            <p className="order__note">El valor final y el envío se confirman por chat. No pagas nada en esta web.</p>
            <button className="btn btn--dark btn--block" type="button" onClick={onSend}>Enviar pedido por chat</button>
            <a className="btn btn--outline-dark btn--block" href={link.category('todo')}>Seguir viendo prendas</a>
            <button className="link-btn" type="button" onClick={clear}>Vaciar pedido</button>
          </aside>
        </div>
      )}
    </section>
  )
}
