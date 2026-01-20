import { FastifyInstance } from 'fastify'
import { renderPdf } from '../services/pdf.service'
import { renderSchema } from '../schemas/render.schema'
import { apiKeyAuth } from '../plugins/auth'
import { env } from '../config/env'

export async function renderRoutes(app: FastifyInstance) {

  app.post(
    '/render/pdf',
    { preHandler: apiKeyAuth, schema: renderSchema },
    async (request, reply) => {

      const { html, options, meta } = request.body as any

      const htmlSizeMB = Buffer.byteLength(html, 'utf8') / 1024 / 1024
      if (htmlSizeMB > env.MAX_HTML_SIZE_MB) {
        return reply.status(413).send({
          error_code: 'HTML_TOO_LARGE',
          message: `HTML exceeds ${env.MAX_HTML_SIZE_MB}MB`
        })
      }

      const start = Date.now()
      const pdf = await renderPdf(html, options)
      const renderTime = Date.now() - start

      app.log.info({
        meta,
        htmlSizeMB,
        renderTime
      }, 'PDF rendered')

      reply
        .header('Content-Type', 'application/pdf')
        .header(
          'Content-Disposition',
          `inline; filename="${meta?.type || 'document'}_${meta?.reference_id || 'output'}.pdf"`
        )
        .send(pdf)
    }
  )
}
