import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckSquare, Sparkles, BookOpen, AlertCircle } from 'lucide-react'
import { CaseCanvas } from '../components/cases/CaseCanvas.jsx'
import casesData from '../data/cases.json'
import effectsData from '../data/effects.json'

export function CaseStudioPage() {
  const { caseCode } = useParams()
  const [mode, setMode] = useState('after') // 'after' | 'split' | 'before'
  const [checkedItems, setCheckedItems] = useState({})

  const caseIndex = casesData.findIndex((c) => c.code === caseCode)
  const caseItem = casesData[caseIndex]

  useEffect(() => {
    if (caseItem) {
      document.title = `${caseItem.code} ${caseItem.titleSchool} · DesignMind 108`
      window.scrollTo(0, 0)
    }
  }, [caseItem])

  if (!caseItem) {
    return (
      <div className="mx-auto max-w-xl py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">사례를 찾을 수 없습니다</h2>
        <p className="text-xs text-slate-500 mb-6">요청하신 사례 코드 &apos;{caseCode}&apos;가 존재하지 않습니다.</p>
        <Link to="/cases" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
          사례 목록으로 이동
        </Link>
      </div>
    )
  }

  const prevCase = caseIndex > 0 ? casesData[caseIndex - 1] : null
  const nextCase = caseIndex < casesData.length - 1 ? casesData[caseIndex + 1] : null

  // 연계된 원리 목록
  const relatedEffects = caseItem.effects
    .map((effId) => effectsData.find((e) => e.id === effId))
    .filter(Boolean)

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      {/* 상단 네비게이션 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link
          to="/cases"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>전체 11개 사례 목록</span>
        </Link>

        <div className="flex items-center gap-2">
          {prevCase && (
            <Link
              to={`/cases/${prevCase.code}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <span>이전 ({prevCase.code})</span>
            </Link>
          )}
          {nextCase && (
            <Link
              to={`/cases/${nextCase.code}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <span>다음 ({nextCase.code})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* 사례 헤더 & 모드 전환 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              {caseItem.code}
            </span>
            <span className="text-xs text-slate-500">원본: {caseItem.originType}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {caseItem.titleSchool}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {caseItem.keyMessage}
          </p>
        </div>

        {/* Before / Split / After 모드 토글 */}
        <div className="flex items-center rounded-xl p-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setMode('before')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'before'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setMode('split')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'split'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Split (비교)
          </button>
          <button
            type="button"
            onClick={() => setMode('after')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'after'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            After (핫스팟)
          </button>
        </div>
      </div>

      {/* 인터랙티브 캔버스 */}
      <CaseCanvas caseData={caseItem} mode={mode} />

      {/* 2단 상세 섹션: 설계 의도 & 점검 체크리스트 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* 좌측: 설계 의도 및 Before 노트 (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span>디자인 심리학 설계 의도</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {caseItem.explain}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20 p-5 space-y-2">
            <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <span>개선 전 초기 시안 문제점 분석</span>
            </h4>
            <p className="text-xs text-rose-900/80 dark:text-rose-200/80 leading-relaxed">
              {caseItem.beforeNote}
            </p>
          </div>

          {/* 적용 원리 칩 목록 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
              <span>본 사례에 적용된 108 원리 ({relatedEffects.length})</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {relatedEffects.map((eff) => (
                <Link
                  key={eff.code}
                  to={`/effect/${eff.code}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 text-xs text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
                >
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{eff.code}</span>
                  <span className="font-medium">{eff.name_ko}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 자체 점검 체크리스트 (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-500" />
                <span>현장 적용 점검 체크리스트</span>
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {Object.values(checkedItems).filter(Boolean).length} / {caseItem.checklist.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {caseItem.checklist.map((item, idx) => {
                const isChecked = !!checkedItems[idx]
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // 부모 버튼 클릭으로 핸들링
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs leading-relaxed font-medium">
                      {item}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
