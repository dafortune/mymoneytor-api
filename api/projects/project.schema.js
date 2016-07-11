'use strict'

const _ = require('lodash')

exports.create = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 500,
      minLength: 1
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
    }
  }, exports.create.properties),
  required: ['id', 'name'],
  additionalProperties: false
}
