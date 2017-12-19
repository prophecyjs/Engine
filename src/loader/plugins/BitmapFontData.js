var BitmapFontData = {

  getInfo: function () {
    return {
      callback: this.handler,
      types: ['bitmapfont_data']
    }
  },
  handler: function (data) {
    console.log('PARSE BITMAP')

    this.chars = []
    var content = data.split('\n')
    this.image = ''

    content.forEach((line) => {
      if (line.substr(0, 5) == 'page ') {
        var line = line.substr(5)
        line = line.replace(/ +/g, '@')
        var properties = line.split('@')

        properties.forEach((property) => {
          property = property.replace(/  +/g, '');
          property = property.split('=')

          if (property[0] == 'file') {
            this.image = property[1].replace(/\"+/g, '')
          }
        })
      }
      if (line.substr(0, 4) == 'char' && line.substr(0, 5) != 'chars') {
        var line = line.substr(4)
        line = line.replace(/  +/g, '@');
        var properties = line.split('@')
        var char = []

        properties.forEach((property) => {
          property = property.replace(' ', '')
          property = property.split('=')
          char[property[0]] = property[1]
        })

        this.chars[char.id] = char
      }

    })

    return this.chars
  }
}
module.exports = BitmapFontData