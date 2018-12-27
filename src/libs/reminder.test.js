const { sendReminders, getAllUser } = require('./reminder')
const nock = require('nock')

describe("#reminder", () => {
  process.env.SLACK_BOT_TOKEN = '123'

  it("get all users in Slack", async() => {
    nock("https://slack.com/api")
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get("/users.list?token=123")
      .reply(200, {
        "members": [
          { "id": "U3Q9HS4P3", "name": "danielsluz" },
          { "id": "U3QDBFK5E", "name": "mateusluizfb" },
          { "id": "U3QPKF69E", "name": "kilmerluiz" }
        ]
      })

    const response = await getAllUser()
    expect(response.members.map(user => user.team_id).length).toEqual(3)
  })

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
    expect(slack1.isDone()).toBeTruthy();
    expect(slack2.isDone()).toBeTruthy();
  })
})