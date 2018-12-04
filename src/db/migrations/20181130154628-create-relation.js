'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('relations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      grandChildId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grandChildren',
          key: 'id'
        },
        allowNull: false
      },
      grandParentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grandParents',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('relations');
  }
};
