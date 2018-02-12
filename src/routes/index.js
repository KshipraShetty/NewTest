const server = require('./serverStart');
const api1 = require('./booksRating');
const api2 = require('./booksRatingToDatabase');
const like = require('./likes');
const unlike = require('./unlike');

module.exports = [].concat(server).concat(api1).concat(api2).concat(like)
  .concat(unlike);
