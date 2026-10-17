import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, X } from 'lucide-react'
import { Hotspot } from './Hotspot.jsx'
import { CaseMockup } from './mockups/CaseViews.jsx'
import effectsData from '../../data/effects.json'

/**
 * 사례 스튜디오 캔버스 컴포넌트
 * @param {Object} props
 * @param {Object} props.caseData - 사례 데이터 객체
 * @param {'after' | 'before' | 'split'} props.mode - 비교 모드
 */
export function CaseCanvas({ caseData, mode = 'after' }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null)
  const [sliderPos, setSliderPos] = useState(50)

  if (!caseData) return null

  const isPortrait = caseData.layout === 'portrait'
  const aspectClass = isPortrait
    ? 'aspect-[3/4] max-w-sm sm:max-w-md'
    : 'aspect-[16/10] sm:aspect-[16/9] max-w-2xl sm:max-w-3xl'

  // 선택된 핫스팟의 원리 정보 매핑
  const targetEffect = selectedHotspot
    ? effectsData.find((e) => e.id === selectedHotspot.effectId)
    : null

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* 뷰포트 컨테이너 */}
      <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl select-none`}>
        {/* Before 단독 모드 */}
        {mode === 'before' && (
          <div className="w-full h-full relative">
            <span className="absolute top-3 left-3 z-20 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-600 text-white shadow">
              개선 전 (Before)
            </span>
            <CaseMockup caseCode={caseData.code} isBefore={true} />
          </div>
        )}

        {/* After 단독 모드 */}
        {mode === 'after' && (
          <div className="w-full h-full relative">
            <span className="absolute top-3 left-3 z-20 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow">
              개선 후 (After) · 핫스팟 탐색
            </span>
            <CaseMockup caseCode={caseData.code} isBefore={false} />

            {/* 핫스팟 오버레이 핀들 */}
            {caseData.hotspots.map((hs, idx) => (
              <Hotspot
                key={idx}
                hotspot={{
                  ...hs,
                  number: idx + 1,
                  title: `원리 ${hs.effectId}번 적용 지점`,
                }}
                active={selectedHotspot?.effectId === hs.effectId}
                onClick={() => setSelectedHotspot({ ...hs, number: idx + 1 })}
              />
            ))}
          </div>
        )}

        {/* Split 슬라이더 모드 */}
        {mode === 'split' && (
          <div className="relative w-full h-full overflow-hidden">
            {/* After (배경) */}
            <div className="absolute inset-0">
              <span className="absolute top-3 right-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow">
                After
              </span>
              <CaseMockup caseCode={caseData.code} isBefore={false} />
            </div>

            {/* Before (클리핑) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-indigo-500 bg-white dark:bg-slate-900 z-10"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="w-full h-full relative"
                style={{ width: '100%', minWidth: '320px' }}
              >
                <span className="absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-600 text-white shadow">
                  Before
                </span>
                <CaseMockup caseCode={caseData.code} isBefore={true} />
              </div>
            </div>

            {/* 슬라이더 컨트롤 핸들 */}
            <div
              className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `calc(${sliderPos}% - 14px)` }}
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg text-xs font-bold">
                ↔
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 분할 모드일 때 슬라이더 조절기 */}
      {mode === 'split' && (
        <div className="w-full max-w-md flex items-center gap-3 px-4">
          <span className="text-xs text-rose-600 font-semibold">Before</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label="Before/After 분할 슬라이더"
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <span className="text-xs text-emerald-600 font-semibold">After</span>
        </div>
      )}

      {/* 핫스팟 클릭 시 하단 바텀시트/카드 */}
      {selectedHotspot && (
        <div
          role="region"
          aria-label="선택된 핫스팟 상세 정보"
          className="w-full max-w-2xl rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xl animate-fade-in relative"
        >
          <button
            type="button"
            onClick={() => setSelectedHotspot(null)}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="핫스팟 닫기"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white text-sm font-bold shadow shrink-0">
              {selectedHotspot.number}
            </span>
            <div className="space-y-1.5 pr-6 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  원리 #{String(selectedHotspot.effectId).padStart(3, '0')}
                </span>
                {targetEffect && (
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {targetEffect.name_ko} ({targetEffect.name_en})
                  </h4>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedHotspot.note}
              </p>

              {targetEffect && (
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {targetEffect.summary}
                  </span>
                  <Link
                    to={`/effect/${targetEffect.code}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
                  >
                    <span>원리 도감 보기</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
