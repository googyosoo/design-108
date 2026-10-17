import { useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import { Button } from '../../ui/Button.jsx'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 073: 운동 잔상 착시 (Motion Aftereffect / Waterfall Illusion)
 */
export function MotionAftereffect() {
  const [isRunning, setIsRunning] = useState(false)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    let animId
    if (isRunning) {
      const step = () => {
        setOffsetY((prev) => (prev + 3) % 40)
        animId = requestAnimationFrame(step)
      }
      animId = requestAnimationFrame(step)
    }
    return () => cancelAnimationFrame(animId)
  }, [isRunning])

  return (
    <DemoFrame
      title="073: 운동 잔상 착시 (Motion Aftereffect)"
      subtitle="아래로 흐르는 패턴을 10초간 응시한 뒤 정지하면 반대 방향(위쪽)으로 움직이는 잔상이 느껴집니다."
      onReset={() => {
        setIsRunning(false)
        setOffsetY(0)
      }}
      footer="운동 감지 신경세포의 순응(Adaptation) 현상입니다. 하향 운동을 감지하는 뉴런들이 피로해지면, 정지 화면을 볼 때 상향 운동 감지 뉴런의 상대적 자발 발화가 우세해져 역방향 움직임이 유발됩니다."
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-64 h-52 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-900 shadow-md">
          <svg viewBox="0 0 250 200" className="w-full h-full select-none">
            {/* 세로로 스크롤되는 가로 줄무늬 */}
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x="0"
                y={-40 + i * 40 + offsetY}
                width="250"
                height="20"
                fill="#38bdf8"
                opacity="0.8"
              />
            ))}

            {/* 중앙 고정 빨간 응시점 */}
            <circle cx="125" cy="100" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        <Button
          size="sm"
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={() => setIsRunning((p) => !p)}
          leftIcon={isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        >
          {isRunning ? '흐름 일시정지 (잔상 확인)' : '움직임 시작 (빨간 점 응시)'}
        </Button>
      </div>
    </DemoFrame>
  )
}

/**
 * 074: 보우타이 원근 대비 착시 (Bowtie Perspective Contrast)
 */
export function BowtieContrast() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="074: 보우타이 대비 착시 (Bowtie Contrast)"
      subtitle="나비넥타이 형태의 사다리꼴 배경 위에 놓인 두 수직선의 폭이 달라 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="배경 형태가 좁아지는 중앙부에 위치한 선이 배경이 넓은 가장자리의 선보다 상대적으로 더 크고 굵게 느껴지는 시각적 맥락 대비 효과입니다."
    >
      <svg viewBox="0 0 320 180" className="w-full max-w-sm h-48 select-none">
        {/* 나비넥타이 배경 실루엣 */}
        <polygon points="30,30 290,30 160,90 290,150 30,150 160,90" className="fill-slate-200 dark:fill-slate-800" />

        {/* 좌측 선 (넓은 영역) */}
        <rect x="70" y="50" width="12" height="80" fill="#3b82f6" rx="2" />

        {/* 중앙 선 (좁은 영역) */}
        <rect x="154" y="50" width="12" height="80" fill="#3b82f6" rx="2" />

        {/* 우측 선 (넓은 영역) */}
        <rect x="238" y="50" width="12" height="80" fill="#3b82f6" rx="2" />

        {revealed && (
          <g className="text-rose-500 animate-fade-in">
            <line x1="70" y1="40" x2="250" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="70" y1="140" x2="250" y2="140" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <text x="160" y="25" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">
              3개 막대 모두 가로 12px, 세로 80px 동일
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 075: 베졸트 색채 동화 착시 (Bezold Assimilation Effect)
 */
export function BezoldAssimilation() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="075: 베졸트 색채 동화 (Bezold Effect)"
      subtitle="완전히 동일한 빨간색 바탕 위에 흰 줄무늬가 있으면 밝게, 검은 줄무늬가 있으면 어둡게 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="색채 대비(Contrast)와 반대로, 공간 주파수가 높고 얇은 선이 교차할 때는 뇌가 색을 분리하지 않고 인접한 선의 명도를 전체 바탕색과 섞어서(동화) 지각합니다."
    >
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 320 180" className="w-full max-w-sm h-48 select-none rounded-xl overflow-hidden shadow-sm">
          {/* 좌측 빨간 바탕 */}
          <rect x="20" y="20" width="130" height="140" fill="#dc2626" />

          {/* 우측 빨간 바탕 (좌측과 완전히 동일한 #dc2626) */}
          <rect x="170" y="20" width="130" height="140" fill="#dc2626" />

          {/* 좌측: 흰 줄무늬 오버레이 (밝아 보임) */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`w-${i}`} x1="20" y1={30 + i * 15} x2="150" y2={30 + i * 15} stroke="#ffffff" strokeWidth="3" />
          ))}

          {/* 우측: 검은 줄무늬 오버레이 (어두워 보임) */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`b-${i}`} x1="170" y1={30 + i * 15} x2="300" y2={30 + i * 15} stroke="#000000" strokeWidth="3" />
          ))}

          {revealed && (
            <g className="animate-fade-in">
              {/* 두 빨간 바탕을 잇는 순수 빨강 연결선 */}
              <rect x="130" y="70" width="60" height="40" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" />
              <text x="160" y="60" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                바탕색 100% #dc2626 일치!
              </text>
            </g>
          )}
        </svg>
      </div>
    </DemoFrame>
  )
}

/**
 * 076: 주관적 등고선 (Subjective Contours)
 */
export function SubjectiveContours() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="076: 주관적 등고선 (Subjective Contours)"
      subtitle="어떠한 외곽선도 그려져 있지 않지만, 곡선들의 정렬로 인해 입체적인 곡면 구가 떠오릅니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="인간의 시각 피질(V2 영역)은 끝점이 정렬된 선들의 불연속면을 통해 실제로는 존재하지 않는 3차원 곡면이나 경계면을 스스로 구축해 냅니다."
    >
      <svg viewBox="0 0 280 220" className="w-full max-w-[280px] h-52 select-none">
        {/* 구형으로 꺾이는 곡선 다발들 */}
        {Array.from({ length: 11 }).map((_, i) => {
          const y = 30 + i * 16
          return (
            <path
              key={i}
              d={`M 30,${y} Q 140,${y + (i < 5 ? -25 : 25)} 250,${y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-slate-800 dark:text-slate-200"
            />
          )
        })}

        {revealed && (
          <circle
            cx="140"
            cy="110"
            r="60"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-fade-in"
          />
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 077: 가상 윤곽선 및 완성 지각 (Illusory Contours & Completion)
 */
export function IllusionContours() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="077: 가상 윤곽선 (Illusory Contours)"
      subtitle="방사형 선들의 불연속 경계면이 중앙에 보이지 않는 별 모양을 만들어냅니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="게슈탈트의 좋은 형태(Good Form) 원리에 의해, 뇌는 결손된 기하학적 정보를 가장 단순하고 안정적인 대칭 도형으로 즉각 보충하여 인식합니다."
    >
      <svg viewBox="0 0 280 220" className="w-full max-w-[280px] h-52 select-none">
        {/* 16개의 방사선들이 중앙 별 모양에서 딱 끊어짐 */}
        {Array.from({ length: 16 }).map((_, i) => {
          const rad = (i * 22.5 * Math.PI) / 180
          const innerR = i % 2 === 0 ? 55 : 30
          return (
            <line
              key={i}
              x1={140 + Math.cos(rad) * innerR}
              y1={110 + Math.sin(rad) * innerR}
              x2={140 + Math.cos(rad) * 105}
              y2={110 + Math.sin(rad) * 105}
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-700 dark:text-slate-300"
            />
          )
        })}

        {revealed && (
          <polygon
            points={Array.from({ length: 16 })
              .map((_, i) => {
                const rad = (i * 22.5 * Math.PI) / 180
                const innerR = i % 2 === 0 ? 55 : 30
                return `${140 + Math.cos(rad) * innerR},${110 + Math.sin(rad) * innerR}`
              })
              .join(' ')}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="3 3"
            className="animate-fade-in"
          />
        )}
      </svg>
    </DemoFrame>
  )
}
