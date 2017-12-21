import { SHAPES } from '../../const'

class CanvasGraphicsRenderer {
  constructor (renderer) {
    this.renderer = renderer
  }

  render (graphics) {

    const worldAlpha = 1

    this.renderer.context.save()

    if (graphics.transform.scale.factor > 0) {
      this.renderer.context.scale(graphics.transform.scale.x, graphics.transform.scale.y)
    }

    // TODO OOP the hell out of this below
    if (graphics.transform.rotation) {
      if (graphics.transform.scale.factor > 0) {
        this.renderer.context.translate((graphics.x + 0.5 * graphics.width) / graphics.transform.scale.factor, (graphics.x + 0.5 * graphics.height) / graphics.transform.scale.factor)
      } else {
        this.renderer.context.translate((graphics.x + 0.5 * graphics.width), (graphics.x + 0.5 * graphics.height))
      }
      this.renderer.context.rotate((Math.PI / 180) * graphics.transform.rotation)
      this.renderer.context.translate(-(graphics.x + 0.5 * graphics.width), -(graphics.x + 0.5 * graphics.height))
    }

    for (let i = 0; i < graphics.graphicsData.length; i++) {
      const data = graphics.graphicsData[i]
      const shape = data.shape

      // const fillColor = data._fillTint
      const lineColor = data._lineTint

      this.renderer.context.lineWidth = data.lineWidth

      if (data.type == SHAPES.POLY) {

        this.renderer.context.beginPath()

        this.renderPolygon(shape.points, shape.closed, this.renderer.context)

        if (data.fill) {
          this.renderer.context.globalAlpha = data.fillColor.a
          this.renderer.context.fillStyle = data.fillColor.toRgb()
          this.renderer.context.fill()
        }
        if (data.lineWidth) {
          this.renderer.context.strokeStyle = lineColor.toRgb()
          this.renderer.context.lineWidth = data.lineWidth
          this.renderer.context.stroke()
        }

      } else if (data.type == SHAPES.RECT) {

        if (data.fillColor || data.fillColor === 0) {
          this.renderer.context.globalAlpha = data.fillAlpha * worldAlpha
          this.renderer.context.fillStyle = data.fillColor.toRgb()
          this.renderer.context.fillRect(shape.x, shape.y, shape.width, shape.height)
        }
        if (data.lineWidth) {
          this.renderer.context.strokeStyle = lineColor.toRgb()
          this.renderer.context.lineWidth = data.lineWidth
          this.renderer.context.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }

      } else if (data.type === SHAPES.CIRC) {

        this.renderer.context.beginPath()
        this.renderer.context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
        this.renderer.context.closePath()

        if (data.fill) {
          this.renderer.context.globalAlpha = data.fillColor.a * worldAlpha
          this.renderer.context.fillStyle = data.fillColor.toRgb()
          this.renderer.context.fill()
        }
        if (data.lineWidth) {
          this.renderer.context.globalAlpha = lineColor.a * worldAlpha
          this.renderer.context.strokeStyle = lineColor.toRgb()
          this.renderer.context.stroke()
        }
      } else if (data.type === SHAPES.ELIP) {
        // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

        const w = shape.width * 2
        const h = shape.height * 2

        const x = shape.x - (w / 2)
        const y = shape.y - (h / 2)

        this.renderer.context.beginPath()

        const kappa = 0.5522848
        const ox = (w / 2) * kappa // control point offset horizontal
        const oy = (h / 2) * kappa // control point offset vertical
        const xe = x + w           // x-end
        const ye = y + h           // y-end
        const xm = x + (w / 2)       // x-middle
        const ym = y + (h / 2)       // y-middle

        this.renderer.context.moveTo(x, ym)
        this.renderer.context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
        this.renderer.context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
        this.renderer.context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
        this.renderer.context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)

        this.renderer.context.closePath()

        if (data.fill) {
          this.renderer.context.globalAlpha = data.fillColor.a * worldAlpha
          this.renderer.context.fillStyle = data.fillColor.toRgb()
          this.renderer.context.fill()
        }
        if (data.lineWidth) {
          this.renderer.context.globalAlpha = lineColor.a * worldAlpha
          this.renderer.context.strokeStyle = lineColor.toRgb()
          this.renderer.context.stroke()
        }
      } else if (data.type === SHAPES.RREC) {

        const rx = shape.x
        const ry = shape.y
        const width = shape.width
        const height = shape.height
        let radius = shape.radius

        const maxRadius = Math.min(width, height) / 2 | 0

        radius = radius > maxRadius ? maxRadius : radius

        this.renderer.context.beginPath()
        this.renderer.context.moveTo(rx, ry + radius)
        this.renderer.context.lineTo(rx, ry + height - radius)
        this.renderer.context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height)
        this.renderer.context.lineTo(rx + width - radius, ry + height)
        this.renderer.context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius)
        this.renderer.context.lineTo(rx + width, ry + radius)
        this.renderer.context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry)
        this.renderer.context.lineTo(rx + radius, ry)
        this.renderer.context.quadraticCurveTo(rx, ry, rx, ry + radius)
        this.renderer.context.closePath()

        if (data.fillColor || data.fillColor === 0) {
          this.renderer.context.globalAlpha = data.fillColor.a * worldAlpha
          this.renderer.context.fillStyle = data.fillColor.toRgb()
          this.renderer.context.fill()
        }

        if (data.lineWidth) {
          this.renderer.context.globalAlpha = data.lineColor.a * worldAlpha
          this.renderer.context.strokeStyle = data.lineColor.toRgb()
          this.renderer.context.stroke()
        }
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