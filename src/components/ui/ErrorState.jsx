import { Button } from './Button.jsx'

/**
 * 01_WEBAPP_STANDARDS 준수 ErrorState 컴포넌트
 * - 무슨 일이 일어났는지 / 왜 일어났는지 / 어떻게 해야 하는지 3줄 구조
 * - 사용자를 탓하지 않는 안내
 */
export function ErrorState({
  title = '문제가 발생했어요',
  reason = '데이터를 불러오는 중 예상치 못한 오류가 생겼습니다.',
  actionText = '페이지를 새로고침하거나 잠시 후 다시 시도해 주세요.',
  retryLabel = '다시 시도하기',
  onRetry,
  className = '',
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[var(--color-danger)]/10 text-[var(--color-danger)] flex items-center justify-center font-bold text-2xl mb-4">
        !
      </div>
      <h3 className="text-[var(--text-h3)] font-bold text-[var(--color-ink)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-small)] text-[var(--color-ink-muted)] mb-1">
        {reason}
      </p>
      <p className="text-[var(--text-small)] text-[var(--color-ink-muted)] mb-6">
        {actionText}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  )
}
