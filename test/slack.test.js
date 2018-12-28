const nock = require('nock')
const assert = require('assert')

const Slack = require('../src/libs/slack');

describe("Slack", () => {
  process.env.SLACK_BOT_TOKEN = '123'
  process.env.SLACK_OAUTH_TOKEN = '321'

  it(".getAllUsers", async () => {
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

    const response = await Slack.getAllUsers()
    assert.equal(response.members.map(user => user.team_id).length, 3)
  })

  it(".getUser", async() => {
    nock("https://slack.com/api")
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get("/users.profile.get?token=321&user=ID")
      .reply(200, { "profile": { "image_72": "image_url" } })

    const response = await Slack.getUser("ID")
    assert.equal(response.profile.image_72, 'image_url')
  })
})