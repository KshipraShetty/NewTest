const server = require('../../src/server');
const models = require('../../models');

beforeEach(() => models.books.create({
  bookID: 10,
  name: 'Tell Me Your Dreams',
  author: 'Sidney Sheldon',
  rating: 3.93,
}));
afterEach(() => models.books.destroy({ truncate: true }));
afterAll(() => models.close());

describe('Check for GET/books/booksrating/populate', () => {
  test('Check for statusCode:', (done) => {
    server.inject('/books/booksRating/populate', (response) => {
      expect(response.statusCode).toBe(200);
    });
    done();
  });
});
