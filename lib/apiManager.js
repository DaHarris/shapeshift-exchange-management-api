const BTCE = require('./btce/index')

const updateTickers = function (exchange, symbols, callback) {
  switch (exchange) {
    case ('BTC-E'):
      BTCE.updateTickers(exchange, symbols, callback)
      break
    default:
      let newError = new Error('The exchange: ' + exchange + ' has not been configured.')
      callback(newError, null)
  }
}

module.exports = {
  updateTickers
}
