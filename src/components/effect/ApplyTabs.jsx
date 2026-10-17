import { useState } from 'react'
import { GraduationCap, Laptop, Printer, Sparkles } from 'lucide-react'

const TABS = [
  { id: 'classroom', label: '수업자료', icon: GraduationCap },
  { id: 'webapp', label: '웹앱·도구', icon: Laptop },
  { id: 'print', label: '인쇄물·포스터', icon: Printer },
]

export function ApplyTabs({ effect }) {
  const [activeTab, setActiveTab] = useState('classroom')

  if (!effect || !effect.apply) return null

  return (
    <section className="mb-8 p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)]">
        <Sparkles className="w-5 h-5" aria-hidden="true" />
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          이렇게 써 보세요 (실무 적용 팁)
        </h2>
      </div>

      {/* 탭 헤더 */}
      <div
        role="tablist"
        aria-label="적용 매체 선택"
        className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] mb-4"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs font-bold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* 탭 컨텐츠 */}
      <div
        role="tabpanel"
        tabIndex={0}
        className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-hover)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      >
        <p className="text-sm sm:text-base text-[var(--color-text-primary)] leading-relaxed">
          {effect.apply[activeTab]}
        </p>
      </div>
    </section>
  )
}
