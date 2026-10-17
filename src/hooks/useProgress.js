import { useState, useEffect, useCallback } from 'react'
import { storage } from '../lib/storage.js'

const PROGRESS_KEY = 'designmind_progress'
const PROGRESS_EVENT = 'designmind_progress_changed'

const defaultState = {
  mastered: [],      // 익힌 원리 ID 배열
  history: [],       // 최근 본 원리 ID 배열 (최대 5개)
  quizHistory: [],   // 퀴즈 기록 배열 (최대 10개)
}

/**
 * 학습 진도, 수집률, 최근 열람 기록 관리 훅
 */
export function useProgress() {
  const [data, setData] = useState(() => {
    return storage.getItem(PROGRESS_KEY, defaultState)
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const current = storage.getItem(PROGRESS_KEY, defaultState)
      setData(current)
    }

    window.addEventListener(PROGRESS_EVENT, handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener(PROGRESS_EVENT, handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const saveState = useCallback((nextState) => {
    storage.setItem(PROGRESS_KEY, nextState)
    setData(nextState)
    window.dispatchEvent(new Event(PROGRESS_EVENT))
  }, [])

  // 익혔어요 토글
  const toggleMastered = useCallback(
    (effectId) => {
      const id = Number(effectId)
      const current = storage.getItem(PROGRESS_KEY, defaultState)
      const masteredList = current.mastered || []
      const exists = masteredList.includes(id)
      const nextMastered = exists
        ? masteredList.filter((x) => x !== id)
        : [...masteredList, id]

      const nextState = { ...current, mastered: nextMastered }
      saveState(nextState)
      return !exists
    },
    [saveState]
  )

  const isMastered = useCallback(
    (effectId) => {
      return (data.mastered || []).includes(Number(effectId))
    },
    [data.mastered]
  )

  // 최근 열람 기록 추가 (중복 제거, 최신순 최대 5개)
  const recordView = useCallback(
    (effectId) => {
      const id = Number(effectId)
      if (!id || isNaN(id)) return

      const current = storage.getItem(PROGRESS_KEY, defaultState)
      const prevHistory = current.history || []
      const filtered = prevHistory.filter((x) => x !== id)
      const nextHistory = [id, ...filtered].slice(0, 5)

      const nextState = { ...current, history: nextHistory }
      saveState(nextState)
    },
    [saveState]
  )

  // 퀴즈 결과 기록 (최대 10개)
  const recordQuizResult = useCallback(
    (result) => {
      const current = storage.getItem(PROGRESS_KEY, defaultState)
      const prevQuiz = current.quizHistory || []
      const record = {
        date: new Date().toISOString(),
        mode: result.mode,
        score: result.score,
        total: result.total,
        wrongIds: result.wrongIds || [],
      }
      const nextQuiz = [record, ...prevQuiz].slice(0, 10)
      const nextState = { ...current, quizHistory: nextQuiz }
      saveState(nextState)
    },
    [saveState]
  )

  // 전체 기록 초기화
  const clearAll = useCallback(() => {
    storage.removeItem(PROGRESS_KEY)
    setData(defaultState)
    window.dispatchEvent(new Event(PROGRESS_EVENT))
  }, [])

  // JSON 내보내기
  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2)
  }, [data])

  // JSON 가져오기
  const importData = useCallback(
    (jsonString) => {
      try {
        const parsed = JSON.parse(jsonString)
        if (typeof parsed !== 'object' || parsed === null) return false
        const valid = {
          mastered: Array.isArray(parsed.mastered) ? parsed.mastered.map(Number) : [],
          history: Array.isArray(parsed.history) ? parsed.history.map(Number) : [],
          quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
        }
        saveState(valid)
        return true
      } catch {
        return false
      }
    },
    [saveState]
  )

  const masteredCount = (data.mastered || []).length
  const percent = Math.round((masteredCount / 108) * 100)

  return {
    mastered: data.mastered || [],
    masteredCount,
    percent,
    history: data.history || [],
    quizHistory: data.quizHistory || [],
    toggleMastered,
    isMastered,
    recordView,
    recordQuizResult,
    clearAll,
    exportData,
    importData,
  }
}
