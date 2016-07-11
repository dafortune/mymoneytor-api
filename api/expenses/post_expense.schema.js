'use strict'

module.exports = {
  payload: require('./expense.schema').create,
  response: {
    payload: require('./expense.schema').read
  }
}
