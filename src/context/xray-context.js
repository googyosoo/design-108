import { createContext, useContext } from 'react'

export const XrayContext = createContext({
  isXrayEnabled: false,
  toggleXray: () => {},
  setXrayEnabled: () => {},
  activePrincipleId: null,
  setActivePrincipleId: () => {},
})

export function useXray() {
  const context = useContext(XrayContext)
  if (!context) {
    throw new Error('useXray must be used within an XrayProvider')
  }
  return context
}
