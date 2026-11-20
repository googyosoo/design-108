import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Clock,
  Loader2,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Scale,
  Bot,
  ArrowRight,
} from 'lucide-react'
import effectsData from '../../data/effects.json'
import { SWARM_AGENTS } from '../../lib/swarmSimulator.js'

// 에이전트 색상 토큰 매핑 (Tailwind v4 정적 클래스)
const AGENT_THEME = {
  indigo: {
    badge: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
    avatar: 'bg-indigo-600 text-white',
    mention: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    border: 'border-indigo-300 dark:border-indigo-700',
  },
  rose: {
    badge: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    avatar: 'bg-rose-600 text-white',
    mention: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    border: 'border-rose-300 dark:border-rose-700',
  },
  amber: {
    badge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    avatar: 'bg-amber-600 text-white',
    mention: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    border: 'border-amber-300 dark:border-amber-700',
  },
  emerald: {
    badge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    avatar: 'bg-emerald-600 text-white',
    mention: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    border: 'border-emerald-300 dark:border-emerald-700',
  },
  sky: {
    badge: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
    avatar: 'bg-sky-600 text-white',
    mention: 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    border: 'border-sky-300 dark:border-sky-700',
  },
}

// 5인 전문가 스웜 기본 메타데이터 (fallback용 및 표시 기준)
const DEFAULT_AGENTS = [
  {
    id: 'cognitivist',
    name: '인지심리학자',
    role: '시선 유도 및 정보 청킹 분석',
    badgeColor: 'indigo',
    specialty: '주의 집중, 게슈탈트 시각 법칙, 인지 부하 제어',
  },
  {
    id: 'visual-critic',
    name: '시각 비평가',
    role: '명도 대비 및 조형 균형 점검',
    badgeColor: 'rose',
    specialty: 'WCAG 명도비, 타이포그래피 위계, 조형적 긴장감',
  },
  {
    id: 'ethics-guard',
    name: '윤리 접근성 수호자',
    role: '다크패턴 및 포용성 검증',
    badgeColor: 'amber',
    specialty: '조작적 유도 차단, 색각 다양성 배려, 접근성 표준',
  },
  {
    id: 'school-advocate',
    name: '학교 현장 대변인',
    role: '실제 교육 현장 수용성 평가',
    badgeColor: 'emerald',
    specialty: '학생 및 학부모 가독성, 가정통신문 및 교실 맥락',
  },
  {
    id: 'verifier',
    name: '합의 검증관',
    role: '상충 해소 및 최종 처방 확정',
    badgeColor: 'sky',
    specialty: '이견 조율, 108 원리 매핑 정밀도, 최종 판정',
  },
]

// 단계(stage) 뱃지 스타일
const STAGE_CONFIG = {
  analyze: {
    label: '초기 분석',
    className: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900',
  },
  critique: {
    label: '교차 비평',
    className: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900',
  },
  resolve: {
    label: '합의 검증',
    className: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
  },
}

/**
 * 텍스트 내부의 @멘션을 파싱하여 하이라이트 요소로 렌더링
 */
function HighlightedMessage({ message, agentMap }) {
  if (!message) return null

  // @영문-문자 또는 @한글 멘션 패턴 분리
  const parts = message.split(/(@[A-Za-z0-9가-힣_-]+)/g)

  return (
    <span className="whitespace-pre-wrap leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('@')) {
          const rawTag = part.slice(1)
          // ID 또는 이름 매칭
          const matchedAgent =
            agentMap[rawTag] ||
            Object.values(agentMap).find((a) => a.name === rawTag || a.id === rawTag)

          const theme = matchedAgent ? AGENT_THEME[matchedAgent.badgeColor] : null
          const mentionClass = theme
            ? theme.mention
            : 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'

          return (
            <span
              key={index}
              className={`inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-md text-xs font-semibold border font-mono ${mentionClass}`}
            >
              @{matchedAgent ? matchedAgent.name : rawTag}
            </span>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </span>
  )
}

/**
 * AI 디자인 진단 스웜 협업 및 비평 보드 컴포넌트
 */
export function SwarmCritiqueBoard({
  agents = SWARM_AGENTS,
  agentStates = {},
  transcript = [],
  consensus = null,
  isAnalyzing = false,
  progress = null,
  presetLabel = '',
  onCopyToast = null,
}) {
  const [copiedSnippet, setCopiedSnippet] = useState(false)

  // 108 원리 빠른 조회 맵 구성
  const effectMap = useMemo(() => {
    const map = new Map()
    effectsData.forEach((eff) => {
      map.set(eff.code, eff)
    })
    return map
  }, [])

  // 에이전트 ID 조회 맵
  const agentMap = useMemo(() => {
    const map = {}
    ;(agents || SWARM_AGENTS || DEFAULT_AGENTS).forEach((ag) => {
      map[ag.id] = ag
    })
    return map
  }, [agents])

  // 권장 프롬프트 클립보드 복사
  const handleCopySnippet = async (snippetText) => {
    if (!snippetText) return
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippetText)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = snippetText
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopiedSnippet(true)
      if (onCopyToast) {
        onCopyToast('추천 AI 프롬프트 스니펫을 클립보드에 복사했습니다.')
      }
      setTimeout(() => setCopiedSnippet(false), 2200)
    } catch {
      if (onCopyToast) {
        onCopyToast('복사 권한이 없어 수동으로 드래그해 복사해 주세요.')
      }
    }
  }

  const agentList = agents && agents.length > 0 ? agents : (SWARM_AGENTS || DEFAULT_AGENTS)

  return (
    <div className="space-y-6">
      {/* 1. 상단: 5인 전문가 실시간 상태 바 */}
      <section
        aria-labelledby="swarm-status-title"
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="swarm-status-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
              >
                <span>5인 AI 전문가 협업 스웜 현황</span>
                {presetLabel && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {presetLabel} 진단
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                시선 유도, 명도 대비, 윤리 접근성, 학교 현장 전문가와 합의 검증관이 교차 비평합니다.
              </p>
            </div>
          </div>

          {/* 진행 요약 뱃지 */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {isAnalyzing ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold animate-pulse">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>
                  {progress?.message
                    ? progress.message
                    : `교차 비평 진행 중 (${progress?.step || 1}/${progress?.totalSteps || 5})`}
                </span>
              </span>
            ) : consensus || transcript.length > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>전원 비평 및 합의 완료</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
                <Clock className="h-3.5 w-3.5" />
                <span>진단 대기</span>
              </span>
            )}
          </div>
        </div>

        {/* 5인 전문가 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {agentList.map((agent) => {
            // 상태 판별: agentStates 우선, 없으면 완료/대기 기본값
            let status = agentStates[agent.id]
            if (!status) {
              if (!isAnalyzing && (consensus || transcript.length > 0)) {
                status = 'done'
              } else if (isAnalyzing) {
                status = 'waiting'
              } else {
                status = 'waiting'
              }
            }

            const theme = AGENT_THEME[agent.badgeColor] || AGENT_THEME.indigo
            const isWorking = status === 'working'
            const isDone = status === 'done'

            return (
              <div
                key={agent.id}
                className={`relative rounded-2xl p-3.5 border transition-all flex flex-col justify-between gap-2.5 ${
                  isWorking
                    ? `${theme.border} bg-white dark:bg-slate-900 shadow-md ring-2 ring-purple-500/20`
                    : isDone
                      ? 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60'
                      : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30 opacity-75'
                }`}
              >
                {/* 헤더: 아바타 + 상태 뱃지 */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${theme.avatar}`}
                  >
                    {agent.name.slice(0, 1)}
                  </span>

                  {isWorking ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[11px] font-bold animate-pulse">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>분석 중</span>
                    </span>
                  ) : isDone ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>완료</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium">
                      <Clock className="h-3 w-3" />
                      <span>대기</span>
                    </span>
                  )}
                </div>

                {/* 이름 및 역할 */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                    <span>{agent.name}</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium line-clamp-1">
                    {agent.role}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight">
                    {agent.specialty}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 2. 중단: @멘션 교차 비평 타임라인 */}
      <section
        aria-labelledby="swarm-timeline-title"
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <h3
              id="swarm-timeline-title"
              className="text-sm font-bold text-slate-900 dark:text-slate-100"
            >
              전문가 교차 비평 및 토론 기록 ({transcript.length}건)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {isAnalyzing ? '실시간 스트리밍 중...' : '검증 완료'}
          </span>
        </div>

        {transcript.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <Clock className="h-5 w-5" />
            </div>
            <p className="text-xs text-slate-500">
              {isAnalyzing
                ? '전문가들이 시안을 확인하고 첫 의견을 작성하고 있습니다...'
                : '디자인 심리 진단을 시작하면 전문가 5인의 교차 비평이 여기에 표시됩니다.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {transcript.map((entry, idx) => {
              const speaker = agentMap[entry.agentId] || {
                name: entry.agentName || entry.agentId,
                role: entry.role || '전문가',
                badgeColor: 'indigo',
              }
              const theme = AGENT_THEME[speaker.badgeColor] || AGENT_THEME.indigo
              const stageInfo = STAGE_CONFIG[entry.stage] || STAGE_CONFIG.critique
              const targetAgent = entry.targetAgentId ? agentMap[entry.targetAgentId] : null

              return (
                <div
                  key={entry.id || idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-4 space-y-2.5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  {/* 발화자 헤더 */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold ${theme.avatar}`}
                      >
                        {speaker.name.slice(0, 1)}
                      </span>
                      <strong className="font-bold text-slate-900 dark:text-slate-100">
                        {speaker.name}
                      </strong>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${theme.badge}`}
                      >
                        {speaker.role}
                      </span>

                      {/* 타깃 멘션 표시 */}
                      {entry.targetAgentId && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <ArrowRight className="h-3 w-3" />
                          <span className="text-purple-600 dark:text-purple-400 font-semibold font-mono">
                            @{targetAgent ? targetAgent.name : entry.targetAgentId}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* 단계 뱃지 */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${stageInfo.className}`}
                    >
                      {stageInfo.label}
                    </span>
                  </div>

                  {/* 본문 텍스트 (@멘션 하이라이트) */}
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-8">
                    <HighlightedMessage message={entry.message} agentMap={agentMap} />
                  </div>

                  {/* 인용된 108 원리 링크 태그 */}
                  {entry.citedEffectCodes && entry.citedEffectCodes.length > 0 && (
                    <div className="pl-8 pt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-medium">연계 원리:</span>
                      {entry.citedEffectCodes.map((code) => {
                        const eff = effectMap.get(code)
                        return (
                          <Link
                            key={code}
                            to={`/effect/${code}`}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200 dark:border-indigo-800 text-[11px] font-mono transition-colors"
                          >
                            <span>#{code}</span>
                            {eff && <span className="font-sans font-medium">{eff.nameKo}</span>}
                            <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* 3. 하단: 최종 합의 및 상충 해결 카드 (Consensus) */}
      {(consensus || (!isAnalyzing && transcript.length > 0)) && (
        <section
          aria-labelledby="swarm-consensus-title"
          className="rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-5 sm:p-7 shadow-sm space-y-6 animate-fade-in"
        >
          {/* 헤더 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-200/70 dark:border-emerald-900/50">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3
                  id="swarm-consensus-title"
                  className="text-base font-bold text-slate-900 dark:text-slate-100"
                >
                  스웜 최종 합의 및 상충 해결 결과
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  전문가 간의 상충 의견을 조율하고 교육 현장 최적 처방을 도출했습니다.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
              <Scale className="h-3.5 w-3.5" />
              <span>합의 완료</span>
            </div>
          </div>

          {/* 최종 판정 요약 */}
          {consensus?.finalVerdict && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 space-y-1.5 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>검증관 최종 판정 (Final Verdict)</span>
              </span>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                {consensus.finalVerdict}
              </p>
            </div>
          )}

          {/* 해결된 상충 목록 (resolvedConflicts) */}
          {consensus?.resolvedConflicts && consensus.resolvedConflicts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Scale className="h-3.5 w-3.5 text-purple-600" />
                <span>전문가 상충 쟁점 조율 내역</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {consensus.resolvedConflicts.map((conf, cIdx) => {
                  const conflictSides = Array.isArray(conf.conflictBetween)
                    ? conf.conflictBetween.join(' vs ')
                    : conf.conflictBetween || '전문가 의견 차이'

                  return (
                    <div
                      key={cIdx}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {conf.topic || `쟁점 ${cIdx + 1}`}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                          {conflictSides}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        <strong className="text-emerald-700 dark:text-emerald-400">조율안: </strong>
                        {conf.resolution}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 권장 AI 생성 프롬프트 스니펫 & 원클릭 복사 */}
          {consensus?.recommendedPromptSnippet && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-purple-600" />
                  <span>스웜 권장 재생성 프롬프트 스니펫</span>
                </h4>

                <button
                  type="button"
                  onClick={() => handleCopySnippet(consensus.recommendedPromptSnippet)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  aria-label="추천 프롬프트 복사"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>프롬프트 복사</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-950 text-slate-200 p-4 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner select-all">
                <pre className="whitespace-pre-wrap font-mono">
                  {consensus.recommendedPromptSnippet}
                </pre>
              </div>
              <p className="text-[11px] text-slate-500">
                Claude, Gemini, ChatGPT 등 생성형 AI에 입력하여 본 시안의 문제점을 즉시 개선한 디자인을 다시 생성할 수 있습니다.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
