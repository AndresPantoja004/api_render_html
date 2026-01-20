import Fastify from 'fastify'
import { renderRoutes } from './routes/render.route'

export function buildApp() {
  const app = Fastify({
    logger: true,
    bodyLimit: 30 * 1024 * 1024 // 30 MB
  })

  app.register(renderRoutes)

  return app
}
