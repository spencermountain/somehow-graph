//remove shapes outside of boundaries
const clipShapes = function(shapes, xScale, yScale) {
  shapes = shapes.filter(s => {
    let { x, y } = s.extent()
    //clip according to x-axis
    if (xScale._clip) {
      //support reversed min/max values
      let min = xScale.min
      let max = xScale.max
      if (min > max) {
        let tmp = min
        min = max
        max = tmp
      }
      if (x.min > max || x.max < min) {
        return false
      }
    }
    if (yScale._clip) {
      //support reversed min/max values
      let min = yScale.min
      let max = yScale.max
      if (min > max) {
        let tmp = min
        min = max
        max = tmp
      }
      if (y.min > max || y.max < min) {
        return false
      }
    }
    return true
  })

  return shapes
}
module.exports = clipShapes
