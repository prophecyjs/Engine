import { loader } from '../../loader'
import Container from '../../core/display/Container'
import TileSet from './TileSet'
import pako from 'pako'
import Sprite from '../../core/Sprite/Sprite'

class TiledMap extends Container {

  constructor (url) {
    super()

    this.loader = loader
    this.mapdata = null
    this.layers = []
    this.tilesets = []
    this._tilesetSourcePath = ''

    this.viewRect = {
      x: 0,
      y: 0,
      w: 1000,
      h: 1000
    }

    this.tileSize = {
      x: 0,
      y: 0,
    }

    this.numXTiles = 0
    this.numYTiles = 0

    loader.loadFile(url, 'tiledmap_data').on('on.complete', (data) => {
      this._loaded(data)
    })
  }

  set tilesetSourcePath (path) {
    this._tilesetSourcePath = path
  }

  _loaded (response) {
    this.data = response.tiledmap_data.data
    this.parse()
  }

  onload () {
    console.log('onload')
  }

  parse () {
    for (var layer of this.data.layers) {
      if (layer.encoding == 'base64') {
        layer.data = atob(layer.data)

        if (typeof layer.compression !== 'undefined') {
          if (layer.compression == 'zlib' || layer.compression == 'gzip') {
            var data = pako.inflate(layer.data)
            layer.data = []
            for (var i = 0; i < data.length; i += 4) {
              layer.data.push(data[i])
            }
          }
        }
      }
      this.layers.push(layer)
    }

    for (var set of this.data.tilesets) {
      var tileset = new TileSet(set.firstgid, set.source, this._tilesetSourcePath.length > 0, this._tilesetSourcePath)
      this.tilesets.push(tileset)
    }

    this.tileSize.x = this.data.tilewidth
    this.tileSize.y = this.data.tileheight

    this.numXTiles = this.data.width
    this.numYTiles = this.data.height
  }

  getTilset (gid) {
    for (var tileset of this.tilesets) {
      if (tileset.firstgid <= gid) {
        return tileset
      }
    }
    return false
  }

  centerAt(x, y, w, h) {
    this.viewRect.w = w;
    this.viewRect.h = h;
    this.viewRect.x = x - (w/2);
    this.viewRect.y = y - (h/2);

  }

  renderlayer (id) {

    var layer = this.layers[id] // TODO: Logic here dont hardcode

    if (typeof layer != 'undefined') {

      for (var i = 0; i < layer.data.length; i++) {
        var tileid = layer.data[i]

        var tileset = this.tilesets[0];// this.getTilset(tileid)

        if (tileset) {

          var worldX = Math.floor(i % this.numXTiles) * this.tileSize.x
          var worldY = Math.floor(i / this.numYTiles) * this.tileSize.y

          // Calculate if we are should render this tile.
          if ((worldX + this.tileSize.x) < this.viewRect.x ||
              (worldY + this.tileSize.y) < this.viewRect.y ||
            worldX > this.viewRect.x + this.viewRect.w ||
            worldY > this.viewRect.y + this.viewRect.h)
          continue;


          worldX -= this.viewRect.x
          worldY -= this.viewRect.y

          var sprite = tileset.getTileAtIndex(tileid)

          if (sprite) {
            sprite.x = worldX - tileset.spacing
            sprite.y = worldY - tileset.spacing

            this.addChild(sprite)
          } else {
            console.log('No sprite')
          }
        }
      }
    }
  }
}

module.exports = TiledMap