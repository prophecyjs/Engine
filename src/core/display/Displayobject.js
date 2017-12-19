import Transform from './Transform'

/**
 * The object class is the parent of all displayable objects in the engine.
 *
 * @class
 * @memberof py
 */
class DisplayObject {
  constructor () {
    this.alpha = 1
    this.visible = true
    this.renderable = true
    this.parent = null
    this.filterArea = null
    this.transform = new Transform()

    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
  }
}

module.exports = DisplayObject
