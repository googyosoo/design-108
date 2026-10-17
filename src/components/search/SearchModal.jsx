import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, History, ArrowRight } from 'lucide-react'
import effectsData from '../../data/effects.json'
import { searchEffects } from '../../lib/searchEffects.js'
import { storage } from '../../lib/storage.js'

const RECENT_SEARCHES_KEY = 'designmind_recent_searches'

function SearchModalInner({ onClose }) {
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState(() => {
    return storage.getItem(RECENT_SEARCHES_KEY, [])
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 전역 단축키 (Esc 닫기)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const results = query.trim() ? searchEffects(query, effectsData).slice(0, 6) : []

  const saveRecent = (term) => {
    if (!term || !term.trim()) return
    const current = storage.getItem(RECENT_SEARCHES_KEY, [])
    const updated = [term.trim(), ...current.filter((t) => t !== term.trim())].slice(0, 5)
    storage.setItem(RECENT_SEARCHES_KEY, updated)
    setRecentSearches(updated)
  }

  const handleSelectEffect = (effect) => {
    saveRecent(query.trim() || effect.nameKo)
    onClose()
    navigate(`/effect/${effect.code}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleSelectEffect(results[selectedIndex])
      } else if (query.trim()) {
        saveRecent(query.trim())
        onClose()
        navigate(`/library?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="전역 원리 검색"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 검색 인풋 영역 */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--color-border)]">
          <Search className="w-5 h-5 text-[var(--color-text-tertiary)] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="이름, 영어, 초성으로 검색 (예: ㄷㅂ, contrast)"
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-hidden font-medium"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)]">
              ESC
            </kbd>
          )}
        </div>

        {/* 결과 리스트 */}
        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() ? (
            results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((effect, idx) => {
                  const isSelected = selectedIndex === idx
                  return (
                    <li key={effect.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectEffect(effect)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                          isSelected
                            ? 'bg-[var(--color-surface-hover)] text-[var(--color-primary)]'
                            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
                            #{effect.code}
                          </span>
                          <span className="text-sm font-bold truncate">
                            {effect.nameKo}
                          </span>
                          <span className="text-xs text-[var(--color-text-tertiary)] font-mono truncate hidden sm:inline">
                            {effect.nameEn}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0 ml-2" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="py-8 text-center text-xs text-[var(--color-text-secondary)]">
                &apos;{query}&apos;에 해당하는 원리가 없습니다.
              </div>
            )
          ) : (
            /* 최근 검색어 */
            <div className="p-2">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-tertiary)] mb-2 px-1">
                <span className="flex items-center gap-1">
                  <History className="w-3.5 h-3.5" />
                  <span>최근 검색어</span>
                </span>
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      storage.removeItem(RECENT_SEARCHES_KEY)
                      setRecentSearches([])
                    }}
                    className="hover:text-[var(--color-text-primary)]"
                  >
                    전체 삭제
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-subtle)]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[var(--color-text-tertiary)] py-4 text-center">
                  초성(예: ㄷㅂ)이나 영단어로 빠르게 검색해 보세요.
                </p>
              )}
            </div>
          )}
        </div>

        {/* 하단 단축키 가이드 */}
        <div className="px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[11px] text-[var(--color-text-tertiary)] flex items-center justify-between">
          <span>↑↓ 탐색 · Enter 선택</span>
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/library')
            }}
            className="hover:text-[var(--color-primary)] font-semibold"
          >
            도감 전체 보기 →
          </button>
        </div>
      </div>
    </div>
  )
}

export function SearchModal({ open, onClose }) {
  if (!open) return null
  return <SearchModalInner onClose={onClose} />
}
