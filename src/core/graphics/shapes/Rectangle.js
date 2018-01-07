import { SHAPES } from '../../const'

// TODO: Hit testing fails on border

class Rectangle {
  constructor (x, y, w, h) {
    this.x = x || 0
    this.y = y || 0
    this.width = w || 0
    this.height = h || 0
    this.type = SHAPES.RECT
  }

  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this Rectangle
   */
  contains (x, y) {

    if (this.width <= 0 || this.height <= 0) {
      return false
    }

    if (x >= this.x && x < this.x + this.width) {
      if (y >= this.y && y < this.y + this.height) {
        return true
      }
    }

    return false
  }

}

module.exports = Rectangle
