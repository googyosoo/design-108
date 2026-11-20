import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Copy,
  ExternalLink,
  ListTodo,
  Compass,
  Eye,
  Shield,
  MessageSquare,
  Check,
} from 'lucide-react'
import { Button } from '../ui/Button.jsx'
import { Toast } from '../ui/Toast.jsx'
import { runTeamCoachSwarm, TEAM_COACH_AGENTS } from '../../lib/swarmSimulator.js'
import effectsData from '../../data/effects.json'

/**
 * 모둠 활동 AI 코치 스웜 컴포넌트
 * - 학생/교사가 모둠 내 역할(기획, 시각 디자인, 윤리·접근성)을 선택
 * - 초안 아이디어나 걸림돌을 입력하면 3인의 AI 전문 코치가 협업 토론(@mention) 및 피드백 제공
 * - 구체적인 실천 행동 목록(nextActions)을 점검용 체크리스트로 제공
 */

const ROLE_OPTIONS = [
  {
    id: '기획 담당',
    label: '기획 담당',
    icon: Compass,
    badgeColor: 'border-indigo-300 bg-indigo-50/70 text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300',
    description: '정보 구조, 핵심 메시지, 학생과 독자 맥락 조율',
  },
  {
    id: '시각 디자인 담당',
    label: '시각 디자인 담당',
    icon: Eye,
    badgeColor: 'border-amber-300 bg-amber-50/70 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300',
    description: '시선 유도 흐름, 크기 대비, 여백, 레이아웃 균형',
  },
  {
    id: '윤리·접근성 담당',
    label: '윤리·접근성 담당',
    icon: Shield,
    badgeColor: 'border-emerald-300 bg-emerald-50/70 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300',
    description: '명도 대비 기준, 다크 패턴 방지, 모두를 위한 배려',
  },
]

const SAMPLE_QUESTIONS = [
  '제목과 날짜가 한 덩어리로 뭉쳐서 무엇을 먼저 읽어야 할지 헷갈립니다.',
  '포스터에 신청 QR 코드를 크게 넣고 싶은데 시선이 산만해질까 걱정입니다.',
  '다크 패턴 없이 정직하게 동아리 참여를 이끄는 문구를 쓰고 싶습니다.',
]

const COACH_META = {
  'planner-coach': {
    name: '기획 코치',
    color: 'border-indigo-300 bg-indigo-50/70 text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300',
    dotColor: 'bg-indigo-500',
  },
  'visual-coach': {
    name: '시각 코치',
    color: 'border-amber-300 bg-amber-50/70 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300',
    dotColor: 'bg-amber-500',
  },
  'ethics-coach': {
    name: '윤리 코치',
    color: 'border-emerald-300 bg-emerald-50/70 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300',
    dotColor: 'bg-emerald-500',
  },
}

export function TeamCoachSwarm({
  moduleTitle = '수업 모둠 프로젝트',
  relatedEffectIds = [],
}) {
  const [selectedRole, setSelectedRole] = useState('기획 담당')
  const [draftText, setDraftText] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyField, setShowApiKeyField] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [liveTranscript, setLiveTranscript] = useState([])
  const [result, setResult] = useState(null)
  const [completedActions, setCompletedActions] = useState({})
  const [toastMsg, setToastMsg] = useState('')
  const transcriptBottomRef = useRef(null)

  // 코치 스웜 실행
  const handleRunSwarm = async () => {
    const trimmed = draftText.trim()
    if (!trimmed) {
      setToastMsg('모둠의 초안 아이디어 또는 고민을 먼저 작성해 주세요.')
      return
    }

    setIsRunning(true)
    setLiveTranscript([])
    setResult(null)
    setCompletedActions({})

    try {
      const swarmOutput = await runTeamCoachSwarm(
        {
          moduleTitle,
          targetRole: selectedRole,
          draftText: trimmed,
          relatedEffectIds,
        },
        apiKey.trim(),
        (progress) => {
          setLiveTranscript((prev) => {
            // 중복 방지 (id 기준)
            const exists = prev.some((p) => p.id === progress.id)
            if (exists) return prev
            return [...prev, progress]
          })
        },
      )

      setResult(swarmOutput)
      setToastMsg('3인의 AI 코치가 협업 피드백을 완성했습니다.')
    } catch {
      setToastMsg('코치 스웜 상담 중 일시적 오류가 발생했습니다.')
    } finally {
      setIsRunning(false)
    }
  }

  // 초기화
  const handleReset = () => {
    setDraftText('')
    setLiveTranscript([])
    setResult(null)
    setCompletedActions({})
    setToastMsg('코치 상담 내용이 초기화되었습니다.')
  }

  // 전체 피드백 클립보드 복사
  const handleCopyFeedback = () => {
    if (!result) return
    const entries = result.transcript || liveTranscript
    const textLines = [
      `# [DesignMind 108] 모둠 활동 AI 코치 스웜 피드백`,
      `- 모듈: ${moduleTitle}`,
      `- 상담 역할: ${selectedRole}`,
      `- 우리 모둠 초안: ${draftText}`,
      '',
      '## 3인 코치 협업 토론 내용',
      ...entries.map((item) => `[${item.agentName || item.role}] ${item.message}`),
      '',
      '## 모둠 다음 실천 행동',
      ...(result.nextActions || []).map((action, idx) => `${idx + 1}. ${action}`),
    ]

    try {
      navigator.clipboard.writeText(textLines.join('\n'))
      setToastMsg('피드백 내용이 클립보드에 복사되었습니다.')
    } catch {
      setToastMsg('복사 권한이 없어 수동 복사를 이용해 주세요.')
    }
  }

  // 실천 행동 체크 토글
  const toggleAction = (idx) => {
    setCompletedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  // 멘션(@...) 하이라이트 렌더러
  const renderMessageWithMentions = (message = '') => {
    const parts = message.split(/(@[가-힣a-zA-Z0-9_-]+)/g)
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span
            key={index}
            className="inline-block px-1.5 py-0.2 rounded-md font-semibold text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300"
          >
            {part}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const activeTranscript = result?.transcript || liveTranscript

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-[var(--shadow-1)] space-y-6">
      {/* 상단 타이틀 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-line)] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>모둠 활동 지원</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <span>모둠 활동 AI 코치 스웜</span>
          </h3>
          <p className="text-xs text-[var(--color-ink-muted)]">
            기획, 시각 디자인, 윤리·접근성 3인의 코치가 모둠의 고민을 함께 토론하고 구체적인 해결책을 제안합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowApiKeyField((p) => !p)}
            className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] underline cursor-pointer"
          >
            {apiKey ? 'API 키 등록됨' : 'Gemini 키(선택)'}
          </button>
          {(activeTranscript.length > 0 || draftText) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>다시 쓰기</span>
            </Button>
          )}
        </div>
      </div>

      {/* 선택적 API 키 설정 입력줄 */}
      {showApiKeyField && (
        <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 text-xs space-y-2">
          <p className="text-[var(--color-ink-muted)]">
            API 키가 없어도 108 원리 기반의 <strong>지능형 로컬 코치 엔진</strong>이 즉시 동작합니다.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="Gemini API 키 입력 (AIza...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] font-mono text-xs text-[var(--color-ink)]"
            />
            <Button size="sm" variant="secondary" onClick={() => setShowApiKeyField(false)}>
              닫기
            </Button>
          </div>
        </div>
      )}

      {/* 3인의 코치 프로필 뱃지 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {(TEAM_COACH_AGENTS || [
          { id: 'planner-coach', name: '기획 코치', role: '정보 위계·메시지 구조' },
          { id: 'visual-coach', name: '시각 코치', role: '시선 유도·여백·명도 대비' },
          { id: 'ethics-coach', name: '윤리 코치', role: '조작 배제·접근성 점검' },
        ]).map((coach) => {
          const meta = COACH_META[coach.id] || {
            color: 'border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]',
            dotColor: 'bg-slate-400',
          }
          return (
            <div
              key={coach.id}
              className={`p-3 rounded-2xl border text-xs flex items-center gap-2.5 ${meta.color}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} shrink-0`} aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-bold text-[13px]">{coach.name}</p>
                <p className="text-[11px] opacity-80 truncate">{coach.role || coach.specialty}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 1. 모둠 역할 선택 */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[var(--color-ink)]">
          1. 질문하는 학생 또는 모둠의 역할을 선택하세요
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {ROLE_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isSelected = selectedRole === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedRole(opt.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-950/40 text-[var(--color-ink)]'
                    : 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:border-slate-300'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-xs text-[var(--color-ink)]">
                    <Icon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white text-[10px]">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-80 leading-snug">{opt.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. 초안 아이디어 또는 걸림돌 입력 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="team-coach-draft-input" className="text-xs font-bold text-[var(--color-ink)]">
            2. 현재 구상 중인 아이디어, 디자인 스케치, 또는 막히는 부분을 적어주세요
          </label>
          <span className="text-[11px] text-[var(--color-ink-muted)]">{draftText.length}자</span>
        </div>

        <textarea
          id="team-coach-draft-input"
          rows={3}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="예: 축제 안내 포스터 제목과 행사 일시의 글자 크기를 비슷하게 잡았더니 너무 평범해 보입니다. 핵심을 강조하고 참여를 돋우는 배치 조언을 구합니다."
          className="w-full p-3.5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg)] text-xs text-[var(--color-ink)] leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* 예시 질문 추천 칩 */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-[var(--color-ink-muted)]">자주 묻는 질문:</span>
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setDraftText(q)}
              className="text-[11px] px-2.5 py-1 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-indigo-300 transition-colors cursor-pointer"
            >
              {q.slice(0, 24)}…
            </button>
          ))}
        </div>
      </div>

      {/* 상담 실행 버튼 */}
      <div className="flex items-center justify-end gap-2 pt-1">
        <Button
          variant="primary"
          onClick={handleRunSwarm}
          disabled={isRunning || !draftText.trim()}
          className="gap-2"
        >
          {isRunning ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden="true" />
              <span>3인 코치가 토론하는 중…</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>3인 AI 코치 피드백 받기</span>
            </>
          )}
        </Button>
      </div>

      {/* 상담 결과 영역 */}
      {activeTranscript.length > 0 && (
        <div className="space-y-5 pt-4 border-t border-[var(--color-line)]">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[var(--color-ink)] flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              <span>3인 코치 실시간 협업 토론 로그</span>
            </h4>
            {result && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyFeedback}
                className="gap-1.5 text-xs"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>피드백 복사</span>
              </Button>
            )}
          </div>

          {/* 타임라인 카드 목록 */}
          <div className="space-y-3">
            {activeTranscript.map((item, idx) => {
              const meta = COACH_META[item.agentId] || {
                name: item.agentName || '전문 코치',
                color: 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)]',
                dotColor: 'bg-indigo-500',
              }

              return (
                <div
                  key={item.id || idx}
                  className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg)] p-4 space-y-2.5 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${meta.dotColor}`} aria-hidden="true" />
                      <span className="font-bold text-xs text-[var(--color-ink)]">
                        {item.agentName || meta.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-muted)]">
                        {item.role}
                      </span>
                    </div>

                    {item.targetAgentId && (
                      <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                        → @{COACH_META[item.targetAgentId]?.name || item.targetAgentId}에게 의견 전달
                      </span>
                    )}
                  </div>

                  {/* 코멘트 본문 */}
                  <div className="text-xs text-[var(--color-ink)] leading-relaxed pl-4 border-l-2 border-indigo-400/40">
                    {renderMessageWithMentions(item.message)}
                  </div>

                  {/* 인용된 108 디자인 원리 링크 */}
                  {item.citedEffectCodes && item.citedEffectCodes.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[11px] font-semibold text-[var(--color-ink-muted)]">
                        추천 원리:
                      </span>
                      {item.citedEffectCodes.map((code) => {
                        const eff = effectsData.find((e) => e.code === code)
                        return (
                          <Link
                            key={code}
                            to={`/effect/${code}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 font-medium hover:border-indigo-400 transition-colors"
                          >
                            <span className="font-mono text-[11px]">#{code}</span>
                            <span>{eff?.nameKo || '원리 살펴보기'}</span>
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
            <div ref={transcriptBottomRef} />
          </div>

          {/* 다음 실천 행동 체크리스트 */}
          {result?.nextActions && result.nextActions.length > 0 && (
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <ListTodo className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  <span>우리 모둠이 지금 바로 실천할 다음 행동</span>
                </h5>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                  {Object.values(completedActions).filter(Boolean).length} / {result.nextActions.length} 완료
                </span>
              </div>

              <div className="space-y-2">
                {result.nextActions.map((action, idx) => {
                  const isChecked = !!completedActions[idx]
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleAction(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                        isChecked
                          ? 'border-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 line-through opacity-85'
                          : 'border-emerald-200 dark:border-emerald-900/40 bg-white dark:bg-slate-900 text-[var(--color-ink)] hover:border-emerald-300'
                      }`}
                    >
                      <span className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                        ) : (
                          <span className="flex h-4 w-4 rounded border border-slate-300 dark:border-slate-600 items-center justify-center text-[10px] text-slate-500 font-mono">
                            {idx + 1}
                          </span>
                        )}
                      </span>
                      <span className="flex-1 leading-relaxed">{action}</span>
                      {isChecked && <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <Toast
        isOpen={Boolean(toastMsg)}
        message={toastMsg}
        onClose={() => setToastMsg('')}
      />
    </div>
  )
}
