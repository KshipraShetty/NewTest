const rp = require('request-promise');
const joinBooksWithRatings = require('../helpers/joinBooksWithRatings');
const groupBooksWithRatings = require('../helpers/groupBooksWithRatings');

const display = (request, response) => {
  const options = {
    method: 'GET',
    url: 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks',
    json: true,
  };
  rp(options).then(allBooks => allBooks.books)
    .then(books => joinBooksWithRatings(books))
    .then(booksWithRatings => groupBooksWithRatings(booksWithRatings))
    .then((groupedBooks) => {
      response({
        data: groupedBooks,
        statusCode: 200,
      });
    })
    .catch(() => {
      response({
        data: {
          reason: 'Unable to retrieve books.',
        },
        statusCode: 500,
      });
    });
};


module.exports = [{
  path: '/books/booksRating',
  method: 'GET',
  handler: display,
}];
