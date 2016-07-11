'use strict'

const _ = require('lodash')

exports.create = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      maxLength: 500,
      minLength: 1
    },
    file_id: {
      type: 'string',
      maxLength: 500,
      minLength: 1
    }
  },
  required: ['type', 'file_id'],
  additionalProperties: false
}

exports.update = exports.create

exports.read = {
  type: 'object',
  properties: Object.assign({
    expense_id: {
      type: 'integer'
    },
    id: {
      type: 'integer'
    }
  }, exports.create.properties),
  required: ['type', 'file_id', 'expense_id', 'id'],
  additionalProperties: false
}
