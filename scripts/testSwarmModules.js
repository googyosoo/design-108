import { runPromptSwarm, runTeamCoachSwarm, SWARM_AGENTS } from '../src/lib/swarmSimulator.js'
import { runDiagnosticSwarm, DIAGNOSTIC_PRESETS } from '../src/lib/diagnoseDesign.js'

async function main() {
  console.log('[testSwarmModules] Starting verification...')
  console.log(`[testSwarmModules] SWARM_AGENTS: ${SWARM_AGENTS.length} agents defined`)
  console.log(`[testSwarmModules] DIAGNOSTIC_PRESETS: ${DIAGNOSTIC_PRESETS.length} presets defined`)

  // 1. 진단 스웜 테스트 (다양한 프리셋)
  const mockImg = {
    width: 800,
    height: 1200,
    size: 102400,
    dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  }

  for (const preset of ['school-notice', 'poster', 'slide', 'web-app', 'general']) {
    const diagRes = await runDiagnosticSwarm(mockImg, { preset })
    if (!diagRes.score || !diagRes.grade || !diagRes.findings || !diagRes.swarmTranscript) {
      throw new Error(`Diagnostic failed for preset ${preset}`)
    }
    console.log(`  ✓ Preset '${preset}': score=${diagRes.score}, findings=${diagRes.findings.length}, turns=${diagRes.swarmTranscript.length}`)
  }

  // 2. 프롬프트 스웜 테스트
  const promptRes = await runPromptSwarm({
    mediaCode: 'PRINT_NOTICE',
    purposeCodes: ['READABILITY'],
    effectIds: [5, 8, 12],
    customContext: '수학여행 학부모 안내문',
  })
  if (!promptRes.finalPrompt || !promptRes.transcript || !promptRes.checks) {
    throw new Error('Prompt swarm failed')
  }
  console.log(`  ✓ Prompt Swarm: transcript=${promptRes.transcript.length} turns, checks=${promptRes.checks.length}, promptLen=${promptRes.finalPrompt.length}`)

  // 3. 팀 코치 스웜 테스트
  const coachRes = await runTeamCoachSwarm({
    moduleTitle: '포스터 리메이크',
    targetRole: '기획 담당',
    draftText: '제목을 강조하고 싶습니다',
    relatedEffectIds: [5, 12],
  })
  if (!coachRes.transcript || !coachRes.nextActions) {
    throw new Error('Team coach swarm failed')
  }
  console.log(`  ✓ Team Coach Swarm: transcript=${coachRes.transcript.length} turns, nextActions=${coachRes.nextActions.length}`)

  console.log('🎉 [testSwarmModules] ALL TESTS PASSED WITH ZERO ERRORS!')
}

main().catch((err) => {
  console.error('❌ [testSwarmModules] FAILED:', err)
  process.exit(1)
})
