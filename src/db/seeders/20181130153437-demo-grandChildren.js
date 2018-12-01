'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'grandChildren',
      [
        {
          name: 'Frederik',
          dateOfBirth: new Date(Date.UTC(1992, 9, 3)),
          picture: 'test',
          userId: 101,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Inigo',
          dateOfBirth: new Date(Date.UTC(1980, 9, 3)),
          picture: 'test',
          userId: 201,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('grandChildren', null, {});
  }
};
