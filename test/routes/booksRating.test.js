const server = require('../../src/server');

const output = {
  'J K Rowling': [
    {
      author: 'J K Rowling',
      id: 1,
      name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
      rating: 4.45,
    },
    {
      author: 'J K Rowling',
      id: 2,
      name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
      rating: 4.38,
    },
    {
      author: 'J K Rowling',
      id: 3,
      name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)',
      rating: 4.54,
    },
    {
      author: 'J K Rowling',
      id: 4,
      name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)',
      rating: 4.53,
    },
    {
      author: 'J K Rowling',
      id: 5,
      name: 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)',
      rating: 4.47,
    },
    {
      author: 'J K Rowling',
      id: 6,
      name: 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)',
      rating: 4.54,
    },
    {
      author: 'J K Rowling',
      id: 7,
      name: 'Harry Potter and the Deathly Hallows (Harry Potter, #7)',
      rating: 4.62,
    },
  ],
  'Sidney Sheldon': [
    {
      author: 'Sidney Sheldon',
      id: 8,
      name: 'If Tomorrow Comes (Tracy Whitney Series, #1)',
      rating: 4.02,
    },
    {
      author: 'Sidney Sheldon',
      id: 10,
      name: 'Tell Me Your Dreams',
      rating: 3.93,
    },
    {
      author: 'Sidney Sheldon',
      id: 9,
      name: 'Master of the Game',
      rating: 4.1,
    },
    {
      author: 'Sidney Sheldon',
      id: 11,
      name: 'The Other Side of Midnight (Midnight #1)',
      rating: 3.9,
    },
    {
      author: 'Sidney Sheldon',
      id: 12,
      name: 'Rage of Angels',
      rating: 3.92,
    },
  ],
};

describe('Check for the books ratings', () => {
  describe('Check for the statusCode', () => {
    test('/books/booksRating', (done) => {
      server.inject('/books/booksRating', (response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  describe('Check for contents:', () => {
    test('/books/booksRating', (done) => {
      server.inject('/books/booksRating', (response) => {
        expect(JSON.parse(response.payload)).toEqual(output);
        done();
      });
    });
  });
});
