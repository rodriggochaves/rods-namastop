const extractMention = (text) => {
  const pattern = /\B@[a-z0-9_-]+/gi
  const result = text.match(pattern)
  return result ? result[0] : null
}

module.exports = extractMention