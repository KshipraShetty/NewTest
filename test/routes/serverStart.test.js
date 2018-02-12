const server = require('../../src/server.js');

describe('GET request: Server should have the route', () => {
  it('/', (done) => {
    server.inject('/', (response) => {
      expect(response.result).toBe('Welcome!');
      done();
    });
  });
});
