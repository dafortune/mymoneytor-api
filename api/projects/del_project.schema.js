'use strict'

module.exports = {
  path: {
    type: 'object',
    properties: {
      id: require('../schemas/project_id.schema')
    },
    required: ['id']
  },
  payload: {
    type: 'null'
  },
  response: {
    payload: {
      type: 'null'
    }
  }
}
