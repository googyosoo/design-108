import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const projectRoot = 'C:\\Users\\user\\Desktop\\Antigravity\\디자인 심리 108-1-001\\디자인 심리 108\\design-psych-108'

console.log('[securityAudit] 1. Scanning working tree files...')

const patterns = [
  { name: 'Google API Key (AIza...)', regex: /AIza[0-9A-Za-z-_]{35}/g },
  { name: 'OpenAI API Key (sk-...)', regex: /sk-[0-9A-Za-z-_]{32,}/g },
  { name: 'GitHub Token (ghp_...)', regex: /ghp_[0-9A-Za-z]{36}/g },
  { name: 'GitHub PAT (github_pat_...)', regex: /github_pat_[0-9A-Za-z_]{80,}/g },
  { name: 'Resident ID (RRN)', regex: /\b\d{6}-[1-4]\d{6}\b/g },
  { name: 'Phone number', regex: /\b010-\d{4}-\d{4}\b/g },
]

const targetExts = ['.js', '.jsx', '.json', '.html', '.md', '.yml', '.yaml']

function scanDir(dir) {
  let findings = 0
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
      continue
    }
    if (entry.isDirectory()) {
      findings += scanDir(fullPath)
    } else if (targetExts.includes(path.extname(entry.name))) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      for (const p of patterns) {
        const matches = content.match(p.regex)
        if (matches) {
          const realLeaked = matches.filter(m => !m.includes('AIzaSy...') && m.length >= 39)
          if (realLeaked.length > 0) {
            console.error(`❌ [Security Alert] Found ${p.name} in ${fullPath}:`, realLeaked)
            findings += realLeaked.length
          }
        }
      }
    }
  }
  return findings
}

const totalLeaks = scanDir(projectRoot)

console.log('[securityAudit] 2. Checking commit diffs...')
const commitHashes = execSync('git log -n 10 --format=%H', { cwd: projectRoot, encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean)

let historyLeaks = 0
for (const hash of commitHashes) {
  const diff = execSync(`git show ${hash}`, { cwd: projectRoot, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 })
  for (const p of patterns) {
    const matches = diff.match(p.regex)
    if (matches) {
      const realLeaked = matches.filter(m => !m.includes('AIzaSy...') && m.length >= 39)
      if (realLeaked.length > 0) {
        console.error(`❌ [History Alert in ${hash.slice(0, 7)}] Found ${p.name}:`, realLeaked)
        historyLeaks += realLeaked.length
      }
    }
  }
}

if (totalLeaks === 0 && historyLeaks === 0) {
  console.log('🎉 [securityAudit] ZERO SENSITIVE KEYS / PII DETECTED! (100% CLEAN)')
} else {
  console.error(`❌ [securityAudit] AUDIT FAILED with ${totalLeaks + historyLeaks} finding(s)`)
  process.exit(1)
}
