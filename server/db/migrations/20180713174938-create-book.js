'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      isbn: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING(13)
      },
      title: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      genre: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      img_url: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};
