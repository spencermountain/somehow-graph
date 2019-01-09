const World = require('./World')
const pkg = require('../package.json')
//
const somehow = function(obj) {
  return new World(obj)
}
somehow.version = pkg.version
module.exports = somehow
