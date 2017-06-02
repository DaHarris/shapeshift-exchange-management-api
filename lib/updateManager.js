const RabbotWrapper = require('rabbitmq-wrapper')
const uuid = require('node-uuid')
const async = require('async')
const Exchange = require('shapeshift-common-library/models/Exchange').model

const startUpdateLoop = function (updateVersion) {
  Exchange.find({exchangeName: 'BTC-E'}, function (err, exchanges) {
    if (err) {
      console.log(err)
    } else {
      async.each(exchanges, function (exchange, callback) {
        let corrID = uuid.v4()
        let exchangeName = exchange.exchangeName
        let delay = 1000
        RabbotWrapper.updateTicker_Command(exchangeName, updateVersion, delay, corrID, function (err) {
          if (err) {
            callback(err)
          } else {
            callback()
          }
        })
      }, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Successfully started exchange ticker update loop.')
        }
      })
    }
  })
}

module.exports = {
  startUpdateLoop
}
