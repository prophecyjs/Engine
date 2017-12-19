class Polygon {
  constructor (...points) {
    // if this is an array of points, convert it to a flat array of numbers

    if (Array.isArray(points[0])) {
      points = points[0]
    }

    if (typeof points[0] == 'object') {
      const p = []

      for (let i = 0, il = points.length; i < il; i++) {
        p.push(points[i].x, points[i].y)
      }

      points = p
    }

    this.closed = true

    /**
     * An array of the points of this polygon
     *
     * @member {number[]}
     */
    this.points = points
  }
}

module.exports = Polygon
