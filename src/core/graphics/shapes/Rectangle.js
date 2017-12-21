import { SHAPES } from '../../const';

class Rectangle {
  constructor (x, y, w, h) {
    this.x = x || 0
    this.y = y || 0
    this.width = w || 0
    this.height = h || 0
    this.type = SHAPES.RECT;
  }
}

module.exports = Rectangle
