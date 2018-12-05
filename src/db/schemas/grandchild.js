'use strict';
module.exports = (sequelize, DataTypes) => {
  const grandChild = sequelize.define(
    'grandChild',
    {
      firstname: DataTypes.STRING,
      picture: DataTypes.STRING,
      userId: DataTypes.STRING,
      yearOfBirth: {
        type: DataTypes.STRING
      },
      monthOfBirth: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  grandChild.associate = function(models) {
    grandChild.belongsToMany(models.grandParent, {
      foreignKey: 'grandChildId',
      as: 'parents',
      through: models.relation
    });
  };
  return grandChild;
};
