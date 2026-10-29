import { useCallback, useSyncExternalStore } from 'react'
import { productById } from './data'

// Lista de ids guardada en el navegador y compartida entre componentes
function persisted(key) {
  let value
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]')
    value = Array.isArray(parsed) ? parsed.filter((id) => productById(id)) : []
  } catch {
    value = []
  }
  const listeners = new Set()
  return {
    get: () => value,
    set(next) {
      value = next
      try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* sin almacenamiento */ }
      listeners.forEach((l) => l())
    },
    subscribe(l) {
      listeners.add(l)
      return () => listeners.delete(l)
    },
  }
}

const favorites = persisted('ce-fav')
const seen = persisted('ce-seen')

export function useFavorites() {
  const ids = useSyncExternalStore(favorites.subscribe, favorites.get)
  const toggle = useCallback((id) => {
    const now = favorites.get()
    favorites.set(now.includes(id) ? now.filter((x) => x !== id) : [...now, id])
  }, [])
  return { ids, has: (id) => ids.includes(id), toggle }
}

export const markSeen = (id) => seen.set([id, ...seen.get().filter((x) => x !== id)].slice(0, 12))
export const useSeen = () => useSyncExternalStore(seen.subscribe, seen.get)
