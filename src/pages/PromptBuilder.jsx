import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Download, Check, RotateCcw, Terminal } from 'lucide-react'
import { Button } from '../components/ui/Button.jsx'
import { Toast } from '../components/ui/Toast.jsx'
import mediaData from '../data/media.json'
import purposesData from '../data/purposes.json'
import effectsData from '../data/effects.json'

export function PromptBuilderPage() {
  const [selectedMedia, setSelectedMedia] = useState(mediaData[0]?.code || 'PRINT_NOTICE')
  const [selectedPurposes, setSelectedPurposes] = useState([purposesData[0]?.code || 'READABILITY'])
  const [selectedEffectIds, setSelectedEffectIds] = useState([12, 19, 8]) // 기본 3개 추천
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    document.title = 'AI 프롬프트 빌더 · DesignMind 108'
    window.scrollTo(0, 0)
  }, [])

  // 목적 토글 핸들러 (최대 2개)
  const togglePurpose = (code) => {
    if (selectedPurposes.includes(code)) {
      if (selectedPurposes.length > 1) {
        setSelectedPurposes(selectedPurposes.filter((p) => p !== code))
      }
    } else {
      if (selectedPurposes.length >= 2) {
        setSelectedPurposes([selectedPurposes[1], code])
      } else {
        setSelectedPurposes([...selectedPurposes, code])
      }
    }
  }

  // 원리 토글 핸들러 (최대 5개)
  const toggleEffect = (id) => {
    if (selectedEffectIds.includes(id)) {
      setSelectedEffectIds(selectedEffectIds.filter((eId) => eId !== id))
    } else {
      if (selectedEffectIds.length >= 5) {
        setToastMsg('원리는 최대 5개까지 선택할 수 있습니다.')
      } else {
        setSelectedEffectIds([...selectedEffectIds, id])
      }
    }
  }

  const currentMedia = mediaData.find((m) => m.code === selectedMedia)
  const currentPurposes = purposesData.filter((p) => selectedPurposes.includes(p.code))
  const currentEffects = effectsData.filter((e) => selectedEffectIds.includes(e.id))

  // 추천 원리 목록 도출 (목적이나 매체에 맞는 원리 6선)
  const recommendedEffects = effectsData
    .filter((e) => {
      const matchPurpose = e.purposes?.some((p) => selectedPurposes.includes(p))
      const matchMedia = e.media?.includes(selectedMedia)
      return matchPurpose || matchMedia
    })
    .slice(0, 8)

  // 마크다운 프롬프트 생성 로직
  const generatedPrompt = `# [디자인 지시문] ${currentMedia?.label || '교육용 자료'} 인지 심리 최적화 제작 요청

## 1. 역할 정의 (Role)
당신은 최고 수준의 교육공학 및 UI/UX 인지 심리학 전문가입니다.
사용자(학생, 학부모, 교직원)의 인지 부하를 최소화하고 정보 전달력을 극대화하는 시각적 계층 구조를 설계합니다.

## 2. 제작 매체 및 핵심 목적
- **제작 대상 매체**: ${currentMedia?.label} (${currentMedia?.description || ''})
- **핵심 설계 목적**: ${currentPurposes.map((p) => p.label).join(', ')}

## 3. 반드시 준수할 디자인 심리학 원리 (DesignMind 108)
${currentEffects
  .map(
    (eff) =>
      `### [${eff.code}] ${eff.name_ko} (${eff.name_en})
- **핵심 원리**: ${eff.summary}
- **적용 규칙**: ${eff.why}
- **Do**: ${eff.do}
- **Don't**: ${eff.dont}`
  )
  .join('\n\n')}

## 4. 최종 출력 요구사항
1. 위 디자인 심리학 원리 3가지가 구체적으로 어떻게 레이아웃, 타이포그래피, 여백에 녹아들었는지 단계별로 설명하세요.
2. 실제 복사하여 바로 쓸 수 있는 시각적 텍스트 구성안(또는 HTML/CSS 컴포넌트 코드)을 완성본 형태로 제시하세요.
3. WCAG 2.2 AA 가이드라인(명도 대비 4.5:1 이상) 및 조작 편의성을 자체 점검하는 3개 항목 체크리스트를 첨부하세요.`

  // 클립보드 복사
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(generatedPrompt)
      setToastMsg('프롬프트가 클립보드에 복사되었습니다!')
    } catch {
      setToastMsg('복사 권한이 없어 수동 복사를 이용해 주세요.')
    }
  }

  // 마크다운 파일 다운로드
  const handleDownload = () => {
    try {
      const blob = new Blob([generatedPrompt], { type: 'text/markdown;charset=utf-8' })
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

  const handleReset = () => {
    setSelectedMedia(mediaData[0]?.code || 'PRINT_NOTICE')
    setSelectedPurposes([purposesData[0]?.code || 'READABILITY'])
    setSelectedEffectIds([12, 19, 8])
    setToastMsg('설정이 초기화되었습니다.')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 헤더 */}
      <div className="space-y-3">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          <span>도구 허브</span>
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              AI 디자인 프롬프트 빌더
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              매체와 목적, 108 원리를 조합하여 고품질 AI 지시문과 점검 체크리스트를 자동 조합합니다.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-3.5 w-3.5" />}>
            선택 초기화
          </Button>
        </div>
      </div>

      {/* 3단계 파라미터 빌딩 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 좌측 옵션 선택기 (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1단계: 매체 선택 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px]">1</span>
              <span>제작 대상 매체 선택</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {mediaData.map((m) => (
                <button
                  key={m.code}
                  type="button"
                  onClick={() => setSelectedMedia(m.code)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-colors ${
                    selectedMedia === m.code
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2단계: 목적 선택 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px]">2</span>
                <span>디자인 핵심 목적 (최대 2개)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">{selectedPurposes.length}/2</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {purposesData.map((p) => {
                const isSelected = selectedPurposes.includes(p.code)
                return (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => togglePurpose(p.code)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-2xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3단계: 적용 원리 선택 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px]">3</span>
                <span>적용 심리학 원리 (최대 5개)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">{selectedEffectIds.length}/5</span>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] text-slate-500">매체 및 목적 맞춤 추천 원리:</p>
              <div className="flex flex-wrap gap-1.5">
                {recommendedEffects.map((eff) => {
                  const isSelected = selectedEffectIds.includes(eff.id)
                  return (
                    <button
                      key={eff.id}
                      type="button"
                      onClick={() => toggleEffect(eff.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-mono text-[10px]">{eff.code}</span>
                      <span>{eff.name_ko}</span>
                      {isSelected && <Check className="h-3 w-3 text-emerald-600" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 우측 실시간 생성 마크다운 프롬프트 뷰 (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                생성된 AI 지시문 마크다운
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={handleCopy} leftIcon={<Copy className="h-3.5 w-3.5" />}>
                복사
              </Button>
              <Button size="sm" variant="primary" onClick={handleDownload} leftIcon={<Download className="h-3.5 w-3.5" />}>
                .md 다운로드
              </Button>
            </div>
          </div>

          <div className="relative flex-1 min-h-[460px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs p-5 overflow-auto shadow-inner leading-relaxed">
            <pre className="whitespace-pre-wrap font-mono">{generatedPrompt}</pre>
          </div>
        </div>
      </div>

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  )
}
