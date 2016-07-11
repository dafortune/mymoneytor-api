'use strict'

module.exports = function (artifacts) {
  return {
    method: 'POST',
    path: '/api/projects',
    config: {
      handler: function (req) {
        const payload = req.payload

        return artifacts.data.getDb().then(db => {
          return db.one("INSERT INTO projects(name) VALUES(${name}) returning id", payload)
            .tap((data) => {
              const up = {
                user_id: req.auth.credentials.user_id,
                project_id: data.id
              }

              return db.none("INSERT INTO user_projects(user_id, project_id) VALUES(${user_id}, ${project_id})", up)
            })
        })
        .then((data) => {
          payload.id = data.id

          return { code: 201, object: payload }
        })
      },
      plugins: {
        ratify: require('./post_project.schema')
      }
    }
  }
}
