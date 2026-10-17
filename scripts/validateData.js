import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'src', 'data')

console.log('[validateData] 데이터 무결성 검증을 시작합니다...')

if (!fs.existsSync(dataDir)) {
  console.log('[validateData] Phase 0 상태: src/data 폴더가 아직 없습니다. (정상 통과)')
  process.exit(0)
}

const effectsPath = path.join(dataDir, 'effects.json')
if (fs.existsSync(effectsPath)) {
  const raw = fs.readFileSync(effectsPath, 'utf-8')
  const effects = JSON.parse(raw)
  console.log(`[validateData] 원리 데이터 ${effects.length}개 발견.`)
} else {
  console.log('[validateData] Phase 0: effects.json 대기 중. (정상 통과)')
}

console.log('[validateData] 검증 통과!')
process.exit(0)
