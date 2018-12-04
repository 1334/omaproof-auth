'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'grandParents',
      [
        {
          userId: 100,
          firstname: 'Berta',
          dateOfBirth: new Date(Date.UTC(1992, 1, 22)),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 200,
          firstname: 'Luke',
          dateOfBirth: new Date(Date.UTC(1990, 1, 22)),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 300,
          firstname: 'Charlie',
          dateOfBirth: new Date(Date.UTC(1988, 1, 22)),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('grandParents', null, {});
  }
};
