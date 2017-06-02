const mongo = require('mongodb').MongoClient
const config = require('shapeshift-common-library')('shapeshift-exchange-management-api')
const mongoConfig = config.get('mongoDBConnection')

// Data
const mocks = require('./mocks')
const mockExchanges = mocks.exchanges

mongo.connect(mongoConfig, (err, db) => {
  if (err) {
    console.log(err)
    db.close()
  } else {
    const exchanges = db.collection('exchanges')
    exchanges.insertMany(mockExchanges, (err, result) => {
      if (err) {
        console.log('error seeding exchanges table')
        console.log(err)
        db.close()
      } else {
        console.log('exchanges table seeded with ' + result.insertedCount + ' documents')
      }
      process.exit()
    })
  }
})
