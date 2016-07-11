'use strict'

const loadProject = require('../../lib/prerequisites/load_project');

module.exports = function (artifacts) {
  return {
    method: 'PUT',
    path: '/api/projects/{id}',
    config: {
      pre: [
        loadProject((req) => ({ project_id: req.params.id, user_id: req.auth.credentials.user_id }))
      ],
      handler: function (req) {
        const payload = req.payload
        payload.id = req.params.id

        return artifacts.data.getDb().then(db => {
          return db.none("UPDATE projects SET name=${name} WHERE id=${id}", payload)
        })
        .return({ code: 200, object: payload })
      },
      plugins: {
        ratify: require('./put_project.schema')
      }
    }
  }
}
