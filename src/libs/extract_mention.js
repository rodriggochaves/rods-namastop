const extractMention = (text) => {
  const pattern = /\B@[a-z0-9_-]+/gi
  return text.match(pattern)
}

module.exports = extractMention