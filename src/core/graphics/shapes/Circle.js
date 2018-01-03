import { SHAPES } from '../../const'

class Circle {
  constructor (x = 0, y = 0, radius = 20) {
    this.x = x || 0
    this.y = y || 0
    this.radius = radius
    this.type = SHAPES.CIRC
  }

  contains (x, y) {
    if (this.radius <= 0)
    {
      return false;
    }

    const r2 = this.radius * this.radius;
    let dx = (this.x - x);
    let dy = (this.y - y);

    dx *= dx;
    dy *= dy;

    return (dx + dy <= r2);
  }

}

module.exports = Circle