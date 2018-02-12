const server = require('../../src/server.js');
const models = require('../../models');

beforeEach(() => models.books.create({
  bookID: 10,
  name: 'Tell Me Your Dreams',
  author: 'Sidney Sheldon',
  rating: 3.93,
}));
afterEach(() => models.books.destroy({ truncate: true }));
afterAll(() => models.close());
describe('Check for POST/books/{bookID}/unlike', () => {
  test('Should like book with bookid 10', (done) => {
    const option = {
      method: 'POST',
      url: '/books/10/unlike',

    };
    server.inject(option, (response) => {
      expect(response.result).toEqual({ data: { reason: 'Unliked!', statusCode: 204 } });
      done();
    });
  });
});
