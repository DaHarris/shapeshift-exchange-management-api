const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = express()

// Configuration Setup
const config = require('shapeshift-common-library')('shapeshift-exchange-management-api')
const port = config.get('port')
const mongoConfig = config.get('mongoDBConnection')

// MongoDB connection setup
require('./database/mongoSetup')(mongoConfig)

// RabbitMQ connection setup
const rabbotWrapper = require('rabbitmq-wrapper')
const rabbotConfig = config.get('rabbitMQ')
rabbotWrapper.setQ_Subscription('queue.externalAPIHandler')

// Rabbot Handlers
const exchangeUpdater = require('./middleware/exchangeUpdater')
rabbotWrapper.setHandler('command.externalAPI.updateTicker', exchangeUpdater.updateTicker)

// Routes
const exchange = require('./middleware/exchange')
router.route('/').get(exchange.getExchangeRates)

// Start update ticker loop
const updateManager = require('./lib/updateManager')
const updateVersion = require('./lib/updateVersion').set()
updateManager.startUpdateLoop(updateVersion)

// Final Express setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})
app.use(bodyParser.json())
app.use('/exchanges', router)
app.listen(port, () => { console.log('Listening on port: ' + port) })

// Final RabbitMQ setup
rabbotWrapper.setupClient('externalAPI', rabbotConfig)
