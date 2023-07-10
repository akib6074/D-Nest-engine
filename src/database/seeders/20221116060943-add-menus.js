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
      menu_name: 'Admin Settings',
      menu_name_bn: 'অ্যাডমিন সেটিংস',
      menu_url: 'admin-settings',
      menu_icon_url: '/static/media/Settings4.148e7895.svg',
      menu_order: 2,
      parent_menu: 0,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'Menus',
      menu_name_bn: 'মেনুতালিকা',
      menu_url: 'admin-settings/menu-list',
      menu_icon_url: '/static/media/Settings4.148e7895.svg',
      menu_order: 3,
      parent_menu: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'Create Table',
      menu_name_bn: 'টেবিল তৈরি করুন',
      menu_url: 'admin-settings/create-table',
      menu_icon_url: '',
      menu_order: 0,
      parent_menu: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'User Setting',
      menu_name_bn: 'ইউজার সেটিংস',
      menu_url: 'user-setting',
      menu_icon_url: '',
      menu_order: 0,
      parent_menu: 5,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'Users',
      menu_name_bn: 'ইউজারগণ',
      menu_url: 'user-setting',
      menu_icon_url: '/static/media/User.22ffc190.svg',
      menu_order: 1,
      parent_menu: 0,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'Dashboard',
      menu_name_bn: 'ড্যাশবোর্ড',
      menu_url: 'dashboard',
      menu_icon_url: '/static/media/Layout-arrange.0da0c8d5.svg',
      menu_order: 0,
      parent_menu: 0,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'Roles',
      menu_name_bn: 'রোল সমুহ',
      menu_url: 'user-setting/roles',
      menu_icon_url: '',
      menu_order: 1,
      parent_menu: 5,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'Alter Table',
      menu_name_bn: 'টেবিল বদলান',
      menu_url: 'admin-settings/alter-table',
      menu_icon_url: '',
      menu_order: 1,
      parent_menu: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    dummyJSON.push({
      menu_name: 'Master Data',
      menu_name_bn: 'মাস্টার ডাটা',
      menu_url: 'admin-settings/master-data',
      menu_icon_url: '',
      menu_order: 2,
      parent_menu: 1,
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await queryInterface.bulkInsert('ade_menus', dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ade_menus', null, {});
  },
};
