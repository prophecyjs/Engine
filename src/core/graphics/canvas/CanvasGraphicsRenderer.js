class CanvasGraphicsRenderer {
  constructor (renderer) {
    this.renderer = renderer
  }

  render (graphics) {
    // console.log('render graphics');
    const worldAlpha = 1

    this.renderer.context.save()

    for (let i = 0; i < graphics.graphicsData.length; i++) {
      const data = graphics.graphicsData[i]
      const shape = data.shape

      const fillColor = data._fillTint
      const lineColor = data._lineTint

      this.renderer.context.lineWidth = data.lineWidth

      this.renderer.context.beginPath()
      data.lineWidth = 1

      // console.log(shape);
      this.renderPolygon(shape.points, shape.closed, this.renderer.context)

      //
      // for (let j = 0; j < data.holes.length; j++) {
      //   this.renderPolygon(data.holes[j].points, true, this.renderer.context)
      // }

      if (data.fill) {
        this.renderer.context.globalAlpha = 1// data.fillAlpha * worldAlpha
        this.renderer.context.fillStyle = 'black'// `#${(`00000${(fillColor | 0).toString(16)}`).substr(-6)}`
        this.renderer.context.fill()
      }
      if (data.lineWidth) {
        this.renderer.context.globalAlpha = data.lineAlpha * worldAlpha
        this.renderer.context.strokeStyle = `#${(`00000${(lineColor | 0).toString(16)}`).substr(-6)}`
        this.renderer.context.stroke()
      }
    }

    this.renderer.context.restore()

  }

  renderPolygon (points, close, context) {
    context.moveTo(points[0], points[1])
    for (let j = 1; j < points.length / 2; ++j) {
      context.lineTo(points[j * 2], points[(j * 2) + 1])
    }

    if (close) {
      context.closePath()
    }
  }
}

module.exports = CanvasGraphicsRenderer