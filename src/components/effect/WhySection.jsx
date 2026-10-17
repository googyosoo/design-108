import { Lightbulb, Info } from 'lucide-react'

export function WhySection({ effect }) {
  if (!effect) return null

  return (
    <section className="mb-8 p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
        <Info className="w-5 h-5" aria-hidden="true" />
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          왜 그럴까? (심리적 메커니즘)
        </h2>
      </div>

      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {effect.why}
      </p>

      {/* 비유 박스 (💡) */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[var(--color-text-primary)]">
        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
            한 줄 일상 비유
          </span>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {effect.analogy}
          </p>
        </div>
      </div>

      {/* 학술/실험 참고 (존재 시) */}
      {effect.factNote && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-text-tertiary)] flex items-center justify-between">
          <span>학술 근거 / 발견 연구:</span>
          <span className="font-semibold">{effect.factNote}</span>
        </div>
      )}
    </section>
  )
}
