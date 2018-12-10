'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grandChildren', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      yearOfBirth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      monthOfBirth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('grandChildren');
  }
};
