'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define('Rating', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    book_isbn: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    user_key: DataTypes.STRING
  }, {
    underscored: true
  });
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};
