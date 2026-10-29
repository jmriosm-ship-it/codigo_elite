import { useEffect } from 'react'

// Lo que aparece con un desvanecido suave al entrar en pantalla (y se esconde al salir por abajo)
const targets = [
  '.section__head', '.tiles .tile', '.rail__track .card', '.steps li',
  '.contact > *', '.visit > *', '.pp__gallery', '.pp__info', '.next',
].join(',')

export function useReveal(key) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined

    const timers = new Map()
    const cancel = (el) => { clearTimeout(timers.get(el)); timers.delete(el) }

    const show = (el) => {
      cancel(el)
      el.classList.add('reveal', 'is-in')
      // Ya visible: se limpia para no pelear con los hover del elemento
      timers.set(el, setTimeout(() => el.classList.remove('reveal', 'is-in'), 1400))
    }
    const hide = (el) => {
      cancel(el)
      el.classList.add('reveal')
      el.classList.remove('is-in')
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
        // Fuera de pantalla por abajo → se esconde; por arriba (ya pasó) → se deja visible
        if (isIntersecting || boundingClientRect.top <= 0) show(target)
        else hide(target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    document.querySelectorAll(targets).forEach((el) => {
      const index = [...el.parentElement.children].indexOf(el)
      el.style.setProperty('--d', `${Math.min(index, 5) * 70}ms`)
      el.classList.add('reveal')
      io.observe(el)
    })

    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [key])
}
