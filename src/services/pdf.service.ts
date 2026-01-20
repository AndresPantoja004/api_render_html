import { chromium } from 'playwright'
import { env } from '../config/env'
import { RenderOptions } from '../types/render.types'

export async function renderPdf(
  html: string,
  options: RenderOptions = {}
): Promise<Buffer> {

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const context = await browser.newContext({
    javaScriptEnabled: false
  })

  const page = await context.newPage()

  await page.setContent(html, {
    waitUntil: 'load',
    timeout: env.RENDER_TIMEOUT_MS
  })

  const pdf = await page.pdf({
    format: options.format || 'A4',
    printBackground: options.printBackground ?? true,
    margin: options.margin
  })

  await browser.close()

  return pdf
}
