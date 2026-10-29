import { useEffect, useRef, useState } from 'react'
import { business } from '../data'
import { link } from '../router'
import { publicUrl } from '../utils'
import { InstagramIcon, TiktokIcon } from './Icons'

const mapQuery = business.mapQuery || business.address

const socials = [
  { label: 'Instagram', user: business.instagramUser, href: business.instagram, Icon: InstagramIcon },
  { label: 'TikTok', user: business.tiktokUser, href: business.tiktok, Icon: TiktokIcon },
]

const statement = 'Porque vestir bien no es apariencia, es un código.'
const words = statement.split(' ')
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Las palabras se encienden una a una mientras se baja por la sección
export function Statement() {
  const ref = useRef(null)
  const [lit, setLit] = useState(() => (reduceMotion() ? words.length : 0))

  useEffect(() => {
    if (reduceMotion()) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const rect = ref.current.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)))
      setLit(Math.round(progress * (words.length + 1)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="statement" ref={ref} aria-label={statement}>
      <div className="statement__sticky">
        <img
          className={`statement__photo${lit > 1 ? ' is-in' : ''}`}
          src={publicUrl('interior.webp')}
          alt="Interior de la tienda Código Élite con ropa colgada y el letrero"
          loading="lazy"
        />
        <div className="container">
          <p aria-hidden="true">
            {words.map((w, i) => <span key={i} className={`w${i < lit ? ' on' : ''}`}>{w} </span>)}
          </p>
        </div>
      </div>
    </section>
  )
}

export function Steps() {
  return (
    <section className="section section--dark" id="proceso" aria-labelledby="steps-title">
      <div className="container">
        <div className="section__head">
          <h2 id="steps-title">Cómo pedir</h2>
        </div>
        <ol className="steps">
          <li>
            <h3>Elige</h3>
            <p>Recorre el catálogo, escoge talla y color y agrégalo a tu pedido.</p>
          </li>
          <li>
            <h3>Envía tu pedido</h3>
            <p>Un solo toque arma el mensaje con todo lo que elegiste y lo manda por chat.</p>
          </li>
          <li>
            <h3>Confirma y recibe</h3>
            <p>Te confirmamos disponibilidad, forma de pago y entrega. Sin registros ni pagos en la web.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}

// Contacto y ubicación: la foto de la fachada a pantalla completa con la información encima
export function Contact({ onWrite }) {
  const mapsHref = mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}` : null
  return (
    <section className="storefront" id="contacto" aria-labelledby="contact-title">
      <img className="storefront__photo" src={publicUrl('fachada.webp')} alt="" loading="lazy" />
      <div className="container storefront__inner" id="ubicacion">
        <p className="storefront__eyebrow">Visítanos</p>
        <h2 id="contact-title">Te esperamos<br />en el local.</h2>
        <p className="storefront__lead">¿Dudas de tallas, disponibilidad o pedidos especiales? Ven a medirte la pinta o escríbenos.</p>

        <dl className="storefront__facts">
          {business.address && (
            <div>
              <dt>Dirección</dt>
              <dd>{business.address}</dd>
            </div>
          )}
          {business.hours.length > 0 && (
            <div>
              <dt>Horario</dt>
              <dd>{business.hours.map((h) => <span key={h}>{h}</span>)}</dd>
            </div>
          )}
        </dl>

        <div className="storefront__cta">
          {mapsHref && <a className="btn btn--light" href={mapsHref} target="_blank" rel="noopener noreferrer">Cómo llegar</a>}
          <button className="btn btn--outline" type="button" onClick={onWrite}>Escríbenos</button>
        </div>

        <ul className="storefront__social">
          {socials.map(({ label, user, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon />
                <span>{label}</span>
                <small>@{user}</small>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="brand__mark" aria-hidden="true" />
          <p>Código Élite</p>
        </div>
        <nav className="footer__nav" aria-label="Pie de página">
          <a href={link.category('todo')}>Catálogo</a>
          <a href="#categorias">Categorías</a>
          <a href="#proceso">Cómo pedir</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="footer__social">
          {socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>
          ))}
        </div>
      </div>
      <p className="footer__word" aria-hidden="true">Código Élite</p>
      <div className="container footer__legal">
        <p>© {new Date().getFullYear()} Código Élite. Todos los derechos reservados.</p>
        <a href="#top">Volver arriba</a>
      </div>
    </footer>
  )
}
