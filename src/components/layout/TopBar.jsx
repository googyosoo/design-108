import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme.js'
import { useXray } from '../../hooks/useXray.js'
import { Principle } from '../xray/Principle.jsx'

/**
 * 01_WEBAPP_STANDARDS 준수 TopBar 컴포넌트
 * - 높이 56px 고정
 * - 뒤로가기, 타이틀, X-ray 토글, 테마 토글
 */
export function TopBar({ title = 'DesignMind 108', onSearchClick }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { resolvedTheme, toggleTheme } = useTheme()
  const { isXrayEnabled, toggleXray } = useXray()

  const isRoot = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 w-full h-[56px] bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-line)] px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!isRoot && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="이전 화면으로 가기"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] cursor-pointer"
          >
            ←
          </button>
        )}
        <Principle ids={[7, 90]} position="bottom-right">
          <h1 className="text-[var(--text-h3)] font-bold text-[var(--color-ink)] truncate max-w-[200px] sm:max-w-md">
            {title}
          </h1>
        </Principle>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {onSearchClick && (
          <button
            type="button"
            onClick={onSearchClick}
            aria-label="전역 검색 열기"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] cursor-pointer"
          >
            🔍
          </button>
        )}

        {/* X-ray 토글 버튼 */}
        <button
          type="button"
          onClick={toggleXray}
          aria-label={isXrayEnabled ? 'X-ray 모드 끄기' : 'X-ray 모드 켜기 (적용된 원리 보기)'}
          aria-pressed={isXrayEnabled}
          className={`
            min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[var(--radius-md)] transition-colors cursor-pointer text-xs font-bold gap-1 px-2 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]
            ${
              isXrayEnabled
                ? 'bg-[var(--color-focus)] text-white shadow-[var(--shadow-1)]'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg)]'
            }
          `.trim()}
        >
          <span>X-ray</span>
          <span className="text-[10px] px-1 rounded bg-black/20">
            {isXrayEnabled ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* 테마 토글 버튼 */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`테마 변경 (현재: ${resolvedTheme === 'dark' ? '다크 모드' : '라이트 모드'})`}
          className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] cursor-pointer"
        >
          {resolvedTheme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
