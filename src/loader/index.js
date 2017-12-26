import prophecyLoader from 'prophecyjs-loader'

const script = require('./plugins/Script')
const bitmapfontdata = require('./plugins/BitmapFontData')
const jsondata = require('./plugins/JsonData')

let loader = new prophecyLoader()
loader.installPlugin(script)
loader.installPlugin(jsondata)
loader.installPlugin(bitmapfontdata)

export { loader }
