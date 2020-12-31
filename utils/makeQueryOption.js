const DEFAULT_QUERY_OPTION = {
  deleted_at: null,
  status: 'PUBLISHED',
}

const getQueryOption = (key, value) => {
  const mapper = {
    user_id: { [key]: Number(value) },
  }

  const matched = mapper[key]
  if (matched) return matched

  return { [key]: { contains: value } }
}

const makeQueryOption = (fields) => {
  if (!fields) return DEFAULT_QUERY_OPTION

  const defaultQueryOptions = Object.entries(DEFAULT_QUERY_OPTION).map(([key, value]) => ({
    [key]: value,
  }))
  const queryOptins = Object.entries(fields).map(([key, value]) => getQueryOption(key, value))
  const where = { AND: [...defaultQueryOptions, ...queryOptins] }
  return where
}

module.exports = makeQueryOption
