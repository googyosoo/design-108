import { useState } from 'react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 063: 헤르만 격자 (Hermann Grid Illusion)
 */
export function HermannGrid() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="063: 헤르만 격자 (Hermann Grid)"
      subtitle="검은 사각형들 사이의 흰 교차로에서 희미한 회색 점 잔상이 반짝입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="망막 신경절 세포의 측억제(Lateral Inhibition)로 인해, 사방이 흰색으로 둘러싸인 교차로가 상하좌우 두 방향만 흰색인 통로보다 더 억제되어 어둡게 지각됩니다."
    >
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 260 260" className="w-full max-w-[260px] h-64 bg-white select-none shadow-md rounded-lg">
          {/* 4x4 검은 사각형 격자 */}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={15 + col * 60}
                y={15 + row * 60}
                width="50"
                height="50"
                fill="#111827"
              />
            ))
          )}

          {revealed && (
            <g className="text-rose-500 animate-fade-in">
              {/* 교차로에 붉은 링 표시하여 실제 흰색(#ffffff)임을 확인 */}
              {[65, 125, 185].map((x) =>
                [65, 125, 185].map((y) => (
                  <circle
                    key={`guide-${x}-${y}`}
                    cx={x + 5}
                    cy={y + 5}
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                ))
              )}
            </g>
          )}
        </svg>
      </div>
    </DemoFrame>
  )
}

/**
 * 064: 마하 밴드 (Mach Bands)
 */
export function MachBands() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="064: 마하 밴드 (Mach Bands)"
      subtitle="명도가 단계별로 변하는 경계면에서 가상의 밝고 어두운 띠(Band)가 도드라집니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="각 막대 내부의 명도는 완전히 균일(Flat)하지만, 인간의 시각 시스템이 경계면의 모서리를 더 뚜렷이 구분하기 위해 경계부 명암 대비를 인위적으로 강조합니다."
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <svg viewBox="0 0 300 160" className="w-full h-40 select-none shadow-sm rounded-lg overflow-hidden">
          {/* 6단계 균일 그레이스케일 바 */}
          {[
            { x: 0, fill: '#1f2937', label: '1단계' },
            { x: 50, fill: '#374151', label: '2단계' },
            { x: 100, fill: '#4b5563', label: '3단계' },
            { x: 150, fill: '#6b7280', label: '4단계' },
            { x: 200, fill: '#9ca3af', label: '5단계' },
            { x: 250, fill: '#d1d5db', label: '6단계' },
          ].map((bar, i) => (
            <rect key={i} x={bar.x} y="0" width="50" height="160" fill={bar.fill} />
          ))}

          {revealed && (
            <g className="text-emerald-400 animate-fade-in">
              {/* 경계선을 가려 단일 색상임을 입증하는 마스크 */}
              <line x1="0" y1="80" x2="300" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
              <text x="150" y="70" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
                각 바의 내부는 100% 균일한 단일 명도
              </text>
            </g>
          )}
        </svg>
      </div>
    </DemoFrame>
  )
}

/**
 * 065: 체커 그림자 착시 (Checker Shadow Illusion - Adelson)
 */
export function CheckerShadow() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="065: 체커 그림자 착시 (Checker Shadow)"
      subtitle="원기둥 그림자 속 타일 B는 밝아 보이고, 바깥 타일 A는 어두워 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="에드워드 아델슨의 유명한 착시입니다. 뇌는 그림자 속 물체가 원래 밝은 색일 것이라고 무의식적으로 보정합니다. 실제 A와 B의 물리적 픽셀 RGB는 #787878로 100% 동일합니다."
    >
      <svg viewBox="0 0 320 220" className="w-full max-w-sm h-56 select-none">
        {/* 체커보드 평면 */}
        <g transform="skewX(-20) translate(60, 20)">
          {/* 타일 격자 3x3 */}
          <rect x="0" y="0" width="60" height="50" fill="#787878" /> {/* A 타일 */}
          <rect x="60" y="0" width="60" height="50" fill="#ffffff" />
          <rect x="120" y="0" width="60" height="50" fill="#787878" />

          <rect x="0" y="50" width="60" height="50" fill="#ffffff" />
          <rect x="60" y="50" width="60" height="50" fill="#787878" /> {/* B 타일 (그림자 드리워짐) */}
          <rect x="120" y="50" width="60" height="50" fill="#ffffff" />

          <rect x="0" y="100" width="60" height="50" fill="#787878" />
          <rect x="60" y="100" width="60" height="50" fill="#ffffff" />
          <rect x="120" y="100" width="60" height="50" fill="#787878" />
        </g>

        {/* 원기둥 그림자 타원 오버레이 */}
        <ellipse cx="140" cy="95" rx="70" ry="40" fill="rgba(0,0,0,0.35)" />

        {/* 원기둥 본체 */}
        <g transform="translate(180, 40)">
          <path d="M 0,20 L 0,80 A 25,12 0 0,0 50,80 L 50,20 Z" fill="#10b981" />
          <ellipse cx="25" cy="20" rx="25" ry="12" fill="#34d399" />
        </g>

        {/* 타일 라벨 */}
        <text x="85" y="55" fill="#ffffff" fontSize="16" fontWeight="bold">A</text>
        <text x="135" y="105" fill="#111827" fontSize="16" fontWeight="bold">B</text>

        {/* 보조 브릿지 연결선 (동일 픽셀 입증) */}
        {revealed && (
          <g className="animate-fade-in">
            <path
              d="M 90,60 L 140,110"
              stroke="#787878"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 90,60 L 140,110"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3 3"
            />
            <text x="110" y="145" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
              A와 B의 실제 색상: #787878 동일!
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 066: 프레이저 나선 착시 (Fraser Spiral Illusion)
 */
export function FraserSpiral() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="066: 프레이저 나선 (Fraser Spiral)"
      subtitle="중앙으로 빨려 들어가는 소용돌이 나선처럼 보이지만 실제로는 완벽한 동심원입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="꼬인 밧줄(Twisted Cord) 패턴의 엇갈린 각도가 시지각의 방향성 단서(Orientation Cues)를 왜곡하여, 서로 연결되지 않은 동심원들을 하나의 연속된 나선으로 오인하게 만듭니다."
    >
      <svg viewBox="0 0 280 280" className="w-full max-w-[280px] h-64 select-none">
        {/* 동심원들 위에 체크 흑백 빗각 세그먼트 배치 */}
        {[30, 55, 80, 105].map((radius, rIdx) => {
          const count = 24 + rIdx * 8
          return (
            <g key={radius}>
              {Array.from({ length: count }).map((_, i) => {
                const angle = (i * 360) / count
                const rad = (angle * Math.PI) / 180
                const cx = 140 + Math.cos(rad) * radius
                const cy = 140 + Math.sin(rad) * radius
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={radius > 60 ? 5 : 3.5}
                    fill={i % 2 === 0 ? '#111827' : '#9ca3af'}
                    transform={`rotate(${angle + 25}, ${cx}, ${cy})`}
                  />
                )
              })}
            </g>
          )
        })}

        {/* 보조선: 완벽한 붉은 동심원 트래커 */}
        {revealed && (
          <g className="text-rose-500 animate-fade-in">
            {[30, 55, 80, 105].map((r) => (
              <circle
                key={`g-${r}`}
                cx="140"
                cy="140"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
            ))}
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 067: 오우치 착시 (Ouchi Illusion)
 */
export function OuchiIllusion() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="067: 오우치 착시 (Ouchi Illusion)"
      subtitle="화면을 상하좌우로 스크롤하거나 시선을 움직이면 중앙 원이 배경과 분리되어 떠다닙니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="배경의 가로 격자 패턴과 중앙 원의 세로 격자 패턴이 안구의 미세 진동(Micro-saccades)과 결합할 때, 뇌의 방향 선택 신경세포들이 서로 다른 벡터로 움직임을 지각하여 발생하는 현상입니다."
    >
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 280 280" className="w-full max-w-[280px] h-64 select-none shadow-md rounded-xl overflow-hidden bg-slate-900">
          <defs>
            {/* 가로 체크 패턴 */}
            <pattern id="h-pat" width="20" height="10" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="10" height="10" fill="#ffffff" />
              <rect x="10" y="0" width="10" height="10" fill="#000000" />
            </pattern>
            {/* 세로 체크 패턴 */}
            <pattern id="v-pat" width="10" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="10" height="10" fill="#ffffff" />
              <rect x="0" y="10" width="10" height="10" fill="#000000" />
            </pattern>
          </defs>

          {/* 배경 가로 격자 */}
          <rect x="0" y="0" width="280" height="280" fill="url(#h-pat)" />

          {/* 중앙 세로 격자 원형 디스크 */}
          <circle cx="140" cy="140" r="70" fill="url(#v-pat)" />

          {revealed && (
            <circle
              cx="140"
              cy="140"
              r="70"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              className="animate-fade-in"
            />
          )}
        </svg>
      </div>
    </DemoFrame>
  )
}
