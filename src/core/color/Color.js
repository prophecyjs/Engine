class Color {
  constructor (r, g, b, a) {
    this.r = r || 0
    this.g = g || 0
    this.b = b || 0
    this.a = a || 1
  }

  valid() {
    return (this.r > 0 && this.g > 0 && this.b > 0)
  }

  static fromHex (hex) {

    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    return new Color(r, g, b, 1)
  }

  toRgb() {
    return 'rgb('+this.r+','+this.g+','+this.b+')';
  }

  toRgba() {
    return 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
  }
}

module.exports = Color