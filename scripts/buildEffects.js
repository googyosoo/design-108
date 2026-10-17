import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { effects001to025 } from './data/effects_001_025.js'
import { effects026to052 } from './data/effects_026_052.js'
import { effects053to078 } from './data/effects_053_078.js'
import { effects079to108 } from './data/effects_079_108.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'src', 'data')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const allEffects = [
  ...effects001to025,
  ...effects026to052,
  ...effects053to078,
  ...effects079to108,
]

console.log(`[buildEffects] 총 ${allEffects.length}개 원리 로드.`)

// B-2 사례 매핑
const caseMapping = {
  1: [100, 6, 1, 78, 83, 5, 22, 29, 51],
  2: [7, 3, 15, 5, 12, 39, 22],
  3: [7, 2, 25, 20, 12, 24, 14, 28, 10, 4, 30, 48],
  4: [40, 46, 106, 45],
  5: [17, 108, 18, 10, 27, 26],
  6: [8, 98, 19, 92],
  7: [23, 9, 19, 35],
  8: [95, 73, 89, 91, 44],
  9: [31, 12, 51, 47],
  10: [4, 36, 21, 30],
  11: [32, 100, 103, 93],
}

// effect -> caseIds 역산 매핑
const effectToCases = new Map()
for (let id = 1; id <= 108; id++) {
  effectToCases.set(id, [])
}
for (const [caseId, effectIds] of Object.entries(caseMapping)) {
  for (const eid of effectIds) {
    if (effectToCases.has(eid)) {
      effectToCases.get(eid).push(Number(caseId))
    }
  }
}

// 제약조건 검사 및 보정
const errors = []
const referencedBy = new Map()
for (let id = 1; id <= 108; id++) {
  referencedBy.set(id, 0)
}

allEffects.forEach((e) => {
  // caseIds 동기화
  e.caseIds = effectToCases.get(e.id) || []

  // 길이 제약 검사
  if (e.oneLiner.length > 40) errors.push(`[#${e.id}] oneLiner > 40 (${e.oneLiner.length}): ${e.oneLiner}`)
  if (e.why.length > 160) errors.push(`[#${e.id}] why > 160 (${e.why.length}): ${e.why}`)
  if (e.analogy.length > 80) errors.push(`[#${e.id}] analogy > 80 (${e.analogy.length}): ${e.analogy}`)
  if (e.apply.classroom.length > 90) errors.push(`[#${e.id}] apply.classroom > 90 (${e.apply.classroom.length})`)
  if (e.apply.webapp.length > 90) errors.push(`[#${e.id}] apply.webapp > 90 (${e.apply.webapp.length})`)
  if (e.apply.print.length > 90) errors.push(`[#${e.id}] apply.print > 90 (${e.apply.print.length})`)
  e.doList.forEach((d, i) => { if (d.length > 50) errors.push(`[#${e.id}] doList[${i}] > 50 (${d.length})`) })
  e.dontList.forEach((d, i) => { if (d.length > 50) errors.push(`[#${e.id}] dontList[${i}] > 50 (${d.length})`) })
  if ((e.ethicsLevel === 'caution' || e.ethicsLevel === 'risk') && (!e.ethicsNote || e.ethicsNote.length > 100)) {
    errors.push(`[#${e.id}] ethicsNote missing or > 100 (${e.ethicsNote?.length})`)
  }

  // related 링크 참조 수 집계
  if (!e.related || e.related.length < 2 || e.related.length > 4) {
    errors.push(`[#${e.id}] related length not 2~4 (${e.related?.length})`)
  } else {
    e.related.forEach((rid) => {
      if (rid < 1 || rid > 108) errors.push(`[#${e.id}] invalid related id ${rid}`)
      else referencedBy.set(rid, (referencedBy.get(rid) || 0) + 1)
    })
  }
})

// 고립 원리 체크
const isolated = []
for (const [id, count] of referencedBy.entries()) {
  if (count === 0) isolated.push(id)
}

if (isolated.length > 0) {
  console.log(`[buildEffects] 고립 원리 발견 (${isolated.length}개): ${isolated.join(', ')}`)
  isolated.forEach((isoId) => {
    const target = allEffects.find((e) => e.id === isoId)
    let partner = target.related
      .map((rid) => allEffects.find((e) => e.id === rid))
      .find((p) => p && p.related.length < 4 && !p.related.includes(isoId))
    if (!partner) {
      partner = allEffects.find((e) => e.id === target.related[0])
    }
    if (partner && !partner.related.includes(isoId)) {
      if (partner.related.length < 4) {
        partner.related.push(isoId)
      } else {
        partner.related[partner.related.length - 1] = isoId
      }
      referencedBy.set(isoId, (referencedBy.get(isoId) || 0) + 1)
      console.log(`[buildEffects] 보강 완료: #${partner.id}의 related에 #${isoId} 추가`)
    }
  })
}

if (errors.length > 0) {
  console.error(`[buildEffects] 제약 조건 위반 ${errors.length}건 발생:`)
  errors.forEach((err) => console.error('  - ' + err))
  process.exit(1)
}

// effects.json 파일 저장
const outputPath = path.join(dataDir, 'effects.json')
fs.writeFileSync(outputPath, JSON.stringify(allEffects, null, 2), 'utf-8')
console.log(`[buildEffects] 성공적으로 ${allEffects.length}개 원리를 ${outputPath}에 생성 완료!`)
