import CanvasSpriterRenderer from './sprite/canvas/CanvasSpriteRenderer'

class Renderer {
  constructor (size, options) {
    var canvas = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height
    this.width = size.width
    this.height = size.height
    this.context = canvas.getContext('2d')
    this.view = canvas

    Object.assign(this.view.style, options)
    this.plugins = []
    this.plugins['sprite'] = new CanvasSpriterRenderer(this)
  }

  render (displayobject) {
    this.clear()
    displayobject.renderCanvas(this)
  }

  clear () {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}

module.exports = Renderer
