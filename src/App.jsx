function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-1)]">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-success)] text-white flex items-center justify-center font-bold text-lg tabular-nums">
          108
        </div>
        <h1 className="text-[var(--text-h1)] font-bold text-[var(--color-ink)] mb-2">
          DesignMind 108
        </h1>
        <p className="text-[var(--text-body)] text-[var(--color-ink-muted)] mb-4">
          마음을 움직이는 디자인 원리 108
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-bg)] text-[var(--color-ink-muted)] border border-[var(--color-line)]">
          Phase 0 베이스라인 준비 완료
        </div>
      </div>
    </main>
  )
}

export default App
