const makeQueryOption = (fields) => {
  const queryOptions = Object.keys(fields).map((field) => {
    return { [field]: { contains: fields[field] } }
  })

  return queryOptions
}

module.exports = makeQueryOption
