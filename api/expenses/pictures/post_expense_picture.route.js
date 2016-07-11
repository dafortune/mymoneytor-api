'use strict'

const loadExpense = require('../../../lib/prerequisites/load_expense');

module.exports = function (artifacts) {
  return {
    method: 'POST',
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
        const payload = req.payload;
        payload.expense_id = req.params.expense_id

        return req.pre.artifacts.data.getDb()
          .then(db => {
            return db.one("INSERT INTO expense_pictures(type, file_id, expense_id) VALUES(${type}, ${file_id}, ${expense_id}) returning id", payload);
          })
          .then((data) => {
            payload.id = data.id

            return { code: 201, object: payload }
          })
      },
      plugins: {
        ratify: require('./post_expense_picture.schema')
      }
    }
  }
}
