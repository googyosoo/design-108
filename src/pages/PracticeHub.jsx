import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Layers, CheckCircle2, ShieldAlert, Languages, ArrowRight } from 'lucide-react'
import { useProgress } from '../hooks/useProgress.js'

export function PracticeHubPage() {
  const { progress } = useProgress()

  useEffect(() => {
    document.title = '연습 허브 (Practice) · DesignMind 108'
    window.scrollTo(0, 0)
  }, [])

  const modes = [
    {
      id: 'scenario',
      title: '상황형 4지선다 퀴즈',
      description: '학교 및 웹앱 실무 시나리오 40문항 중 무작위 10문항을 풀며 문제 해결 능력을 점검합니다.',
      icon: CheckCircle2,
      color: 'bg-indigo-500',
      tag: '실전 추천',
      count: '40문항 풀',
    },
    {
      id: 'ethics',
      title: '윤리 & 다크패턴 판별소',
      description: '선의의 넛지(Nudge)와 악의적 조작(Dark Pattern)의 경계를 20개 사례로 판별하고 대안을 배웁니다.',
      icon: ShieldAlert,
      color: 'bg-rose-500',
      tag: '윤리 가이드',
      count: '20문항 풀',
    },
    {
      id: 'flashcard',
      title: '108 원리 플래시 카드',
      description: '원리 번호와 키워드를 보고 개념을 떠올리는 인터랙티브 암기 및 인지 강화 카드입니다.',
      icon: Layers,
      color: 'bg-emerald-500',
      tag: '반복 학습',
      count: '108개 전체',
    },
    {
      id: 'english',
      title: '디자인 심리 영어 퀴즈',
      description: '글로벌 UX 및 교육공학에서 통용되는 108개 영어 전문 용어와 한국어 개념을 짝짓습니다.',
      icon: Languages,
      color: 'bg-amber-500',
      tag: '어휘 확장',
      count: '영단어 코너',
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 헤더 */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>인지 심리학 실전 트레이닝</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          인터랙티브 연습 허브
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          눈으로 읽는 것을 넘어, 직접 풀고 판단하며 108개 심리 원리를 체화하세요. 풀이 기록은 마이페이지에 안전하게 누적됩니다.
        </p>
      </div>

      {/* 최근 풀이 기록 요약 바 (기록 있을 때) */}
      {progress.quizRecords?.length > 0 && (
        <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/40 dark:bg-indigo-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xs">
              {progress.quizRecords[0].score * 10}점
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">최근 퀴즈 풀이 완료</p>
              <p className="text-[11px] text-slate-500">
                {progress.quizRecords[0].type} · 정답 {progress.quizRecords[0].score}/{progress.quizRecords[0].total}
              </p>
            </div>
          </div>
          <Link to="/my" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            전체 기록 보기 →
          </Link>
        </div>
      )}

      {/* 4개 모드 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <Link
              key={mode.id}
              to={`/practice/${mode.id}`}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${mode.color} text-white shadow-sm`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {mode.count}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {mode.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {mode.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                <span>학습 시작하기</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
