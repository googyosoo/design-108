import { useState, useRef, useEffect } from 'react'

/**
 * X-ray 점선 번호 배지 컴포넌트
 * @param {{ id: number, label?: string, description?: string }} props
 */
export function XrayBadge({ id, label, description }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const formattedId = String(id).padStart(3, '0')
  const title = label || `원리 #${formattedId}`
  const desc = description || `화면에 적용된 디자인 심리 원리 #${formattedId}입니다.`

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        aria-expanded={isOpen}
        aria-label={`X-ray 원리 ${formattedId}: ${title}`}
        className="inline-flex items-center justify-center min-w-[24px] h-[24px] px-1.5 text-[11px] font-bold tabular-nums rounded-full border-2 border-dashed border-[var(--color-focus)] bg-[var(--color-surface)] text-[var(--color-focus)] hover:bg-[var(--color-focus)] hover:text-white transition-colors cursor-pointer shadow-[var(--shadow-1)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
      >
        {formattedId}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] rounded-[var(--radius-md)] shadow-[var(--shadow-2)] text-left text-xs animate-in fade-in"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-[var(--color-focus)] tabular-nums">
              #{formattedId}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] p-1 rounded"
              aria-label="닫기"
            >
              ✕
            </button>
          </div>
          <p className="font-semibold text-sm mb-1 text-[var(--color-ink)]">{title}</p>
          <p className="text-[var(--color-ink-muted)] leading-relaxed mb-2">{desc}</p>
          <a
            href={`/effect/${formattedId}`}
            className="inline-block text-[var(--color-focus)] font-medium hover:underline"
          >
            원리 자세히 보기 →
          </a>
        </div>
      )}
    </div>
  )
}
