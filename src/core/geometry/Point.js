class Point {
  constructor (x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  static create(x, y) {
    return new Point(x, y)
  }
}

module.exports = Point
