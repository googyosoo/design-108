import { useEffect, useState, useMemo, useCallback } from 'react'
import { storage } from '../lib/storage.js'
import { ThemeContext } from './theme-context.js'

const THEME_STORAGE_KEY = 'designmind_theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return storage.getItem(THEME_STORAGE_KEY, 'system')
  })

  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e) => setSystemIsDark(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemIsDark ? 'dark' : 'light'
    }
    return theme
  }, [theme, systemIsDark])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
    storage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme, resolvedTheme])

  const setTheme = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark' || newTheme === 'system') {
      setThemeState(newTheme)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const currentResolved = prev === 'system' ? (systemIsDark ? 'dark' : 'light') : prev
      return currentResolved === 'dark' ? 'light' : 'dark'
    })
  }, [systemIsDark])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
