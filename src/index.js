const Rect = require('./rect')

// const saidPath = function() {}
const saidPath = {
  rect: function(width, height) {
    return new Rect(width, height)
  },
}
// Object.keys(methods).forEach((k) => saidPath.prototype[k] = methods[k])

module.exports = saidPath
