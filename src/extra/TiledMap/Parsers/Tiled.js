import pako from 'pako'

class Tiled {
  constructor (data) {
    this.data = data
  }

  parse () {

    for (let layer of this.data.layers) {
    // console.log(layer)
      if (layer.encoding == 'base64') {
        layer.data = atob(layer.data)
      }

      if (layer.compression == 'zlib') {

        // // Convert binary string to character-number array
        // var charData = layer.data.split('').map(function (x) {return x.charCodeAt(0)})
        //
        // // Turn number array into byte-array
        // var binData = new Uint8Array(charData)

        // Pako magic
        var data = pako.inflate(layer.data)

        // Convert gunzipped byteArray back to ascii string:
        var strData = String.fromCharCode.apply(null, new Uint16Array(data))

        console.log(strData)

      }
    }
  }
}

module.exports = Tiled