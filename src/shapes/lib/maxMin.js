
//
const maxMin = function(data) {
  let g = {
    x: {
      max: 0,
      min: 0
    },
    y: {
      max: 0,
      min: 0
    }
  }
  data.forEach((o) => {
    if (o.x > g.x.max) {
      g.x.max = o.x
    } else if (o.x < g.x.min) {
      g.x.min = o.x
    }
    if (o.y > g.y.max) {
      g.y.max = o.y
    } else if (o.y < g.y.min) {
      g.y.min = o.y
    }
  })
  return g
}
module.exports = maxMin
