import { useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Play, Wrench, ShieldCheck, Flame, BookOpen } from 'lucide-react'
import effectsData from '../data/effects.json'
import chaptersData from '../data/chapters.json'
import mediaData from '../data/media.json'
import purposesData from '../data/purposes.json'
import { useProgress } from '../hooks/useProgress.js'
import { ProgressRing } from '../components/ui/ProgressRing.jsx'
import { Principle } from '../components/xray/Principle.jsx'

export function HomePage() {
  const navigate = useNavigate()
  const { masteredCount, percent, history } = useProgress()

  useEffect(() => {
    document.title = 'DesignMind 108 — 디자인이 마음을 움직이는 108가지 이유'
  }, [])

  // 4. 오늘의 원리 (날짜 기반 결정론적 고정 랜덤)
  const todayEffect = useMemo(() => {
    const today = new Date()
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
    const index = seed % effectsData.length
    return effectsData[index]
  }, [])

  // 5. 이어서 학습 (최근 본 원리의 다음 번호 또는 1번)
  const nextStudyEffect = useMemo(() => {
    if (history.length > 0) {
      const lastId = history[0]
      const nextId = lastId < 108 ? lastId + 1 : 1
      return effectsData.find((e) => e.id === nextId) || effectsData[0]
    }
    return effectsData[0]
  }, [history])

  // 목적 카드 8선 (5.1 명세에 맞춘 8개 대표 목적)
  const top8Purposes = useMemo(() => {
    const targetIds = ['attention', 'emphasis', 'trust', 'choice', 'memory', 'readability', 'grouping', 'usability']
    return purposesData.filter((p) => targetIds.includes(p.id))
  }, [])

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-12">
      {/* 1. 헤드라인 히어로 */}
      <section className="text-center space-y-3 pt-2 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>교육용 디자인 심리 &amp; 시각 인지 인터랙티브 허브</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--color-text-primary)] tracking-tight leading-tight">
          디자인이 마음을 움직이는 <br className="hidden sm:inline" />
          <span className="text-[var(--color-primary)]">108가지 이유</span>
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
          수업자료, 학습지, 웹앱을 학생의 눈높이에서 더 매력적이고 읽기 쉽게 만드는 108가지 심리·착시·색채·레이아웃 법칙.
        </p>
      </section>

      {/* 2. "지금 무엇을 만들고 있나요?" 매체 칩 (가로 스크롤) */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-bold text-[var(--color-text-primary)]">
            지금 무엇을 만들고 있나요?
          </h2>
          <span className="text-xs text-[var(--color-text-tertiary)]">가로로 넘겨보세요</span>
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none select-none">
          {mediaData.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => navigate(`/library?media=${m.id}`)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)] text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] shrink-0 shadow-xs transition-all active:scale-95"
            >
              <span className="text-lg">{m.icon}</span>
              <span>{m.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
            </button>
          ))}
        </div>
      </section>

      {/* 3. "무엇을 하고 싶나요?" 목적 카드 (그리드 8개) - X-ray 051 힉의 법칙 */}
      <Principle ids={[51, 89]}>
        <section>
          <div className="mb-3 px-1">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">
              무엇을 하고 싶나요? (목적별 빠른 탐색)
            </h2>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              디자인을 통해 달성하고 싶은 심리적 목표를 선택하세요.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {top8Purposes.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/library?purpose=${p.id}`)}
                className="flex flex-col items-start p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)] text-left shadow-xs transition-all active:scale-95"
              >
                <span className="text-xl mb-1.5">{p.icon}</span>
                <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] mb-0.5">
                  {p.label}
                </span>
                <span className="text-[11px] text-[var(--color-text-tertiary)] line-clamp-1">
                  {p.description}
                </span>
              </button>
            ))}
          </div>
        </section>
      </Principle>

      {/* 4 & 5. 오늘의 원리 + 내 수집률 진도 링 (2열 배치) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 4. 오늘의 원리 카드 */}
        <section className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Flame className="w-3.5 h-3.5" />
                <span>오늘의 추천 원리</span>
              </span>
              <span className="text-xs font-mono font-bold text-[var(--color-text-tertiary)]">
                #{todayEffect.code}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">
              {todayEffect.nameKo}
            </h3>
            <p className="text-xs font-mono text-[var(--color-text-tertiary)] mb-3">
              {todayEffect.nameEn}
            </p>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-4">
              {todayEffect.oneLiner}
            </p>
          </div>

          <Link
            to={`/effect/${todayEffect.code}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs"
          >
            <Play className="w-4 h-4 ml-0.5" />
            <span>30초 체험 바로가기</span>
          </Link>
        </section>

        {/* 5. 내 수집률 진도 링 - X-ray 032 목표 구배, 019 자이가르닉 */}
        <Principle ids={[32, 19]}>
          <section className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>내 원리 마스터 진도</span>
                </h3>
                <span className="text-xs text-[var(--color-text-tertiary)] font-mono">
                  108개 중 {masteredCount}개 익힘
                </span>
              </div>

              <div className="flex items-center gap-4 my-2">
                <ProgressRing percent={percent} size={68} strokeWidth={7} />
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {masteredCount === 0
                      ? '아직 익힌 원리가 없습니다. 오늘 하루 1개씩 도전해 보세요!'
                      : percent >= 80
                      ? '놀라워요! 거의 모든 원리를 정복해가고 있습니다.'
                      : '꾸준히 익혀가는 중입니다. 다음 원리를 살펴볼까요?'}
                  </p>
                </div>
              </div>
            </div>

            <Link
              to={`/effect/${nextStudyEffect.code}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-xs sm:text-sm font-bold text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all shadow-xs"
            >
              <span>이어서 학습하기: #{nextStudyEffect.code} {nextStudyEffect.nameKo}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </Principle>
      </div>

      {/* 6. 챕터 5개 카드 */}
      <section>
        <div className="mb-4 px-1">
          <h2 className="text-base font-bold text-[var(--color-text-primary)]">
            5대 핵심 영역 챕터
          </h2>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            원하는 테마별로 깊이 있게 원리와 사례를 파고들어 보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chaptersData.map((ch) => (
            <Link
              key={ch.id}
              to={`/library?chapter=${ch.id}`}
              className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:shadow-md transition-all group"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: `var(${ch.colorToken})`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-[var(--color-text-tertiary)]">
                  제{ch.no}장 · {ch.range[1] - ch.range[0] + 1}개 원리
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-1">
                {ch.nameKo}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                {ch.intro}
              </p>
            </Link>
          ))}

          {/* 5번째 챕터: 실전 사례 */}
          <Link
            to="/cases"
            className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:shadow-md transition-all group"
            style={{
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--ch-cases)',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-[var(--ch-cases)]">
                부록 · 11개 사례 연구
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--ch-cases)] transition-colors mb-1">
              학교판 실전 사례 스튜디오
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
              학습지, 포스터, 웹앱, 다크 패턴 등 원리가 복합 적용된 11가지 실전 시안의 핫스팟을 탐색합니다.
            </p>
          </Link>
        </div>
      </section>

      {/* 7. 도구 바로가기 2개 (AI 진단 · 프롬프트 빌더) */}
      <section className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            실전 수업 &amp; 제작 도구
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/tools/diagnose"
            className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] shadow-xs transition-all group flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                AI 디자인 진단
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">
                제작 중인 학습지나 슬라이드를 캡처해 올리면 15초 안에 3대 개선점과 원리를 진단합니다.
              </p>
            </div>
          </Link>

          <Link
            to="/tools/builder"
            className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] shadow-xs transition-all group flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                프롬프트 빌더
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">
                매체와 목적을 고르면 코딩 AI에 붙여넣을 디자인 시스템 프롬프트를 3분 만에 생성합니다.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
