import Container from '../display/Container'
import TextData from './TextData'
import Color from '../color/Color'

class Text extends Container {
  constructor () {
    super()

    this.textcolor = Color.fromHex('#ffffff')
    this.fillColor = null
    this.fillAlpha = 0.5
    this.font = 'Arial'
    this.fontsize = 200;
    this.textdata = null
    this.pluginName = 'text'
  }

  set fontSize(size) {
    this._fontsize = size;
  }

  _renderCanvas (renderer) {
    renderer.plugins[this.pluginName].render(this)
  }

  drawText (string, x, y) {
    this.textdata = new TextData(
      string,
      x,
      y,
      this.fillAlpha,
    )
    return this
  }

  writeText (str, x, y) {
    return this.drawText(str, x, y)
  }
}

module.exports = Text