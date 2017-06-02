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
const getTickers = function (symbols, callback) {
  let url = baseURL + '?command=returnTicker'
  request.get({url: url}, function (err, response, body) {
    if (err) {
      callback(err)
    } else if (!body) {
      let newError = new Error('The Poloniex ticker update request did not return the correct data. The endpoint returned: ' + body)
      callback(newError)
    } else {
      callback(null, JSON.parse(body))
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
      high: foundTicker.high24hr,
      low: foundTicker.low24hr,
      last: foundTicker.last,
      bid: foundTicker.highestBid,
      ask: foundTicker.lowestAsk
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
