'use strict';
module.exports = sequelize => {
  const relation = sequelize.define('relation', {}, {});
  relation.associate = function(models) {
    relation.belongsTo(models.grandChild, {
      as: 'grandChildren',
      foreignKey: 'grandChildId'
    });
    relation.belongsTo(models.grandParent, {
      as: 'grandParents',
      foreignKey: 'grandParentId'
    });
  };
  return relation;
};
