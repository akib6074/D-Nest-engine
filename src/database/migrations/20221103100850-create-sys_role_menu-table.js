/* eslint-disable prettier/prettier */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ade_role_menu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ade_roles',
          key: 'id',
        },
      },
      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ade_menus',
          key: 'id',
        },
      },
      accessible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: undefined,

        defaultValue: true,
      },
      isActive: {
        field: 'is_active',
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdBy: {
        field: 'created_by',
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updatedBy: {
        field: 'updated_by',
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ade_role_menu');
  },
};
