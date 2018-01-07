var py = {
  extras: require('./extras'), // TODO: Not in mini build
  math: require('./core/math')
}

global.py = py

require('polyfill')
require('utils') // TODO: Not in mini build
require('loader') // TODO: Not in mini build
require('core')





