import { useState, useMemo, useCallback } from 'react'
import { storage } from '../lib/storage.js'
import { XrayContext } from './xray-context.js'

const XRAY_STORAGE_KEY = 'designmind_xray_enabled'

export function XrayProvider({ children }) {
  const [isXrayEnabled, setIsXrayEnabled] = useState(() => {
    return storage.getItem(XRAY_STORAGE_KEY, false)
  })
  const [activePrincipleId, setActivePrincipleId] = useState(null)

  const toggleXray = useCallback(() => {
    setIsXrayEnabled((prev) => {
      const next = !prev
      storage.setItem(XRAY_STORAGE_KEY, next)
      if (!next) setActivePrincipleId(null)
      return next
    })
  }, [])

  const setXrayEnabled = useCallback((enabled) => {
    setIsXrayEnabled(enabled)
    storage.setItem(XRAY_STORAGE_KEY, enabled)
    if (!enabled) setActivePrincipleId(null)
  }, [])

  const value = useMemo(
    () => ({
      isXrayEnabled,
      toggleXray,
      setXrayEnabled,
      activePrincipleId,
      setActivePrincipleId,
    }),
    [isXrayEnabled, activePrincipleId, toggleXray, setXrayEnabled],
  )

  return <XrayContext.Provider value={value}>{children}</XrayContext.Provider>
}
