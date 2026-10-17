import { useState } from 'react'
import { Sliders } from 'lucide-react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 인터랙티브 조작기 (ChoiceLab)
 * @param {Object} props
 * @param {string} props.title - 원리 제목
 * @param {string} props.subtitle - 안내 문구
 * @param {Array<{id: string, label: string, min: number, max: number, step?: number, default: number, unit?: string}>} props.controls - 제어 슬라이더 목록
 * @param {Function} props.renderPreview - (values) => ReactNode 미리보기 렌더러
 * @param {Function} [props.renderMetrics] - (values) => ReactNode 지표 렌더러
 * @param {string} props.explanation - 해설
 */
export function ChoiceLab({
  title,
  subtitle = '아래 조작 슬라이더를 움직여 디자인 요소가 시각 심리에 미치는 변화를 관찰하세요.',
  controls = [],
  renderPreview,
  renderMetrics,
  explanation,
}) {
  const initialValues = controls.reduce((acc, c) => {
    acc[c.id] = c.default
    return acc
  }, {})

  const [values, setValues] = useState(initialValues)

  const handleReset = () => {
    setValues(initialValues)
  }

  const handleChange = (id, val) => {
    setValues((prev) => ({ ...prev, [id]: val }))
  }

  return (
    <DemoFrame
      title={title}
      subtitle={subtitle}
      onReset={handleReset}
      footer={<p className="text-slate-600 dark:text-slate-400 leading-relaxed">{explanation}</p>}
    >
      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* 미리보기 뷰포트 */}
        <div className="w-full min-h-[220px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
          {renderPreview(values)}
        </div>

        {/* 실시간 지표 (있을 경우) */}
        {renderMetrics && (
          <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-950/50">
            {renderMetrics(values)}
          </div>
        )}

        {/* 컨트롤 슬라이더 목록 */}
        <div className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Sliders className="h-3.5 w-3.5 text-indigo-500" />
            <span>파라미터 조작</span>
          </div>

          {controls.map((ctrl) => (
            <div key={ctrl.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>{ctrl.label}</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {values[ctrl.id]}
                  {ctrl.unit || ''}
                </span>
              </div>
              <input
                type="range"
                min={ctrl.min}
                max={ctrl.max}
                step={ctrl.step || 1}
                value={values[ctrl.id]}
                onChange={(e) => handleChange(ctrl.id, Number(e.target.value))}
                aria-label={ctrl.label}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          ))}
        </div>
      </div>
    </DemoFrame>
  )
}
