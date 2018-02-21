const server = require('../../src/server.js');
const models = require('../../models');

beforeEach(() => models.books.create({
  bookID: 1,
  name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
  author: 'J K Rowling',
  rating: 4.45,
}));
afterEach(() => models.books.destroy({ truncate: true }));
afterAll(() => models.close());
describe('Check for POST/books/{bookID}/like', () => {
  test('Should like book with bookid 1', (done) => {
    const option = {
      method: 'POST',
      url: '/books/1/like',

    };
    server.inject(option, (response) => {
      expect(response.result).toEqual({ data: { reason: 'Liked!', statusCode: 204 } });
      done();
    });
  });
});
