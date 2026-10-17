import { useState, useRef, useEffect } from 'react'
import { Play, RotateCcw, Timer, Zap } from 'lucide-react'
import { Button } from '../../ui/Button.jsx'
import { DemoFrame } from '../DemoFrame.jsx'

/**
 * 인지 반응 속도 측정 템플릿 (TimingGame)
 * @param {Object} props
 * @param {string} props.title - 원리 타이틀
 * @param {string} props.targetLabel - 찾아야 하는 타깃 라벨
 * @param {Array<number>} props.itemCountOptions - 선택지 개수 옵션들 (예: [2, 4, 8])
 * @param {string} props.lawName - 적용 심리 법칙 (예: "힉의 법칙 (Hick's Law)")
 * @param {string} props.explanation - 하단 해설
 */
export function TimingGame({
  title = "반응 속도 측정기",
  targetLabel = "확인",
  itemCountOptions = [2, 4, 8],
  lawName = "힉의 법칙 (Hick's Law)",
  explanation = "선택지 개수가 늘어날수록 인지적 결정 시간은 로그 함수(Logarithmic) 형태로 증가합니다.",
}) {
  const [selectedCount, setSelectedCount] = useState(itemCountOptions[0])
  const [gameState, setGameState] = useState('idle') // 'idle' | 'waiting' | 'ready' | 'finished'
  const [reactionTime, setReactionTime] = useState(null)
  const [records, setRecords] = useState([])
  const [targetIndex, setTargetIndex] = useState(0)

  const startTimeRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleStart = () => {
    setGameState('waiting')
    setReactionTime(null)

    // 랜덤 위치 지정
    const tIndex = Math.floor(Math.random() * selectedCount)
    setTargetIndex(tIndex)

    // 1.5 ~ 3.5초 후 타깃 노출
    const delay = 1500 + Math.random() * 2000
    timeoutRef.current = setTimeout(() => {
      setGameState('ready')
      startTimeRef.current = performance.now()
    }, delay)
  }

  const handleClickTarget = () => {
    if (gameState !== 'ready') return
    const elapsed = Math.round(performance.now() - startTimeRef.current)
    setReactionTime(elapsed)
    setGameState('finished')
    setRecords((prev) => [{ count: selectedCount, time: elapsed, date: new Date() }, ...prev].slice(0, 5))
  }

  const handleReset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setGameState('idle')
    setReactionTime(null)
  }

  // 더미 라벨 목록
  const dummyLabels = ['취소', '닫기', '이전', '설정', '더보기', '저장', '공유', '다운로드', '검색', '수정']

  return (
    <DemoFrame
      title={title}
      subtitle={`${lawName}에 따른 선택지 개수와 반응 시간(ms)의 상관관계를 직접 측정해 보세요.`}
      onReset={handleReset}
      footer={
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{explanation}</p>
          {records.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
              최근 기록: {records[0].time}ms ({records[0].count}지선다)
            </div>
          )}
        </div>
      }
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        {/* 선택지 개수 칩 */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">선택지 개수:</span>
          {itemCountOptions.map((cnt) => (
            <button
              key={cnt}
              type="button"
              disabled={gameState === 'waiting' || gameState === 'ready'}
              onClick={() => {
                setSelectedCount(cnt)
                handleReset()
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCount === cnt
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cnt}개
            </button>
          ))}
        </div>

        {/* 게임 플레이 캔버스 */}
        <div className="w-full min-h-[220px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center relative shadow-inner">
          {gameState === 'idle' && (
            <div className="flex flex-col items-center gap-3 text-center">
              <Timer className="h-10 w-10 text-indigo-500 animate-pulse" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                시작 버튼을 누르면 잠시 후 버튼들이 나타납니다.<br />
                그중 <strong className="text-indigo-600 dark:text-indigo-400">"{targetLabel}"</strong> 버튼을 최대한 빠르게 누르세요!
              </p>
              <Button onClick={handleStart} variant="primary" leftIcon={<Play className="h-4 w-4" />}>
                측정 시작하기
              </Button>
            </div>
          )}

          {gameState === 'waiting' && (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-8 w-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                준비... 집중하세요!
              </p>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Array.from({ length: selectedCount }).map((_, idx) => {
                const isTarget = idx === targetIndex
                const label = isTarget ? targetLabel : dummyLabels[idx % dummyLabels.length]
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={isTarget ? handleClickTarget : undefined}
                    className="h-14 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-sm font-semibold text-slate-800 dark:text-slate-100 transition-colors active:scale-95 flex items-center justify-center"
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          )}

          {gameState === 'finished' && (
            <div className="flex flex-col items-center gap-3 text-center animate-fade-in">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Zap className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs text-slate-500 font-medium">당신의 인지 결정 반응 속도</p>
                <p className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  {reactionTime} ms
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  ({selectedCount}개 선택지 중 "{targetLabel}" 탐색 완료)
                </p>
              </div>
              <Button onClick={handleStart} variant="secondary" size="sm" leftIcon={<RotateCcw className="h-3.5 w-3.5" />}>
                다시 측정하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  )
}
