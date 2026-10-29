import { link } from '../router'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__mark-wrap">
          <div className="hero__mark" role="img" aria-label="Código Élite" />
        </div>
        <h1 id="hero-title">
          <span>Viste</span> <span>con</span> <span>código.</span>
        </h1>
        <p className="hero__lead">
          Ropa para quienes saben lo que quieren. Mira el catálogo, arma tu pedido y ciérralo directo por chat.
        </p>
        <div className="hero__cta">
          <a className="btn btn--light" href={link.category('todo')}>Ver catálogo</a>
          <a className="btn btn--outline" href="#contacto">Escríbenos</a>
        </div>
      </div>
    </section>
  )
}
