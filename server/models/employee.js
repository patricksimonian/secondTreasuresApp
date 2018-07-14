'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    is_admin: DataTypes.BOOLEAN
  }, {
    underscored: true
  });
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};
