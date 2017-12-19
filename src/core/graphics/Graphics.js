import Container from '../display/Container'
import GraphicsData from './GraphicsData';
import Polygon from './shapes/Polygon';
import Color from '../color/Color'

class Graphics extends Container {
  constructor () {
    super()

    this.filling = false
    this.fillColor = null

    this.graphicsData = [];

    this.pluginName = 'graphics'
  }

  _renderCanvas (renderer) {
    renderer.plugins[this.pluginName].render(this)
  }

  beginFill (color = 0, alpha = 1) {
    this.fillColor = Color.fromHex(color)
    this.fillColor.alpha = alpha
    this.filling = false
    return this
  }

  endFill () {
    if (this.filling) {
      delete this.fillColor
    }

    this.filling = false
  }

  lineStyle (lineWidth = 0, color = 0, alpha = 1) {
    this.lineWidth = lineWidth;
    this.lineColor = color;
    this.lineAlpha = alpha;

    if (this.currentPath)
    {
      if (this.currentPath.shape.points.length)
      {
        // halfway through a line? start a new one!
        const shape = new Polygon(this.currentPath.shape.points.slice(-2));

        shape.closed = false;

        this.drawShape(shape);
      }
      else
      {
        // otherwise its empty so lets just set the line properties
        this.currentPath.lineWidth = this.lineWidth;
        this.currentPath.lineColor = this.lineColor;
        this.currentPath.lineAlpha = this.lineAlpha;
      }
    }

    return this;
  }

  drawShape(shape) {
    if (this.currentPath)
    {
      // check current path!
      if (this.currentPath.shape.points.length <= 2)
      {
        this.graphicsData.pop();
      }
    }

    this.currentPath = null;

    const data = new GraphicsData(
      this.lineWidth,
      this.lineColor,
      this.lineAlpha,
      this.fillColor,
      this.fillAlpha,
      this.filling,
      this.nativeLines,
      shape
    );

    this.graphicsData.push(data);

    // if (data.type === SHAPES.POLY)
    // {
      data.shape.closed = data.shape.closed || this.filling;
      this.currentPath = data;
    // }

    // this.dirty++;

    return data;
  }

  moveTo (x, y) {
    const shape = new Polygon([x, y]);

    shape.closed = false;
    this.drawShape(shape);

    return this;
  }

  lineTo (x, y) {
    this.currentPath.shape.points.push(x, y);
    return this;
  }

}

module.exports = Graphics