const DEFAULT_QUERY_OPTION = {
  where: {
    deleted_at: null,
    status: 'PUBLISHED',
  },
  offset: 0,
  limit: 5,
}

const getQueryOption = (key, value) => {
  const mapper = {
    user_id: { [key]: Number(value) },
  }

  const matched = mapper[key]
  if (matched) return matched

  return { [key]: { contains: value } }
}

const makeQueryOption = (query) => {
  if (!query) return DEFAULT_QUERY_OPTION

  const { offset, limit, ...fields } = {
    ...query,
    offset: Number(query.offset) || 0,
    limit: Number(query.limit) || 5,
  }

  const defaultQueryOptions = Object.entries(DEFAULT_QUERY_OPTION.where).map(([key, value]) => ({
    [key]: value,
  }))
  const queryOptins = Object.entries(fields).map(([key, value]) => getQueryOption(key, value))
  const where = { AND: [...defaultQueryOptions, ...queryOptins] }
  return { offset, limit, where }
}

module.exports = makeQueryOption
