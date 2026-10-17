/**
 * 01_WEBAPP_STANDARDS 준수 Skeleton 컴포넌트
 * - 스피너 대신 사용하는 로딩 플레이스홀더
 * - prefers-reduced-motion 시 애니메이션 비활성화 (base.css 연동)
 */
export function Skeleton({
  width = '100%',
  height = '1rem',
  radius = 'md',
  className = '',
}) {
  const radiusClasses = {
    sm: 'rounded-[var(--radius-sm)]',
    md: 'rounded-[var(--radius-md)]',
    lg: 'rounded-[var(--radius-lg)]',
    full: 'rounded-[var(--radius-full)]',
  }

  return (
    <div
      aria-hidden="true"
      style={{ width, height }}
      className={`
        bg-[var(--color-line)]/50 animate-pulse
        ${radiusClasses[radius] || radiusClasses.md}
        ${className}
      `.trim()}
    />
  )
}
