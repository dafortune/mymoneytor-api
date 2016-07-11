'use strict'

module.exports = {
  path: {
    type: 'object',
    properties: {
      project_id: require('../../schemas/project_id.schema'),
      expense_id: require('../../schemas/expense_id.schema'),
    }
  },
  response: {
    payload: {
      type: 'object',
      properties: {
        type: 'array',
        items: require('./expense_picture.schema').read
      }
    }
  }
}
