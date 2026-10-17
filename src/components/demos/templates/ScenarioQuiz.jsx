import { useState } from 'react'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 미니 상황 퀴즈 템플릿
 * @param {Object} props
 * @param {string} props.title - 원리 제목
 * @param {string} props.scenario - 문제 상황
 * @param {Array<{id: string, text: string, isCorrect: boolean, feedback: string}>} props.options - 선택지 목록
 * @param {string} props.principleSummary - 핵심 원리 요약
 */
export function ScenarioQuiz({
  title,
  scenario,
  options = [],
  principleSummary,
}) {
  const [selectedId, setSelectedId] = useState(null)

  const selectedOption = options.find((o) => o.id === selectedId)

  const handleReset = () => {
    setSelectedId(null)
  }

  return (
    <DemoFrame
      title={title}
      subtitle="주어진 상황에서 가장 효과적이거나 윤리적인 설계를 선택해 보세요."
      onReset={handleReset}
      footer={
        <div className="space-y-1">
          <p className="font-semibold text-slate-800 dark:text-slate-200">심리학적 시사점</p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{principleSummary}</p>
        </div>
      }
    >
      <div className="w-full max-w-lg space-y-5">
        {/* 시나리오 박스 */}
        <div className="rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/60 dark:bg-indigo-950/20 p-4">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              {scenario}
            </p>
          </div>
        </div>

        {/* 선택지 목록 */}
        <div className="space-y-2.5">
          {options.map((opt, idx) => {
            const isSelected = selectedId === opt.id
            const isDone = selectedId !== null

            let borderClass = 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
            let bgClass = 'bg-white dark:bg-slate-900'

            if (isDone) {
              if (opt.isCorrect) {
                borderClass = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100'
              } else if (isSelected) {
                borderClass = 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100'
              } else {
                bgClass = 'opacity-60 bg-slate-50 dark:bg-slate-950/20'
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isDone}
                onClick={() => setSelectedId(opt.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${borderClass} ${bgClass}`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    {opt.text}
                  </span>
                </div>

                {isDone && opt.isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {isDone && isSelected && !opt.isCorrect && (
                  <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* 피드백 박스 */}
        {selectedOption && (
          <div
            role="alert"
            className={`rounded-xl p-4 text-xs sm:text-sm leading-relaxed border ${
              selectedOption.isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}
          >
            <p className="font-semibold mb-1">
              {selectedOption.isCorrect ? '✓ 탁월한 선택입니다!' : '✕ 다시 생각해 볼 점이 있습니다.'}
            </p>
            <p>{selectedOption.feedback}</p>
          </div>
        )}
      </div>
    </DemoFrame>
  )
}
