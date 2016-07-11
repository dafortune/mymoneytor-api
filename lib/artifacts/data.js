'use strict'

const Promise = require('bluebird')
const pb = require('promise-breaker')
const pgpb = require('pg-promise')

module.exports = function build (config) {
  const pgp = pgpb({ promiseLib: Promise })
  let db

  function setup() {
    db = pgp(config['DB'])

    return Promise.resolve(db)
  }

  function getDb() {
    return Promise.resolve(db)
  }

  return setup().return({ getDb })
}
