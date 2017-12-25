import { Sprite }  from '../core/Sprite'
import Renderer from '../core/renderer'
import Size from '../core/geometry/size'


class TilingSprite extends Sprite {
  constructor (texture, width = 100, height = 100) {
    super(texture);

    this.area = {
      width: width,
      height: height
    }

    this.tilePosition = {
      x: 0,
      y: 0,
    }

    this.tileScale = {
      x: 1,
      y: 1,
    }


    this.size = new Size(this.width, this.height);
    this.shadowCanvas = new Renderer(this.size, {})
//    this.shadowCanvas = Application
  }

  _renderCanvas(renderer) {
    if (! this.texture.isLoaded) {
      return false;
    }

    var resolution = 1;
    const modX = ((this.tilePosition.x / this.tileScale.x) % this.texture.width) * resolution;
    const modY = ((this.tilePosition.y / this.tileScale.y) % this.texture.height) * resolution;

    // this.anchor.x
    const anchorX = 0 * -this.area.width;
    const anchorY = 0 * -this.area.height;

    var context = renderer.context;
    var _canvas = document.createElement('canvas')
    var _ctx = _canvas.getContext('2d')

    var pat=_ctx.createPattern(this.texture.raw,"repeat");

    // context.clearRect(0,0, this.area.width, this.area.height);


    context.save()

    context.translate(this.x, this.y);
    context.translate(modX + anchorX, modY + anchorY);



    context.fillStyle=pat;
    context.fillRect(-modX,-modY,
      this.area.width / this.tileScale.x * resolution,
      this.area.height / this.tileScale.y * resolution);

      context.restore()

   // context.fill();
  }
}

module.exports = TilingSprite