import { SHAPES } from '../../const'

class RoundedRectangle {
  constructor (x = 0, y = 0, width = 0, height = 0, radius = 20) {
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
    this.radius = radius;
    this.type = SHAPES.RREC;
  }
}

module.exports = RoundedRectangle