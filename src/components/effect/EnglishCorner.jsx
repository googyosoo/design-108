import { BookOpen, Tag } from 'lucide-react'

export function EnglishCorner({ effect }) {
  if (!effect || !effect.english) return null

  return (
    <section className="mb-8 p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
        <BookOpen className="w-5 h-5" aria-hidden="true" />
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          English Corner (영어 수업 연계)
        </h2>
      </div>

      {/* 영어 표제어 */}
      <div className="mb-3">
        <span className="text-xs font-bold text-[var(--color-text-tertiary)] block mb-0.5">
          Key Term
        </span>
        <p className="text-base font-bold font-mono text-[var(--color-primary)]">
          {effect.english.term}
        </p>
      </div>

      {/* 예문 */}
      <div className="mb-4 p-3.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)]">
        <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] block mb-1">
          Example Sentence
        </span>
        <p className="text-sm font-serif italic text-[var(--color-text-primary)] leading-relaxed">
          &ldquo;{effect.english.example}&rdquo;
        </p>
      </div>

      {/* 핵심 어휘 칩 */}
      <div>
        <span className="text-xs font-bold text-[var(--color-text-tertiary)] block mb-2 flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          <span>Core Vocabulary</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {(effect.english.keyVocab || []).map((vocab) => (
            <span
              key={vocab}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            >
              {vocab}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
