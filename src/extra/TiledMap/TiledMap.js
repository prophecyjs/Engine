import { loader } from '../../loader'
import Container from '../../core/display/Container'
import MapData from './MapData'
import { MAP_TYPE } from './const'

class TiledMap extends Container {

  constructor (url) {
    super()

    this.loader = loader
    this.mapdata = null

    loader.loadFile(url, 'tiledmap_data').on('on.complete', (data) => {
      this._loaded(data)
      //  this._onbitmapload()
    })
  }

  /** Map loaded */
  _loaded (response) {
    this.mapdata = new MapData(response.tiledmap_data.data);
    this.mapdata.once('mapdata.identified', this._identified, this)
    this.mapdata.identify()
  }

  _identified(resource) {
    this.onload();
  }

  onload() {

  }

}

module.exports = TiledMap