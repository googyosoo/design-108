import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

const STORAGE_KEY = 'designmind_photosensitivity_warn_dismissed'

export function PhotosensitivityWarning() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY)
    } catch {
      return true
    }
  })
  const [neverShow, setNeverShow] = useState(false)

  const handleDismiss = () => {
    setVisible(false)
    if (neverShow) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        // ignore
      }
    }
  }

  if (!visible) return null

  return (
    <div
      role="alert"
      className="mb-4 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 p-4 text-amber-900 dark:text-amber-200 text-sm shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-semibold text-amber-900 dark:text-amber-100">
              시지각 착시 체험 주의사항 (광과민성 안내)
            </h5>
            <p className="text-xs text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
              본 챕터의 인터랙티브 그래픽에는 반복 격자, 강한 명암 대비, 가상 잔상 패턴이 포함되어 있습니다.
              빛 깜빡임이나 강한 기하학적 무늬에 민감하신 경우 무리한 응시를 피하고 편안한 거리에서 체험해 주세요.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={neverShow}
                  onChange={(e) => setNeverShow(e.target.checked)}
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                다시 보지 않기
              </label>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-lg p-1 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
          aria-label="안내 닫기"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
