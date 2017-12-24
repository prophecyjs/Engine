class CanvasTextRenderer {
  constructor (renderer) {
    this.renderer = renderer
  }

  render (text) {

    const textdata = text.textdata

    this.renderer.context.save()

    this.renderer.context.fillStyle = '#ffd900'
    this.renderer.context.fillText(textdata.string, textdata.x, textdata.y)
    console.log(textdata)
    this.renderer.context.restore()
  }
}

module.exports = CanvasTextRenderer
