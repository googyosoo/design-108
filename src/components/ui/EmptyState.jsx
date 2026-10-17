import { Button } from './Button.jsx'

/**
 * 01_WEBAPP_STANDARDS 준수 EmptyState 컴포넌트
 * - 아이콘/일러스트 + 한 줄 안내 + 다음 행동(CTA) 버튼
 * - 사용자를 탓하지 않고 다음 경로를 제시
 */
export function EmptyState({
  icon,
  title = '항목이 아직 없어요',
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[var(--color-bg)] border border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink-muted)] mb-4 text-2xl">
        {icon || '🔍'}
      </div>
      <h3 className="text-[var(--text-h3)] font-bold text-[var(--color-ink)] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--text-small)] text-[var(--color-ink-muted)] leading-relaxed mb-6">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
