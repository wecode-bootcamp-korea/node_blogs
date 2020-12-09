const makeQueryOption = (fields) =>
  Object.entries(fields).map(([key, value]) => {
    return { [key]: { contains: value } }
  })

module.exports = makeQueryOption
