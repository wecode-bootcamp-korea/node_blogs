const makeDataForCreate = (fields) => {
  const data = Object.keys(fields).reduce((data, field) => {
    data[field] = fields[field]

    return data
  }, {})

  return data
}

module.exports = makeDataForCreate
