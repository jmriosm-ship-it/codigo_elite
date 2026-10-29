import { useEffect, useState } from 'react'
import { business } from '../data'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons'

const messages = business.announcements || []
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Cinta superior: frases que rotan solas (se pausa al pasar el mouse)
export default function Announcement() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || messages.length < 2 || reduceMotion()) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4500)
    return () => clearInterval(id)
  }, [paused, index])

  if (!messages.length) return null
  const go = (delta) => setIndex((i) => (i + delta + messages.length) % messages.length)

  return (
    <div className="announce" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {messages.length > 1 && (
        <button type="button" className="announce__btn" aria-label="Anterior" onClick={() => go(-1)}><ArrowLeftIcon /></button>
      )}
      <p className="announce__text" key={index} aria-live="polite">{messages[index]}</p>
      {messages.length > 1 && (
        <button type="button" className="announce__btn" aria-label="Siguiente" onClick={() => go(1)}><ArrowRightIcon /></button>
      )}
    </div>
  )
}
