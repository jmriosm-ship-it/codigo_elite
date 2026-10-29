import { useEffect, useState } from 'react'
import Announcement from './components/Announcement'
import BackgroundLogo from './components/BackgroundLogo'
import WhatsappFab from './components/WhatsappFab'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Rail from './components/Rail'
import { Contact, Footer, Statement, Steps } from './components/Sections'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'
import { products } from './data'
import { useCart, useToast } from './hooks'
import { link, useRoute } from './router'
import { orderText, sendMessage } from './utils'
import { useReveal } from './reveal'

const newest = products.filter((p) => p.isNew)

export default function App() {
  const route = useRoute()
  const [menuOpen, setMenuOpen] = useState(false)
  const cart = useCart()
  const toast = useToast()

  const toggleMenu = () => setMenuOpen((open) => !open)

  // El menú móvil se controla con una clase en <body> (también bloquea el scroll)
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
  }, [menuOpen])

  // Al cambiar de página se empieza arriba; en el inicio, un enlace como #contacto baja a su sección
  const key = `${route.page}-${route.id ?? ''}`
  useReveal(key)
  useEffect(() => {
    const hash = window.location.hash
    if (route.page === 'home' && hash.length > 1 && !hash.startsWith('#/')) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const addLine = (line) => { cart.add(line); toast.notify('Agregado a tu pedido.', { label: 'Ver pedido', href: link.cart }) }

  return (
    <>
      <BackgroundLogo />
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Announcement />
      <Header count={cart.count} menuOpen={menuOpen} onMenu={toggleMenu} />

      <main id="contenido" className="page" key={key}>
        {route.page === 'home' && (
          <>
            <Hero />
            <Categories />
            <Rail id="nuevo" title="Lo nuevo" items={newest} moreHref={link.category('todo')} moreLabel="Ver todo el catálogo" />
            <Statement />
            <Steps />
            <Contact onWrite={() => sendMessage('Hola Código Élite, quiero más información.', toast.notify)} />
          </>
        )}
        {route.page === 'cart' && <CartPage cart={cart} onSend={() => sendMessage(orderText(cart.items), toast.notify)} />}
        {route.page === 'favorites' && <FavoritesPage />}
        {route.page === 'category' && <CategoryPage key={route.id} id={route.id} />}
        {route.page === 'product' && (
          <ProductPage id={route.id} onAdd={addLine} onOrderNow={(line) => sendMessage(orderText([line]), toast.notify)} />
        )}
      </main>

      <Footer />

      <WhatsappFab lifted={route.page === 'product'} />

      <div className={`toast${toast.on ? ' is-on' : ''}`} role="status" aria-live="polite">
        <span>{toast.message}</span>
        {toast.action && <a href={toast.action.href} tabIndex={toast.on ? 0 : -1}>{toast.action.label}</a>}
      </div>
    </>
  )
}
