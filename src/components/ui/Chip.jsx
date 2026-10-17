import { forwardRef } from 'react'

/**
 * 01_WEBAPP_STANDARDS 준수 Chip 컴포넌트
 * - 필터 토글 및 태그용
 * - radius-full (9999px)
 * - 6대 상태 구현
 */
export const Chip = forwardRef(function Chip(
  {
    children,
    selected = false,
    count,
    disabled = false,
    onClick,
    className = '',
    type = 'button',
    ...props
  },
  ref,
) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-[var(--text-caption)] font-medium rounded-[var(--radius-full)] transition-all select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2'

  const selectedStyles =
    'bg-[var(--color-ink)] text-[var(--color-bg)] border border-[var(--color-ink)] shadow-[var(--shadow-1)]'

  const unselectedStyles =
    'bg-[var(--color-surface)] text-[var(--color-ink-muted)] border border-[var(--color-line)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-muted)]'

  const disabledStyles = 'opacity-45 cursor-not-allowed pointer-events-none'

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${selected ? selectedStyles : unselectedStyles}
        ${disabled ? disabledStyles : ''}
        ${className}
      `.trim()}
      {...props}
    >
      <span>{children}</span>
      {typeof count !== 'undefined' && count !== null && (
        <span
          className={`px-1.5 py-0.5 rounded-full text-[11px] tabular-nums font-semibold ${
            selected
              ? 'bg-[var(--color-bg)] text-[var(--color-ink)]'
              : 'bg-[var(--color-bg)] text-[var(--color-ink-muted)]'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  )
})
