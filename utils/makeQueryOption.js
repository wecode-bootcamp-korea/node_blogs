const DEFAULT_QUERY_OPTION = {
  deleted_at: null,
  // status: 'PUBLISHED',
}

const getQueryOption = (key, value) => {
  const mapper = {
    user_id: { [key]: Number(value) },
    comments: { [key]: { some: { body: { contains: value } } } },
  }

  const matched = mapper[key]
  if (matched) return matched

  return { [key]: { contains: value } }
}

const entriesAndMap = (fields, cb) => Object.entries(fields).map(cb)

const makeQueryOption = (fields) => {
  if (!fields) return DEFAULT_QUERY_OPTION

  const defaultQueryOptions = entriesAndMap(DEFAULT_QUERY_OPTION, ([key, value]) => ({
    [key]: value,
  }))
  const queryOptins = entriesAndMap(fields, ([key, value]) => getQueryOption(key, value))
  const where = { AND: [...defaultQueryOptions, ...queryOptins] }
  return where
}

module.exports = makeQueryOption
