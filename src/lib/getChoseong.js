/**
 * 한글 초성 추출 유틸리티 (Hangul Choseong Extractor)
 * 44032('가') ~ 55203('힣') 사이의 한글 음절에서 초성을 추출합니다.
 */

const CHOSEONG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
  'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]

const HANGUL_START = 0xac00 // '가'
const HANGUL_END = 0xd7a3   // '힣'

/**
 * 텍스트에서 한글 초성을 추출하여 반환합니다.
 * 한글이 아닌 문자는 그대로 유지됩니다.
 * 예: "시선 유도 효과" -> "ㅅㅅ ㅇㄷ ㅎㄱ"
 *
 * @param {string} str 입력 문자열
 * @param {boolean} [removeWhitespace=false] 공백 제거 여부
 * @returns {string} 초성 문자열
 */
export function getChoseong(str, removeWhitespace = false) {
  if (!str || typeof str !== 'string') return ''

  let result = ''
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (code >= HANGUL_START && code <= HANGUL_END) {
      const choseongIndex = Math.floor((code - HANGUL_START) / 588)
      result += CHOSEONG_LIST[choseongIndex] || str[i]
    } else {
      if (!removeWhitespace || !/\s/.test(str[i])) {
        result += str[i]
      }
    }
  }

  return result
}

/**
 * 검색어가 대상 문자열의 초성에 포함되는지 검사합니다.
 * @param {string} query 검색어 (예: "ㅅㅅ")
 * @param {string} target 대상 텍스트 (예: "시선 유도 효과")
 * @returns {boolean}
 */
export function matchesChoseong(query, target) {
  if (!query || !target) return false
  const cleanQuery = query.replace(/\s+/g, '')
  const cleanTargetChoseong = getChoseong(target, true)
  return cleanTargetChoseong.includes(cleanQuery)
}
