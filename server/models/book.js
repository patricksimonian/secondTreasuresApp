'use strict';
//isbn validation/lib
const beautifyIsbn = require('beautify-isbn');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.STRING(13),
      primaryKey: true,
      autoIncrement: false,
      unique: {
        msg: 'Book has already been entered',
        fields: ['isbn']
      },
      hooks: {
        beforeValidate: (user, options) => {
          //if isbn is passed in as int we will cast to string
          if(typeof user.isbn === 'number') user.isbn = user.isbn + "";
          //replace any non digit characters prior to validation
          user.isbn = beautifyIsbn.dehyphenate(user.isbn);
        },
      },
      validate: {
        isInt: true,
        isISBN: (isbn) => {
          //cast isbn to string
          const isbnStr = isbn + "";
          //check if isbn is 10 or 13 digits long
          if(isbnStr.length !== 10 && isbnStr.length !== 13) throw new Error("ISBN must be 10 or 13 digits");
          //if 10 or 13 digits check if they are valid ISBNs via library
          if(!beautifyIsbn.validate(isbnStr)) throw new Error("ISBN is invalid");
        },
        isUnique: (isbn, next) => {
          Book.findOne({where: {isbn}})
          .then(foundBook => {
            if(foundBook) throw new Error('Book has already been entered!');
            return next();
          })
          .catch(err => next(err));
        }
      }
    },
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    stock: DataTypes.INTEGER
    }, {underscored: true});

  Book.prototype.isbn_formatted = function() {
    const isbn = this.getDataValue('isbn');
    return beautifyIsbn.hyphenate(isbn);
  }

  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
