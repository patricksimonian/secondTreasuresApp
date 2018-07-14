'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
  User.associate = function(models) {
    // associations can be defined here
  };
  //helper method to find if a users is an employee
  User.prototype.isEmployee = function() {
    const user_id = this.getDataValue('id');
    return sequelize.query('SELECT 1 FROM Employees WHERE user_id = :user_id', {
      raw: true,
      replacements: {user_id}
    })
    .then((res) => {
      return Promise.resolve(res.length > 0);
    });
  }

  User.prototype.validatePassword = function(password) {
    return password === this.getDataValue('password');
  }
  return User;
};
