const rp = require('request-promise');

const joinBooksWithRatings = books => new Promise((resolve, reject) => {
  const booksArray = books.map(book => ({
    bookID: book.id,
    author: book.Author,
    name: book.Name,
  }));

  const ratingsAPICallPromises = [];

  booksArray.forEach((book) => {
    const ratingUrl = `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${book.bookID}`;
    const axiosGet = rp({
      method: 'GET',
      url: ratingUrl,
    });
    ratingsAPICallPromises.push(axiosGet);
  });

  Promise.all(ratingsAPICallPromises)
    .then((ratings) => {
      for (let i = 0; i < booksArray.length; i += 1) {
        booksArray[i].rating = JSON.parse(ratings[i]).rating;
      }
    })
    .then(() => {
      const sortedBooksArray = booksArray.sort((a, b) => a.bookID - b.bookID);
      resolve(sortedBooksArray);
    })
    .catch((reason) => {
      reject(new Error(reason.message));
    });
});
module.exports = joinBooksWithRatings;
