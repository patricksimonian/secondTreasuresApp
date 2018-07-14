'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true
  });
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};
