import { CheckCircle, XCircle } from 'lucide-react'

export function DoDont({ effect }) {
  if (!effect || !effect.doList || !effect.dontList) return null

  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
        Do &amp; Don&apos;t (실천 가이드)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DO 컬럼 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle className="w-5 h-5" aria-hidden="true" />
            <span>이렇게 하세요 (DO)</span>
          </div>
          <ul className="space-y-2.5">
            {effect.doList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'T 컬럼 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <XCircle className="w-5 h-5" aria-hidden="true" />
            <span>이것만은 피하세요 (DON&apos;T)</span>
          </div>
          <ul className="space-y-2.5">
            {effect.dontList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
