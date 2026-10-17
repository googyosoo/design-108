import { forwardRef } from 'react'

/**
 * 01_WEBAPP_STANDARDS 준수 Card 컴포넌트
 * - rounded-[var(--radius-lg)] (20px), shadow-[var(--shadow-1)]
 * - 인터랙티브 모드 지원 (hover 피드백, 포커스 링)
 */
export const Card = forwardRef(function Card(
  {
    children,
    interactive = false,
    selected = false,
    className = '',
    onClick,
    as: Component = 'div',
    ...props
  },
  ref,
) {
  const baseStyles =
    'relative bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-5 transition-all text-[var(--color-ink)]'

  const interactiveStyles =
    'cursor-pointer hover:shadow-[var(--shadow-2)] hover:border-[var(--color-ink-muted)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2'

  const selectedStyles = 'border-[var(--color-focus)] ring-2 ring-[var(--color-focus)]/20'

  return (
    <Component
      ref={ref}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick?.(e)
              }
            }
          : undefined
      }
      className={`
        ${baseStyles}
        ${interactive ? interactiveStyles : 'shadow-[var(--shadow-1)]'}
        ${selected ? selectedStyles : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </Component>
  )
})
