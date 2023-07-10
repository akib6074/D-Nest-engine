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
      menu_id: 1,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 2,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 3,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 4,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 5,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 6,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 7,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 8,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_id: 9,
      role_id: 1,
      module_id: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert('ade_menu_priviledge', dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ade_menu_priviledge', null, {});
  },
};
