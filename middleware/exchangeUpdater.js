const ExchangeUpdater = require('../lib/exchangeUpdater')
const rabbotWrapper = require('rabbitmq-wrapper')
const uuid = require('node-uuid')
const updateVersion = require('../lib/updateVersion')

const updateTicker = function (msg) {
  try {
    let exchange = msg.body.exchange
    let msgVersion = msg.body.updateVersion
    // Only use current updateVersion messages
    const currentVersion = updateVersion.get()
    if (msgVersion === currentVersion) {
      ExchangeUpdater.updateTickers(exchange, function (err, results) {
        if (err) {
          console.log(err)
          rabbotWrapper.disposeMsg(msg, err)
        } else {
          let corrID = uuid.v4()
          let delay = 5 * 60 * 1000
          rabbotWrapper.updateTicker_Command(exchange, currentVersion, delay, corrID, function (err) {
            if (err) {
              rabbotWrapper.disposeMsg(msg, err)
            } else {
              rabbotWrapper.disposeMsg(msg, null)
            }
          })
        }
      })
    } else {
      console.log('Acking message, different update version')
      rabbotWrapper.disposeMsg(msg)
    }
  } catch (err) {
    console.log(err)
    err.deadLetter = true
    rabbotWrapper.disposeMsg(msg, err)
  }
}

module.exports = {
  updateTicker
}
