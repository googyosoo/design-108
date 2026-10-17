import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Presentation } from 'lucide-react'
import effectsData from '../../data/effects.json'

export function EffectNav({ effect }) {
  const navigate = useNavigate()

  if (!effect) return null

  const currentId = effect.id
  const prevEffect = effectsData.find((e) => e.id === currentId - 1)
  const nextEffect = effectsData.find((e) => e.id === currentId + 1)

  return (
    <nav
      aria-label="원리 이동 내비게이션"
      className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[var(--color-border)] mt-8"
    >
      {/* 이전 원리 버튼 */}
      {prevEffect ? (
        <button
          type="button"
          onClick={() => navigate(`/effect/${prevEffect.code}`)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전: #{prevEffect.code} {prevEffect.nameKo}</span>
        </button>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* 발표 모드 보기 버튼 */}
      <button
        type="button"
        onClick={() => navigate(`/effect/${effect.code}/present`)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs sm:text-sm font-bold transition-all shadow-sm"
      >
        <Presentation className="w-4 h-4" />
        <span>발표 모드로 크게 보기</span>
      </button>

      {/* 다음 원리 버튼 */}
      {nextEffect ? (
        <button
          type="button"
          onClick={() => navigate(`/effect/${nextEffect.code}`)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all shadow-xs"
        >
          <span>다음: #{nextEffect.code} {nextEffect.nameKo}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  )
}
