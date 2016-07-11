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
            'SELECT p.* ' +
            'FROM projects p INNER JOIN user_projects up ON p.id = up.project_id ' +
            'WHERE up.user_id=${user_id} and p.id=${project_id}', p)
        })
        .then(r => {
          if (!r) {
            return Promise.reject(Boom.notFound('Project not found', { code: errors.PROJECT_NOT_FOUND }))
          }

          return r
        })
        .asCallback(reply)
    },
    assign: 'project'
  }
}
