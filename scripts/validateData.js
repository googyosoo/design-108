import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'src', 'data')

console.log('[validateData] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('[validateData] 🛡️ DesignMind 108 데이터 무결성 검증 (Zod Schema)')
console.log('[validateData] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

function readJson(filename) {
  const filePath = path.join(dataDir, filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`[validateData] 파일 누락: ${filename}`)
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

let totalErrors = 0

// 1. chapters.json
try {
  const chapters = readJson('chapters.json')
  const ChapterSchema = z.array(
    z.object({
      id: z.enum(['psychology', 'illusion', 'color', 'layout']),
      no: z.number().int().min(1).max(4),
      nameKo: z.string().min(1),
      nameEn: z.string().min(1),
      range: z.tuple([z.number(), z.number()]),
      colorToken: z.string().startsWith('--ch-'),
      intro: z.string().min(1),
    })
  ).length(4)

  ChapterSchema.parse(chapters)
  console.log(`[validateData] ✓ chapters.json: 4개 챕터 정상`)
} catch (err) {
  console.error(`[validateData] ✗ chapters.json 오류:`, err.message)
  totalErrors++
}

// 2. purposes.json
try {
  const purposes = readJson('purposes.json')
  const PurposeSchema = z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      icon: z.string().min(1),
      description: z.string().min(1),
    })
  ).length(11)

  PurposeSchema.parse(purposes)
  console.log(`[validateData] ✓ purposes.json: 11개 목적 태그 정상`)
} catch (err) {
  console.error(`[validateData] ✗ purposes.json 오류:`, err.message)
  totalErrors++
}

// 3. media.json
try {
  const media = readJson('media.json')
  const MediaSchema = z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      icon: z.string().min(1),
      tips: z.array(z.string().min(1)).min(2),
    })
  ).length(7)

  MediaSchema.parse(media)
  console.log(`[validateData] ✓ media.json: 7개 매체 태그 정상`)
} catch (err) {
  console.error(`[validateData] ✗ media.json 오류:`, err.message)
  totalErrors++
}

// 4. effects.json (108개)
try {
  const effectsData = readJson('effects.json')
  if (effectsData.length !== 108) {
    throw new Error(`원리 개수가 108개가 아닙니다 (현재 ${effectsData.length}개)`)
  }

  const EffectSchema = z.object({
    id: z.number().int().min(1).max(108),
    code: z.string().regex(/^\d{3}$/),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    chapter: z.enum(['psychology', 'illusion', 'color', 'layout']),
    nameKo: z.string().min(1),
    nameEn: z.string().min(1),
    aliasesKo: z.array(z.string()),
    oneLiner: z.string().max(40, 'oneLiner는 40자 이내여야 합니다'),
    oneLinerEn: z.string().min(1),
    why: z.string().max(160, 'why는 160자 이내여야 합니다'),
    analogy: z.string().max(80, 'analogy는 80자 이내여야 합니다'),
    apply: z.object({
      classroom: z.string().max(90, 'apply.classroom은 90자 이내여야 합니다'),
      webapp: z.string().max(90, 'apply.webapp은 90자 이내여야 합니다'),
      print: z.string().max(90, 'apply.print는 90자 이내여야 합니다'),
    }),
    doList: z.array(z.string().max(50, 'doList 항목은 50자 이내여야 합니다')).min(2).max(2),
    dontList: z.array(z.string().max(50, 'dontList 항목은 50자 이내여야 합니다')).min(2).max(2),
    ethicsLevel: z.enum(['safe', 'caution', 'risk']),
    ethicsNote: z.string().max(100, 'ethicsNote는 100자 이내여야 합니다').nullable(),
    promptSnippet: z.object({
      ko: z.string().min(1),
      en: z.string().min(1),
    }),
    english: z.object({
      term: z.string().min(1),
      example: z.string().min(1),
      keyVocab: z.array(z.string()).min(2),
    }),
    purposeTags: z.array(z.string()).min(1),
    mediaTags: z.array(z.string()).min(1),
    demoType: z.enum([
      'compareToggle',
      'scenarioQuiz',
      'choiceLab',
      'timingGame',
      'gazeMap',
      'colorLab',
      'illusion',
    ]),
    demoConfig: z.record(z.string(), z.any()),
    related: z.array(z.number().int().min(1).max(108)).min(2).max(4),
    caseIds: z.array(z.number().int().min(1).max(11)),
    level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    factNote: z.string().nullable().optional(),
  })

  // 고립 원리 집계
  const referencedBy = new Map()
  for (let id = 1; id <= 108; id++) referencedBy.set(id, 0)

  effectsData.forEach((e) => {
    // ethicsNote 조건 검사
    if ((e.ethicsLevel === 'caution' || e.ethicsLevel === 'risk') && !e.ethicsNote) {
      throw new Error(`[#${e.id}] ethicsLevel이 ${e.ethicsLevel}이지만 ethicsNote가 비어 있습니다.`)
    }
    // Zod 파싱
    EffectSchema.parse(e)

    // related 유효성
    e.related.forEach((rid) => {
      if (rid === e.id) throw new Error(`[#${e.id}] 자기 자신을 related로 가리킬 수 없습니다.`)
      referencedBy.set(rid, (referencedBy.get(rid) || 0) + 1)
    })
  })

  // 고립 원리 체크
  const isolated = []
  for (const [id, count] of referencedBy.entries()) {
    if (count === 0) isolated.push(id)
  }
  if (isolated.length > 0) {
    throw new Error(`다른 어떤 원리에게도 참조되지 않는 고립 원리 ${isolated.length}개 발견: ${isolated.join(', ')}`)
  }

  console.log(`[validateData] ✓ effects.json: 108개 원리 전수 제약 검사 통과 (고립 0개)`)
} catch (err) {
  console.error(`[validateData] ✗ effects.json 오류:`, err.message)
  totalErrors++
}

// 5. cases.json (11개)
try {
  const cases = readJson('cases.json')
  const CaseSchema = z.array(
    z.object({
      id: z.number().int().min(1).max(11),
      code: z.string().regex(/^CASE\d{2}$/),
      titleSchool: z.string().min(1),
      originType: z.string().min(1),
      keyMessage: z.string().min(1),
      layout: z.enum(['portrait', 'landscape']),
      critical: z.boolean(),
      effects: z.array(z.number().int().min(1).max(108)).min(1),
      hotspots: z.array(
        z.object({
          effectId: z.number().int().min(1).max(108),
          x: z.number().min(0).max(100),
          y: z.number().min(0).max(100),
          w: z.number().min(1).max(100),
          h: z.number().min(1).max(100),
          note: z.string().min(1),
        })
      ).min(1),
      beforeNote: z.string().min(1),
      explain: z.string().min(1),
      checklist: z.array(z.string()).min(3),
    })
  ).length(11)

  CaseSchema.parse(cases)
  console.log(`[validateData] ✓ cases.json: 11개 학교판 리메이크 사례 정상 (핫스팟 % 좌표 검증)`)
} catch (err) {
  console.error(`[validateData] ✗ cases.json 오류:`, err.message)
  totalErrors++
}

// 6. quiz-scenarios.json (40개)
try {
  const quizScenarios = readJson('quiz-scenarios.json')
  const ScenarioSchema = z.array(
    z.object({
      id: z.number().int().min(1).max(40),
      scenario: z.string().min(10),
      correctEffectId: z.number().int().min(1).max(108),
      distractorEffectIds: z.array(z.number().int().min(1).max(108)).length(3),
      explanation: z.string().min(10),
    })
  ).length(40)

  ScenarioSchema.parse(quizScenarios)

  // 중복 검사
  quizScenarios.forEach((s) => {
    if (s.distractorEffectIds.includes(s.correctEffectId)) {
      throw new Error(`[시나리오 #${s.id}] 오답 목록에 정답 ID(${s.correctEffectId})가 포함되어 있습니다.`)
    }
    const uniqueDistractors = new Set(s.distractorEffectIds)
    if (uniqueDistractors.size !== 3) {
      throw new Error(`[시나리오 #${s.id}] 오답 목록에 중복 ID가 존재합니다.`)
    }
  })

  console.log(`[validateData] ✓ quiz-scenarios.json: 40개 상황형 퀴즈 정상`)
} catch (err) {
  console.error(`[validateData] ✗ quiz-scenarios.json 오류:`, err.message)
  totalErrors++
}

// 7. quiz-ethics.json (20개)
try {
  const quizEthics = readJson('quiz-ethics.json')
  const EthicsSchema = z.array(
    z.object({
      id: z.number().int().min(1).max(20),
      title: z.string().min(1),
      situation: z.string().min(10),
      judgment: z.enum(['persuasion', 'manipulation']),
      relatedEffectIds: z.array(z.number().int().min(1).max(108)).min(1),
      rationale: z.string().min(10),
      ethicalAlternative: z.string().min(10),
    })
  ).length(20)

  EthicsSchema.parse(quizEthics)
  console.log(`[validateData] ✓ quiz-ethics.json: 20개 윤리 판정 퀴즈 정상`)
} catch (err) {
  console.error(`[validateData] ✗ quiz-ethics.json 오류:`, err.message)
  totalErrors++
}

// 8. checklist.json (20개)
try {
  const checklist = readJson('checklist.json')
  const ChecklistSchema = z.array(
    z.object({
      id: z.number().int().min(1).max(20),
      category: z.enum(['gazeFlow', 'readability', 'hierarchy', 'consistency', 'accessibility']),
      categoryKo: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      relatedEffectIds: z.array(z.number().int().min(1).max(108)).min(1),
      passTip: z.string().min(1),
      failTip: z.string().min(1),
    })
  ).length(20)

  ChecklistSchema.parse(checklist)

  // 5영역별 4문항 균등성 검증
  const catCounts = {}
  checklist.forEach((item) => {
    catCounts[item.category] = (catCounts[item.category] || 0) + 1
  })
  for (const cat of ['gazeFlow', 'readability', 'hierarchy', 'consistency', 'accessibility']) {
    if (catCounts[cat] !== 4) {
      throw new Error(`체크리스트 영역 ${cat}의 문항 수가 4개가 아닙니다 (현재 ${catCounts[cat]}개)`)
    }
  }

  console.log(`[validateData] ✓ checklist.json: 20개 수동 점검 항목 (5영역 × 4문항) 정상`)
} catch (err) {
  console.error(`[validateData] ✗ checklist.json 오류:`, err.message)
  totalErrors++
}

// 9. lessons.json (4개)
try {
  const lessons = readJson('lessons.json')
  const LessonSchema = z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      target: z.string().min(1),
      duration: z.string().min(1),
      overview: z.string().min(1),
      standards: z.array(z.any()).length(0, '성취기준은 임의 창작 금지 규정에 따라 빈 배열이어야 합니다'),
      materials: z.array(z.string()).min(1),
      steps: z.array(
        z.object({
          step: z.number().int(),
          name: z.string().min(1),
          time: z.string().min(1),
          desc: z.string().min(1),
        })
      ).min(3),
      rubric: z.array(
        z.object({
          criterion: z.string().min(1),
          high: z.string().min(1),
          mid: z.string().min(1),
          low: z.string().min(1),
        })
      ).min(3),
      worksheet: z.object({
        title: z.string().min(1),
        sections: z.array(
          z.object({
            label: z.string().min(1),
            placeholder: z.string().min(1),
          })
        ).min(3),
      }),
      relatedScreens: z.array(z.string()).min(1),
    })
  ).length(4)

  LessonSchema.parse(lessons)
  console.log(`[validateData] ✓ lessons.json: 4개 수업 활용 모듈 정상 (성취기준 공란 준수)`)
} catch (err) {
  console.error(`[validateData] ✗ lessons.json 오류:`, err.message)
  totalErrors++
}

console.log('[validateData] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
if (totalErrors > 0) {
  console.error(`[validateData] 총 ${totalErrors}건의 데이터 검증 실패 발생!`)
  process.exit(1)
} else {
  console.log(`[validateData] 🎉 모든 데이터 파일(9종 215개 항목) 검증 100% 통과!`)
  process.exit(0)
}
