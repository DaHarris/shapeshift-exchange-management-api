const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = express()

// Configuration Setup
const config = require('shapeshift-common-library')('shapeshift-external-api')
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
app.use(bodyParser.json())
app.use('/exchanges', router)
app.listen(port, () => { console.log('Listening on port: ' + port) })

// Final RabbitMQ setup
rabbotWrapper.setupClient('externalAPI', rabbotConfig)
