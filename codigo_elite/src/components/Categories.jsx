import { useEffect, useRef, useState } from 'react'
import { categories, products } from '../data'
import { link } from '../router'
import { Garment } from './Garment'
import { ArrowIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons'
import { publicUrl } from '../utils'

// Carrusel de categorías: tarjetas altas que se deslizan con el dedo, con flechas y barra de avance
export default function Categories() {
  const track = useRef(null)
  const [progress, setProgress] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const el = track.current
    let frame = 0
    const update = () => {
      frame = 0
      const max = el.scrollWidth - el.clientWidth
      const p = max > 0 ? el.scrollLeft / max : 1
      setProgress(p)
      setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 })
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const scroll = (dir) => {
    const el = track.current
    const card = el.querySelector('.cat')
    const step = card ? card.getBoundingClientRect().width + 12 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // La barra muestra qué parte del carrusel se está viendo
  const visible = track.current ? Math.min(1, track.current.clientWidth / track.current.scrollWidth) : 0.3

  return (
    <section className="section cats" id="categorias" aria-labelledby="cat-title">
      <div className="container section__head section__head--row">
        <h2 id="cat-title">Compra por categoría</h2>
        <div className="rail__ctrl">
          <button type="button" className="rail__btn" aria-label="Categorías anteriores" onClick={() => scroll(-1)} disabled={edges.start}><ArrowLeftIcon /></button>
          <button type="button" className="rail__btn" aria-label="Más categorías" onClick={() => scroll(1)} disabled={edges.end}><ArrowRightIcon /></button>
        </div>
      </div>

      <div className="cats__track" ref={track}>
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.id).length
          return (
            <a key={c.id} className={`cat${c.soon ? ' cat--soon' : ''}${c.cover ? ' cat--photo' : ''}`} href={link.category(c.id)} style={{ '--i': i }}>
              <span className="cat__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="cat__go" aria-hidden="true"><ArrowIcon /></span>
              {c.cover
                ? <img className="cat__photo" src={publicUrl(c.cover)} alt="" loading="lazy" />
                : <span className="cat__art"><Garment type={c.type} hex="#ececec" /></span>}
              <span className="cat__text">
                <strong>{c.name}</strong>
                <span className="cat__blurb">{c.blurb}</span>
                <span className="cat__count">{c.soon ? 'Muy pronto' : `${count} ${count === 1 ? 'producto' : 'productos'}`}</span>
              </span>
            </a>
          )
        })}
        <a className="cat cat--all" href={link.category('todo')} style={{ '--i': categories.length }}>
          <span className="cat__go" aria-hidden="true"><ArrowIcon /></span>
          <span className="cat__mark" aria-hidden="true" />
          <span className="cat__text">
            <strong>Ver todo</strong>
            <span className="cat__blurb">Todo el catálogo en un solo lugar.</span>
            <span className="cat__count">{products.length} productos</span>
          </span>
        </a>
      </div>

      <div className="container">
        <div className="cats__bar" aria-hidden="true">
          <span style={{ width: `${visible * 100}%`, left: `${progress * (1 - visible) * 100}%` }} />
        </div>
      </div>
    </section>
  )
}
