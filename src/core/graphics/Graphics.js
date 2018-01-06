import Container from '../display/Container'
import GraphicsData from './GraphicsData'
import { Polygon, Rectangle, RoundedRectangle, Circle, Ellipse } from './shapes'
import Color from '../color/Color'
import { SHAPES } from '../const'

class Graphics extends Container {
  constructor () {
    super()

    this.filling = false
    this.fillColor = null
    this.lineWidth = 0
    this.lineColor = 0
    this.lineAlpha = 1
    this.fillAlpha = 1

    this.graphicsData = []
    this.interactive = true
    this.pluginName = 'graphics'
  }

  _renderCanvas (renderer) {
    renderer.plugins[this.pluginName].render(this)
  }

  containsPoint (point) {
    const graphicsData = this.graphicsData

    for (let i = 0; i < graphicsData.length; ++i) {
      const data = graphicsData[i]

      if (!data.fill) {
        continue
      }

      // only deal with fills..
      if (data.shape) {
        if (data.shape.contains(point.x, point.y)) {
          return true
        }
      }
    }

    return false
  }

  beginFill (color = 0, alpha = 1) {
    this.fillColor = Color.fromHex(color)
    this.fillColor.a = alpha
    this.filling = true
    return this
  }

  endFill () {
    if (this.filling) {
      delete this.fillColor
    }

    this.filling = false
  }

  lineStyle (lineWidth = 0, color = '#0000', alpha = 1) {
    this.lineWidth = lineWidth
    this.lineColor = Color.fromHex(color)
    this.lineColor.a = alpha

    if (this.currentPath) {
      if (this.currentPath.shape.points.length) {
        // halfway through a line? start a new one!
        const shape = new Polygon(this.currentPath.shape.points.slice(-2))

        shape.closed = false

        this.drawShape(shape)
      }
      else {
        // otherwise its empty so lets just set the line properties
        this.currentPath.lineWidth = this.lineWidth
        this.currentPath.lineColor = this.lineColor
        this.currentPath.lineAlpha = this.lineAlpha
      }
    }

    return this
  }

  drawShape (shape) {
    if (this.currentPath) {
      if (this.currentPath.shape.points.length <= 2) {
        this.graphicsData.pop()
      }
    }

    this.currentPath = null

    const data = new GraphicsData(
      this.lineWidth,
      this.lineColor,
      this.lineAlpha,
      this.fillColor,
      this.fillAlpha,
      this.filling,
      this.nativeLines,
      shape
    )

    this.graphicsData.push(data)

    if (data.type === SHAPES.POLY) {
      data.shape.closed = data.shape.closed || this.filling
      this.currentPath = data
    }

    return data
  }

  drawRect (x, y, width, height) {
    this.drawShape(new Rectangle(x, y, width, height))

    return this
  }

  drawRoundedRect (x, y, width, height, radius) {
    this.drawShape(new RoundedRectangle(x, y, width, height, radius))

    return this
  }

  drawCircle (x, y, radius) {
    this.drawShape(new Circle(x, y, radius))

    return this
  }

  drawEllipse (x, y, width, height) {
    this.drawShape(new Ellipse(x, y, width, height))

    return this
  }

  moveTo (x, y) {
    const shape = new Polygon([x, y])

    shape.closed = false
    this.drawShape(shape)

    return this
  }

  lineTo (x, y) {
    this.currentPath.shape.points.push(x, y)
    return this
  }

}

module.exports = Graphics