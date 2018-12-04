const db = require('../schemas');
const testModule = {};

testModule.create = async (grandChild, grandParent) => {
  return db.relation.create({
    grandChildId: grandChild,
    grandParentId: grandParent
  });
};

testModule.findAll = async () => {
  const result = await db.grandParent.findAll({
    include: [
      {
        model: db.relation
      }
    ]
  });
  return result.map(el => el.get({ plain: true }));
};

const test = async () => {
  const result = await testModule.findAll(1);
  console.log(result); // eslint-disable-line
};

test();
