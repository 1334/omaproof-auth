const db = require('../schemas');

const createRelation = (grandChildId, grandParentId) => {
  return db.relation
    .create({
      grandChildId,
      grandParentId
    })
    .then(el => el.get({ plain: true }));
};

module.exports = {
  createRelation
};
