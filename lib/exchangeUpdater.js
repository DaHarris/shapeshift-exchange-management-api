const ApiManager = require('./apiManager')
const rabbotWrapper = require('rabbitmq-wrapper')
const uuid = require('node-uuid')

// Resources
const resources = require('./resources')
const getActiveSymbols = resources.getActiveSymbols

const updateTickers = function (exchange, callback) {
  getActiveSymbols(exchange, function (err, symbols) {
    if (err) {
      callback(err, null)
    } else {
      ApiManager.updateTickers(exchange, symbols, function (err, results) {
        if (err) {
          callback(err, null)
        } else {
          let corrID = uuid.v4()
          let timeStamp = Date.now()
          rabbotWrapper.exchangeUpdated_Event(exchange, results, timeStamp, corrID, function (err) {
            if (err) {
              callback(err, null)
            } else {
              callback(null, true)
            }
          })
        }
      })
    }
  })
}

module.exports = {
  updateTickers
}
