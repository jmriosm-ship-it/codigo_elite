import { useRef } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons'
import ProductCard from './ProductCard'
import TagCard from './TagCard'

// Carrusel horizontal de prendas (con scroll táctil, flechas y teclado)
// variant = 'tag' muestra los productos como etiquetas colgantes de prenda
export default function Rail({ id, title, items, moreHref, moreLabel = 'Ver todo', tone = 'light', variant = 'card' }) {
  const Card = variant === 'tag' ? TagCard : ProductCard
  const track = useRef(null)
  const scroll = (dir) => track.current.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section className={`section rail rail--${tone}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container section__head section__head--row">
        <h2 id={`${id}-title`}>{title}</h2>
        <div className="rail__ctrl">
          {moreHref && <a className="rail__more" href={moreHref}>{moreLabel}</a>}
          <button type="button" className="rail__btn" aria-label="Anterior" onClick={() => scroll(-1)}><ArrowLeftIcon /></button>
          <button type="button" className="rail__btn" aria-label="Siguiente" onClick={() => scroll(1)}><ArrowRightIcon /></button>
        </div>
      </div>
      <div className="rail__track" ref={track}>
        {items.map((p, i) => <Card key={p.id} product={p} index={i} />)}
      </div>
    </section>
  )
}
