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
        type: DataTypes.INTEGER,
        validate: {
          min: 1900,
          max: 2100
        }
      },
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
    grandParent.belongsToMany(models.grandChild, {
      foreignKey: 'grandParentId',
      through: models.relation,
      as: 'children'
    });
  };
  return grandParent;
};
