var py = {
  extras: require('./extras') // TODO: Not in mini build
}

global.py = py

require('polyfill')
require('utils') // TODO: Not in mini build
require('loader') // TODO: Not in mini build
require('core')





