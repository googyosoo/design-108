import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Copy,
  Download,
  Check,
  RotateCcw,
  Terminal,
  Sparkles,
  ShieldCheck,
  Code2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
  Key,
} from 'lucide-react'
import { Button } from '../components/ui/Button.jsx'
import { Toast } from '../components/ui/Toast.jsx'
import { runPromptSwarm } from '../lib/swarmSimulator.js'
import mediaData from '../data/media.json'
import purposesData from '../data/purposes.json'
import effectsData from '../data/effects.json'

const SAMPLE_CONTEXTS = [
  '중학교 2학년 수학여행 가정통신문, 학부모 동의서 포함',
  '고등학교 축제 동아리 부스 홍보 영문 포스터, QR 신청 포함',
  '수업 단원 정리 5분 발표 슬라이드, 핵심 공식 1개 강조',
  '학습용 어휘 퀴즈 웹앱 온보딩 화면, 모바일 터치 최적화',
]

const STAGE_LABELS = {
  architect: { name: '설계 아키텍트', desc: '정보 구조와 원리 배치' },
  copywriter: { name: '카피라이터', desc: '헤드라인과 시안 작성' },
  'ethics-verifier': { name: '윤리·WCAG 검증관', desc: '다크패턴 및 접근성 점검' },
}

export function PromptBuilderPage() {
  // 3단계 선택 파라미터 상태
  const [selectedMedia, setSelectedMedia] = useState(mediaData[2]?.id || 'notice') // 기본 가정통신문
  const [selectedPurposes, setSelectedPurposes] = useState([
    purposesData[5]?.id || 'readability',
    purposesData[1]?.id || 'emphasis',
  ])
  const [selectedEffectIds, setSelectedEffectIds] = useState([8, 10, 12]) // 포인팅, 대비, 밴드왜건 기본 추천

  // 사용자 맞춤 상황 및 맥락 입력
  const [customContext, setCustomContext] = useState('')

  // 스웜 실행 상태
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [isSwarmRunning, setIsSwarmRunning] = useState(false)
  const [swarmProgress, setSwarmProgress] = useState(null)
  const [liveTranscript, setLiveTranscript] = useState([])
  const [swarmResult, setSwarmResult] = useState(null)

  // 뷰어 탭 상태 ('prompt' | 'preview' | 'pipeline' | 'checks')
  const [activeOutputTab, setActiveOutputTab] = useState('prompt')
  // HTML 미리보기 서브모드 ('preview' | 'code')
  const [previewSubMode, setPreviewSubMode] = useState('preview')
  // 검증본 vs 기본 수동 프롬프트 토글 ('verified' | 'manual')
  const [promptViewMode, setPromptViewMode] = useState('verified')

  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    document.title = 'AI 프롬프트 빌더 · DesignMind 108'
    window.scrollTo(0, 0)
  }, [])

  // 목적 토글 핸들러 (최대 2개)
  const togglePurpose = (id) => {
    if (selectedPurposes.includes(id)) {
      if (selectedPurposes.length > 1) {
        setSelectedPurposes(selectedPurposes.filter((p) => p !== id))
      }
    } else {
      if (selectedPurposes.length >= 2) {
        setSelectedPurposes([selectedPurposes[1], id])
      } else {
        setSelectedPurposes([...selectedPurposes, id])
      }
    }
  }

  // 원리 토글 핸들러 (최대 5개)
  const toggleEffect = (id) => {
    if (selectedEffectIds.includes(id)) {
      if (selectedEffectIds.length <= 1) {
        setToastMsg('최소 1개 이상의 디자인 심리 원리를 선택해야 합니다.')
        return
      }
      setSelectedEffectIds(selectedEffectIds.filter((eId) => eId !== id))
    } else {
      if (selectedEffectIds.length >= 5) {
        setToastMsg('원리는 최대 5개까지 선택할 수 있습니다.')
      } else {
        setSelectedEffectIds([...selectedEffectIds, id])
      }
    }
  }

  const currentMedia = mediaData.find((m) => m.id === selectedMedia) || mediaData[0]
  const currentPurposes = purposesData.filter((p) => selectedPurposes.includes(p.id))
  const currentEffects = effectsData.filter((e) => selectedEffectIds.includes(e.id))

  // 추천 원리 목록 도출 (목적이나 매체에 맞는 원리 8선)
  const recommendedEffects = effectsData
    .filter((e) => {
      const matchPurpose = e.purposeTags?.some((p) => selectedPurposes.includes(p))
      const matchMedia = e.mediaTags?.includes(selectedMedia)
      return matchPurpose || matchMedia
    })
    .slice(0, 8)

  // 기본 수동 마크다운 지시문 생성
  const manualPrompt = `# [디자인 지시문] ${currentMedia?.label || '교육용 자료'} 인지 심리 최적화 제작 요청

## 1. 역할 정의 (Role)
당신은 최고 수준의 교육공학 및 UI/UX 인지 심리학 전문가입니다.
사용자(학생, 학부모, 교직원)의 인지 부하를 최소화하고 정보 전달력을 극대화하는 시각적 계층 구조를 설계합니다.

## 2. 제작 매체 및 핵심 목적
- **제작 대상 매체**: ${currentMedia?.label} (${currentMedia?.tips ? currentMedia.tips.join(' / ') : ''})
- **핵심 설계 목적**: ${currentPurposes.map((p) => p.label).join(', ')}
${customContext.trim() ? `- **세부 상황 및 맥락**: ${customContext.trim()}\n` : ''}
## 3. 반드시 준수할 디자인 심리학 원리 (DesignMind 108)
${currentEffects
  .map(
    (eff) =>
      `### [${eff.code}] ${eff.nameKo} (${eff.nameEn})
- **핵심 원리**: ${eff.oneLiner}
- **적용 규칙**: ${eff.why}
- **Do**: ${eff.doList ? eff.doList.join(' / ') : ''}
- **Don't**: ${eff.dontList ? eff.dontList.join(' / ') : ''}`
  )
  .join('\n\n')}

## 4. 최종 출력 요구사항
1. 위 디자인 심리학 원리 ${currentEffects.length}가지가 구체적으로 어떻게 레이아웃, 타이포그래피, 여백에 녹아들었는지 단계별로 설명하세요.
2. 실제 복사하여 바로 쓸 수 있는 시각적 텍스트 구성안(또는 HTML/CSS 컴포넌트 코드)을 완성본 형태로 제시하세요.
3. WCAG 2.2 AA 가이드라인(명도 대비 4.5:1 이상) 및 조작 편의성을 자체 점검하는 3개 항목 체크리스트를 첨부하세요.`

  // 최종 표시될 프롬프트 (스웜 검증 결과가 있고 검증본 모드일 때 스웜 결과 사용)
  const displayedPrompt =
    swarmResult && promptViewMode === 'verified'
      ? swarmResult.finalPrompt
      : manualPrompt

  // 3단계 에이전트 스웜 실행 핸들러
  const handleRunSwarm = async () => {
    setIsSwarmRunning(true)
    setLiveTranscript([])
    setSwarmResult(null)
    setSwarmProgress(null)
    setActiveOutputTab('pipeline')

    try {
      const output = await runPromptSwarm(
        {
          mediaCode: selectedMedia,
          purposeCodes: selectedPurposes,
          effectIds: selectedEffectIds,
          customContext: customContext.trim(),
        },
        apiKey.trim(),
        (progress) => {
          setSwarmProgress(progress)
          setLiveTranscript((prev) => {
            const exists = prev.some((p) => p.id === progress.id)
            if (exists) return prev
            return [...prev, progress]
          })
        },
      )

      setSwarmResult(output)
      setPromptViewMode('verified')
      setActiveOutputTab('prompt')
      setToastMsg('3단계 AI 에이전트 스웜이 검증을 완료했습니다!')
    } catch {
      setToastMsg('스웜 실행 중 오류가 발생하여 기본 수동 프롬프트를 유지합니다.')
      setActiveOutputTab('prompt')
    } finally {
      setIsSwarmRunning(false)
    }
  }

  // 클립보드 복사
  const handleCopyPrompt = () => {
    try {
      navigator.clipboard.writeText(displayedPrompt)
      setToastMsg('프롬프트가 클립보드에 복사되었습니다!')
    } catch {
      setToastMsg('복사 권한이 없어 수동 복사를 이용해 주세요.')
    }
  }

  // HTML 코드 복사
  const handleCopyHtml = () => {
    if (!swarmResult?.htmlPreview) return
    try {
      navigator.clipboard.writeText(swarmResult.htmlPreview)
      setToastMsg('HTML/CSS 시안 코드가 클립보드에 복사되었습니다!')
    } catch {
      setToastMsg('복사 권한이 없어 수동 복사를 이용해 주세요.')
    }
  }

  // 마크다운 파일 다운로드
  const handleDownloadMd = () => {
    try {
      const blob = new Blob([displayedPrompt], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `DesignPrompt_${selectedMedia}_${new Date().toISOString().slice(0, 10)}.md`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setToastMsg('마크다운 파일 다운로드가 완료되었습니다.')
    } catch {
      setToastMsg('파일 다운로드 중 문제가 발생했습니다.')
    }
  }

  // 전체 초기화
  const handleReset = () => {
    setSelectedMedia(mediaData[2]?.id || 'notice')
    setSelectedPurposes([purposesData[5]?.id || 'readability', purposesData[1]?.id || 'emphasis'])
    setSelectedEffectIds([8, 10, 12])
    setCustomContext('')
    setSwarmResult(null)
    setLiveTranscript([])
    setSwarmProgress(null)
    setActiveOutputTab('prompt')
    setPromptViewMode('verified')
    setToastMsg('모든 설정이 초기화되었습니다.')
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

  const activeTranscript = swarmResult?.transcript || liveTranscript
  const passedChecksCount = swarmResult?.checks?.filter((c) => c.passed).length || 0
  const totalChecksCount = swarmResult?.checks?.length || 0

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 헤더 */}
      <div className="space-y-3">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>도구 허브</span>
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 mb-1">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>3단계 에이전트 스웜 파이프라인 탑재</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
              AI 디자인 프롬프트 빌더
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1">
              매체, 목적, 108 원리, 상황을 조합하여 설계 아키텍트, 카피라이터, 윤리 검증관 3단계 스웜이 완성도 높은 지시문과 HTML 시안을 생성합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiKeyModal((p) => !p)}
              className="gap-1.5 text-xs"
            >
              <Key className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{apiKey ? 'API 키 등록됨' : 'Gemini 키 (선택)'}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>선택 초기화</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 선택적 API 키 설정 드롭다운 */}
      {showApiKeyModal && (
        <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-950/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>Google Gemini API 키 설정 (선택 사항)</span>
            </h4>
            <button
              type="button"
              onClick={() => setShowApiKeyModal(false)}
              className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              닫기
            </button>
          </div>
          <p className="text-[var(--color-ink-muted)]">
            API 키가 없어도 108 원리 데이터에 기반한 <strong>지능형 로컬 시뮬레이터</strong>가 100% 정상 작동합니다. 최신 Gemini 2.5 Flash 연동을 원하시면 개인 키를 입력하세요.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] text-xs w-full max-w-sm font-mono text-[var(--color-ink)]"
            />
            <Button size="sm" variant="secondary" onClick={() => setShowApiKeyModal(false)}>
              저장
            </Button>
          </div>
        </div>
      )}

      {/* 3단계 파라미터 빌딩 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 좌측 옵션 선택기 (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* 1단계: 매체 선택 */}
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 space-y-3 shadow-[var(--shadow-1)]">
            <h3 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px] font-bold">1</span>
              <span>제작 대상 매체 선택</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {mediaData.map((m) => {
                const isSelected = selectedMedia === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMedia(m.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs ring-1 ring-indigo-600'
                        : 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:border-slate-300'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="text-sm">{m.icon}</span>
                    <span className="truncate">{m.label}</span>
                  </button>
                )
              })}
            </div>
            {currentMedia?.tips && (
              <p className="text-[11px] text-[var(--color-ink-muted)] pt-1 border-t border-[var(--color-line)]">
                💡 <strong>매체 가이드:</strong> {currentMedia.tips[0]}
              </p>
            )}
          </div>

          {/* 2단계: 목적 선택 */}
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 space-y-3 shadow-[var(--shadow-1)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px] font-bold">2</span>
                <span>디자인 핵심 목적 (최대 2개)</span>
              </h3>
              <span className="text-xs font-mono text-[var(--color-ink-muted)]">{selectedPurposes.length}/2</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {purposesData.map((p) => {
                const isSelected = selectedPurposes.includes(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePurpose(p.id)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-xs'
                        : 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3단계: 적용 원리 선택 */}
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 space-y-3 shadow-[var(--shadow-1)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px] font-bold">3</span>
                <span>적용 심리학 원리 (최대 5개)</span>
              </h3>
              <span className="text-xs font-mono text-[var(--color-ink-muted)]">{selectedEffectIds.length}/5</span>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] text-[var(--color-ink-muted)]">매체 및 목적 맞춤 추천 원리:</p>
              <div className="flex flex-wrap gap-1.5">
                {recommendedEffects.map((eff) => {
                  const isSelected = selectedEffectIds.includes(eff.id)
                  return (
                    <button
                      key={eff.id}
                      type="button"
                      onClick={() => toggleEffect(eff.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold ring-1 ring-emerald-500'
                          : 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:border-slate-300'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="font-mono text-[10px]">#{eff.code}</span>
                      <span>{eff.nameKo}</span>
                      {isSelected && <Check className="h-3 w-3 text-emerald-600 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 4단계: 추가 상황 및 맥락 입력 (선택) */}
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 space-y-3 shadow-[var(--shadow-1)]">
            <div className="flex items-center justify-between">
              <label htmlFor="custom-context-input" className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px] font-bold">4</span>
                <span>추가 상황 및 맥락 입력 (선택)</span>
              </label>
              <span className="text-[11px] text-[var(--color-ink-muted)]">{customContext.length}자</span>
            </div>

            <textarea
              id="custom-context-input"
              rows={2}
              value={customContext}
              onChange={(e) => setCustomContext(e.target.value)}
              placeholder="예: 중학교 2학년 수학여행 가정통신문, 학부모 동의서 포함"
              className="w-full p-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-xs text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            />

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-[var(--color-ink-muted)]">빠른 예시:</span>
              {SAMPLE_CONTEXTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomContext(sample)}
                  className="text-[11px] px-2 py-0.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-indigo-300 cursor-pointer truncate max-w-[240px]"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* 3단계 스웜 실행 CTA 배너 */}
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-indigo-50/70 to-purple-50/40 dark:from-indigo-950/40 dark:to-purple-950/20 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>3단계 에이전트 스웜 파이프라인</span>
                </h4>
                <p className="text-[11px] text-[var(--color-ink-muted)]">
                  Architect → Copywriter → Ethics-Verifier 순으로 토론하며 프롬프트와 HTML 시안을 정밀 검증합니다.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleRunSwarm}
              disabled={isSwarmRunning}
              className="w-full gap-2 font-bold shadow-md"
            >
              {isSwarmRunning ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>
                    {swarmProgress
                      ? `${swarmProgress.agentName || '에이전트'} 작업 중…`
                      : '3단계 에이전트 스웜 실행 중…'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>3단계 AI 에이전트 스웜 실행</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 우측 탭형 출력 뷰어 (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3 min-w-0">
          {/* 상단 탭 헤더 및 액션 버튼 */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-line)] pb-2">
            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-[var(--color-bg)] rounded-xl border border-[var(--color-line)] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveOutputTab('prompt')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeOutputTab === 'prompt'
                    ? 'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-xs font-bold'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                <Terminal className="h-3.5 w-3.5 text-indigo-600" />
                <span>마크다운 프롬프트</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveOutputTab('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeOutputTab === 'preview'
                    ? 'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-xs font-bold'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                <Eye className="h-3.5 w-3.5 text-purple-600" />
                <span>HTML 시안</span>
                {swarmResult?.htmlPreview && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveOutputTab('pipeline')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeOutputTab === 'pipeline'
                    ? 'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-xs font-bold'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
                <span>토론 로그</span>
                {activeTranscript.length > 0 && (
                  <span className="text-[10px] font-mono px-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {activeTranscript.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveOutputTab('checks')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeOutputTab === 'checks'
                    ? 'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-xs font-bold'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>점검표</span>
                {swarmResult?.checks && (
                  <span className="text-[10px] font-mono px-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {passedChecksCount}/{totalChecksCount}
                  </span>
                )}
              </button>
            </div>

            {/* 우측 퀵 버튼 */}
            <div className="flex items-center gap-1.5">
              {activeOutputTab === 'preview' && swarmResult?.htmlPreview ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleCopyHtml}
                  className="gap-1 text-xs"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>HTML 복사</span>
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleCopyPrompt}
                    className="gap-1 text-xs"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>복사</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleDownloadMd}
                    className="gap-1 text-xs"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>.md 다운로드</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* 탭 1: 마크다운 프롬프트 뷰 */}
          {activeOutputTab === 'prompt' && (
            <div className="space-y-3">
              {/* 스웜 검증본 vs 기본 수동 프롬프트 토글 바 */}
              {swarmResult && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>3단계 에이전트 검증 완료 지시문 적용 중</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPromptViewMode('verified')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                        promptViewMode === 'verified'
                          ? 'bg-emerald-600 text-white'
                          : 'text-emerald-700 hover:underline'
                      }`}
                    >
                      검증본
                    </button>
                    <button
                      type="button"
                      onClick={() => setPromptViewMode('manual')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                        promptViewMode === 'manual'
                          ? 'bg-emerald-600 text-white'
                          : 'text-emerald-700 hover:underline'
                      }`}
                    >
                      기본형
                    </button>
                  </div>
                </div>
              )}

              <div className="relative min-h-[480px] max-h-[600px] rounded-2xl border border-[var(--color-line)] bg-slate-950 text-slate-200 font-mono text-xs p-5 overflow-auto shadow-inner leading-relaxed">
                <pre className="whitespace-pre-wrap font-mono">{displayedPrompt}</pre>
              </div>
            </div>
          )}

          {/* 탭 2: HTML/CSS 시안 미리보기 */}
          {activeOutputTab === 'preview' && (
            <div className="space-y-3">
              {swarmResult?.htmlPreview ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 p-0.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-xs">
                      <button
                        type="button"
                        onClick={() => setPreviewSubMode('preview')}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                          previewSubMode === 'preview'
                            ? 'bg-[var(--color-surface)] text-[var(--color-ink)] font-bold shadow-xs'
                            : 'text-[var(--color-ink-muted)]'
                        }`}
                      >
                        <Eye className="h-3 w-3" />
                        <span>렌더링 화면</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewSubMode('code')}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                          previewSubMode === 'code'
                            ? 'bg-[var(--color-surface)] text-[var(--color-ink)] font-bold shadow-xs'
                            : 'text-[var(--color-ink-muted)]'
                        }`}
                      >
                        <Code2 className="h-3 w-3" />
                        <span>HTML 코드</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-[var(--color-ink-muted)] font-mono">
                      샌드박스 보안 렌더링 (XSS 격리)
                    </span>
                  </div>

                  {previewSubMode === 'preview' ? (
                    <div className="rounded-2xl border border-[var(--color-line)] overflow-hidden shadow-xs bg-white">
                      <iframe
                        title="HTML 시안 미리보기"
                        sandbox=""
                        srcDoc={swarmResult.htmlPreview}
                        className="w-full min-h-[480px] border-0"
                      />
                    </div>
                  ) : (
                    <div className="min-h-[480px] max-h-[600px] rounded-2xl border border-[var(--color-line)] bg-slate-950 text-slate-200 font-mono text-xs p-5 overflow-auto shadow-inner leading-relaxed">
                      <pre className="whitespace-pre-wrap font-mono">
                        <code>{swarmResult.htmlPreview}</code>
                      </pre>
                    </div>
                  )}
                </>
              ) : (
                <div className="min-h-[460px] rounded-2xl border border-dashed border-[var(--color-line)] p-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[var(--color-ink)]">
                    아직 생성된 HTML/CSS 시안이 없습니다
                  </h4>
                  <p className="text-xs text-[var(--color-ink-muted)] max-w-sm">
                    좌측 하단의 <strong>[3단계 AI 에이전트 스웜 실행]</strong> 버튼을 누르면 카피라이터와 윤리 검증관이 작성한 실제 컴포넌트 시안이 여기에 렌더링됩니다.
                  </p>
                  <Button size="sm" variant="primary" onClick={handleRunSwarm}>
                    스웜 실행하고 시안 생성하기
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* 탭 3: 에이전트 토론 파이프라인 로그 */}
          {activeOutputTab === 'pipeline' && (
            <div className="space-y-3">
              {/* 진행 상태 인디케이터 */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {['architect', 'copywriter', 'ethics-verifier'].map((stageKey) => {
                  const stageInfo = STAGE_LABELS[stageKey]
                  const isCurrent = swarmProgress?.stage === stageKey
                  const isDone =
                    swarmResult ||
                    activeTranscript.some((t) => t.stage === stageKey && t !== swarmProgress)
                  return (
                    <div
                      key={stageKey}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-600'
                          : isDone
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
                            : 'border-[var(--color-line)] opacity-60 text-[var(--color-ink-muted)]'
                      }`}
                    >
                      <p className="font-bold text-[12px]">{stageInfo.name}</p>
                      <p className="text-[10px] opacity-80 truncate">{stageInfo.desc}</p>
                    </div>
                  )
                })}
              </div>

              {activeTranscript.length > 0 ? (
                <div className="space-y-3 min-h-[420px] max-h-[580px] overflow-auto pr-1">
                  {activeTranscript.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-600" />
                          <span className="font-bold text-xs text-[var(--color-ink)]">
                            {item.agentName}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            {STAGE_LABELS[item.stage]?.name || item.stage}
                          </span>
                        </div>
                        {item.targetAgentId && (
                          <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                            → @{item.targetAgentId}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[var(--color-ink)] leading-relaxed pl-3 border-l-2 border-indigo-400/40">
                        {renderMessageWithMentions(item.message)}
                      </div>

                      {item.citedEffectCodes && item.citedEffectCodes.length > 0 && (
                        <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="text-[10px] font-semibold text-[var(--color-ink-muted)]">
                            인용 원리:
                          </span>
                          {item.citedEffectCodes.map((code) => {
                            const eff = effectsData.find((e) => e.code === code)
                            return (
                              <Link
                                key={code}
                                to={`/effect/${code}`}
                                className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-300 text-[11px] hover:underline"
                              >
                                <span>#{code} {eff?.nameKo}</span>
                                <ExternalLink className="h-2.5 w-2.5" />
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-h-[420px] rounded-2xl border border-dashed border-[var(--color-line)] p-8 flex flex-col items-center justify-center text-center space-y-2 text-xs text-[var(--color-ink-muted)]">
                  <p>스웜을 실행하면 3인의 전문 에이전트가 나눈 실시간 토론이 여기에 기록됩니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 탭 4: 윤리·WCAG 검증 체크리스트 */}
          {activeOutputTab === 'checks' && (
            <div className="space-y-4">
              {swarmResult?.checks && swarmResult.checks.length > 0 ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>자동화 윤리 및 WCAG 2.2 AA 감사 결과</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      {passedChecksCount} / {totalChecksCount} 항목 충족
                    </span>
                  </div>

                  <div className="space-y-2">
                    {swarmResult.checks.map((check, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
                          check.passed
                            ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/20'
                            : 'border-amber-300 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20'
                        }`}
                      >
                        <span className="mt-0.5 shrink-0">
                          {check.passed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          )}
                        </span>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-[var(--color-ink)]">{check.label}</h5>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                check.passed
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                            >
                              {check.passed ? '통과 (Pass)' : '권고 (Caution)'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--color-ink-muted)] leading-relaxed">
                            {check.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="min-h-[460px] rounded-2xl border border-dashed border-[var(--color-line)] p-8 flex flex-col items-center justify-center text-center space-y-2 text-xs text-[var(--color-ink-muted)]">
                  <ShieldCheck className="h-8 w-8 text-slate-400 mb-1" />
                  <p>스웜을 실행하면 Ethics-Verifier가 자동 검증한 4~5개 항목 체크리스트가 여기에 표시됩니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Toast
        isOpen={Boolean(toastMsg)}
        message={toastMsg}
        onClose={() => setToastMsg('')}
      />
    </div>
  )
}
