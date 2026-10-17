import { useSyncExternalStore } from 'react'

/**
 * 미디어 쿼리 감지 훅 (useSyncExternalStore 기반 React 19 최신 표준)
 * @param {string} query - CSS 미디어 쿼리 문자열 (예: '(min-width: 1024px)')
 * @returns {boolean} 매칭 여부
 */
export function useMediaQuery(query) {
  const subscribe = (callback) => {
    if (typeof window === 'undefined') return () => {}
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }

  const getSnapshot = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * 01_WEBAPP_STANDARDS 브레이크포인트 사전 정의 훅
 */
export function useBreakpoints() {
  const isTablet = useMediaQuery('(min-width: 640px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isWide = useMediaQuery('(min-width: 1440px)')

  return {
    isMobile: !isTablet,
    isTablet: isTablet && !isDesktop,
    isDesktop,
    isWide,
  }
}
