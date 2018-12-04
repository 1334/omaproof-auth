module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'relations',
      [
        {
          grandChildId: 100,
          grandParentId: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 101,
          grandParentId: 101,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 102,
          grandParentId: 102,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 103,
          grandParentId: 103,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 100,
          grandParentId: 103,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('relations', null, {});
  }
};
