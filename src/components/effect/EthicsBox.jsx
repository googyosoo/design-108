import { ShieldAlert, AlertTriangle } from 'lucide-react'

export function EthicsBox({ effect }) {
  if (!effect || effect.ethicsLevel === 'safe' || !effect.ethicsNote) {
    return null
  }

  const isRisk = effect.ethicsLevel === 'risk'

  return (
    <section
      className={`mb-8 p-5 sm:p-6 rounded-2xl border transition-all ${
        isRisk
          ? 'border-red-500 bg-red-500/5 dark:bg-red-950/20 shadow-sm'
          : 'border-amber-500 bg-amber-500/5 dark:bg-amber-950/20 shadow-xs'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        {isRisk ? (
          <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        )}
        <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
          윤리 체크 — 설득과 조작의 경계 ({isRisk ? '다크 패턴 위험' : '과용 주의'})
        </h2>
      </div>

      <p className="text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed font-medium">
        {effect.ethicsNote}
      </p>

      <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-tertiary)]">
        💡 이 원리는 사용자의 무의식적 편향을 자극하므로, 교육적 안내나 정보 투명성을 해치지 않도록 세심한 주의가 필요합니다.
      </div>
    </section>
  )
}
