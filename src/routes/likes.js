const models = require('../../models');

module.exports = [
  {
    path: '/books/{bookID}/like',
    method: 'POST',
    handler: (request, response) => {
      const id = Number(request.params.bookID);

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
            like: true,
          });
        })
        .then(() => {
          response({
            data: {
              reason: 'Liked!',
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
  },
];
