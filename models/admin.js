'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    employee_id: DataTypes.INT
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};