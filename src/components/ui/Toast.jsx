import { useEffect } from 'react'

/**
 * 01_WEBAPP_STANDARDS 준수 Toast 컴포넌트
 * - 4초 자동 닫힘
 * - role="status", aria-live="polite"
 */
export function Toast({
  message,
  type = 'info',
  isOpen,
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [isOpen, onClose, duration])

  if (!isOpen || !message) return null

  const typeStyles = {
    info: 'bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-line)]',
    success: 'bg-[var(--color-success)] text-white border-transparent',
    danger: 'bg-[var(--color-danger)] text-white border-transparent',
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-50 bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 max-w-sm w-[calc(100%-2rem)] px-4 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-2)] text-[var(--text-small)] font-medium flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 border"
    >
      <div className={`flex items-center gap-2 ${typeStyles[type] || typeStyles.info} w-full px-4 py-3 rounded-[var(--radius-md)]`}>
        <span className="flex-1">{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="min-w-[32px] min-h-[32px] inline-flex items-center justify-center p-1 opacity-70 hover:opacity-100 transition-opacity rounded cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
