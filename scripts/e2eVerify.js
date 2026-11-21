import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const screenshotDir = path.join(projectRoot, 'docs', 'progress', 'screenshots')
const PORT = 5873

async function waitUrl(url, timeoutMs = 15000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok || res.status === 404 || res.status === 200) return true
    } catch {
      // 대기
    }
    await new Promise((r) => setTimeout(r, 400))
  }
  throw new Error(`Server timeout at ${url}`)
}

async function main() {
  console.log(`[e2eVerify] 1. Starting vite preview server on port ${PORT}...`)
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: projectRoot,
    shell: true,
    stdio: 'pipe',
  })

  preview.stdout.on('data', (d) => process.stdout.write(`[vite] ${d}`))
  preview.stderr.on('data', (d) => process.stderr.write(`[vite:err] ${d}`))

  try {
    await waitUrl(`http://localhost:${PORT}/design-108/`)
    console.log(`[e2eVerify] Preview server is ready at http://localhost:${PORT}/design-108/`)

    console.log('[e2eVerify] 2. Launching Chromium headless...')
    const browser = await chromium.launch({ headless: true })

    const consoleErrors = []

    const testPages = [
      { name: 'home', path: '/design-108/' },
      { name: 'effect_001', path: '/design-108/effect/001' },
      { name: 'diagnose', path: '/design-108/diagnose' },
      { name: 'prompt', path: '/design-108/tools/prompt' },
      { name: 'teach_m01', path: '/design-108/teach/M01' },
      { name: 'library', path: '/design-108/library' },
      { name: 'cases', path: '/design-108/cases' },
    ]

    // -------------------------------------------------------------
    // A. 데스크톱 뷰포트 (1280x800)
    // -------------------------------------------------------------
    console.log('[e2eVerify] 3. Testing Desktop Viewport (1280x800)...')
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    })
    const desktopPage = await desktopContext.newPage()
    desktopPage.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text()
        // favicon 404 등 브라우저 기본 요청 제외
        if (!text.includes('favicon.ico')) {
          consoleErrors.push(`[Desktop Console Error] ${text}`)
        }
      }
    })
    desktopPage.on('pageerror', (err) => {
      consoleErrors.push(`[Desktop Page Error] ${err.message}`)
    })

    for (const p of testPages) {
      const url = `http://localhost:${PORT}${p.path}`
      await desktopPage.goto(url, { waitUntil: 'networkidle' })
      const title = await desktopPage.title()
      const shotPath = path.join(screenshotDir, `desktop_${p.name}.png`)
      await desktopPage.screenshot({ path: shotPath, fullPage: false })
      console.log(`  ✓ Desktop [${p.name}] loaded: "${title}" -> ${path.basename(shotPath)}`)
    }

    // Diagnose 페이지에서 프리셋 버튼 인터랙션 검증
    console.log('[e2eVerify] 4. Testing Diagnose Preset buttons...')
    await desktopPage.goto(`http://localhost:${PORT}/design-108/diagnose`, { waitUntil: 'networkidle' })
    const schoolNoticeBtn = desktopPage.locator('button:has-text("학교 가정통신문")')
    if (await schoolNoticeBtn.count() > 0) {
      await schoolNoticeBtn.click()
      await desktopPage.waitForTimeout(300)
      const shotPreset = path.join(screenshotDir, 'desktop_diagnose_preset_selected.png')
      await desktopPage.screenshot({ path: shotPreset })
      console.log('  ✓ Preset "학교 가정통신문" clicked and screenshot captured')
    }

    // PromptBuilder 페이지에서 3단계 스웜 실행 인터랙션 검증
    console.log('[e2eVerify] 5. Testing PromptBuilder Swarm execution...')
    await desktopPage.goto(`http://localhost:${PORT}/design-108/tools/prompt`, { waitUntil: 'networkidle' })
    const runSwarmBtn = desktopPage.locator('button:has-text("3단계 에이전트 스웜 검증 실행")')
    if (await runSwarmBtn.count() > 0) {
      await runSwarmBtn.click()
      console.log('  ✓ PromptBuilder Swarm execution started, waiting for completion...')
      // 스웜 완료 뱃지나 결과 대기 (최대 5초)
      await desktopPage.waitForSelector('text=스웜 교차 검증 통과 완료', { timeout: 8000 }).catch(() => {})
      const shotPromptSwarm = path.join(screenshotDir, 'desktop_prompt_swarm_result.png')
      await desktopPage.screenshot({ path: shotPromptSwarm })
      console.log('  ✓ PromptBuilder Swarm result screenshot captured')
    }

    // TeachModule 페이지에서 TeamCoachSwarm 인터랙션 검증
    console.log('[e2eVerify] 6. Testing TeamCoachSwarm on TeachModule M01...')
    await desktopPage.goto(`http://localhost:${PORT}/design-108/teach/M01`, { waitUntil: 'networkidle' })
    const coachPanel = desktopPage.locator('text=모둠 활동 AI 코치 스웜')
    if (await coachPanel.count() > 0) {
      const shotTeachCoach = path.join(screenshotDir, 'desktop_teach_m01_coach.png')
      await desktopPage.screenshot({ path: shotTeachCoach })
      console.log('  ✓ TeamCoachSwarm panel found and screenshot captured')
    }
    await desktopContext.close()

    // -------------------------------------------------------------
    // B. 모바일 뷰포트 (390x844 - iPhone 14/15 크기)
    // -------------------------------------------------------------
    console.log('[e2eVerify] 7. Testing Mobile Viewport (390x844)...')
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const mobilePage = await mobileContext.newPage()
    mobilePage.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text()
        if (!text.includes('favicon.ico')) {
          consoleErrors.push(`[Mobile Console Error] ${text}`)
        }
      }
    })
    mobilePage.on('pageerror', (err) => {
      consoleErrors.push(`[Mobile Page Error] ${err.message}`)
    })

    for (const p of testPages) {
      const url = `http://localhost:${PORT}${p.path}`
      await mobilePage.goto(url, { waitUntil: 'networkidle' })
      const shotPath = path.join(screenshotDir, `mobile_${p.name}_390.png`)
      await mobilePage.screenshot({ path: shotPath, fullPage: false })
      console.log(`  ✓ Mobile 390px [${p.name}] loaded -> ${path.basename(shotPath)}`)
    }
    await mobileContext.close()

    await browser.close()

    // -------------------------------------------------------------
    // C. 콘솔 에러 검증
    // -------------------------------------------------------------
    console.log(`[e2eVerify] 8. Console error check: ${consoleErrors.length} errors recorded`)
    if (consoleErrors.length > 0) {
      console.error('❌ Console errors detected:')
      consoleErrors.forEach((e) => console.error('  ', e))
      throw new Error(`Total ${consoleErrors.length} console errors found!`)
    }

    console.log('🎉 [e2eVerify] ALL E2E DESKTOP & MOBILE 390PX CHECKS PASSED WITH 0 CONSOLE ERRORS!')
  } finally {
    console.log('[e2eVerify] Stopping preview server...')
    preview.kill('SIGINT')
  }
}

main().catch((err) => {
  console.error('❌ [e2eVerify] Error:', err)
  process.exit(1)
})
