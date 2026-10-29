import { useEffect, useRef } from 'react'

// Logo completo y tenue fijo detrás de todo el sitio. Flota solo y se desplaza un poco con el mouse y el scroll.
// Solo se ve en las zonas blancas: las secciones negras y las tarjetas lo tapan.
export default function BackgroundLogo() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const el = ref.current
    const target = { x: 0, y: 0 }
    const now = { x: 0, y: 0 }
    const pointer = { x: 0, y: 0 }
    let frame = 0

    const tick = () => {
      now.x += (target.x - now.x) * 0.06
      now.y += (target.y - now.y) * 0.06
      el.style.transform = `translate3d(${now.x.toFixed(2)}px, ${now.y.toFixed(2)}px, 0)`
      const moving = Math.abs(target.x - now.x) > 0.05 || Math.abs(target.y - now.y) > 0.05
      frame = moving ? requestAnimationFrame(tick) : 0
    }
    const kick = () => { if (!frame) frame = requestAnimationFrame(tick) }
    const update = () => {
      target.x = pointer.x
      target.y = pointer.y - Math.min(window.scrollY * 0.06, 120)
      kick()
    }
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * -56
      pointer.y = (e.clientY / window.innerHeight - 0.5) * -56
      update()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="bglogo" aria-hidden="true">
      <div className="bglogo__move" ref={ref}>
        <div className="bglogo__img" />
      </div>
    </div>
  )
}
