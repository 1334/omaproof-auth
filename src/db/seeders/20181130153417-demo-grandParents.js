module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'grandParents',
      [
        {
          id: 101,
          firstname: 'grandMother1',
          userId: 'grandMother1',
          contactNumber: 'grandMother1',
          yearOfBirth: '1980',
          monthOfBirth: 'jan',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 102,
          firstname: 'grandMother2',
          userId: 'grandMother2',
          contactNumber: 'grandMother2',
          yearOfBirth: '1980',
          monthOfBirth: 'feb',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 103,
          firstname: 'grandMother3',
          userId: 'grandMother3',
          contactNumber: 'grandMother3',
          yearOfBirth: '1980',
          monthOfBirth: 'mar',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 104,
          firstname: 'grandMother4',
          userId: 'grandMother4',
          contactNumber: 'grandMother4',
          yearOfBirth: '1980',
          monthOfBirth: 'may',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 105,
          firstname: 'grandMother5',
          userId: 'grandMother5',
          contactNumber: 'grandMother5',
          yearOfBirth: '1980',
          monthOfBirth: 'may',
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
