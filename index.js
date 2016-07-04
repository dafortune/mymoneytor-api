'use strict'

const Promise = require('bluebird')
const glob = Promise.promisify(require('glob'))
const path = require('path')
const artifactsBuilder = require('./lib/artifacts')
const standaloneServer = require('./standalone_server')
const standaloneConfig = require('./standalone_config')
const hpw = require('hapi-promise-wrapper')

const setup = module.exports = function setup (server, config) {
  function loadArtifacts () {
    return artifactsBuilder(config)
  }

  function getRoutes () {
    return glob('api/**/*.js', { root: __dirname })
      .map(file => require(path.join(__dirname, file)))
  }

  return loadArtifacts()
    .then(artifacts => getRoutes().map(r => r(artifacts, config)))
    .each(route => {
      if (route.method && route.path) {
        server.route(hpw.wrapRouteHandler(route))
      }
    })
}

if (require.main === module) {
  standaloneConfig()
    .then((config) => setup(standaloneServer, config))
    .then(() => standaloneServer.startAsync())
    .tap(() => console.log('Server listening! PORT=' + standaloneServer.info.port))
}
