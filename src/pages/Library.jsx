import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, RotateCcw, Search } from 'lucide-react'
import effectsData from '../data/effects.json'
import chaptersData from '../data/chapters.json'
import purposesData from '../data/purposes.json'
import mediaData from '../data/media.json'
import { searchEffects } from '../lib/searchEffects.js'
import { filterEffects } from '../lib/filterEffects.js'
import { EffectCard } from '../components/effect/EffectCard.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { Principle } from '../components/xray/Principle.jsx'

export function LibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL 쿼리 파라미터에서 상태 초기화
  const initialQuery = searchParams.get('q') || ''
  const initialChapter = searchParams.get('chapter') || 'all'
  const initialPurpose = searchParams.get('purpose') ? searchParams.get('purpose').split(',') : []
  const initialMedia = searchParams.get('media') ? searchParams.get('media').split(',') : []
  const initialEthics = searchParams.get('ethics') ? searchParams.get('ethics').split(',') : []

  const [query, setQuery] = useState(initialQuery)
  const [selectedChapter, setSelectedChapter] = useState(initialChapter)
  const [selectedPurposes, setSelectedPurposes] = useState(initialPurpose)
  const [selectedMedia, setSelectedMedia] = useState(initialMedia)
  const [selectedEthics, setSelectedEthics] = useState(initialEthics)

  // URL 쿼리와 동기화 (뒤로가기/앞으로가기 지원)
  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (selectedChapter !== 'all') params.set('chapter', selectedChapter)
    if (selectedPurposes.length > 0) params.set('purpose', selectedPurposes.join(','))
    if (selectedMedia.length > 0) params.set('media', selectedMedia.join(','))
    if (selectedEthics.length > 0) params.set('ethics', selectedEthics.join(','))

    setSearchParams(params, { replace: true })
  }, [query, selectedChapter, selectedPurposes, selectedMedia, selectedEthics, setSearchParams])

  useEffect(() => {
    document.title = '원리 도감 (108) · DesignMind 108'
  }, [])

  // 검색 및 필터링 파이프라인
  const filteredList = useMemo(() => {
    // 1. 검색어 필터
    const searched = searchEffects(query, effectsData)

    // 2. 다중 조건 필터
    return filterEffects(searched, {
      chapter: selectedChapter,
      purposes: selectedPurposes,
      media: selectedMedia,
      ethics: selectedEthics,
    })
  }, [query, selectedChapter, selectedPurposes, selectedMedia, selectedEthics])

  // 필터 초기화
  const handleResetFilters = () => {
    setQuery('')
    setSelectedChapter('all')
    setSelectedPurposes([])
    setSelectedMedia([])
    setSelectedEthics([])
  }

  const activeFilterCount =
    (selectedChapter !== 'all' ? 1 : 0) +
    selectedPurposes.length +
    selectedMedia.length +
    selectedEthics.length

  const togglePurpose = (id) => {
    setSelectedPurposes((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const toggleMedia = (id) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const toggleEthics = (id) => {
    setSelectedEthics((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )
  }

  return (
    <Principle ids={[91, 89, 94, 10]}>
      <div className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
        {/* 상단 헤더 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-2">
            108가지 디자인 심리 도감
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            사람의 마음을 움직이는 108가지 심리·착시·색채·레이아웃 법칙을 탐색해 보세요.
          </p>
        </div>

        {/* 1. 검색 입력창 (초성 검색 지원) */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름, 영어, 초성으로 검색 (예: ㄷㅂ, contrast, 007)"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-all"
          />
        </div>

        {/* 2. 필터 섹션 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] mb-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)]">
              <Filter className="w-4 h-4 text-[var(--color-primary)]" />
              <span>조건별 필터링</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-mono flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>필터 초기화</span>
              </button>
            )}
          </div>

          {/* 챕터 필터 칩 */}
          <div>
            <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] block mb-2">
              챕터 구분
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedChapter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedChapter === 'all'
                    ? 'bg-[var(--color-primary)] text-white shadow-xs'
                    : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                전체 (108)
              </button>
              {chaptersData.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedChapter(ch.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedChapter === ch.id
                      ? 'text-white shadow-xs'
                      : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                  }`}
                  style={{
                    backgroundColor: selectedChapter === ch.id ? `var(${ch.colorToken})` : undefined,
                  }}
                >
                  {ch.nameKo.split(' ')[0]} ({ch.range[1] - ch.range[0] + 1})
                </button>
              ))}
            </div>
          </div>

          {/* 목적별 필터 칩 */}
          <div>
            <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] block mb-2">
              목적별 태그
            </span>
            <div className="flex flex-wrap gap-1.5">
              {purposesData.map((p) => {
                const isSelected = selectedPurposes.includes(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePurpose(p.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-white shadow-xs'
                        : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 매체별 필터 칩 */}
          <div>
            <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] block mb-2">
              제작 매체
            </span>
            <div className="flex flex-wrap gap-1.5">
              {mediaData.map((m) => {
                const isSelected = selectedMedia.includes(m.id)
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleMedia(m.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-white shadow-xs'
                        : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 윤리 등급 필터 칩 */}
          <div>
            <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] block mb-2">
              윤리적 주의도
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'safe', label: '안전 (Safe)' },
                { id: 'caution', label: '주의 (Caution)' },
                { id: 'risk', label: '위험 (Risk / 다크패턴)' },
              ].map((et) => {
                const isSelected = selectedEthics.includes(et.id)
                return (
                  <button
                    key={et.id}
                    type="button"
                    onClick={() => toggleEthics(et.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-white shadow-xs'
                        : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                    }`}
                  >
                    {et.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* 3. 검색 결과 수 헤더 */}
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            총 <span className="font-mono text-[var(--color-primary)] font-bold">{filteredList.length}</span>개의 원리
          </p>
        </div>

        {/* 4. 카드 그리드 (1/2/3/4열 반응형) */}
        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredList.map((effect) => (
              <EffectCard key={effect.id} effect={effect} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="조건과 일치하는 원리가 없습니다"
            description="검색어나 필터 조건을 하나 빼거나, 필터를 초기화해 보세요."
            actionLabel="필터 초기화"
            onAction={handleResetFilters}
          />
        )}
      </div>
    </Principle>
  )
}
