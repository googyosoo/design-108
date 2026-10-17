import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react'
import casesData from '../data/cases.json'

export function CasesPage() {
  useEffect(() => {
    document.title = '실전 리메이크 사례 (11) · DesignMind 108'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 헤더 섹션 */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>학교 현장 실전 프로젝트 11선</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          실전 리메이크 사례 연구 스튜디오
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          가정통신문, 슬라이드, 활동지, 웹앱 등 학교 현장의 실제 디자인 문제를 심리학 108원리로 재해석한 비포/애프터 리메이크 11편을 대화형 핫스팟으로 탐색해 보세요.
        </p>
      </div>

      {/* 11개 사례 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {casesData.map((cs) => (
          <Link
            key={cs.code}
            to={`/cases/${cs.code}`}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {cs.code}
                </span>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>원리 {cs.effects.length}개 적용</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cs.titleSchool}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  원본 유형: {cs.originType}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                {cs.keyMessage}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              <span>핫스팟 스튜디오 열기</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
