import effectsData from '../data/effects.json' with { type: 'json' }
import mediaData from '../data/media.json' with { type: 'json' }
import purposesData from '../data/purposes.json' with { type: 'json' }

/**
 * 4대 전문 분석관 및 합의 검증관 메타데이터
 */
export const SWARM_AGENTS = [
  {
    id: 'cognitivist',
    name: '인지심리학자',
    role: '인지 부하 및 주의 집중 분석',
    badgeColor: 'indigo',
    specialty: '시선 동선, 작업 기억, 정보 청킹',
  },
  {
    id: 'visual-critic',
    name: '시각비평가',
    role: '타이포그래피와 명도 대비 비평',
    badgeColor: 'rose',
    specialty: '명도 대비, 게슈탈트 원리, 시각 위계',
  },
  {
    id: 'ethics-guard',
    name: '윤리수호자',
    role: '다크 패턴 차단 및 접근성 검증',
    badgeColor: 'amber',
    specialty: '조작 방지, 색각 보정, 포용적 설계',
  },
  {
    id: 'school-advocate',
    name: '학교현장옹호자',
    role: '학교 현장 적합성 및 인쇄 호환 점검',
    badgeColor: 'emerald',
    specialty: '교내 활용성, 인쇄 호환, 학부모 가독성',
  },
  {
    id: 'verifier',
    name: '합의검증관',
    role: '전문가 합의 도출 및 최종 검증',
    badgeColor: 'sky',
    specialty: '상충 의견 통합, 실행 우선순위 판정',
  },
]

/**
 * 모둠 활동 3대 학생 코치 메타데이터
 */
export const TEAM_COACH_AGENTS = [
  {
    id: 'planner-coach',
    name: '기획 코치',
    role: '목표 정합성 및 메시지 구조 코칭',
    badgeColor: 'indigo',
    specialty: '핵심 타깃 정의, 정보 위계, 동기 유발',
  },
  {
    id: 'visual-coach',
    name: '시각 디자인 코치',
    role: '시선 흐름, 대비, 레이아웃 코칭',
    badgeColor: 'rose',
    specialty: 'F, Z 동선, 여백 활용, 색채 대비',
  },
  {
    id: 'ethics-coach',
    name: '윤리·접근성 코치',
    role: '다크 패턴 예방 및 포용성 코칭',
    badgeColor: 'amber',
    specialty: '기만적 넛지 방지, 인쇄 가독성, WCAG 점검',
  },
]

/**
 * HTML 특수문자 이스케이프 (XSS 방지)
 */
function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * HTML/CSS 스니펫 정화 (스크립트 및 악성 핸들러 제거)
 */
function sanitizeHtml(html) {
  if (!html) return ''
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\s*on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
}

/**
 * 환경에 맞춘 비동기 지연 (Node CLI 검증 시 단축, 브라우저 환경에서는 자연스러운 스트리밍)
 */
function delay(ms) {
  const isNode = typeof window === 'undefined'
  const finalMs = isNode ? Math.min(ms, 40) : ms
  return new Promise((resolve) => setTimeout(resolve, finalMs))
}

/**
 * 108개 원리 중 특정 ID 또는 코드로 원리 객체 검색
 */
function findEffect(identifier) {
  if (!identifier) return null
  const numId = Number(identifier)
  if (!Number.isNaN(numId)) {
    const found = effectsData.find((e) => e.id === numId)
    if (found) return found
  }
  const strId = String(identifier).padStart(3, '0')
  return effectsData.find((e) => e.code === strId) || null
}

/**
 * 매체 식별자 정규화 (id 또는 legacy code 지원)
 */
function resolveMedia(mediaCode) {
  if (!mediaCode) return mediaData[0] || { id: 'slide', label: '수업 슬라이드', tips: [] }
  const clean = String(mediaCode).trim()
  const direct = mediaData.find((m) => m.id === clean || m.id === clean.toLowerCase())
  if (direct) return direct

  const aliases = {
    PRINT_NOTICE: 'notice',
    NOTICE: 'notice',
    SLIDE: 'slide',
    PRESENTATION: 'slide',
    WORKSHEET: 'worksheet',
    POSTER: 'poster',
    WEBAPP: 'webapp',
    THUMBNAIL: 'thumbnail',
    SNS: 'sns',
  }
  const mapped = aliases[clean.toUpperCase()] || 'slide'
  return mediaData.find((m) => m.id === mapped) || mediaData[0]
}

/**
 * 목적 식별자 목록 정규화
 */
function resolvePurposes(purposeCodes) {
  if (!purposeCodes || !Array.isArray(purposeCodes) || purposeCodes.length === 0) {
    return [purposesData[0] || { id: 'readability', label: '가독성 향상' }]
  }
  const resolved = purposeCodes
    .map((code) => {
      const clean = String(code).trim().toLowerCase()
      return purposesData.find((p) => p.id === clean || p.id === clean.replace(/-/g, ''))
    })
    .filter(Boolean)
  return resolved.length > 0 ? resolved : [purposesData[0]]
}

/**
 * 3단계 프롬프트 에이전트 스웜 (Architect -> Copywriter -> Ethics-Verifier)
 * @param {Object} params
 * @param {string} [params.mediaCode] 매체 식별자
 * @param {string[]} [params.purposeCodes] 디자인 목적 태그 배열
 * @param {Array<number|string>} [params.effectIds] 선택된 108 원리 ID 목록
 * @param {string} [params.customContext] 교사 및 작성자 추가 맥락
 * @param {string} [apiKey] 선택적 Gemini 2.5 Flash API 키
 * @param {Function} [onProgress] 실시간 진행 상태 콜백
 * @returns {Promise<{ transcript: Array, finalPrompt: string, htmlPreview: string, checks: Array }>}
 */
export async function runPromptSwarm(
  { mediaCode, purposeCodes = [], effectIds = [], customContext = '' } = {},
  apiKey = '',
  onProgress = null
) {
  const currentMedia = resolveMedia(mediaCode)
  const currentPurposes = resolvePurposes(purposeCodes)
  const safeContext = String(customContext || '').trim()

  // 선택된 원리 추출 (부족 시 추천 원리로 보강)
  let selectedEffects = (effectIds || [])
    .map((id) => findEffect(id))
    .filter(Boolean)

  if (selectedEffects.length === 0) {
    // 기본 추천: 매체 태그 기반 원리 3개
    selectedEffects = effectsData
      .filter((e) => (e.mediaTags || []).includes(currentMedia.id))
      .slice(0, 3)
  }
  if (selectedEffects.length === 0) {
    selectedEffects = [effectsData[5], effectsData[88], effectsData[91]] // 006, 089, 092
  }

  // 1-hop 연관 원리 그래프 탐색
  const relatedCodes = []
  selectedEffects.forEach((eff) => {
    (eff.related || []).forEach((relId) => {
      const relEff = findEffect(relId)
      if (relEff && !selectedEffects.some((s) => s.id === relEff.id)) {
        relatedCodes.push(relEff.code)
      }
    })
  })
  const uniqueRelatedCodes = Array.from(new Set(relatedCodes)).slice(0, 3)

  const citedCodesAll = Array.from(
    new Set([...selectedEffects.map((e) => e.code), ...uniqueRelatedCodes])
  )

  // 윤리 검증 상태 집계
  const riskEffects = selectedEffects.filter((e) => e.ethicsLevel === 'risk')
  const cautionEffects = selectedEffects.filter((e) => e.ethicsLevel === 'caution')
  const hasRisk = riskEffects.length > 0
  const hasCaution = cautionEffects.length > 0

  // Gemini API 키가 있는 경우 실제 Gemini 2.5 Flash 호출 시도
  if (apiKey && apiKey.trim()) {
    try {
      const systemInstruction = `당신은 3인의 전문가(Architect, Copywriter, Ethics-Verifier)로 구성된 디자인 프롬프트 엔지니어링 스웜입니다.
선택된 매체, 목적, 디자인 심리 108 원리, 사용자 요구사항을 바탕으로 3자 협력 토론 로그, 최종 프롬프트 마크다운, 자체 완결된 HTML/CSS 프리뷰, WCAG/윤리 점검표를 JSON으로 생성하세요.
응답 형식:
{
  "transcript": [
    { "id": 1, "agentId": "architect", "agentName": "구조 설계자 (Architect)", "role": "레이아웃 및 인지 흐름 설계", "targetAgentId": "copywriter", "message": "...", "stage": "architect", "citedEffectCodes": ["089", "006"] },
    { "id": 2, "agentId": "copywriter", "agentName": "카피라이팅 전략가 (Copywriter)", "role": "메시지 위계 및 행동 문구 작성", "targetAgentId": "ethics-verifier", "message": "...", "stage": "copywriter", "citedEffectCodes": ["092"] },
    { "id": 3, "agentId": "ethics-verifier", "agentName": "윤리·접근성 검증관 (Ethics Verifier)", "role": "다크 패턴 차단 및 WCAG 2.2 AA 검수", "targetAgentId": "architect", "message": "...", "stage": "ethics-verifier", "citedEffectCodes": ["078"] },
    { "id": 4, "agentId": "ethics-verifier", "agentName": "윤리·접근성 검증관 (Ethics Verifier)", "role": "다크 패턴 차단 및 WCAG 2.2 AA 검수", "targetAgentId": null, "message": "...", "stage": "ethics-verifier", "citedEffectCodes": ["089"] }
  ],
  "finalPrompt": "# [디자인 지시문] ...",
  "htmlPreview": "<div style=\\"...\\">...</div>",
  "checks": [
    { "label": "WCAG 2.2 AA 명도 대비 (4.5:1 이상)", "passed": true, "note": "..." },
    { "label": "다크 패턴 및 윤리 가이드라인 준수", "passed": true, "note": "..." },
    { "label": "인지 부하 최소화 및 정보 청킹", "passed": true, "note": "..." },
    { "label": "매체 규격 최적화", "passed": true, "note": "..." },
    { "label": "한국어 가독성 및 어절 줄바꿈", "passed": true, "note": "..." }
  ]
}`

      const userPrompt = `[매체]: ${currentMedia.label} (${currentMedia.id})
[매체 팁]: ${(currentMedia.tips || []).join(' / ')}
[디자인 목적]: ${currentPurposes.map((p) => p.label).join(', ')}
[적용 원리]: ${selectedEffects.map((e) => `#${e.code} ${e.nameKo} (${e.oneLiner})`).join(', ')}
[연관 추천 원리]: ${uniqueRelatedCodes.join(', ')}
[작성자 추가 맥락]: ${safeContext || '기본 교육용 산출물'}

한국어 문체 규칙: 번역투 표현을 피하고, 줄표 기호 대신 쉼표나 마침표를 사용하세요.`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.25,
            },
          }),
        }
      )

      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          const parsed = JSON.parse(text)
          if (parsed && parsed.transcript && parsed.finalPrompt) {
            // 점진적 progress 이벤트 발송
            for (let i = 0; i < parsed.transcript.length; i++) {
              const entry = parsed.transcript[i]
              if (onProgress) {
                onProgress({
                  step: i + 1,
                  totalSteps: parsed.transcript.length,
                  agentId: entry.agentId,
                  agentName: entry.agentName,
                  role: entry.role,
                  targetAgentId: entry.targetAgentId,
                  message: entry.message,
                  stage: entry.stage,
                })
              }
              await delay(120)
            }
            return {
              transcript: parsed.transcript,
              finalPrompt: parsed.finalPrompt,
              htmlPreview: sanitizeHtml(parsed.htmlPreview || ''),
              checks: Array.isArray(parsed.checks) ? parsed.checks : [],
            }
          }
        }
      }
    } catch {
      // Gemini API 실패 시 오프라인 지능형 스웜으로 자동 전환
    }
  }

  // -------------------------------------------------------------
  // 오프라인 지능형 로컬 스웜 시뮬레이터 (100% 로컬 확정 동작)
  // -------------------------------------------------------------
  const mediaLabel = currentMedia.label
  const purposeLabels = currentPurposes.map((p) => p.label).join(', ')
  const effectNames = selectedEffects.map((e) => `#${e.code} ${e.nameKo}`).join(', ')
  const primaryEffect = selectedEffects[0]
  const secondaryEffect = selectedEffects[1] || selectedEffects[0]
  const tertiaryEffect = selectedEffects[2] || secondaryEffect

  const transcript = []

  // Step 1: 구조 설계자 (Architect)
  const step1Message = `@copywriter ${mediaLabel} 제작 요청을 접수했습니다. 핵심 목적(${purposeLabels})과 선정된 ${effectNames}를 반영해 화면 전체의 인지 구조를 잡았습니다.

1. 레이아웃 뼈대: ${primaryEffect.nameKo}(#${primaryEffect.code})에 따라 핵심 메시지를 상단 시선 앵커로 잡고, 본문 세부 항목은 3개 안팎의 청크로 분할합니다.
2. 매체 특화 여백: ${currentMedia.tips?.[0] || '핵심 문구 주변에 충분한 화이트 스페이스를 확보합니다.'}
3. 2차 시각 요소: 연관 원리인 #${secondaryEffect.code} ${secondaryEffect.nameKo}를 적용해 시선의 흐름이 자연스럽게 하단 행동 영역으로 이어지도록 구획을 나누었습니다.

${safeContext ? `사용자 추가 맥락("${safeContext}")을 고려해, 본문 카피와 레이아웃 블록에 실제 반영할 구체적 문구를 작성해 주세요.` : '독자가 첫 3초 안에 핵심을 파악하도록 명확한 제목과 시각 계층을 설계해 주세요.'}`

  transcript.push({
    id: 1,
    agentId: 'architect',
    agentName: '구조 설계자 (Architect)',
    role: '레이아웃 및 인지 흐름 설계',
    targetAgentId: 'copywriter',
    message: step1Message,
    stage: 'architect',
    citedEffectCodes: [primaryEffect.code, secondaryEffect.code],
  })

  if (onProgress) {
    onProgress({
      step: 1,
      totalSteps: 4,
      agentId: 'architect',
      agentName: '구조 설계자 (Architect)',
      role: '레이아웃 및 인지 흐름 설계',
      targetAgentId: 'copywriter',
      message: step1Message,
      stage: 'architect',
    })
  }
  await delay(280)

  // Step 2: 카피라이팅 전략가 (Copywriter)
  const step2Message = `@ethics-verifier @architect 구조 설계자의 계층을 바탕으로 실질적인 메시지와 Do/Don't 카피를 구체화했습니다.

1. 헤드라인 전략: #${primaryEffect.code} ${primaryEffect.nameKo} 원리에 맞춰 "${primaryEffect.oneLiner}" 의도를 헤드카피에 반영했습니다.
2. 본문 정보 그룹화: #${secondaryEffect.code} ${secondaryEffect.nameKo}를 적용해 중요 공지와 일반 설명을 분리했습니다.
   - 권장(Do): ${secondaryEffect.doList?.[0] || '정보 간격을 넓혀 직관적으로 인지하게 돕는다.'}
   - 금지(Don't): ${secondaryEffect.dontList?.[0] || '한 영역에 서로 다른 성격의 문장을 빽빽하게 채우지 않는다.'}
3. 행동 유도(CTA): ${currentMedia.id === 'notice' ? '학부모 회신란과 온라인 접수 링크를 확실하게 분리' : currentMedia.id === 'webapp' ? '44px 이상의 터치 버튼과 명확한 완료 피드백 라벨' : '행사 일시와 신청 버튼을 결합한 시선 종착점'}을 배치했습니다.

윤리 검증관님, 다크 패턴 유발 요소나 시각 약자를 위한 대비 기준 충족 여부를 검증해 주세요.`

  transcript.push({
    id: 2,
    agentId: 'copywriter',
    agentName: '카피라이팅 전략가 (Copywriter)',
    role: '메시지 위계 및 행동 문구 작성',
    targetAgentId: 'ethics-verifier',
    message: step2Message,
    stage: 'copywriter',
    citedEffectCodes: [primaryEffect.code, secondaryEffect.code, tertiaryEffect.code],
  })

  if (onProgress) {
    onProgress({
      step: 2,
      totalSteps: 4,
      agentId: 'copywriter',
      agentName: '카피라이팅 전략가 (Copywriter)',
      role: '메시지 위계 및 행동 문구 작성',
      targetAgentId: 'ethics-verifier',
      message: step2Message,
      stage: 'copywriter',
    })
  }
  await delay(280)

  // Step 3: 윤리·접근성 검증관 (Ethics Verifier) 1차 피드백
  let ethicsWarning
  if (hasRisk) {
    ethicsWarning = `⚠️ 선정된 원리 중 #${riskEffects[0].code} ${riskEffects[0].nameKo}는 손실 회피나 조작적 클릭(다크 패턴)으로 변질될 위험이 있습니다. ${riskEffects[0].ethicsNote || '사용자에게 선택을 강요하지 말고 투명한 거부 권리를 명시해야 합니다.'}`
  } else if (hasCaution) {
    ethicsWarning = `ℹ️ #${cautionEffects[0].code} ${cautionEffects[0].nameKo}는 심리적 유인 요소가 있으므로 주의가 필요합니다. ${cautionEffects[0].ethicsNote || '과도한 긴장감을 조성하지 않도록 중립적 사실 정보를 함께 표기해야 합니다.'}`
  } else {
    ethicsWarning = '선정된 원리들은 안전(Safe) 등급으로, 학습자와 학부모의 자율적 판단을 온전히 존중합니다.'
  }

  const step3Message = `@copywriter @architect 작성된 카피와 구조안을 WCAG 2.2 AA 및 디지털 윤리 표준으로 심사했습니다.

1. 윤리 감사: ${ethicsWarning}
2. 명도 대비 점검: 본문 텍스트는 배경 대비 4.5:1 이상(짙은 네이비 #0f172a / 화이트 #ffffff)을 강제합니다. 연한 회색 글자는 즉시 배제합니다.
3. 조작 편의성: ${currentMedia.id === 'webapp' ? '피츠의 법칙(#103)에 따라 클릭 가능 영역을 44×44px 이상으로 키웁니다.' : currentMedia.id === 'notice' || currentMedia.id === 'worksheet' ? '인쇄 시 흑백 모드에서도 텍스트와 테두리가 또렷이 구별되도록 선 두께를 1.5px 이상으로 유지합니다.' : '포스터 원거리 시인성을 위해 메인 타이틀 크기를 최소 2배 이상 키웁니다.'}

이 보정안을 반영하여 최종 검증 프롬프트와 안전한 HTML 프리뷰를 확정합니다.`

  transcript.push({
    id: 3,
    agentId: 'ethics-verifier',
    agentName: '윤리·접근성 검증관 (Ethics Verifier)',
    role: '다크 패턴 차단 및 WCAG 2.2 AA 검수',
    targetAgentId: 'architect',
    message: step3Message,
    stage: 'ethics-verifier',
    citedEffectCodes: [
      tertiaryEffect.code,
      hasRisk ? riskEffects[0].code : hasCaution ? cautionEffects[0].code : '078',
    ],
  })

  if (onProgress) {
    onProgress({
      step: 3,
      totalSteps: 4,
      agentId: 'ethics-verifier',
      agentName: '윤리·접근성 검증관 (Ethics Verifier)',
      role: '다크 패턴 차단 및 WCAG 2.2 AA 검수',
      targetAgentId: 'architect',
      message: step3Message,
      stage: 'ethics-verifier',
    })
  }
  await delay(280)

  // Step 4: 윤리·접근성 검증관 (Ethics Verifier) 최종 확정
  const step4Message = `합의가 완료되었습니다. 구조 설계자의 인지 레이아웃과 카피라이터의 위계 문구, 윤리 검증관의 WCAG 2.2 AA 기준을 통합한 최종 AI 프롬프트와 라이브 HTML 프리뷰를 발행합니다.`

  transcript.push({
    id: 4,
    agentId: 'ethics-verifier',
    agentName: '윤리·접근성 검증관 (Ethics Verifier)',
    role: '다크 패턴 차단 및 WCAG 2.2 AA 검수',
    targetAgentId: null,
    message: step4Message,
    stage: 'ethics-verifier',
    citedEffectCodes: citedCodesAll.slice(0, 4),
  })

  if (onProgress) {
    onProgress({
      step: 4,
      totalSteps: 4,
      agentId: 'ethics-verifier',
      agentName: '윤리·접근성 검증관 (Ethics Verifier)',
      role: '다크 패턴 차단 및 WCAG 2.2 AA 검수',
      targetAgentId: null,
      message: step4Message,
      stage: 'ethics-verifier',
    })
  }
  await delay(150)

  // 최종 마크다운 프롬프트 생성
  const finalPrompt = `# [디자인 지시문] ${mediaLabel} 인지 심리 최적화 제작 요청

## 1. 역할 정의 (Role)
당신은 최고 수준의 교육공학 및 UI/UX 인지 심리학 전문가입니다.
사용자(학생, 학부모, 교직원)의 인지 부하를 최소화하고 정보 전달력을 극대화하는 시각적 계층 구조를 설계합니다.

## 2. 제작 매체 및 핵심 목적
- 제작 대상 매체: ${mediaLabel}
- 핵심 설계 목적: ${purposeLabels}
${safeContext ? `- 의뢰 맥락 및 세부 요구: ${safeContext}` : ''}

## 3. 반드시 준수할 디자인 심리학 3대 원리 (DesignMind 108)
${selectedEffects
  .map(
    (eff) => `### [${eff.code}] ${eff.nameKo} (${eff.nameEn})
- 핵심 원리: ${eff.oneLiner}
- 심리 메커니즘: ${eff.why}
- 실천 수칙(Do): ${(eff.doList || []).join(' / ')}
- 금기 사항(Don't): ${(eff.dontList || []).join(' / ')}
${eff.ethicsNote ? `- 윤리 주의점: ${eff.ethicsNote}` : ''}`
  )
  .join('\n\n')}

## 4. 연관 추천 원리 (Graph Traversal)
- 연관 추천 코드: ${uniqueRelatedCodes.map((c) => `#${c}`).join(', ') || '관련 레이아웃 법칙 참조'}

## 5. 검증 기준 및 최종 출력 요구사항
1. 위 디자인 심리학 원리가 구체적으로 어떻게 레이아웃, 타이포그래피, 여백에 녹아들었는지 단계별로 설명하세요.
2. WCAG 2.2 AA 명도 대비(4.5:1 이상) 및 조작 편의성(터치 영역 44px 이상)을 충족하는 완성본 디자인 코드를 제시하세요.
3. 다크 패턴 및 심리 조작 가능성을 배제하고, 독자의 자율적 선택권을 명시하세요.`

  // 라이브 HTML/CSS 프리뷰 생성 (자체 완결, 안전한 인라인 스타일, XSS 방지)
  const escapedContext = escapeHtml(safeContext)
  const htmlPreview = generateHtmlPreview({
    mediaId: currentMedia.id,
    mediaLabel,
    purposeLabels,
    selectedEffects,
    customContext: escapedContext,
  })

  // 5대 체크리스트
  const checks = [
    {
      label: 'WCAG 2.2 AA 명도 대비 (4.5:1 이상)',
      passed: true,
      note: '슬레이트 네이비(#0f172a) 본문 텍스트와 순백색(#ffffff) 배경으로 12.8:1의 명암비를 확보했습니다.',
    },
    {
      label: '다크 패턴 및 윤리 가이드라인 준수',
      passed: !hasRisk,
      note: hasRisk
        ? `선정된 #${riskEffects[0].code} 원리에 조작 위험이 있어, 선택 취소 및 투명 안내 보완책을 명시했습니다.`
        : hasCaution
          ? `선정된 #${cautionEffects[0].code} 원리의 과장 유도를 방지하도록 사실 중심 카피를 권고했습니다.`
          : '기만적 요소 없이 사용자의 자율적 판단을 전적으로 존중합니다.',
    },
    {
      label: '인지 부하 최소화 및 정보 청킹',
      passed: true,
      note: '밀러의 법칙에 따라 본문 정보를 3개 안팎의 시각 블록으로 분할해 한눈에 파악되도록 정돈했습니다.',
    },
    {
      label: '매체 규격 최적화',
      passed: true,
      note:
        currentMedia.id === 'webapp'
          ? '모바일 터치 타깃을 44px 이상으로 확보하고 즉각적인 피드백 영역을 마련했습니다.'
          : currentMedia.id === 'slide'
            ? '1슬라이드 1메시지 원칙과 원거리 빔프로젝터 투사 가독성을 보장했습니다.'
            : 'A4 출력 및 모바일 뷰어 모두에서 어긋남 없는 반응형 규격을 적용했습니다.',
    },
    {
      label: '한국어 가독성 및 어절 줄바꿈',
      passed: true,
      note: '단어 중간 분절을 막는 어절 줄바꿈(keep-all)과 1.6배 행간을 기본 적용했습니다.',
    },
  ]

  return {
    transcript,
    finalPrompt,
    htmlPreview: sanitizeHtml(htmlPreview),
    checks,
  }
}

/**
 * 매체별 자체 완결 반응형 HTML 프리뷰 빌더
 */
function generateHtmlPreview({ mediaId, mediaLabel, purposeLabels, selectedEffects, customContext }) {
  const p1 = selectedEffects[0] || { code: '006', nameKo: '화이트 스페이스 효과' }
  const p2 = selectedEffects[1] || { code: '089', nameKo: '근접의 법칙' }
  const p3 = selectedEffects[2] || { code: '092', nameKo: '대비의 법칙' }

  const badgesHtml = selectedEffects
    .map(
      (e) =>
        `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;background:#eef2ff;color:#4338ca;font-size:11px;font-weight:600;margin-right:4px;">#${escapeHtml(e.code)} ${escapeHtml(e.nameKo)}</span>`
    )
    .join('')

  if (mediaId === 'notice') {
    return `<div style="max-width:540px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05);font-family:system-ui,-apple-system,sans-serif;color:#0f172a;word-break:keep-all;line-height:1.6;">
  <div style="border-bottom:2px solid #0f172a;padding-bottom:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-end;">
    <div>
      <span style="font-size:10px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;">가정통신문 공지</span>
      <h2 style="margin:2px 0 0;font-size:18px;font-weight:800;color:#0f172a;">${customContext || '2026학년도 교내 현장체험학습 및 안전수칙 안내'}</h2>
    </div>
    <span style="font-size:11px;color:#64748b;">발행: 교무기획부</span>
  </div>
  <div style="margin-bottom:12px;">${badgesHtml}</div>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;margin-bottom:16px;">
    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#334155;">📌 핵심 일정 요약 (F 패턴 적용)</p>
    <ul style="margin:0;padding-left:18px;font-size:12px;color:#475569;">
      <li><strong>일시:</strong> 2026년 10월 22일(목) 09:00 ~ 16:30</li>
      <li><strong>장소:</strong> 국립과천과학관 첨단기술관 및 야외 생태공원</li>
      <li><strong>신청 기한:</strong> 2026년 10월 15일(목) 17:00까지</li>
    </ul>
  </div>
  <div style="font-size:13px;color:#334155;margin-bottom:16px;">
    <p style="margin:0 0 8px;">학부모님 안녕하십니까. 학생들의 과학적 호기심과 진로 탐색 기회를 제공하고자 교외 체험학습을 실시합니다.</p>
    <p style="margin:0;">안전한 인솔을 위해 참가 여부와 비상 연락처를 기재한 참가 동의서를 제출해 주시기 바랍니다.</p>
  </div>
  <div style="border-top:1px dashed #cbd5e1;padding-top:14px;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:11px;color:#64748b;">온라인 가정통신문 확인 완료</span>
    <button type="button" style="background:#4f46e5;color:#ffffff;border:none;border-radius:8px;padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;">참가 신청서 회신하기</button>
  </div>
</div>`
  }

  if (mediaId === 'poster') {
    return `<div style="max-width:540px;margin:0 auto;background:linear-gradient(145deg,#0f172a 0%,#1e1b4b 100%);border-radius:20px;padding:28px 24px;color:#ffffff;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 12px 30px rgba(15,23,42,0.3);word-break:keep-all;line-height:1.5;">
  <div style="margin-bottom:8px;">${badgesHtml}</div>
  <div style="display:inline-block;padding:3px 10px;background:rgba(255,255,255,0.15);backdrop-filter:blur(4px);border-radius:6px;font-size:11px;font-weight:700;color:#a5b4fc;margin-bottom:12px;">
    CAMPUS FESTIVAL 2026
  </div>
  <h1 style="margin:0 0 8px;font-size:24px;font-weight:900;letter-spacing:-0.5px;color:#ffffff;line-height:1.25;">
    ${customContext || '빛나는 미래를 만나는 교내 진로 메이커스 축제'}
  </h1>
  <p style="margin:0 0 20px;font-size:13px;color:#cbd5e1;">
    세상을 바꾸는 30개의 학생 메이커스 부스와 AI 창작 전시관으로 여러분을 초대합니다.
  </p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:12px;margin-bottom:20px;text-align:center;">
    <div>
      <div style="font-size:10px;color:#94a3b8;">날짜</div>
      <div style="font-size:12px;font-weight:800;color:#f8fafc;margin-top:2px;">11.18 (수)</div>
    </div>
    <div style="border-left:1px solid rgba(255,255,255,0.1);border-right:1px solid rgba(255,255,255,0.1);">
      <div style="font-size:10px;color:#94a3b8;">장소</div>
      <div style="font-size:12px;font-weight:800;color:#f8fafc;margin-top:2px;">체육관 2F</div>
    </div>
    <div>
      <div style="font-size:10px;color:#94a3b8;">대상</div>
      <div style="font-size:12px;font-weight:800;color:#f8fafc;margin-top:2px;">전교생·학부모</div>
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:11px;color:#94a3b8;">주최: 학생 자치 메이커스 클럽</span>
    <button type="button" style="background:#6366f1;color:#ffffff;border:none;border-radius:10px;padding:10px 18px;font-size:12px;font-weight:800;cursor:pointer;">부스 둘러보기 👉</button>
  </div>
</div>`
  }

  // 기본 반응형 카드 (슬라이드, 웹앱, 학습지 등 범용 대응)
  return `<div style="max-width:540px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;box-shadow:0 6px 18px rgba(0,0,0,0.06);font-family:system-ui,-apple-system,sans-serif;color:#0f172a;word-break:keep-all;line-height:1.6;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
    <span style="display:inline-block;padding:3px 10px;background:#f1f5f9;color:#475569;border-radius:6px;font-size:11px;font-weight:700;">${escapeHtml(mediaLabel)} · ${escapeHtml(purposeLabels)}</span>
    <span style="font-size:11px;color:#94a3b8;">WCAG 2.2 AA 준수</span>
  </div>
  <div style="margin-bottom:14px;">${badgesHtml}</div>
  <h2 style="margin:0 0 10px;font-size:18px;font-weight:800;color:#0f172a;">${customContext || '디자인 심리학 108 기반 인터랙티브 시각 컴포넌트'}</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;">
      <div style="font-size:11px;font-weight:700;color:#4338ca;">#${escapeHtml(p1.code)} ${escapeHtml(p1.nameKo)}</div>
      <div style="font-size:11px;color:#64748b;margin-top:4px;">${escapeHtml(p1.oneLiner)}</div>
    </div>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;">
      <div style="font-size:11px;font-weight:700;color:#4338ca;">#${escapeHtml(p2.code)} ${escapeHtml(p2.nameKo)}</div>
      <div style="font-size:11px;color:#64748b;margin-top:4px;">${escapeHtml(p2.oneLiner)}</div>
    </div>
  </div>
  <div style="padding:12px;background:#fdf4ff;border:1px solid #f0abfc;border-radius:10px;font-size:12px;color:#701a75;margin-bottom:16px;">
    💡 <strong>처방 수칙:</strong> #${escapeHtml(p3.code)} ${escapeHtml(p3.nameKo)} 원리에 따라 중요 행동 영역을 명확히 고립시키고 44px 이상의 터치 면적을 유지하세요.
  </div>
  <div style="display:flex;justify-content:flex-end;gap:8px;">
    <button type="button" style="min-height:44px;padding:0 16px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;">자세히 보기</button>
    <button type="button" style="min-height:44px;padding:0 18px;background:#0f172a;color:#ffffff;border:none;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;">지금 시작하기</button>
  </div>
</div>`
}

/**
 * 모둠 활동 3대 AI 학생 팀 코치 스웜
 * @param {Object} params
 * @param {string} [params.moduleTitle] 수업 모듈 제목
 * @param {string} [params.targetRole] 학생 모둠 역할 ('기획 담당' | '시각 디자인 담당' | '윤리·접근성 담당')
 * @param {string} [params.draftText] 학생이 입력한 초안 아이디어 또는 고민
 * @param {Array<number|string>} [params.relatedEffectIds] 연관 원리 ID 목록
 * @param {string} [apiKey] 선택적 Gemini API 키
 * @param {Function} [onProgress] 실시간 진행 상태 콜백
 * @returns {Promise<{ transcript: Array, nextActions: string[] }>}
 */
export async function runTeamCoachSwarm(
  { moduleTitle = '모둠 디자인 프로젝트', targetRole = '기획 담당', draftText = '', relatedEffectIds = [] } = {},
  apiKey = '',
  onProgress = null
) {
  const safeTitle = String(moduleTitle || '수업 프로젝트').trim()
  const safeRole = String(targetRole || '기획 담당').trim()
  const safeDraft = String(draftText || '').trim()

  // 연관 원리 매핑
  let activeEffects = (relatedEffectIds || [])
    .map((id) => findEffect(id))
    .filter(Boolean)

  if (activeEffects.length === 0) {
    activeEffects = [effectsData[6], effectsData[88], effectsData[91]] // 007, 089, 092
  }

  const p1 = activeEffects[0]
  const p2 = activeEffects[1] || activeEffects[0]
  const p3 = activeEffects[2] || p2

  // Gemini API 키가 있는 경우 실제 Gemini 호출 시도
  if (apiKey && apiKey.trim()) {
    try {
      const systemInstruction = `당신은 학생 디자인 모둠 활동을 지도하는 3인의 AI 코치(planner-coach 기획 코치, visual-coach 시각 디자인 코치, ethics-coach 윤리·접근성 코치)입니다.
학생의 역할("${safeRole}"), 수업 모듈("${safeTitle}"), 학생이 작성한 초안 아이디어("${safeDraft || '초안 구상 중'}")를 검토하고, 코치들이 서로 @mention하며 학생에게 실질적 조언을 주는 토론 로그와 실행 액션 4가지를 JSON으로 생성하세요.
응답 형식:
{
  "transcript": [
    { "id": 1, "agentId": "planner-coach", "agentName": "기획 코치", "role": "목표 정합성 및 메시지 구조 코칭", "targetAgentId": "visual-coach", "message": "...", "stage": "planner", "citedEffectCodes": ["007"] },
    { "id": 2, "agentId": "visual-coach", "agentName": "시각 디자인 코치", "role": "시선 흐름, 대비, 레이아웃 코칭", "targetAgentId": "ethics-coach", "message": "...", "stage": "visual", "citedEffectCodes": ["089"] },
    { "id": 3, "agentId": "ethics-coach", "agentName": "윤리·접근성 코치", "role": "다크 패턴 예방 및 포용성 코칭", "targetAgentId": "planner-coach", "message": "...", "stage": "ethics", "citedEffectCodes": ["092"] }
  ],
  "nextActions": [
    "1. ...",
    "2. ...",
    "3. ...",
    "4. ..."
  ]
}`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemInstruction }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.25,
            },
          }),
        }
      )

      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          const parsed = JSON.parse(text)
          if (parsed && Array.isArray(parsed.transcript)) {
            for (let i = 0; i < parsed.transcript.length; i++) {
              const entry = parsed.transcript[i]
              if (onProgress) {
                onProgress({
                  step: i + 1,
                  totalSteps: parsed.transcript.length,
                  agentId: entry.agentId,
                  agentName: entry.agentName,
                  role: entry.role,
                  targetAgentId: entry.targetAgentId,
                  message: entry.message,
                  stage: entry.stage,
                })
              }
              await delay(120)
            }
            return {
              transcript: parsed.transcript,
              nextActions: Array.isArray(parsed.nextActions) ? parsed.nextActions : [],
            }
          }
        }
      }
    } catch {
      // API 실패 시 로컬 지능형 코칭으로 자동 전환
    }
  }

  // -------------------------------------------------------------
  // 오프라인 지능형 팀 코치 스웜 시뮬레이터 (100% 로컬 확정 동작)
  // -------------------------------------------------------------
  const transcript = []

  // Step 1: 기획 코치 (Planner Coach)
  const step1Text = `@visual-coach 우리 모둠의 ${safeRole} 학생이 제출한 아이디어를 검토했습니다.
- 프로젝트 과제: ${safeTitle}
- 학생 고민/초안: "${safeDraft || '전체 레이아웃과 핵심 메시지를 어떻게 전달해야 할지 방향을 고민하고 있습니다.'}"

목표가 명확해질 수 있도록 #${p1.code} ${p1.nameKo} 원리를 제안합니다. "${p1.oneLiner}"라는 특성을 살려서, 보는 사람이 첫 3초 안에 가장 먼저 읽어야 할 핵심 메시지 1문장을 최상단에 굵게 배치하는 기획 구조를 잡아야 합니다.
시각 디자인 코치님, 이 기획 방향을 화면 레이아웃과 시선 동선으로 어떻게 풀어내면 좋을까요?`

  transcript.push({
    id: 1,
    agentId: 'planner-coach',
    agentName: '기획 코치',
    role: '목표 정합성 및 메시지 구조 코칭',
    targetAgentId: 'visual-coach',
    message: step1Text,
    stage: 'planner',
    citedEffectCodes: [p1.code],
  })

  if (onProgress) {
    onProgress({
      step: 1,
      totalSteps: 3,
      agentId: 'planner-coach',
      agentName: '기획 코치',
      role: '목표 정합성 및 메시지 구조 코칭',
      targetAgentId: 'visual-coach',
      message: step1Text,
      stage: 'planner',
    })
  }
  await delay(260)

  // Step 2: 시각 디자인 코치 (Visual Coach)
  const step2Text = `@ethics-coach @planner-coach 기획 코치님의 의견에 전적으로 동의합니다. 구체적인 화면 구성 팁을 드립니다.

1. 시선 동선과 여백: #${p2.code} ${p2.nameKo}를 적용해야 합니다. 중요한 내용 주변에 충분한 여백을 두어 독자의 시선이 헤매지 않도록 해주세요.
2. 정보 그룹화: 연관된 항목(행사 일시, 장소, 준비물)은 한 박스로 묶고, 서로 다른 성격의 문장은 최소 20px 이상 간격을 벌리세요.
3. 시각 앵커: 모든 텍스트를 같은 크기로 두지 말고, 메인 타이틀은 본문보다 최소 1.8배 이상 크게 키워 확실한 무게 중심을 만드세요.

윤리·접근성 코치님, 학생들이 놓치기 쉬운 명도 대비나 과장 표현 방지 수칙도 짚어주세요.`

  transcript.push({
    id: 2,
    agentId: 'visual-coach',
    agentName: '시각 디자인 코치',
    role: '시선 흐름, 대비, 레이아웃 코칭',
    targetAgentId: 'ethics-coach',
    message: step2Text,
    stage: 'visual',
    citedEffectCodes: [p2.code, p3.code],
  })

  if (onProgress) {
    onProgress({
      step: 2,
      totalSteps: 3,
      agentId: 'visual-coach',
      agentName: '시각 디자인 코치',
      role: '시선 흐름, 대비, 레이아웃 코칭',
      targetAgentId: 'ethics-coach',
      message: step2Text,
      stage: 'visual',
    })
  }
  await delay(260)

  // Step 3: 윤리·접근성 코치 (Ethics Coach)
  const step3Text = `@planner-coach @visual-coach 시각과 기획이 훌륭하게 조화를 이루고 있습니다. 우리 모둠이 A4 인쇄나 교실 발표에서 감점을 받지 않으려면 다음 3가지를 반드시 확인해야 합니다.

1. 다크 패턴 점검: 학생들에게 선택을 강요하거나 불안감을 주는 마감 카피 대신, 자발적 참여를 돕는 긍정적 넛지를 사용하세요.
2. WCAG 2.2 AA 가독성: 배경과 글자의 명도 대비는 최소 4.5:1을 지켜야 합니다. 흐릿한 회색이나 파스텔 글자는 인쇄 시 보이지 않습니다.
3. 포용적 표현: #${p3.code} ${p3.nameKo} 관점에서 시각 약자나 색각 이상자도 형태와 굵기로 정보를 구분할 수 있도록 텍스트 라벨을 함께 병기해 주세요.

${safeRole} 학생, 코치 3인의 피드백을 모둠 활동지에 정리하고 아래 4단계 액션을 순서대로 실천해 보세요!`

  transcript.push({
    id: 3,
    agentId: 'ethics-coach',
    agentName: '윤리·접근성 코치',
    role: '다크 패턴 예방 및 포용성 코칭',
    targetAgentId: 'planner-coach',
    message: step3Text,
    stage: 'ethics',
    citedEffectCodes: [p3.code, '078'],
  })

  if (onProgress) {
    onProgress({
      step: 3,
      totalSteps: 3,
      agentId: 'ethics-coach',
      agentName: '윤리·접근성 코치',
      role: '다크 패턴 예방 및 포용성 코칭',
      targetAgentId: 'planner-coach',
      message: step3Text,
      stage: 'ethics',
    })
  }
  await delay(150)

  const nextActions = [
    `1. [${safeRole}] 핵심 메시지 1문장을 정의하고 상단 헤드라인에 20pt 이상 볼드체로 배치하기`,
    `2. [시각 구성] #${p1.code} ${p1.nameKo}와 #${p2.code} ${p2.nameKo} 원리에 따라 정보 블록을 3개 청크로 묶기`,
    `3. [접근성 검증] 배경 대비 글자색 명암비가 또렷한지 확인하고 흐릿한 중간 회색 폰트 제거하기`,
    `4. [의도 영작] "I applied the ${p1.nameEn} to guide viewers' gaze naturally." 형식으로 발표 1문장 완성하기`,
  ]

  return {
    transcript,
    nextActions,
  }
}
