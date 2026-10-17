import { NavLink } from 'react-router-dom'
import { Principle } from '../xray/Principle.jsx'

/**
 * 01_WEBAPP_STANDARDS 준수 SideNav 컴포넌트
 * - 데스크톱(1024px+) 전용 좌측 사이드바 (240px)
 * - 5개 핵심 메뉴 + 하위 바로가기
 */
export function SideNav() {
  const primaryLinks = [
    { to: '/', label: '홈', icon: '🏠' },
    { to: '/library', label: '도감 (108)', icon: '📖' },
    { to: '/cases', label: '실전 사례 (11)', icon: '🎯' },
    { to: '/practice', label: '연습 퀴즈', icon: '✍️' },
    { to: '/tools', label: '도구 허브', icon: '🛠️' },
  ]

  const secondaryLinks = [
    { to: '/tools/builder', label: '프롬프트 빌더' },
    { to: '/tools/diagnose', label: 'AI 디자인 진단' },
    { to: '/teach', label: '수업 활용 모듈' },
    { to: '/my', label: '내 도감 (보관함)' },
    { to: '/about', label: '앱 소개 및 출처' },
    { to: '/dev/ui', label: 'UI 컴포넌트 견본' },
  ]

  return (
    <aside
      aria-label="데스크톱 주 내비게이션"
      className="hidden lg:flex flex-col w-[240px] shrink-0 border-r border-[var(--color-line)] bg-[var(--color-surface)] h-screen sticky top-0 p-4 overflow-y-auto"
    >
      <div className="flex items-center gap-3 px-2 py-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[var(--color-success)] text-white flex items-center justify-center font-bold text-sm tabular-nums">
          108
        </div>
        <div>
          <span className="font-bold text-[var(--text-body)] text-[var(--color-ink)] block leading-tight">
            DesignMind
          </span>
          <span className="text-[11px] text-[var(--color-ink-muted)] block">
            디자인 심리 108
          </span>
        </div>
      </div>

      <Principle ids={[89, 91]} position="top-right" className="mb-6">
        <div className="text-[11px] font-bold text-[var(--color-ink-muted)] px-3 mb-2 tracking-wider uppercase">
          주요 메뉴
        </div>
        <nav className="space-y-1">
          {primaryLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-[var(--text-small)] font-medium transition-colors select-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]
                ${
                  isActive
                    ? 'bg-[var(--color-ink)] text-[var(--color-bg)] font-semibold shadow-[var(--shadow-1)]'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg)]'
                }
              `.trim()}
            >
              <span className="text-base" aria-hidden="true">
                {link.icon}
              </span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </Principle>

      <div className="mt-auto pt-4 border-t border-[var(--color-line)]">
        <div className="text-[11px] font-bold text-[var(--color-ink-muted)] px-3 mb-2 tracking-wider uppercase">
          부가 기능
        </div>
        <nav className="space-y-1">
          {secondaryLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `
                block px-3 py-1.5 rounded-[var(--radius-sm)] text-[13px] transition-colors select-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]
                ${
                  isActive
                    ? 'text-[var(--color-focus)] font-semibold bg-[var(--color-bg)]'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }
              `.trim()}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
