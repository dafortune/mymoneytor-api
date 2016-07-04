
const Promise = require('bluebird')
const Hapi = Promise.promisifyAll(require('hapi'))

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

module.exports = server
