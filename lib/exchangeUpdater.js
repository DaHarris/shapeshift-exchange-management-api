const ApiManager = require('./apiManager')

// Resources
const resources = require('./resources')
const getActiveSymbols = resources.getActiveSymbols

const updateTickers = function (exchange, callback) {
  getActiveSymbols(exchange, function (err, symbols) {
    if (err) {
      callback(err, null)
    } else {
      ApiManager.updateTickers(exchange, symbols, callback)
    }
  })
}

module.exports = {
  updateTickers
}
