
import dotenv from 'dotenv'

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 3000),
  API_KEY: process.env.API_KEY || '',
  MAX_HTML_SIZE_MB: Number(process.env.MAX_HTML_SIZE_MB || 30),
  RENDER_TIMEOUT_MS: Number(process.env.RENDER_TIMEOUT_MS || 30000)
}
