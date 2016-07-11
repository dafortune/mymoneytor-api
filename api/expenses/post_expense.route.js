'use strict'

const loadProject = require('../../lib/prerequisites/load_project');

module.exports = function (artifacts) {
  return {
    method: 'POST',
    path: '/api/projects/{project_id}/expenses',
    config: {
      pre: [
        loadProject(req => ({ user_id: req.auth.credentials.user_id, project_id: req.params.project_id }))
      ],
      handler: function (req) {
        const payload = req.payload;
        payload.project_id = req.params.project_id
        payload.tags = payload.tags || null

        return artifacts.data.getDb().then(db => {
          return db.one("INSERT INTO expenses(name, tags, project_id) VALUES(${name}, ${tags}, ${project_id}) returning id", payload);
        })
        .then((data) => {
          payload.id = data.id

          return { code: 201, object: payload }
        })
      },
      plugins: {
        ratify: require('./post_expense.schema')
      }
    }
  }
}
