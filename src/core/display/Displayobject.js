import Transform from './Transform'
import { InteractionManager } from '../interaction'



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
    this.interactive = false;
    this._renderer = null;

    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0

    this.interactionManager = null;
  }

  set renderer(renderer) {
    this._renderer = renderer;
    this.initInteraction();
  }

  get renderer() {
    return this._renderer;
  }

  initInteraction() {
    this.interactionManager = new InteractionManager(this);
  }

}

module.exports = DisplayObject
