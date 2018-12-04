module.exports = {
  upChildrenTest: queryInterface => {
    return queryInterface.bulkInsert(
      'grandParents',
      [
        {
          id: 100,
          firstname: 'Subject6',
          userId: 6,
          password: 'Subject6',
          contactNumber: 'Subject6',
          yearOfBirth: 1990,
          monthOfBirth: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 101,
          firstname: 'Subject7',
          userId: 7,
          password: 'Subject7',
          contactNumber: 'Subject7',
          yearOfBirth: 1991,
          monthOfBirth: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 102,
          firstname: 'Subject8',
          userId: 8,
          password: 'Subject9',
          contactNumber: 'Subject9',
          yearOfBirth: 1990,
          monthOfBirth: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 103,
          firstname: 'Subject9',
          userId: 9,
          password: 'Subject9',
          contactNumber: 'Subject9',
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
    return queryInterface.bulkDelete('grandParents', null, {});
  }
};
