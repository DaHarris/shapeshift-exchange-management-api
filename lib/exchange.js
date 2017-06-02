const Exchange = require('shapeshift-common-library/models/Exchange').model

const getExchangeRates = function (callback) {
  Exchange.find({}, function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

module.exports = {
  getExchangeRates
}
