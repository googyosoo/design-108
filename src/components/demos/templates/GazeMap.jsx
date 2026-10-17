import { useState, useEffect } from 'react'
import { Play, Eye, Flame } from 'lucide-react'
import { Button } from '../../ui/Button.jsx'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 시선 유도 및 패턴 시뮬레이터 (GazeMap)
 * @param {Object} props
 * @param {string} props.title - 원리 제목
 * @param {'z-pattern' | 'f-pattern' | 'gutenberg'} props.patternType - 시선 패턴 유형
 * @param {string} props.explanation - 하단 해설
 */
export function GazeMap({
  title = "시선 이동 패턴 시뮬레이터",
  patternType = "z-pattern",
  explanation = "사용자의 시선은 무작위로 움직이지 않고, 문화적 읽기 습관과 시각 계층 구조에 따라 예측 가능한 궤적을 그립니다.",
}) {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(false)

  // 패턴별 시선 좌표 정의 (% 단위)
  const patterns = {
    'z-pattern': [
      { id: 1, x: 15, y: 20, label: '① 좌상단 (로고/브랜드)' },
      { id: 2, x: 85, y: 20, label: '② 우상단 (주요 CTA/로그인)' },
      { id: 3, x: 15, y: 80, label: '③ 좌하단 (핵심 혜택/콘텐츠)' },
      { id: 4, x: 85, y: 80, label: '④ 우하단 (최종 전환 버튼)' },
    ],
    'f-pattern': [
      { id: 1, x: 15, y: 20, label: '① 헤드라인 정독 (좌→우)' },
      { id: 2, x: 75, y: 20, label: '② 헤드라인 끝' },
      { id: 3, x: 15, y: 45, label: '③ 중간 소제목 스캔' },
      { id: 4, x: 50, y: 45, label: '④ 소제목 중간 이탈' },
      { id: 5, x: 15, y: 80, label: '⑤ 좌측 수직 훑어보기' },
    ],
    gutenberg: [
      { id: 1, x: 20, y: 20, label: '① 제1 시각 영역 (Primary Optical Area)' },
      { id: 2, x: 80, y: 20, label: '② 강력 휴지 영역 (Strong Fallow Area)' },
      { id: 3, x: 20, y: 80, label: '③ 취약 휴지 영역 (Weak Fallow Area)' },
      { id: 4, x: 80, y: 80, label: '④ 최종 종착 영역 (Terminal Area - 결론/행동)' },
    ],
  }

  const points = patterns[patternType] || patterns['z-pattern']

  useEffect(() => {
    let timer
    if (isPlaying) {
      timer = setTimeout(() => {
        setActiveStep((prev) => {
          const next = prev + 1
          if (next >= points.length) {
            setIsPlaying(false)
          }
          return next
        })
      }, 800)
    }
    return () => clearTimeout(timer)
  }, [isPlaying, points.length])

  const handlePlay = () => {
    setActiveStep(1)
    setIsPlaying(true)
  }

  const handleReset = () => {
    setActiveStep(0)
    setIsPlaying(false)
    setShowHeatmap(false)
  }

  return (
    <DemoFrame
      title={title}
      subtitle="시선 궤적 재생 버튼을 누르거나 히트맵을 켜서 시선 분포를 확인하세요."
      onReset={handleReset}
      footer={<p className="text-slate-600 dark:text-slate-400 leading-relaxed">{explanation}</p>}
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-4">
        {/* 제어 툴바 */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={handlePlay}
            disabled={isPlaying}
            leftIcon={<Play className="h-3.5 w-3.5" />}
          >
            {isPlaying ? '시선 추적 중...' : '시선 궤적 재생'}
          </Button>

          <Button
            size="sm"
            variant={showHeatmap ? 'primary' : 'secondary'}
            onClick={() => setShowHeatmap((prev) => !prev)}
            leftIcon={showHeatmap ? <Eye className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
          >
            {showHeatmap ? '히트맵 끄기' : '히트맵 보기'}
          </Button>
        </div>

        {/* 시뮬레이션 웹페이지 프레임 */}
        <div className="relative w-full aspect-[4/3] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md overflow-hidden select-none">
          {/* 가상 웹페이지 와이어프레임 구조 */}
          <div className="p-4 h-full flex flex-col justify-between opacity-30">
            <div className="flex justify-between items-center pb-2 border-b border-slate-300 dark:border-slate-700">
              <div className="h-4 w-20 rounded bg-slate-400" />
              <div className="flex gap-2">
                <div className="h-4 w-12 rounded bg-slate-300" />
                <div className="h-4 w-16 rounded bg-slate-400" />
              </div>
            </div>
            <div className="space-y-2 py-4">
              <div className="h-6 w-3/4 rounded bg-slate-400" />
              <div className="h-3 w-full rounded bg-slate-300" />
              <div className="h-3 w-5/6 rounded bg-slate-300" />
              <div className="h-3 w-2/3 rounded bg-slate-300" />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <div className="h-4 w-28 rounded bg-slate-300" />
              <div className="h-7 w-24 rounded bg-slate-500" />
            </div>
          </div>

          {/* 히트맵 오버레이 */}
          {showHeatmap && (
            <div className="absolute inset-0 pointer-events-none">
              {points.map((pt) => (
                <div
                  key={`heat-${pt.id}`}
                  className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl animate-pulse"
                  style={{
                    left: `${pt.x}%`,
                    top: `${pt.y}%`,
                    width: pt.id === 1 ? '140px' : '90px',
                    height: pt.id === 1 ? '140px' : '90px',
                    background:
                      pt.id === 1
                        ? 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(249, 115, 22, 0.4) 50%, transparent 80%)'
                        : 'radial-gradient(circle, rgba(249, 115, 22, 0.7) 0%, rgba(234, 179, 8, 0.3) 50%, transparent 80%)',
                  }}
                />
              ))}
            </div>
          )}

          {/* 시선 궤적 SVG 연결선 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {points.map((pt, idx) => {
              if (idx === 0) return null
              const prevPt = points[idx - 1]
              const isVisible = activeStep > idx
              return (
                <line
                  key={`line-${pt.id}`}
                  x1={`${prevPt.x}%`}
                  y1={`${prevPt.y}%`}
                  x2={`${pt.x}%`}
                  y2={`${pt.y}%`}
                  stroke="rgba(99, 102, 241, 0.8)"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                />
              )
            })}
          </svg>

          {/* 시선 스팟 포인트 */}
          {points.map((pt, idx) => {
            const isVisible = activeStep > idx || activeStep === 0
            const isCurrent = activeStep === idx + 1
            return (
              <div
                key={`spot-${pt.id}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-20 scale-75'
                }`}
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-lg transition-transform ${
                    isCurrent
                      ? 'bg-rose-500 text-white ring-4 ring-rose-200 dark:ring-rose-900/60 scale-125'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {pt.id}
                </div>
              </div>
            )
          })}
        </div>

        {/* 현재 스팟 안내 캡션 */}
        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium h-5">
          {activeStep > 0 && points[activeStep - 1]
            ? points[activeStep - 1].label
            : '시선 경로를 재생하여 사용자들의 읽기 순서를 확인해 보세요.'}
        </div>
      </div>
    </DemoFrame>
  )
}
