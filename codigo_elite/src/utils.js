import { business, colors, productById } from './data'

export const money = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

// ¿Esta prenda tiene vista de espalda? (siluetas siempre; con foto, solo si trae imageBack)
export const hasBack = (product) => !(product.image || product.imagesByColor) || !!product.imageBack

export const publicUrl = (file) => `${import.meta.env.BASE_URL}${file}`

export function orderText(lines) {
  const rows = lines.map((i) => {
    const p = productById(i.id)
    return `• ${i.qty} x ${p.name} (${colors[i.color].name}, talla ${i.size}) — ${money(p.price * i.qty)}`
  })
  const total = lines.reduce((n, i) => n + productById(i.id).price * i.qty, 0)
  return `Hola Código Élite, quiero hacer este pedido:\n\n${rows.join('\n')}\n\nTotal estimado: ${money(total)}\n\n¿Me confirman disponibilidad?`
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy') } catch { /* sin portapapeles */ }
    document.body.removeChild(ta)
  }
}

// Con WhatsApp configurado abre el chat con el mensaje; si no, copia el pedido y abre Instagram
export async function sendMessage(text, notify) {
  if (business.whatsapp) {
    window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    return
  }
  await copyText(text)
  notify('Pedido copiado. Pégalo en el chat de Instagram.')
  window.open(`https://ig.me/m/${business.instagramUser}`, '_blank', 'noopener')
}

export const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
