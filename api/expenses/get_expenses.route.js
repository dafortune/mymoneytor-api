'use strict'

const loadProject = require('../../lib/prerequisites/load_project');

module.exports = function (artifacts) {
  return {
    method: 'GET',
    path: '/api/projects/{project_id}/expenses',
    config: {
      pre: [
        loadProject(req => ({ user_id: req.auth.credentials.user_id, project_id: req.params.project_id }))
      ],
      handler: function (req) {
        return artifacts.data.getDb()
          .then(db => {
            const params = req.params;
            params.user_id = req.auth.credentials.user_id

            return db.manyOrNone(
              'SELECT e.* ' +
              'FROM expenses e ' +
              'INNER JOIN user_projects up ON up.project_id = e.project_id ' +
              'WHERE up.user_id=${user_id} and e.project_id=${project_id}', params)
          })
      },
      plugins: {
        ratify: require('./get_expenses.schema')
      }
    }
  }
}
