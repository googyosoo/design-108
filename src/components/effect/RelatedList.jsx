import { Link } from 'react-router-dom'
import { Network, FolderOpen } from 'lucide-react'
import effectsData from '../../data/effects.json'
import casesData from '../../data/cases.json'
import { EffectCard } from './EffectCard.jsx'

export function RelatedList({ effect }) {
  if (!effect) return null

  // 관련 원리 데이터 조회
  const relatedEffects = (effect.related || [])
    .map((rid) => effectsData.find((e) => e.id === rid))
    .filter(Boolean)

  // 이 원리가 쓰인 실전 사례 조회
  const linkedCases = (effect.caseIds || [])
    .map((cid) => casesData.find((c) => c.id === cid))
    .filter(Boolean)

  return (
    <section className="mb-8">
      {/* 1. 관련 원리 카드 목록 */}
      <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)]">
        <Network className="w-5 h-5" aria-hidden="true" />
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          함께 보면 좋은 원리
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {relatedEffects.map((item) => (
          <EffectCard key={item.id} effect={item} />
        ))}
      </div>

      {/* 2. 이 원리가 쓰인 실전 사례 링크 (존재 시) */}
      {linkedCases.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-[var(--ch-cases)] font-bold text-sm">
            <FolderOpen className="w-4 h-4" />
            <span>이 원리가 쓰인 실전 사례 ({linkedCases.length}건)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {linkedCases.map((cs) => (
              <Link
                key={cs.id}
                to={`/cases/${cs.code}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] hover:border-[var(--ch-cases)] text-xs text-[var(--color-text-primary)] hover:text-[var(--ch-cases)] font-medium transition-all shadow-xs"
              >
                <span className="font-mono font-bold text-[var(--ch-cases)]">{cs.code}</span>
                <span>{cs.titleSchool}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
