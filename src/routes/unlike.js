const models = require('../../models');

module.exports = [
  {
    path: '/books/{bookID}/unlike',
    method: 'POST',
    handler: (request, response) => {
      const id = request.params.bookID;

      models.books.findOne({
        where: {
          bookID: id,
        },
      })
        .then((book) => {
          if (book === null) {
            throw new Error(`Could not find book with id: ${id}.`);
          }

          return book.updateAttributes({
            like: false,
          });
        })
        .then(() => {
          response({
            data: {
              reason: 'Unliked!',
              statusCode: 204,
            },
          });
        }, (reason) => {
          response({
            data: { reason: reason.message },
            statusCode: 404,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Could not update book attributes.',
            },
            statusCode: 500,
          });
        });
    },
  }];
