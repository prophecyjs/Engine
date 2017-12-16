/**
 * An Anchor point is the central focus point of a graphical object. For example if you want to rotate
 * an image around it's axle the center point the anchor is in the middle. By default an anchor point is
 * top left of any object.
 *
 * @class
 * @memberof py
 */
class AnchorPoint {
  constructor () {
    this._x = 0
    this._y = 0
  }

    /**
     * Sets the point to a new x and y position.
     * If y is omitted, both x and y will be set to x.
     *
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=0] - position of the point on the y axis
     */
  set (x, y) {
    const _x = x || 0
    const _y = y || ((y !== 0) ? _x : 0)

        /**
         * if this._x != 0 || this._y !== _y
         */
    if (this._x !== _x || this._y !== _y) {
      this._x = _x
      this._y = _y
      this.cb.call(this.scope)
    }
  }

    /**
     * The center x position of the object.
     *
     * @member {number}
     */
  get x () {
    return this._x
  }

    /**
     * The center y position of the object.
     *
     * @member {number}
     */
  get y () {
    return this._y
  }

  set x (x) {
    this._x = x
  }

  set y (y) {
    this._y = y
  }
}

module.exports = AnchorPoint
