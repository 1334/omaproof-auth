module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'grandChildren',
      [
        {
          id: 101,
          firstname: 'kid1',
          picture: 'kid1',
          userId: 'kid1',
          yearOfBirth: '1990',
          monthOfBirth: 'jan',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 102,
          firstname: 'kid2',
          picture: 'kid2',
          userId: 'kid2',
          yearOfBirth: '1990',
          monthOfBirth: 'feb',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 103,
          firstname: 'kid3',
          picture: 'kid3',
          userId: 'kid3',
          yearOfBirth: '1990',
          monthOfBirth: 'mar',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 104,
          firstname: 'kid4',
          picture: 'kid4',
          userId: 'kid4',
          yearOfBirth: '1990',
          monthOfBirth: 'apr',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 105,
          firstname: 'kid5',
          picture: 'kid5',
          userId: 'kid5',
          yearOfBirth: '1990',
          monthOfBirth: 'apr',
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
