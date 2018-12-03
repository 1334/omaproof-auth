'use strict';
module.exports = (sequelize, DataTypes) => {
  const grandChild = sequelize.define(
    'grandChild',
    {
      firstname: DataTypes.STRING,
      picture: DataTypes.STRING,
      userId: DataTypes.STRING,
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
  grandChild.associate = function(models) {
    grandChild.belongsToMany(models.grandParent, {
      foreignKey: 'grandChildId',
      as: 'parents',
      through: models.relation
    });
  };
  return grandChild;
};
