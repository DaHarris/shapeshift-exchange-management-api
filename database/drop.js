const mongo = require('mongodb').MongoClient
const config = require('shapeshift-common-library')('shapeshift-exchange-management-api')
const dbConfig = config.get('mongoDBConnection')

mongo.connect(dbConfig, (err, db) => {
  if (err) {
    console.log(err)
    process.exit()
  } else {
    db.dropDatabase()
    console.log('Exchange database dropped.')
    db.close()
    process.exit()
  }
})
