const request = require('request')

// Config
const config = require('shapeshift-common-library')('shapeshift-external-api').get('poloniex')
const baseURL = config.get('baseURL')

// Resources
const resources = require('../resources')
const storeTickerData = resources.storeTickerData

// ***********************************************************************************
//                                API REQUESTS
// ***********************************************************************************
// Get the exchange rate for the given currency
const getTickers = function (symbols, fullback) {
  let tickers = {}
  let url = baseURL + 'ticker/'
  request.get({url: url}, function (err, response, body) {
    if (err) {
      callback(err)
    } else if (body) {
      body = JSON.parse(body)
      if (!body[symbol.exchangeSymbol]) {
        let newError = new Error('The BTC-E ticker update request did not return the correct data. The endpoint returned: ' + body)
        callback(newError)
      } else {
        tickers[symbol.exchangeSymbol] = body[symbol.exchangeSymbol]
        callback(null)
      }
    } else {
      let newError = new Error('The BTC-E ticker update request did not return a response body.')
      callback(newError)
    }
  })
}

// ***********************************************************************************
//                                DATA/OBJECT FORMATTERS
// ***********************************************************************************
// Normalize ticker data to store in the database
const normalizeTickerData = function (tickers, symbols) {
  let results = []
  let formattedTicker
  let foundTicker
  let exchangeSymbol
  symbols.map(function (symbol) {
    exchangeSymbol = symbol.exchangeSymbol
    foundTicker = tickers[exchangeSymbol]
    formattedTicker = {
      symbol: symbol.symbol,
      exchangeSymbol: exchangeSymbol,
      high: foundTicker.high,
      low: foundTicker.low,
      last: foundTicker.last,
      bid: foundTicker.sell,
      ask: foundTicker.buy
    }
    results.push(formattedTicker)
  })
  return results
}

const updateTickers = function (exchange, symbols, callback) {
  getTickers(symbols, function (err, tickers) {
    if (err) {
      callback(err, null)
    } else {
      let normalizedTickers = normalizeTickerData(tickers, symbols)
      storeTickerData(exchange, normalizedTickers, function (err, results) {
        if (err) {
          callback(err, null)
        } else {
          console.log('Successfully updated tickers for exchange: ' + exchange)
          callback(null, normalizedTickers)
        }
      })
    }
  })
}

module.exports = updateTickers
