import { business } from '../data'
import { WhatsappIcon } from './Icons'

const hello = 'Hola Código Élite, quiero más información.'

// Botón flotante de chat: WhatsApp si hay número; si no, mensaje directo de Instagram
export default function WhatsappFab({ lifted }) {
  const href = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(hello)}`
    : `https://ig.me/m/${business.instagramUser}`

  return (
    <a className={`fab${lifted ? ' fab--lifted' : ''}`} href={href} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por chat">
      <WhatsappIcon />
      <span>Escríbenos</span>
    </a>
  )
}
