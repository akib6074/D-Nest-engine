/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    var dummyJSON = [];
    dummyJSON.push({
      accesible: true,
      ade_roles_id: 1,
      ade_modules_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await queryInterface.bulkInsert('ade_role_module', dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ade_role_module', null, {});
  },
};
