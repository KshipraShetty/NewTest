const models = require('../../models');

const populateDatabase = books => new Promise((resolve, reject) => {
  // console.log(books);
  models.books.destroy({ truncate: true })
    .then(() => models.books.bulkCreate(books))
    .then((newBooks) => {
      resolve(newBooks);
    })
    .catch(() => {
      reject(new Error('Could not add books to database.'));
    });
});

module.exports = populateDatabase;
