import Texture from '../textures/Texture'
import Sprite from './Sprite'

/**
 * An SpriteSheet is an collections of Sprites combined in one image file.
 *
 * @class
 * @memberof py
 */
class SpriteSheet {
  /**
   * Create a new Spritesheet reprecenting a collection of Sprites.
   *
   * @constructor
   * @param {string} source - Source of the SpriteSheet.
   */
  constructor (source) {
    this.texture = new Texture(source)
  }

  onload () {}

  _onTextureUpdate (texture) {
    this.width = texture.width
    this.height = texture.height
    this.onload()
  }

  /**
   * Return the Spritesheet Texture.
   *
   * @returns {Texture}
   */
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
        this._onTextureUpdate()
      } else {
        value.once('update', this._onTextureUpdate, this)
      }
    }
  }

  /**
   * Return a sprite from the SpriteSheet.
   *
   * @param {number} x  The x coordinate of the Sprite
   * @param {number} y The y coordinate of the Sprite
   * @param {number} width The width of the Sprite
   * @param {number} height The height of the Sprite
   * @returns {(Sprite)} Return a sprite
   */
  getSprite (x, y, width, height) {
    var sprite = new Sprite(this._texture)
    sprite.srcX = x
    sprite.srcY = y
    sprite.width = width
    sprite.height = height
    sprite.srcWidth = width
    sprite.srcHeight = height
    return sprite
  }
}

module.exports = SpriteSheet
