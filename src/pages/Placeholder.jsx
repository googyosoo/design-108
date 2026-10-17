import { Link, useLocation } from 'react-router-dom'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

/**
 * 개발 중 플레이스홀더 페이지
 */
export function PlaceholderPage({ title, phase, description }) {
  const location = useLocation()

  return (
    <div className="py-12 max-w-lg mx-auto">
      <Card className="text-center p-8">
        <div className="w-16 h-16 rounded-full bg-[var(--color-bg)] border border-[var(--color-line)] flex items-center justify-center text-3xl mx-auto mb-4">
          🚧
        </div>
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)] mb-2">
          {title}
        </h2>
        <div className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-[var(--color-focus)]/10 text-[var(--color-focus)] mb-4">
          Phase {phase} 구현 예정
        </div>
        <p className="text-[var(--text-body)] text-[var(--color-ink-muted)] leading-relaxed mb-2">
          {description || '이 화면은 실행 계획서에 따라 다음 단계에서 구현됩니다.'}
        </p>
        <p className="text-xs text-[var(--color-ink-muted)] mb-6 font-mono">
          경로: {location.pathname}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="secondary" size="md">
              홈으로 가기
            </Button>
          </Link>
          <Link to="/dev/ui">
            <Button variant="primary" size="md">
              UI 컴포넌트 견본 보기
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

/**
 * 404 Not Found 페이지
 */
export function NotFoundPage() {
  return (
    <div className="py-16 max-w-md mx-auto text-center">
      <div className="text-6xl font-black text-[var(--color-ink-muted)]/40 mb-4 tabular-nums">
        404
      </div>
      <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink)] mb-2">
        페이지를 찾을 수 없어요
      </h2>
      <p className="text-[var(--text-body)] text-[var(--color-ink-muted)] mb-6">
        요청하신 주소가 잘못되었거나 삭제된 페이지입니다.
      </p>
      <Link to="/">
        <Button variant="primary">홈으로 돌아가기</Button>
      </Link>
    </div>
  )
}
