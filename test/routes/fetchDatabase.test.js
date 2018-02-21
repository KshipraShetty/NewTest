const server = require('../../src/server');

describe('Check if books are fetched', () => {
  describe('Check for the statusCode', () => {
    test('/books/fetchDatabase', (done) => {
      server.inject('/books/fetchDatabase', (response) => {
        expect(response.statusCode).toBe(200);
      });
      done();
    });
  });
});
