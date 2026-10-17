import { useState } from 'react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 058: 오펠-쿤트 착시 (Oppel-Kundt Illusion)
 */
export function OppelKundt() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="058: 오펠-쿤트 착시 (Oppel-Kundt)"
      subtitle="중간에 분할 요소(눈금)가 많은 영역이 텅 빈 영역보다 훨씬 길어 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="공간 분할(Segmentation) 효과로 인해 눈금이 촘촘한 좌측 구간이 텅 빈 우측 구간보다 10~20%가량 더 길게 인지됩니다. 실제로는 둘 다 정확히 120px입니다."
    >
      <svg viewBox="0 0 320 140" className="w-full max-w-sm h-36 select-none">
        {/* 기준 수평선 */}
        <line x1="30" y1="70" x2="290" y2="70" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />

        {/* 시작, 중간, 끝 수직 구분선 */}
        <line x1="30" y1="45" x2="30" y2="95" stroke="#ef4444" strokeWidth="4" />
        <line x1="160" y1="45" x2="160" y2="95" stroke="#ef4444" strokeWidth="4" />
        <line x1="290" y1="45" x2="290" y2="95" stroke="#ef4444" strokeWidth="4" />

        {/* 좌측 구간에만 촘촘한 눈금 (분할) */}
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 30 + (i + 1) * 13
          return (
            <line key={i} x1={x} y1="58" x2={x} y2="82" stroke="currentColor" strokeWidth="2" className="text-slate-500" />
          )
        })}

        {/* 우측 구간은 빈 영역 */}

        {revealed && (
          <g className="text-indigo-600 dark:text-indigo-400 animate-fade-in">
            <text x="95" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
              구간 A: 130px
            </text>
            <text x="225" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
              구간 B: 130px
            </text>
            <path d="M 30,110 L 160,110 M 160,110 L 290,110" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <text x="160" y="128" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="semibold">
              실제 물리적 거리 100% 동일
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 059: 포겐도르프 착시 (Poggendorff Illusion)
 */
export function Poggendorff() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="059: 포겐도르프 착시 (Poggendorff)"
      subtitle="중앙의 불투명한 기둥에 가려진 대각선이 서로 어긋나 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="뇌는 가로막는 수직 기둥의 폭을 실제보다 좁게 오판하여, 좌측 하단의 빨간 선이 우측 상단의 다른 선(보라색)과 연결된 것처럼 착각하게 만듭니다."
    >
      <svg viewBox="0 0 300 200" className="w-full max-w-sm h-52 select-none">
        {/* 좌측 진입 대각선 */}
        <line x1="40" y1="170" x2="110" y2="100" stroke="#ef4444" strokeWidth="4" />

        {/* 우측 착각 유발선 (위쪽으로 빗나간 선) */}
        <line x1="190" y1="70" x2="260" y2="0" stroke="#8b5cf6" strokeWidth="4" />

        {/* 우측 진짜 연속선 */}
        <line x1="190" y1="20" x2="260" y2="-50" stroke="#ef4444" strokeWidth="4" />

        {/* 중앙 불투명 기둥 */}
        <rect x="110" y="10" width="80" height="180" className="fill-slate-200 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" />

        {revealed && (
          <g className="animate-fade-in">
            {/* 관통 점선 */}
            <line x1="110" y1="100" x2="190" y2="20" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="150" y="115" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
              진짜 연속선 연결 경로
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 060: 졸너 착시 (Zöllner Illusion)
 */
export function Zollner() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="060: 졸너 착시 (Zöllner)"
      subtitle="짧은 빗금이 교차된 긴 평행선들이 서로 어긋나게 기울어져 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="교차하는 짧은 빗금 각도(예각)를 뇌가 둔각 쪽으로 과장하여 해석하기 때문에, 평행선들이 번갈아 벌어지고 좁아지는 것처럼 보입니다."
    >
      <svg viewBox="0 0 320 200" className="w-full max-w-sm h-52 select-none">
        {/* 4개의 긴 주 평행선 */}
        {[50, 100, 150].map((y, idx) => {
          const isEven = idx % 2 === 0
          return (
            <g key={y}>
              <line x1="30" y1={y} x2="290" y2={y} stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />
              {/* 짧은 사선 빗금들 */}
              {Array.from({ length: 14 }).map((_, i) => {
                const x = 45 + i * 18
                const dx = isEven ? 10 : -10
                return (
                  <line
                    key={i}
                    x1={x - dx}
                    y1={y - 14}
                    x2={x + dx}
                    y2={y + 14}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-600 dark:text-slate-400"
                  />
                )
              })}
            </g>
          )
        })}

        {revealed && (
          <g className="text-rose-500 animate-fade-in">
            {/* 정밀 수직 보조선 격자 */}
            {[70, 160, 250].map((x) => (
              <line key={x} x1={x} y1="30" x2={x} y2="170" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            ))}
            <text x="160" y="25" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">
              3개 직선의 각도: 0도 (완벽한 수평 평행선)
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 061: 카니차 삼각형 (Kanizsa Triangle)
 */
export function KanizsaTriangle() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="061: 카니차 삼각형 (Kanizsa Triangle)"
      subtitle="물리적 경계선이 전혀 없는데도 중앙에 선명하고 밝은 역삼각형이 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="게슈탈트 폐쇄성(Closure)과 가상 윤곽선(Illusory Contours) 효과로 인해, 뇌가 3개의 팩맨과 V자 꺾쇠의 빈틈을 이어 하나의 독립된 밝은 삼각형으로 완성합니다."
    >
      <svg viewBox="0 0 300 240" className="w-full max-w-sm h-60 select-none">
        {/* 외곽 3개 팩맨 (검은 원에서 60도 부채꼴 잘라냄) */}
        {/* 팩맨 1: 상단 */}
        <path d="M 150,45 L 175,70 A 25,25 0 1,1 125,70 Z" fill="currentColor" className="text-slate-900 dark:text-slate-200" />
        {/* 팩맨 2: 좌하단 */}
        <path d="M 70,185 L 105,185 A 25,25 0 1,1 88,155 Z" fill="currentColor" className="text-slate-900 dark:text-slate-200" />
        {/* 팩맨 3: 우하단 */}
        <path d="M 230,185 L 212,155 A 25,25 0 1,1 195,185 Z" fill="currentColor" className="text-slate-900 dark:text-slate-200" />

        {/* 외곽 3개의 얇은 정삼각형 꺾쇠 (테두리) */}
        <path d="M 150,195 L 70,55 L 230,55 Z" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-600 dark:text-slate-400" />

        {/* 보조선 켰을 때 실제 가상 역삼각형 테두리 드러내기 */}
        {revealed && (
          <polygon
            points="150,45 70,185 230,185"
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
 * 062: 화이트 착시 (White's Illusion)
 */
export function WhiteIllusion() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="062: 화이트 착시 (White's Illusion)"
      subtitle="검은 줄무늬 위에 놓인 회색 막대가 흰 줄무늬 위의 막대보다 훨씬 밝아 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="동시 대비(Simultaneous Contrast)로는 설명되지 않고, T-접합부와 깊이 계층화(Depth Layering)에 의해 뇌가 인접 배경색과 명도를 동화시켜 지각합니다."
    >
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 300 200" className="w-full max-w-sm h-52 select-none border border-slate-300 dark:border-slate-700">
          {/* 흑백 가로 줄무늬 */}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={i * 20}
              width="300"
              height="20"
              fill={i % 2 === 0 ? '#111827' : '#ffffff'}
            />
          ))}

          {/* 좌측 회색 바들 (검은 줄무늬 영역에 배치 -> 더 밝아 보임) */}
          {[20, 60, 100, 140].map((y) => (
            <rect key={`left-${y}`} x="50" y={y} width="50" height="20" fill="#888888" />
          ))}

          {/* 우측 회색 바들 (흰 줄무늬 영역에 배치 -> 더 어두워 보임) */}
          {[40, 80, 120, 160].map((y) => (
            <rect key={`right-${y}`} x="190" y={y} width="50" height="20" fill="#888888" />
          ))}

          {revealed && (
            <g className="animate-fade-in">
              {/* 두 회색 바를 직접 잇는 연결 다리 */}
              <rect x="100" y="60" width="90" height="20" fill="#888888" stroke="#ef4444" strokeWidth="2" />
              <text x="145" y="52" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
                동일한 #888888 브릿지 연결
              </text>
            </g>
          )}
        </svg>
      </div>
    </DemoFrame>
  )
}
