import { useState } from 'react'
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 상대 휘도(Relative Luminance) 계산 (WCAG 2.2 공식)
 */
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * HEX to RGB
 */
function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ]
  }
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ]
}

/**
 * 명도 대비율 계산
 */
function getContrastRatio(hex1, hex2) {
  try {
    const [r1, g1, b1] = hexToRgb(hex1)
    const [r2, g2, b2] = hexToRgb(hex2)
    const l1 = getLuminance(r1, g1, b1)
    const l2 = getLuminance(r2, g2, b2)
    const brighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (brighter + 0.05) / (darker + 0.05)
  } catch {
    return 1
  }
}

/**
 * 색상 및 대비 접근성 실험실 (ColorLab)
 */
export function ColorLab({
  title = "명도 대비 및 색각 다양성 실험실",
  initialText = "#1e293b",
  initialBg = "#f8fafc",
  explanation = "WCAG 2.2 AA 기준 일반 텍스트는 최소 4.5:1 이상, 대형 텍스트(18pt 이상)는 3.0:1 이상의 명도 대비를 갖추어야 모든 사용자가 명확히 판독할 수 있습니다.",
}) {
  const [textColor, setTextColor] = useState(initialText)
  const [bgColor, setBgColor] = useState(initialBg)
  const [visionFilter, setVisionFilter] = useState('normal') // 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'

  const ratio = getContrastRatio(textColor, bgColor)
  const isAANormal = ratio >= 4.5
  const isAALarge = ratio >= 3.0
  const isAAA = ratio >= 7.0

  const handleReset = () => {
    setTextColor(initialText)
    setBgColor(initialBg)
    setVisionFilter('normal')
  }

  // 필터별 SVG 매트릭스
  const filterStyles = {
    normal: '',
    protanopia: 'grayscale-[50%] contrast-[110%] hue-rotate-15',
    deuteranopia: 'sepia-[40%] hue-rotate-60 contrast-90',
    tritanopia: 'hue-rotate-180 contrast-95',
  }

  return (
    <DemoFrame
      title={title}
      subtitle="텍스트와 배경색을 변경하며 WCAG 대비율과 색각 이상 시뮬레이션을 확인하세요."
      onReset={handleReset}
      footer={<p className="text-slate-600 dark:text-slate-400 leading-relaxed">{explanation}</p>}
    >
      <div className="w-full max-w-lg flex flex-col gap-5">
        {/* 색상 선택기 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>글자색 (Foreground)</span>
              <span className="font-mono text-slate-500">{textColor}</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer bg-white dark:bg-slate-800 p-1"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>배경색 (Background)</span>
              <span className="font-mono text-slate-500">{bgColor}</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer bg-white dark:bg-slate-800 p-1"
              />
            </div>
          </div>
        </div>

        {/* 색각 이상 시뮬레이터 탭 */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500">색각 유형 시뮬레이션:</span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: 'normal', label: '일반 시각' },
              { id: 'protanopia', label: '제1색각 (적색맹)' },
              { id: 'deuteranopia', label: '제2색각 (녹색맹)' },
              { id: 'tritanopia', label: '제3색각 (청색맹)' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVisionFilter(v.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  visionFilter === v.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* 라이브 미리보기 박스 */}
        <div
          className={`w-full min-h-[140px] rounded-xl p-6 flex flex-col justify-center items-center gap-2 text-center shadow-md transition-all ${filterStyles[visionFilter]}`}
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <p className="text-xl font-bold tracking-tight">
            학교 알림: 3학년 영어 수업 장소 변경 안내
          </p>
          <p className="text-sm opacity-90 max-w-sm">
            오늘 5교시 영어 수업은 어학실(본관 3층)에서 진행됩니다. 태블릿을 지참하세요.
          </p>
        </div>

        {/* 대비율 및 WCAG 판정 배지 */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">명도 대비율</span>
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
              {ratio.toFixed(2)} : 1
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div
              className={`p-2 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 ${
                isAANormal
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                  : 'border-rose-300 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'
              }`}
            >
              <span>WCAG AA (일반)</span>
              <span className="flex items-center gap-0.5">
                {isAANormal ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                {isAANormal ? '합격 (≥4.5)' : '기준 미달'}
              </span>
            </div>

            <div
              className={`p-2 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 ${
                isAALarge
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                  : 'border-rose-300 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'
              }`}
            >
              <span>WCAG AA (대형)</span>
              <span className="flex items-center gap-0.5">
                {isAALarge ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                {isAALarge ? '합격 (≥3.0)' : '기준 미달'}
              </span>
            </div>

            <div
              className={`p-2 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 ${
                isAAA
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300'
                  : 'border-slate-200 bg-slate-50 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
              }`}
            >
              <span>WCAG AAA (최고)</span>
              <span className="flex items-center gap-0.5">
                {isAAA ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                {isAAA ? '합격 (≥7.0)' : '선택 권장'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  )
}
