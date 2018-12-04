'use strict';
module.exports = sequelize => {
  const relation = sequelize.define('relation', {}, {});
  relation.associate = function(models) {
    relation.belongsTo(models.grandChild, {
      foreignKey: 'grandChildId'
    });
    relation.belongsTo(models.grandParent, {
      foreignKey: 'grandParentId'
    });
  };
  return relation;
};
