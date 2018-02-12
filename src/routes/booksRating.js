const https = require('https');

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
              bookObject.id = item.id;
              bookObject.name = item.Name;
              bookObject.author = item.Author;
              resolve(bookObject);
            });
          });
        }));
      });
      Promise.all(promises).then((values) => {
        const result = {};
        values.forEach((item) => {
          if (typeof result[item.author] === 'undefined') {
            result[item.author] = [];
          }
          result[item.author].push({
            author: item.author,
            id: item.id,
            name: item.name,
            rating: item.rating,
          });
        });
        response(result);
      });
    });
  });
};
module.exports = [{
  path: '/books/booksRating',
  method: 'GET',
  handler: display,
}];
