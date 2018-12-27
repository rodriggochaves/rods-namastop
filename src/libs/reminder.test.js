const reminder = require('./reminder')
const nock = require('nock')

describe("#reminder", () => {
  it("get all users in Slack", async() => {
    nock("https://slack.com/api")
  })

  it("receives a list of user and send them a reminder", async () => {
    const users = ["U48H4EH19", "U3Q9HS4P3"]

    const token = "xoxb-126285058224-512405415842-7tcWmKyO0nnLn64B1TWrJRoL"
    const text = "hello"
    const baseUrl = 'https://slack.com/api'

    const params = users.map(user => {
      return `/chat.postMessage?token=${token}&channel=${user}&text=${text}&pretty=1&as_user=true`
    })
    
    nock(baseUrl)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post(params[0])
      .reply(200, {})

    nock(baseUrl)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post(params[1])
      .reply(200, {})
  
    // console.log(nock.pendingMocks())

    await reminder(['U48H4EH19', 'U3Q9HS4P3'])
    expect(nock.isDone()).toBeTruthy();
  })
})