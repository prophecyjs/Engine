import { TEXTTYPES } from '../../const'

class CanvasTextRenderer {
  constructor (renderer) {
    this.renderer = renderer
  }

  render (text) {

    const textdata = text.textdata

    this.renderer.context.save()

    this.renderer.context.font = textdata.fontsize + 'px ' + textdata.font
    this.renderer.context.fillStyle = textdata.textcolor.toRgb();
    this.renderer.context.strokeStyle= textdata.strokecolor.toRgb()

    if (textdata.type === TEXTTYPES.NORMAL) {
      this.renderer.context.fillText(textdata.string, textdata.x, textdata.y)
    } else if (textdata.type === TEXTTYPES.STROKED) {
      // console.log('strokeText')
      this.renderer.context.strokeText(textdata.string, textdata.x, textdata.y)
    }
    this.renderer.context.restore()
  }
}

module.exports = CanvasTextRenderer
