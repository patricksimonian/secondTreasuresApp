'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    employee_id: DataTypes.INTEGER
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};
