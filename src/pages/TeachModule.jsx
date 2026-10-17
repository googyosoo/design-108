import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Printer, Clock, Target, CheckCircle2, FileText, Layers } from 'lucide-react'
import { Button } from '../components/ui/Button.jsx'
import lessonsData from '../data/lessons.json'

export function TeachModulePage() {
  const { moduleId } = useParams()
  const moduleItem = lessonsData.find((m) => m.id === moduleId)

  useEffect(() => {
    if (moduleItem) {
      document.title = `${moduleItem.title} · DesignMind 108`
      window.scrollTo(0, 0)
    }
  }, [moduleItem])

  if (!moduleItem) {
    return (
      <div className="mx-auto max-w-xl py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">모듈을 찾을 수 없습니다</h2>
        <p className="text-xs text-slate-500 mb-6">요청하신 모듈 ID &apos;{moduleId}&apos;가 존재하지 않습니다.</p>
        <Link to="/teach" className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold">
          수업 허브로 이동
        </Link>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-10">
      {/* 화면 전용 상단 툴바 (인쇄 시 숨김) */}
      <div className="print:hidden flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link to="/teach" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          <span>전체 4개 수업 모듈</span>
        </Link>
        <Button variant="primary" size="sm" onClick={handlePrint} leftIcon={<Printer className="h-4 w-4" />}>
          활동지 A4 인쇄하기
        </Button>
      </div>

      {/* 모듈 헤더 */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            {moduleItem.id}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Target className="h-3.5 w-3.5 text-emerald-500" />
            {moduleItem.target}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-indigo-500" />
            {moduleItem.duration}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {moduleItem.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {moduleItem.overview}
        </p>

        {/* 준비물 */}
        {moduleItem.materials && (
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-slate-100">준비물:</strong> {moduleItem.materials.join(', ')}
          </div>
        )}
      </div>

      {/* 차시별 지도안 타임라인 */}
      <section className="space-y-4 print:hidden">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Layers className="h-5 w-5 text-indigo-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">차시별 교수·학습 과정안</h2>
        </div>

        <div className="space-y-3">
          {moduleItem.steps.map((st) => (
            <div
              key={st.step}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold shrink-0">
                  {st.step}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{st.name}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 shrink-0">
                {st.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 성취 평가 루브릭 테이블 */}
      <section className="space-y-4 print:hidden">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">학생 성취 평가 루브릭</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              <tr>
                <th className="p-3 w-1/4">평가 기준</th>
                <th className="p-3 w-1/4 text-emerald-700 dark:text-emerald-400">우수 (High)</th>
                <th className="p-3 w-1/4 text-indigo-700 dark:text-indigo-400">보통 (Mid)</th>
                <th className="p-3 w-1/4 text-slate-500">노력 요망 (Low)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {moduleItem.rubric.map((rb, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{rb.criterion}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 leading-relaxed">{rb.high}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 leading-relaxed">{rb.mid}</td>
                  <td className="p-3 text-slate-500 leading-relaxed">{rb.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 학생 인쇄용 활동지 뷰 (A4 인쇄 영역) */}
      <section className="space-y-4 pt-4 border-t-2 border-dashed border-slate-300 dark:border-slate-700 print:border-none print:pt-0">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">학생 인쇄용 활동지 (A4)</h2>
          </div>
          <Button variant="secondary" size="sm" onClick={handlePrint} leftIcon={<Printer className="h-4 w-4" />}>
            인쇄 미리보기
          </Button>
        </div>

        {/* 활동지 인쇄 프레임 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-700 bg-white text-slate-900 shadow-lg print:border-none print:shadow-none print:p-0 space-y-6">
          {/* 활동지 머리말 */}
          <div className="border-b-2 border-slate-900 pb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">DesignMind 108 Class Worksheet</p>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">{moduleItem.worksheet?.title || moduleItem.title}</h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium border border-slate-400 px-3 py-1 rounded-lg">
              <span>학년 / 반: _______</span>
              <span>번호: ____</span>
              <span>이름: ___________</span>
            </div>
          </div>

          {/* 탐구 질문 및 작성 공간 */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900">
                1. 탐구 및 적용할 디자인 심리학 3대 원리를 도감에서 찾아 기록하세요.
              </h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {['원리 1 (심리)', '원리 2 (착시/색채)', '원리 3 (레이아웃)'].map((label, idx) => (
                  <div key={idx} className="border border-slate-300 rounded-xl p-3 h-28 flex flex-col justify-between">
                    <span className="font-bold text-slate-500">{label}</span>
                    <span className="text-[10px] text-slate-400">원리명 / 핵심 규칙 요약</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900">
                2. 디자인 의도 영작 훈련 (English Presentation)
              </h4>
              <div className="space-y-2 text-xs">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="border border-slate-300 rounded-xl p-3 space-y-1">
                    <span className="font-bold text-indigo-700">문장 {num}: I applied [원리명] in order to...</span>
                    <div className="h-6 border-b border-dashed border-slate-300" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900">
                3. 최종 아이디어 스케치 및 배치 구상안
              </h4>
              <div className="h-44 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-xs text-slate-400">
                포스터 또는 웹 레이아웃을 자유롭게 스케치하세요 (여백, 헤드라인, CTA 위치 표기)
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between items-center">
            <span>DesignMind 108 · 교원 및 학생 교육용 자유 배포 자료</span>
            <span>https://designmind108.web.app</span>
          </div>
        </div>
      </section>
    </div>
  )
}
