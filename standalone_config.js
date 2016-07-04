'use strict'

const Promise = require('bluebird')

module.exports = function () {
  return Promise.resolve(process.env)
}
