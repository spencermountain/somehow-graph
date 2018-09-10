const Rect = require('./rect')

const shapes = {
  rect: Rect,
}
shapes.rectangle = shapes.rect

const makeShape = function(str, obj, world) {
  if (shapes.hasOwnProperty(str) === true) {
    return new shapes[str](obj, world)
  }
  return null
}
module.exports = makeShape
