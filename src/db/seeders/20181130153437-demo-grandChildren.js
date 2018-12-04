module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'grandChildren',
      [
        {
          id: 100,
          firstname: 'Subject1',
          picture: 'Subject1',
          userId: 1,
          yearOfBirth: 1990,
          monthOfBirth: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 101,
          firstname: 'Subject2',
          picture: 'Subject2',
          userId: 2,
          yearOfBirth: 1991,
          monthOfBirth: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 102,
          firstname: 'Subject3',
          picture: 'Subject3',
          userId: 3,
          yearOfBirth: 1990,
          monthOfBirth: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 103,
          firstname: 'Subject4',
          picture: 'Subject4',
          userId: 4,
          yearOfBirth: 1991,
          monthOfBirth: 2,
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
