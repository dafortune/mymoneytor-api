'use strict'

const Promise = require('bluebird')

module.exports = function build (config) {
  const env = config

  const setup = function setup () {
    return Promise.resolve()
  }

  const get = function get (name) {
    return env[name]
  }

  get.setup = setup
  get.get = get

  return setup().return(get)
}
