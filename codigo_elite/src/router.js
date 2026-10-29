import { useEffect, useState } from 'react'

// Rutas en la URL (sirven en cualquier hosting estático): #/categoria/hoodies · #/categoria/todo · #/prenda/3
function parse() {
  const hash = decodeURIComponent(window.location.hash)
  let match = hash.match(/^#\/categoria\/([\w-]+)$/)
  if (match) return { page: 'category', id: match[1] }
  match = hash.match(/^#\/prenda\/(\d+)$/)
  if (match) return { page: 'product', id: Number(match[1]) }
  if (hash === '#/pedido') return { page: 'cart' }
  if (hash === '#/favoritos') return { page: 'favorites' }
  return { page: 'home' }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export const link = {
  home: '#/',
  category: (id) => `#/categoria/${id}`,
  product: (id) => `#/prenda/${id}`,
  cart: '#/pedido',
  favorites: '#/favoritos',
}
