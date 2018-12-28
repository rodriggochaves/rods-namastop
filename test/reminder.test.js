const { sendReminders, getAllUser } = require('../src/libs/reminder')
const nock = require('nock')
const assert = require('assert')

describe("#reminder", () => {
  process.env.SLACK_BOT_TOKEN = '123'

  it("receives a list of user and send them a reminder", async () => {
    const users = ["U48H4EH19", "U3Q9HS4P3"]

    const token = '123'
    const text = "hello"
    const baseUrl = 'https://slack.com/api'

    const params = users.map(user => {
      return `/chat.postMessage?token=${token}&channel=${user}&text=${text}&pretty=1&as_user=true`
    })
    
    const slack1 = nock(baseUrl)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post(params[0])
      .reply(200, {})

    const slack2 = nock(baseUrl)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post(params[1])
      .reply(200, {})

    await sendReminders(['U48H4EH19', 'U3Q9HS4P3'])
    
    assert.equal(slack1.isDone(), true)
    assert.equal(slack2.isDone(), true)
  })
})