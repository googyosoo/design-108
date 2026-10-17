import { useState, useEffect, useCallback } from 'react'
import { storage } from '../lib/storage.js'

const FAVORITES_KEY = 'designmind_favorites'
const FAVORITES_CHANGE_EVENT = 'designmind_favorites_changed'

/**
 * 즐겨찾기(Favorites) 관리 훅
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    return storage.getItem(FAVORITES_KEY, [])
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const current = storage.getItem(FAVORITES_KEY, [])
      setFavorites(current)
    }

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const toggleFavorite = useCallback((effectId) => {
    const id = Number(effectId)
    const current = storage.getItem(FAVORITES_KEY, [])
    const exists = current.includes(id)
    const updated = exists ? current.filter((x) => x !== id) : [...current, id]

    storage.setItem(FAVORITES_KEY, updated)
    setFavorites(updated)
    window.dispatchEvent(new Event(FAVORITES_CHANGE_EVENT))
    return !exists
  }, [])

  const isFavorite = useCallback(
    (effectId) => {
      return favorites.includes(Number(effectId))
    },
    [favorites]
  )

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  }
}
