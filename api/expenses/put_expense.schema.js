'use strict'

module.exports = {
  path: {
    type: 'object',
    properties: {
      project_id: require('../schemas/project_id.schema'),
      id: require('../schemas/expense_id.schema')
    }
  },
  payload: require('./expense.schema').update,
  response: {
    payload: require('./expense.schema').read
  }
}
