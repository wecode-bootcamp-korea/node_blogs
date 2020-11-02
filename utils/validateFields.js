const validateFields = (requested, allowed) => {
  return Object.keys(requested).every((field) => allowed.includes(field))
}

module.exports = validateFields
