import { forwardRef } from 'react'

/**
 * 01_WEBAPP_STANDARDS 준수 IconButton 컴포넌트
 * - 최소 44×44px 터치 규격
 * - aria-label 필수 (스크린리더 지원)
 * - 6대 상태 구현
 */
export const IconButton = forwardRef(function IconButton(
  {
    icon,
    children,
    'aria-label': ariaLabel,
    variant = 'ghost',
    disabled = false,
    isLoading = false,
    className = '',
    type = 'button',
    ...props
  },
  ref,
) {
  if (!ariaLabel) {
    console.warn('IconButton: aria-label 속성은 웹 접근성을 위해 필수입니다.')
  }

  const baseStyles =
    'relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-[44px] h-[44px] rounded-[var(--radius-md)] transition-all select-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2'

  const variantStyles = {
    ghost:
      'bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface)] active:scale-[0.98]',
    secondary:
      'bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-[var(--color-bg)] active:scale-[0.98] shadow-[var(--shadow-1)]',
    primary:
      'bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-90 active:scale-[0.98] shadow-[var(--shadow-1)]',
  }

  const disabledStyles = 'opacity-45 cursor-not-allowed pointer-events-none'
  const isActuallyDisabled = disabled || isLoading

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      disabled={isActuallyDisabled}
      aria-disabled={isActuallyDisabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.ghost}
        ${isActuallyDisabled ? disabledStyles : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {isLoading ? (
        <span
          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden="true"
        />
      ) : (
        icon || children
      )}
    </button>
  )
})
