import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, HelpCircle } from 'lucide-react'
import { Button } from '../components/ui/Button.jsx'
import { useProgress } from '../hooks/useProgress.js'
import scenariosData from '../data/quiz-scenarios.json'
import ethicsData from '../data/quiz-ethics.json'
import effectsData from '../data/effects.json'

function generateQuestions(mode) {
  if (mode === 'scenario') {
    const shuffled = [...scenariosData].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 10).map((q) => ({
      id: q.id,
      question: q.scenario,
      options: q.options,
      correctIndex: q.correctAnswerIndex,
      explanation: q.explanation,
      effectId: q.effectId,
    }))
  }
  if (mode === 'ethics') {
    const shuffled = [...ethicsData].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 10).map((q) => ({
      id: q.id,
      question: `[윤리 판별] ${q.scenario}`,
      options: [
        `설득적 넛지(Nudge): ${q.persuasionCase}`,
        `조작적 다크패턴(Dark Pattern): ${q.manipulationCase}`,
      ],
      correctIndex: q.correctType === 'nudge' ? 0 : 1,
      explanation: q.alternativeSolution || q.ethicalReason,
      effectId: q.effectId,
    }))
  }
  if (mode === 'english') {
    const shuffled = [...effectsData].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 10).map((eff) => {
      const others = effectsData
        .filter((e) => e.id !== eff.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
      const allOpts = [eff, ...others].sort(() => 0.5 - Math.random())
      const cIdx = allOpts.findIndex((o) => o.id === eff.id)

      return {
        id: eff.id,
        question: `다음 영어 용어에 해당하는 올바른 심리학 원리는?\n\n"${eff.name_en}"`,
        options: allOpts.map((o) => `${o.code}. ${o.name_ko}`),
        correctIndex: cIdx,
        explanation: `${eff.name_ko} (${eff.name_en}): ${eff.summary}`,
        effectId: eff.id,
      }
    })
  }

  // 기본 플래시카드용 목록 (108개 전체)
  return effectsData.map((e) => ({
    id: e.id,
    code: e.code,
    nameKo: e.name_ko,
    nameEn: e.name_en,
    summary: e.summary,
    principle: e.why,
  }))
}

export function QuizRunnerPage() {
  const { mode } = useParams()
  const { recordQuizResult } = useProgress()

  const [questions, setQuestions] = useState(() => generateQuestions(mode))

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([]) // { questionIndex, selected, isCorrect }
  const [isFinished, setIsFinished] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false) // 플래시카드용

  // 플래시카드 모드일 때는 별도 렌더러 분기
  const isFlashcard = mode === 'flashcard'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentIndex, isFinished])

  // 정답 선택 핸들러
  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return // 이미 선택함
    setSelectedOption(idx)

    const currentQ = questions[currentIndex]
    const isCorrect = idx === currentQ.correctIndex

    setAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentIndex,
        question: currentQ.question,
        selected: idx,
        isCorrect,
        correctIndex: currentQ.correctIndex,
        explanation: currentQ.explanation,
        effectId: currentQ.effectId,
      },
    ])
  }

  // 다음 문제 또는 완료
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsFlipped(false)
    } else {
      setIsFinished(true)
      // 기록 저장
      if (!isFlashcard) {
        const correctCount = answers.filter((a) => a.isCorrect).length
        recordQuizResult({
          type: mode,
          score: correctCount,
          total: questions.length,
          date: new Date().toISOString(),
        })
      }
    }
  }

  const handleRestart = () => {
    setQuestions(generateQuestions(mode))
    setCurrentIndex(0)
    setSelectedOption(null)
    setAnswers([])
    setIsFinished(false)
    setIsFlipped(false)
  }

  // 1. 플래시카드 모드 뷰
  if (isFlashcard) {
    const card = questions[currentIndex]
    return (
      <div className="mx-auto max-w-xl px-4 py-8 sm:py-12 space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/practice" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            <span>연습 허브로</span>
          </Link>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* 플래시 카드 본체 */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsFlipped((p) => !p)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsFlipped((p) => !p)
          }}
          className="relative min-h-[320px] rounded-3xl border-2 border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 p-8 shadow-xl flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all hover:scale-[1.01]"
        >
          {!isFlipped ? (
            <div className="space-y-4 animate-fade-in">
              <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-indigo-600 text-white font-mono text-xl font-black shadow-md">
                {card.code}
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">{card.nameEn}</h3>
                <p className="text-xs text-indigo-500 font-semibold mt-1">카드를 탭하여 한국어 해설 확인</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                {card.code} · {card.nameEn}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{card.nameKo}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                {card.summary}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex((p) => Math.max(0, p - 1))
              setIsFlipped(false)
            }}
          >
            이전 카드
          </Button>
          <Button variant="primary" onClick={handleNext}>
            {currentIndex === questions.length - 1 ? '처음부터' : '다음 카드'}
          </Button>
        </div>
      </div>
    )
  }

  // 2. 퀴즈 최종 결과 화면
  if (isFinished) {
    const correctCount = answers.filter((a) => a.isCorrect).length
    const scorePct = Math.round((correctCount / questions.length) * 100)

    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12 space-y-8">
        {/* 결과 배너 */}
        <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 p-8 text-center space-y-4 shadow-xl">
          <span className="flex h-16 w-16 mx-auto items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <Award className="h-8 w-8" />
          </span>

          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              트레이닝 완료
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
              최종 점수: {scorePct}점
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              총 {questions.length}문제 중 {correctCount}문제를 올바르게 맞혔습니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button variant="primary" onClick={handleRestart} leftIcon={<RotateCcw className="h-4 w-4" />}>
              새로운 10문제 다시 풀기
            </Button>
            <Link
              to="/practice"
              className="inline-flex items-center px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              연습 허브로 돌아가기
            </Link>
          </div>
        </div>

        {/* 오답 노트 및 해설 목록 */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            문항별 풀이 결과 및 오답 노트
          </h3>
          <div className="space-y-3">
            {answers.map((ans, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                  ans.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-rose-200 bg-rose-50/40 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono">Q{idx + 1}</span>
                  <span className="flex items-center gap-1 font-semibold">
                    {ans.isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> 정답</span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1"><XCircle className="h-4 w-4" /> 오답</span>
                    )}
                  </span>
                </div>
                <p className="font-medium text-slate-900 dark:text-slate-100">{ans.question}</p>
                <p className="text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700/40">
                  <strong>해설:</strong> {ans.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 3. 퀴즈 진행 중 화면
  const currentQ = questions[currentIndex]

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      {/* 상단 프로그레스 바 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <Link to="/practice" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>연습 허브</span>
          </Link>
          <span className="text-indigo-600 dark:text-indigo-400 font-mono">
            문제 {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 문제 카드 */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0 mt-0.5">
            <HelpCircle className="h-4 w-4" />
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line">
            {currentQ.question}
          </h2>
        </div>

        {/* 선택지 목록 */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx
            const isAnswered = selectedOption !== null
            const isCorrect = optIdx === currentQ.correctIndex

            let btnClass = 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 bg-white dark:bg-slate-900'
            if (isAnswered) {
              if (isCorrect) {
                btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold'
              } else if (isSelected) {
                btnClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 font-semibold'
              } else {
                btnClass = 'opacity-50 border-slate-200 dark:border-slate-800'
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${btnClass}`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0 mt-0.5">
                    {optIdx + 1}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-600 shrink-0" />}
              </button>
            )
          })}
        </div>

        {/* 선택 후 즉각 피드백 박스 */}
        {selectedOption !== null && (
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-950/60 text-xs space-y-2 animate-fade-in">
            <p className="font-bold text-indigo-950 dark:text-indigo-200">
              {selectedOption === currentQ.correctIndex ? '✓ 정답입니다!' : '✕ 아쉽네요. 오답입니다.'}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* 다음 문제 버튼 */}
        {selectedOption !== null && (
          <div className="flex justify-end pt-2">
            <Button variant="primary" onClick={handleNext} rightIcon={<ChevronRight className="h-4 w-4" />}>
              {currentIndex === questions.length - 1 ? '결과 확인하기' : '다음 문제로'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
