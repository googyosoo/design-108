import { useNavigate } from 'react-router-dom'
import { Star, CheckCircle2, AlertTriangle, Eye, Sparkles, Scale, Timer, MousePointer, Palette, HelpCircle } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites.js'
import { useProgress } from '../../hooks/useProgress.js'

const DEMO_ICONS = {
  compareToggle: Scale,
  scenarioQuiz: HelpCircle,
  choiceLab: Sparkles,
  timingGame: Timer,
  gazeMap: MousePointer,
  colorLab: Palette,
  illusion: Eye,
}

const CHAPTER_COLOR_MAP = {
  psychology: 'var(--ch-psychology)',
  illusion: 'var(--ch-illusion)',
  color: 'var(--ch-color)',
  layout: 'var(--ch-layout)',
}

export function EffectCard({ effect }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isMastered } = useProgress()

  if (!effect) return null

  const favored = isFavorite(effect.id)
  const mastered = isMastered(effect.id)
  const DemoIcon = DEMO_ICONS[effect.demoType] || Sparkles
  const chapterColor = CHAPTER_COLOR_MAP[effect.chapter] || 'var(--color-primary)'

  const handleClick = () => {
    navigate(`/effect/${effect.code}`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(effect.id)
  }

  return (
    <div
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      className="group relative flex flex-col justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] select-none"
      style={{
        borderTopWidth: '3px',
        borderTopColor: chapterColor,
      }}
    >
      {/* 상단: 번호 뱃지 + 액션/상태 아이콘들 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* 번호 원형 뱃지 (40px) */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white shadow-xs"
            style={{ backgroundColor: chapterColor }}
            aria-label={`원리 번호 ${effect.code}`}
          >
            {effect.code}
          </div>

          {/* 데모 유형 아이콘 */}
          <span
            className="p-1 rounded-md bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
            title={`체험 유형: ${effect.demoType}`}
          >
            <DemoIcon className="w-3.5 h-3.5" aria-hidden="true" />
          </span>

          {/* 윤리 주의 배지 */}
          {effect.ethicsLevel !== 'safe' && (
            <span
              className={`p-1 rounded-md ${
                effect.ethicsLevel === 'risk'
                  ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
              }`}
              title={`윤리 주의도: ${effect.ethicsLevel}`}
            >
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          )}
        </div>

        {/* 우측 상단: 익힘 표시 + 즐겨찾기 */}
        <div className="flex items-center gap-1.5">
          {mastered && (
            <span
              className="text-[var(--color-success)] flex items-center gap-0.5 text-xs font-medium"
              title="익힌 원리"
            >
              <CheckCircle2 className="w-4 h-4 fill-[var(--color-success)] text-white" aria-hidden="true" />
            </span>
          )}
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favored ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            className={`p-1.5 rounded-lg transition-colors ${
              favored
                ? 'text-amber-500 fill-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <Star className={`w-4 h-4 ${favored ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 본문: 한글 이름 + 영문 이름 + 한 줄 정의 */}
      <div className="flex-1 mb-3">
        <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors leading-snug mb-0.5">
          {effect.nameKo}
        </h3>
        <p className="text-xs text-[var(--color-text-tertiary)] font-mono mb-2 truncate">
          {effect.nameEn}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {effect.oneLiner}
        </p>
      </div>

      {/* 하단: 목적 태그 칩 (최대 2개 노출) */}
      <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-tertiary)]">
        {(effect.purposeTags || []).slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] font-medium"
          >
            #{tag}
          </span>
        ))}
        {(effect.mediaTags || []).slice(0, 1).map((media) => (
          <span
            key={media}
            className="px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] font-medium"
          >
            @{media}
          </span>
        ))}
      </div>
    </div>
  )
}
