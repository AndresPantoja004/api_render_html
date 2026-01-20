export const renderSchema = {
  body: {
    type: 'object',
    required: ['html'],
    properties: {
      html: { type: 'string', minLength: 10 },
      options: { type: 'object' },
      meta: { type: 'object' }
    }
  }
}
