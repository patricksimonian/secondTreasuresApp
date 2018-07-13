'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    username: DataTypes.STRING,
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
