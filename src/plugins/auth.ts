import { FastifyRequest, FastifyReply } from 'fastify'
import { env } from '../config/env'

export async function apiKeyAuth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const auth = request.headers.authorization

  if (!auth || !auth.startsWith('Bearer ')) {
    return reply.status(401).send({
      error_code: 'UNAUTHORIZED',
      message: 'Missing API Key'
    })
  }

  const token = auth.replace('Bearer ', '')

  if (token !== env.API_KEY) {
    return reply.status(401).send({
      error_code: 'UNAUTHORIZED',
      message: 'Invalid API Key'
    })
  }
}
