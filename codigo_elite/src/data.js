/* =========================================================
   Código Élite — datos de la tienda
   Aquí se edita todo: datos del negocio, categorías y prendas.
   Las prendas de abajo son DE EJEMPLO (nombres, precios y fotos).
   ========================================================= */

export const business = {
  name: 'Código Élite',
  // Número con indicativo, sin + ni espacios. Ejemplo: 573001234567
  // Mientras esté vacío, los pedidos se copian y se abren por Instagram.
  whatsapp: '',
  instagram: 'https://www.instagram.com/codigo_elite.col/',
  instagramUser: 'codigo_elite.col',
  tiktok: 'https://www.tiktok.com/@codigo_elite.col',
  tiktokUser: 'codigo_elite.col',
  // Ubicación: cuando pongas la dirección aparece el mapa en la sección de contacto.
  // address = lo que se lee en la página · mapQuery = (opcional) búsqueda más precisa para el mapa
  // EJEMPLO: cambiar por la dirección y el horario reales cuando se confirmen
  address: 'Centro, Ocaña, Norte de Santander',
  mapQuery: 'Centro, Ocaña, Norte de Santander, Colombia',
  hours: ['Lunes a sábado: 9am a 7pm', 'Domingos: 9am a 1pm'],
  // Frases de la cinta superior (EJEMPLO: cambiar por las reales)
  announcements: ['Pide por chat, sin registros ni pagos en la web', 'Piezas nuevas cada semana', 'Escríbenos y te asesoramos con la talla'],
}

// status en una prenda: 'agotado' · 'ultimas' · 'preventa'  (sin status = disponible)
export const statuses = { agotado: 'Agotado', ultimas: 'Últimas unidades', preventa: 'Preventa' }

// Guía de tallas por tipo de prenda (medidas EJEMPLO en cm: reemplazar por las reales)
export const sizeGuides = {
  tops: { head: ['Talla', 'Pecho', 'Largo'], rows: [['S', '96', '68'], ['M', '102', '70'], ['L', '108', '72'], ['XL', '114', '74']] },
  bottoms: { head: ['Talla', 'Cintura', 'Largo'], rows: [['28', '72', '98'], ['30', '76', '100'], ['32', '80', '102'], ['34', '84', '104'], ['36', '88', '106']] },
}
export const guideOf = (category) => (['pantalones', 'shorts'].includes(category) ? sizeGuides.bottoms : category === 'gorras' ? null : sizeGuides.tops)

// type = silueta que se dibuja cuando una prenda aún no tiene foto
// cover = (opcional) foto de portada de la categoría, ej: '/categorias/hoodies.jpg' dentro de public/
export const categories = [
  { id: 'camisetas', name: 'Camisetas', type: 'tee', blurb: 'Básicas y oversize para todos los días.' },
  { id: 'hoodies', name: 'Hoodies', type: 'hoodie', blurb: 'Capucha, abrigo y presencia.' },
  { id: 'pantalones', name: 'Pantalones', type: 'pants', blurb: 'Joggers y cortes rectos que combinan con todo.' },
  { id: 'shorts', name: 'Shorts', type: 'shorts', blurb: 'Livianos, cómodos y con estilo.' },
  { id: 'chaquetas', name: 'Chaquetas', type: 'jacket', blurb: 'La capa que remata la pinta.' },
  { id: 'gorras', name: 'Gorras', type: 'cap', blurb: 'El detalle final.' },
]

// Categoría especial que agrupa todo el catálogo
export const allCategory = { id: 'todo', name: 'Todo el catálogo', type: 'mark', blurb: 'Todas las prendas en un solo lugar.' }

export const colors = {
  negro: { name: 'Negro', hex: '#151515' },
  blanco: { name: 'Blanco', hex: '#f4f4f2' },
  gris: { name: 'Gris', hex: '#8d8d90' },
  arena: { name: 'Arena', hex: '#cdbea5' },
  oliva: { name: 'Oliva', hex: '#5c6048' },
}

// Para usar una foto real: agrega  image: '/productos/hoodie-codigo.jpg'  (la foto va en la carpeta public/productos)
// Una foto por color: imagesByColor: { negro: '/productos/hoodie-negro.jpg', gris: '/productos/hoodie-gris.jpg' }
export const products = [
  { id: 1, name: 'Camiseta Oversize Élite', category: 'camisetas', price: 79900, colors: ['negro', 'blanco', 'gris'], sizes: ['S', 'M', 'L', 'XL'], isNew: true, description: 'Corte oversize en algodón pesado. Cuello reforzado y caída recta.' },
  { id: 2, name: 'Camiseta Básica Heavy', category: 'camisetas', price: 59900, colors: ['blanco', 'negro', 'arena'], sizes: ['S', 'M', 'L', 'XL'], description: 'La básica que combina con todo. Tela gruesa que no se transparenta.' },
  { id: 3, name: 'Hoodie Código', category: 'hoodies', price: 159900, colors: ['negro', 'gris', 'oliva'], sizes: ['S', 'M', 'L', 'XL'], isNew: true, description: 'Hoodie con capucha doble y bolsillo canguro. Interior afelpado.' },
  { id: 4, status: 'ultimas', name: 'Hoodie Zip Essential', category: 'hoodies', price: 169900, colors: ['negro', 'arena'], sizes: ['M', 'L', 'XL'], description: 'Cremallera completa, puños acanalados y ajuste cómodo.' },
  { id: 5, name: 'Jogger Cargo', category: 'pantalones', price: 149900, colors: ['negro', 'oliva', 'arena'], sizes: ['28', '30', '32', '34'], isNew: true, description: 'Bolsillos cargo laterales, cintura elástica y tobillo ajustado.' },
  { id: 6, name: 'Pantalón Recto Urbano', category: 'pantalones', price: 139900, colors: ['negro', 'gris'], sizes: ['28', '30', '32', '34', '36'], description: 'Corte recto, tela con caída y cintura con pretina firme.' },
  { id: 7, name: 'Short Mesh Sport', category: 'shorts', price: 69900, colors: ['negro', 'blanco'], sizes: ['S', 'M', 'L', 'XL'], description: 'Liviano y ventilado, ideal para entrenar o para el día a día.' },
  { id: 8, status: 'agotado', name: 'Short Algodón Club', category: 'shorts', price: 79900, colors: ['gris', 'arena', 'negro'], sizes: ['S', 'M', 'L', 'XL'], description: 'Algodón suave con cordón ajustable y bolsillos laterales.' },
  { id: 9, name: 'Chaqueta Bomber', category: 'chaquetas', price: 219900, colors: ['negro', 'oliva'], sizes: ['M', 'L', 'XL'], isNew: true, description: 'Bomber clásica con forro interior, cuello y puños acanalados.' },
  { id: 10, status: 'preventa', name: 'Cortavientos Lite', category: 'chaquetas', price: 189900, colors: ['negro', 'gris'], sizes: ['S', 'M', 'L', 'XL'], description: 'Ligera y resistente al viento. Se guarda en su propio bolsillo.' },
  { id: 11, name: 'Gorra Plana CE', category: 'gorras', price: 64900, colors: ['negro', 'blanco'], sizes: ['Única'], description: 'Visera plana, ajuste trasero regulable y logo bordado.' },
  { id: 12, name: 'Gorra Dad Hat', category: 'gorras', price: 59900, colors: ['arena', 'negro', 'oliva'], sizes: ['Única'], description: 'Visera curva, tela lavada y corona suave de seis paneles.' },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))
export const productById = (id) => products.find((p) => p.id === id)
