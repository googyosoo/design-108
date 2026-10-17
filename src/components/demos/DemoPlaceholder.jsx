import { Sparkles, Play } from 'lucide-react'

export function DemoPlaceholder({ effect }) {
  if (!effect) return null

  return (
    <section className="mb-8 p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--color-primary)]">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            30초 인터랙티브 체험
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
          {effect.demoType}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-hover)] text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] mb-3 shadow-xs">
          <Play className="w-5 h-5 ml-0.5" />
        </div>
        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
          {effect.nameKo} 체험 엔진
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] max-w-md leading-relaxed mb-4">
          슬라이더 조작, A/B 안 비교 토글, 반응 속도 미니게임 등 {effect.demoType} 템플릿으로 원리의 효과를 직접 눈으로 확인합니다.
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-tertiary)]">
          <span>🎮 Phase 4 전용 인터랙티브 엔진 연결 대기</span>
        </div>
      </div>
    </section>
  )
}
