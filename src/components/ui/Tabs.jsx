import { useRef } from 'react'

/**
 * 01_WEBAPP_STANDARDS 준수 Tabs 컴포넌트
 * - WAI-ARIA tablist / tab / tabpanel 패턴
 * - 좌우 화살표 키보드 순회
 */
export function Tabs({
  items = [],
  activeTab,
  onChange,
  className = '',
  tabListClassName = '',
}) {
  const tabRefs = useRef([])

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const nextIndex = (index + 1) % items.length
      onChange(items[nextIndex].id)
      tabRefs.current[nextIndex]?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prevIndex = (index - 1 + items.length) % items.length
      onChange(items[prevIndex].id)
      tabRefs.current[prevIndex]?.focus()
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={`flex items-center gap-1 p-1 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-x-auto ${tabListClassName}`}
      >
        {items.map((item, idx) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              ref={(el) => (tabRefs.current[idx] = el)}
              role="tab"
              type="button"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`
                min-h-[40px] px-4 py-1.5 text-[var(--text-small)] font-medium rounded-[var(--radius-sm)] transition-all whitespace-nowrap cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]
                ${
                  isActive
                    ? 'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[var(--shadow-1)] font-semibold'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }
              `.trim()}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
