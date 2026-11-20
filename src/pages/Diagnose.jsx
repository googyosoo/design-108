import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  ExternalLink,
  RotateCcw,
  Key,
  ShieldCheck,
  Sparkles,
  Layers,
} from 'lucide-react'
import { Button } from '../components/ui/Button.jsx'
import { Toast } from '../components/ui/Toast.jsx'
import { compressImage } from '../lib/compressImage.js'
import { runDiagnosticSwarm, DIAGNOSTIC_PRESETS } from '../lib/diagnoseDesign.js'
import { SWARM_AGENTS } from '../lib/swarmSimulator.js'
import { SwarmCritiqueBoard } from '../components/diagnose/SwarmCritiqueBoard.jsx'
import checklistData from '../data/checklist.json'

// 기본 문서 프리셋 목록 (DIAGNOSTIC_PRESETS fallback용)
const FALLBACK_PRESETS = [
  { id: 'general', label: '일반 디자인', description: '범용 교육 자료, 인포그래픽, 카드뉴스' },
  { id: 'school-notice', label: '학교 가정통신문', description: 'A4 세로 인쇄 및 학부모 알림장 안내문' },
  { id: 'poster', label: '교내 행사 포스터', description: '축제, 대회, 동아리 모집 홍보 포스터' },
  { id: 'slide', label: '수업 발표 슬라이드', description: '16:9 가로형 수업 강의자료 및 발표' },
  { id: 'web-app', label: '교육용 웹앱', description: '학생 인터랙티브 학습 화면 및 모바일 UI' },
]

export function DiagnosePage() {
  const [activeTab, setActiveTab] = useState('ai') // 'ai' | 'manual'
  const [selectedFile, setSelectedFile] = useState(null)
  const [compressedResult, setCompressedResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  // 문서 유형 프리셋 선택 상태 ('general' | 'school-notice' | 'poster' | 'slide' | 'web-app')
  const [selectedPreset, setSelectedPreset] = useState('general')

  // 스웜 실시간 스트리밍 상태
  const [swarmAgentStates, setSwarmAgentStates] = useState({})
  const [swarmTranscript, setSwarmTranscript] = useState([])
  const [swarmProgress, setSwarmProgress] = useState(null)

  // 수동 체크리스트 상태
  const [manualChecks, setManualChecks] = useState({})

  const presets = useMemo(() => {
    return Array.isArray(DIAGNOSTIC_PRESETS) && DIAGNOSTIC_PRESETS.length > 0
      ? DIAGNOSTIC_PRESETS
      : FALLBACK_PRESETS
  }, [])

  const currentPreset = useMemo(() => {
    return presets.find((p) => p.id === selectedPreset) || presets[0]
  }, [presets, selectedPreset])

  useEffect(() => {
    document.title = 'AI 디자인 진단 (Diagnose) · DesignMind 108'
    window.scrollTo(0, 0)
  }, [])

  // 파일 업로드 처리
  const handleFileChange = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setToastMsg('이미지 파일(PNG, JPG, WebP)만 업로드할 수 있습니다.')
      return
    }

    try {
      setSelectedFile(file)
      setAnalysisResult(null)
      setSwarmTranscript([])
      setSwarmAgentStates({})
      setSwarmProgress(null)
      const compressed = await compressImage(file, { maxWidth: 1280, maxHeight: 1280, quality: 0.82 })
      setCompressedResult(compressed)
      setToastMsg(`이미지 압축 완료 (${(compressed.size / 1024).toFixed(1)} KB)`)
    } catch {
      setToastMsg('이미지 처리 중 오류가 발생했습니다.')
    }
  }

  // AI 스웜 진단 실행
  const handleRunDiagnose = async () => {
    if (!compressedResult) return
    setIsAnalyzing(true)
    setAnalysisResult(null)
    setSwarmTranscript([])
    setSwarmAgentStates({
      cognitivist: 'working',
      'visual-critic': 'waiting',
      'ethics-guard': 'waiting',
      'school-advocate': 'waiting',
      verifier: 'waiting',
    })
    setSwarmProgress({
      step: 1,
      totalSteps: 5,
      message: '5인 전문가 스웜이 시안을 분석하기 시작합니다...',
    })

    try {
      const onProgress = (ev) => {
        if (!ev) return
        if (ev.agentStates) {
          setSwarmAgentStates(ev.agentStates)
        }
        if (ev.entry) {
          setSwarmTranscript((prev) => {
            const exists = prev.some((item) => item.id === ev.entry.id)
            if (exists) return prev
            return [...prev, ev.entry]
          })
        }
        setSwarmProgress({
          step: ev.step || 1,
          totalSteps: ev.totalSteps || 5,
          agentId: ev.agentId,
          agentName: ev.agentName,
          role: ev.role,
          stage: ev.stage,
          status: ev.status,
          message: ev.message,
        })
      }

      const result = await runDiagnosticSwarm(
        compressedResult,
        { apiKey, preset: selectedPreset },
        onProgress
      )

      setAnalysisResult(result)
      if (result.swarmTranscript) {
        setSwarmTranscript(result.swarmTranscript)
      }
      setToastMsg('AI 인지 심리 진단과 5인 전문가 교차 비평이 완료되었습니다!')
    } catch {
      setToastMsg('진단 중 오류가 발생하여 기본 진단 결과를 표시합니다.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setCompressedResult(null)
    setAnalysisResult(null)
    setSwarmTranscript([])
    setSwarmAgentStates({})
    setSwarmProgress(null)
  }

  // 결과 복사
  const handleCopyReport = () => {
    if (!analysisResult) return
    const text = `# [DesignMind 108] AI 디자인 인지 심리 진단 리포트
- 문서 유형: ${analysisResult.presetLabel || currentPreset?.label || '일반 디자인'}
- 종합 점수: ${analysisResult.score}점 (${analysisResult.grade})
- 진단 요약: ${analysisResult.summary}

## 3대 핵심 개선 처방전
${analysisResult.findings
  .map(
    (f) => `### ${f.category} (${f.effectName})
- 발견점: ${f.title}
- 진단 내용: ${f.description}
- Do: ${f.prescription.do}
- Don't: ${f.prescription.dont}`
  )
  .join('\n\n')}
${
  analysisResult.consensus?.finalVerdict
    ? `\n## 5인 전문가 스웜 최종 합의\n${analysisResult.consensus.finalVerdict}\n`
    : ''
}
`
    try {
      navigator.clipboard.writeText(text)
      setToastMsg('진단 리포트가 클립보드에 복사되었습니다.')
    } catch {
      setToastMsg('복사 권한이 없어 수동 복사를 이용해 주세요.')
    }
  }

  // 수동 체크리스트 토글
  const toggleManualCheck = (key) => {
    setManualChecks((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // 수동 체크리스트 카테고리별 그룹화
  const groupedChecklist = useMemo(() => {
    if (!Array.isArray(checklistData)) return []
    if (checklistData[0]?.items) {
      return checklistData
    }
    const groups = {}
    checklistData.forEach((item) => {
      const catKey = item.category || '기타'
      if (!groups[catKey]) {
        groups[catKey] = {
          category: item.categoryKo || catKey,
          items: [],
        }
      }
      groups[catKey].items.push(item)
    })
    return Object.values(groups)
  }, [])

  const manualPassedCount = Object.values(manualChecks).filter(Boolean).length
  const totalManualItems = checklistData.length || 20

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI 멀티모달 시각 인지 분석기 & 5인 전문가 스웜</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            AI 디자인 심리 진단 스튜디오
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            학습지, 포스터, 슬라이드, 웹앱 캡처를 올리면 시선 유도, 명도 대비, 정보 밀도를 15초 안에 진단하고 5인 전문가 스웜의 교차 비평과 108 원리 처방전을 제시합니다.
          </p>
        </div>

        {/* 탭 스위치 & API 키 설정 */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center rounded-xl p-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              AI 자동 진단
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('manual')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              수동 20개 점검
            </button>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowApiKeyModal((p) => !p)}
            aria-label="Gemini API 키 설정"
          >
            <span className="inline-flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5" />
              <span>{apiKey ? 'API 키 등록됨' : 'API 키 (선택)'}</span>
            </span>
          </Button>
        </div>
      </div>

      {/* API 키 설정 안내 박스 (열렸을 때) */}
      {showApiKeyModal && (
        <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>Google Gemini API 키 설정 (선택 사항)</span>
            </h4>
            <button
              type="button"
              onClick={() => setShowApiKeyModal(false)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
            >
              닫기
            </button>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            API 키가 없어도 내장된 <strong>지능형 로컬 5인 전문가 스웜 엔진</strong>이 100% 정상 동작합니다. 최신 Gemini 2.5 Flash 멀티모달 정밀 분석을 원하실 경우 개인 API 키를 입력하세요 (브라우저 메모리에만 유지).
          </p>
          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs w-full max-w-sm font-mono"
            />
            <Button size="sm" variant="secondary" onClick={() => setShowApiKeyModal(false)}>
              저장
            </Button>
          </div>
        </div>
      )}

      {/* 1. AI 자동 진단 탭 */}
      {activeTab === 'ai' && (
        <div className="space-y-8">
          {/* 문서 유형 프리셋 선택기 (진단 전 설정) */}
          <div className="space-y-3 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span>문서 유형 프리셋 선택</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  문서 목적과 판형에 맞춤화된 전문 심리학 원리와 비평 가이드라인을 적용합니다.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 self-start sm:self-auto">
                현재 선택: {currentPreset.label}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
              {presets.map((preset) => {
                const isSelected = selectedPreset === preset.id
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPreset(preset.id)}
                    disabled={isAnalyzing}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/60 text-purple-950 dark:text-purple-200 ring-2 ring-purple-600/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold">{preset.label}</span>
                      {isSelected && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                      {preset.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 업로드 드롭존 */}
          {!compressedResult ? (
            <label className="relative flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl bg-slate-50/60 dark:bg-slate-900/40 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors cursor-pointer select-none">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                className="hidden"
              />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 shadow-sm mb-3">
                <UploadCloud className="h-7 w-7" />
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                디자인 시안 이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, WebP 지원 (최대 1280px 자동 압축) · 선택 프리셋: {currentPreset.label}
              </p>
            </label>
          ) : (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 shrink-0 shadow-inner flex items-center justify-center">
                <img
                  src={compressedResult.dataUrl}
                  alt="업로드 시안 미리보기"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    이미지 준비 완료
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                    {currentPreset.label}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {compressedResult.width}×{compressedResult.height}px · {(compressedResult.size / 1024).toFixed(1)}KB
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {selectedFile?.name || '시안 이미지'}
                </h3>
                <p className="text-xs text-slate-500">
                  {apiKey
                    ? 'Gemini 2.5 Flash 멀티모달 & 5인 전문가 스웜 분석 준비'
                    : '지능형 로컬 5인 전문가 스웜 엔진 분석 준비'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <span className="inline-flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>다시 선택</span>
                  </span>
                </Button>
                <Button
                  variant="primary"
                  onClick={handleRunDiagnose}
                  disabled={isAnalyzing}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    <span>{isAnalyzing ? '스웜 교차 비평 중...' : '스웜 디자인 심리 진단 시작'}</span>
                  </span>
                </Button>
              </div>
            </div>
          )}

          {/* 실시간 스웜 분석 진행 뷰 */}
          {isAnalyzing && (
            <div className="space-y-6">
              <SwarmCritiqueBoard
                agents={SWARM_AGENTS}
                agentStates={swarmAgentStates}
                transcript={swarmTranscript}
                consensus={null}
                isAnalyzing={true}
                progress={swarmProgress}
                presetLabel={currentPreset.label}
                onCopyToast={setToastMsg}
              />
            </div>
          )}

          {/* 진단 결과 카드 */}
          {analysisResult && (
            <div className="space-y-8 animate-fade-in">
              {/* 종합 점수 카드 */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-600 text-white font-mono text-3xl font-black shadow-lg">
                    {analysisResult.score}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        종합 등급: {analysisResult.grade}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {analysisResult.presetLabel || currentPreset.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      인공지능 시각 인지 종합 평가
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                      {analysisResult.summary}
                    </p>
                  </div>
                </div>

                <Button variant="secondary" size="sm" onClick={handleCopyReport}>
                  <span className="inline-flex items-center gap-1.5">
                    <Copy className="h-3.5 w-3.5" />
                    <span>리포트 복사</span>
                  </span>
                </Button>
              </div>

              {/* 3대 발견점 및 처방전 카드 그리드 */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  3대 핵심 진단 항목 및 원리 처방전
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analysisResult.findings.map((f) => {
                    const isErr = f.status === 'error'
                    return (
                      <div
                        key={f.id}
                        className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${
                          isErr
                            ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                            : 'border-amber-300 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              {f.category}
                            </span>
                            {isErr ? (
                              <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {f.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {f.description}
                          </p>

                          {/* Do / Don't 처방전 */}
                          <div className="space-y-1.5 pt-2 text-[11px]">
                            <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200">
                              <strong>✓ Do:</strong> {f.prescription.do}
                            </div>
                            <div className="p-2 rounded-lg bg-rose-100/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200">
                              <strong>✕ Don't:</strong> {f.prescription.dont}
                            </div>
                          </div>
                        </div>

                        {/* 연계 원리 링크 */}
                        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            #{f.effectCode} {f.effectName}
                          </span>
                          <Link
                            to={`/effect/${f.effectCode}`}
                            className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                          >
                            <span>도감 보기</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 5인 전문가 스웜 교차 비평 및 합의 보드 (결과 뷰에 영구 보존) */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <SwarmCritiqueBoard
                  agents={SWARM_AGENTS}
                  agentStates={swarmAgentStates}
                  transcript={analysisResult.swarmTranscript || swarmTranscript}
                  consensus={analysisResult.consensus}
                  isAnalyzing={false}
                  progress={null}
                  presetLabel={analysisResult.presetLabel || currentPreset.label}
                  onCopyToast={setToastMsg}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. 수동 체크리스트 탭 */}
      {activeTab === 'manual' && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                디자인 심리학 20대 자가 진단 체크리스트
              </h3>
              <p className="text-xs text-slate-500">
                5개 핵심 영역(시선 흐름, 가독성, 정보 위계, 일관성, 접근성)에 걸친 표준 감사 항목입니다.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-purple-600 dark:text-purple-400">
                {manualPassedCount} / {totalManualItems}
              </span>
              <p className="text-[10px] text-slate-400">충족 기준율: {Math.round((manualPassedCount / totalManualItems) * 100)}%</p>
            </div>
          </div>

          <div className="space-y-6">
            {groupedChecklist.map((section, sIdx) => (
              <div
                key={section.category || sIdx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white text-[11px] font-mono">
                      {sIdx + 1}
                    </span>
                    <span>{section.category || `영역 ${sIdx + 1}`}</span>
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    {section.items?.filter((_, i) => manualChecks[`${sIdx}-${i}`]).length || 0} / {section.items?.length || 4}
                  </span>
                </div>

                <div className="space-y-2">
                  {(section.items || []).map((item, iIdx) => {
                    const key = `${sIdx}-${iIdx}`
                    const isChecked = !!manualChecks[key]
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleManualCheck(key)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isChecked
                            ? 'border-purple-300 bg-purple-50/50 dark:bg-purple-950/30 text-purple-950 dark:text-purple-200'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="mt-0.5">
                          {isChecked ? (
                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                          ) : (
                            <span className="flex h-4 w-4 rounded border border-slate-400" />
                          )}
                        </span>
                        <div className="space-y-0.5 flex-1">
                          <p className="text-xs font-medium leading-relaxed">
                            {item.title || item.text || item}
                          </p>
                          {item.description && (
                            <p className="text-[11px] text-slate-500 leading-normal">
                              {item.description}
                            </p>
                          )}
                          {item.relatedEffectIds && item.relatedEffectIds.length > 0 && (
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[10px] text-slate-400">연계 원리:</span>
                              {item.relatedEffectIds.map((eId) => (
                                <span
                                  key={eId}
                                  className="text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400"
                                >
                                  #{String(eId).padStart(3, '0')}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Toast isOpen={Boolean(toastMsg)} message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  )
}
