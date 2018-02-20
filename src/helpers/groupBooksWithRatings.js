const groupBooksWithRatings = (booksWithRatings) => {
  const groupedBooks = booksWithRatings.reduce((group, book) => {
    const groupHolder = group;

    if (groupHolder[book.author] === undefined) {
      groupHolder[book.author] = [];
    }

    groupHolder[book.author].push(book);
    return groupHolder;
  }, {});

  Object.keys(groupedBooks).forEach((key) => {
    const booksInThisGroup = groupedBooks[key];
    groupedBooks[key] = booksInThisGroup.sort((a, b) => a.bookID >= b.bookID);
  });
  console.log(groupedBooks);
  return groupedBooks;
};
module.exports = groupBooksWithRatings;
