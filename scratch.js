const saidPath = require('./src')

let data = [25, 40, 90, 75]
let world = saidPath.rect(200, 100)

console.log(world.line(data))
