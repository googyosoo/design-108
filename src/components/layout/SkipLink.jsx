/**
 * 01_WEBAPP_STANDARDS 준수 SkipLink 컴포넌트
 * - 키보드 탭 시 화면 최상단에 나타나 메인 콘텐츠로 바로 점프 (WCAG 2.2 AA)
 */
export function SkipLink({ targetId = 'main-content', label = '본문 바로가기' }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[var(--color-ink)] focus:text-[var(--color-bg)] focus:font-bold focus:rounded-[var(--radius-sm)] focus:shadow-[var(--shadow-2)] focus:outline-2 focus:outline-[var(--color-focus)]"
    >
      {label}
    </a>
  )
}
