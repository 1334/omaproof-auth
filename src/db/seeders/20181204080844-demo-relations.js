module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'relations',
      [
        {
          grandChildId: 101,
          grandParentId: 101,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 102,
          grandParentId: 101,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 103,
          grandParentId: 101,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 104,
          grandParentId: 102,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 105,
          grandParentId: 103,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 101,
          grandParentId: 104,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          grandChildId: 102,
          grandParentId: 105,
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
