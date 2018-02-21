const models = require('../../models');
const groupBooksWithRatings = require('../helpers/groupBooksWithRatings');


const display = (request, response) => {
  models.books.findAll()
    .then(books => groupBooksWithRatings(books))
    .then((groupedBooks) => {
      if (groupedBooks) {
        response({
          data: groupedBooks,
          statusCode: 200,
        });
      } else {
        throw new Error('Could not fetch books information');
      }
    })

    .catch((reason) => {
      response({
        data: {
          reason: reason.message,
        },
        statusCode: 404,
      });
    });
};


module.exports = [{
  path: '/books/fetchDatabase',
  method: 'GET',
  handler: display,
}];
