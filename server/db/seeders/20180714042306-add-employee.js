'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log("running seed");
    await queryInterface.bulkInsert('users', [{
        username: 'billybob',
        name: 'Billy Bob',
        password: 'apple123'
      }], {});

    const user = await queryInterface.sequelize.query('SELECT id FROM users;');

    const user_id = user[0];

    return queryInterface.bulkInsert('employees', [{
      user_id,
      is_admin: true
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
    return queryInterface.bulkDelete('users', null, {});
  }
};
