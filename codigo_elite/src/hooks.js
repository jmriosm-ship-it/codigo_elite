import { useCallback, useEffect, useRef, useState } from 'react'
import { productById } from './data'

const KEY = 'ce-cart'

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(parsed) ? parsed.filter((i) => productById(i.id)) : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* sin almacenamiento */ }
  }, [items])

  const add = useCallback((line) => {
    setItems((prev) => {
      const hit = prev.find((i) => i.id === line.id && i.color === line.color && i.size === line.size)
      if (hit) return prev.map((i) => (i === hit ? { ...i, qty: i.qty + line.qty } : i))
      return [...prev, line]
    })
  }, [])
  const change = useCallback((index, delta) => {
    setItems((prev) => prev.flatMap((i, n) => (n !== index ? [i] : i.qty + delta > 0 ? [{ ...i, qty: i.qty + delta }] : [])))
  }, [])
  const remove = useCallback((index) => setItems((prev) => prev.filter((_, n) => n !== index)), [])
  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((n, i) => n + productById(i.id).price * i.qty, 0)
  return { items, add, change, remove, clear, count, total }
}

// Conecta un <dialog> nativo con un estado "abierto" de React
export function useDialog(open, onClose) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const onNativeClose = () => onClose()
    const onBackdrop = (e) => { if (e.target === el) el.close() }
    el.addEventListener('close', onNativeClose)
    el.addEventListener('click', onBackdrop)
    return () => {
      el.removeEventListener('close', onNativeClose)
      el.removeEventListener('click', onBackdrop)
    }
  }, [onClose])

  return ref
}

export function useToast() {
  const [message, setMessage] = useState('')
  const [action, setAction] = useState(null)
  const [on, setOn] = useState(false)
  const timer = useRef(0)

  // action = { label, href } (opcional): un enlace dentro del aviso
  const notify = useCallback((text, link = null) => {
    setMessage(text)
    setAction(link)
    setOn(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOn(false), 3200)
  }, [])

  return { message, action, on, notify }
}
