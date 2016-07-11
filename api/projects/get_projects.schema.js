'use strict'

module.exports = {
  path: {
    type: 'object',
    properties: {},
    additionalProperties: false
  },
  response: {
    payload: {
      type: 'array',
      items: require('./project.schema').read
    }
  }
}
