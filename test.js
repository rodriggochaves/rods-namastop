const request = require('supertest')
const app = require('./app')

describe('rods-namastep', () => {
  test('/ responds with http 200', async () => {
    return request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});