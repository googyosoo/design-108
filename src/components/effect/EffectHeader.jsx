import { Star, CheckCircle2 } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites.js'
import { useProgress } from '../../hooks/useProgress.js'

const CHAPTER_LABELS = {
  psychology: '심리 효과',
  illusion: '착시 효과',
  color: '색채 효과',
  layout: '레이아웃·UX 법칙',
}

const CHAPTER_COLORS = {
  psychology: 'var(--ch-psychology)',
  illusion: 'var(--ch-illusion)',
  color: 'var(--ch-color)',
  layout: 'var(--ch-layout)',
}

export function EffectHeader({ effect }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isMastered, toggleMastered } = useProgress()

  if (!effect) return null

  const favored = isFavorite(effect.id)
  const mastered = isMastered(effect.id)
  const chapterColor = CHAPTER_COLORS[effect.chapter] || 'var(--color-primary)'
  const chapterLabel = CHAPTER_LABELS[effect.chapter] || effect.chapter

  return (
    <header className="mb-8">
      {/* 챕터 칩 + 번호 배지 + 상단 액션 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-mono text-white shadow-sm"
            style={{ backgroundColor: chapterColor }}
            aria-label={`원리 번호 ${effect.code}`}
          >
            {effect.code}
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `color-mix(in srgb, ${chapterColor} 12%, var(--color-surface))`,
              color: chapterColor,
            }}
          >
            {chapterLabel}
          </span>
        </div>

        {/* 우측 상단: 즐겨찾기 & 익혔어요 버튼 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(effect.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              favored
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <Star className={`w-4 h-4 ${favored ? 'fill-current' : ''}`} />
            <span>{favored ? '보관됨' : '즐겨찾기'}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleMastered(effect.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              mastered
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${mastered ? 'fill-current' : ''}`} />
            <span>{mastered ? '익힘 완료' : '익혔어요'}</span>
          </button>
        </div>
      </div>

      {/* 한글 타이틀 (h1) + 영문 타이틀 */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-1">
        {effect.nameKo}
      </h1>
      <p className="text-sm font-mono text-[var(--color-text-tertiary)] mb-4">
        {effect.nameEn}
      </p>

      {/* 한 줄 정의 (굵은 폰트) */}
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
        <p className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] leading-relaxed">
          &ldquo;{effect.oneLiner}&rdquo;
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-mono">
          {effect.oneLinerEn}
        </p>
      </div>
    </header>
  )
}
