'use strict'

const loadExpense = require('../../lib/prerequisites/load_expense');

module.exports = function (artifacts) {
  return {
    method: 'DELETE',
    path: '/api/projects/{project_id}/expenses/{id}',
    config: {
      pre: [
        loadExpense(req => ({
          user_id: req.auth.credentials.user_id,
          project_id: req.params.project_id,
          expense_id: req.params.id
        }))
      ],
      handler: function (req) {
        return artifacts.data.getDb().then(db => {
          return db.result(
            'DELETE FROM expenses e ' +
            'WHERE project_id=${project_id} and id=${id}'
            , req.params)
        })
        .return({ code: 204, object: {} })
      },
      plugins: {
        ratify: require('./del_expense.schema')
      }
    }
  }
}
