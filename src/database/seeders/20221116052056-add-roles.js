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
    await queryInterface.bulkInsert(
      'ade_roles',
      [
        {
          role_name: 'super-admin',
          default_module_id: 1,
          created_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_name: 'user',
          default_module_id: 1,
          created_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_name: 'service-provider',
          default_module_id: 1,
          created_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_name: 'head',
          default_module_id: 1,
          created_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ade_roles', null, {});
  },
};
