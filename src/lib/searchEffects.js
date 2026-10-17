import Fuse from 'fuse.js'
import effectsData from '../data/effects.json'
import { getChoseong, matchesChoseong } from './getChoseong.js'

// 초성 검색 필드를 인덱싱 데이터에 사전 주입
const indexedEffects = effectsData.map((e) => ({
  ...e,
  choseongName: getChoseong(e.nameKo, true),
  choseongAliases: (e.aliasesKo || []).map((a) => getChoseong(a, true)).join(' '),
}))

const fuseOptions = {
  keys: [
    { name: 'nameKo', weight: 0.35 },
    { name: 'nameEn', weight: 0.25 },
    { name: 'aliasesKo', weight: 0.15 },
    { name: 'oneLiner', weight: 0.15 },
    { name: 'choseongName', weight: 0.05 },
    { name: 'code', weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 1,
}

const fuse = new Fuse(indexedEffects, fuseOptions)

/**
 * 108개 원리를 텍스트 또는 초성으로 검색합니다.
 * @param {string} query 검색어 (예: "시선", "ㅅㅅㅇㄷ", "contrast", "007")
 * @param {Array} [sourceList=null] 검색 대상 리스트 (기본값: 108개 전체)
 * @returns {Array} 일치하는 원리 배열
 */
export function searchEffects(query, sourceList = null) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return sourceList || indexedEffects
  }

  const trimmed = query.trim()
  const listToSearch = sourceList || indexedEffects

  // 1. 순수 초성 검색어 확인 (예: 'ㅅㅅㅇㄷ', 'ㄷㅂ')
  const isChoseongOnly = /^[ㄱ-ㅎ\s]+$/.test(trimmed)
  if (isChoseongOnly) {
    const cleanQ = trimmed.replace(/\s+/g, '')
    const choseongMatches = listToSearch.filter((item) => {
      const matchName = matchesChoseong(cleanQ, item.nameKo)
      const matchAliases = (item.aliasesKo || []).some((a) => matchesChoseong(cleanQ, a))
      return matchName || matchAliases
    })
    if (choseongMatches.length > 0) {
      return choseongMatches
    }
  }

  // 2. Fuse.js 퍼지 검색
  if (sourceList) {
    const customFuse = new Fuse(sourceList, fuseOptions)
    const results = customFuse.search(trimmed)
    return results.map((r) => r.item)
  }

  const results = fuse.search(trimmed)
  return results.map((r) => r.item)
}
