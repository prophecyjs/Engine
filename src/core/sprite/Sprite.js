import AnchorPoint from '../display/AnchorPoint'
import Container from '../display/Container'
import Texture from '../textures/Texture'

class Sprite extends Container {
  constructor (data) {
    super()

    this.anchor = new AnchorPoint()

    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.srcX = -1
    this.srcY = -1
    this.srcWidth = -1
    this.srcHeight = -1
    this.realHeight = 0
    this.realWidth = 0

    if (typeof data === 'object') {
      this.texture = data
    } else {
      this.texture = new Texture(data)
    }

    this.pluginName = 'sprite'
  }

  isSubSprite () {
    return (this.srcX !== -1 && this.srcY !== -1 && this.srcWidth !== -1 && this.srcHeight !== -1)
  }

  _renderCanvas (renderer) {
    renderer.plugins[this.pluginName].render(this)
  }

  _onTextureUpdate (texture) {
    if (!this.isSubSprite()) {
      this.width = texture.width
      this.height = texture.height
    }
    this.realWidth = texture.width
    this.realHeight = texture.height
  }

  get texture () {
    return this._texture
  }

  set texture (value) {
    if (this._texture === value) {
      return
    }

    this._texture = value

    if (value) {
            // wait for the texture to load
      if (value.isLoaded) {
        this._onTextureUpdate(this._texture)
      } else {
        value.once('update', this._onTextureUpdate, this)
      }
    }
  }
}

module.exports = Sprite
