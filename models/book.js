'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.STRING(13),
      primaryKey: true,
      autoIncrement: false
    },
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    underscored: true
  });
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
