const rp = require('request-promise');

const joinBooksWithRatings = require('../helpers/joinBooksWithRatings');
const populateDatabase = require('../helpers/populateDatabase');

const display = (request, response) => {
  const options = {
    method: 'GET',
    url: 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks',
    json: true,
  };
  rp(options).then(allBooks => allBooks.books)
    .then(books => joinBooksWithRatings(books))
    .then(newBooks => populateDatabase(newBooks))
    .then((booksEntered) => {
      if (booksEntered) {
        response({
          data: booksEntered,
          statusCode: 200,
        });
      } else {
        throw new Error('Could not update books information');
      }
    })
    .catch((reason) => {
      response({
        data: {
          reason: reason.message,
        },
        statusCode: 500,
      });
    });
};


module.exports = [{
  path: '/books/booksRating/populate',
  method: 'GET',
  handler: display,
}];
