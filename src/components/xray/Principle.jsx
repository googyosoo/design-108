import { useXray } from '../../hooks/useXray.js'
import { XrayBadge } from './XrayBadge.jsx'

/**
 * X-ray 원리 래퍼 컴포넌트
 * @param {{
 *   ids: number[],
 *   className?: string,
 *   position?: 'top-right' | 'top-left' | 'bottom-right' | 'inline',
 *   children: React.ReactNode
 * }} props
 */
export function Principle({ ids = [], className = '', position = 'top-right', children }) {
  const { isXrayEnabled } = useXray()

  if (!isXrayEnabled || !ids.length) {
    return children
  }

  const positionClasses = {
    'top-right': 'top-1 right-1',
    'top-left': 'top-1 left-1',
    'bottom-right': 'bottom-1 right-1',
    'inline': 'relative inline-flex items-center gap-1',
  }

  return (
    <div className={`relative group/xray ${className}`}>
      {children}
      <div
        className={`absolute z-30 flex items-center gap-1 pointer-events-auto ${positionClasses[position] || positionClasses['top-right']}`}
      >
        {ids.map((id) => (
          <XrayBadge key={id} id={id} />
        ))}
      </div>
    </div>
  )
}
