'use strict'

const _ = require('lodash')

exports.create = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 500,
      minLength: 1
    },
    tags: {
      type: ['null', 'array'],
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 500
      }
    }
  },
  required: ['name'],
  additionalProperties: false
}

exports.update = exports.create

exports.read = {
  type: 'object',
  properties: Object.assign({
    id: {
      type: 'integer'
    },
    project_id: {
      type: 'integer`'
    }
  }, exports.create.properties),
  required: ['id', 'name', 'tags', 'project_id'],
  additionalProperties: false
}
