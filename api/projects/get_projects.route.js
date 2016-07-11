'use strict'

module.exports = function (artifacts) {
  return {
    method: 'GET',
    path: '/api/projects',
    config: {
      handler: function (req) {
        const params = req.params
        params.user_id = req.auth.credentials.user_id

        return artifacts.data.getDb()
          .then(db => {
            return db.manyOrNone(
              'SELECT p.id as id, p.name as name ' +
              'FROM projects p INNER JOIN user_projects up ON p.id = up.project_id ' +
              'INNER JOIN users u ON u.id = up.user_id ' +
              'WHERE u.id=${user_id}', params)
          })
      },
      plugins: {
        ratify: require('./get_projects.schema')
      }
    }
  }
}
