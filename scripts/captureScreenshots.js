import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imgDir = path.join(__dirname, '..', 'docs', 'progress', 'img')
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true })
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const port = 9222
const tempProfile = path.join(process.env.TEMP || '.', 'cdp_profile_108')

async function run() {
  console.log('[capture] Headless Chrome 시작 중...')
  const chromeProc = spawn(
    chromePath,
    [
      `--remote-debugging-port=${port}`,
      '--headless=new',
      '--disable-gpu',
      `--user-data-dir=${tempProfile}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  // 포트 열릴 때까지 대기
  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json/version`)
    const versionData = await listRes.json()
    console.log('[capture] 브라우저 연결 성공:', versionData.Browser)

    const newTabRes = await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:4173/dev/ui`, {
      method: 'PUT',
    })
    const tabData = await newTabRes.json()
    const wsUrl = tabData.webSocketDebuggerUrl

    const ws = new WebSocket(wsUrl)
    await new Promise((resolve, reject) => {
      ws.onopen = resolve
      ws.onerror = reject
    })

    let reqId = 1
    const send = (method, params = {}) => {
      const id = reqId++
      return new Promise((resolve) => {
        const handler = (evt) => {
          const res = JSON.parse(evt.data)
          if (res.id === id) {
            ws.removeEventListener('message', handler)
            resolve(res.result)
          }
        }
        ws.addEventListener('message', handler)
        ws.send(JSON.stringify({ id, method, params }))
      })
    }

    await send('Page.enable')
    await send('Network.enable')
    await send('Page.navigate', { url: 'http://localhost:4173/dev/ui' })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const viewports = [
      { name: 'phase1-360.png', width: 360, height: 800 },
      { name: 'phase1-768.png', width: 768, height: 1024 },
      { name: 'phase1-1280.png', width: 1280, height: 800 },
    ]

    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 1024,
      })
      await new Promise((resolve) => setTimeout(resolve, 500))

      const ss = await send('Page.captureScreenshot', { format: 'png' })
      const filePath = path.join(imgDir, vp.name)
      fs.writeFileSync(filePath, Buffer.from(ss.data, 'base64'))
      console.log(`[capture] 저장 완료: ${vp.name} (${vp.width}x${vp.height})`)
    }

    ws.close()
  } catch (err) {
    console.error('[capture] 오류 발생:', err)
  } finally {
    chromeProc.kill()
    console.log('[capture] 완료!')
  }
}

run()
