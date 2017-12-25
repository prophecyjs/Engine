import { TEXTTYPES } from '../const'

class TextData {
  constructor (string, x, y, alpha = 1, font = 'Arial', fontsize = 8, textcolor, strokecolor, type) {
    this.string = string
    this.alpha = alpha
    this.x = x
    this.y = y
    this.font = font
    this.fontsize = fontsize
    this.textcolor = textcolor
    this.strokecolor = strokecolor;
    this.type = type || TEXTTYPES.NORMAL
  }
}

module.exports = TextData