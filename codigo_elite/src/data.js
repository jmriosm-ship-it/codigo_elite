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
export const guideOf = (category) => (['pantalones', 'shorts'].includes(category) ? sizeGuides.bottoms : ['camisetas', 'hoodies', 'chaquetas'].includes(category) ? sizeGuides.tops : null)

// type = silueta que se dibuja cuando una prenda aún no tiene foto
// cover = (opcional) foto de la categoría (tarjeta del carrusel y portada), ej: 'productos/hoodie.webp' dentro de public/
export const categories = [
  { id: 'camisetas', name: 'Camisetas', type: 'tee', blurb: 'Básicas y oversize para todos los días.', cover: 'productos/camiseta-negra.webp' },
  { id: 'hoodies', name: 'Hoodies', type: 'hoodie', blurb: 'Capucha, abrigo y presencia.', cover: 'productos/hoodie-capsulas.webp' },
  { id: 'pantalones', name: 'Pantalones', type: 'pants', blurb: 'Jeans, joggers y cortes rectos que combinan con todo.', cover: 'productos/jean-negro.webp' },
  { id: 'shorts', name: 'Shorts', type: 'shorts', blurb: 'Livianos, cómodos y con estilo.' },
  { id: 'chaquetas', name: 'Chaquetas', type: 'jacket', blurb: 'La capa que remata la pinta.' },
  { id: 'gorras', name: 'Gorras', type: 'cap', blurb: 'El detalle final.', cover: 'productos/gorra-vintage-roja.webp' },
  // Accesorios agrupa carteras, bolsos, perfumes, canguros y carrieles
  { id: 'accesorios', name: 'Accesorios', type: 'bag', blurb: 'Carteras, bolsos, perfumes, canguros y carrieles.', cover: 'productos/morral-shark.webp' },
  // soon: true = categoría que aún no tiene productos (se muestra como "Muy pronto")
  { id: 'relojes', name: 'Relojes', type: 'watch', blurb: 'Cronógrafos con presencia para completar la pinta.', cover: 'productos/reloj-dorado.webp' },
]

// Categoría especial que agrupa todo el catálogo
export const allCategory = { id: 'todo', name: 'Todo el catálogo', type: 'mark', blurb: 'Todas las prendas en un solo lugar.' }

export const colors = {
  negro: { name: 'Negro', hex: '#151515' },
  blanco: { name: 'Blanco', hex: '#f4f4f2' },
  gris: { name: 'Gris', hex: '#8d8d90' },
  arena: { name: 'Arena', hex: '#cdbea5' },
  oliva: { name: 'Oliva', hex: '#5c6048' },
  cafe: { name: 'Café', hex: '#6b4a32' },
  plata: { name: 'Plateado', hex: '#9a9ca0' },
  azul: { name: 'Azul oscuro', hex: '#1f2a44' },
}

// Para usar una foto real: agrega  image: 'productos/hoodie-codigo.jpg'  (la foto va en la carpeta public/productos)
// Una foto por color: imagesByColor: { negro: 'productos/hoodie-negro.jpg', gris: 'productos/hoodie-gris.jpg' }
export const products = [
  { id: 1, name: 'Camiseta Oversize Élite', category: 'camisetas', price: 79900, colors: ['negro', 'blanco', 'gris'], imagesByColor: { negro: 'productos/camiseta-negra.webp' }, sizes: ['S', 'M', 'L', 'XL'], isNew: true, description: 'Corte oversize en algodón pesado. Cuello reforzado y caída recta.' },
  { id: 2, name: 'Camiseta Básica Heavy', category: 'camisetas', price: 59900, colors: ['arena', 'blanco', 'negro'], imagesByColor: { arena: 'productos/camiseta-arena.webp' }, sizes: ['S', 'M', 'L', 'XL'], description: 'La básica que combina con todo. Tela gruesa que no se transparenta.' },
  { id: 3, name: 'Hoodie Zip Cápsulas', category: 'hoodies', price: 159900, colors: ['negro'], image: 'productos/hoodie-capsulas.webp', sizes: ['S', 'M', 'L', 'XL'], isNew: true, description: 'Hoodie negro con cremallera completa, logo al frente y estampado grande de cápsulas en la espalda.' },
  { id: 4, status: 'ultimas', name: 'Hoodie Zip Azul', category: 'hoodies', price: 169900, colors: ['negro'], image: 'productos/hoodie-azul.webp', sizes: ['M', 'L', 'XL'], description: 'Hoodie negro con cremallera, detalles en azul y estampado gráfico en la espalda.' },
  { id: 5, name: 'Jogger Cargo', category: 'pantalones', price: 149900, colors: ['negro', 'oliva', 'arena'], sizes: ['28', '30', '32', '34'], isNew: true, description: 'Bolsillos cargo laterales, cintura elástica y tobillo ajustado.' },
  { id: 6, name: 'Jean Recto Urbano', category: 'pantalones', price: 139900, colors: ['negro', 'azul'], imagesByColor: { negro: 'productos/jean-negro.webp', azul: 'productos/jean-azul.webp' }, sizes: ['28', '30', '32', '34', '36'], description: 'Jean de corte recto en denim de tono oscuro, con cinco bolsillos y pretina firme.' },
  { id: 7, name: 'Short Mesh Sport', category: 'shorts', price: 69900, colors: ['negro', 'blanco'], sizes: ['S', 'M', 'L', 'XL'], description: 'Liviano y ventilado, ideal para entrenar o para el día a día.' },
  { id: 8, status: 'agotado', name: 'Short Algodón Club', category: 'shorts', price: 79900, colors: ['gris', 'arena', 'negro'], sizes: ['S', 'M', 'L', 'XL'], description: 'Algodón suave con cordón ajustable y bolsillos laterales.' },
  { id: 9, name: 'Chaqueta Bomber', category: 'chaquetas', price: 219900, colors: ['negro', 'oliva'], sizes: ['M', 'L', 'XL'], isNew: true, description: 'Bomber clásica con forro interior, cuello y puños acanalados.' },
  { id: 10, status: 'preventa', name: 'Cortavientos Lite', category: 'chaquetas', price: 189900, colors: ['negro', 'gris'], sizes: ['S', 'M', 'L', 'XL'], description: 'Ligera y resistente al viento. Se guarda en su propio bolsillo.' },
  { id: 11, name: 'Gorra Trucker Vintage Roja', category: 'gorras', price: 64900, colors: ['negro'], image: 'productos/gorra-vintage-roja.webp', sizes: ['Única'], isNew: true, description: 'Gorra trucker negra con malla trasera, bordado en relieve y detalles en rojo.' },
  // Accesorios (EJEMPLO). type: 'perfume' cambia el dibujo de ese producto
  { id: 13, name: 'Canguro Cuadros', category: 'accesorios', price: 89900, colors: ['negro'], image: 'productos/canguro-cuadros.webp', sizes: ['Única'], isNew: true, description: 'Canguro de cuadros gris y negro con base en cuero, correa ajustable y hebilla metálica.' },
  { id: 14, name: 'Mochila Grabada Premium', category: 'accesorios', price: 189900, colors: ['negro'], image: 'productos/mochila-grabada.webp', sizes: ['Única'], description: 'Mochila en cuero negro con monograma en relieve, bolsillo frontal y correas ajustables.' },
  { id: 18, name: 'Morral Shark Brillantes', category: 'accesorios', price: 219900, colors: ['negro'], image: 'productos/morral-shark-producto.webp', sizes: ['Única'], isNew: true, description: 'Morral negro con la boca de tiburón en brillantes rojos y blancos, y llavero a juego.' },
  { id: 15, name: 'Carriel Cuadros', category: 'accesorios', price: 149900, colors: ['negro'], image: 'productos/carriel-cuadros.webp', sizes: ['Única'], description: 'Carriel cruzado de cuadros con detalles en cuero, mosquetón y correa ajustable.' },
  // Relojes
  { id: 19, name: 'Reloj Cronógrafo Dorado', category: 'relojes', type: 'watch', price: 249900, colors: ['negro'], image: 'productos/reloj-dorado.webp', sizes: ['Única'], isNew: true, description: 'Cronógrafo con caja negra, detalles dorados, fechador y pulso metálico. Incluye estuche.' },
  { id: 20, name: 'Reloj Cronógrafo Azul', category: 'relojes', type: 'watch', price: 249900, colors: ['plata'], image: 'productos/reloj-azul.webp', sizes: ['Única'], isNew: true, description: 'Cronógrafo plateado con esfera negra, detalles azules y fechador. Incluye estuche.' },
  { id: 16, name: 'Perfume Ultra Intenso', category: 'accesorios', type: 'perfume', price: 99900, colors: ['negro'], image: 'productos/perfume-ultra.webp', sizes: ['125 ml'], isNew: true, description: 'Fragancia masculina intensa de larga duración, en frasco negro con su estuche metálico.' },
  { id: 12, name: 'Gorra Trucker Brillantes', category: 'gorras', price: 74900, colors: ['negro'], image: 'productos/gorra-brillantes.webp', sizes: ['Única'], isNew: true, description: 'Gorra trucker negra con bordado tono a tono y aplicaciones de brillantes en toda la corona.' },
  { id: 17, name: 'Gorra Trucker Vintage Blanca', category: 'gorras', price: 64900, colors: ['negro'], image: 'productos/gorra-vintage-blanca.webp', sizes: ['Única'], description: 'Gorra trucker negra con malla trasera y bordado blanco en relieve.' },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))
export const productById = (id) => products.find((p) => p.id === id)
