import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const port = Number(process.env.RACE_BROWSER_PORT ?? 9233)
const appUrl = process.env.RACE_BROWSER_URL ?? 'http://127.0.0.1:5173'
const artifactDir = path.resolve(process.env.BROWSER_ARTIFACT_DIR ?? path.join(os.tmpdir(), 'quannet-browser-race-review'))
const chromePath = process.env.CHROME_PATH ?? [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].find(existsSync)

if (!chromePath) throw new Error('Chrome was not found. Set CHROME_PATH to run browser review.')

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))
const waitFor = async (action, label) => {
  let lastError
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { return await action() } catch (error) { lastError = error; await sleep(100) }
  }
  throw new Error(`${label}: ${lastError instanceof Error ? lastError.message : String(lastError)}`)
}

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url)
    this.nextId = 0
    this.pending = new Map()
    this.socket.addEventListener('message', event => {
      const message = JSON.parse(event.data)
      if (!message.id) return
      const pending = this.pending.get(message.id)
      if (!pending) return
      this.pending.delete(message.id)
      message.error ? pending.reject(new Error(message.error.message)) : pending.resolve(message.result)
    })
  }

  async ready() { await new Promise((resolve, reject) => { this.socket.addEventListener('open', resolve, { once: true }); this.socket.addEventListener('error', reject, { once: true }) }) }
  send(method, params = {}) {
    const id = ++this.nextId
    this.socket.send(JSON.stringify({ id, method, params }))
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }))
  }
  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
    return result.result.value
  }
  close() { this.socket.close() }
}

async function screenshot(cdp, name) {
  const result = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  const file = path.join(artifactDir, name)
  await writeFile(file, Buffer.from(result.data, 'base64'))
  return file
}

async function navigate(cdp, route) {
  await cdp.send('Page.navigate', { url: `${appUrl}${route}` })
  await waitFor(async () => {
    const state = await cdp.evaluate('document.readyState')
    if (state !== 'complete') throw new Error('document not ready')
  }, `page ready ${route}`)
  await sleep(250)
}

const clickButton = text => `(() => { const button = [...document.querySelectorAll('button')].find(item => item.textContent.trim() === ${JSON.stringify(text)}); if (!button) throw new Error('Missing button: ${text}'); button.click() })()`
const clickLabel = text => `(() => { const label = [...document.querySelectorAll('label')].find(item => item.textContent.includes(${JSON.stringify(text)})); const input = label?.querySelector('input'); if (!input) throw new Error('Missing answer label: ${text}'); input.click() })()`
const setLabeledValue = (text, value) => `(() => { const label = [...document.querySelectorAll('label')].find(item => item.textContent.includes(${JSON.stringify(text)})); const input = label?.querySelector('input, textarea') ?? document.getElementById(label?.htmlFor); if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) throw new Error('Missing input: ${text}'); const setter = Object.getOwnPropertyDescriptor(input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value').set; setter.call(input, ${JSON.stringify(value)}); input.dispatchEvent(new Event('input', { bubbles: true })); input.dispatchEvent(new Event('change', { bubbles: true })) })()`
const scrollToSelector = selector => `(() => { const element = document.querySelector(${JSON.stringify(selector)}); if (!element) throw new Error('Missing scroll target: ${selector}'); window.scrollTo({ top: Math.max(0, element.getBoundingClientRect().top + window.scrollY - 72), behavior: 'instant' }) })()`

async function completeAssessment(cdp) {
  await cdp.evaluate(clickButton('Bài luyện tập'))
  await cdp.evaluate(clickLabel('Cả hai READ 100'))
  await cdp.evaluate(clickButton('Nộp câu trả lời'))
  await cdp.evaluate(clickButton('Tiếp tục'))
  await cdp.evaluate(clickLabel('Balance/source-of-truth'))
  await cdp.evaluate(clickLabel('Tổng approved amount'))
  await cdp.evaluate(clickButton('Nộp câu trả lời'))
  await cdp.evaluate(clickButton('Tiếp tục'))
  await cdp.evaluate(clickLabel('approvedCount=2, approvedAmount=110, finalBalance=20 hoặc 70'))
  await cdp.evaluate(clickButton('Nộp câu trả lời'))
  await cdp.evaluate(clickButton('Tiếp tục'))
  await cdp.evaluate(clickLabel('approvedCount=2, approvedAmount=110, finalBalance=40 hoặc 50'))
  await cdp.evaluate(clickButton('Nộp câu trả lời'))
  await cdp.evaluate(setLabeledValue('Kết quả bạn quan sát được', '60/50 unsafe approve 110; final balance 40.'))
  await cdp.evaluate(clickLabel('Tôi đã chạy hoặc đối chiếu local lab'))
  await cdp.evaluate(clickButton('Tiếp tục'))
  await cdp.evaluate(clickLabel('Cả hai có thể CHECK từ cùng snapshot 100'))
  await cdp.evaluate(clickButton('Nộp câu trả lời'))
  await cdp.evaluate(setLabeledValue('Candidate timeline', 'A và B đọc snapshot cũ; operation ID, row count và instance ID nối evidence với effect.'))
  await cdp.evaluate(clickLabel('Tôi đã tự review timeline'))
  await cdp.evaluate(clickButton('Tiếp tục'))
  await waitFor(async () => {
    if (!await cdp.evaluate(`Boolean([...document.querySelectorAll('h3')].find(item => item.textContent.includes('Đã thỏa yêu cầu bài luyện tập Race')))`)) throw new Error('completion not rendered')
  }, 'assessment completion')
}

async function geometry(cdp) {
  return cdp.evaluate(`(() => {
    const root = document.documentElement
    const ignored = 'pre, .code-block, .table-wrapper, .race-assessment-progress, .sidebar:not(.sidebar-open)'
    const offenders = [...document.body.querySelectorAll('*')].filter(element => {
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && !element.closest(ignored) && (rect.left < -1 || rect.right > window.innerWidth + 1)
    }).slice(0, 12).map(element => { const rect = element.getBoundingClientRect(); return { tag: element.tagName, className: element.className, left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) } })
    const inlineCodeOverflow = [...document.querySelectorAll(':not(pre) > code')].filter(code => code.scrollWidth > code.clientWidth + 1).map(code => code.textContent.slice(0, 80))
    return { viewport: { width: window.innerWidth, height: window.innerHeight }, scrollWidth: root.scrollWidth, clientWidth: root.clientWidth, offenders, inlineCodeOverflow }
  })()`)
}

async function reviewViewport(cdp, width) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width <= 390 })
  await navigate(cdp, '/')
  const screenshots = [await screenshot(cdp, `home-navigation-${width}.png`)]
  const homeGeometry = await geometry(cdp)
  await navigate(cdp, '/docs/learning-race-condition?mode=guided')
  await cdp.evaluate(`localStorage.removeItem('ltvc-race-assessment-v2'); localStorage.setItem('ltvc-race-guided-step', '0')`)
  await cdp.evaluate('location.reload()')
  await waitFor(async () => {
    if (!await cdp.evaluate(`document.querySelector('#race-guided-title')?.textContent.includes('Hai request cùng nhìn 100')`)) throw new Error('Race first step not ready')
  }, 'Race first step')
  await cdp.evaluate(scrollToSelector('.race-guided > div:not([hidden]) .race-visual-card'))
  await sleep(120)
  screenshots.push(await screenshot(cdp, `race-first-visual-${width}.png`))
  await cdp.evaluate(`document.querySelector('[aria-label="Bước 3: Chạy lab"]')?.click()`)
  await waitFor(async () => { if (!await cdp.evaluate(`Boolean(document.querySelector('.race-lab-workflow'))`)) throw new Error('guided lab not open') }, 'guided lab')
  await cdp.evaluate(clickButton('Sang bước chạy'))
  await cdp.evaluate(clickButton('Tôi đã chạy hoặc đọc kết quả'))
  await cdp.evaluate(clickButton('Mở đối chiếu và giải thích'))
  await cdp.evaluate(scrollToSelector('.race-lab-workflow'))
  await sleep(120)
  screenshots.push(await screenshot(cdp, `race-guided-lab-expanded-${width}.png`))
  await completeAssessment(cdp)
  await cdp.evaluate(scrollToSelector('.race-assessment-result'))
  await sleep(120)
  screenshots.push(await screenshot(cdp, `race-assessment-completion-${width}.png`))
  const result = { width, home: homeGeometry, race: await geometry(cdp), screenshots }
  if (result.home.scrollWidth !== result.home.clientWidth || result.race.scrollWidth !== result.race.clientWidth || result.home.offenders.length || result.race.offenders.length || result.home.inlineCodeOverflow.length || result.race.inlineCodeOverflow.length) throw new Error(`Layout failure at ${width}px: ${JSON.stringify(result)}`)
  return result
}

async function main() {
  await mkdir(artifactDir, { recursive: true })
  const vite = process.platform === 'win32'
    ? spawn(process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', 'npm run dev -- --host 127.0.0.1 --port 5173'], { stdio: 'ignore', shell: false })
    : spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173'], { stdio: 'ignore', shell: false })
  const profile = path.join(os.tmpdir(), `quannet-race-browser-${process.pid}`)
  let chrome
  let cdp
  try {
    await waitFor(async () => { const response = await fetch(appUrl); if (!response.ok) throw new Error(`HTTP ${response.status}`) }, 'Vite server')
    chrome = spawn(chromePath, ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore', shell: false })
    const target = await waitFor(async () => {
      const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
      const page = pages.find(item => item.type === 'page')
      if (!page) throw new Error('No page target')
      return page
    }, 'Chrome DevTools')
    cdp = new Cdp(target.webSocketDebuggerUrl)
    await cdp.ready()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    const viewports = []
    for (const width of [390, 1280]) viewports.push(await reviewViewport(cdp, width))
    const report = { command: 'npm run test:browser:race', appUrl, viewports, artifactDir }
    await writeFile(path.join(artifactDir, 'browser-report.json'), `${JSON.stringify(report, null, 2)}\n`)
    console.log(JSON.stringify(report, null, 2))
  } finally {
    cdp?.close()
    if (chrome && !chrome.killed) {
      const exited = new Promise(resolve => chrome.once('exit', resolve))
      chrome.kill()
      await Promise.race([exited, sleep(1200)])
    }
    vite.kill()
    try { await rm(profile, { recursive: true, force: true }) } catch (cleanupError) { console.warn(`Browser profile retained for cleanup: ${cleanupError.code ?? cleanupError.message}`) }
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
