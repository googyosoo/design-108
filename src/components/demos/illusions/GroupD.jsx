import { useState } from 'react'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 068: 네커 큐브 (Necker Cube)
 */
export function NeckerCube() {
  const [focusFace, setFocusFace] = useState('none') // 'front' | 'back' | 'none'

  return (
    <DemoFrame
      title="068: 네커 큐브 (Necker Cube)"
      subtitle="깊이 단서가 없는 와이어프레임 큐브는 바라보는 순간 전면과 후면이 뒤바뀝니다."
      showReveal
      revealed={focusFace !== 'none'}
      onToggleReveal={() => setFocusFace((p) => (p === 'none' ? 'front' : p === 'front' ? 'back' : 'none'))}
      onReset={() => setFocusFace('none')}
      footer="하나의 2D 평면 도면에 두 가지 서로 상충하는 3D 입체 해석이 동시에 존재할 때, 뇌는 주기적으로 두 해석 사이를 자발적으로 왕복(Bistable Perception)합니다."
    >
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-52 select-none">
          {/* 전면 면 강조 시 */}
          {focusFace === 'front' && (
            <rect x="50" y="70" width="100" height="100" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="3" />
          )}

          {/* 후면 면 강조 시 */}
          {focusFace === 'back' && (
            <rect x="110" y="30" width="100" height="100" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" strokeWidth="3" />
          )}

          {/* 앞쪽 정사각형 */}
          <rect x="50" y="70" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />

          {/* 뒤쪽 정사각형 */}
          <rect x="110" y="30" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />

          {/* 4개 연결 모서리 */}
          <line x1="50" y1="70" x2="110" y2="30" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />
          <line x1="150" y1="70" x2="210" y2="30" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />
          <line x1="50" y1="170" x2="110" y2="130" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />
          <line x1="150" y1="170" x2="210" y2="130" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-slate-100" />
        </svg>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFocusFace('front')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              focusFace === 'front' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            앞면(좌하단) 기준 보기
          </button>
          <button
            type="button"
            onClick={() => setFocusFace('back')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              focusFace === 'back' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            뒷면(우상단) 기준 보기
          </button>
        </div>
      </div>
    </DemoFrame>
  )
}

/**
 * 069: 루빈의 꽃병 (Rubin's Vase)
 */
export function RubinVase() {
  const [focus, setFocus] = useState('vase') // 'vase' | 'faces'

  return (
    <DemoFrame
      title="069: 루빈의 꽃병 (Rubin's Vase)"
      subtitle="중앙의 흰색 꽃병과 양쪽의 검은 마주 보는 얼굴 중 어느 쪽이 먼저 보이시나요?"
      showReveal
      revealed={focus === 'faces'}
      onToggleReveal={() => setFocus((p) => (p === 'vase' ? 'faces' : 'vase'))}
      onReset={() => setFocus('vase')}
      footer="전경(Figure)과 배경(Ground)의 조직화 원리입니다. 시각 시스템은 경계선 안쪽을 물체로 인식하지만, 두 영역 모두 의미 있는 형태를 가질 때 뇌는 주의(Attention)를 번갈아 배치합니다."
    >
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 280 240" className="w-full max-w-[280px] h-56 select-none bg-black rounded-xl overflow-hidden shadow-md">
          {/* 중앙 흰색 꽃병 실루엣 */}
          <path
            d="M 60,20 Q 140,25 220,20 L 210,60 Q 170,80 190,120 Q 215,160 170,180 Q 185,210 210,220 L 70,220 Q 95,210 110,180 Q 65,160 90,120 Q 110,80 70,60 Z"
            fill="#ffffff"
          />

          {focus === 'faces' && (
            <g className="text-rose-500 animate-fade-in font-bold text-xs" fill="currentColor">
              <circle cx="50" cy="80" r="3" />
              <text x="35" y="60">얼굴 A</text>
              <circle cx="230" cy="80" r="3" />
              <text x="215" y="60">얼굴 B</text>
            </g>
          )}

          {focus === 'vase' && (
            <g className="text-indigo-600 animate-fade-in font-bold text-xs" fill="currentColor">
              <text x="140" y="130" textAnchor="middle">꽃병</text>
            </g>
          )}
        </svg>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFocus('vase')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              focus === 'vase' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            꽃병(전경)에 집중
          </button>
          <button
            type="button"
            onClick={() => setFocus('faces')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              focus === 'faces' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            얼굴(배경)에 집중
          </button>
        </div>
      </div>
    </DemoFrame>
  )
}

/**
 * 070: 달마시안 불완전 도형 (Dalmatian Emergence)
 */
export function DalmatianFigure() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="070: 달마시안 불완전 도형 (Emergence)"
      subtitle="무작위로 흩어진 잉크 얼룩 속에서 순간적으로 하나의 구체적인 동물이 떠오릅니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="발현(Emergence)과 폐쇄성(Closure)의 대표 사례입니다. 개별 점들을 하나씩 더해서 파악하는 것이 아니라, 뇌가 한순간 전체적인 형태(달마시안 강아지)를 통째로 인식합니다."
    >
      <svg viewBox="0 0 300 220" className="w-full max-w-sm h-52 select-none bg-slate-100 dark:bg-slate-800 rounded-xl p-2">
        {/* 무작위 배경 얼룩들 */}
        {[
          { cx: 40, cy: 30, r: 12 }, { cx: 80, cy: 50, r: 8 }, { cx: 220, cy: 40, r: 14 },
          { cx: 260, cy: 90, r: 10 }, { cx: 30, cy: 160, r: 15 }, { cx: 70, cy: 180, r: 9 },
          { cx: 250, cy: 170, r: 12 }, { cx: 270, cy: 190, r: 16 }
        ].map((pt, i) => (
          <ellipse key={i} cx={pt.cx} cy={pt.cy} rx={pt.r * 1.2} ry={pt.r} fill="#1e293b" />
        ))}

        {/* 달마시안 형태를 구성하는 핵심 얼룩들 */}
        {/* 머리와 귀 */}
        <ellipse cx="120" cy="110" rx="14" ry="20" fill="#1e293b" transform="rotate(-20, 120, 110)" />
        <circle cx="105" cy="130" r="7" fill="#1e293b" />
        {/* 등과 몸통 */}
        <ellipse cx="160" cy="100" rx="18" ry="12" fill="#1e293b" />
        <ellipse cx="195" cy="115" rx="15" ry="10" fill="#1e293b" />
        <ellipse cx="175" cy="135" rx="12" ry="8" fill="#1e293b" />
        {/* 다리 부위 */}
        <ellipse cx="135" cy="170" rx="6" ry="16" fill="#1e293b" />
        <ellipse cx="185" cy="175" rx="7" ry="14" fill="#1e293b" />

        {/* 힌트 윤곽선 가이드 */}
        {revealed && (
          <g className="text-rose-500 animate-fade-in" stroke="currentColor" strokeWidth="2.5" fill="none" strokeDasharray="4 4">
            <path d="M 100,140 Q 110,85 140,85 Q 210,85 220,125 Q 210,190 180,185 L 140,185 Z" />
            <text x="160" y="70" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12" fontWeight="bold">
              스니핑하는 달마시안 강아지 윤곽
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

/**
 * 071: 카페 월 착시 (Café Wall Illusion)
 */
export function CafeWall() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="071: 카페 월 착시 (Café Wall)"
      subtitle="어긋나게 배열된 흑백 타일들 사이의 회색 선들이 비스듬히 기울어져 보입니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="타일 간 명암 대비 경계선에서 발생하는 국소적 방향 왜곡 신호가 회색 수평선의 전체 인지 각도를 왜곡합니다. 실제 모든 회색 줄은 완벽한 수평 평행선입니다."
    >
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 300 180" className="w-full max-w-sm h-48 select-none bg-slate-400 rounded-lg overflow-hidden">
          {/* 4줄의 엇갈린 흑백 타일 */}
          {[
            { y: 5, offset: 0 },
            { y: 48, offset: 18 },
            { y: 91, offset: 36 },
            { y: 134, offset: 18 },
          ].map((row, rIdx) => (
            <g key={rIdx}>
              {Array.from({ length: 9 }).map((_, cIdx) => (
                <rect
                  key={cIdx}
                  x={-20 + cIdx * 40 + row.offset}
                  y={row.y}
                  width="40"
                  height="38"
                  fill={cIdx % 2 === 0 ? '#111827' : '#ffffff'}
                />
              ))}
            </g>
          ))}

          {/* 타일 사이를 지나는 회색 평행선 3줄 */}
          {[45, 88, 131].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#94a3b8" strokeWidth="4" />
          ))}

          {revealed && (
            <g className="text-rose-500 animate-fade-in">
              {[45, 88, 131].map((y) => (
                <line key={`g-${y}`} x1="0" y1={y} x2="300" y2={y} stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
              ))}
              <text x="150" y="25" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
                각도 0도 평행선 검증
              </text>
            </g>
          )}
        </svg>
      </div>
    </DemoFrame>
  )
}

/**
 * 072: 티치너 원 착시 (Titchener Circles)
 */
export function TitchenerCircles() {
  const [revealed, setRevealed] = useState(false)

  return (
    <DemoFrame
      title="072: 티치너 원 착시 (Titchener Circles)"
      subtitle="크기 대비(Size Contrast)에 의해 중앙 표적의 크기가 다르게 느껴집니다."
      showReveal
      revealed={revealed}
      onToggleReveal={() => setRevealed((p) => !p)}
      onReset={() => setRevealed(false)}
      footer="동일한 버튼이나 텍스트도 주변에 거대한 이미지나 굵은 여백이 둘러싸고 있으면 작아 보이고, 좁은 영역에 오밀조밀하게 있으면 크게 느껴집니다."
    >
      <svg viewBox="0 0 320 180" className="w-full max-w-sm h-48 select-none">
        {/* 좌측: 큰 테두리 원 */}
        <g transform="translate(85, 90)">
          <circle cx="0" cy="0" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />
          <circle cx="0" cy="0" r="22" fill="#3b82f6" />
        </g>

        {/* 우측: 작은 테두리 원 */}
        <g transform="translate(235, 90)">
          <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />
          <circle cx="0" cy="0" r="22" fill="#3b82f6" />
        </g>

        {revealed && (
          <g className="text-rose-500 animate-fade-in">
            <line x1="85" y1="68" x2="235" y2="68" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="85" y1="112" x2="235" y2="112" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <text x="160" y="95" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">
              두 파란 원의 지름: 44px 동일
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}
