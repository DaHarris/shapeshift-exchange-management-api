const Exchange = require('shapeshift-common-library/models/Exchange').model

const getActiveSymbols = function (exchange, callback) {
  Exchange.aggregate(
    {'$match': {'exchangeName': exchange}},
    {'$unwind': '$symbolStatus'},
    {'$match': {'symbolStatus.active': true}},
    {'$group': {_id: '$_id', symbols: {$push: '$symbolStatus'}}},
    function (err, results) {
      if (err) {
        callback(err, null)
      } else if (!results.length) {
        callback(null, [])
      } else {
        callback(null, results[0].symbols)
      }
    })
}

const storeTickerData = function (exchange, tickers, callback) {
  Exchange.findOneAndUpdate({exchangeName: exchange}, {$set: {tickers: tickers}}, function (err, results) {
    if (err) {
      callback(err, null)
    } else if (!results) {
      let newError = new Error('Store ticker data did not find an exchange with exchangeName: ' + exchange)
      callback(newError, null)
    } else {
      callback(null, true)
    }
  })
}

module.exports = {
  getActiveSymbols,
  storeTickerData
}
