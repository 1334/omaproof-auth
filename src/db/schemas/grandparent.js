'use strict';
module.exports = (sequelize, DataTypes) => {
  const grandParent = sequelize.define(
    'grandParent',
    {
      userId: DataTypes.STRING,
      password: DataTypes.STRING,
      contactNumber: DataTypes.STRING,
      firstname: DataTypes.STRING,
      yearOfBirth: {
        type: DataTypes.STRING
      },
      monthOfBirth: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  grandParent.associate = function(models) {
    grandParent.belongsToMany(models.grandChild, {
      foreignKey: 'grandParentId',
      through: models.relation,
      as: 'children'
    });
  };
  return grandParent;
};
