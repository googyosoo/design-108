/**
 * localStorage 안전 래퍼 함수군
 * 시크릿 모드, 서드파티 쿠키 차단, 저장공간 초과(QuotaExceededError) 환경에서도
 * 앱이 크래시되지 않고 안전하게 fallback 되도록 try/catch 래핑
 */

const memoryStorage = new Map()

export const storage = {
  getItem: (key, defaultValue = null) => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return memoryStorage.has(key) ? memoryStorage.get(key) : defaultValue
      }
      const item = window.localStorage.getItem(key)
      if (item === null) return defaultValue
      try {
        return JSON.parse(item)
      } catch {
        return item
      }
    } catch {
      return memoryStorage.has(key) ? memoryStorage.get(key) : defaultValue
    }
  },

  setItem: (key, value) => {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value)
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, serialized)
      }
      memoryStorage.set(key, value)
      return true
    } catch {
      memoryStorage.set(key, value)
      return false
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key)
      }
      memoryStorage.delete(key)
      return true
    } catch {
      memoryStorage.delete(key)
      return false
    }
  },

  clear: () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear()
      }
      memoryStorage.clear()
      return true
    } catch {
      memoryStorage.clear()
      return false
    }
  },
}
