import effectsData from '../data/effects.json'

/**
 * 매체와 목적 조합에 가장 적합한 추천 원리 목록을 가중치 순으로 반환합니다.
 * @param {Object} options
 * @param {string} [options.media] 선택된 매체 (slide, worksheet, notice, poster, webapp, thumbnail, sns)
 * @param {string} [options.purpose] 선택된 목적 (attention, emphasis, trust, choice, memory, readability, grouping, usability, motivation, emotion, perception)
 * @param {number} [options.limit=8] 최대 반환 개수
 * @returns {Array} 추천된 원리 목록
 */
export function recommendEffects({ media = '', purpose = '', limit = 8 }) {
  if (!media && !purpose) {
    // 기본 추천: 입문(level 1) 대표 원리
    return effectsData.filter((e) => e.level === 1).slice(0, limit)
  }

  const scored = effectsData.map((effect) => {
    let score = 0

    // 목적 일치 시 높은 가중치 (+3)
    if (purpose && (effect.purposeTags || []).includes(purpose)) {
      score += 3
    }

    // 매체 일치 시 중간 가중치 (+2)
    if (media && (effect.mediaTags || []).includes(media)) {
      score += 2
    }

    // 입문/응용 레벨 보너스 (+1)
    if (effect.level === 1) score += 1

    return { effect, score }
  })

  // 점수 내림차순 정렬
  scored.sort((a, b) => b.score - a.score)

  return scored
    .filter((item) => item.score > 0)
    .slice(0, limit)
    .map((item) => item.effect)
}
