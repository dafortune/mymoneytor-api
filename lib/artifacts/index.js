'use strict'

const _ = require('lodash')
const data = require('./data')
const env = require('./env')
const Promise = require('bluebird')

const artifacts = { data, env }

module.exports = function (config) {
  return Promise.all(_.map(artifacts, (a) => a(config)))
    .return(artifacts)
}
