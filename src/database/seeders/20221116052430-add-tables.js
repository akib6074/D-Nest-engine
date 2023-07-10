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
      table_name: 'ade_roles',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_users',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_tables',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_menus',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_modules',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_masters',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_attributes',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_apis',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_role_table',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_role_menu',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_role_module',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_role_api',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_user_module',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      table_name: 'ade_menu_priviledge',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await queryInterface.bulkInsert('ade_tables', dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ade_tables', null, {});
  },
};
