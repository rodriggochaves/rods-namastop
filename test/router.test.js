process.env.MONGODB_URI = 'mongodb://127.0.0.1/namastop-test'
const db = require('../src/server/models/mongosse').config()

const request = require('supertest')
const router = require('../src/router')
const assert = require('assert');
const Note = require('../src/server/models/schema')
const Nock = require('nock')


describe('routes', () => {
  beforeEach(() => {
    process.env.SLACK_BOT_TOKEN = '123'
    process.env.SLACK_OAUTH_TOKEN = '321'

    Note.deleteMany({}).catch(error => {
      console.log(error)
    });
  })

  it('GET / responds with http 200', (done) => {
    request(router)
      .get('')
      .expect(200, done)
  })

  it('POST /notes responds with http 200', async () => {
    Nock("https://slack.com/api")
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get("/users.profile.get?token=321&user=U48H4EH19")
      .reply(200, {
        profile: {
          image_72: 'image_url'
        }
      })

    await request(router)
      .post('/notes')
      .type('form')
      .send({ user_name: "rodrigochaves", user_id: 'U48H4EH19', text: 'thanks' })
      .expect(200)
  })

  it('GET /notes returns a list of notes', async() => {
    const promises = [
      { username: 'rodrigochaves', text: 'thanks' },
      { username: 'kilmer', text: 'thanks' },
      { username: 'luiz', text: 'very thanks' },
    ].map((note) => new Note(note).save())

    await Promise.all(promises)
    await request(router)
      .get('/notes')
      .expect(200)
      .expect((response) => {
        assert.equal(response.body.length, 3)
      })
  })

  after(() => {
    db.close()
  })
})