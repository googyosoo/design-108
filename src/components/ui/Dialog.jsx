import { useEffect, useRef } from 'react'
import { useBreakpoints } from '../../hooks/useMediaQuery.js'

/**
 * 01_WEBAPP_STANDARDS 준수 Dialog & BottomSheet 통합 컴포넌트
 * - 모바일: BottomSheet (화면 하단 슬라이드업 + safe-area)
 * - 태블릿/데스크톱: 중앙 Modal Dialog
 * - WCAG 포커스 가두기, Esc 닫기, 이전 포커스 복원, 스크롤 잠금
 */
export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-md',
  className = '',
}) {
  const { isMobile } = useBreakpoints()
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement
    document.body.style.overflow = 'hidden'

    // 포커스를 다이얼로그로 이동
    const focusTimer = setTimeout(() => {
      dialogRef.current?.focus()
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab' && dialogRef.current) {
        // Focus trap
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        tabIndex={-1}
        className={`
          w-full bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] shadow-[var(--shadow-2)] focus:outline-none transition-all
          ${
            isMobile
              ? 'rounded-t-[var(--radius-lg)] p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom'
              : `${maxWidth} rounded-[var(--radius-lg)] p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95`
          }
          ${className}
        `.trim()}
      >
        {/* 모바일 상단 드래그 인디케이터 바 */}
        {isMobile && (
          <div className="w-12 h-1.5 bg-[var(--color-line)] rounded-full mx-auto mb-4" />
        )}

        <div className="flex items-center justify-between gap-4 mb-4">
          {title && (
            <h2 id="dialog-title" className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] ml-auto"
          >
            ✕
          </button>
        </div>

        <div className="text-[var(--text-body)] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
