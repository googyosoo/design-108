/**
 * 01_WEBAPP_STANDARDS 준수 ProgressRing 컴포넌트
 * - 수치 텍스트 병기 (접근성 및 제1시그니처 요소)
 * - tabular-nums 폰트 사용
 */
export function ProgressRing({
  value = 0,
  max = 100,
  size = 64,
  strokeWidth = 6,
  label,
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || `진도율 ${percentage}%`}
      className={`inline-flex flex-col items-center justify-center ${className}`}
    >
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* 배경 링 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--color-line)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* 진행도 링 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--color-success)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute text-[13px] font-bold text-[var(--color-ink)] tabular-nums">
          {percentage}%
        </span>
      </div>
      {label && (
        <span className="text-[var(--text-caption)] text-[var(--color-ink-muted)] mt-1 font-medium">
          {label}
        </span>
      )}
    </div>
  )
}
