'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grandParents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      firstname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      yearOfBirth: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1900,
          max: 2100
        }
      },
      monthOfBirth: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 12
        }
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
    return queryInterface.dropTable('grandParents');
  }
};
