'use strict'

module.exports = function (artifacts) {
  return {
    method: 'GET',
    path: 'users/{user_id}/project/{project_id}/expenses/{id}',
    config: {
      handler: function (req) {
        return artifacts.data.getCollection('expenses')
          .find({
            _id: req.params.id,
            project_id: req.params.project_id,
            user_id: req.params.user_id
          })
          .then()
      }
    }
  }
}
