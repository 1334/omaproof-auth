'use strict';
module.exports = sequelize => {
  const relation = sequelize.define('relation', {}, {});
  relation.associate = function(models) {
    relation.belongsTo(models.grandChild, {
      as: 'grandChild',
      foreignKey: 'grandChildId'
    });
    relation.belongsTo(models.grandParent, {
      as: 'grandParent',
      foreignKey: 'grandParentId'
    });
  };
  return relation;
};
