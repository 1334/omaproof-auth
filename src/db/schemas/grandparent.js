'use strict';
module.exports = (sequelize, DataTypes) => {
  const grandParent = sequelize.define(
    'grandParent',
    {
      userId: DataTypes.STRING,
      firstname: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      monthOfBirth: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 12
        }
      }
    },
    {}
  );
  grandParent.associate = function(models) {
    grandParent.hasMany(models.relation, {
      foreignKey: 'grandParentId'
    });
  };
  return grandParent;
};
