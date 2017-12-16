
import EventEmitter from 'eventemitter3'
export const TextureCache = Object.create(null)

class Texture extends EventEmitter {
  constructor (src) {
    super()

    this.raw = ''
    this.width = 0
    this.height = 0
    this.isLoaded = false

    if (src) {
      var image = new Image()
      image.src = src
      image.onload = (e) => {
        this.raw = image
        this.width = image.width
        this.height = image.height
        this.isLoaded = true
        this.emit('update', this)
      }
    }
  }

    /**
     * @static
     * @param src
     */
  static fromImage (src) {
    let texture = TextureCache[src] || null

    if (src) {
      texture = new Texture(src)
      texture.addToCache(new Texture(src), src)
    }
    return texture
  }

  addToCache (texture, key) {
    TextureCache[key] = texture
  }
}
module.exports = Texture
