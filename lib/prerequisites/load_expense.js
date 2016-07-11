'use strict'

const Boom = require('boom')
const Promise = require('bluebird')
const errors = require('../errors')

module.exports = function(params) {

  return {
    method: function(req, reply) {
      const p = params(req)

      return req.pre.artifacts.data.getDb()
        .then(db => {
          return db.oneOrNone(
            'SELECT e.* ' +
            'FROM expenses e INNER JOIN user_projects up ON e.project_id = up.project_id ' +
            'WHERE up.user_id=${user_id} and e.project_id=${project_id} and e.id=${expense_id}', p)
        })
        .then(r => {
          if (!r) {
            return Promise.reject(Boom.notFound('Expense not found', { code: errors.EXPENSE_NOT_FOUND }))
          }

          return r
        })
        .asCallback(reply)
    },
    assign: 'expense'
  }
}
