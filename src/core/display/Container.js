import DisplayObject from './Displayobject'

/**
 * The container is a plain that you can use to put objects on.
 *
 * @class
 * @memberof py
 */
class Container extends DisplayObject {
  constructor () {
    super()
    this._parent = null
    this.children = []
  }

  /**
   * Returns the parent object.
   *
   * @returns {*}
   */
  get parent () {
    return this._parent
  }

  /**
   * Set the parent object.
   *
   * @param {*} parent
   */
  set parent (parent) {
    this._parent = parent
  }

  /**
   * Add a new child to the container. This could be a sprite or a text.
   *
   * @param {*} child to add
   * @returns {boolean}
   */
  addChild (child) {
    if (!child) {
      return false
    }

    if (this.hasChild(child)) {
        return false;
    }

    child._parent = this
    this.children.push(child)
  }

  /**
   * Check to see if a child is already added to the container.
   *
   * @param {*} child object
   * @returns {boolean}
   */
  hasChild (child) {
    return (this.children.indexOf(child) > -1)
  }

  /**
   * The callback can be overwritten by the parent class.
   * You can render CANVAS or WebGL.
   *
   * @param renderer
   * @private
   */
  _renderCanvas (renderer) {
    // this is where content itself gets rendered...
  }

  /**
   * Render the current container using the given renderer.
   *
   * @param renderer
   */
  renderCanvas (renderer) {
    // if not visible or the alpha is 0 then no need to render this
    if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
      return
    }

    //
    // if (this._mask)
    // {
    //     renderer.maskManager.pushMask(this._mask);
    // }

    this._renderCanvas(renderer)
    for (let i = 0, j = this.children.length; i < j; ++i) {
      this.children[i].renderCanvas(renderer)
    }

    // if (this._mask)
    // {
    //     renderer.maskManager.popMask(renderer);
    // }
  }
}

module.exports = Container
