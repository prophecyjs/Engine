import { MAP_TYPE } from './const'
import { EventEmitter } from 'eventemitter3'
import { Tiled, RPGMaker } from './Parsers'

class MapData extends EventEmitter {
  constructor (data) {
    super()
    this.data = data
    this.type = MAP_TYPE.UNKNOWN
    this.parser = null
    this.layers = []
    this.cache = []
    this.parsed = false
  }

  identify () {
    /**
     * This is a really simple identification process.
     */
    if (typeof this.data != 'undefined') {
      this.type = (this.data.version) ? MAP_TYPE.TILED : MAP_TYPE.RPGMAKER // TODO
    }

    if (this.type == MAP_TYPE.TILED) {
      this.parser = new Tiled(this.data)
      this.parser.parse()
    }

    if (this.type == MAP_TYPE.RPGMAKER) {
      this.parser = new RPGMaker(this.data)
      this.parser.parse()
    }

    this.emit('mapdata.identified', this)
  }
}

module.exports = MapData