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
      w: 0,
      h: 0
    }

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

  _identified (resource) {
    this.onload()
  }

  onload () {

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
    console.log('layers')

  }

  getTilset (gid) {
    for (var tileset of this.tilesets) {
      if (tileset.firstgid <= gid) {
        return tileset
      }
    }
    return false
  }

  renderlayer (id, offsetX, offsetY, width, height) {

    var layer = this.layers[id]
    // layer.width -= 1;
    // layer.height -= 1;
    // console.log(layer.data);
    this.numXTiles = 40
    this.numYTiles = 40
    this.tileSize = {
      x: 32,
      y: 32,
    }
    if (typeof layer != 'undefined') {
      console.log('Length: ' + layer.data.length)
      console.log(layer.data)
      for (var i = 0; i < layer.data.length; i++) {
        var tileid = layer.data[i]

        var tileset = this.tilesets[0]; // NOTE this.getTilset(tileid)

        if (tileset) {

          var worldX = Math.floor(i % this.numXTiles) * this.tileSize.x
          var worldY = Math.floor(i / this.numYTiles) * this.tileSize.y

          var sprite = tileset.getTileAtIndex(tileid)

          if (sprite) {
            sprite.x = worldX - 1
            sprite.y = worldY - 1

            this.addChild(sprite)
          } else {
            console.log('No sprite')
          }

        } else {

          console.log('Cant find tileset for ' + tileid + ' at ' + i + ' (' + layer.data[i] + ')')
          console.log(Math.floor(i % layer.width))
        }
      }
    }
    // if (typeof layer != 'undefined') {
    //   var start = (layer.width * offsetY) + offsetX;
    //   var end = (start + layer.width) ;
    //
    //   var tileset = this.tilesets[0]
    //
    //   var x = 0;
    //   var y = 0;
    //   for (var i = start; i < end; i++) {
    //     var gid = layer.data[i] -1
    //     let sprite = tileset.getTileAtIndex(gid)
    //
    //     sprite.x = x
    //     sprite.y = y
    //
    //     x += 30;
    //
    //     this.addChild(sprite)
    //   }
    //   console.log('start ' + start)
    //   console.log('end ' + end)
    //   console.log('start gid ' + gid)
    //    // TODO find right tileset
    //
    //
    //
    //   console.log(layer)
    //   console.log(layer.width * offsetY)
    //
    //
    // }
  }
}

module.exports = TiledMap