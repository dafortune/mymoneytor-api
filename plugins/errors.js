'use strict'

module.exports.register = function errors(server, options, next) {
  server.ext('onPostHandler', function(req, reply) {
    if (typeof req.response !== 'object' || req.response === null || !req.response.isBoom) {
      return reply(req.response)
    }

    req.response.output.payload.errorCode = req.response.data.code

    reply.continue()
  })

  next();
}

module.exports.register.attributes = {
  name: 'errors'
}
