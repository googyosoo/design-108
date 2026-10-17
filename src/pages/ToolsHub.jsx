import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Terminal, ScanEye, GraduationCap, ArrowRight } from 'lucide-react'

export function ToolsHubPage() {
  useEffect(() => {
    document.title = '도구 허브 (Tools) · DesignMind 108'
    window.scrollTo(0, 0)
  }, [])

  const tools = [
    {
      title: 'AI 프롬프트 빌더 (Prompt Builder)',
      description: '매체와 목적, 적용 원리를 선택하면 ChatGPT, Claude, Gemini에 바로 넣을 수 있는 최적화된 디자인 지시문과 점검 체크리스트 마크다운을 3분 안에 생성합니다.',
      path: '/tools/builder',
      icon: Terminal,
      color: 'bg-indigo-600',
      badge: '추천 도구',
    },
    {
      title: 'AI 디자인 진단 (Diagnose)',
      description: '학습지, 포스터, 슬라이드 이미지를 업로드하면 시지각 계층 구조와 명도 대비를 다각도로 분석하여 15초 안에 3대 개선점과 원리 링크를 제안합니다.',
      path: '/tools/diagnose',
      icon: ScanEye,
      color: 'bg-purple-600',
      badge: 'Phase 6 연계',
    },
    {
      title: '수업 활용 허브 (Teach)',
      description: '고등학교 영어과, 정보 미디어 리터러시, 교원 직무 연수 등 학교 교육 현장에서 바로 활용 가능한 4개 수업 모듈과 인쇄용 활동지를 제공합니다.',
      path: '/teach',
      icon: GraduationCap,
      color: 'bg-emerald-600',
      badge: '현장 수업용',
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>업무 및 교육 생산성 도구 모음</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          디자인 심리 실무 도구 허브
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          108개 심리 원리를 교실 수업 자료, 교원 연수, 학교 웹앱 제작에 즉각 투입할 수 있도록 돕는 실용 도구들입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((t) => {
          const Icon = t.icon
          return (
            <Link
              key={t.path}
              to={t.path}
              className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${t.color} text-white shadow-md`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {t.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                    {t.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                <span>도구 열기</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
