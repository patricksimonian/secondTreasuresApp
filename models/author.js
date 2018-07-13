'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    underscored: true
  });
  Author.associate = function(models) {
    // associations can be defined here
  };
  return Author;
};
