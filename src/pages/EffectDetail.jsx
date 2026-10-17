import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import effectsData from '../data/effects.json'
import { useProgress } from '../hooks/useProgress.js'
import { Principle } from '../components/xray/Principle.jsx'
import { Toast } from '../components/ui/Toast.jsx'
import { EffectHeader } from '../components/effect/EffectHeader.jsx'
import { DemoPlaceholder } from '../components/demos/DemoPlaceholder.jsx'
import { WhySection } from '../components/effect/WhySection.jsx'
import { ApplyTabs } from '../components/effect/ApplyTabs.jsx'
import { DoDont } from '../components/effect/DoDont.jsx'
import { EthicsBox } from '../components/effect/EthicsBox.jsx'
import { PromptBox } from '../components/effect/PromptBox.jsx'
import { EnglishCorner } from '../components/effect/EnglishCorner.jsx'
import { RelatedList } from '../components/effect/RelatedList.jsx'
import { EffectNav } from '../components/effect/EffectNav.jsx'

export function EffectDetailPage() {
  const { code } = useParams()
  const { recordView } = useProgress()
  const [toastMessage, setToastMessage] = useState('')

  const effect = effectsData.find((e) => e.code === code)

  useEffect(() => {
    if (effect) {
      document.title = `${effect.code} ${effect.nameKo} · DesignMind 108`
      recordView(effect.id)
      window.scrollTo(0, 0)
    } else {
      document.title = '원리를 찾을 수 없습니다 · DesignMind 108'
    }
  }, [effect, recordView])

  if (!effect) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          원리를 찾을 수 없습니다
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          요청하신 원리 코드 &apos;{code}&apos;에 해당하는 데이터가 존재하지 않습니다.
        </p>
        <Link
          to="/library"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold shadow-xs"
        >
          원리 도감으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <Principle ids={[19, 44, 100, 7]}>
      <article className="max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
        {/* ① 헤더 섹션 */}
        <EffectHeader effect={effect} />

        {/* ② 30초 인터랙티브 체험 */}
        <DemoPlaceholder effect={effect} />

        {/* ③ 왜 그럴까? */}
        <WhySection effect={effect} />

        {/* ④ 이렇게 써 보세요 */}
        <ApplyTabs effect={effect} />

        {/* ⑤ Do & Don't */}
        <DoDont effect={effect} />

        {/* ⑥ 윤리 체크 (caution / risk 일 때만) */}
        <EthicsBox effect={effect} />

        {/* ⑦ AI에게 이렇게 시키기 */}
        <PromptBox effect={effect} onToast={(msg) => setToastMessage(msg)} />

        {/* ⑧ English Corner */}
        <EnglishCorner effect={effect} />

        {/* ⑨ 함께 보면 좋은 원리 */}
        <RelatedList effect={effect} />

        {/* ⑩ 하단 이동 내비게이션 */}
        <EffectNav effect={effect} />

        {/* 복사 토스트 알림 */}
        <Toast
          open={!!toastMessage}
          onClose={() => setToastMessage('')}
          type="success"
        >
          {toastMessage}
        </Toast>
      </article>
    </Principle>
  )
}
