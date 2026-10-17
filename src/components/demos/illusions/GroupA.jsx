import { useState } from 'react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 053: 뮐러-리어 착시 (Müller-Lyer Illusion)
 */
export function MullerLyer() {
  const [revealed, setRevealed] = useState(false)
  const [lineWidth, setLineWidth] = useState(160)

  return (
    <DemoFrame
      title="053: 뮐러-리어 착시 (Müller-Lyer)"
      subtitle="화살표 깃의 방향에 따라 두 수평선의 길이가 완전히 달라 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((prev) => !prev)}
      onReset={() => {
        setRevealed(false)
        setLineWidth(160)
      }}
      footer="화살표 깃이 바깥으로 향한 선(아래)이 안쪽으로 향한 선(위)보다 훨씬 길어 보이지만, 보조선을 켜면 실제 수평선의 길이는 완전히 동일(160px)합니다."
    >
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 340 180" className="w-full max-w-sm h-48 select-none">
          {/* 상단: 깃이 안쪽으로 (축소 지각) */}
          <g transform="translate(170, 50)">
            <line x1={-lineWidth / 2} y1="0" x2={lineWidth / 2} y2="0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={-lineWidth / 2} y1="0" x2={-lineWidth / 2 + 25} y2="-25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={-lineWidth / 2} y1="0" x2={-lineWidth / 2 + 25} y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={lineWidth / 2} y1="0" x2={lineWidth / 2 - 25} y2="-25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={lineWidth / 2} y1="0" x2={lineWidth / 2 - 25} y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
          </g>

          {/* 하단: 깃이 바깥으로 (확장 지각) */}
          <g transform="translate(170, 130)">
            <line x1={-lineWidth / 2} y1="0" x2={lineWidth / 2} y2="0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={-lineWidth / 2} y1="0" x2={-lineWidth / 2 - 25} y2="-25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={-lineWidth / 2} y1="0" x2={-lineWidth / 2 - 25} y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={lineWidth / 2} y1="0" x2={lineWidth / 2 + 25} y2="-25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
            <line x1={lineWidth / 2} y1="0" x2={lineWidth / 2 + 25} y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800 dark:text-slate-100" />
          </g>

          {/* 보조 정렬 가이드선 */}
          {revealed && (
            <g className="text-rose-500 animate-fade-in">
              <line x1={170 - lineWidth / 2} y1="20" x2={170 - lineWidth / 2} y2="160" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <line x1={170 + lineWidth / 2} y1="20" x2={170 + lineWidth / 2} y2="160" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <text x="170" y="95" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
                두 직선의 실제 길이: {lineWidth}px 일치!
              </text>
            </g>
          )}
        </svg>

        <div className="w-full max-w-xs flex items-center gap-3">
          <span className="text-xs text-slate-500">선 길이:</span>
          <input
            type="range"
            min="100"
            max="220"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg accent-indigo-600"
            aria-label="선 길이 조절"
          />
        </div>
      </div>
    </DemoFrame>
  )
}

/**
 * 054: 폰조 착시 (Ponzo Illusion)
 */
export function Ponzo() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="054: 폰조 착시 (Ponzo)"
      subtitle="원근감을 유도하는 수렴 선으로 인해 먼 곳의 선이 더 길어 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="수렴하는 철길 원근 단서 때문에 뇌는 위쪽 막대를 '더 멀리 있는 큰 물체'로 보정 지각합니다. 실제 두 노란 막대의 길이는 정확히 100px로 동일합니다."
    >
      <svg viewBox="0 0 300 240" className="w-full max-w-sm h-56 select-none">
        {/* 수렴하는 사다리꼴 철길 */}
        <line x1="80" y1="220" x2="135" y2="20" stroke="currentColor" strokeWidth="3" className="text-slate-400 dark:text-slate-600" />
        <line x1="220" y1="220" x2="165" y2="20" stroke="currentColor" strokeWidth="3" className="text-slate-400 dark:text-slate-600" />

        {/* 침목 선들 */}
        {[50, 85, 120, 155, 190].map((y) => {
          const w = 55 + (y - 20) * 0.42
          return (
            <line
              key={y}
              x1={150 - w / 2}
              y1={y}
              x2={150 + w / 2}
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              className="text-slate-300 dark:text-slate-700"
            />
          )
        })}

        {/* 위쪽 막대 */}
        <line x1="100" y1="65" x2="200" y2="65" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />

        {/* 아래쪽 막대 */}
        <line x1="100" y1="180" x2="200" y2="180" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />

        {/* 보조 정렬선 */}
        {revealed && (
          <g className="text-rose-500 animate-fade-in">
            <line x1="100" y1="40" x2="100" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="200" y1="40" x2="200" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <text x="150" y="125" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
              두 막대의 길이: 100px 일치!
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 055: 에빙하우스 착시 (Ebbinghaus Illusion)
 */
export function Ebbinghaus() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="055: 에빙하우스 착시 (Ebbinghaus)"
      subtitle="주변을 둘러싼 맥락 원들의 크기에 따라 중앙 원의 크기가 왜곡됩니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="거대한 원들 사이에 놓인 주황색 원(좌측)은 왜소해 보이고, 작은 원들 사이에 놓인 원(우측)은 커 보입니다. 실제 중앙 주황색 원의 지름은 정확히 36px로 같습니다."
    >
      <svg viewBox="0 0 340 200" className="w-full max-w-sm h-52 select-none">
        {/* 좌측: 큰 원들에 둘러싸임 */}
        <g transform="translate(90, 100)">
          {/* 큰 둘레 원 6개 */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <circle
                key={deg}
                cx={Math.cos(rad) * 55}
                cy={Math.sin(rad) * 55}
                r="24"
                className="fill-slate-300 dark:fill-slate-700"
              />
            )
          })}
          {/* 중앙 주황 원 */}
          <circle cx="0" cy="0" r="18" fill="#f97316" />
        </g>

        {/* 우측: 작은 원들에 둘러싸임 */}
        <g transform="translate(250, 100)">
          {/* 작은 둘레 원 8개 */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <circle
                key={deg}
                cx={Math.cos(rad) * 35}
                cy={Math.sin(rad) * 35}
                r="8"
                className="fill-slate-300 dark:fill-slate-700"
              />
            )
          })}
          {/* 중앙 주황 원 */}
          <circle cx="0" cy="0" r="18" fill="#f97316" />
        </g>

        {/* 보조 비교선 */}
        {revealed && (
          <g className="text-rose-500 animate-fade-in">
            <line x1="90" y1="82" x2="250" y2="82" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="90" y1="118" x2="250" y2="118" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <text x="170" y="104" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
              지름 36px 완벽 일치!
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 056: 헤링 착시 (Hering Illusion)
 */
export function Hering() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="056: 헤링 착시 (Hering)"
      subtitle="방사선 패턴 위에 놓인 두 평행선이 바깥으로 불룩하게 휘어 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="중앙에서 사방으로 뻗어 나가는 방사형 살들 때문에 뇌가 각도를 과장하여 지각합니다. 보조선(빨간 격자)을 켜면 두 수직선은 완전히 곧은 평행선입니다."
    >
      <svg viewBox="0 0 300 220" className="w-full max-w-sm h-56 select-none">
        {/* 방사선들 */}
        <g stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700">
          {Array.from({ length: 36 }).map((_, i) => {
            const rad = (i * 10 * Math.PI) / 180
            return (
              <line
                key={i}
                x1="150"
                y1="110"
                x2={150 + Math.cos(rad) * 160}
                y2={110 + Math.sin(rad) * 160}
              />
            )
          })}
        </g>

        {/* 두 평행 수직선 */}
        <line x1="105" y1="15" x2="105" y2="205" stroke="#ef4444" strokeWidth="4" />
        <line x1="195" y1="15" x2="195" y2="205" stroke="#ef4444" strokeWidth="4" />

        {revealed && (
          <g className="text-indigo-600 dark:text-indigo-400 animate-fade-in">
            {/* 평행 검증 격자선 */}
            {[40, 75, 110, 145, 180].map((y) => (
              <line key={y} x1="70" y1={y} x2="230" y2={y} stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            ))}
            <text x="150" y="25" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">
              두 직선 간격: 90px 평행 유지
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 057: 분트 착시 (Wundt Illusion)
 */
export function Wundt() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="057: 분트 착시 (Wundt)"
      subtitle="모래시계형 방사선 패턴 위에서 평행선이 안쪽으로 오목하게 좁아 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="헤링 착시와 반대로, 양 끝단에서 모여드는 선들 때문에 두 직선이 안쪽으로 오목해 보이지만 실제로는 완벽한 수직 평행선입니다."
    >
      <svg viewBox="0 0 300 220" className="w-full max-w-sm h-56 select-none">
        {/* 양쪽 모래시계형 방사선 */}
        <g stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700">
          {Array.from({ length: 18 }).map((_, i) => {
            const y = 15 + i * 11
            return (
              <g key={i}>
                <line x1="20" y1={y} x2="280" y2={110} />
                <line x1="280" y1={y} x2="20" y2={110} />
              </g>
            )
          })}
        </g>

        {/* 두 평행 수직선 */}
        <line x1="110" y1="15" x2="110" y2="205" stroke="#ef4444" strokeWidth="4" />
        <line x1="190" y1="15" x2="190" y2="205" stroke="#ef4444" strokeWidth="4" />

        {revealed && (
          <g className="text-indigo-600 dark:text-indigo-400 animate-fade-in">
            <line x1="110" y1="110" x2="190" y2="110" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <text x="150" y="100" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">
              중앙 간격: 정확히 80px 동일
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}
