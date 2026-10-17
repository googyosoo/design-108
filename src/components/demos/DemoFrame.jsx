import { RotateCcw, Eye, EyeOff, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button.jsx'

/**
 * 데모 컨테이너 프레임
 * @param {Object} props
 * @param {string} props.title - 데모 타이틀
 * @param {string} [props.subtitle] - 조작 안내 한 줄
 * @param {boolean} [props.showReveal] - 정답/보조선 보기 버튼 노출 여부
 * @param {boolean} [props.revealed] - 현재 보조선 상태
 * @param {Function} [props.onToggleReveal] - 보조선 토글 핸들러
 * @param {Function} [props.onReset] - 초기화 핸들러
 * @param {React.ReactNode} props.children - 데모 본문
 * @param {React.ReactNode} [props.footer] - 하단 상태/결과 표시
 */
export function DemoFrame({
  title,
  subtitle,
  showReveal = false,
  revealed = false,
  onToggleReveal,
  onReset,
  children,
  footer,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* 툴바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showReveal && (
            <Button
              variant={revealed ? 'primary' : 'secondary'}
              size="sm"
              onClick={onToggleReveal}
              leftIcon={revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              aria-pressed={revealed}
            >
              {revealed ? '보조선 숨기기' : '정답/보조선 보기'}
            </Button>
          )}
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
              aria-label="데모 초기화"
            >
              초기화
            </Button>
          )}
        </div>
      </div>

      {/* 데모 메인 캔버스 */}
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[320px] bg-slate-50/50 dark:bg-slate-950/30">
        {children}
      </div>

      {/* 하단 설명/결과 */}
      {footer && (
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {footer}
        </div>
      )}
    </div>
  )
}
