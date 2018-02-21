const groupBooksWithRatings = (booksWithRatings) => {
  const groupedBooks = booksWithRatings.reduce((group, book) => {
    const groupHolder = group;

    if (groupHolder[book.author] === undefined) {
      groupHolder[book.author] = [];
    }

    groupHolder[book.author].push(book);
    return groupHolder;
  }, {});

  return groupedBooks;
};
module.exports = groupBooksWithRatings;
