import Container from '../display/Container'

class Graphics extends Container {
  constructor () {
    super()

    this.filling = false
    this.fillColor = null

  }

  beginFill (color = 0, alpha = 1) {
    this.fillColor = Color.fromHex(color)
    this.fillColor.alpha = alpha
    this.filling = false
    return this
  }

  endFill () {

    if (this.filling) {
      delete this.fillColor
    }

    this.filling = false
  }

  lineStyle (lineWidth = 0, color = 0, alpha = 1) {

  }

  moveTo (x, y) {

  }

  lineTo (x, y) {

  }

}

module.exports = Graphics