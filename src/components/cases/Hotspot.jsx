import React from 'react'

/**
 * 인터랙티브 핫스팟 마커 컴포넌트
 * @param {Object} props
 * @param {Object} props.hotspot - 핫스팟 데이터 객체 ({ id, number, x, y, effectCode, title, description })
 * @param {boolean} [props.active] - 현재 선택 여부
 * @param {Function} props.onClick - 클릭 핸들러
 */
export function Hotspot({ hotspot, active = false, onClick }) {
  const { number, x, y, title } = hotspot

  return (
    <button
      type="button"
      onClick={() => onClick(hotspot)}
      aria-label={`핫스팟 ${number}번: ${title}`}
      aria-pressed={active}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-hidden focus:ring-4 focus:ring-indigo-400 rounded-full transition-transform duration-200 active:scale-95 ${
        active ? 'scale-125 z-30' : 'hover:scale-110'
      }`}
    >
      {/* 펄스 애니메이션 링 */}
      <span
        className={`absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none ${
          active ? 'bg-rose-500' : 'bg-indigo-500'
        }`}
      />

      {/* 핫스팟 번호 뱃지 */}
      <span
        className={`relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg transition-colors border-2 border-white dark:border-slate-900 ${
          active
            ? 'bg-rose-500 ring-2 ring-rose-400'
            : 'bg-indigo-600 group-hover:bg-indigo-700'
        }`}
      >
        {number}
      </span>
    </button>
  )
}
