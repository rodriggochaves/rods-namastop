const assert = require('assert')
const extractMention = require('../src/libs/extract_mention')

describe(".textProcessor", () => {
  it("returns a string if find the mention", () => {
    const message = "thanks for helping me yesterday @kilmerluiz"
    assert.equal(extractMention(message), "@kilmerluiz")
  })

  it("returns null if nothing is found", () => {
    const message = "thanks"
    assert.equal(extractMention(message), null)
  })
})