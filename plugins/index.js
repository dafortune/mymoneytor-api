'use strict'

const _ = require('lodash')
const ratify = require('ratify')
const artifactsPlugin = require('./artifacts')
const errorsPlugin = require('./errors')

module.exports = function(artifacts, config) {

  function mockauth(server, options, next) {

    server.ext('onPostAuth', function(req, reply) {
      // TODO Workaround, remove when integrating login

      _.set(req, 'auth.credentials', { user_id: 1 })

      reply.continue();
    })

    next()
  }

  mockauth.attributes = {
    name: 'mockauth'
  }

  return [
    { register: artifactsPlugin, options: { artifacts } },
    { register: errorsPlugin, options: {} },
    { register: ratify, options: {} },
    { register: mockauth }
  ];
}
