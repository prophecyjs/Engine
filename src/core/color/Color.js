class Color {
  constructor (r, g, b, a) {
    this.r = r || -1
    this.g = g || -1
    this.b = b || -1
    this.a = a || 1
  }

  valid() {
    return (this.r > -1 && this.g > -1 && this.b > -1)
  }

  static fromHex (hex) {

    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    return new Color(r, g, b, 1)
  }
}

module.exports = Color