const World = require('./World')
const version = require('../_version')

// ...people call this a 'factory'
const somehow = function(obj) {
  return new World(obj)
}
somehow.version = version
module.exports = somehow
