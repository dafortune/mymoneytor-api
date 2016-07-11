'use strict'

const loadExpense = require('../../../lib/prerequisites/load_expense');

module.exports = function (artifacts) {
  return {
    method: 'GET',
    path: '/api/projects/{project_id}/expenses/{expense_id}/pictures',
    config: {
      pre: [
        loadExpense(req => ({
          user_id: req.auth.credentials.user_id,
          project_id: req.params.project_id,
          expense_id: req.params.expense_id
        }))
      ],
      handler: function (req) {
        return req.pre.artifacts.data.getDb()
          .then(db => {
            const params = req.params

            return db.manyOrNone(
              'SELECT ep.* ' +
              'FROM expense_pictures ep ' +
              'INNER JOIN expenses e ON ep.expense_id = e.id ' +
              'WHERE e.project_id=${project_id} and e.id=${expense_id}', params)
          })
      },
      plugins: {
        ratify: require('./get_expense_pictures.schema')
      }
    }
  }
}
