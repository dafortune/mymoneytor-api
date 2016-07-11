'use strict'

module.exports = {
  path: {
    type: 'object',
    properties: {
      id: require('../schemas/project_id.schema')
    },
    required: ['id']
  },
  payload: require('./project.schema').update,
  response: {
    payload: require('./project.schema').read
  }
}
