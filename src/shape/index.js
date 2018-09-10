const Rect = require('./rect')
const Line = require('./line')

const shapes = {
  rect: Rect,
  line: Line,
}
shapes.rectangle = shapes.rect

const makeShape = function(str, obj, world) {
  if (shapes.hasOwnProperty(str) === true) {
    return new shapes[str](obj, world)
  }
  return null
}
module.exports = makeShape
