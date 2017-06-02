const uuid = require('node-uuid')

// Constants
const BTC_LTC = 'BTC_LTC'
const BTC_LTC_LONG = 'Bitcoin/Litecoin'
const BTC_ETH = 'BTC_ETH'
const BTC_ETH_LONG = 'Bitcoin/Ethereum'
const BTC_DSH = 'BTC_DASH'
const BTC_DSH_LONG = 'Bitcoin/Dash'

const exchanges = [
  {
    exchangeID: uuid.v4(),
    exchangeName: 'BTC-E',
    symbolStatus: [
      {
        symbol: BTC_LTC,
        exchangeSymbol: 'ltc_btc',
        longName: BTC_LTC_LONG,
        active: true
      },
      {
        symbol: BTC_ETH,
        exchangeSymbol: 'eth_btc',
        longName: BTC_ETH_LONG,
        active: true
      },
      {
        symbol: BTC_DSH,
        exchangeSymbol: 'dsh_btc',
        longName: BTC_DSH_LONG,
        active: true
      }
    ],
    tickers: []
  },
  {
    exchangeID: uuid.v4(),
    exchangeName: 'Poloniex',
    symbolStatus: [
      {
        symbol: BTC_LTC,
        exchangeSymbol: 'BTC_LTC',
        longName: BTC_LTC_LONG,
        active: true
      },
      {
        symbol: BTC_ETH,
        exchangeSymbol: 'BTC_ETH',
        longName: BTC_ETH_LONG,
        active: true
      },
      {
        symbol: BTC_DSH,
        exchangeSymbol: 'BTC_DASH',
        longName: BTC_DSH_LONG,
        active: true
      }
    ],
    tickers: []
  },
  {
    exchangeID: uuid.v4(),
    exchangeName: 'Bittrex',
    symbolStatus: [
      {
        symbol: BTC_LTC,
        exchangeSymbol: 'BTC-LTC',
        longName: BTC_LTC_LONG,
        active: true
      },
      {
        symbol: BTC_ETH,
        exchangeSymbol: 'BTC-ETH',
        longName: BTC_ETH_LONG,
        active: true
      },
      {
        symbol: BTC_DSH,
        exchangeSymbol: 'BTC-DASH',
        longName: BTC_DSH_LONG,
        active: true
      }
    ],
    tickers: []
  }
]

module.exports = {
  exchanges
}
