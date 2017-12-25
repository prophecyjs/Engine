import Container from '../display/Container'
import TextData from './TextData'
import Color from '../color/Color'
import { TEXTTYPES } from '../const'


class Text extends Container {
  constructor () {
    super()

    this._textcolor = Color.fromHex('#ffffff')
    this._strokecolor = Color.fromHex('#ffffff')
    this.fillAlpha = 0.5
    this._font = 'Arial'
    this._fontsize = 18
    this.textdata = null
    this.pluginName = 'text'
  }

  set strokeColor (color) {
    this._strokecolor = Color.fromHex(color);
  }

  set textColor (color) {
    this._textcolor = Color.fromHex(color);
  }

  set fontSize (size) {
    this._fontsize = size
  }

  set font (font) {
    this._font = font
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
      this._font,
      this._fontsize,
      this._textcolor,
      this._strokecolor,
      TEXTTYPES.NORMAL,
    )
    return this
  }

  drawStrokedText (string, x, y) {
    this.textdata = new TextData(
      string,
      x,
      y,
      this.fillAlpha,
      this._font,
      this._fontsize,
      this._textcolor,
      this._strokecolor,
      TEXTTYPES.STROKED,
    )
    return this
  }

  writeText (str, x, y) {
    return this.drawText(str, x, y)
  }

  writeStrokedText (str, x, y) {
    return this.drawStrokedText(str, x, y)
  }
}

module.exports = Text