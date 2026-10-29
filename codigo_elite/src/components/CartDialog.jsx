import { colors, productById } from '../data'
import { useDialog } from '../hooks'
import { money } from '../utils'
import { Picture } from './Garment'
import { CloseIcon } from './Icons'

export default function CartDialog({ open, onClose, cart, onSend, onBrowse }) {
  const ref = useDialog(open, onClose)
  const { items, change, remove, clear, total } = cart

  return (
    <dialog className="cart" ref={ref} aria-labelledby="cart-title">
      <div className="cart__head">
        <h2 id="cart-title">Tu pedido</h2>
        <button className="icon-btn" type="button" aria-label="Cerrar pedido" onClick={() => ref.current.close()}>
          <CloseIcon />
        </button>
      </div>

      <div className="cart__body">
        {items.length === 0 ? (
          <div className="cart__empty">
            <p>Tu pedido está vacío.</p>
            <button className="btn btn--dark" type="button" onClick={onBrowse}>Ver el catálogo</button>
          </div>
        ) : (
          <ul className="lines">
            {items.map((i, idx) => {
              const p = productById(i.id)
              return (
                <li className="line" key={`${i.id}-${i.color}-${i.size}`}>
                  <div className="line__img"><Picture product={p} color={i.color} /></div>
                  <div className="line__info">
                    <p className="line__name">{p.name}</p>
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
        )}
      </div>

      {items.length > 0 && (
        <div className="cart__foot">-
          <div className="cart__total"><span>Total estimado</span><strong>{money(total)}</strong></div>
          <p className="cart__note">El valor final y el envío se confirman por chat.</p>
          <button className="btn btn--dark btn--block" type="button" onClick={onSend}>Enviar pedido por chat</button>
          <button className="link-btn" type="button" onClick={clear}>Vaciar pedido</button>
        </div>
      )}
    </dialog>
  )
}
