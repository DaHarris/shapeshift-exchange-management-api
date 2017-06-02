const uuid = require('node-uuid')

var versionID = null

const set = function () {
  versionID = uuid.v4()
  return versionID
}

const get = function () {
  return versionID
}

module.exports = {
  set: set,
  get: get
}
