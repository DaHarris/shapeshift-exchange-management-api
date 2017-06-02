const Exchange = require('../lib/exchange')

const getExchangeRates = function (req, res, next) {
  Exchange.getExchangeRates(function (err, results) {
    if (err) {
      console.log(err)
      res.status(500).json('Error retrieving exchange rates.')
    } else {
      res.status(200).json(results)
    }
  })
}

const getBestExchangeRates = function (req, res, next) {

}

module.exports = {
  getExchangeRates
}
