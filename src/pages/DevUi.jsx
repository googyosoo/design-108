import { useState } from 'react'
import {
  Button,
  IconButton,
  Chip,
  Card,
  Tabs,
  Dialog,
  Toast,
  EmptyState,
  ErrorState,
  Skeleton,
  ProgressRing,
  SearchInput,
} from '../components/ui/index.js'
import { Principle } from '../components/xray/Principle.jsx'
import { useTheme } from '../hooks/useTheme.js'
import { useXray } from '../hooks/useXray.js'

export function DevUiPage() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const { isXrayEnabled, toggleXray } = useXray()

  // 상태 관리
  const [chipSelected, setChipSelected] = useState(true)
  const [activeTab, setActiveTab] = useState('tab-1')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [toastConfig, setToastConfig] = useState({ isOpen: false, message: '', type: 'info' })
  const [searchValue, setSearchValue] = useState('시선 유도')

  const tabItems = [
    { id: 'tab-1', label: '개요 (Overview)' },
    { id: 'tab-2', label: '체험 (Interactive)' },
    { id: 'tab-3', label: '학교 적용 (School)' },
  ]

  const showToast = (message, type = 'info') => {
    setToastConfig({ isOpen: true, message, type })
  }

  return (
    <div className="space-y-12 py-4">
      {/* 헤더 섹션 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <Principle ids={[89, 91]} position="bottom-right">
            <h1 className="text-[var(--text-h1)] font-bold text-[var(--color-ink)]">
              UI 컴포넌트 견본 스튜디오 (/dev/ui)
            </h1>
          </Principle>
          <p className="text-[var(--text-body)] text-[var(--color-ink-muted)] mt-1">
            01_WEBAPP_STANDARDS 필수 공통 부품 12종 × 6대 상태 (default, hover, focus, active, disabled, loading)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={toggleTheme}>
            {resolvedTheme === 'dark' ? '☀️ 라이트 모드로 보기' : '🌙 다크 모드로 보기'}
          </Button>
          <Button
            variant={isXrayEnabled ? 'primary' : 'secondary'}
            onClick={toggleXray}
          >
            🔍 X-ray {isXrayEnabled ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      {/* 1. Button */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)] flex items-center gap-2">
          <span>1. Button (최소 44px 터치 높이)</span>
          <span className="text-xs font-normal text-[var(--color-ink-muted)]">variants × 6 states</span>
        </h2>
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="secondary" isLoading loadingText="불러오는 중…">Loading</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--color-line)]">
            <Button size="sm" variant="secondary">Small (36px)</Button>
            <Button size="md" variant="secondary">Medium (44px, 기본)</Button>
            <Button size="lg" variant="secondary">Large (48px)</Button>
          </div>
        </Card>
      </section>

      {/* 2. IconButton */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          2. IconButton (44×44px 터치 규격 & aria-label 필수)
        </h2>
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <IconButton aria-label="검색">🔍</IconButton>
            <IconButton variant="secondary" aria-label="홈">🏠</IconButton>
            <IconButton variant="primary" aria-label="설정">⚙️</IconButton>
            <IconButton aria-label="비활성" disabled>🔒</IconButton>
            <IconButton aria-label="로딩 중" isLoading>⏳</IconButton>
          </div>
        </Card>
      </section>

      {/* 3. Chip */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          3. Chip (필터 토글 & 카운트 뱃지)
        </h2>
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <Chip
              selected={chipSelected}
              count={52}
              onClick={() => setChipSelected(!chipSelected)}
            >
              심리 효과 (토글형)
            </Chip>
            <Chip selected={false} count={26}>착시</Chip>
            <Chip selected={false} count={10}>색채</Chip>
            <Chip selected={false} count={20}>레이아웃</Chip>
            <Chip selected={false} disabled count={0}>비활성화 칩</Chip>
          </div>
        </Card>
      </section>

      {/* 4. Card */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          4. Card (정적 카드 & 인터랙티브 카드)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-[var(--text-h3)] font-bold mb-1">일반 정적 카드</h3>
            <p className="text-[var(--text-small)] text-[var(--color-ink-muted)]">
              내용을 단순히 감싸서 보여주는 기본 카드입니다. (그림자: shadow-1, 반경: radius-lg)
            </p>
          </Card>
          <Card
            interactive
            onClick={() => showToast('인터랙티브 카드를 클릭했습니다!', 'info')}
          >
            <h3 className="text-[var(--text-h3)] font-bold mb-1 text-[var(--color-focus)]">
              인터랙티브 카드 (클릭 가능) →
            </h3>
            <p className="text-[var(--text-small)] text-[var(--color-ink-muted)]">
              마우스 호버 시 살짝 떠오르고 클릭 시 액티브 피드백을 주며, 키보드 Tab 및 Enter 조작을 지원합니다.
            </p>
          </Card>
        </div>
      </section>

      {/* 5. Tabs */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          5. Tabs (좌우 키보드 탐색 지원)
        </h2>
        <Card className="space-y-4">
          <Tabs items={tabItems} activeTab={activeTab} onChange={setActiveTab} />
          <div className="p-4 bg-[var(--color-bg)] rounded-[var(--radius-md)] text-sm">
            선택된 탭: <strong className="text-[var(--color-focus)]">{activeTab}</strong>
          </div>
        </Card>
      </section>

      {/* 6. Dialog & BottomSheet */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          6. Dialog & BottomSheet (모바일 바텀시트 ↔ 데스크톱 다이얼로그)
        </h2>
        <Card>
          <Button variant="primary" onClick={() => setIsDialogOpen(true)}>
            다이얼로그 / 바텀시트 열기
          </Button>
          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title="반응형 모달 다이얼로그"
          >
            <div className="space-y-4">
              <p className="text-[var(--text-body)] text-[var(--color-ink)]">
                모바일(639px 이하)에서는 화면 아래에서 부드럽게 올라오는 바텀시트로 동작하며, 데스크톱에서는 중앙 모달 다이얼로그로 표시됩니다.
              </p>
              <p className="text-[var(--text-small)] text-[var(--color-ink-muted)]">
                키보드 <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-line)] font-mono text-xs">Esc</kbd> 키를 누르면 닫히며, 포커스 가두기(Focus trap)가 적용되어 있습니다.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  취소
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsDialogOpen(false)
                    showToast('다이얼로그 확인 완료!', 'success')
                  }}
                >
                  확인
                </Button>
              </div>
            </div>
          </Dialog>
        </Card>
      </section>

      {/* 7. Toast */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          7. Toast (4초 자동 닫힘 & role=&quot;status&quot;)
        </h2>
        <Card>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => showToast('일반 안내 알림입니다. (4초 뒤 사라짐)', 'info')}
            >
              Info 토스트
            </Button>
            <Button
              variant="secondary"
              onClick={() => showToast('작업이 성공적으로 저장되었습니다! ✓', 'success')}
            >
              Success 토스트
            </Button>
            <Button
              variant="danger"
              onClick={() => showToast('오류가 발생하여 작업을 완료하지 못했습니다.', 'danger')}
            >
              Danger 토스트
            </Button>
          </div>
          <Toast
            isOpen={toastConfig.isOpen}
            message={toastConfig.message}
            type={toastConfig.type}
            onClose={() => setToastConfig((prev) => ({ ...prev, isOpen: false }))}
          />
        </Card>
      </section>

      {/* 8. EmptyState */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          8. EmptyState (친절한 안내 + 다음 행동)
        </h2>
        <Card>
          <EmptyState
            icon="🔖"
            title="아직 보관한 원리가 없어요"
            description="도감에서 마음에 드는 원리에 별표를 누르면 여기에 모아서 볼 수 있습니다."
            actionLabel="도감 둘러보기 →"
            onAction={() => showToast('도감 페이지로 이동 (데모)', 'info')}
          />
        </Card>
      </section>

      {/* 9. ErrorState */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          9. ErrorState (무슨 일이 / 왜 / 어떻게 3줄 구조)
        </h2>
        <Card>
          <ErrorState
            title="이미지를 분석하지 못했어요"
            reason="서버 연결 시간이 초과되었거나 지원되지 않는 이미지 형식입니다."
            actionText="네트워크 상태를 확인하신 후 이미지를 다시 올려 주세요."
            retryLabel="다시 시도하기"
            onRetry={() => showToast('재시도 요청을 보냈습니다.', 'info')}
          />
        </Card>
      </section>

      {/* 10. Skeleton */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          10. Skeleton (스피너 대체 로딩 플레이스홀더)
        </h2>
        <Card className="space-y-3 max-w-md">
          <div className="flex items-center gap-3">
            <Skeleton width="48px" height="48px" radius="full" />
            <div className="space-y-2 flex-1">
              <Skeleton width="60%" height="16px" radius="sm" />
              <Skeleton width="40%" height="12px" radius="sm" />
            </div>
          </div>
          <Skeleton width="100%" height="14px" radius="sm" />
          <Skeleton width="80%" height="14px" radius="sm" />
        </Card>
      </section>

      {/* 11. ProgressRing */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          11. ProgressRing (제1시그니처 요소: 수치 텍스트 병기)
        </h2>
        <Card>
          <div className="flex flex-wrap items-center justify-around gap-6 py-2">
            <ProgressRing value={0} max={108} label="시작 전" />
            <ProgressRing value={27} max={108} label="심리 완료" />
            <ProgressRing value={54} max={108} label="착시 완료" />
            <ProgressRing value={81} max={108} label="색채 완료" />
            <ProgressRing value={108} max={108} label="108 전수 달성" />
          </div>
        </Card>
      </section>

      {/* 12. SearchInput */}
      <section className="space-y-4">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)]">
          12. SearchInput (지우기 버튼 & 접근성 라벨 포함)
        </h2>
        <Card className="space-y-3 max-w-lg">
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={() => setSearchValue('')}
          />
          <div className="text-xs text-[var(--color-ink-muted)]">
            현재 입력된 검색어: <strong className="text-[var(--color-ink)]">{searchValue || '(비어 있음)'}</strong>
          </div>
        </Card>
      </section>
    </div>
  )
}
