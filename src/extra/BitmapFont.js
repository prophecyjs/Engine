import Container from '../core/display/Container'
import { loader } from '../loader'

class BitmapFont extends Container {
  /**
   * Create a BitmapFont.
   * @param {string} url - Url to the fnt file
   */
  constructor (url) {
    super()

    this.loader = loader
    this.url = url

    if (typeof url == 'string') {
      loader.loadFile(url, 'bitmapfont_data').on('on.complete', (data) => {
        this._loaded(data)
        this._onbitmapload()
      })
    }

    this.chars = []
    this.spritesheet = null
    this._spacewidth = 10

    var parts = this.url.split('/')
    delete parts[parts.length - 1]

    this.path = parts.join('/')
  }

  _spritesheet_loaded () {

  }

  /** Font loaded */
  _loaded (data) {
    this.chars = data[this.url].data
    console.log('_loaded')
  }

  set spacewidth (width) {
    this._spacewidth = width
  }

  _onbitmapload () {}

  getSprite (character) {
    let charcode = this.ascii(character)
    let result = null

    if (typeof this.chars[charcode] != 'undefined') {
      let char = this.chars[charcode]
      char.width = parseInt(char.width)
      char.height = parseInt(char.height)
      char.xadvance = parseInt(char.xadvance)
      char.xoffset = parseInt(char.xoffset)
      char.yoffset = parseInt(char.yoffset)
      char.x = parseInt(char.x)
      char.y = parseInt(char.y)

      let sprite = this.spritesheet.getSprite(char.x, char.y, char.width, char.height)
      result = sprite
    }

    return result
  }

  ascii (a) {
    return a.charCodeAt(0)
  }

  write (str, x, y) {
    if (this.spritesheet) {
      for (var i = 0; i < str.length; i++) {
        var character = str[i]
        var charcode = this.ascii(character)
        var sprite = this.getSprite(character)

        if (typeof this.chars[charcode] != 'undefined' && sprite) {
          var char = this.chars[charcode]

          if (character == ' ') {
            char.width = this._spacewidth / 2
            char.xoffset = this._spacewidth / 2
            console.log(char)
          }

          sprite.x = x
          sprite.y = y + char.yoffset

          x += parseInt(char.xoffset) + sprite.width

          this.addChild(sprite)
        }
      }
    }
  }
}

module.exports = BitmapFont
