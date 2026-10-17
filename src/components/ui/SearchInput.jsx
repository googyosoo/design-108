import { forwardRef } from 'react'

/**
 * 01_WEBAPP_STANDARDS 준수 SearchInput 컴포넌트
 * - 검색어 지우기 버튼 포함
 * - WAI-ARIA 접근성 라벨 및 폼 컨트롤
 * - 최소 높이 44px 터치 규격
 */
export const SearchInput = forwardRef(function SearchInput(
  {
    value = '',
    onChange,
    onClear,
    placeholder = '원리명, 영문, 초성(예: ㅅㅅㅇㄷ) 검색…',
    id = 'global-search-input',
    label = '검색',
    disabled = false,
    className = '',
    autoFocus = false,
    ...props
  },
  ref,
) {
  const handleClear = () => {
    if (onClear) {
      onClear()
    } else if (onChange) {
      onChange({ target: { value: '' } })
    }
  }

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        aria-hidden="true"
        className="absolute left-3 text-[var(--color-ink-muted)] pointer-events-none select-none text-sm"
      >
        🔍
      </div>
      <input
        ref={ref}
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full min-h-[44px] pl-9 pr-10 py-2 text-[var(--text-body)] bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] rounded-[var(--radius-md)] placeholder:text-[var(--color-ink-muted)]/60 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2 disabled:opacity-45 disabled:cursor-not-allowed"
        {...props}
      />
      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="검색어 지우기"
          className="absolute right-2 min-w-[32px] min-h-[32px] inline-flex items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] p-1 rounded transition-colors cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  )
})
