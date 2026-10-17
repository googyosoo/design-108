import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SkipLink } from './SkipLink.jsx'
import { TopBar } from './TopBar.jsx'
import { BottomNav } from './BottomNav.jsx'
import { SideNav } from './SideNav.jsx'
import { Dialog } from '../ui/Dialog.jsx'
import { SearchInput } from '../ui/SearchInput.jsx'

/**
 * 01_WEBAPP_STANDARDS 준수 AppShell 컴포넌트
 * - 모바일 하단탭 ↔ 데스크톱 사이드바 반응형 자동 전환
 * - 가로 스크롤 방지 (overflow-x-hidden)
 * - 전역 검색 모달 셸 연동
 */
export function AppShell({ title }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen min-h-[100dvh] flex bg-[var(--color-bg)] text-[var(--color-ink)] overflow-x-hidden">
      {/* 키보드 접근성 바로가기 */}
      <SkipLink />

      {/* 데스크톱 사이드바 */}
      <SideNav />

      {/* 메인 뷰포트 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={title}
          onSearchClick={() => setIsSearchOpen(true)}
        />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 pb-24 lg:pb-12 focus:outline-none"
        >
          <Outlet />
        </main>

        {/* 모바일 하단 탭바 */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>

      {/* 전역 검색 다이얼로그 (Phase 3에서 실제 Fuse.js 검색 엔진과 연동) */}
      <Dialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="디자인 심리 원리 검색"
      >
        <div className="space-y-4">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            autoFocus
          />
          <div className="text-xs text-[var(--color-ink-muted)]">
            💡 한글 원리명, 영문(예: Kuleshov), 또는 초성(예: <code className="bg-[var(--color-bg)] px-1 py-0.5 rounded">ㅅㅅㅇㄷ</code>)으로 108개 원리를 빠르게 검색할 수 있습니다.
          </div>
          {searchQuery && (
            <div className="p-4 bg-[var(--color-bg)] rounded-[var(--radius-md)] text-center text-sm text-[var(--color-ink-muted)]">
              &quot;{searchQuery}&quot; 검색 중… (Phase 3에서 실제 도감 검색 엔진과 연결됩니다)
            </div>
          )}
        </div>
      </Dialog>
    </div>
  )
}
