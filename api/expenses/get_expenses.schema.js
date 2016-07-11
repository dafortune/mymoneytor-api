'use strict'

module.exports = {
  path: {
    type: 'object',
    properties: {
      project_id: require('../schemas/project_id.schema')
    }
  },
  response: {
    payload: {
      type: 'object',
      properties: {
        type: 'array',
        items: {
          type: 'object',
          properties: require('./expense.schema').read
        }
      },
      required: ['id', 'name', 'tags', 'project_id'],
      additionalProperties: false
    }
  }
}
