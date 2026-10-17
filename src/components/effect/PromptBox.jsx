import { useState } from 'react'
import { Bot, Copy, Check } from 'lucide-react'

export function PromptBox({ effect, onToast }) {
  const [lang, setLang] = useState('ko')
  const [copied, setCopied] = useState(false)

  if (!effect || !effect.promptSnippet) return null

  const promptText = effect.promptSnippet[lang] || effect.promptSnippet.ko

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promptText)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = promptText
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      if (onToast) onToast('AI 지시문을 클립보드에 복사했어요!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      if (onToast) onToast('복사에 실패했습니다. 직접 드래그해 복사하세요.')
    }
  }

  return (
    <section className="mb-8 p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[var(--color-primary)]">
          <Bot className="w-5 h-5" aria-hidden="true" />
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            AI에게 이렇게 시키기 (프롬프트 스니펫)
          </h2>
        </div>

        {/* 한/영 토글 */}
        <div className="flex items-center p-0.5 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)]">
          <button
            type="button"
            onClick={() => setLang('ko')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              lang === 'ko'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            한국어
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              lang === 'en'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            English
          </button>
        </div>
      </div>

      <p className="text-xs text-[var(--color-text-tertiary)] mb-3">
        Claude, Gemini, ChatGPT 등 AI 코딩 및 디자인 도구에 복사해서 붙여넣으세요.
      </p>

      {/* 프롬프트 박스 + 복사 버튼 */}
      <div className="relative p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-hover)] font-mono text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed select-all">
        <p className="pr-16">{promptText}</p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="프롬프트 복사"
          className="absolute right-3 top-3 p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all shadow-xs"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </section>
  )
}
