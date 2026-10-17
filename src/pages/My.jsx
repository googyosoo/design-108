import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  Upload,
  RotateCcw,
  Star,
  Clock,
  Award,
  BookMarked,
  HelpCircle,
  FileText
} from 'lucide-react'
import effectsData from '../data/effects.json'
import chaptersData from '../data/chapters.json'
import { useProgress } from '../hooks/useProgress.js'
import { useFavorites } from '../hooks/useFavorites.js'
import { ProgressRing } from '../components/ui/ProgressRing.jsx'
import { EffectCard } from '../components/effect/EffectCard.jsx'
import { Dialog } from '../components/ui/Dialog.jsx'
import { Toast } from '../components/ui/Toast.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'

export function MyPage() {
  const {
    mastered,
    masteredCount,
    percent,
    history,
    quizHistory,
    clearAll,
    exportData,
    importData,
  } = useProgress()

  const { favorites } = useFavorites()
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    document.title = '내 도감 (My Studio) · DesignMind 108'
  }, [])

  // 즐겨찾기 원리 목록
  const favoriteEffects = effectsData.filter((e) => favorites.includes(e.id))

  // 최근 본 원리 목록 (최대 5개)
  const historyEffects = history
    .map((hid) => effectsData.find((e) => e.id === hid))
    .filter(Boolean)

  // 챕터별 마스터 통계 계산
  const chapterStats = chaptersData.map((ch) => {
    const total = ch.range[1] - ch.range[0] + 1
    const count = mastered.filter((id) => id >= ch.range[0] && id <= ch.range[1]).length
    const chPercent = Math.round((count / total) * 100)
    return {
      ...ch,
      total,
      count,
      percent: chPercent,
    }
  })

  // 데이터 내보내기 (JSON 다운로드)
  const handleExport = () => {
    try {
      const json = exportData()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `designmind-backup-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setToastMessage('학습 기록 백업 파일을 다운로드했습니다.')
    } catch {
      setToastMessage('내보내기에 실패했습니다.')
    }
  }

  // 데이터 가져오기 (JSON 파일 로드)
  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        const success = importData(content)
        if (success) {
          setToastMessage('학습 기록을 성공적으로 복원했습니다!')
        } else {
          setToastMessage('유효하지 않은 백업 파일 형식입니다.')
        }
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleConfirmReset = () => {
    clearAll()
    setResetDialogOpen(false)
    setToastMessage('모든 학습 및 열람 기록이 초기화되었습니다.')
  }

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-10">
      {/* 상단 타이틀 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            내 학습 도감
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            익힌 원리 진도, 즐겨찾기, 최근 본 원리와 퀴즈 기록을 관리합니다.
          </p>
        </div>

        {/* 백업 / 복원 / 초기화 액션 */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all shadow-xs"
            title="기록 JSON 백업 다운로드"
          >
            <Download className="w-3.5 h-3.5" />
            <span>내보내기</span>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all shadow-xs"
            title="기록 JSON 복원"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>가져오기</span>
          </button>
          <button
            type="button"
            onClick={() => setResetDialogOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-400 text-xs font-semibold text-red-600 dark:text-red-400 transition-all shadow-xs"
            title="기록 전체 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>
      </div>

      {/* 1. 수집률 진도 링 + 챕터별 막대 통계 */}
      <section className="p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <div className="flex items-center gap-2 mb-6 text-[var(--color-primary)]">
          <Award className="w-5 h-5" />
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            108개 원리 마스터 통계
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* 전체 진도 링 */}
          <div className="flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[var(--color-border-subtle)]">
            <ProgressRing percent={percent} size={96} strokeWidth={9} />
            <p className="text-sm font-bold text-[var(--color-text-primary)] mt-3">
              전체 수집률: {percent}%
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)] font-mono">
              108개 중 {masteredCount}개 익힘
            </p>
          </div>

          {/* 4대 챕터별 막대 그래프 */}
          <div className="md:col-span-2 space-y-3.5">
            {chapterStats.map((ch) => (
              <div key={ch.id}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-[var(--color-text-primary)]">
                    제{ch.no}장 · {ch.nameKo}
                  </span>
                  <span className="font-mono text-[var(--color-text-secondary)]">
                    {ch.count} / {ch.total}개 ({ch.percent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${ch.percent}%`,
                      backgroundColor: `var(${ch.colorToken})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 즐겨찾기 목록 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-amber-500 font-bold">
            <Star className="w-5 h-5 fill-current" />
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
              즐겨찾는 원리 ({favoriteEffects.length})
            </h2>
          </div>
          {favoriteEffects.length > 0 && (
            <Link to="/library" className="text-xs text-[var(--color-primary)] font-semibold hover:underline">
              도감에서 더 찾기 →
            </Link>
          )}
        </div>

        {favoriteEffects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteEffects.map((effect) => (
              <EffectCard key={effect.id} effect={effect} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] text-center">
            <BookMarked className="w-8 h-8 text-[var(--color-text-tertiary)] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              아직 즐겨찾기한 원리가 없습니다
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              원리 카드의 별(☆) 아이콘을 눌러 자주 쓰는 디자인 법칙을 보관해 보세요.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold shadow-xs"
            >
              도감 탐색하기
            </Link>
          </div>
        )}
      </section>

      {/* 3. 최근 본 원리 (최대 5개) */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)]">
          <Clock className="w-5 h-5" />
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            최근 살펴본 원리 (최근 {historyEffects.length}개)
          </h2>
        </div>

        {historyEffects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {historyEffects.map((effect) => (
              <Link
                key={effect.id}
                to={`/effect/${effect.code}`}
                className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] shadow-xs transition-all group"
              >
                <span className="text-[11px] font-mono font-bold text-[var(--color-primary)] block mb-0.5">
                  #{effect.code}
                </span>
                <p className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                  {effect.nameKo}
                </p>
                <p className="text-[11px] text-[var(--color-text-tertiary)] font-mono truncate">
                  {effect.nameEn}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--color-text-tertiary)] py-4">
            최근 열람 기록이 없습니다.
          </p>
        )}
      </section>

      {/* 4. 퀴즈 기록 (최근 10회) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-500 font-bold">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
              최근 퀴즈 풀이 기록
            </h2>
          </div>
          <Link to="/practice" className="text-xs text-[var(--color-primary)] font-semibold hover:underline">
            새 퀴즈 도전하기 →
          </Link>
        </div>

        {quizHistory.length > 0 ? (
          <div className="divide-y divide-[var(--color-border-subtle)] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            {quizHistory.map((q, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-md font-mono text-xs bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] font-medium">
                    {q.mode}
                  </span>
                  <span className="text-[var(--color-text-tertiary)] text-xs">
                    {new Date(q.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="font-mono font-bold text-[var(--color-primary)]">
                  {q.score} / {q.total}점 ({Math.round((q.score / q.total) * 100)}%)
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--color-text-tertiary)] py-2">
            아직 퀴즈를 푼 기록이 없습니다.
          </p>
        )}
      </section>

      {/* 초기화 확인 다이얼로그 */}
      <Dialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        title="학습 기록을 모두 초기화할까요?"
        description="익힌 원리 체크, 즐겨찾기, 최근 본 원리, 퀴즈 기록이 모두 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        confirmLabel="초기화 실행"
        cancelLabel="취소"
        isDanger={true}
        onConfirm={handleConfirmReset}
      />

      {/* 토스트 알림 */}
      <Toast
        open={!!toastMessage}
        onClose={() => setToastMessage('')}
        type="info"
      >
        {toastMessage}
      </Toast>
    </div>
  )
}
