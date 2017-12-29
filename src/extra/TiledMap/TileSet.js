import SpriteSheet from '../../core/sprite/SpriteSheet'
import { loader } from '../../loader'

class TileSet {
  constructor (firstgid, source, fixsourcepath = false, sourcepath = '') {
    this.firstgid = firstgid
    this.source = source
    this.isLoaded = false
    this.loader = loader

    this.name = ''
    this.image = null
    this.sourcepath = source
    this.fixsource = fixsourcepath
    this.tilewidth = 0
    this.tileheight = 0
    this.spacing = 0
    this.margin = 0

    this.terraintypes = []
    this.tiles = []
    this.cache = []

    this.numXTiles = 0
    this.numYTiles = 0
    if (this.fixsource == true) {
      this.sourcepath = sourcepath
      this.source = this.sourcepath + '/' + this.source.replace(/^.*[\\\/]/, '')
    }

    loader.loadFile(this.source, 'tileset_data').on('on.complete', (data) => {
      var xmldata = data.tileset_data.data
      var parser = new DOMParser()
      var xmldoc = parser.parseFromString(xmldata, 'text/xml')
      var tileset = xmldoc.getElementsByTagName('tileset')[0]

      this.name = tileset.getAttribute('name')
      this.tilewidth = parseInt(tileset.getAttribute('tilewidth'))
      this.tileheight = parseInt(tileset.getAttribute('tileheight'))
      this.spacing = parseInt(tileset.getAttribute('spacing'))
      this.margin = parseInt(tileset.getAttribute('margin'))

      var terraintypes = tileset.getElementsByTagName('terraintypes')[0]
      var tiles = tileset.getElementsByTagName('tile')
      var image = tileset.getElementsByTagName('image')[0]

      if (typeof image != 'undefined') {
        // Proccess tile set attributes ..
        var img = []
        for (var x = 0; x < image.attributes.length; x++) {
          var key = image.attributes[x].nodeName
          var val = image.attributes[x].nodeValue
          img[key] = val
        }
        this.image = img
      }

      if (typeof terraintypes != 'undefined') {
        var terrains = terraintypes.getElementsByTagName('terrain')
        if (terrains.length > 0) {
          for (var x = 0; x < terrains.length; x++) {
            var terain = []
            for (var y = 0; y < terrains[x].attributes.length; y++) {
              var key = terrains[x].attributes[y].nodeName
              var val = terrains[x].attributes[y].nodeValue

              terain[key] = val
            }
            this.terraintypes.push(terain)
          }
        }
      }

      // Parse tiles IF any exist
      if (typeof tiles != 'undefined') {
        if (tiles.length > 0) {
          for (var x = 0; x < tiles.length; x++) {
            var tile = []
            for (var y = 0; y < tiles[x].attributes.length; y++) {

              var key = tiles[x].attributes[y].nodeName
              var val = tiles[x].attributes[y].nodeValue

              tile[key] = val
            }
            this.tiles.push(tile)
          }
        }
      }

      this.spriteSheet = new SpriteSheet(this.sourcepath + '/' + this.image.source)
      this.spriteSheet.onload = () => {
        this.isLoaded = true

        this.numXTiles = Math.floor(this.image.width / this.tilewidth)
        this.numYTiles = Math.floor(this.image.height / this.tileheight)

      }
    })
  }

  getTileAtIndex (tileIndex) {
    var localIdx = tileIndex - this.firstgid // % 1// - index

    if (typeof this.cache['tile_'+localIdx] != 'undefined') {
      // TODO
    }

    var actualTileWidth = Math.floor(this.tilewidth + this.spacing)
    var actualTileHeight = Math.floor(this.tileheight + this.spacing)

    var px = Math.floor(localIdx % this.numXTiles) * actualTileWidth;
    var py = Math.floor(localIdx / this.numXTiles) * actualTileHeight

    this.cache['tile_'+localIdx] = this.spriteSheet.getSprite(px+this.spacing , py+this.spacing, this.tilewidth, this.tileheight)

    return this.cache['tile_'+localIdx]
  }

}

module.exports = TileSet