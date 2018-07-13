'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define('Rating', {
    book_isbn: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    user_key: DataTypes.STRING
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};