const validateFields = (requested, allowed) =>
  Object.keys(requested).every((field) => allowed.includes(field))

module.exports = validateFields
