'use strict'

const loadProject = require('../../lib/prerequisites/load_project');
const loadExpense = require('../../lib/prerequisites/load_expense');

module.exports = function (artifacts) {
  return {
    method: 'PUT',
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
        const payload = req.payload;
        payload.project_id = req.params.project_id
        payload.id = req.params.id

        return artifacts.data.getDb().then(db => {
          return db.none("UPDATE expenses SET name=${name}, tags=${tags} WHERE project_id=${project_id} and id=${id}", payload);
        })
        .then((data) => {
          return { code: 200, object: payload }
        })
      },
      plugins: {
        ratify: require('./put_expense.schema')
      }
    }
  }
}
