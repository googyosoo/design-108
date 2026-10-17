import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Clock, Target, ArrowRight, Printer, Sparkles } from 'lucide-react'
import lessonsData from '../data/lessons.json'

export function TeachHubPage() {
  useEffect(() => {
    document.title = '수업 활용 허브 (Teach) · DesignMind 108'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 헤더 */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>학교 교육과정 연계 수업 모듈</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          교과 융합 및 교원 연수 수업 허브
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          고등학교 영어, 미디어 리터러시, 정보·SW, 교원 직무 연수에서 즉시 활용할 수 있는 차시별 지도안, 인쇄용 활동지, 성취 루브릭을 원스톱으로 제공합니다.
        </p>
      </div>

      {/* 4개 수업 모듈 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessonsData.map((module) => (
          <Link
            key={module.id}
            to={`/teach/${module.id}`}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 shadow-xs">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {module.id}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {module.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2 line-clamp-3">
                  {module.overview}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Target className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{module.target}</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5 text-indigo-500" />
                  <span>{module.duration}</span>
                </span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              <span className="flex items-center gap-1">
                <Printer className="h-3.5 w-3.5" />
                <span>지도안 및 활동지 열기</span>
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
