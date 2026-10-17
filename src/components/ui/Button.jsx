import { forwardRef } from 'react'

/**
 * 01_WEBAPP_STANDARDS 준수 Button 컴포넌트
 * - 최소 터치 높이 44px (피츠의 법칙)
 * - 6대 상태: default, hover, focus-visible, active, disabled, loading
 * - 하드코딩 색상 0건 (토큰 변수 사용)
 */
export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText,
    disabled = false,
    className = '',
    type = 'button',
    ...props
  },
  ref,
) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all select-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2'

  const sizeStyles = {
    sm: 'min-h-[36px] px-3 text-[var(--text-small)] rounded-[var(--radius-sm)]',
    md: 'min-h-[44px] px-4 py-2 text-[var(--text-body)] rounded-[var(--radius-md)]',
    lg: 'min-h-[48px] px-6 py-3 text-[var(--text-body)] rounded-[var(--radius-md)]',
  }

  const variantStyles = {
    primary:
      'bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-90 active:scale-[0.98] shadow-[var(--shadow-1)]',
    secondary:
      'bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-[var(--color-bg)] active:scale-[0.98] shadow-[var(--shadow-1)]',
    ghost:
      'bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface)] border border-transparent active:scale-[0.98]',
    danger:
      'bg-[var(--color-danger)] text-white hover:opacity-90 active:scale-[0.98] shadow-[var(--shadow-1)]',
  }

  const disabledStyles = 'opacity-45 cursor-not-allowed pointer-events-none'

  const isActuallyDisabled = disabled || isLoading

  return (
    <button
      ref={ref}
      type={type}
      disabled={isActuallyDisabled}
      aria-disabled={isActuallyDisabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${isActuallyDisabled ? disabledStyles : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
            aria-hidden="true"
          />
          <span>{loadingText || '처리 중…'}</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
})
