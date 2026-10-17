import { NavLink } from 'react-router-dom'
import { Principle } from '../xray/Principle.jsx'

/**
 * 01_WEBAPP_STANDARDS 준수 BottomNav 컴포넌트
 * - 모바일·태블릿 하단 5개 탭바
 * - safe-area 대응, 최소 44px 터치 영역
 * - X-ray 원리 103(피츠의 법칙) 및 100(제이콥의 법칙) 적용
 */
export function BottomNav() {
  const navItems = [
    { to: '/', label: '홈', icon: '🏠' },
    { to: '/library', label: '도감', icon: '📖' },
    { to: '/cases', label: '사례', icon: '🎯' },
    { to: '/practice', label: '연습', icon: '✍️' },
    { to: '/tools', label: '도구', icon: '🛠️' },
  ]

  return (
    <Principle ids={[103, 100]} position="top-right" className="fixed bottom-0 left-0 right-0 z-40">
      <nav
        aria-label="하단 기본 내비게이션"
        className="w-full bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-line)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex items-center justify-around h-[64px] max-w-lg mx-auto px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center flex-1 min-w-[44px] min-h-[44px] py-1 text-center select-none transition-colors rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]
                ${
                  isActive
                    ? 'text-[var(--color-ink)] font-bold'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }
              `.trim()}
            >
              <span className="text-xl mb-0.5 leading-none" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-[11px] leading-tight tracking-tight">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </Principle>
  )
}
