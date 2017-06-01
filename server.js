const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = express()

// Configuration Setup
const config = require('shapeshift-common-library')('shapeshift-external-api')
const port = config.get('port')
const mongoConfig = config.get('mongoDBConnection')

// MongoDB connection Setup
require('./database/mongoSetup')(mongoConfig)

app.use(bodyParser.json())
app.use('/pricing', router)
app.listen(port, () => { console.log('Listening on port: ' + port) })
