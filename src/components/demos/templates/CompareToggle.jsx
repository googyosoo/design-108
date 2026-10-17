import { useState } from 'react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * Before vs After 비교 템플릿
 * @param {Object} props
 * @param {string} props.title - 원리 제목
 * @param {string} props.subtitle - 안내 문구
 * @param {React.ReactNode} props.beforeContent - 개선 전 UI/그래픽
 * @param {React.ReactNode} props.afterContent - 개선 후 UI/그래픽
 * @param {string} props.beforeLabel - Before 라벨
 * @param {string} props.afterLabel - After 라벨
 * @param {string} props.explanation - 하단 해설
 */
export function CompareToggle({
  title,
  subtitle = '좌우 비교 토글 또는 슬라이더로 차이를 직접 체감해 보세요.',
  beforeContent,
  afterContent,
  beforeLabel = '개선 전 (Before)',
  afterLabel = '개선 후 (After)',
  explanation,
}) {
  const [mode, setMode] = useState('split') // 'split' | 'before' | 'after'
  const [sliderPos, setSliderPos] = useState(50)

  const handleReset = () => {
    setMode('split')
    setSliderPos(50)
  }

  return (
    <DemoFrame
      title={title}
      subtitle={subtitle}
      onReset={handleReset}
      footer={
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{explanation}</p>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
            {mode === 'split' ? `슬라이더 ${sliderPos}%` : mode.toUpperCase()}
          </span>
        </div>
      }
    >
      <div className="w-full max-w-xl flex flex-col items-center gap-4">
        {/* 모드 선택 탭 */}
        <div className="flex items-center rounded-xl p-1 bg-slate-200 dark:bg-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('before')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'before'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {beforeLabel}
          </button>
          <button
            type="button"
            onClick={() => setMode('split')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'split'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            슬라이더 분할
          </button>
          <button
            type="button"
            onClick={() => setMode('after')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'after'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {afterLabel}
          </button>
        </div>

        {/* 메인 뷰포트 */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-inner select-none">
          {mode === 'before' && (
            <div className="w-full h-full p-4 flex flex-col items-center justify-center">
              <span className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                {beforeLabel}
              </span>
              {beforeContent}
            </div>
          )}

          {mode === 'after' && (
            <div className="w-full h-full p-4 flex flex-col items-center justify-center">
              <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                {afterLabel}
              </span>
              {afterContent}
            </div>
          )}

          {mode === 'split' && (
            <div className="relative w-full h-full overflow-hidden">
              {/* After 캔버스 (전체 배경) */}
              <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
                <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {afterLabel}
                </span>
                {afterContent}
              </div>

              {/* Before 캔버스 (클리핑) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-indigo-500 bg-white dark:bg-slate-900 z-10"
                style={{ width: `${sliderPos}%` }}
              >
                <div
                  className="p-4 flex flex-col items-center justify-center h-full"
                  style={{ width: '100%', minWidth: '320px' }}
                >
                  <span className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                    {beforeLabel}
                  </span>
                  {beforeContent}
                </div>
              </div>

              {/* 슬라이더 제어선 라벨 */}
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

        {/* 슬라이더 컨트롤러 */}
        {mode === 'split' && (
          <div className="w-full flex items-center gap-3 px-2">
            <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Before</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Before/After 슬라이더"
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">After</span>
          </div>
        )}
      </div>
    </DemoFrame>
  )
}
