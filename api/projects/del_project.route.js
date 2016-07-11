'use strict'

const loadProject = require('../../lib/prerequisites/load_project');

module.exports = function (artifacts) {
  return {
    method: 'DELETE',
    path: '/api/projects/{id}',
    config: {
      pre: [
        loadProject((req) => ({ project_id: req.params.id, user_id: req.auth.credentials.user_id }))
      ],
      handler: function (req) {
        return req.pre.artifacts.data.getDb()
          .then(db => {
            return db.tx(tx => {
              return db.none("DELETE FROM user_projects WHERE project_id=${id}", req.params)
                .then(() => db.none("DELETE FROM projects WHERE id=${id}", req.params))
            })
          })
          .return({ code: 204, object: {} })
      },
      plugins: {
        ratify: require('./del_project.schema')
      }
    }
  }
}
