'use strict'

const artifacts = module.exports = function artifacts(server, options, next) {
  server.ext('onPostAuth', function(req, reply) {
    req.pre.artifacts = options.artifacts

    reply.continue()
  })

  next()
}

artifacts.attributes = {
  name: 'artifacts'
}
