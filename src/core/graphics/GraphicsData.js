class GraphicsData {
  constructor (lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, nativeLines, shape) {
    this.lineWidth = lineWidth
    this.nativeLines = nativeLines
    this.lineColor = lineColor
    this.lineAlpha = lineAlpha
    this._lineTint = lineColor
    this.fillColor = fillColor
    // this.fillAlpha = fillAlpha
    this._fillTint = fillColor
    this.fill = fill
    this.holes = []
    this.shape = shape
    this.type = shape.type
    this.interactive = true
  }
}

module.exports = GraphicsData