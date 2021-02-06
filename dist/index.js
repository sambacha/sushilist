
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./sushiswap-token-list.cjs.production.min.js')
} else {
  module.exports = require('./sushiswap-token-list.cjs.development.js')
}
