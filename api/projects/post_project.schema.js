'use strict'

module.exports = {
  payload: require('./project.schema').create,
  response: {
    payload: require('./project.schema').read
  }
}
