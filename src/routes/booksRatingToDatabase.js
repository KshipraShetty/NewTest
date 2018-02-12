const https = require('https');
const models = require('../../models');

const display = (request, response) => {
  let books1 = '';
  https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (resp) => {
    resp.setEncoding('UTF8');
    resp.on('data', (data) => {
      books1 += data.toString();
    });
    resp.on('end', (end) => {
      books1 = JSON.parse(books1);
      const promises = [];
      books1.books.forEach((item) => {
        promises.push(new Promise((resolve, reject) => {
          https.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${item.id}`, (Resp) => {
            Resp.setEncoding('UTF8');
            const bookObject = {};
            Resp.on('data', (data) => {
              bookObject.rating = JSON.parse(data.toString()).rating;
            });
            Resp.on('end', (end) => {
              bookObject.bookID = item.id;
              bookObject.name = item.Name;
              bookObject.author = item.Author;
              resolve(bookObject);
            });
          });
        }));
      });
      let allBook;
      Promise.all(promises).then((values) => {
        allBook = values;
        // values.forEach((item) => {
        models.books.destroy({
          where: {},
        }).then(() => {
          models.books.bulkCreate(allBook, { returning: true }).then(() => {
            response('populated!');
          });
        });
      });
    });
  });
};
module.exports = [{
  path: '/books/booksRating/populate',
  method: 'GET',
  handler: display,
}];
