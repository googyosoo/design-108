import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Maximize2, Minimize2, X, ChevronLeft, ChevronRight, Sparkles, Check, AlertTriangle } from 'lucide-react'
import { EffectDemo } from '../components/demos/index.jsx'
import effectsData from '../data/effects.json'

export function PresentDeckPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const effect = effectsData.find((e) => e.code === code)

  const [slideIndex, setSlideIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const totalSlides = 5

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1))
  }, [totalSlides])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  const handleExit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
    navigate(`/effect/${code}`)
  }, [code, navigate])

  // 키보드 조작 이벤트 리스너
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === 'Escape') {
        handleExit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev, toggleFullscreen, handleExit])

  useEffect(() => {
    if (effect) {
      document.title = `[발표 모드] ${effect.code} ${effect.name_ko} · DesignMind 108`
    }
  }, [effect])

  if (!effect) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white text-center p-4">
        <div>
          <h2 className="text-xl font-bold mb-2">원리를 찾을 수 없습니다</h2>
          <Link to="/library" className="text-indigo-400 underline text-sm">도감으로 돌아가기</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
      {/* 상단 툴바 */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-mono font-black text-sm">
            {effect.code}
          </span>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {effect.name_ko} <span className="text-slate-400 font-normal">({effect.name_en})</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
            슬라이드 {slideIndex + 1} / {totalSlides}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="전체화면 토글 (단축키: F)"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="발표 모드 나가기 (단축키: Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* 중앙 메인 슬라이드 캔버스 */}
      <main className="flex-1 flex items-center justify-center py-6 px-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto">
          {/* 슬라이드 1: 타이틀 & 핵심 요약 */}
          {slideIndex === 0 && (
            <div className="space-y-6 text-center animate-fade-in">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Design Psychology Core Principle</span>
              </span>

              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                {effect.name_ko}
              </h2>
              <p className="text-xl sm:text-2xl font-serif text-indigo-300 font-medium">
                {effect.name_en}
              </p>

              <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl mt-6">
                <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-semibold">
                  "{effect.summary}"
                </p>
              </div>
            </div>
          )}

          {/* 슬라이드 2: 인지적 메커니즘 (Why) */}
          {slideIndex === 1 && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Cognitive Psychology Mechanism
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                인간의 뇌는 왜 이렇게 반응할까?
              </h2>

              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {effect.why}
                </p>
                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                  {effect.purposes?.map((p) => (
                    <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                      #{p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 슬라이드 3: 대화형 인터랙티브 체험 */}
          {slideIndex === 2 && (
            <div className="space-y-4 animate-fade-in w-full">
              <div className="text-center space-y-1 mb-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Live Experience</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">직접 체험하는 30초 실험실</h2>
              </div>
              <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl">
                <EffectDemo effect={effect} />
              </div>
            </div>
          )}

          {/* 슬라이드 4: Do & Don't 실전 지침 */}
          {slideIndex === 3 && (
            <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Practical Guidelines</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">실전 적용 Do & Don't</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-800/60 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Check className="h-5 w-5" />
                    <span>이렇게 적용하세요 (Do)</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{effect.do}</p>
                </div>

                <div className="p-6 rounded-3xl bg-rose-950/40 border border-rose-800/60 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle className="h-5 w-5" />
                    <span>이것은 피하세요 (Don't)</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{effect.dont}</p>
                </div>
              </div>
            </div>
          )}

          {/* 슬라이드 5: 영문 핵심 표현 & 토론 */}
          {slideIndex === 5 || slideIndex === 4 && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto text-center">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Global Vocabulary & Presentation
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                글로벌 UX 영어 표현과 토론
              </h2>

              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-left shadow-2xl">
                <div>
                  <span className="text-xs font-bold text-indigo-400">핵심 용어</span>
                  <p className="text-lg font-bold text-white mt-0.5">{effect.name_en}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400">발표용 영문 문장 패턴</span>
                  <p className="text-sm font-mono text-slate-300 mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    "We leveraged the {effect.name_en} to enhance user focus and readability."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 하단 내비게이션 & 단축키 가이드 */}
      <footer className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={slideIndex === 0}
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>이전 (←)</span>
          </button>
          <button
            type="button"
            disabled={slideIndex === totalSlides - 1}
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-md"
          >
            <span>다음 (→ / Space)</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 슬라이드 닷 인디케이터 */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                slideIndex === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              aria-label={`슬라이드 ${idx + 1}로 이동`}
            />
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
          <span>화살표/스페이스: 이동</span>
          <span>F: 전체화면</span>
          <span>Esc: 나가기</span>
        </div>
      </footer>
    </div>
  )
}
