const makeDataForCreate = (fields) =>
  Object.entries(fields).reduce((data, [key, value]) => {
    data[key] = value
    return data
  }, {})

module.exports = makeDataForCreate
