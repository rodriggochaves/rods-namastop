const request = require('supertest')
const assert = require('assert');
const app = require('./app')

describe('rods-namastep', () => {
  it('/ responds with http 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(() => done())
  });

  it('/notes responds with 200', (done) => {  
    request(app)
      .post('/notes')
      .type('form')
      .send({ user_name: "rodrigochaves", user_id: 'U48H4EH19', text: 'thanks' })
      .expect(200)
      .end(() => done())
  })
});