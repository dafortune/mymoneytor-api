'use strict'

const mongoGetDb = require('mongo-getdb')
const Promise = require('bluebird')
const pb = require('promise-breaker')

module.exports = function build (config) {
  const setup = function setup () {
    mongoGetDb.init(config.db)

    return Promise.resolve()
  }

  const getDb = pb.make(function getDb (cb) {
    return mongoGetDb(db => cb(null, db)).then(db => Promise.resolve(db))
  })

  const getCollection = pb.break(function getCollection (name) {
    return getDb().then(db => db.collection(name)).then(c => Promise.resolve(c))
  })

  return setup().return({ getDb, getCollection })
}
