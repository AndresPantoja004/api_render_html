export interface RenderOptions {
  format?: 'A4' | 'Letter'
  printBackground?: boolean
  margin?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
}

export interface RenderRequest {
  html: string
  options?: RenderOptions
  meta?: {
    type?: string
    reference_id?: number | string
  }
}
