/**
 * 108개 원리를 챕터, 목적, 매체, 윤리 조건으로 필터링합니다.
 *
 * @param {Array} list 원본 원리 배열
 * @param {Object} filters 필터 조건 객체
 * @param {string|string[]} [filters.chapter] 선택된 챕터 ID 또는 배열
 * @param {string[]} [filters.purposes] 선택된 목적 태그 배열
 * @param {string[]} [filters.media] 선택된 매체 태그 배열
 * @param {string[]} [filters.ethics] 선택된 윤리 등급 배열 ('safe', 'caution', 'risk')
 * @returns {Array} 필터링된 원리 배열
 */
export function filterEffects(list, filters = {}) {
  if (!list || !Array.isArray(list)) return []

  const { chapter, purposes, media, ethics } = filters

  return list.filter((item) => {
    // 1. 챕터 필터
    if (chapter) {
      if (Array.isArray(chapter) && chapter.length > 0) {
        if (!chapter.includes(item.chapter)) return false
      } else if (typeof chapter === 'string' && chapter !== 'all') {
        if (item.chapter !== chapter) return false
      }
    }

    // 2. 목적 태그 필터 (AND 또는 OR: 최소 하나 일치)
    if (purposes && Array.isArray(purposes) && purposes.length > 0) {
      const hasMatch = purposes.some((p) => (item.purposeTags || []).includes(p))
      if (!hasMatch) return false
    }

    // 3. 매체 태그 필터
    if (media && Array.isArray(media) && media.length > 0) {
      const hasMatch = media.some((m) => (item.mediaTags || []).includes(m))
      if (!hasMatch) return false
    }

    // 4. 윤리 등급 필터
    if (ethics && Array.isArray(ethics) && ethics.length > 0) {
      if (!ethics.includes(item.ethicsLevel)) return false
    }

    return true
  })
}
