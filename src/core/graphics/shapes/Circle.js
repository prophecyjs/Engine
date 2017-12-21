import { SHAPES } from '../../const'

class Circle {
  constructor (x = 0, y = 0,radius = 20) {
    this.x = x || 0
    this.y = y || 0
    this.radius = radius;
    this.type = SHAPES.CIRC;
  }
}

module.exports = Circle