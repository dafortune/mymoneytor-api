'use strict'

const Promise = require('bluebird')
const glob = Promise.promisify(require('glob'))
const path = require('path')
const artifactsBuilder = require('./lib/artifacts')
const standaloneServer = require('./standalone_server')
const standaloneConfig = require('./standalone_config')
const plugins = require('./plugins');

const hpw = require('hapi-promise-wrapper')
require("babel-core/register");

const setup = module.exports = function setup (server, config) {
  function loadArtifacts () {
    return artifactsBuilder(config)
  }

  function getRoutes () {
    return glob('api/**/*.route.js', { root: __dirname })
      .map(file => require(path.join(__dirname, file)))
  }

  server.on('request-error', function (request, err) {
    console.error(err, err.stack);
  });

  return loadArtifacts()
    .tap(artifacts => server.registerAsync(plugins(artifacts, config)))
    .then(artifacts => {
      return getRoutes().map(r => r(artifacts, config))
    })
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
