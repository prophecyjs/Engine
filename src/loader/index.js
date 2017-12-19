import prophecyLoader from 'prophecyjs-loader'

const script = require('./plugins/Script')
const bitmapfontdata = require('./plugins/BitmapFontData')

let loader = new prophecyLoader()
loader.installPlugin(script)
loader.installPlugin(bitmapfontdata)

export { loader }
