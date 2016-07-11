'use strict'

const _ = require('lodash')
const data = require('./data')
const env = require('./env')
const Promise = require('bluebird')

const artifacts = { data, env }

module.exports = function (config) {
  return Promise.props(_.mapValues(artifacts, (a) => a(config)));
}
